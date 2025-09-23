"use client";

import React, { useState, useEffect } from "react";
import {
  IconLock,
  IconCalendarX,
  IconChevronLeft,
  IconChevronRight,
  IconCalendarEvent,
} from "@tabler/icons-react";
import {
  Modal,
  TextInput,
  Textarea,
  Button,
  Image as MantineImage,
} from "@mantine/core";
import { useTranslations } from "next-intl";
import { Elements, useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { VisaIcon, MasterCardIcon, GooglePayIcon, ApplePayIcon } from "@/components/payment-icons";

// Initialize Stripe
const stripePromise = loadStripe("pk_test_51RvbpiRSMujJZykzGpYlMXB5BXcWcTKrBLcWVtvj3oM2vS9S0z1Ur8YVWPDVSoRTwIoYEDMkvnblr7VbQMCiwwx700TNlixQE6");

interface MeetingTime {
  start_time: string;
  end_time: string;
  rate: string;
}

interface MeetingAvailability {
  date: string;
  times: MeetingTime[];
}

interface MeetTabProps {
  locale: string;
  isRTL: boolean;
  profileData: any;
  authChecked: boolean;
  isAuthenticated: boolean;
  loadingMeetings: boolean;
  meetingAvailability: MeetingAvailability[];
  currentMonth: Date;
  selectedDate: string | null;
  selectedMeetingTime: MeetingTime | null;
  uuid: string;
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

// Stripe Payment Form Component
interface StripePaymentFormProps {
  clientSecret: string;
  onSuccess: () => void;
  onError: (error: string) => void;
  isProcessing: boolean;
  setIsProcessing: (processing: boolean) => void;
  locale: string;
}

function StripePaymentForm({
  clientSecret,
  onSuccess,
  onError,
  isProcessing,
  setIsProcessing,
  locale
}: StripePaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.href,
      },
      redirect: "if_required",
    });

    if (error) {
      onError(error.message || "Payment failed");
    } else {
      onSuccess();
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
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
  authChecked,
  isAuthenticated,
  loadingMeetings,
  meetingAvailability,
  currentMonth,
  selectedDate,
  selectedMeetingTime,
  uuid,
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

  // Modal and booking states
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
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

  const fetchWalletBalance = async () => {
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!token) return;

      const response = await fetch("https://api.knoldg.com/api/account/wallet/balance", {
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
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

      const response = await fetch(
        "https://api.knoldg.com/api/account/meeting/client/check-duplicate-time",
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
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) return false;

    const getPollingDelay = (attempt: number): number => {
      const delays = [1000, 2000, 3000, 5000, 8000, 10000];
      return delays[Math.min(attempt, delays.length - 1)];
    };

    const checkStatus = async (): Promise<boolean> => {
      try {
        const response = await fetch(
          `https://api.knoldg.com/api/account/order/meeting/${orderUuid}`,
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
        return data.data?.status === "paid" || data.data?.payment_status === "completed";
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

    if (!selectedDate || !selectedMeetingTime) return;

    // Validate form before submission
    if (!validateBookingForm()) {
      return;
    }

    setIsBookingLoading(true);
    setBookingError(null);

    try {
      // Check for duplicate meeting time first (unless skipped)
      if (!skipDuplicateCheck) {
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
      }

      // Get auth token from localStorage
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

      // Get profile name from URL if profileData is unavailable
      const defaultName = uuid.toString().split("-")[0] || "consultant";

      // Check if meeting requires payment
      const meetingPrice = parseFloat(selectedMeetingTime.rate);
      const isFree = meetingPrice === 0;

      // For paid meetings, check payment method selection
      if (!isFree && !paymentMethod) {
        setBookingError("Please select a payment method");
        setIsBookingLoading(false);
        return;
      }

      const response = await fetch(
        `https://api.knoldg.com/api/account/order/meeting/checkout/${uuid}`,
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
          setShowStripeElements(true);
        } else {
          console.error('Missing payment data in response:', responseData);
          throw new Error("Payment setup failed - missing payment information");
        }
      }
    } catch (error: any) {
      console.error("Error booking meeting:", error);
      setBookingError(
        error instanceof Error ? error.message : "Failed to book meeting"
      );
    } finally {
      setIsBookingLoading(false);
    }
  };

  // Override the handleBookMeeting from props to open modal
  const handleBookMeetingClick = () => {
    setIsBookingModalOpen(true);
  };

  return (
    <div className="py-8 px-6 md:px-10">
      <div className="flex flex-col items-center max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">
          {t("bookASession")} {t("with")}{" "}
          {profileData?.first_name || ""}
        </h2>

        {!authChecked ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : !isAuthenticated ? (
          <div className="text-center py-16">
            <div className="flex justify-center mb-4">
              <IconLock size={48} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-medium mb-2">
              {t("loginRequired")}
            </h3>
            <p className="text-gray-500 mb-4">{t("loginToView")}</p>
            <a
              href={`https://app.knoldg.com/auth/login?returnUrl=${encodeURIComponent(
                `https://knoldg.com/${locale}/profile/${uuid}${
                  typeof window !== "undefined"
                    ? window.location.search
                    : ""
                }`
              )}`}
              className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition font-medium"
            >
              {t("login")}
            </a>
          </div>
        ) : loadingMeetings ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
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
                            ${
                              isActive
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
                      {locale.startsWith('ar') ? 'جميع الأوقات بتوقيت 24 ساعة' : 'All times shown in 24-hour format'}
                    </p>

                    <div className="space-y-3 mb-6">
                      {getMeetingTimesForDate(selectedDate).length >
                      0 ? (
                        getMeetingTimesForDate(selectedDate).map(
                          (time, index) => {
                            const isSelected =
                              selectedMeetingTime === time;
                            const rate = parseFloat(time.rate);
                            const isFree = rate === 0;

                            return (
                              <button
                                key={index}
                                onClick={() => handleTimeClick(time)}
                                className={`
                                w-full p-3 rounded-lg border text-left transition-colors
                                ${
                                  isSelected
                                    ? "border-blue-500 bg-blue-50 text-blue-700"
                                    : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                                }
                              `}
                              >
                                <div className="flex justify-between items-center">
                                  <span className="font-medium">
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
                                  <span
                                    className={`text-sm font-bold ${
                                      isFree
                                        ? "text-green-600"
                                        : "text-gray-600"
                                    }`}
                                  >
                                    {isFree ? "Free" : `$${rate}`}
                                  </span>
                                </div>
                              </button>
                            );
                          }
                        )
                      ) : (
                        <p className="text-gray-500 text-center py-8">
                          No times available for this date
                        </p>
                      )}
                    </div>

                    {/* Always visible Book button */}
                    <button
                      onClick={handleBookMeetingClick}
                      disabled={!selectedMeetingTime}
                      className={`
                        w-full py-3 px-6 rounded-lg font-medium transition-colors
                        ${
                          selectedMeetingTime
                            ? "bg-blue-500 text-white hover:bg-blue-600"
                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        }
                      `}
                    >
                      {t("book")}
                    </button>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <IconCalendarEvent
                      size={48}
                      className="text-gray-300 mx-auto mb-4"
                    />
                    <p className="text-gray-500">
                      Please select a date to view available times
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Meeting Booking Modal */}
        <Modal
          opened={isBookingModalOpen}
          onClose={() => {
            setIsBookingModalOpen(false);
          }}
          title={t("bookASession")}
          size="lg"
          centered
        >
          <div className="p-2">
            {selectedDate && selectedMeetingTime && (
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
                <div className="mt-2 p-2 bg-white dark:bg-slate-600 rounded border">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {t("sessionRate")}
                    </span>
                    <span
                      className={`font-bold ${
                        parseFloat(selectedMeetingTime.rate) === 0
                          ? "text-green-600"
                          : "text-blue-600"
                      }`}
                    >
                      {parseFloat(selectedMeetingTime.rate) === 0
                        ? "Free"
                        : `$${selectedMeetingTime.rate}`}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {bookingError && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg">
                {bookingError}
              </div>
            )}

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
                    className={`text-xs ${
                      meetingTitle.length > 50
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
                    className={`text-xs ${
                      meetingDescription.length > 100
                        ? "text-red-500"
                        : "text-gray-500"
                    }`}
                  >
                    {meetingDescription.length}/100
                  </span>
                </div>
              </div>

              {/* Payment Section */}
              {selectedMeetingTime && parseFloat(selectedMeetingTime.rate) > 0 && (
                <div className="mb-6">
                  <h4 className="font-medium mb-4 text-gray-800 dark:text-gray-200 required">{t("paymentOptions")}</h4>


                  {/* Payment methods in one row */}
                  <div className="flex flex-col gap-3">
                    {/* Knoldg Wallet Option */}
                    <div
                      className={`border rounded-lg p-4 cursor-pointer transition-all min-h-[72px] ${
                        paymentMethod === "manual"
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                          : "border-gray-200 dark:border-slate-600 hover:border-gray-300 dark:hover:border-slate-500"
                      } ${
                        walletBalance < parseFloat(selectedMeetingTime.rate)
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      onClick={() => {
                        if (walletBalance >= parseFloat(selectedMeetingTime.rate)) {
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
                          disabled={walletBalance < parseFloat(selectedMeetingTime.rate)}
                          onChange={() => {
                            if (walletBalance >= parseFloat(selectedMeetingTime.rate)) {
                              setPaymentMethod("manual")
                            }
                          }}
                          className="w-4 h-4 flex-shrink-0"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">

                            <div className="font-medium text-sm text-gray-800 dark:text-gray-200">
                              {locale.startsWith('ar') ? 'محفظة نولدج' : 'Knoldg Wallet'}
                            </div>
                            <div className="flex items-center gap-3">
                            <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                                <MantineImage
                                  src="https://app.knoldg.com/assets/media/logos/custom-2.svg"
                                  alt="Knoldg Wallet"
                                  width={24}
                                  height={24}
                                  fit="contain"
                                />
                              </div>
                              <div className="text-right">
                                <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                  ${walletBalance.toFixed(2)}
                                </div>
                                {walletBalance >= parseFloat(selectedMeetingTime.rate) ? (
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


                    {/* Stripe Provider Option */}
                    <div
                      className={`border rounded-lg p-4 cursor-pointer transition-all min-h-[72px] ${
                        paymentMethod === "provider"
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

              {selectedMeetingTime && parseFloat(selectedMeetingTime.rate) === 0 && (
                <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded">
                  <p className="text-sm text-green-700 dark:text-green-300">
                    {t("freeSession")}
                  </p>
                </div>
              )}

              <div className="flex justify-end gap-3 mt-6">
                <Button
                  variant="subtle"
                  onClick={() => {
                    setIsBookingModalOpen(false);
                  }}
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
                  {t("confirmBooking")}
                </Button>
              </div>
            </form>
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
              {locale.startsWith('ar') ? 'تم حجز الاجتماع بنجاح!' : 'Meeting Booked Successfully!'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              {locale.startsWith('ar')
                ? 'تم حجز الاجتماع بنجاح وانتظر الموافقة عليه من الإنسايتر.'
                : 'Your meeting has been successfully booked and is waiting for Insighter\'s approval.'}
            </p>


            <Button
              size="md"
              className="bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 transition-all"
              onClick={() => {
                // Redirect to meetings dashboard
                window.location.href = "https://app.knoldg.com/app/insighter-dashboard/my-meetings/sent";
              }}
            >
              {locale.startsWith('ar') ? 'اذهب إلى الاجتماعات' : 'Go to Meetings'}
            </Button>
          </div>
        </Modal>

        {/* Stripe Payment Modal */}
        <Modal
          opened={showStripeElements && !!clientSecret}
          onClose={() => {
            if (!isStripeProcessing && !isPollingStatus) {
              setShowStripeElements(false);
              setClientSecret(null);
              setOrderUuid(null);
            }
          }}
          title={locale.startsWith('ar') ? 'إتمام الدفع' : 'Complete Payment'}
          size="md"
          centered
        >
          {clientSecret && (
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret,
              }}
            >
              <StripePaymentForm
                clientSecret={clientSecret}
                onSuccess={async () => {
                  if (orderUuid) {
                    const success = await pollOrderStatus(orderUuid);
                    if (success) {
                      setShowStripeElements(false);
                      setShowSuccessUI(true);
                      setIsBookingModalOpen(false);
                    } else {
                      setBookingError(t("paymentVerificationFailed"));
                      setShowStripeElements(false);
                    }
                  }
                }}
                onError={(error: string) => {
                  setBookingError(error);
                  setShowStripeElements(false);
                }}
                isProcessing={isStripeProcessing || isPollingStatus}
                setIsProcessing={setIsStripeProcessing}
                locale={locale}
              />

              {isPollingStatus && (
                <div className="mt-4 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
                  <p className="text-sm text-gray-600">
                    {t("verifyingPayment")}
                  </p>
                </div>
              )}
            </Elements>
          )}
        </Modal>
      </div>
    </div>
  );
}