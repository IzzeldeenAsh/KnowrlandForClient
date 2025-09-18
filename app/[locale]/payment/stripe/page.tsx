"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams, useParams, useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import Image from "next/image";

import { Container, Text, Button, Paper, Group, Stack, Badge, Progress } from "@mantine/core";
import { IconCreditCard, IconCheck, IconLock } from "@tabler/icons-react";
import PageIllustration from "@/components/page-illustration";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import styles from "./payment.module.css";

// Initialize Stripe
const stripePromise = loadStripe("pk_test_51RpQiFL3mrWP7a0P1OYWGeFJWtgMwcWJtiEDLvn29CpYn5x8Ou77YViA1yoimlixKU5aUAeOeN5VTfoC4sMpvFVF00qq9a6BNm");

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
  suborders: Suborder[];
  knowledge_download_ids?: string[];
}

interface PaymentFormProps {
  orderUuid: string;
  amount: string;
  title: string;
  locale: string;
  isRTL: boolean;
  orderDetails: OrderDetails | null;
  setOrderDetails: (details: OrderDetails) => void;
}

function PaymentForm({ orderUuid, amount, title, locale, isRTL, orderDetails, setOrderDetails }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "polling" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [showDocumentsAdded, setShowDocumentsAdded] = useState(false);
  const [isFetchingDownloadIds, setIsFetchingDownloadIds] = useState(false);

  // Get auth token from cookies
  const getAuthToken = () => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    return token;
  };

  // Fetch updated order details to get knowledge_download_ids
  const fetchUpdatedOrderDetails = useCallback(async (uuid: string, setOrderDetails: (details: OrderDetails) => void) => {
    try {
      setIsFetchingDownloadIds(true);
      const token = getAuthToken();
      const response = await fetch(
        `https://api.foresighta.co/api/account/order/knowledge/${uuid}`,
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
  }, [locale]);

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
    paymentFailed: isRTL ? "فشل الدفع" : "Payment Failed",
    tryAgain: isRTL ? "حاول مرة أخرى" : "Try Again",
    preparingDownloads: isRTL ? "جاري تجهيز التنزيلات..." : "Preparing your downloads...",
    documentsAdded: isRTL ? "تمت إضافة المستندات إلى التنزيلات الخاصة بك" : "Documents added to your Downloads",
    congratulations: isRTL ? "تهانينا!" : "Congratulations!",
    paymentComplete: isRTL ? "تمت معالجة دفعتك بنجاح" : "Your payment has been processed successfully",
    accessGranted: isRTL ? "يمكنك الآن الوصول إلى جميع المستندات المشتراة" : "You now have access to all your purchased documents",
    securityNote: isRTL ? "معلومات بطاقتك آمنة ولن يتم حفظها" : "Your card information is secure and will not be saved",
  };

  // Poll order status
  const pollOrderStatus = useCallback(async () => {
    const token = getAuthToken();
    let attempts = 0;
    const maxAttempts = 18; // ~2 minutes with progressive delays
    
    // Progressive delay calculation
    const getPollingDelay = (attempt: number): number => {
      if (attempt < 5) return 4000;    // 4 seconds for first 5 attempts
      if (attempt < 10) return 6000;   // 6 seconds for next 5 attempts
      return 10000;                     // 10 seconds for remaining attempts
    };

    const checkStatus = async (): Promise<boolean> => {
      try {
        const response = await fetch(
          `https://api.foresighta.co/api/account/order/knowledge/${orderUuid}`,
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
        
        if (data.data?.status === "paid") {
          return true;
        }
        
        return false;
      } catch (error) {
        console.error("Error checking order status:", error);
        return false;
      }
    };

    setPaymentStatus("polling");

    while (attempts < maxAttempts) {
      const isPaid = await checkStatus();
      
      if (isPaid) {
        setPaymentStatus("success");
        return true;
      }

      attempts++;
      // Wait with progressive delay before next check
      await new Promise(resolve => setTimeout(resolve, getPollingDelay(attempts)));
    }

    setPaymentStatus("error");
    setErrorMessage("Payment verification timed out");
    return false;
  }, [orderUuid, locale]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setPaymentStatus("processing");
    setErrorMessage("");

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
        setErrorMessage(result.error.message || "Payment failed");
        setPaymentStatus("error");
      } else {
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

  const handleRetry = () => {
    setPaymentStatus("idle");
    setErrorMessage("");
  };

  // Handle download progress animation when payment succeeds
  useEffect(() => {
    if (paymentStatus === "success") {
      // Animate progress bar over 2.5 seconds
      const duration = 2500;
      const interval = 50;
      const increment = 100 / (duration / interval);
      
      const timer = setInterval(() => {
        setDownloadProgress((prev) => {
          const next = prev + increment;
          if (next >= 100) {
            clearInterval(timer);
            setTimeout(async () => {
              setShowDocumentsAdded(true);
              // Recall the API to get updated knowledge_download_ids after documents are processed
              console.log('Documents processed, fetching updated order details...'); // Debug log
              await fetchUpdatedOrderDetails(orderUuid, setOrderDetails);
            }, 300);
            return 100;
          }
          return next;
        });
      }, interval);

      return () => clearInterval(timer);
    }
  }, [paymentStatus, orderUuid, fetchUpdatedOrderDetails, setOrderDetails]);

  // Success UI
  if (paymentStatus === "success") {
    return (
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
        
        <Button
          size="md"
          className={`bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 transition-all ${styles.downloadButton}`}
          loading={isFetchingDownloadIds}
          disabled={isFetchingDownloadIds}
          onClick={() => {
            console.log('Download button clicked. Order details:', orderDetails); // Debug log
            // Use knowledge_download_ids if available, otherwise fall back to title search
            if (orderDetails?.knowledge_download_ids && orderDetails.knowledge_download_ids.length > 0) {
              const uuidsParam = `?uuids=${orderDetails.knowledge_download_ids.join(',')}`;
              console.log('Redirecting with UUIDs:', uuidsParam); // Debug log
              window.location.href = `http://localhost:4200/app/insighter-dashboard/my-downloads${uuidsParam}`;
            } else {
              console.log('No UUIDs available, falling back to search'); // Debug log
              // Fallback to title search if no UUIDs available
              const searchTitle = orderDetails?.suborders?.[0]?.knowledge?.[0]?.title || "";
              const searchParam = searchTitle ? `?search=${encodeURIComponent(searchTitle)}` : "";
              console.log('Redirecting with search:', searchParam); // Debug log
              window.location.href = `http://localhost:4200/app/insighter-dashboard/my-downloads${searchParam}`;
            }
          }}
        >
          {isFetchingDownloadIds 
            ? (isRTL ? "جاري التحديث..." : "Updating...")
            : translations.goToDownloads}
        </Button>
      </div>
    );
  }

  // Error UI
  if (paymentStatus === "error") {
    return (
      <div className="max-w-md mx-auto text-center">
        <h2 className="text-2xl font-bold mb-2 text-red-600">{translations.paymentFailed}</h2>
        <p className="text-gray-600 mb-6">{errorMessage}</p>
        <Button
          size="lg"
          onClick={handleRetry}
          className="bg-gradient-to-r from-blue-500 to-teal-400"
        >
          {translations.tryAgain}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Payment Header - Only show for normal payment state */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 mb-2">
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
        <Paper  p="lg" radius="md" className="border border-gray-200 h-fit min-h-[407px]">
          <Text size="lg" fw={600} mb="md">
            {translations.orderSummary}
          </Text>
          <Stack gap="sm">
            <Group justify="space-between">
              <Text>{title}</Text>
            </Group>
            
            {/* Display ordered files */}
            {orderDetails && orderDetails.suborders && orderDetails.suborders.length > 0 && (
              <div className="mt-2">
                <div className="flex flex-col  flex-wrap gap-3">
                  {orderDetails.suborders.map((suborder, subIndex) => 
                    suborder.knowledge_documents.flat().map((doc, docIndex) => (
                      <div key={`${subIndex}-${docIndex}`} className="flex items-center gap-2 bg-gray-50 rounded-md px-3 py-2">
                        <Image
                          src={getFileIconByExtension(doc.file_extension)}
                          alt={`${doc.file_extension.toUpperCase()} file`}
                          width={20}
                          height={20}
                        />
                        <Text size="xs" c="dimmed" style={{ maxWidth: '150px' }} truncate>
                          {doc.file_name}
                        </Text>
                        <Badge size="xs" color="blue" variant="light" className="bg-blue-100">
                          ${doc.price}
                        </Badge>
                      </div>
                    ))  
                  )}
                </div>
              </div>
            )}
            
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
          <Paper  p="lg" radius="md" className="border border-gray-200">
            <PaymentElement 
              options={{
                layout: "tabs",
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
  
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

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
      
      try {
        const token = getAuthToken();
        const response = await fetch(
          `https://api.foresighta.co/api/account/order/knowledge/${orderUuid}`,
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
  }, [orderUuid, locale]);

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
        <Container size="lg" className="py-12">
          <div className="max-w-5xl mx-auto">
            <Elements stripe={stripePromise} options={options}>
              <PaymentForm 
                orderUuid={orderUuid}
                amount={amount}
                title={title}
                locale={locale}
                isRTL={isRTL}
                orderDetails={orderDetails}
                setOrderDetails={setOrderDetails}
              />
            </Elements>
          </div>
        </Container>
      </div>
    </>
  );
}