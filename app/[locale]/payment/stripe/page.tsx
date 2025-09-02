"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams, useParams, useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import Image from "next/image";

import { Container, Text, Button, Paper, Group, Stack, Badge } from "@mantine/core";
import { IconCreditCard, IconCheck } from "@tabler/icons-react";
import PageIllustration from "@/components/page-illustration";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";

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
}

interface PaymentFormProps {
  orderUuid: string;
  amount: string;
  title: string;
  locale: string;
  isRTL: boolean;
  orderDetails: OrderDetails | null;
}

function PaymentForm({ orderUuid, amount, title, locale, isRTL, orderDetails }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "polling" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Get auth token from cookies
  const getAuthToken = () => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    return token;
  };

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
  };

  // Poll order status
  const pollOrderStatus = useCallback(async () => {
    const token = getAuthToken();
    let attempts = 0;
    const maxAttempts = 100; // 30 attempts * 2 seconds = 60 seconds max

    const checkStatus = async (): Promise<boolean> => {
      try {
        const response = await fetch(
          `https://api.knoldg.com/api/account/order/knowledge/${orderUuid}`,
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
      // Wait 2 seconds before next check
      await new Promise(resolve => setTimeout(resolve, 2000));
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

  // Success UI
  if (paymentStatus === "success") {
    return (
      <div className="max-w-md mx-auto text-center">
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <IconCheck size={32} className="text-green-600" />
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-2">{translations.paymentSuccess}</h2>
        {/* <p className="text-gray-600 mb-6">{translations.redirecting}</p> */}
        <Button
          size="lg"
          className="bg-gradient-to-r from-blue-500 to-teal-400"
          onClick={() => window.location.href = "https://app.knoldg.com/app/insighter-dashboard/my-downloads"}
        >
          {translations.goToDownloads}
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
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Two column layout for larger screens */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Order Summary - Left Column */}
        <Paper  p="lg" radius="md" className="border border-gray-200 h-fit">
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
                paymentMethodOrder: ["card"],
              }}
            />
          </Paper>

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
          `https://api.knoldg.com/api/account/order/knowledge/${orderUuid}`,
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

            <Elements stripe={stripePromise} options={options}>
              <PaymentForm 
                orderUuid={orderUuid}
                amount={amount}
                title={title}
                locale={locale}
                isRTL={isRTL}
                orderDetails={orderDetails}
              />
            </Elements>
          </div>
        </Container>
      </div>
    </>
  );
}