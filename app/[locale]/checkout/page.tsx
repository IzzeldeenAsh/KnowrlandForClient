"use client";

import React, { useRef, useState, useEffect } from "react";
import { useSearchParams, useParams, useRouter } from "next/navigation";

import {
  Group,
  Text,
  Button,
  Checkbox,
  Badge,
  Divider,
  Stack,
  Container,
  Progress,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import Image from "next/image";
import { useToast } from "@/components/toast/ToastContext";
import PageIllustration from "@/components/page-illustration";
import CountryGuard from "@/components/auth/CountryGuard";
import { getAuthToken } from "@/lib/authToken";
import {
  VisaIcon,
  MasterCardIcon,
  GooglePayIcon,
  ApplePayIcon
} from "@/components/payment-icons";
import { useUserProfile } from "@/components/ui/header/hooks/useUserProfile";
import styles from "./checkout.module.css";

interface Document {
  id: number;
  file_name: string;
  file_size: number;
  price: string;
  description: string | null;
  file_extension: string;
  is_purchased?: boolean;
  table_of_content: Array<{
    chapter?: {
      title: string;
      page?: number;
    };
    title?: string;
  }>;
}

interface Knowledge {
  id?: number;
  slug: string;
  type: string;
  title: string;
  description: string;
  documents: Document[];
  total_price: string;
}

interface Country {
  id: number;
  region_id: number;
  iso2: string;
  iso3: string;
  international_code: string;
  flag: string;
  name: string;
  names?: {
    en?: string;
    ar?: string;
  };
  status: string;
}

const getFileIconByExtension = (extension: string) => {
  const iconMap: { [key: string]: string } = {
    pdf: "/file-icons/pdf.svg",
    doc: "/file-icons/doc.svg",
    docx: "/file-icons/doc.svg",
    xls: "/file-icons/xls.svg",
    xlsx: "/file-icons/xlsx.svg",
    ppt: "/file-icons/ppt.svg",
    pptx: "/file-icons/ppt.svg",
    csv: "/file-icons/csv.svg",
    txt: "/file-icons/txt.svg",
    zip: "/file-icons/zip.svg",
    rar: "/file-icons/zip.svg",
    default: "/file-icons/file.svg",
  };
  return iconMap[extension.toLowerCase()] || iconMap.default;
};

export default function CheckoutPage() {
  const params = useParams();
  const locale = params.locale as string;
  const isRTL = locale === "ar";
  const searchParams = useSearchParams();
  const router = useRouter();
  const toast = useToast();

  // Hooks
  const { user, roles } = useUserProfile();
  const isClientOnly =
    Array.isArray(roles) &&
    roles.includes("client") &&
    !roles.some((r) => ["insighter", "company", "company-insighter", "admin"].includes(r));

  const slug = searchParams.get("slug") || "";
  const documentIds =
    searchParams
      .get("documents")
      ?.split(",")
      .map((id) => parseInt(id)) || [];
  const [knowledge, setKnowledge] = useState<Knowledge | null>(null);
  const [selectedDocuments, setSelectedDocuments] =
    useState<number[]>(documentIds);
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [walletBalance, setWalletBalance] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showSuccessUI, setShowSuccessUI] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [showDocumentsAdded, setShowDocumentsAdded] = useState(false);
  const [knowledgeDownloadId, setKnowledgeDownloadId] = useState<string>('');
  const [orderUuid, setOrderUuid] = useState<string>("");
  const [isFetchingDownloadIds, setIsFetchingDownloadIds] = useState(false);

  const authToken = getAuthToken();
  const isGuest = !authToken;

  // Guest checkout fields
  const [guestEmail, setGuestEmail] = useState("");
  const [guestFirstName, setGuestFirstName] = useState("");
  const [guestLastName, setGuestLastName] = useState("");
  const [guestCountryId, setGuestCountryId] = useState<number | null>(null);
  const [guestPhoneCode, setGuestPhoneCode] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [isPhoneCodeManuallySet, setIsPhoneCodeManuallySet] = useState(false);
  type GuestRequiredField = "email" | "firstName" | "lastName" | "country";
  const [guestSubmitAttempted, setGuestSubmitAttempted] = useState(false);
  const [guestTouched, setGuestTouched] = useState<Record<GuestRequiredField, boolean>>({
    email: false,
    firstName: false,
    lastName: false,
    country: false,
  });

  // Countries list (with flags)
  const [countries, setCountries] = useState<Country[]>([]);
  const [countriesLoading, setCountriesLoading] = useState(false);
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const [phoneCodeDropdownOpen, setPhoneCodeDropdownOpen] = useState(false);
  const [phoneCodeSearch, setPhoneCodeSearch] = useState("");
  const countryDropdownRef = useRef<HTMLDivElement | null>(null);
  const phoneCodeDropdownRef = useRef<HTMLDivElement | null>(null);

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const getCountryLabel = (c: Country) => {
    if (locale === "ar") return c.names?.ar || c.name;
    return c.names?.en || c.name;
  };

  const getCountryFlagSrc = (c: Country) => {
    const candidate = `/images/flags/${c.flag}.svg`;
    return candidate;
  };

  const selectedCountry = guestCountryId
    ? countries.find((c) => c.id === guestCountryId) || null
    : null;

  const selectedPhoneCountry =
    (selectedCountry && selectedCountry.international_code === guestPhoneCode.trim()
      ? selectedCountry
      : countries.find((c) => String(c.international_code) === guestPhoneCode.trim())) || null;

  const filteredCountries = countries
    .filter((c) => c.status === "active")
    .filter((c) => {
      const q = countrySearch.trim().toLowerCase();
      if (!q) return true;
      const label = getCountryLabel(c).toLowerCase();
      return (
        label.includes(q) ||
        c.iso2.toLowerCase().includes(q) ||
        c.iso3.toLowerCase().includes(q) ||
        String(c.international_code || "").includes(q)
      );
    })
    .slice(0, 150); // hard cap for UI performance

  // If country is selected first, default the phone code from it (unless user manually picked another)
  useEffect(() => {
    if (!isGuest) return;
    if (!guestCountryId) return;
    if (isPhoneCodeManuallySet) return;
    if (guestPhoneCode.trim()) return;

    const c = countries.find((x) => x.id === guestCountryId);
    if (c?.international_code) {
      setGuestPhoneCode(String(c.international_code));
    }
  }, [countries, guestCountryId, guestPhoneCode, isGuest, isPhoneCodeManuallySet]);

  // Close dropdowns on outside click
  useEffect(() => {
    if (!countryDropdownOpen && !phoneCodeDropdownOpen) return;

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (!target) return;

      if (
        countryDropdownOpen &&
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(target)
      ) {
        setCountryDropdownOpen(false);
      }

      if (
        phoneCodeDropdownOpen &&
        phoneCodeDropdownRef.current &&
        !phoneCodeDropdownRef.current.contains(target)
      ) {
        setPhoneCodeDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown, { passive: true });
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
    };
  }, [countryDropdownOpen, phoneCodeDropdownOpen]);

  const filteredPhoneCodeCountries = countries
    .filter((c) => c.status === "active")
    .filter((c) => {
      const q = phoneCodeSearch.trim().toLowerCase();
      if (!q) return true;
      const label = getCountryLabel(c).toLowerCase();
      return (
        label.includes(q) ||
        c.iso2.toLowerCase().includes(q) ||
        c.iso3.toLowerCase().includes(q) ||
        String(c.international_code || "").includes(q)
      );
    })
    .slice(0, 150);

  // Fetch knowledge data
  useEffect(() => {
    const fetchKnowledgeData = async () => {
      if (!slug) return;

      try {
        setIsLoading(true);
        const token = getAuthToken();

        const response = await fetch(
          `https://api.insightabusiness.com/api/platform/industries/knowledge/${slug}`,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Accept-Language": locale,
              "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
              ...(token && { Authorization: `Bearer ${token}` }),
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse JSON response safely
        const text = await response.text();
        if (!text.trim()) {
          throw new Error("Empty response from server");
        }

        const data = JSON.parse(text);
        setKnowledge(data.data);
      } catch (error) {
        console.error("Error fetching knowledge:", error);
        toast.error(
          error instanceof Error ? error.message : translations.orderError,
          translations.orderError
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchKnowledgeData();
  }, [slug, locale]);

  // Fetch wallet balance
  useEffect(() => {
    const fetchWalletBalance = async () => {
      try {
        const token = getAuthToken();
        if (!token) return;

        const response = await fetch(
          "https://api.insightabusiness.com/api/account/wallet/balance",
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Accept-Language": locale,
              "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
              ...(token && { Authorization: `Bearer ${token}` }),
            },
          }
        );

        if (response.ok) {
          try {
            const text = await response.text();
            if (text.trim()) {
              const data = JSON.parse(text);
              setWalletBalance(data.data.balance);
            }
          } catch (parseError) {
            console.warn("Wallet balance response is not valid JSON");
          }
        }
      } catch (error) {
        console.error("Error fetching wallet balance:", error);
      }
    };

    fetchWalletBalance();
  }, [locale]);

  // Guest: force provider method only
  useEffect(() => {
    if (isGuest) {
      setPaymentMethod("provider");
    }
  }, [isGuest]);

  // Guest: fetch countries list for guest form
  useEffect(() => {
    const fetchCountries = async () => {
      if (!isGuest) return;
      if (countries.length > 0) return;
      try {
        setCountriesLoading(true);
        const res = await fetch(
          "https://api.insightabusiness.com/api/common/setting/country/list",
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Accept-Language": locale,
              "X-Timezone": timezone,
            },
          }
        );
        if (!res.ok) throw new Error(`Failed to fetch countries: ${res.status}`);
        const data = await res.json();
        setCountries(Array.isArray(data?.data) ? data.data : []);
      } catch (e) {
        console.error(e);
      } finally {
        setCountriesLoading(false);
      }
    };
    fetchCountries();
  }, [countries.length, isGuest, locale, timezone]);

  // Guest: remove free documents from selection (free docs require login)
  useEffect(() => {
    if (!knowledge) return;
    if (!isGuest) return;

    setSelectedDocuments((prev) => {
      const next = prev.filter((id) => {
        const doc = knowledge.documents.find((d) => d.id === id);
        if (!doc) return false;
        return parseFloat(doc.price) > 0;
      });
      return next;
    });
  }, [knowledge, isGuest]);

  // Calculate total price
  const calculateTotalPrice = () => {
    if (!knowledge) return 0;

    return selectedDocuments.reduce((sum, docId) => {
      const doc = knowledge.documents.find((d) => d.id === docId);
      return sum + (doc ? parseFloat(doc.price) : 0);
    }, 0);
  };

  const totalPrice = calculateTotalPrice();
  const isFree = totalPrice === 0;

  // Translations
  const translations = {
    checkout: isRTL ? "الدفع" : "Checkout",
    selectDocuments: isRTL ? "المستندات المحددة" : "Selected Documents",
    totalPrice: isRTL ? "السعر الإجمالي" : "Total Price",
    paymentMethod: isRTL ? "طريقة الدفع" : "Payment Method",
   InsightaWallet: isRTL ? "محفظة إنسايتا" : "Insighta Wallet",
    stripeProvider: isRTL ? "مزود سترايب" : "Stripe Provider",
    confirmOrder: isRTL ? "تأكيد الطلب" : "Checkout",
    download: isRTL ? "تحميل" : "Download",
    free: isRTL ? "مجاني" : "Free",
    insufficientBalance: isRTL ? "الرصيد غير كافي" : "Insufficient balance",
    pleaseSelectPayment: isRTL
      ? "يرجى اختيار طريقة الدفع"
      : "Please select a payment method",
    orderSuccess: isRTL
      ? "تم إتمام الطلب بنجاح"
      : "Order completed successfully",
    orderError: isRTL ? "فشل في إتمام الطلب" : "Failed to complete order",
    loading: isRTL ? "جاري التحميل..." : "Loading...",
    remove: isRTL ? "إزالة" : "Remove",
    paymentSuccess: isRTL ? "تم الدفع بنجاح!" : "Payment Successful!",
    orderCompleted: isRTL
      ? "تم إكمال طلبك بنجاح. يمكنك الآن تنزيل المستندات المشتراة."
      : "Your order has been completed successfully. You can now download your purchased documents.",
    goToDownloads: isRTL ? "الذهاب إلى التنزيلات" : "Go to Downloads",
    congratulations: isRTL ? "تهانينا!" : "Congratulations!",
    paymentComplete: isRTL ? (isFree ? "تم إكمال الطلب بنجاح" : "تمت معالجة دفعتك بنجاح") : (isFree ? "Your order has been completed successfully" : "Your payment has been processed successfully"),
    accessGranted: isRTL ? (isFree ? "يمكنك الآن الوصول إلى جميع المستندات" : "يمكنك الآن الوصول إلى جميع المستندات المشتراة") : (isFree ? "You now have access to all your documents" : "You now have access to all your purchased documents"),
    preparingDownloads: isRTL ? "جاري تجهيز التنزيلات..." : "Preparing your downloads...",
    documentsAdded: isRTL ? "تمت إضافة المستندات إلى التنزيلات الخاصة بك" : "Documents added to your Downloads",
    guestCheckoutTitle: isRTL ? "إكمال بيانات الشراء" : "Complete checkout details",
    email: isRTL ? "البريد الإلكتروني" : "Email",
    firstName: isRTL ? "الاسم الأول" : "First name",
    lastName: isRTL ? "اسم العائلة" : "Last name",
    country: isRTL ? "الدولة" : "Country",
    phoneCode: isRTL ? "رمز الهاتف" : "Phone code",
    phone: isRTL ? "رقم الهاتف" : "Phone number",
    selectCountry: isRTL ? "اختر الدولة" : "Select country",
    searchCountry: isRTL ? "بحث عن دولة..." : "Search country...",
    loginRequiredForFree: isRTL
      ? "تسجيل الدخول مطلوب لتنزيل المستندات المجانية"
      : "Login is required for downloading the free documents",
    selectPaidDocs: isRTL
      ? "يرجى اختيار مستند مدفوع واحد على الأقل"
      : "Please select at least one paid document",
    guestFieldMissing: isRTL
      ? "يرجى تعبئة جميع الحقول المطلوبة"
      : "Please fill all required fields",
    requiredField: isRTL ? "هذا الحقل مطلوب" : "This field is required",
  };

  const getGuestValidationErrors = (): Record<GuestRequiredField, string> => {
    const errors: Record<GuestRequiredField, string> = {
      email: "",
      firstName: "",
      lastName: "",
      country: "",
    };

    if (!guestEmail.trim()) errors.email = translations.requiredField;
    if (!guestFirstName.trim()) errors.firstName = translations.requiredField;
    if (!guestLastName.trim()) errors.lastName = translations.requiredField;
    if (!guestCountryId) errors.country = translations.requiredField;

    return errors;
  };

  // Format currency with proper formatting
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(locale === 'ar' ? 'en-US' : 'en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  // Fetch updated order details to get knowledge_download_id
  const fetchUpdatedOrderDetails = async (uuid: string) => {
    try {
      setIsFetchingDownloadIds(true);
      const token = getAuthToken();
      const response = await fetch(
        `https://api.insightabusiness.com/api/account/order/knowledge/${uuid}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Accept-Language": locale,
            "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );

      if (response.ok) {
        try {
          const text = await response.text();
          if (text.trim()) {
            const data = JSON.parse(text);
            console.log('Updated order details fetched:', data.data); // Debug log
            const updatedOrderData = data.data;

            // Extract knowledge_download_id if available (now directly in updatedOrderData)
            if (updatedOrderData.knowledge_download_id) {
              setKnowledgeDownloadId(updatedOrderData.knowledge_download_id);
            }

            return updatedOrderData;
          }
        } catch (parseError) {
          console.warn("Order details response is not valid JSON");
        }
      }
    } catch (error) {
      console.error("Error fetching updated order details:", error);
    } finally {
      setIsFetchingDownloadIds(false);
    }
    return null;
  };

  // Handle document selection toggle
  const handleDocumentToggle = (documentId: number) => {
    setSelectedDocuments((prev) =>
      prev.includes(documentId)
        ? prev.filter((id) => id !== documentId)
        : [...prev, documentId]
    );
  };

  // Handle download progress animation when payment succeeds
  useEffect(() => {
    if (showSuccessUI) {
      // Animate progress bar over 5 seconds
      const duration = 5000;
      const interval = 50;
      const increment = 100 / (duration / interval);

      const timer = setInterval(() => {
        setDownloadProgress((prev) => {
          const next = prev + increment;
          if (next >= 100) {
            clearInterval(timer);
            setTimeout(async () => {
              setShowDocumentsAdded(true);
              // Recall the API to get updated knowledge_download_id after documents are processed
              if (orderUuid) {
                console.log('Documents processed, fetching updated order details...'); // Debug log
                await fetchUpdatedOrderDetails(orderUuid);
              }
            }, 300);
            return 100;
          }
          return next;
        });
      }, interval);

      return () => clearInterval(timer);
    }
  }, [showSuccessUI, orderUuid]);

  // Handle checkout
  const handleCheckout = async () => {
    // Guest: only provider allowed
    if (!isFree && !paymentMethod) {
      toast.error(translations.pleaseSelectPayment, translations.orderError);
      return;
    }

    if (selectedDocuments.length === 0) {
      toast.error(translations.selectPaidDocs, translations.orderError);
      return;
    }

    setIsCheckingOut(true);
    try {
      const token = getAuthToken();

      // Guest checkout flow (paid docs only)
      if (!token) {
        const email = guestEmail.trim();
        const first_name = guestFirstName.trim();
        const last_name = guestLastName.trim();
        const country_id = guestCountryId;
        const phone_code = guestPhoneCode.trim();
        const phone = guestPhone.trim();
        const includePhone = !!phone_code && !!phone;

        // phone_code and phone are optional for guest checkout
        if (!email || !first_name || !last_name || !country_id) {
          setGuestSubmitAttempted(true);
          const errors = getGuestValidationErrors();
          setGuestTouched((prev) => ({
            ...prev,
            email: prev.email || !!errors.email,
            firstName: prev.firstName || !!errors.firstName,
            lastName: prev.lastName || !!errors.lastName,
            country: prev.country || !!errors.country,
          }));
         
          return;
        }

        const guestBody = {
          payment_method: "provider",
          email,
          first_name,
          last_name,
          country_id,
          ...(includePhone ? { phone_code, phone } : {}),
          timezone,
          order_data: {
            knowledge_slug: slug,
            knowledge_document_ids: selectedDocuments,
          },
        };

        const response = await fetch(
          "https://api.insightabusiness.com/api/platform/guest/order/knowledge/checkout",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Accept-Language": locale,
              "X-Timezone": timezone,
            },
            body: JSON.stringify(guestBody),
          }
        );

        if (!response.ok) {
          let errorMessage = `HTTP error! status: ${response.status}`;
          try {
            const text = await response.text();
            if (text.trim()) {
              const errorData = JSON.parse(text);
              errorMessage = errorData.message || errorMessage;
            }
          } catch {}
          throw new Error(errorMessage);
        }

        const text = await response.text();
        const parsed = text.trim() ? JSON.parse(text) : null;
        const responseData = parsed?.data || parsed;
        const client_secret = responseData?.client_secret;
        const order_uuid = responseData?.order_uuid;
        const guestToken = responseData?.token;

        if (!client_secret || !order_uuid || !guestToken) {
          throw new Error("Invalid checkout response");
        }

        localStorage.setItem("guest-token", guestToken);
        try {
          const docsSummary = (knowledge?.documents || [])
            .filter((d) => selectedDocuments.includes(d.id))
            .map((d) => ({
              id: d.id,
              file_name: d.file_name,
              file_extension: d.file_extension,
              price: parseFloat(d.price),
            }));
          localStorage.setItem(
            `guest-knowledge-order-summary:${order_uuid}`,
            JSON.stringify({
              title: knowledge?.title || "Knowledge Purchase",
              documents: docsSummary,
            })
          );
        } catch (e) {
          console.warn("Failed to store guest order summary", e);
        }

        const paymentParams = new URLSearchParams({
          client_secret,
          order_uuid,
          amount: totalPrice.toFixed(2),
          title: knowledge?.title || "Knowledge Purchase",
          guest: "1",
        });
        router.push(`/${locale}/payment/stripe?${paymentParams.toString()}`);
        return;
      }

      const body = {
        payment_method: isFree ? "free" : paymentMethod,
        order_data: {
          knowledge_slug: slug,
          knowledge_document_ids: selectedDocuments,
        },
      };

      const response = await fetch(
        "https://api.insightabusiness.com/api/account/order/knowledge/checkout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Accept-Language": locale,
            "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        // Try to parse error response if it contains JSON
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
          const text = await response.text();
          if (text.trim()) {
            const errorData = JSON.parse(text);
            errorMessage = errorData.message || errorMessage;
          }
        } catch {
          // If JSON parsing fails, use the default error message
        }
        throw new Error(errorMessage);
      }

      // Parse JSON response safely for successful responses
      let data = null;
      try {
        const text = await response.text();
        if (text.trim()) {
          data = JSON.parse(text);
          console.log('Checkout response:', data); // Debug log
        }
      } catch (parseError) {
        console.warn("Checkout response is not valid JSON, but request was successful");
        throw new Error("Invalid response format from server");
      }

      if (!data) {
        throw new Error("Empty response from server");
      }

      // Extract order data
      const responseData = data.data || data;

      // Store the order UUID for later use
      if (responseData.uuid) {
        setOrderUuid(responseData.uuid);
      }

      // Extract knowledge_download_id if available (now directly in responseData)
      if (responseData.knowledge_download_id) {
        setKnowledgeDownloadId(responseData.knowledge_download_id);
      }

      // Handle Stripe payment
      if (paymentMethod === "provider") {
        console.log('Payment method is provider, checking for client_secret...'); // Debug log
        
        // Check different possible response structures
        const responseData = data.data || data;
        const { client_secret, order_uuid } = responseData;
        
        console.log('Client secret:', client_secret, 'Order UUID:', order_uuid); // Debug log
        
        if (client_secret && order_uuid) {
          // Store selected documents summary so Stripe page can always render order summary
          // (API order details may not include documents immediately).
          try {
            const docsSummary = (knowledge?.documents || [])
              .filter((d) => selectedDocuments.includes(d.id))
              .map((d) => ({
                id: d.id,
                file_name: d.file_name,
                file_extension: d.file_extension,
                price: parseFloat(d.price),
              }));
            localStorage.setItem(
              `knowledge-order-summary:${order_uuid}`,
              JSON.stringify({
                title: knowledge?.title || "Knowledge Purchase",
                documents: docsSummary,
              })
            );
          } catch (e) {
            console.warn("Failed to store order summary", e);
          }

          // Redirect to Stripe payment page with necessary data
          const paymentParams = new URLSearchParams({
            client_secret,
            order_uuid,
            amount: totalPrice.toFixed(2),
            title: knowledge?.title || 'Knowledge Purchase',
          });
          
          const stripeUrl = `/${locale}/payment/stripe?${paymentParams.toString()}`;
          console.log('Redirecting to:', stripeUrl); // Debug log
          
          router.push(stripeUrl);
          return;
        } else {
          console.log('Missing client_secret or order_uuid in response'); // Debug log
        }
      }

      // For free or wallet payments, show success UI
      setShowSuccessUI(true);
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error(
        error instanceof Error ? error.message : translations.orderError,
        translations.orderError
      );
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (isLoading) {
    return (
      <Container size="lg" className={styles.container}>
        <Text ta="center">{translations.loading}</Text>
      </Container>
    );
  }

  if (!knowledge) {
    return (
      <Container size="lg" className={styles.container}>
        <Text ta="center">Knowledge not found</Text>
      </Container>
    );
  }

  // Filter documents to show only the ones that were initially selected
  // If no specific documents were provided in URL, show all documents
  const documentsToShow = documentIds.length > 0
    ? knowledge.documents.filter((doc) => documentIds.includes(doc.id))
    : knowledge.documents;

  const hasFreeDocsInCart = documentsToShow.some((d) => parseFloat(d.price) === 0);
  const guestErrors = isGuest ? getGuestValidationErrors() : null;
  const showGuestError = (field: GuestRequiredField) =>
    isGuest && (guestSubmitAttempted || guestTouched[field]) && !!guestErrors?.[field];

  // Debug logging
  console.log('Knowledge object:', knowledge);
  console.log('DocumentIds from URL:', documentIds);
  console.log('Documents to show:', documentsToShow);
  console.log('Knowledge documents:', knowledge.documents);
  console.log('SearchParams:', Object.fromEntries(searchParams.entries()));

  // Success UI - similar to Stripe payment success
  if (showSuccessUI) {
    return (
      <>
        <PageIllustration middle={false} />
        
        <div className="min-h-screen relative z-1" dir={isRTL ? "rtl" : "ltr"}>
          <Container size="sm" className="py-12">
            <div className={`max-w-md mx-auto text-center ${styles.successContainer}`}>
              {/* Animated Checkmark */}
              <div className="mb-8">
                <div className={`mx-auto w-24 h-24 relative ${styles.checkmarkCircle}`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full opacity-20"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                    <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path 
                        className={styles.checkmarkPath}
                        d="M5 13l4 4L19 7" 
                        stroke="white" 
                        strokeWidth="3" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Success Messages */}
              <h1 className={`text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600 mb-2 ${styles.successTitle}`}>
                {translations.congratulations}
              </h1>
              <h2 className={`text-xl font-semibold text-gray-800 mb-3 ${styles.successSubtitle}`}>
                {translations.paymentComplete}
              </h2>
              <p className={`text-gray-600 mb-8 ${styles.successDescription}`}>
                {translations.accessGranted}
              </p>
              
              {/* Progress section */}
              <div className={`mb-8 ${styles.progressSection}`}>
                {!showDocumentsAdded ? (
                  <div className="space-y-4">
                    <Text size="sm" c="dimmed" fw={500}>{translations.preparingDownloads}</Text>
                    <Progress 
                      value={downloadProgress} 
                      size="xl" 
                      radius="xl"
                      color="teal"
                      striped
                      animated={downloadProgress < 100}
                    />
                  </div>
                ) : (
                  <div className={styles.documentsAddedText}>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <IconCheck size={20} className="text-emerald-600" />
                      <Text size="md" fw={600} className="text-gray-700">
                        {translations.documentsAdded}
                      </Text>
                    </div>
                  </div>
                )}
              </div>

              {showDocumentsAdded && (
                <Button
                  size="md"
                  className={`bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 transition-all ${styles.downloadButton}`}
                  loading={isFetchingDownloadIds}
                  disabled={isFetchingDownloadIds}
                  onClick={() => {
                    console.log('Download button clicked. Insight download ID:', knowledgeDownloadId); // Debug log
                    // Use UUID if available, otherwise fall back to title search
                    if (knowledgeDownloadId) {
                      const uuidsParam = `?uuids=${knowledgeDownloadId}`;
                      console.log('Redirecting with UUID:', uuidsParam); // Debug log
                      window.location.href = `https://app.insightabusiness.com/app/insighter-dashboard/my-downloads${uuidsParam}`;
                    } else {
                      console.log('No UUID available, falling back to search'); // Debug log
                      // Fallback to title search if no UUID available
                      const searchTitle = knowledge?.title || "";
                      const searchParam = searchTitle ? `?search=${encodeURIComponent(searchTitle)}` : "";
                      console.log('Redirecting with search:', searchParam); // Debug log
                      window.location.href = `https://app.insightabusiness.com/app/insighter-dashboard/my-downloads${searchParam}`;
                    }
                  }}
                >
                  {isFetchingDownloadIds
                    ? (isRTL ? "جاري التحديث..." : "Updating...")
                    : translations.goToDownloads}
                </Button>
              )}
            </div>
          </Container>
        </div>
      </>
    );
  }

  return (
    <CountryGuard>
      <>
     <PageIllustration middle={false} />

        <div className="min-h-screen relative z-1" dir={isRTL ? "rtl" : "ltr"}>
        {/* Simple header */}
        <div className="px-4 sm:px-6 lg:px-8 pt-10 ">
          <div className="max-w-8xl mx-auto">
            <div
              className={
                isFree
                  ? "mx-auto max-w-6xl text-center "
                  : "mx-auto max-w-6xl text-start "
              }
            >
              <h1 className={`text-3xl md:text-4xl font-bold text-transparent bg-clip-text ${isRTL ? 'bg-gradient-to-l from-blue-400 to-teal-500' : 'bg-gradient-to-r from-blue-500 to-teal-400'} mb-2`}>
                {translations.checkout}
              </h1>
              <p className="text-gray-600">
                {isRTL
                  ? "أكمل عملية الشراء للوصول إلى المحتوى"
                  : "Complete your purchase to access the content"}
              </p>
            </div>
          </div>
        </div>

        <div className={styles.container}>
          <div className={isFree ? styles.singleColumn : styles.checkoutGrid}>
            {/* Selected Documents Section */}
                  <div>
                  <div className="border border-[#E2E8F0] rounded-lg p-4 mb-6" style={{ background: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
              <Text size="lg" fw={600} mb="xs" style={{ overflowWrap: 'break-word' }}>
                {knowledge.title}
              </Text>
              {/* {isGuest && hasFreeDocsInCart && (
                <div className="mb-3 rounded-md border border-amber-200 bg-amber-50 px-3 py-2">
                  <Text size="sm" c="dimmed">
                    {translations.loginRequiredForFree}
                  </Text>
                </div>
              )} */}
              <Stack gap="md">
                {documentsToShow.length === 0 ? (
                  <Text size="sm" c="dimmed" ta="center">
                    {isRTL ? "لا توجد مستندات متاحة" : "No documents available"}
                  </Text>
                ) : (
                  documentsToShow.map((doc) => (
                  <div
                    key={doc.id}
                    className={`${styles.documentCard} ${
                      selectedDocuments.includes(doc.id)
                        ? styles.documentCardSelected
                        : ""
                    }`}
                  >
                    <Group gap="md" wrap="wrap" className={styles.documentRow}>
                      <Checkbox
                        checked={
                          isGuest && parseFloat(doc.price) === 0
                            ? false
                            : selectedDocuments.includes(doc.id)
                        }
                        disabled={isGuest && parseFloat(doc.price) === 0}
                        onChange={() => {
                          if (isGuest && parseFloat(doc.price) === 0) return;
                          handleDocumentToggle(doc.id);
                        }}
                        size="md"
                      />

                      <div className="flex-shrink-0">
                        <Image
                          src={getFileIconByExtension(doc.file_extension)}
                          alt={`${doc.file_extension.toUpperCase()} file`}
                          width={32}
                          height={32}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <Text
                          size="sm"
                          fw={500}
                          style={{
                            wordBreak: "break-all",
                            whiteSpace: "pre-line",
                            overflowWrap: "break-word",
                          }}
                        >
                          <span style={{ wordBreak: "break-all", overflowWrap: "break-word", whiteSpace: "pre-line" }}>
                            {doc.file_name}
                          </span>
                        </Text>
                        <Text size="xs" c="dimmed">
                          {(doc.file_size / 1024).toFixed(2)} KB
                        </Text>
                      </div>

                      <Badge
                        color={parseFloat(doc.price) === 0 ? "green" : "blue"}
                        variant="light"
                      >
                        {parseFloat(doc.price) === 0
                          ? translations.free
                          : formatCurrency(parseFloat(doc.price))}
                      </Badge>
                    </Group>
                  </div>
                  ))
                )}
              </Stack>

              
            </div>
     {/* Total Price */}
     <div className={`mb-6 ${styles.priceCard}`}>
                  <Group justify="space-between">
                    <Text size="lg" fw={600}>{translations.totalPrice}</Text>
                    <Badge size="lg" color="blue" variant="filled">
                      {isFree ? translations.free : formatCurrency(totalPrice)}
                    </Badge>
                  </Group>
                </div>

                  </div>
            {!isFree && (
              <>
                <div className={styles.rightColumn}>
                  {/* Guest checkout details */}
                  {isGuest && (
                    <div
                      className="border border-[#e2e8f0] rounded-lg p-4 mb-6 relative z-[10] overflow-visible"
                      style={{ background: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}
                    >
                      <Text className={styles.sectionTitle}>
                        {translations.guestCheckoutTitle}
                      </Text>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                        <div className="sm:col-span-2">
                          <label
                            className={`block text-sm font-medium mb-1 ${
                              showGuestError("email") ? "text-red-600" : "text-gray-700"
                            }`}
                          >
                            {translations.email}
                          </label>
                          <input
                            value={guestEmail}
                            onChange={(e) => setGuestEmail(e.target.value)}
                            type="email"
                            onBlur={() => setGuestTouched((p) => ({ ...p, email: true }))}
                            className={`w-full rounded-md border bg-white px-3 py-2 text-sm outline-none focus:border-blue-400 ${
                              showGuestError("email") ? "border-red-400" : "border-gray-200"
                            }`}
                            placeholder="name@example.com"
                          />
                          {showGuestError("email") && (
                            <div className="mt-1 text-xs text-red-600">{guestErrors?.email}</div>
                          )}
                        </div>

                        <div>
                          <label
                            className={`block text-sm font-medium mb-1 ${
                              showGuestError("firstName") ? "text-red-600" : "text-gray-700"
                            }`}
                          >
                            {translations.firstName}
                          </label>
                          <input
                            value={guestFirstName}
                            onChange={(e) => setGuestFirstName(e.target.value)}
                            onBlur={() => setGuestTouched((p) => ({ ...p, firstName: true }))}
                            className={`w-full rounded-md border bg-white px-3 py-2 text-sm outline-none focus:border-blue-400 ${
                              showGuestError("firstName") ? "border-red-400" : "border-gray-200"
                            }`}
                          />
                          {showGuestError("firstName") && (
                            <div className="mt-1 text-xs text-red-600">{guestErrors?.firstName}</div>
                          )}
                        </div>

                        <div>
                          <label
                            className={`block text-sm font-medium mb-1 ${
                              showGuestError("lastName") ? "text-red-600" : "text-gray-700"
                            }`}
                          >
                            {translations.lastName}
                          </label>
                          <input
                            value={guestLastName}
                            onChange={(e) => setGuestLastName(e.target.value)}
                            onBlur={() => setGuestTouched((p) => ({ ...p, lastName: true }))}
                            className={`w-full rounded-md border bg-white px-3 py-2 text-sm outline-none focus:border-blue-400 ${
                              showGuestError("lastName") ? "border-red-400" : "border-gray-200"
                            }`}
                          />
                          {showGuestError("lastName") && (
                            <div className="mt-1 text-xs text-red-600">{guestErrors?.lastName}</div>
                          )}
                        </div>

                        <div className="sm:col-span-2">
                          <label
                            className={`block text-sm font-medium mb-1 ${
                              showGuestError("country") ? "text-red-600" : "text-gray-700"
                            }`}
                          >
                            {translations.country}
                          </label>
                          <div className="relative" ref={countryDropdownRef}>
                            <button
                              type="button"
                              onClick={() => {
                                setCountryDropdownOpen((v) => !v);
                                setPhoneCodeDropdownOpen(false);
                              }}
                              onBlur={() => setGuestTouched((p) => ({ ...p, country: true }))}
                              className={`w-full rounded-md border bg-white px-3 py-2 text-sm flex items-center justify-between gap-2 ${
                                showGuestError("country") ? "border-red-400" : "border-gray-200"
                              }`}
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                {selectedCountry ? (
                                  <>
                                    <Image
                                      src={getCountryFlagSrc(selectedCountry)}
                                      alt={getCountryLabel(selectedCountry)}
                                      width={18}
                                      height={18}
                                      className="rounded-sm"
                                      onError={(e: any) => {
                                        try {
                                          e.currentTarget.src = "/images/flags/default.svg";
                                        } catch {}
                                      }}
                                    />
                                    <span className="truncate">{getCountryLabel(selectedCountry)}</span>
                                  </>
                                ) : (
                                  <span className="text-gray-500">{translations.selectCountry}</span>
                                )}
                              </div>
                              <span className="text-gray-400">▾</span>
                            </button>
                            {showGuestError("country") && (
                              <div className="mt-1 text-xs text-red-600">{guestErrors?.country}</div>
                            )}

                            {countryDropdownOpen && (
                              <div className="absolute z-[9999] mt-2 w-full rounded-md border border-gray-200 bg-white shadow-sm">
                                <div className="p-2 border-b border-gray-100">
                                  <input
                                    value={countrySearch}
                                    onChange={(e) => setCountrySearch(e.target.value)}
                                    className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-400"
                                    placeholder={translations.searchCountry}
                                  />
                                </div>
                                <div className="max-h-72 overflow-auto">
                                  {countriesLoading ? (
                                    <div className="p-3 text-sm text-gray-500">
                                      {translations.loading}
                                    </div>
                                  ) : filteredCountries.length === 0 ? (
                                    <div className="p-3 text-sm text-gray-500">
                                      {isRTL ? "لا توجد نتائج" : "No results"}
                                    </div>
                                  ) : (
                                    filteredCountries.map((c) => (
                                      <button
                                        key={c.id}
                                        type="button"
                                        onClick={() => {
                                          setGuestCountryId(c.id);
                                          setGuestTouched((p) => ({ ...p, country: true }));
                                          // helpful default
                                          if (!guestPhoneCode.trim()) {
                                            setGuestPhoneCode(String(c.international_code || ""));
                                          }
                                          setCountryDropdownOpen(false);
                                          setCountrySearch("");
                                        }}
                                        className="w-full px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2 text-left"
                                      >
                                        <Image
                                          src={getCountryFlagSrc(c)}
                                          alt={getCountryLabel(c)}
                                          width={18}
                                          height={18}
                                          className="rounded-sm"
                                          onError={(e: any) => {
                                            try {
                                              e.currentTarget.src = "/images/flags/default.svg";
                                            } catch {}
                                          }}
                                        />
                                        <span className="flex-1 truncate">{getCountryLabel(c)}</span>
                                        <span className="text-gray-400 text-xs">+{c.international_code}</span>
                                      </button>
                                    ))
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {translations.phoneCode}
                          </label>
                          <div className="relative" ref={phoneCodeDropdownRef}>
                            <button
                              type="button"
                              onClick={() => {
                                setPhoneCodeDropdownOpen((v) => !v);
                                setCountryDropdownOpen(false);
                              }}
                              className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm flex items-center justify-between gap-2"
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                {selectedPhoneCountry ? (
                                  <>
                                    <Image
                                      src={getCountryFlagSrc(selectedPhoneCountry)}
                                      alt={getCountryLabel(selectedPhoneCountry)}
                                      width={18}
                                      height={18}
                                      className="rounded-sm"
                                      onError={(e: any) => {
                                        try {
                                          e.currentTarget.src = "/images/flags/default.svg";
                                        } catch {}
                                      }}
                                    />
                                    <span className="truncate">+{selectedPhoneCountry.international_code}</span>
                                  </>
                                ) : guestPhoneCode.trim() ? (
                                  <span className="truncate">+{guestPhoneCode.trim()}</span>
                                ) : (
                                  <span className="text-gray-500">+---</span>
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                {!!guestPhoneCode.trim() && (
                                  <span
                                    role="button"
                                    tabIndex={0}
                                    aria-label={isRTL ? "مسح رمز الهاتف" : "Clear phone code"}
                                    className="text-gray-400 hover:text-gray-600 select-none leading-none"
                                    onMouseDown={(e) => {
                                      // prevent focusing the parent button / toggling dropdown
                                      e.preventDefault();
                                      e.stopPropagation();
                                    }}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      setGuestPhoneCode("");
                                      setIsPhoneCodeManuallySet(true); // keep it empty (don't auto-fill)
                                      setPhoneCodeDropdownOpen(false);
                                      setPhoneCodeSearch("");
                                    }}
                                    onKeyDown={(e) => {
                                      if (e.key !== "Enter" && e.key !== " ") return;
                                      e.preventDefault();
                                      e.stopPropagation();
                                      setGuestPhoneCode("");
                                      setIsPhoneCodeManuallySet(true);
                                      setPhoneCodeDropdownOpen(false);
                                      setPhoneCodeSearch("");
                                    }}
                                  >
                                    ×
                                  </span>
                                )}
                                <span className="text-gray-400">▾</span>
                              </div>
                            </button>

                            {phoneCodeDropdownOpen && (
                              <div className="absolute z-[9999] mt-2 w-full rounded-md border border-gray-200 bg-white shadow-sm">
                                <div className="p-2 border-b border-gray-100">
                                  <input
                                    value={phoneCodeSearch}
                                    onChange={(e) => setPhoneCodeSearch(e.target.value)}
                                    className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-400"
                                    placeholder={translations.searchCountry}
                                  />
                                </div>
                                <div className="max-h-72 overflow-auto">
                                  {countriesLoading ? (
                                    <div className="p-3 text-sm text-gray-500">
                                      {translations.loading}
                                    </div>
                                  ) : filteredPhoneCodeCountries.length === 0 ? (
                                    <div className="p-3 text-sm text-gray-500">
                                      {isRTL ? "لا توجد نتائج" : "No results"}
                                    </div>
                                  ) : (
                                    filteredPhoneCodeCountries.map((c) => (
                                      <button
                                        key={c.id}
                                        type="button"
                                        onClick={() => {
                                          setGuestPhoneCode(String(c.international_code || ""));
                                          setIsPhoneCodeManuallySet(true);
                                          if (!guestCountryId) {
                                            setGuestCountryId(c.id);
                                          }
                                          setPhoneCodeDropdownOpen(false);
                                          setPhoneCodeSearch("");
                                        }}
                                        className="w-full px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2 text-left"
                                      >
                                        <Image
                                          src={getCountryFlagSrc(c)}
                                          alt={getCountryLabel(c)}
                                          width={18}
                                          height={18}
                                          className="rounded-sm"
                                          onError={(e: any) => {
                                            try {
                                              e.currentTarget.src = "/images/flags/default.svg";
                                            } catch {}
                                          }}
                                        />
                                        <span className="flex-1 truncate">{getCountryLabel(c)}</span>
                                        <span className="text-gray-400 text-xs">+{c.international_code}</span>
                                      </button>
                                    ))
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {translations.phone}
                          </label>
                          <input
                            value={guestPhone}
                            onChange={(e) => setGuestPhone(e.target.value)}
                            className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400"
                            placeholder="790000000"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Payment Methods */}
                  <div className="border border-[#e2e8f0] rounded-lg p-4 relative z-0" style={{ background: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
                    <Text className={styles.sectionTitle}>
                      {translations.paymentMethod}
                    </Text>

                    <Stack gap="md">
                      {/* Wallet Method (hidden for client-only users) */}
                      {!isGuest && !isClientOnly && (
                        <div>
                          <div
                            className={`${styles.paymentMethodCard} ${
                              paymentMethod === "manual" ? styles.selected : ""
                            } ${walletBalance < totalPrice ? styles.disabled : ""}`}
                            onClick={() =>
                              walletBalance >= totalPrice &&
                              setPaymentMethod("manual")
                            }
                          >
                            <Group gap="lg" align="center">
                              <div className={styles.methodCheckbox}>
                                <Checkbox
                                  checked={paymentMethod === "manual"}
                                  onChange={() =>
                                    walletBalance >= totalPrice &&
                                    setPaymentMethod("manual")
                                  }
                                  disabled={walletBalance < totalPrice}
                                  size="md"
                                />
                              </div>
                              <div
                                style={{
                                  width: 40,
                                  height: 40,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <Image
                                  src="/images/wallet-icon.svg"
                                  alt="Insighta Wallet"
                                  width={32}
                                  height={32}
                                />
                              </div>
                              <div style={{ flex: 1 }}>
                                <Text fw={500}>{translations.InsightaWallet}</Text>
                                <Text size="sm" fw={600} c={walletBalance < totalPrice ? "red" : "green"} mt={2}>
                                  {isRTL ? "الرصيد المتاح: " : "Available Balance: "}
                                  {formatCurrency(walletBalance)}
                                </Text>
                                {walletBalance < totalPrice && (
                                  <Text size="xs" c="red">
                                    {translations.insufficientBalance}
                                  </Text>
                                )}
                              </div>
                            </Group>
                          </div>
                        </div>
                      )}

                      {/* Stripe Method */}
                      <div
                        className={`${styles.paymentMethodCard} ${
                          paymentMethod === "provider" ? styles.selected : ""
                        }`}
                        onClick={() => {
                          if (isGuest) return;
                          setPaymentMethod("provider");
                        }}
                      >
                        <Group gap="lg" align="center">
                          <div className={styles.methodCheckbox}>
                            <Checkbox
                              checked={paymentMethod === "provider"}
                              onChange={() => {
                                if (isGuest) return;
                                setPaymentMethod("provider");
                              }}
                              size="md"
                              disabled={isGuest}
                            />
                          </div>
                          <div className={styles.paymentIconsContainer}>
                            <div className={styles.paymentIcon}>
                              <VisaIcon />
                            </div>
                            <div className={styles.paymentIcon}>
                              <MasterCardIcon />
                            </div>
                            <div className={styles.paymentIcon}>
                              <GooglePayIcon />
                            </div>
                            <div className={styles.paymentIcon}>
                              <ApplePayIcon />
                            </div>
                          </div>
                        </Group>
                      </div>
                    </Stack>
                  </div>

                  {/* Confirm Button */}
                  <div className={styles.confirmButtonContainer}>
                    <Button
                      size="lg"
                      onClick={handleCheckout}
                      loading={isCheckingOut}
                      disabled={
                        selectedDocuments.length === 0 ||
                        (!isFree && !paymentMethod)
                      }
                      className={styles.confirmButton}
                      fullWidth
                    >
                      {isFree
                        ? translations.download
                        : translations.confirmOrder}
                    </Button>
                  </div>
                </div>
              </>
            )}

            {/* Download Button for Free Items - at bottom */}
            {isFree && (
              <div className={`mt-6 ${styles.freeDownloadButton}`}>
                <Button
                  size="lg"
                  onClick={handleCheckout}
                  loading={isCheckingOut}
                  disabled={selectedDocuments.length === 0}
                  className={styles.confirmButton}
                  fullWidth
                >
                  {translations.download}
                </Button>
              </div>
            )}
          </div>
        </div>
        </div>
      </>
    </CountryGuard>
  );
}
