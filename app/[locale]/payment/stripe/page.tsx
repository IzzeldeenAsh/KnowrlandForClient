"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams, useParams, useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import Image from "next/image";

import { Container, Text, Button, Paper, Group, Stack, Badge, Progress } from "@mantine/core";
import { IconCreditCard, IconCheck, IconLock, IconInfoCircle } from "@tabler/icons-react";
import PageIllustration from "@/components/page-illustration";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import styles from "./payment.module.css";

// Initialize Stripe
const stripePromise = loadStripe("pk_live_51RvbpYRIE7WtDi9SLKPBxKTPyTkULT1e36AZMOcmtUomKgW99akiph2PVg5mmUcPtyAjvlXwP1wy70OFvooJLpQc00CNQYKb96");

// File icon mapping function
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
  };
  return iconMap[extension.toLowerCase()] || "/file-icons/txt.svg";
};

interface KnowledgeDocument {
  file_name: string;
  file_extension: string;
  price: number;
}

interface GuestOrderSummary {
  title: string;
  documents: Array<{
    id: number;
    file_name: string;
    file_extension: string;
    price: number;
  }>;
}

type StoredOrderSummary = GuestOrderSummary;

interface Knowledge {
  type: string;
  title: string;
}

interface Suborder {
  knowledge: Knowledge[];
  knowledge_documents: KnowledgeDocument[][];
}

interface OrderDetails {
  uuid: string;
  status: string;
  amount: number;
  currency: string;
  date: string;
  orderable: Suborder;
  knowledge_download_id?: string;
}

interface PaymentFormProps {
  orderUuid: string;
  amount: string;
  title: string;
  locale: string;
  isRTL: boolean;
  isGuest: boolean;
  orderDetails: OrderDetails | null;
  guestSummary: GuestOrderSummary | null;
  storedSummary: StoredOrderSummary | null;
  setOrderDetails: (details: OrderDetails) => void;
}

function PaymentForm({ orderUuid, amount, title, locale, isRTL, isGuest, orderDetails, guestSummary, storedSummary, setOrderDetails }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "polling" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [showInlineError, setShowInlineError] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [showDocumentsAdded, setShowDocumentsAdded] = useState(false);
  const [isFetchingDownloadIds, setIsFetchingDownloadIds] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  const [stripeAccepted, setStripeAccepted] = useState(false);
  const [pollAttemptsEnded, setPollAttemptsEnded] = useState(false);

  // Get auth token from cookies
  const getAuthToken = () => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    return token;
  };

  const getGuestToken = () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("guest-token");
  };

  const triggerGuestDownload = useCallback(async () => {
    const guestToken = getGuestToken();
    if (!guestToken) {
      throw new Error("Missing guest token");
    }

    const response = await fetch(
      `https://api.insightabusiness.com/api/platform/guest/order/knowledge/download/${orderUuid}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Accept-Language": locale,
          "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
          "X-GUEST-TOKEN": guestToken,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Download failed: ${response.status}`);
    }

    const blob = await response.blob();
    const cd = response.headers.get("content-disposition") || "";
    const match = cd.match(/filename\*?=(?:UTF-8''|")?([^\";]+)"?/i);
    const filename = match?.[1]
      ? decodeURIComponent(match[1])
      : `${title || "download"}.zip`;

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  }, [locale, orderUuid, title]);

  // Fetch updated order details to get knowledge_download_id
  const fetchUpdatedOrderDetails = useCallback(async (uuid: string, setOrderDetails: (details: OrderDetails) => void) => {
    try {
      if (isGuest) return null;
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
        const data = await response.json();
        console.log('Updated order details fetched:', data.data); // Debug log
        const updatedOrderData = data.data;
        setOrderDetails(updatedOrderData);
        return updatedOrderData;
      }
    } catch (error) {
      console.error("Error fetching updated order details:", error);
    } finally {
      setIsFetchingDownloadIds(false);
    }
    return null;
  }, [isGuest, locale]);

  // Translations
  const translations = {
    paymentTitle: isRTL ? "إتمام الدفع" : "Complete Payment",
    orderSummary: isRTL ? "ملخص الطلب" : "Order Summary",
    payNow: isRTL ? "ادفع الآن" : "Pay",
    processing: isRTL ? "جاري المعالجة..." : "Processing...",
    verifyingPayment: isRTL ? "التحقق من الدفع..." : "Verifying payment...",
    paymentSuccess: isRTL ? "تم الدفع بنجاح!" : "Payment Successful!",
    redirecting: isRTL ? "جاري التوجيه إلى التنزيلات..." : "Redirecting to downloads...",
    goToDownloads: isRTL ? "الذهاب إلى التنزيلات" : "Go to Downloads",
    downloadNow: isRTL ? "تحميل الآن" : "Download",
    redownload: isRTL ? "إعادة التحميل" : "Redownload",
    paymentFailed: isRTL ? "فشل الدفع" : "Payment Failed",
    tryAgain: isRTL ? "حاول مرة أخرى" : "Try Again",
    preparingDownloads: isRTL ? "جاري تجهيز التنزيلات..." : "Preparing your downloads...",
    documentsAdded: isRTL ? "تمت إضافة المستندات إلى التنزيلات الخاصة بك" : "Documents added to your Downloads",
    congratulations: isRTL ? "تهانينا!" : "Congratulations!",
    paymentComplete: isRTL ? "تمت معالجة دفعتك بنجاح" : "Your payment has been processed successfully",
    accessGranted: isRTL ? "يمكنك الآن الوصول إلى جميع المستندات المشتراة" : "You now have access to all your purchased documents",
    securityNote: isRTL ? "معلومات بطاقتك آمنة ولن يتم حفظها" : "Your card information is secure and will not be saved",
    guestLinkNote: isRTL
      ? "لقد أرسلنا لك رسالة بريد إلكتروني تحتوي على رابط التحميل. سيبقى الرابط فعالًا لمدة 24 ساعة. يُرجى تنزيل ملفك قبل انتهاء صلاحية الرابط."
      : "We’ve also sent you an email with a download link. The link will remain active for 24 hours—please download your Insight before it expires.",
    guestSupportNotePrefix: isRTL ? "إذا واجهت أي مشكلة، لا تتردد في " : "If you run into any issues, feel free to ",
    contactUs: isRTL ? "التواصل معنا" : "contact us",
  };

  const orderTitle = (isGuest ? guestSummary?.title : storedSummary?.title) || title;
  const apiDocs = !isGuest ? (orderDetails?.orderable?.knowledge_documents || []).flat() : [];
  const fallbackDocs = (isGuest ? guestSummary?.documents : storedSummary?.documents) || [];
  const docsToRender =
    apiDocs.length > 0
      ? apiDocs.map((d, idx) => ({
          key: `api-${idx}-${d.file_name}`,
          file_name: d.file_name,
          file_extension: d.file_extension,
          price: d.price,
        }))
      : fallbackDocs.map((d) => ({
          key: `cached-${d.id}-${d.file_name}`,
          file_name: d.file_name,
          file_extension: d.file_extension,
          price: d.price,
        }));

  // Poll order status
  const pollOrderStatus = useCallback(async () => {
    let attempts = 0;
    const maxAttempts = 18; // ~2 minutes with progressive delays
    setPollAttemptsEnded(false);
    
    // Progressive delay calculation
    const getPollingDelay = (attempt: number): number => {
      if (attempt < 5) return 4000;    // 4 seconds for first 5 attempts
      if (attempt < 10) return 6000;   // 6 seconds for next 5 attempts
      return 10000;                     // 10 seconds for remaining attempts
    };

    const checkStatus = async (): Promise<boolean> => {
      try {
        if (isGuest) {
          const guestToken = getGuestToken();
          if (!guestToken) return false;

          const response = await fetch(
            `https://api.insightabusiness.com/api/platform/guest/order/knowledge/check-payment-succeeded/${orderUuid}`,
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Accept-Language": locale,
                "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
                "X-GUEST-TOKEN": guestToken,
              },
            }
          );

          if (response.status === 204) {
            return true;
          }
          return false;
        }

        const token = getAuthToken();
        const response = await fetch(
          `https://api.insightabusiness.com/api/account/order/knowledge/${orderUuid}`,
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
          throw new Error("Failed to fetch order status");
        }

        const data = await response.json();
        return data.data?.status === "paid";
      } catch (error) {
        console.error("Error checking order status:", error);
        return false;
      }
    };

    setPaymentStatus("polling");

    while (attempts < maxAttempts) {
      const isPaid = await checkStatus();
      
      if (isPaid) {
        if (isGuest) {
          try {
            await triggerGuestDownload();
          } catch (e) {
            console.error(e);
          }
        }
        setPaymentStatus("success");
        return true;
      }

      attempts++;
      // Wait with progressive delay before next check
      await new Promise(resolve => setTimeout(resolve, getPollingDelay(attempts)));
    }

    setPaymentStatus("error");
    setErrorMessage("Payment verification timed out");
    setPollAttemptsEnded(true);
    return false;
  }, [isGuest, locale, orderUuid, triggerGuestDownload]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setPaymentStatus("processing");
    setErrorMessage("");
    setShowInlineError(false);
    setStripeAccepted(false);
    setPollAttemptsEnded(false);

    try {
      // Confirm the payment
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/${locale}/payment/stripe/complete`,
        },
        redirect: "if_required",
      });

      if (result.error) {
        // For validation errors (like missing card info), show inline error
        // For other errors, show full error UI
        if (result.error.type === 'validation_error' ||
            result.error.type === 'card_error' ||
            result.error.code === 'payment_intent_unexpected_state' ||
            result.error.message?.includes('already succeeded') ||
            result.error.message?.includes('incomplete') ||
            result.error.message?.includes('card number')) {
          setErrorMessage(result.error.message || "Payment failed");
          setShowInlineError(true);
          setPaymentStatus("idle"); // Keep form visible
        } else {
          setErrorMessage(result.error.message || "Payment failed");
          setPaymentStatus("error"); // Show full error UI
        }
      } else {
        setStripeAccepted(true);
        // Payment succeeded, start polling for order status
        await pollOrderStatus();
      }
    } catch (error) {
      console.error("Payment error:", error);
      setErrorMessage("An unexpected error occurred");
      setPaymentStatus("error");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRetry = async () => {
    // Guard: only allow retry if Stripe accepted the card and polling attempts ended without success
    if (!stripeAccepted || !pollAttemptsEnded) {
      return;
    }
    setIsRetrying(true);
    setErrorMessage("");
    setShowInlineError(false);
    try {
      if (isGuest) {
        const guestToken = getGuestToken();
        if (!guestToken) {
          setPaymentStatus("error");
          setErrorMessage(isRTL ? "رمز الضيف غير موجود." : "Guest token is missing.");
          return;
        }
        const response = await fetch(
          `https://api.insightabusiness.com/api/platform/guest/order/knowledge/check-payment-succeeded/${orderUuid}`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Accept-Language": locale,
              "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
              "X-GUEST-TOKEN": guestToken,
            },
          }
        );
        if (response.status === 204) {
          try {
            await triggerGuestDownload();
          } catch (e) {
            console.error(e);
          }
          setPaymentStatus("success");
          return;
        }
        setPaymentStatus("error");
        setErrorMessage(
          isRTL
            ? "لم يتم تأكيد الدفع بعد. يرجى المحاولة لاحقًا."
            : "Payment could not be verified. Please try again later."
        );
        return;
      }

      const token = getAuthToken();
      const response = await fetch(
        `https://api.insightabusiness.com/api/account/order/knowledge/check-payment-succeeded/${orderUuid}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Accept-Language": locale,
            "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );
      if (response.status === 204) {
        // After backend confirmation, re-fetch order to verify status
        const updated = await fetchUpdatedOrderDetails(orderUuid, setOrderDetails);
        if (updated?.status === "paid") {
          setPaymentStatus("success");
        } else {
          setPaymentStatus("error");
          setErrorMessage(
            isRTL
              ? "لم يتم تأكيد حالة الطلب كمدفوع."
              : "Order status is not paid after verification."
          );
        }
      } else {
        setPaymentStatus("error");
        setErrorMessage(
          isRTL
            ? "لم يتم تأكيد الدفع بعد. يرجى المحاولة لاحقًا."
            : "Payment could not be verified. Please try again later."
        );
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      setPaymentStatus("error");
      setErrorMessage(
        isRTL ? "تعذر التحقق من الدفع." : "Unable to verify payment."
      );
    } finally {
      setIsRetrying(false);
    }
  };

  // Handle download progress animation when payment succeeds
  useEffect(() => {
    if (paymentStatus === "success") {
      // Guest purchases: skip the "preparing downloads" animation and show the action button immediately
      if (isGuest) {
        setDownloadProgress(100);
        setShowDocumentsAdded(true);
        return;
      }

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
              if (!isGuest) {
                console.log('Documents processed, fetching updated order details...'); // Debug log
                await fetchUpdatedOrderDetails(orderUuid, setOrderDetails);
              }
            }, 300);
            return 100;
          }
          return next;
        });
      }, interval);

      return () => clearInterval(timer);
    }
  }, [paymentStatus, orderUuid, fetchUpdatedOrderDetails, isGuest, setOrderDetails]);

  // Success UI
  if (paymentStatus === "success") {
    return (
      <div className={`max-w-lg mx-auto text-center ${styles.successContainer}`}>
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
        
        {/* Progress section (non-guest only) */}
        {!isGuest && (
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
        )}

        {(isGuest || showDocumentsAdded) && (
          <div className="mt-2">
            <Button
              size="md"
              className={`bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 transition-all ${styles.downloadButton}`}
              loading={isFetchingDownloadIds}
              disabled={isFetchingDownloadIds}
              onClick={() => {
                if (isGuest) {
                  triggerGuestDownload().catch((e) => console.error(e));
                  return;
                }
                console.log('Download button clicked. Order details:', orderDetails); // Debug log
                // Use knowledge_download_id if available, otherwise fall back to title search
                if (orderDetails?.knowledge_download_id) {
                  const uuidsParam = `?uuids=${orderDetails.knowledge_download_id}`;
                  console.log('Redirecting with UUID:', uuidsParam); // Debug log
                  window.location.href = `https://app.insightabusiness.com/app/insighter-dashboard/my-downloads${uuidsParam}`;
                } else {
                  console.log('No UUID available, falling back to search'); // Debug log
                  // Fallback to title search if no UUID available
                  const searchTitle = orderDetails?.orderable?.knowledge?.[0]?.title || "";
                  const searchParam = searchTitle ? `?search=${encodeURIComponent(searchTitle)}` : "";
                  console.log('Redirecting with search:', searchParam); // Debug log
                  window.location.href = `https://app.insightabusiness.com/app/insighter-dashboard/my-downloads${searchParam}`;
                }
              }}
            >
              {isFetchingDownloadIds
                ? (isRTL ? "جاري التحديث..." : "Updating...")
                : (isGuest ? translations.redownload : translations.goToDownloads)}
            </Button>

            {isGuest && (
              <div className="mt-10 border border-blue-200 bg-blue-50 flex flex-col sm:flex-row items-start gap-3 rounded-md p-4 sm:p-5 w-full min-w-0">
               <IconInfoCircle size={32} className="text-blue-600 ms-2 flex-shrink-0" />
              <div className="min-w-0">
              <Text size="md" ta="start">
               
               {translations.guestLinkNote}
             </Text>
             <Text size="md" ta="start">
               {translations.guestSupportNotePrefix}
               <a
                 href="https://insightabusiness.com/en/contact"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="text-blue-600 hover:text-blue-700 underline underline-offset-2"
               >
                 {translations.contactUs}
               </a>
               .
             </Text>
             </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // Error UI
  if (paymentStatus === "error") {
    return (
      <div className="max-w-md mx-auto text-center">
        <h2 className="text-2xl font-bold mb-2 text-red-600">{translations.paymentFailed}</h2>
        <p className="text-gray-600 mb-6">{errorMessage}</p>
        {stripeAccepted && pollAttemptsEnded && (
          <Button
            size="lg"
            onClick={handleRetry}
            className="bg-gradient-to-r from-blue-500 to-teal-400"
            loading={isRetrying}
            disabled={isRetrying}
          >
            {translations.tryAgain}
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Payment Header - Only show for normal payment state */}
      <div className="text-center mb-8">
        <h1 className={`text-3xl font-bold text-transparent bg-clip-text ${isRTL ? 'bg-gradient-to-l from-blue-400 to-teal-500' : 'bg-gradient-to-r from-blue-500 to-teal-400'} mb-2`}>
          {isRTL ? "إتمام الدفع" : "Complete Your Payment"}
        </h1>
        <p className="text-gray-600">
          {isRTL 
            ? "أدخل معلومات الدفع الخاصة بك لإكمال الطلب" 
            : "Enter your payment details to complete the order"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Two column layout for larger screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Order Summary - Left Column */}
        <Paper radius="md" className="border border-gray-200 h-fit p-4 sm:p-6 lg:min-h-[407px]">
          <Text size="lg" fw={600} mb="md">
            {translations.orderSummary}
          </Text>
          <Stack gap="sm">
            <Group justify="space-between">
              <Text>{orderTitle}</Text>
            </Group>
            
            {/* Display ordered files (API first; localStorage fallback) */}
            {docsToRender.length > 0 ? (
              <div className="mt-2">
                <div className="flex flex-col gap-3">
                  {docsToRender.map((doc) => (
                    <div
                      key={doc.key}
                      className="flex flex-wrap items-center gap-3 bg-gray-50 border border-gray-100 rounded-md px-4 py-3 min-w-0"
                    >
                      <Image
                        src={getFileIconByExtension(doc.file_extension)}
                        alt={`${doc.file_extension.toUpperCase()} file`}
                        width={20}
                        height={20}
                      />
                      <Text size="xs" c="dimmed" className="min-w-0 flex-1" truncate>
                        {doc.file_name}
                      </Text>
                      <Badge size="xs" color="blue" variant="light" className="bg-blue-100">
                        ${doc.price}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
            
            <Group justify="space-between" className="mt-3">
              <Text fw={600}>Total</Text>
              <Badge size="lg" color="blue" variant="filled">
                ${amount}
              </Badge>
            </Group>
          </Stack>
        </Paper>

        {/* Payment Element - Right Column */}
        <div className="space-y-6">
          <Paper radius="md" className="border border-gray-200 p-4 sm:p-6">
            <PaymentElement
              options={{
                layout: "tabs",
                fields: {
                  billingDetails: {
                    address: {
                      country: "auto",
                    },
                  },
                },
              }}
            />
          </Paper>

          {/* Security Note */}
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <IconLock size={16} />
            <Text size="sm" c="dimmed">
              {translations.securityNote}
            </Text>
          </div>

          {/* Inline Error Message */}
          {showInlineError && errorMessage && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-2">
              <Text size="sm" c="red" className="text-center">
                {errorMessage}
              </Text>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            fullWidth
            loading={isProcessing || paymentStatus === "polling"}
            disabled={!stripe || !elements || isProcessing || paymentStatus === "polling"}
            className="bg-gradient-to-r from-blue-500 to-teal-400 hover:opacity-90"
            leftSection={paymentStatus !== "polling" && <IconCreditCard size={20} />}
          >
            {paymentStatus === "processing" 
              ? translations.processing 
              : paymentStatus === "polling"
              ? translations.verifyingPayment
              : `${translations.payNow} $${amount}`}
          </Button>
        </div>
      </div>
      </form>
    </div>
  );
}

export default function StripePaymentPage() {
  const params = useParams();
  const locale = params.locale as string;
  const isRTL = locale === "ar";
  const searchParams = useSearchParams();
  const router = useRouter();

  const clientSecret = searchParams.get("client_secret") || "";
  const orderUuid = searchParams.get("order_uuid") || "";
  const amount = searchParams.get("amount") || "0";
  const title = searchParams.get("title") || "";
  const isGuest = searchParams.get("guest") === "1";
  
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [guestSummary, setGuestSummary] = useState<GuestOrderSummary | null>(null);
  const [storedSummary, setStoredSummary] = useState<StoredOrderSummary | null>(null);

  // Get auth token from cookies
  const getAuthToken = () => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    return token;
  };

  // Fetch order details
  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderUuid) return;
      if (isGuest) return;
      
      try {
        const token = getAuthToken();
        const response = await fetch(
          `https://api.insightabusiness.com/api/account/order/knowledge/${orderUuid}`,
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
          const data = await response.json();
          console.log('Order details fetched:', data.data);
          setOrderDetails(data.data);
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderDetails();
  }, [isGuest, orderUuid, locale]);

  // Guest: load summary from localStorage
  useEffect(() => {
    if (!isGuest) return;
    if (!orderUuid) return;
    try {
      const raw = localStorage.getItem(`guest-knowledge-order-summary:${orderUuid}`);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.documents)) {
        setGuestSummary(parsed);
      }
    } catch (e) {
      console.warn("Failed to load guest order summary", e);
    }
  }, [isGuest, orderUuid]);

  // Logged-in: load selected-documents summary from localStorage (fallback for order summary rendering)
  useEffect(() => {
    if (isGuest) return;
    if (!orderUuid) return;
    try {
      const raw = localStorage.getItem(`knowledge-order-summary:${orderUuid}`);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.documents)) {
        setStoredSummary(parsed);
      }
    } catch (e) {
      console.warn("Failed to load order summary", e);
    }
  }, [isGuest, orderUuid]);

  // Redirect if missing required params
  useEffect(() => {
    if (!clientSecret || !orderUuid) {
      router.push(`/${locale}/checkout`);
    }
  }, [clientSecret, orderUuid, router, locale]);

  if (!clientSecret) {
    return null;
  }

  const options = {
    clientSecret,
    appearance: {
      theme: "stripe" as const,
      variables: {
        colorPrimary: "#3b82f6",
        colorBackground: "#ffffff",
        colorText: "#1f2937",
        colorDanger: "#ef4444",
        fontFamily: "system-ui, -apple-system, sans-serif",
        borderRadius: "8px",
      },
    },
  };

  return (
    <>
      <PageIllustration middle={false} />
      
      <div className="min-h-screen relative z-1" dir={isRTL ? "rtl" : "ltr"}>
        <Container size="lg" className="py-8 sm:py-12 px-4">
          <div className="max-w-5xl mx-auto">
            <Elements stripe={stripePromise} options={options}>
              <PaymentForm 
                orderUuid={orderUuid}
                amount={amount}
                title={title}
                locale={locale}
                isRTL={isRTL}
                isGuest={isGuest}
                orderDetails={orderDetails}
                guestSummary={guestSummary}
                storedSummary={storedSummary}
                setOrderDetails={setOrderDetails}
              />
            </Elements>
          </div>
        </Container>
      </div>
    </>
  );
}