"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useParams, useRouter } from "next/navigation";

import {
  Group,
  Text,
  Button,
  Checkbox,
  Badge,
  Divider,
  Stack,
  Image as MantineImage,
  Container,
} from "@mantine/core";
import Image from "next/image";
import { useToast } from "@/components/toast/ToastContext";
import PageIllustration from "@/components/page-illustration";
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

  const slug = searchParams.get("slug") || "";
  const documentIds =
    searchParams
      .get("documents")
      ?.split(",")
      .map((id) => parseInt(id)) || [];
  const knowledgeUUID = searchParams.get("knowledgeUUID") || "";
  const [knowledge, setKnowledge] = useState<Knowledge | null>(null);
  const [selectedDocuments, setSelectedDocuments] =
    useState<number[]>(documentIds);
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [walletBalance, setWalletBalance] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Translations
  const translations = {
    checkout: isRTL ? "الدفع" : "Checkout",
    selectDocuments: isRTL ? "المستندات المحددة" : "Selected Documents",
    totalPrice: isRTL ? "السعر الإجمالي" : "Total Price",
    paymentMethod: isRTL ? "طريقة الدفع" : "Payment Method",
    knoldgWallet: isRTL ? "محفظة نولدج" : "Knoldg Wallet",
    stripeProvider: isRTL ? "مزود سترايب" : "Stripe Provider",
    confirmOrder: isRTL ? "تأكيد الطلب" : "Confirm Order",
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
  };

  // Get auth token from cookies
  const getAuthToken = () => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    return token;
  };

  // Fetch knowledge data
  useEffect(() => {
    const fetchKnowledgeData = async () => {
      if (!slug) return;

      try {
        setIsLoading(true);
        const token = getAuthToken();

        const response = await fetch(
          `https://api.knoldg.com/api/platform/industries/knowledge/${slug}`,
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

        const data = await response.json();
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

        const response = await fetch(
          "https://api.knoldg.com/api/account/wallet/balance",
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
          setWalletBalance(data.data.balance);
        }
      } catch (error) {
        console.error("Error fetching wallet balance:", error);
      }
    };

    fetchWalletBalance();
  }, [locale]);

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

  // Handle document selection toggle
  const handleDocumentToggle = (documentId: number) => {
    setSelectedDocuments((prev) =>
      prev.includes(documentId)
        ? prev.filter((id) => id !== documentId)
        : [...prev, documentId]
    );
  };

  // Handle checkout
  const handleCheckout = async () => {
    if (!isFree && !paymentMethod) {
      toast.error(translations.pleaseSelectPayment, translations.orderError);
      return;
    }

    if (selectedDocuments.length === 0) {
      return;
    }

    setIsCheckingOut(true);
    try {
      const token = getAuthToken();

      const body = {
        payment_method: isFree ? "free" : paymentMethod,
        sub_orders: [
          {
            knowledge_id: knowledgeUUID, // Using knowledge ID
            knowledge_document_ids: selectedDocuments,
          },
        ],
      };

      const response = await fetch(
        "https://api.knoldg.com/api/account/order/knowledge/checkout",
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

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || `HTTP error! status: ${response.status}`
        );
      }



      toast.success(
        data.message || translations.orderSuccess,
        translations.orderSuccess
      );

      // Redirect to downloads page
        window.location.href="https://app.knoldg.com/app/insighter-dashboard/my-downloads"
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
  const documentsToShow = knowledge.documents.filter((doc) =>
    documentIds.includes(doc.id)
  );

  return (
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
              <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 mb-2">
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
                  <div className="border border-blue-200 rounded-lg p-4 mb-6">
              <Text size="lg" fw={600} mb="xs">
                {knowledge.title}
              </Text>
              <div className={styles.divider} />

              <Stack gap="md">
                {documentsToShow.map((doc) => (
                  <div
                    key={doc.id}
                    className={`${styles.documentCard} ${
                      selectedDocuments.includes(doc.id)
                        ? styles.documentCardSelected
                        : ""
                    }`}
                  >
                    <Group gap="md" wrap="nowrap">
                      <Checkbox
                        checked={selectedDocuments.includes(doc.id)}
                        onChange={() => handleDocumentToggle(doc.id)}
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
                        <Text size="sm" fw={500} truncate>
                          {doc.file_name}
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
                          : `$${parseFloat(doc.price).toFixed(2)}`}
                      </Badge>
                    </Group>
                  </div>
                ))}
              </Stack>

              
            </div>
     {/* Total Price */}
     <div className={`mb-6 ${styles.priceCard}`}>
                  <Group justify="space-between">
                    <Text size="lg" fw={600}>{translations.totalPrice}</Text>
                    <Badge size="lg" color="blue" variant="filled">
                      {isFree ? translations.free : `$${totalPrice.toFixed(2)}`}
                    </Badge>
                  </Group>
                </div>

                  </div>
            {!isFree && (
              <>
                <div className={styles.rightColumn}>
                  {/* Payment Methods */}
                  <div className="border border-blue-200 rounded-lg p-4">
                    <Text className={styles.sectionTitle}>
                      {translations.paymentMethod}
                    </Text>

                    <Stack gap="md">
                      {/* Wallet Method */}
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
                            <MantineImage
                              src="https://app.knoldg.com/assets/media/logos/custom-2.svg"
                              alt="Knoldg Wallet"
                              width={32}
                              height={32}
                              fit="contain"
                            />
                          </div>
                          <div style={{ flex: 1 }}>
                            <Text fw={500}>{translations.knoldgWallet}</Text>
                            {walletBalance < totalPrice && (
                              <Text size="xs" c="red" mt={2}>
                                {translations.insufficientBalance} ($
                                {walletBalance.toFixed(2)})
                              </Text>
                            )}
                          </div>
                        </Group>
                      </div>

                      {/* Stripe Method */}
                      <div
                        className={`${styles.paymentMethodCard} ${
                          paymentMethod === "provider" ? styles.selected : ""
                        }`}
                        onClick={() => setPaymentMethod("provider")}
                      >
                        <Group gap="lg" align="center">
                          <div className={styles.methodCheckbox}>
                            <Checkbox
                              checked={paymentMethod === "provider"}
                              onChange={() => setPaymentMethod("provider")}
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
                            <MantineImage
                              src="https://www.citypng.com/public/uploads/preview/hd-stripe-official-logo-png-701751694777755j0aa3puxte.png"
                              alt="Stripe"
                              width={50}
                              height={25}
                              fit="contain"
                            />
                          </div>
                          <div
                            style={{
                              flex: 1,
                              minHeight: "48px",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <Text fw={500}>{translations.stripeProvider}</Text>
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
  );
}
