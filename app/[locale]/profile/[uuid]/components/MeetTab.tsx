"use client";

import React, { useState, useEffect } from "react";
import {
  IconCalendarX,
  IconChevronLeft,
  IconChevronRight,
  IconCalendarEvent,
  IconWallet,
  IconVideo,
  IconMapPin,
  IconBrandWhatsapp,
  IconInfoCircle,
} from "@tabler/icons-react";
import {
  Modal,
  TextInput,
  Textarea,
  Button,
  Select,
} from "@mantine/core";
import { useTranslations } from "next-intl";
import { Elements, useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { VisaIcon, MasterCardIcon, GooglePayIcon, ApplePayIcon } from "@/components/payment-icons";
import { useUserProfile } from "@/app/lib/useUserProfile";
import { useCountries } from "@/app/lib/useCountries";
import { getAuthToken } from "@/lib/authToken";
import { getStripePublishableKey } from "@/app/config";


// Initialize Stripe
const stripePromise = loadStripe(getStripePublishableKey());

interface MeetingTime {
  start_time: string;
  end_time: string;
  rate: string | number;
  rate_physical?: string | number | null;
  place?: string;
  place_name?: string;
  available_places?: string[];
  default_physical_location?: string | null;
}

interface MeetingAvailability {
  date: string;
  times: MeetingTime[];
}

const getMeetingRate = (
  time: MeetingTime,
  place: "online" | "physically" | null
): number => {
  const rawRate = place === "physically" && time.rate_physical != null
    ? time.rate_physical
    : time.rate;
  const rate = Number(rawRate);

  return Number.isFinite(rate) ? rate : 0;
};

interface MeetTabProps {
  locale: string;
  isRTL: boolean;
  profileData: { first_name?: string | null } | null;
  isAuthenticated: boolean;
  loadingMeetings: boolean;
  meetingAvailability: MeetingAvailability[];
  currentMonth: Date;
  selectedDate: string | null;
  selectedMeetingTime: MeetingTime | null;
  uuid: string;
  isOwnProfile: boolean;
  handlePreviousMonth: () => void;
  handleNextMonth: () => void;
  handleDateClick: (dateStr: string) => void;
  handleTimeClick: (time: MeetingTime) => void;
  fetchMeetingAvailability: () => void;
  isDateActive: (dateStr: string) => boolean;
  getMeetingTimesForDate: (dateStr: string) => MeetingTime[];
  getMonthName: (locale: string, date: Date) => string;
  getShortWeekdayNames: (locale: string) => string[];
  getDaysInMonth: (year: number, month: number) => number;
  getFirstDayOfMonth: (year: number, month: number) => number;
  formatDateString: (year: number, month: number, day: number) => string;
  getDayName: (locale: string, date: Date) => string;
}

const isSuccessfulMeetingPaymentStatus = (
  order?: { status?: string | null; payment_status?: string | null } | null
) => {
  const status = order?.status?.toLowerCase();
  const paymentStatus = order?.payment_status?.toLowerCase();

  return (
    status === "paid" ||
    status === "completed" ||
    status === "completed_pending_payment" ||
    paymentStatus === "completed" ||
    paymentStatus === "completed_pending_payment"
  );
};

// Stripe Payment Form Component
interface StripePaymentFormProps {
  clientSecret: string;
  onSuccess: () => void;
  onError: (error: string) => void;
  isProcessing: boolean;
  setIsProcessing: (processing: boolean) => void;
  locale: string;
  externalError?: string;
}

function StripePaymentForm({
  clientSecret,
  onSuccess,
  onError,
  isProcessing,
  setIsProcessing,
  locale,
  externalError
}: StripePaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setSubmitError(null);
    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.href,
      },
      redirect: "if_required",
    });

    if (error) {
      const message = error.message || "Payment failed";
      setSubmitError(message);
      onError(message);
    } else {
      onSuccess();
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      {(submitError || externalError) && (
        <div className="p-3 rounded-md bg-red-50 text-red-700 text-sm">
          {submitError || externalError}
        </div>
      )}
      <Button
        type="submit"
        disabled={!stripe || !elements || isProcessing}
        loading={isProcessing}
        fullWidth
        className="bg-blue-500 hover:bg-blue-600"
      >
        {locale.startsWith('ar') ? 'إتمام الدفع' : 'Complete Payment'}
      </Button>
    </form>
  );
}

export default function MeetTab({
  locale,
  isRTL,
  profileData,
  isAuthenticated,
  loadingMeetings,
  meetingAvailability,
  currentMonth,
  selectedDate,
  selectedMeetingTime,
  uuid,
  isOwnProfile,
  handlePreviousMonth,
  handleNextMonth,
  handleDateClick,
  handleTimeClick,
  fetchMeetingAvailability,
  isDateActive,
  getMeetingTimesForDate,
  getMonthName,
  getShortWeekdayNames,
  getDaysInMonth,
  getFirstDayOfMonth,
  formatDateString,
  getDayName,
}: MeetTabProps) {
  const t = useTranslations("ProfilePage");
  const { roles, refreshProfile } = useUserProfile();
  const { countries, isLoading: areCountriesLoading } = useCountries();

  // Check if user is client-only (has "client" role but not insighter, company, or company-insighter)
  const isClientOnlyUser =
    Array.isArray(roles) &&
    roles.includes("client") &&
    !roles.some((r) => ["insighter", "company", "company-insighter", "admin"].includes(r));

  // Modal and booking states
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<"online" | "physically" | null>(null);
  const [meetingTitle, setMeetingTitle] = useState("");
  const [meetingDescription, setMeetingDescription] = useState("");
  const [isBookingLoading, setIsBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<{
    title?: string;
    description?: string;
  }>({});
  const [showDuplicateWarning, setShowDuplicateWarning] = useState(false);
  const [isDuplicateCheckLoading, setIsDuplicateCheckLoading] = useState(false);

  // Payment related states
  const [paymentMethod, setPaymentMethod] = useState<"manual" | "provider" | null>(null);
  const [walletBalance, setWalletBalance] = useState(0);
  const [showSuccessUI, setShowSuccessUI] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [orderUuid, setOrderUuid] = useState<string | null>(null);
  const [showStripeElements, setShowStripeElements] = useState(false);
  const [isPollingStatus, setIsPollingStatus] = useState(false);
  const [isStripeProcessing, setIsStripeProcessing] = useState(false);
  const [hasCheckedDuplicate, setHasCheckedDuplicate] = useState(false);
  const [stripeErrorMessage, setStripeErrorMessage] = useState<string | null>(null);
  const [bookingStep, setBookingStep] = useState<1 | 2 | 3>(1);
  const [isFinalVerifying, setIsFinalVerifying] = useState(false);
  const [didStripeConfirm, setDidStripeConfirm] = useState(false);
  const [pollFinished, setPollFinished] = useState(false);
  const [pollFoundPaid, setPollFoundPaid] = useState<boolean | null>(null);
  const [paymentExpiresAt, setPaymentExpiresAt] = useState<number | null>(null);
  const [timeLeftMs, setTimeLeftMs] = useState<number>(0);
  const [showPaymentExpiredModal, setShowPaymentExpiredModal] = useState(false);
  const [authRedirectUrl, setAuthRedirectUrl] = useState<string | null>(null);
  const [processedMeetPrefillKey, setProcessedMeetPrefillKey] = useState<string | null>(null);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [isCheckingWhatsApp, setIsCheckingWhatsApp] = useState(false);
  const [isSavingWhatsApp, setIsSavingWhatsApp] = useState(false);
  const [whatsAppCountryCode, setWhatsAppCountryCode] = useState("");
  const [whatsAppNumber, setWhatsAppNumber] = useState("");
  const [whatsAppError, setWhatsAppError] = useState<string | null>(null);
  const [notificationProfile, setNotificationProfile] = useState<Record<string, unknown> | null>(null);
  const [hasVerifiedWhatsAppForBooking, setHasVerifiedWhatsAppForBooking] = useState(false);

  const countryCodeOptions = React.useMemo(() => {
    const uniqueCodes = new Set<string>();
    return countries.reduce<{ value: string; label: string }[]>((options, country) => {
      const code = String(country.international_code || "").replace(/^\+/, "");
      if (!code || uniqueCodes.has(code)) return options;
      uniqueCodes.add(code);
      const name = country.names?.[isRTL ? "ar" : "en"] || country.name;
      options.push({
        value: code,
        label: `${name} (+${code})`,
      });
      return options;
    }, []);
  }, [countries, isRTL]);

  // Fetch wallet balance when component mounts
  useEffect(() => {
    if (isAuthenticated) {
      fetchWalletBalance();
    }
  }, [isAuthenticated]);

  // Load meeting availability data when tab changes to "meet"
  useEffect(() => {
    if (isBookingModalOpen && isAuthenticated) {
      fetchWalletBalance();
    }
  }, [isBookingModalOpen, isAuthenticated]);

  // Reset duplicate-check memo when selection changes or modal toggles
  useEffect(() => {
    setHasCheckedDuplicate(false);
  }, [selectedDate, selectedMeetingTime, isBookingModalOpen]);

  // Start/stop payment countdown when entering/leaving Stripe payment step
  useEffect(() => {
    if (clientSecret && bookingStep === 2) {
      if (!paymentExpiresAt) {
        const expires = Date.now() + 30 * 60 * 1000;
        setPaymentExpiresAt(expires);
        setTimeLeftMs(expires - Date.now());
      }
    } else {
      setPaymentExpiresAt(null);
      setTimeLeftMs(0);
    }
  }, [clientSecret, bookingStep, paymentExpiresAt]);

  // Tick countdown every second
  useEffect(() => {
    if (!paymentExpiresAt) return;
    const tick = () => {
      const remaining = paymentExpiresAt - Date.now();
      setTimeLeftMs(Math.max(0, remaining));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [paymentExpiresAt]);

  // Auto-expire payment session when time runs out
  useEffect(() => {
    if (paymentExpiresAt && timeLeftMs === 0 && bookingStep === 2) {
      // Close modal, reset states, notify user, and refresh availability
      setShowPaymentExpiredModal(true);
      closeBookingModal();
    }
  }, [timeLeftMs, paymentExpiresAt, bookingStep]);

  const buildReturnUrlWithMeetingParams = () => {
    if (typeof window === "undefined") return null;
    if (!selectedDate || !selectedMeetingTime) return null;

    const url = new URL(window.location.href);
    const sp = url.searchParams;

    // Ensure we remain on Meet tab when returning
    sp.set("tab", "meet");

    sp.set("meetModal", "1");
    sp.set("meet_date", selectedDate);
    sp.set("start", selectedMeetingTime.start_time.substring(0, 5));
    sp.set("end", selectedMeetingTime.end_time.substring(0, 5));
    sp.set("title", meetingTitle || "");
    sp.set("description", meetingDescription || "");
    sp.set("payment_method", paymentMethod || "");
    sp.set("place", selectedPlace || "");

    url.search = sp.toString();
    return url.toString();
  };

  const normalizeDateKey = (input: string | null | undefined): string | null => {
    if (!input) return null;
    // Extract YYYY-MM-DD from possible ISO strings
    const match = String(input).match(/\d{4}-\d{2}-\d{2}/);
    return match ? match[0] : null;
  };

  const normalizeTimeKey = (input: string | null | undefined): string | null => {
    if (!input) return null;
    // Extract HH:MM from formats like 09:00, 09:00:00, 09:00:00.000Z, etc.
    const match = String(input).match(/(\d{2}):(\d{2})/);
    return match ? `${match[1]}:${match[2]}` : null;
  };

  const stripMeetParamsFromUrl = () => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    const sp = url.searchParams;
    const keys = [
      "meetModal",
      "meet_date",
      "start",
      "end",
      "title",
      "description",
      "payment_method",
      "place",
    ];
    keys.forEach((k) => sp.delete(k));
    url.search = sp.toString();
    window.history.replaceState(null, "", url.toString());
  };

  // If we came back from Angular with booking params, auto-select and prefill
  useEffect(() => {
    if (typeof window === "undefined") return;

    const sp = new URLSearchParams(window.location.search);
    const shouldAutoOpen = sp.get("meetModal") === "1";
    const meetDateRaw = sp.get("meet_date");
    const meetStartRaw = sp.get("start");
    const meetEndRaw = sp.get("end");
    const meetTitle = sp.get("title");
    const meetDesc = sp.get("description");
    const meetPayment = sp.get("payment_method");
    const meetPlaceRaw = sp.get("place");
    const meetPlace =
      meetPlaceRaw === "online" || meetPlaceRaw === "physically" ? meetPlaceRaw : null;

    const meetDate = normalizeDateKey(meetDateRaw);
    const meetStart = normalizeTimeKey(meetStartRaw);
    const meetEnd = normalizeTimeKey(meetEndRaw);

    if (!shouldAutoOpen || !meetDate) return;
    if (meetingAvailability.length === 0) return;

    const currentKey = [
      meetDate,
      meetStart || "",
      meetEnd || "",
      meetTitle || "",
      meetDesc || "",
      meetPayment || "",
      meetPlace || "",
    ].join("|");
    if (processedMeetPrefillKey === currentKey) return;

    // Prefill text fields
    setMeetingTitle(meetTitle || "");
    setMeetingDescription(meetDesc || "");

    // Prefill payment method (free is inferred from rate)
    if (meetPayment === "manual" || meetPayment === "provider") {
      setPaymentMethod(meetPayment);
    } else {
      setPaymentMethod(null);
    }

    // Open modal
    setIsBookingModalOpen(true);
    setBookingStep(1);

    // Select date/time once availability is present
    // Find matching day using tolerant date matching
    const dayData = meetingAvailability.find((d) => {
      const dKey = normalizeDateKey(d.date);
      return dKey === meetDate;
    });

    const dateToSelect = dayData?.date || meetDate;
    handleDateClick(dateToSelect);

    const times = dayData?.times || getMeetingTimesForDate(dateToSelect);
    const found = times.find((t) => {
      const s = normalizeTimeKey(t.start_time);
      const e = normalizeTimeKey(t.end_time);
      return s === meetStart && e === meetEnd;
    });

    if (found) {
      handleTimeClick(found);

      // Restore the selected session type, or preselect the sole available type.
      const places = getAvailablePlaces(found);
      if (meetPlace && places.includes(meetPlace)) {
        setSelectedPlace(meetPlace);
      } else if (places.length === 1) {
        setSelectedPlace(places[0]);
      } else {
        setSelectedPlace(null);
      }

      // Only strip params after successful selection, so we don't lose them if slot isn't found
      stripMeetParamsFromUrl();
      setProcessedMeetPrefillKey(currentKey);
    } else {
      // Keep params for retry and show a helpful error
      setBookingError(
        locale.startsWith("ar")
          ? "تعذر تحديد الوقت تلقائياً. يرجى اختيار الوقت من القائمة."
          : "Could not auto-select the time. Please pick the time from the list."
      );
      setProcessedMeetPrefillKey(currentKey);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meetingAvailability, processedMeetPrefillKey]);

  const formatTimeLeft = (ms: number): string => {
    const totalSeconds = Math.max(0, Math.floor(ms / 1000));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const fetchWalletBalance = async () => {
    try {
      const token = getAuthToken();
      if (!token) return;

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/account/wallet/balance`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Accept-Language": locale,
          "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setWalletBalance(data.data?.balance || 0);
      }
    } catch (error) {
      console.error("Error fetching wallet balance:", error);
    }
  };

  const validateBookingForm = (): boolean => {
    const errors: { title?: string; description?: string } = {};

    // Title validation
    if (!meetingTitle.trim()) {
      errors.title = t("titleRequired");
    } else if (meetingTitle.trim().length < 3) {
      errors.title = t("titleTooShort");
    } else if (meetingTitle.trim().length > 100) {
      errors.title = t("titleTooLong");
    }

    // Description validation
    if (meetingDescription.trim().length > 100) {
      errors.description = t("descriptionTooLong");
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle title change with validation
  const handleTitleChange = (value: string) => {
    setMeetingTitle(value);

    // Real-time validation for title
    const titleErrors: { title?: string } = {};
    if (value.trim() && value.trim().length < 3) {
      titleErrors.title = t("titleTooShort");
    } else if (value.trim().length > 50) {
      titleErrors.title = t("titleTooLong");
    }

    setValidationErrors((prev) => ({
      ...prev,
      title: titleErrors.title,
    }));
  };

  // Handle description change with validation
  const handleDescriptionChange = (value: string) => {
    setMeetingDescription(value);

    // Real-time validation for description
    const descErrors: { description?: string } = {};
    if (value.trim().length > 500) {
      descErrors.description = t("descriptionTooLong");
    }

    setValidationErrors((prev) => ({
      ...prev,
      description: descErrors.description,
    }));
  };

  // Check for duplicate meeting times
  const checkDuplicateMeetingTime = async (
    meetingDate: string,
    startTime: string,
    endTime: string
  ): Promise<boolean> => {
    try {
      const token = getAuthToken();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/account/meeting/client/check-duplicate-time`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Accept-Language": locale,
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify({
            meeting_date: meetingDate,
            start_time: startTime,
            end_time: endTime,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to check duplicate meeting time");
      }

      const data = await response.json();
      return data.data.exists;
    } catch (error) {
      console.error("Error checking duplicate meeting time:", error);
      return false; // If check fails, allow booking to proceed
    }
  };

  const pollOrderStatus = async (orderUuid: string): Promise<boolean> => {
    const token = getAuthToken();
    if (!token) return false;

    const getPollingDelay = (attempt: number): number => {
      const delays = [1000, 2000, 3000, 5000, 8000, 10000];
      return delays[Math.min(attempt, delays.length - 1)];
    };

    const checkStatus = async (): Promise<boolean> => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/account/order/meeting/${orderUuid}`,
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Accept-Language": locale,
              "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to check payment status");

        const data = await response.json();
        return isSuccessfulMeetingPaymentStatus(data.data);
      } catch (error) {
        console.error("Error checking payment status:", error);
        return false;
      }
    };

    for (let attempt = 0; attempt < 10; attempt++) {
      const isPaid = await checkStatus();
      if (isPaid) return true;

      const delay = getPollingDelay(attempt);
      await new Promise(resolve => setTimeout(resolve, delay));
    }

    return false;
  };

  const submitBookMeeting = async (skipDuplicateCheck = false) => {
    console.log("=== Starting submitBookMeeting ===");
    console.log("Current paymentMethod:", paymentMethod);

    if (!selectedDate || !selectedMeetingTime) {
      setBookingError(
        locale.startsWith("ar")
          ? "يرجى اختيار التاريخ والوقت أولاً."
          : "Please select the date and time first."
      );
      return;
    }

    // Validate form before submission
    if (!validateBookingForm()) {
      return;
    }

    // Guests: allow filling form, then redirect to login/signup with params
    if (!isAuthenticated) {
      const meetingPrice = getMeetingRate(selectedMeetingTime, selectedPlace);
      const isFree = meetingPrice === 0;

      if (!isFree && !paymentMethod) {
        setBookingError("Please select a payment method");
        return;
      }

      if (isFree) {
        // keep URL param consistent (even though UI doesn't need selection for free sessions)
        setPaymentMethod(null);
      }

      const returnUrl = buildReturnUrlWithMeetingParams();
      if (!returnUrl) return;
      setAuthRedirectUrl(returnUrl);
      setBookingStep(3);
      return;
    }

    // Also enforce the gate at checkout. This covers users returning from the
    // guest sign-in flow, where the booking modal is restored automatically.
    if (!hasVerifiedWhatsAppForBooking) {
      setIsBookingModalOpen(false);
      await handleBookMeetingClick();
      return;
    }

    setIsBookingLoading(true);
    setBookingError(null);

    try {
      // Check for duplicate meeting time first (unless skipped)
      const shouldSkipDuplicate = skipDuplicateCheck || hasCheckedDuplicate;
      if (!shouldSkipDuplicate) {
        setIsDuplicateCheckLoading(true);
        const isDuplicate = await checkDuplicateMeetingTime(
          selectedDate,
          selectedMeetingTime.start_time.substring(0, 5),
          selectedMeetingTime.end_time.substring(0, 5)
        );
        setIsDuplicateCheckLoading(false);

        if (isDuplicate) {
          setShowDuplicateWarning(true);
          setIsBookingLoading(false);
          return;
        }
        // Remember that we have already validated this selection
        setHasCheckedDuplicate(true);
      } else if (skipDuplicateCheck) {
        // If caller explicitly skipped (e.g., from warning), mark as checked
        setHasCheckedDuplicate(true);
      }

      // Get auth token from cookies
      const token = getAuthToken();

      // Get profile name from URL if profileData is unavailable
      const defaultName = uuid.toString().split("-")[0] || "consultant";

      // Check if meeting requires payment
      const meetingPrice = getMeetingRate(selectedMeetingTime, selectedPlace);
      const isFree = meetingPrice === 0;

      // For paid meetings, check payment method selection
      if (!isFree && !paymentMethod) {
        setBookingError("Please select a payment method");
        setIsBookingLoading(false);
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/account/order/meeting/checkout/${uuid}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Accept-Language": locale,
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify({
            meeting_date: selectedDate,
            start_time: selectedMeetingTime.start_time.substring(0, 5),
            end_time: selectedMeetingTime.end_time.substring(0, 5),
            place: selectedPlace,
            title: meetingTitle || `Meeting with ${defaultName}`,
            description: meetingDescription || "No description provided",
            payment_method: isFree ? "free" : paymentMethod,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to book meeting");
      }

      const data = await response.json();

      // Handle different payment scenarios
      if (isFree || paymentMethod === "manual") {
        // Free session or wallet payment - booking is complete
        setIsBookingModalOpen(false);
        setMeetingTitle("");
        setMeetingDescription("");
        setPaymentMethod(null);

        // Show enhanced success UI
        setShowSuccessUI(true);

        // Refresh availability and wallet balance
        fetchMeetingAvailability();
        fetchWalletBalance();
      } else if (paymentMethod === "provider") {
        // Stripe payment required
        console.log('Stripe payment data:', data); // Debug log

        // Check both possible response structures
        const responseData = data.data || data;
        const { client_secret, order_uuid } = responseData;

        console.log('Extracted values:', { client_secret, order_uuid }); // Debug log

        if (client_secret && order_uuid) {
          setClientSecret(client_secret);
          setOrderUuid(order_uuid);
          setStripeErrorMessage(null);
          setBookingStep(2);
          // initialize 30-min payment session
          const expires = Date.now() + 30 * 60 * 1000;
          setPaymentExpiresAt(expires);
          setTimeLeftMs(expires - Date.now());
        } else {
          console.error('Missing payment data in response:', responseData);
          throw new Error("Payment setup failed - missing payment information");
        }
      }
    } catch (error: unknown) {
      console.error("Error booking meeting:", error);
      setBookingError(
        error instanceof Error ? error.message : "Failed to book meeting"
      );
    } finally {
      setIsBookingLoading(false);
    }
  };

  const finalVerifyMeetingPayment = async () => {
    // Allow final verification ONLY if:
    // - Stripe confirmation succeeded (card accepted)
    // - Polling attempts have finished
    // - Polling did not observe a paid status (still pending)
    if (!orderUuid || !didStripeConfirm || !pollFinished || pollFoundPaid !== false) return;
    try {
      setIsFinalVerifying(true);
      const token = getAuthToken();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/account/order/meeting/check-payment-succeeded/${orderUuid}`,
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
        // After backend confirmation, re-fetch order to verify status is paid
        try {
          const verifyResp = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/account/order/meeting/${orderUuid}`,
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
          if (verifyResp.ok) {
            const verifyData = await verifyResp.json();
            const isPaid = isSuccessfulMeetingPaymentStatus(verifyData?.data);
            if (isPaid) {
              setStripeErrorMessage(null);
              setShowSuccessUI(true);
              setIsBookingModalOpen(false);
              setBookingStep(1);
            } else {
              setStripeErrorMessage(
                locale.startsWith('ar')
                  ? "لم يتم تأكيد حالة الطلب كمدفوع."
                  : "Order status is not paid after verification."
              );
            }
          } else {
            setStripeErrorMessage(
              locale.startsWith('ar')
                ? "تعذر التحقق من حالة الطلب."
                : "Unable to verify order status."
            );
          }
        } catch (e) {
          setStripeErrorMessage(
            locale.startsWith('ar')
              ? "حدث خطأ أثناء التحقق من حالة الطلب."
              : "An error occurred while verifying order status."
          );
        }
      } else {
        setStripeErrorMessage(
          locale.startsWith('ar')
            ? "تعذر التحقق النهائي من الدفع. يرجى المحاولة لاحقاً."
            : "Payment could not be verified. Please try again later."
        );
      }
    } catch (err) {
      console.error("Error verifying meeting payment:", err);
      setStripeErrorMessage(
        locale.startsWith('ar') ? "فشل التحقق من الدفع." : "Payment verification failed."
      );
    } finally {
      setIsFinalVerifying(false);
    }
  };

  // Override the handleBookMeeting from props to open modal
  // Resolve which places a slot allows. Falls back to the single `place` value
  // (or online) when the API doesn't provide the explicit list.
  const getAvailablePlaces = (time: MeetingTime | null): ("online" | "physically")[] => {
    if (!time) return [];
    const list =
      Array.isArray(time.available_places) && time.available_places.length
        ? time.available_places
        : time.place === "both"
          ? ["online", "physically"]
          : time.place === "physically"
            ? ["physically"]
            : ["online"];
    return list.filter(
      (p): p is "online" | "physically" => p === "online" || p === "physically"
    );
  };

  const openBookingModal = () => {
    setBookingError(null);
    setIsBookingModalOpen(true);
    setBookingStep(1);
  };

  const selectMeetingTime = (
    time: MeetingTime,
    place?: "online" | "physically"
  ) => {
    handleTimeClick(time);
    const places = getAvailablePlaces(time);
    setSelectedPlace(place && places.includes(place) ? place : places.length === 1 ? places[0] : null);
  };

  const handleBookMeetingClick = async () => {
    if (!selectedMeetingTime || !selectedPlace) return;
    if (!isAuthenticated) {
      openBookingModal();
      return;
    }

    setIsCheckingWhatsApp(true);
    setBookingError(null);
    try {
      const token = getAuthToken();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/account/profile`, {
        headers: {
          Accept: "application/json",
          "Accept-Language": locale,
          "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });
      if (!response.ok) throw new Error("Failed to check WhatsApp details");

      const body = await response.json();
      const profile = (body.data || body) as Record<string, unknown>;
      const status = String(profile.whatsapp_status || "inactive");
      const countryCode = String(profile.whatsapp_country_code || "").replace(/^\+/, "");
      const number = String(profile.whatsapp_number || "");

      if (status === "active" && countryCode && number) {
        setHasVerifiedWhatsAppForBooking(true);
        openBookingModal();
        return;
      }

      setIsBookingModalOpen(false);
      setNotificationProfile(profile);
      setWhatsAppCountryCode(countryCode);
      setWhatsAppNumber(number);
      setWhatsAppError(null);
      setIsWhatsAppModalOpen(true);
    } catch (error) {
      setBookingError(
        isRTL
          ? "تعذر التحقق من بيانات واتساب. يرجى المحاولة مرة أخرى."
          : error instanceof Error
            ? error.message
            : "Could not verify your WhatsApp details. Please try again."
      );
    } finally {
      setIsCheckingWhatsApp(false);
    }
  };

  const saveWhatsAppAndContinue = async () => {
    const normalizedNumber = whatsAppNumber.replace(/\D/g, "");
    if (!whatsAppCountryCode || normalizedNumber.length < 6 || normalizedNumber.length > 15) {
      setWhatsAppError(
        isRTL
          ? "يرجى اختيار رمز البلد وإدخال رقم واتساب صحيح."
          : "Select a country code and enter a valid WhatsApp number."
      );
      return;
    }

    setIsSavingWhatsApp(true);
    setWhatsAppError(null);
    try {
      const token = getAuthToken();
      const profile = notificationProfile || {};
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/account/profile/notification/channel`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Accept-Language": locale,
            "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify({
            whatsapp_status: "active",
            whatsapp_country_code: whatsAppCountryCode,
            whatsapp_number: normalizedNumber,
            sms_status: profile.sms_status || "inactive",
            sms_whatsapp: profile.sms_whatsapp || profile.sms_status || "inactive",
            sms_country_code: profile.sms_country_code || "",
            sms_number: profile.sms_number || "",
          }),
        }
      );

      if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        throw new Error(errorBody?.message || "Failed to save WhatsApp details");
      }

      await refreshProfile().catch(() => undefined);
      setHasVerifiedWhatsAppForBooking(true);
      setIsWhatsAppModalOpen(false);
      openBookingModal();
    } catch (error) {
      setWhatsAppError(
        error instanceof Error
          ? error.message
          : isRTL
            ? "تعذر حفظ رقم واتساب."
            : "Could not save your WhatsApp number."
      );
    } finally {
      setIsSavingWhatsApp(false);
    }
  };

  const skipWhatsAppAndContinue = () => {
    // WhatsApp is optional: allow the user to bypass it and continue booking.
    setWhatsAppError(null);
    setHasVerifiedWhatsAppForBooking(true);
    setIsWhatsAppModalOpen(false);
    openBookingModal();
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    setHasVerifiedWhatsAppForBooking(false);
    setSelectedPlace(null);
    setHasCheckedDuplicate(false);
    setBookingStep(1);
    setClientSecret(null);
    setOrderUuid(null);
    setStripeErrorMessage(null);
    setIsStripeProcessing(false);
    setIsPollingStatus(false);
    setDidStripeConfirm(false);
    setPollFinished(false);
    setPollFoundPaid(null);
    setPaymentExpiresAt(null);
    setTimeLeftMs(0);
    setAuthRedirectUrl(null);
    fetchMeetingAvailability();
  };

  return (
    <div className="py-8 px-6 md:px-10">
      <div className="flex flex-col items-center max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">
          {t("bookASession")} {t("with")}{" "}
          {profileData?.first_name || ""}
        </h2>

        {loadingMeetings ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-blue-500"></div>
          </div>
        ) : meetingAvailability.length === 0 ? (
          <div className="text-center py-16">
            <div className="flex justify-center mb-4">
              <IconCalendarX size={48} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-medium mb-2">
              {t("noConsultingSessions")}
            </h3>
            <p className="text-gray-500">{t("checkBackLater")}</p>
          </div>
        ) : (
          <div className="w-full">
            {/* Two-column layout: Calendar + Time Selection */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column: Calendar */}
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">
                  {t("selectDate")}
                </h3>

                {/* Month navigation */}
                <div className="flex justify-between items-center mb-4">
                  <button
                    onClick={handlePreviousMonth}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 transition"
                  >
                    <IconChevronLeft size={18} />
                  </button>
                  <h3 className="text-lg font-semibold">
                    {getMonthName(locale, currentMonth)}{" "}
                    {currentMonth.getFullYear()}
                  </h3>
                  <button
                    onClick={handleNextMonth}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700 transition"
                  >
                    <IconChevronRight size={18} />
                  </button>
                </div>

                {/* Weekday headers */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {getShortWeekdayNames(locale).map((day, index) => (
                    <div
                      key={index}
                      className="text-center text-sm font-medium text-gray-500 py-2"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar days */}
                <div className="grid grid-cols-7 gap-1">
                  {(() => {
                    const year = currentMonth.getFullYear();
                    const month = currentMonth.getMonth();
                    const daysInMonth = getDaysInMonth(year, month);
                    const firstDay = getFirstDayOfMonth(year, month);
                    const days = [];

                    // Empty cells for days before the first day of the month
                    for (let i = 0; i < firstDay; i++) {
                      days.push(
                        <div
                          key={`empty-${i}`}
                          className="h-10"
                        ></div>
                      );
                    }

                    // Days of the month
                    for (let day = 1; day <= daysInMonth; day++) {
                      const dateStr = formatDateString(
                        year,
                        month,
                        day
                      );
                      const isActive = isDateActive(dateStr);
                      const isSelected = dateStr === selectedDate;

                      days.push(
                        <button
                          key={day}
                          onClick={() =>
                            isActive ? handleDateClick(dateStr) : null
                          }
                          disabled={!isActive}
                          className={`
                            h-10 w-10 mx-auto rounded-full text-sm font-medium transition-colors
                            ${isActive
                              ? isSelected
                                ? "bg-blue-500 text-white"
                                : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                              : "text-gray-300 cursor-not-allowed"
                            }
                          `}
                        >
                          {day}
                        </button>
                      );
                    }
                    return days;
                  })()}
                </div>
              </div>

              {/* Right Column: Time Selection */}
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
                {selectedDate ? (
                  <>
                    <h3 className="text-lg font-semibold mb-2">
                      {locale.startsWith('ar')
                        ? `الجلسات المتاحة في ${getDayName('en-US', new Date(selectedDate))}, ${new Date(selectedDate).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric'
                        })}`
                        : `Available sessions on ${getDayName('en-US', new Date(selectedDate))}, ${new Date(selectedDate).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric'
                        })}`}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      {locale.startsWith('ar')
                        ? `جميع الأوقات بتوقيت 24 ساعة في المنطقة الزمنية المحلية (${Intl.DateTimeFormat().resolvedOptions().timeZone})`
                        : `All times shown in 24-hour format in your local timezone (${Intl.DateTimeFormat().resolvedOptions().timeZone})`}
                    </p>

                    <div className="space-y-3 mb-6">
                      {getMeetingTimesForDate(selectedDate).length >
                        0 ? (
                        getMeetingTimesForDate(selectedDate).map(
                          (time, index) => {
                            const isSelected =
                              selectedMeetingTime === time;
                            const availablePlaces = getAvailablePlaces(time);
                            const onlineAvailable = availablePlaces.includes("online");
                            const onsiteAvailable = availablePlaces.includes("physically");
                            const typeChoiceClass = (active: boolean) =>
                              `group relative flex min-w-0 items-center justify-center gap-2 rounded-lg border px-2.5 py-2 text-center transition-all ${
                                active
                                  ? "border-blue-500 bg-blue-500 text-white shadow-sm"
                                  : "border-gray-200 bg-white text-gray-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-blue-500 dark:hover:bg-slate-700"
                              }`;
                            const typeIconClass = (active: boolean) =>
                              `inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${
                                active
                                  ? "bg-white/20 text-white"
                                  : "bg-gray-50 text-gray-500 group-hover:bg-white group-hover:text-blue-600 dark:bg-slate-700 dark:text-slate-300"
                              }`;
                            const priceLabel = (place: "online" | "physically") => {
                              const price = getMeetingRate(time, place);
                              return price === 0 ? (isRTL ? "مجانية" : "Free") : `$${price}`;
                            };

                            return (
                              <div
                                key={index}
                                role="button"
                                tabIndex={0}
                                onClick={() => selectMeetingTime(time)}
                                onKeyDown={(event) => {
                                  if (event.key === "Enter" || event.key === " ") {
                                    event.preventDefault();
                                    selectMeetingTime(time);
                                  }
                                }}
                                className={`
                                w-full p-3 rounded-lg border text-left transition-colors cursor-pointer
                                ${isSelected
                                    ? "border-blue-500 bg-blue-50 text-blue-700"
                                    : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                                  }
                              `}
                              >
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                  <span className="shrink-0 font-medium">
                                    {new Date(`1970-01-01T${time.start_time}`).toLocaleTimeString(locale, {
                                      hour: '2-digit',
                                      minute: '2-digit',
                                      hour12: false
                                    })}{" "}
                                    -{" "}
                                    {new Date(`1970-01-01T${time.end_time}`).toLocaleTimeString(locale, {
                                      hour: '2-digit',
                                      minute: '2-digit',
                                      hour12: false
                                    })}
                                  </span>
                                  <div className="flex w-full justify-end gap-2 sm:w-auto">
                                    {onlineAvailable && (
                                      <button
                                        type="button"
                                        title={isRTL ? "جلسة عن بُعد" : "Online session"}
                                        aria-label={isRTL ? `اختيار جلسة عن بُعد، ${priceLabel("online")}` : `Select online session, ${priceLabel("online")}`}
                                        aria-pressed={isSelected && selectedPlace === "online"}
                                        onClick={(event) => {
                                          event.stopPropagation();
                                          selectMeetingTime(time, "online");
                                        }}
                                        className={typeChoiceClass(isSelected && selectedPlace === "online")}
                                      >
                                        <span className={typeIconClass(isSelected && selectedPlace === "online")}>
                                          <IconVideo size={16} />
                                        </span>
                                        <span className={`text-sm font-bold leading-tight ${getMeetingRate(time, "online") === 0 && !(isSelected && selectedPlace === "online") ? "text-green-600" : ""}`}>
                                          {priceLabel("online")}
                                        </span>
                                        <span
                                          role="tooltip"
                                          className="pointer-events-none absolute -top-9 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs font-medium text-white opacity-0 shadow-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 dark:bg-gray-100 dark:text-gray-900"
                                        >
                                          {isRTL ? "جلسة عن بُعد" : "Online session"}
                                        </span>
                                      </button>
                                    )}

                                    {onsiteAvailable && (
                                      <button
                                        type="button"
                                        title={isRTL ? "جلسة حضورية" : "On-site session"}
                                        aria-label={isRTL ? `اختيار جلسة حضورية، ${priceLabel("physically")}` : `Select on-site session, ${priceLabel("physically")}`}
                                        aria-pressed={isSelected && selectedPlace === "physically"}
                                        onClick={(event) => {
                                          event.stopPropagation();
                                          selectMeetingTime(time, "physically");
                                        }}
                                        className={typeChoiceClass(isSelected && selectedPlace === "physically")}
                                      >
                                        <span className={typeIconClass(isSelected && selectedPlace === "physically")}>
                                          <IconMapPin size={16} />
                                        </span>
                                        <span className={`text-sm font-bold leading-tight ${getMeetingRate(time, "physically") === 0 && !(isSelected && selectedPlace === "physically") ? "text-green-600" : ""}`}>
                                          {priceLabel("physically")}
                                        </span>
                                        <span
                                          role="tooltip"
                                          className="pointer-events-none absolute -top-9 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs font-medium text-white opacity-0 shadow-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 dark:bg-gray-100 dark:text-gray-900"
                                        >
                                          {isRTL ? "جلسة حضورية" : "On-site session"}
                                        </span>
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          }
                        )
                      ) : (
                        <p className="text-gray-500 text-center py-8">
                          No times available for this date
                        </p>
                      )}
                    </div>

                    {/* Book button - hide when viewing own profile */}
                    {!isOwnProfile && (
                      <>
                        <button
                          onClick={handleBookMeetingClick}
                          disabled={!selectedMeetingTime || !selectedPlace || isCheckingWhatsApp}
                          className={`
                            w-full py-3 px-6 rounded-lg font-medium transition-colors
                            ${selectedMeetingTime && selectedPlace && !isCheckingWhatsApp
                              ? "bg-blue-500 text-white hover:bg-blue-600"
                              : "bg-gray-200 text-gray-400 cursor-not-allowed"
                            }
                          `}
                        >
                          {isCheckingWhatsApp
                            ? isRTL ? "جارٍ التحقق..." : "Checking..."
                            : t("book")}
                        </button>
                        {!selectedPlace && selectedMeetingTime && getAvailablePlaces(selectedMeetingTime).length > 1 && (
                          <p className="mt-2 text-center text-xs font-medium text-amber-600 dark:text-amber-400">
                            {isRTL
                              ? "اختر نوع الجلسة من الأيقونات أعلاه للمتابعة."
                              : "Choose a session type from the icons above to continue."}
                          </p>
                        )}
                        <div className="mt-3 flex items-start gap-2 rounded-lg bg-emerald-50 px-3 py-2.5 text-xs leading-5 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-200">
                          <IconBrandWhatsapp size={18} className="mt-0.5 shrink-0" />
                          <p>
                            {isRTL
                              ? "في حال الحجز الحضوري، ستصلك رسالة واتساب تحتوي على معلومات التواصل مع الإنسايتر."
                              : "For on-site bookings, you’ll receive a WhatsApp message with the Insighter’s contact information."}
                          </p>
                        </div>
                        {bookingError && !isBookingModalOpen && (
                          <p className="mt-2 text-center text-sm text-red-600">{bookingError}</p>
                        )}
                      </>
                    )}


                  </>
                ) : (
                  <div className="text-center py-12">
                    <IconCalendarEvent
                      size={48}
                      className="text-gray-300 mx-auto mb-4"
                    />
                    <p className="text-gray-500">
                      {locale.startsWith('ar') ? "اختر تاريخ الجلسة ليتم عرض الأوقات المتاحة" : 'Please select a date to view available times'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* WhatsApp is optional: the user can add it or skip and continue booking. */}
        <Modal
          opened={isWhatsAppModalOpen}
          onClose={() => !isSavingWhatsApp && setIsWhatsAppModalOpen(false)}
          size="lg"
          centered
          title={isRTL ? "أضف رقم واتساب (اختياري)" : "Add WhatsApp (optional)"}
        >
          <div className="p-2" dir={isRTL ? "rtl" : "ltr"}>
            <div className="mb-5 flex items-start gap-3 rounded-xl border border-emerald-100 bg-emerald-50 p-4 dark:border-emerald-900 dark:bg-emerald-950/30">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                <IconBrandWhatsapp size={23} />
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {isRTL ? "ابقَ على اطلاع بتفاصيل حجزك" : "Stay updated on your booking"}
                </p>
                <p className="mt-1 text-sm leading-5 text-gray-600 dark:text-gray-300">
                  {isRTL
                    ? "أضف رقم واتساب لتلقّي تحديثات الحجز ومشاركة تفاصيل الجلسة بأمان، أو تخطَّ الآن وتابع."
                    : "Add a WhatsApp number to receive booking updates and securely share session details, or skip for now and continue."}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-[minmax(240px,1.1fr)_minmax(0,1.35fr)]">
              <Select
                label={isRTL ? "رمز البلد" : "Country code"}
                placeholder={isRTL ? "اختر الرمز" : "Select code"}
                data={countryCodeOptions}
                value={whatsAppCountryCode || null}
                onChange={(value) => setWhatsAppCountryCode(value || "")}
                searchable
                disabled={areCountriesLoading}
                nothingFoundMessage={isRTL ? "لا توجد نتائج" : "No countries found"}
                comboboxProps={{
                  width: 390,
                  position: isRTL ? "bottom-end" : "bottom-start",
                }}
                styles={{
                  dropdown: {
                    maxWidth: "calc(100vw - 32px)",
                    overflowX: "hidden",
                  },
                }}
                renderOption={({ option }) => {
                  const country = countries.find(
                    (item) => String(item.international_code || "").replace(/^\+/, "") === option.value
                  );
                  return (
                    <div className="flex w-full min-w-0 items-center gap-2.5">
                      {country?.flag && (
                        <img
                          src={`/images/flags/${country.flag}.svg`}
                          alt=""
                          className="h-4 w-6 shrink-0 rounded-sm object-cover"
                        />
                      )}
                      <span className="min-w-0 truncate">{option.label}</span>
                    </div>
                  );
                }}
              />
              <TextInput
                label={isRTL ? "رقم واتساب" : "WhatsApp number"}
                placeholder={isRTL ? "مثال: 7986456456" : "e.g. 7986456456"}
                leftSection={<IconBrandWhatsapp size={17} className="text-emerald-600" />}
                value={whatsAppNumber}
                onChange={(event) => setWhatsAppNumber(event.currentTarget.value.replace(/[^\d\s()-]/g, ""))}
                inputMode="tel"
              />
            </div>

            <div className="mt-3 flex items-start gap-2 text-xs text-gray-500 dark:text-gray-400">
              <IconInfoCircle size={16} className="mt-0.5 shrink-0" />
              <p>
                {isRTL
                  ? "أدخل الرقم بدون رمز البلد أو الصفر في بدايته."
                  : "Enter the number without the country code or a leading zero."}
              </p>
            </div>

            {whatsAppError && (
              <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-300">
                {whatsAppError}
              </div>
            )}

            <div className="mt-6 flex justify-end gap-3">
              <Button
                variant="subtle"
                onClick={skipWhatsAppAndContinue}
                disabled={isSavingWhatsApp}
              >
                {isRTL ? "تخطي الآن" : "Skip for now"}
              </Button>
              <Button
                onClick={saveWhatsAppAndContinue}
                loading={isSavingWhatsApp}
                leftSection={<IconBrandWhatsapp size={18} />}
                color="green"
              >
                {isRTL ? "حفظ ومتابعة" : "Save & continue"}
              </Button>
            </div>
          </div>
        </Modal>

        {/* Meeting Booking Modal */}
        <Modal
          opened={isBookingModalOpen}
          onClose={() => {
            if (!(bookingStep === 2 && (isStripeProcessing || isPollingStatus))) {
              closeBookingModal();
            }
          }}

          size="lg"
          centered
        >
          <div className="p-2">
            {bookingStep !== 3 && selectedDate && selectedMeetingTime && (
              <div className="mb-4 p-3 bg-blue-50 dark:bg-slate-700 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {t("bookingFor")}:
                </p>
                <p className="font-medium">
                  {new Date(selectedDate).toLocaleDateString(undefined, {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="font-medium">
                  {selectedMeetingTime.start_time.substring(0, 5)} -{" "}
                  {selectedMeetingTime.end_time.substring(0, 5)}
                </p>
                {selectedPlace && (
                  <p className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-300">
                    {selectedPlace === "physically" ? (
                      <IconMapPin size={16} />
                    ) : (
                      <IconVideo size={16} />
                    )}
                    {selectedPlace === "physically"
                      ? isRTL
                        ? "حضورياً"
                        : "On Site"
                      : isRTL
                        ? "عن بُعد"
                        : "Online"}
                  </p>
                )}
                {selectedPlace === "physically" && selectedMeetingTime.default_physical_location && (
                  <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-300">
                    {selectedMeetingTime.default_physical_location}
                  </p>
                )}
                <div className="mt-2 p-2 bg-white dark:bg-slate-600 rounded border">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {t("sessionRate")}
                    </span>
                    <span
                      className={`font-bold ${getMeetingRate(selectedMeetingTime, selectedPlace) === 0
                        ? "text-green-600"
                        : "text-blue-600"
                        }`}
                    >
                      {getMeetingRate(selectedMeetingTime, selectedPlace) === 0
                        ? "Free"
                        : `$${getMeetingRate(selectedMeetingTime, selectedPlace)}`}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {bookingStep !== 3 && bookingError && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg">
                {bookingError}
              </div>
            )}

            {bookingStep === 3 ? (
              // Guest auth step: hide all details and show a clean CTA
              <div className="w-full">
                <div className="rounded-xl border border-gray-100 dark:border-slate-700 bg-gradient-to-br from-blue-50 via-white to-teal-50 dark:from-slate-800 dark:via-slate-800 dark:to-slate-900 p-6 sm:p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100">
                      {locale.startsWith("ar")
                        ? "سجّل الدخول أو أنشئ حساباً للمتابعة"
                        : "Login or Sign up to continue"}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:gap-4">
                    <Button
                      fullWidth
                      size="lg"
                      radius="md"
                      className="h-12 sm:h-14 text-base sm:text-lg bg-blue-600 hover:bg-blue-700"
                      onClick={() => {
                        if (!authRedirectUrl) return;
                        const loginUrl = `${process.env.NEXT_PUBLIC_DASHBOARD_URL}/auth/login?returnUrl=${encodeURIComponent(
                          authRedirectUrl
                        )}`;
                        window.location.href = loginUrl;
                      }}
                    >
                      {locale.startsWith("ar") ? "تسجيل الدخول" : "Login"}
                    </Button>

                    <Button
                      fullWidth
                      size="lg"
                      radius="md"
                      variant="outline"
                      className="h-12 sm:h-14 text-base sm:text-lg border-blue-600 text-blue-700 hover:bg-blue-50"
                      onClick={() => {
                        if (!authRedirectUrl) return;
                        const signupUrl = `${process.env.NEXT_PUBLIC_DASHBOARD_URL}/auth/sign-up?returnUrl=${encodeURIComponent(
                          authRedirectUrl
                        )}`;
                        window.location.href = signupUrl;
                      }}
                    >
                      {locale.startsWith("ar") ? "إنشاء حساب" : "Sign Up"}
                    </Button>
                  </div>
                </div>
              </div>
            ) : bookingStep === 1 ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  submitBookMeeting();
                }}
              >
                <div className="mb-4">
                  <TextInput
                    label={t("meetingTitle")}
                    placeholder={t("enterMeetingTitle")}
                    value={meetingTitle}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    required
                    error={validationErrors.title}
                  />
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-gray-500">
                      {t("minimum3Characters")}
                    </span>
                    <span
                      className={`text-xs ${meetingTitle.length > 50
                        ? "text-red-500"
                        : "text-gray-500"
                        }`}
                    >
                      {meetingTitle.length}/50
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <Textarea
                    label={t("meetingDescription")}
                    placeholder={t("enterMeetingDescription")}
                    value={meetingDescription}
                    onChange={(e) => handleDescriptionChange(e.target.value)}
                    minRows={3}
                    error={validationErrors.description}
                  />
                  <div className="flex justify-between mt-1">
                    <span className="text-xs text-gray-500">
                      {t("optional")}
                    </span>
                    <span
                      className={`text-xs ${meetingDescription.length > 100
                        ? "text-red-500"
                        : "text-gray-500"
                        }`}
                    >
                      {meetingDescription.length}/100
                    </span>
                  </div>
                </div>

                {/* Payment Section */}
                {selectedMeetingTime && getMeetingRate(selectedMeetingTime, selectedPlace) > 0 && (
                  <div className="mb-6">
                    <h4 className="font-medium mb-4 text-gray-800 dark:text-gray-200 required">{t("paymentOptions")}</h4>

                    {/* Payment methods in one row */}
                    <div className="flex flex-col gap-3">
                      {/* Insighta Wallet Option (requires authentication + non-client-only) */}
                      {isAuthenticated && !isClientOnlyUser && (
                        <div
                          className={`border rounded-lg p-4 cursor-pointer transition-all min-h-[72px] ${paymentMethod === "manual"
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                            : "border-gray-200 dark:border-slate-600 hover:border-gray-300 dark:hover:border-slate-500"
                            } ${walletBalance < getMeetingRate(selectedMeetingTime, selectedPlace)
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                            }`}
                          onClick={() => {
                            if (walletBalance >= getMeetingRate(selectedMeetingTime, selectedPlace)) {
                              setPaymentMethod("manual")
                            }
                          }}
                        >
                          <div className="flex items-center justify-center  gap-4 h-full">
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="manual"
                              checked={paymentMethod === "manual"}
                              disabled={walletBalance < getMeetingRate(selectedMeetingTime, selectedPlace)}
                              onChange={() => {
                                if (walletBalance >= getMeetingRate(selectedMeetingTime, selectedPlace)) {
                                  setPaymentMethod("manual")
                                }
                              }}
                              className="w-4 h-4 flex-shrink-0"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <div className="font-medium text-sm text-gray-800 dark:text-gray-200">
                                  {locale.startsWith('ar') ? 'محفظة إنسايتا' : 'Insighta Wallet'}
                                </div>
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                                    <IconWallet
                                      size={24}
                                      color="#1BC653"
                                    />
                                  </div>
                                  <div className="text-right">
                                    <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                      ${walletBalance.toFixed(2)}
                                    </div>
                                    {walletBalance >= getMeetingRate(selectedMeetingTime, selectedPlace) ? (
                                      <div className="text-xs text-green-600 dark:text-green-400 font-medium">
                                        {locale.startsWith('ar') ? 'رصيد كافي' : 'Sufficient'}
                                      </div>
                                    ) : (
                                      <div className="text-xs text-red-500 font-medium">
                                        {locale.startsWith('ar') ? 'رصيد غير كافي' : 'Insufficient'}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Stripe Provider Option */}
                      <div
                        className={`border rounded-lg p-4 cursor-pointer transition-all min-h-[72px] ${paymentMethod === "provider"
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                          : "border-gray-200 dark:border-slate-600 hover:border-gray-300 dark:hover:border-slate-500"
                          }`}
                        onClick={() => setPaymentMethod("provider")}
                      >
                        <div className="flex items-center pt-2 justify-center gap-4 h-full">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="provider"
                            checked={paymentMethod === "provider"}
                            onChange={() => setPaymentMethod("provider")}
                            className="w-4 h-4 flex-shrink-0"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div className="font-medium text-sm text-gray-800 dark:text-gray-200">
                                {locale.startsWith('ar') ? 'بطاقة الائتمان' : 'Credit Card'}
                              </div>
                              <div className="flex items-center gap-1 sm:gap-3">
                                <div className="w-12 h-7 sm:w-16 sm:h-9 bg-gray-50/60 backdrop-blur-[8px] border border-gray-200/40 rounded-md flex items-center justify-center transition-all duration-200 hover:bg-gray-100/80 hover:border-gray-300/60 p-1 sm:p-2">
                                  <VisaIcon />
                                </div>
                                <div className="w-12 h-7 sm:w-16 sm:h-9 bg-gray-50/60 backdrop-blur-[8px] border border-gray-200/40 rounded-md flex items-center justify-center transition-all duration-200 hover:bg-gray-100/80 hover:border-gray-300/60 p-1 sm:p-2">
                                  <MasterCardIcon />
                                </div>
                                <div className="w-12 h-7 sm:w-16 sm:h-9 bg-gray-50/60 backdrop-blur-[8px] border border-gray-200/40 rounded-md flex items-center justify-center transition-all duration-200 hover:bg-gray-100/80 hover:border-gray-300/60 p-1 sm:p-2">
                                  <GooglePayIcon />
                                </div>
                                <div className="w-12 h-7 sm:w-16 sm:h-9 bg-gray-50/60 backdrop-blur-[8px] border border-gray-200/40 rounded-md flex items-center justify-center transition-all duration-200 hover:bg-gray-100/80 hover:border-gray-300/60 p-1 sm:p-2">
                                  <ApplePayIcon />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedMeetingTime && getMeetingRate(selectedMeetingTime, selectedPlace) === 0 && (
                  <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded">
                    <p className="text-sm text-green-700 dark:text-green-300">
                      {t("freeSession")}
                    </p>
                  </div>
                )}

                <div className="flex justify-end gap-3 mt-6">
                  <Button
                    variant="subtle"
                    onClick={closeBookingModal}
                  >
                    {t("cancel")}
                  </Button>
                  <Button
                    type="submit"
                    loading={isBookingLoading}
                    disabled={
                      Object.keys(validationErrors).some(
                        (key) =>
                          validationErrors[key as keyof typeof validationErrors]
                      )
                    }
                  >
                    {!isAuthenticated
                      ? (locale.startsWith("ar") ? "متابعة" : "Continue")
                      : t("confirmBooking")}
                  </Button>
                </div>
              </form>
            ) : (
              <>
                {clientSecret && (
                  <Elements
                    stripe={stripePromise}
                    options={{
                      clientSecret,
                    }}
                  >
                    {isPollingStatus ? (
                      <div className="py-10 text-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-blue-500 mx-auto mb-3"></div>
                        <p className="text-base font-medium text-gray-800 dark:text-gray-100">
                          {t("verifyingPayment")}
                        </p>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                          {locale.startsWith("ar")
                            ? "يرجى الانتظار... يتم التحقق من الدفع الآن."
                            : "Please wait... we’re verifying your payment now."}
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="mb-4 p-3 rounded-md bg-yellow-50 text-yellow-800 text-sm">
                          {locale.startsWith('ar') ? (
                            <>
                              لأسباب أمنية، تنتهي صلاحية جلسة الدفع خلال{" "}
                              <span className="font-semibold">
                                {formatTimeLeft(paymentExpiresAt ? timeLeftMs : 30 * 60 * 1000)}
                              </span>
                              . إذا انتهى الوقت، يجب بدء عملية دفع جديدة.
                            </>
                          ) : (
                            <>
                              For security, this payment session will expire in{" "}
                              <span className="font-semibold">
                                {formatTimeLeft(paymentExpiresAt ? timeLeftMs : 30 * 60 * 1000)}
                              </span>
                              . If time runs out, you’ll need to start a new payment.
                            </>
                          )}
                        </div>

                        <StripePaymentForm
                          clientSecret={clientSecret}
                          onSuccess={async () => {
                            if (orderUuid) {
                              setDidStripeConfirm(true);
                              setIsPollingStatus(true);
                              const success = await pollOrderStatus(orderUuid);
                              setIsPollingStatus(false);
                              setPollFinished(true);
                              setPollFoundPaid(success);
                              if (success) {
                                setShowSuccessUI(true);
                                setIsBookingModalOpen(false);
                                setBookingStep(1);
                              } else {
                                setStripeErrorMessage(t("paymentVerificationFailed"));
                              }
                            }
                          }}
                          onError={(error: string) => {
                            // Card declined or Stripe confirmation failed
                            setDidStripeConfirm(false);
                            setPollFinished(false);
                            setPollFoundPaid(null);
                            setStripeErrorMessage(error);
                          }}
                          isProcessing={isStripeProcessing}
                          setIsProcessing={setIsStripeProcessing}
                          locale={locale}
                          externalError={stripeErrorMessage || undefined}
                        />

                        <div className="mt-4 flex items-center gap-3 justify-start">
                          {didStripeConfirm && pollFinished && pollFoundPaid === false && orderUuid && !isStripeProcessing && (
                            <Button
                              onClick={finalVerifyMeetingPayment}
                              loading={isFinalVerifying}
                              disabled={isFinalVerifying}
                              className="bg-blue-500 hover:bg-blue-600"
                            >
                              {locale.startsWith('ar') ? 'محاولة أخيرة' : 'Retry Verification'}
                            </Button>
                          )}
                          <Button
                            variant="subtle"
                            onClick={() => {
                              if (!isStripeProcessing) {
                                setBookingStep(1);
                                setDidStripeConfirm(false);
                                setPollFinished(false);
                                setPollFoundPaid(null);
                              }
                            }}
                            disabled={isStripeProcessing}
                          >
                            {locale.startsWith('ar') ? 'رجوع' : 'Back'}
                          </Button>
                        </div>
                      </>
                    )}
                  </Elements>
                )}
              </>
            )}
          </div>
        </Modal>

        {/* Duplicate Meeting Warning Modal */}
        <Modal
          opened={showDuplicateWarning}
          onClose={() => setShowDuplicateWarning(false)}
          title={t("duplicateMeetingWarning")}
          size="md"
          centered
        >
          <div className="p-2">
            <p className="text-gray-700 mb-6">
              {t("duplicateMeetingMessage", {
                date: selectedDate ? new Date(selectedDate).toLocaleDateString() : "",
                startTime: selectedMeetingTime?.start_time.substring(0, 5) || "",
                endTime: selectedMeetingTime?.end_time.substring(0, 5) || ""
              })}
            </p>

            <div className="flex justify-end gap-3">
              <Button
                variant="subtle"
                onClick={() => setShowDuplicateWarning(false)}
              >
                {t("cancel")}
              </Button>
              <Button
                color="orange"
                onClick={() => {
                  setShowDuplicateWarning(false);
                  submitBookMeeting(true); // Skip duplicate check
                }}
                loading={isBookingLoading}
              >
                {t("continueBooking")}
              </Button>
            </div>
          </div>
        </Modal>

        {/* Success Modal */}
        <Modal
          opened={showSuccessUI}
          onClose={() => {
            setShowSuccessUI(false);
            setShowStripeElements(false);
            setClientSecret(null);
            setOrderUuid(null);
          }}
          size="md"
          centered
          withCloseButton={false}
        >
          <div className="text-center py-8">
            {/* Animated Checkmark */}
            <div className="mb-8">
              <div className="mx-auto w-24 h-24 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full opacity-20"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                      stroke="white"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Success Messages */}
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600 mb-2">
              {locale.startsWith('ar') ? 'تهانينا!' : 'Congratulations!'}
            </h1>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
              {locale.startsWith('ar') ? 'تم حجز الجلسة الاستشارية بنجاح!' : 'Session Booked Successfully!'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              {locale.startsWith('ar')
                ? 'تم حجز الجلسة الاستشارية بنجاح وانتظر الموافقة عليه من الإنسايتر.'
                : 'Your session has been successfully booked and is waiting for Insighter\'s approval.'}
            </p>


            <Button
              size="md"
              className="bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 transition-all"
              onClick={() => {
                // Redirect to meetings dashboard
                window.location.href = `${process.env.NEXT_PUBLIC_DASHBOARD_URL}/app/insighter-dashboard/my-meetings?tab=my-meetings`;
              }}
            >
              {locale.startsWith('ar') ? 'اذهب إلى الجلسات الاستشارية' : 'Go to Sessions'}
            </Button>
          </div>
        </Modal>

        {/* Payment Session Expired Modal */}
        <Modal
          opened={showPaymentExpiredModal}
          onClose={() => setShowPaymentExpiredModal(false)}
          title={locale.startsWith('ar') ? 'انتهت جلسة الدفع' : 'Payment Session Expired'}
          size="md"
          centered
        >
          <div className="p-2">
            <p className="text-gray-700 mb-6">
              {locale.startsWith('ar')
                ? 'انتهت صلاحية جلسة الدفع بعد 30 دقيقة. يرجى المحاولة مرة أخرى لاحقاً.'
                : 'Your payment session expired after 30 minutes. Please try again later.'}
            </p>
            <div className="flex justify-end">
              <Button onClick={() => setShowPaymentExpiredModal(false)}>
                {locale.startsWith('ar') ? 'حسناً' : 'OK'}
              </Button>
            </div>
          </div>
        </Modal>

        {/* Stripe Payment Modal removed; handled as step 2 inside booking modal */}
      </div>
    </div>
  );
}
