"use client";

// Import necessary for safe use of useSearchParams
import { useSearchParams } from "next/navigation";

import Footer from "@/components/ui/footer";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";

import Stripes from "@/public/images/stripes-dark.svg";
import {
  Container,
  Modal,
  TextInput,
  Textarea,
  Button,
  Tabs,
} from "@mantine/core";
import { useParams, useRouter } from "next/navigation";
import {
  IconBrandX,
  IconRosetteDiscountCheckFilled,
  IconFilter,
  IconFileReport,
  IconBrandHipchat,
  IconCalendarEvent,
  IconCalendarTime,
  IconClock,
  IconCalendarX,
  IconChevronLeft,
  IconChevronRight,
  IconLock,
} from "@tabler/icons-react";

import Toast from "@/components/toast/Toast";
import { GlobeAsiaAustraliaIcon } from "@heroicons/react/24/outline";
import KnowledgeGrid, {
  KnowledgeItem,
} from "@/app/[locale]/topic/[id]/[slug]/KnowledgeGrid";
import NewCertificationIcon from "@/app/components/icons/NewCertificationIcon";
import FacebookIcon from "@/public/file-icons/facebook";
import YoutubeIcon from "@/public/file-icons/youtube";
import LinkedinIcon from "@/public/file-icons/linkedin";
import InstagramIcon from "@/public/file-icons/instagram";
import { useTranslations } from "next-intl";
import styles from "./profile.module.css";
import Link from "next/link";

interface SocialLink {
  id: number;
  link: string;
  type: string;
}

interface Industry {
  id: number;
  name: string;
  slug: string;
  weight: number;
}

interface ConsultingField {
  id: number;
  name: string;
  names: {
    en: string;
    ar: string;
  };
}

interface Certification {
  id: number;
  name: string;
  type: string;
  url: string;
}

interface Company {
  legal_name: string;
  website: string;
  about_us: string;
  register_document: string;
  logo: string;
  address: string;
  verified: boolean;
  social: SocialLink[];
  uuid?: string;
}

interface ProfileData {
  uuid: string;
  name: string;
  first_name: string;
  last_name: string;
  email: string;
  roles: string[];
  profile_photo_url: string | null;
  country_id: number | null;
  country: string | null;
  bio: string | null;
  certifications: Certification[];
  industries: Industry[];
  consulting_field: ConsultingField[];
  social: SocialLink[];
  company?: Company;
}

// Updated Knowledge interface to match API response
interface KnowledgeApiItem {
  slug: string;
  type: string;
  title: string;
  description: string;
  total_price: string;
  published_at: string;
}

interface KnowledgeResponse {
  data: KnowledgeApiItem[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
    links: Array<{
      url: string | null;
      label: string;
      active: boolean;
    }>;
  };
}

interface MeetingTime {
  start_time: string;
  end_time: string;
  rate: string;
}

interface MeetingAvailability {
  date: string;
  day: string;
  active: boolean;
  times: MeetingTime[];
}

interface MeetingAvailabilityResponse {
  data: MeetingAvailability[];
}

export default function ProfilePage() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [knowledgeData, setKnowledgeData] = useState<KnowledgeResponse | null>(
    null
  );
  const [knowledgePage, setKnowledgePage] = useState(1);
  const [loadingKnowledge, setLoadingKnowledge] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [errorToast, setErrorToast] = useState<{
    show: boolean;
    message: string;
  }>({ show: false, message: "" });

  const params = useParams();
  const searchParams = useSearchParams();
  const uuid = params.uuid as string;
  const locale = params.locale as string;
  const isRTL = locale === "ar";
  const t = useTranslations("ProfilePage");
  const userProfileT = useTranslations("UserProfile");
  const filterT = useTranslations("Filters");
  const [enterpriseType, setEnterpriseType] = useState<string | null>(null);

  // Calendar booking states
  const [loadingMeetings, setLoadingMeetings] = useState(false);
  const [meetingAvailability, setMeetingAvailability] = useState<
    MeetingAvailability[]
  >([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedMeetingTime, setSelectedMeetingTime] =
    useState<MeetingTime | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [meetingTitle, setMeetingTitle] = useState("");
  const [meetingDescription, setMeetingDescription] = useState("");
  const [isBookingLoading, setIsBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [validationErrors, setValidationErrors] = useState<{
    title?: string;
    description?: string;
  }>({});
  const [showDuplicateWarning, setShowDuplicateWarning] = useState(false);
  const [isDuplicateCheckLoading, setIsDuplicateCheckLoading] = useState(false);

  // Get entity type from search params (safe for SSR)
  const entityParam = searchParams.get("entity");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Use a safe way to access window object
        const urlParams =
          typeof window !== "undefined"
            ? new URLSearchParams(window.location.search)
            : new URLSearchParams("");
        const entityType = urlParams.get("entity");
        setEnterpriseType(entityType);
        // If entity=insighter is specified, try insighter API first
        if (entityType === "insighter") {
          // Try insighter API first
          let response = await fetch(
            `https://api.knoldg.com/api/platform/insighter/profile/${uuid}`,
            {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Accept-Language": locale,
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            setProfileData(data.data);
          } else {
            // Fall back to company API if insighter fails
            response = await fetch(
              `https://api.knoldg.com/api/platform/company/profile/${uuid}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  "Accept-Language": locale,
                },
              }
            );

            if (!response.ok) {
              throw new Error("Failed to fetch profile data");
            }

            const data = await response.json();

            // Create a ProfileData object from company data
            const companyProfileData: ProfileData = {
              uuid: data.data.uuid,
              name: data.data.legal_name,
              first_name: "",
              last_name: "",
              email: "",
              roles: ["company"],
              profile_photo_url: data.data.logo,
              country_id: null,
              country: null,
              bio: data.data.about_us,
              certifications: data.data.certifications || [],
              industries: data.data.industries || [],
              consulting_field: data.data.consulting_field || [],
              social: data.data.social || [],
              company: {
                legal_name: data.data.legal_name,
                website: data.data.website,
                about_us: data.data.about_us,
                register_document: data.data.register_document,
                logo: data.data.logo,
                address: data.data.address,
                verified: data.data.verified,
                social: data.data.social || [],
                uuid: data.data.uuid,
              },
            };

            setProfileData(companyProfileData);
          }
        } else {
          // Default behavior: try company API first
          let response = await fetch(
            `https://api.knoldg.com/api/platform/company/profile/${uuid}`,
            {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Accept-Language": locale,
              },
            }
          );

          if (response.ok) {
            // It's a company profile
            const data = await response.json();

            // Create a ProfileData object from company data
            const companyProfileData: ProfileData = {
              uuid: data.data.uuid,
              name: data.data.legal_name,
              first_name: "",
              last_name: "",
              email: "",
              roles: ["company"],
              profile_photo_url: data.data.logo,
              country_id: null,
              country: null,
              bio: data.data.about_us,
              certifications: data.data.certifications || [],
              industries: data.data.industries || [],
              consulting_field: data.data.consulting_field || [],
              social: data.data.social || [],
              company: {
                legal_name: data.data.legal_name,
                website: data.data.website,
                about_us: data.data.about_us,
                register_document: data.data.register_document,
                logo: data.data.logo,
                address: data.data.address,
                verified: data.data.verified,
                social: data.data.social || [],
                uuid: data.data.uuid,
              },
            };

            setProfileData(companyProfileData);
          } else {
            // Try insighter API if company API fails
            response = await fetch(
              `https://api.knoldg.com/api/platform/insighter/profile/${uuid}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  "Accept-Language": locale,
                },
              }
            );

            if (!response.ok) {
              throw new Error("Failed to fetch profile data");
            }

            const data = await response.json();
            setProfileData(data.data);
          }
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (uuid) {
      fetchProfileData();
    }
  }, [uuid, locale]);

  useEffect(() => {
    const fetchKnowledgeData = async () => {
      if (!uuid || !profileData) return;

      setLoadingKnowledge(true);
      try {
        // Check URL query parameter to determine which API to use
        const urlParams = new URLSearchParams(window.location.search);
        const entityType = urlParams.get("entity");

        // Now fetch the filtered data
        let url =
          entityType === "insighter"
            ? `https://api.knoldg.com/api/platform/insighter/knowledge/${uuid}?page=${knowledgePage}&per_page=12`
            : `https://api.knoldg.com/api/platform/company/knowledge/${uuid}?page=${knowledgePage}&per_page=12`;

        if (selectedType) {
          url += `&type=${selectedType}`;
        }

        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Accept-Language": locale,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch knowledge data");
        }

        const data = await response.json();
        setKnowledgeData(data);
      } catch (error) {
        console.error("Error fetching knowledge data:", error);
      } finally {
        setLoadingKnowledge(false);
      }
    };

    fetchKnowledgeData();
  }, [uuid, locale, knowledgePage, selectedType, profileData]);

  // State to track if user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authChecked, setAuthChecked] = useState<boolean>(false);
  // State to track if current profile is the user's own profile
  const [isOwnProfile, setIsOwnProfile] = useState<boolean>(false);

  // Check if user is authenticated and fetch user profile if authenticated
  useEffect(() => {
    const checkAuth = async () => {
      // Check if token exists in localStorage
      const token = localStorage.getItem("token");
      const isAuth = !!token;
      setIsAuthenticated(isAuth);

      // If authenticated, fetch current user profile to check if viewing own profile
      if (isAuth && token) {
        try {
          const response = await fetch(
            "https://api.knoldg.com/api/account/profile",
            {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Accept-Language": locale,
                Authorization: `Bearer ${token}`,
                "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
              },
            }
          );

          if (response.ok) {
            const userData = await response.json();
            // Compare UUIDs to determine if this is the user's own profile
            if (userData?.data?.uuid === uuid) {
              setIsOwnProfile(true);
            }
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }

      setAuthChecked(true);
    };

    // Safe check for browser environment
    if (typeof window !== "undefined") {
      checkAuth();
    } else {
      setAuthChecked(true); // Mark as checked for SSR
    }
  }, [uuid, locale]);

  const [showToast, setShowToast] = useState(false);
  const [toastProps, setToastProps] = useState<{
    message: string;
    title?: string;
    type: "success" | "error" | "warning" | "info";
  }>({ message: "", type: "info" });

  // Helper function to format error messages from API
  const formatErrorMessage = (error: any): string => {
    if (error?.response?.data?.errors) {
      const errors = error.response.data.errors;
      // Join all error messages into a single string
      return Object.values(errors).flat().join(", ");
    }
    if (error?.response?.data?.message) {
      return error.response.data.message;
    }
    return "An error occurred. Please try again later.";
  };

  // Function to fetch meeting availability data
  const fetchMeetingAvailability = async () => {
    if (!uuid) return;

    // If user is not authenticated, don't make the API call
    if (!isAuthenticated) {
      setLoadingMeetings(false);
      return;
    }

    setLoadingMeetings(true);
    try {
      // Get auth token
      const token = localStorage.getItem("token");

      // Calculate start and end date (3 months range starting from tomorrow)
      const today = new Date();

      // Start date is tomorrow
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      const startDate = tomorrow.toISOString().split("T")[0]; // YYYY-MM-DD format

      // End date is 1 year from tomorrow
      const endDate = new Date(tomorrow);
      endDate.setFullYear(tomorrow.getFullYear() + 1);
      const endDateStr = endDate.toISOString().split("T")[0]; // YYYY-MM-DD format
      const response = await axios.post(
        `https://api.knoldg.com/api/account/meeting/available/hours/${uuid}`,
        {
          start_date: startDate,
          end_date: endDateStr,
        },
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

      if (response.data?.data) {
        setMeetingAvailability(response.data.data);
      }
    } catch (error: any) {
      console.error("Error fetching meeting availability:", error);
      const errorMessage = formatErrorMessage(error);
      setToastProps({
        message: errorMessage,
        type: "error",
        title: "Error",
      });
      setShowToast(true);
    } finally {
      setLoadingMeetings(false);
    }
  };

  // Load meeting availability data when tab changes to "meet"
  const handleTabChange = (value: string | null) => {
    if (value === "meet" && entityParam === "insighter") {
      fetchMeetingAvailability();
    }
  };

  // Check URL parameters on initial load to fetch meeting data if needed
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (
      tabParam === "meet" &&
      entityParam === "insighter" &&
      isAuthenticated &&
      authChecked
    ) {
      fetchMeetingAvailability();
    }
  }, [entityParam, isAuthenticated, authChecked]); // Run once authentication status is confirmed

  const getSocialIcon = (type: string) => {
    switch (type) {
      case "facebook":
        return <FacebookIcon />;
      case "x":
      case "twitter":
        return <IconBrandX className="text-blue-400" size={24} />;
      case "youtube":
        return <YoutubeIcon />;
      case "linkedin":
        return <LinkedinIcon />;
      case "instagram":
        return <InstagramIcon />;
      default:
        return null;
    }
  };

  const isCompany = profileData?.roles.includes("company");
  const isInsighter = profileData?.roles.includes("insighter");
  const isCompanyInsighter = profileData?.roles.includes("company-insighter");

  // Function to handle pagination
  const handlePageChange = (page: number) => {
    setKnowledgePage(page);
  };

  // Calendar utility functions
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const formatDateString = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
  };

  const getDayName = (locale: string, date: Date) => {
    return date.toLocaleDateString("en-US", { weekday: "long" });
  };

  const getMonthName = (locale: string, date: Date) => {
    return date.toLocaleDateString("en-US", { month: "long" });
  };

  const getShortWeekdayNames = (locale: string) => {
    const names = [];
    const date = new Date(2021, 0, 3); // Sunday
    for (let i = 0; i < 7; i++) {
      const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
      names.push(dayName);
      date.setDate(date.getDate() + 1);
    }
    return names;
  };

  const handlePreviousMonth = () => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(currentMonth.getMonth() - 1);
    setCurrentMonth(newDate);
    setSelectedDate(null);
    setSelectedMeetingTime(null);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(currentMonth.getMonth() + 1);
    setCurrentMonth(newDate);
    setSelectedDate(null);
    setSelectedMeetingTime(null);
  };

  // Check if a date is active (available for booking)
  const isDateActive = (dateStr: string) => {
    return meetingAvailability.some(
      (day) => day.date === dateStr && day.active
    );
  };

  // Get meeting times for a specific date
  const getMeetingTimesForDate = (dateStr: string) => {
    const dayData = meetingAvailability.find((day) => day.date === dateStr);
    return dayData?.times || [];
  };

  const handleDateClick = (dateStr: string) => {
    if (isDateActive(dateStr)) {
      setSelectedDate(dateStr);
      setSelectedMeetingTime(null);
    }
  };

  const handleTimeClick = (time: MeetingTime) => {
    setSelectedMeetingTime(time);
  };

  // Handle booking action - opens the modal to enter title and description
  const handleBookMeeting = () => {
    if (!selectedMeetingTime) {
      setToastProps({
        message: "Please select a time slot",
        type: "warning",
        title: "Selection Required",
      });
      setShowToast(true);
      return;
    }

    // Check if user is authenticated
    if (!isAuthenticated) {
      setToastProps({
        message: t("loginToView"),
        type: "warning",
        title: t("loginRequired"),
      });
      setShowToast(true);
      return;
    }

    // Open the booking modal
    setIsBookingModalOpen(true);
    setBookingError(null);
    setValidationErrors({});

    // Default title without relying on profileData
    const defaultName = profileData?.name || "consultant";
  };

  // Validation function for title and description
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

  // Submit booking - handles the API call
  const submitBookMeeting = async (skipDuplicateCheck = false) => {
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

      const response = await fetch(
        `https://api.knoldg.com/api/account/meeting/book/${uuid}`,
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
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to book meeting");
      }

      // Handle successful booking
      setIsBookingModalOpen(false);
      setMeetingTitle("");
      setMeetingDescription("");
      setSelectedMeetingTime(null);
      setSelectedDate(null);

      // Show success notification or message
      setToastProps({
        message: `Successfully booked meeting on ${new Date(
          selectedDate
        ).toLocaleDateString()} at ${selectedMeetingTime.start_time.substring(
          0,
          5
        )} - ${selectedMeetingTime.end_time.substring(0, 5)}`,
        type: "success",
        title: "Booking Confirmed",
      });
      setShowToast(true);

      // Refresh availability if needed
      fetchMeetingAvailability();
    } catch (error: any) {
      console.error("Error booking meeting:", error);
      setBookingError(
        error instanceof Error ? error.message : "Failed to book meeting"
      );
    } finally {
      setIsBookingLoading(false);
    }
  };

  // Convert API knowledge items to the format expected by KnowledgeGrid
  const formatKnowledgeItems = (): KnowledgeItem[] => {
    if (!knowledgeData || !profileData) return [];

    return knowledgeData.data.map((item) => ({
      ...item,
      insighter: {
        name: profileData.name,
        profile_photo_url: profileData.profile_photo_url,
        roles: profileData.roles,
      },
    }));
  };

  // Function to format published date - use a more consistent approach
  const formatPublishedDate = (dateString: string) => {
    // Create a stable date representation that won't differ between server and client
    const date = new Date(dateString);

    // For consistent server/client rendering, avoid locale-dependent formatting
    // or implement a solution with next-intl that handles this consistently
    if (typeof window === "undefined") {
      // Server-side - use a simple format that doesn't depend on locale
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${year}-${month.toString().padStart(2, "0")}-${day
        .toString()
        .padStart(2, "0")}`;
    } else {
      // Client-side - can use locale-specific formatting
      return date.toLocaleDateString(locale === "ar" ? "ar-SA" : "en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }
  };

  // Filter types for knowledge
  const knowledgeTypes = [
    {
      id: null,
      label: "all",
      icon: (isActive: boolean) => (
        <svg
          className={`${styles.icon} ${styles.iconData} ${
            isActive ? styles.iconActive : ""
          }`}
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 18.5V19.38C12 21.25 11.25 22 9.37 22H4.62C3.17 22 2 20.83 2 19.38V14.63C2 12.75 2.75 12 4.62 12H5.5V15.5C5.5 17.16 6.84 18.5 8.5 18.5H12Z"
            fill="currentColor"
          />
          <path
            d="M17 13.5V14.37C17 15.82 15.82 17 14.37 17H9.62C7.75 17 7 16.25 7 14.37V9.62C7 8.17 8.17 7 9.62 7H10.5V10.5C10.5 12.16 11.84 13.5 13.5 13.5H17Z"
            fill="currentColor"
          />
          <path
            d="M22 4.62V9.37C22 11.25 21.25 12 19.37 12H14.62C12.75 12 12 11.25 12 9.37V4.62C12 2.75 12.75 2 14.62 2H19.37C21.25 2 22 2.75 22 4.62Z"
            fill="currentColor"
          />
        </svg>
      ),
      filterClass: styles.filterAllActive,
    },
    {
      id: "data",
      label: "data",
      icon: (isActive: boolean) => (
        <svg
          className={`${styles.icon} ${styles.iconData} ${
            isActive ? styles.iconActive : ""
          }`}
          width="15"
          height="15"
          viewBox="0 0 30 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.5464 0C10.5851 0 6.86364 0.704566 4.06815 1.98373C1.48292 3.16777 0 4.73376 0 6.28348C0 7.8332 1.48292 9.39967 4.06815 10.5831C6.86364 11.8623 10.585 12.5669 14.5464 12.5669C18.5078 12.5669 22.2297 11.8623 25.0243 10.5831C27.6099 9.39967 29.0933 7.8333 29.0933 6.28348C29.0933 4.73367 27.6099 3.16777 25.0243 1.98373C22.2293 0.704566 18.5077 0 14.5464 0Z"
            fill="currentColor"
          />
          <path
            d="M0 9.45442C0.821516 10.3442 1.99713 11.1499 3.49489 11.8359C6.46628 13.1954 10.3914 13.9444 14.5469 13.9444C18.7023 13.9444 22.627 13.1949 25.5984 11.8359C27.0961 11.1499 28.2718 10.3445 29.0933 9.45442V13.4496C29.0933 15.004 27.6131 16.5723 25.0331 17.7531C22.2436 19.029 18.5194 19.7326 14.5464 19.7326C10.5734 19.7326 6.84871 19.029 4.05982 17.7531C1.47967 16.5723 0 15.004 0 13.4496V9.45442Z"
            fill="currentColor"
          />
          <path
            d="M29.0933 16.6207C26.6302 19.2908 21.1116 21.1102 14.5464 21.1102C7.98116 21.1102 2.46273 19.2908 0 16.6207V20.1383C0 21.6918 1.47967 23.261 4.05982 24.4417C6.84871 25.7181 10.5734 26.4217 14.5464 26.4217C18.5194 26.4217 22.2436 25.7181 25.0336 24.4417C27.6136 23.261 29.0933 21.6918 29.0933 20.1383V16.6207Z"
            fill="currentColor"
          />
          <path
            d="M4.05982 31.608C1.47967 30.4272 0 28.858 0 27.3041V23.3093C2.46273 25.9799 7.98116 27.7994 14.5464 27.7994C21.1116 27.7994 26.6302 25.9799 29.0933 23.3093V27.3041C29.0933 28.858 27.6131 30.4272 25.0331 31.608C22.2436 32.8844 18.5194 33.5875 14.5464 33.5875C10.5734 33.5875 6.84871 32.8844 4.05982 31.608Z"
            fill="currentColor"
          />
        </svg>
      ),
      filterClass: styles.filterDataActive,
    },
    {
      id: "insight",
      label: "insight",
      icon: (isActive: boolean) => (
        <svg
          className={`${styles.icon} ${styles.iconInsight} ${
            isActive ? styles.iconActive : ""
          }`}
          width="15"
          height="15"
          viewBox="0 0 42 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M29.5625 0C37.1458 0 41.6663 4.52116 41.6455 12.1045V29.5625C41.6455 37.1457 37.1251 41.6669 29.542 41.667H12.1045C4.52127 41.667 0.00012927 37.146 0 29.542V12.1045C0 4.52116 4.52116 0 12.1045 0H29.5625ZM11.9346 21.46C10.7753 21.4601 9.83305 22.4022 9.83301 23.5615V29.4678C9.83321 30.6269 10.7754 31.5682 11.9346 31.5684C13.112 31.5684 14.0545 30.627 14.0547 29.4678V23.5615C14.0546 22.4021 13.1121 21.46 11.9346 21.46ZM19.96 12.1846C18.7825 12.1847 17.8409 13.1268 17.8408 14.2861V29.4678C17.841 30.6269 18.7827 31.5682 19.96 31.5684C21.1192 31.5684 22.0613 30.627 22.0615 29.4678V14.2861C22.0615 13.1267 21.1194 12.1846 19.96 12.1846ZM27.6689 8.83301C26.4561 8.83301 25.4854 9.93196 25.4854 11.2842V28.9912C25.4855 30.3434 26.4561 31.4424 27.6689 31.4424C28.863 31.4423 29.8329 30.3433 29.833 28.9912V11.2842C29.8329 9.93204 28.8631 8.83313 27.6689 8.83301Z"
            fill="currentColor"
          />
        </svg>
      ),
      filterClass: styles.filterInsightActive,
    },
    {
      id: "report",
      label: "report",
      icon: (isActive: boolean) => (
        <svg
          className={`${styles.icon} ${styles.iconReport} ${
            isActive ? styles.iconActive : ""
          }`}
          width="15"
          height="15"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M45.125 21.75L43.0833 30.4583C41.3333 37.9792 37.875 41.0208 31.375 40.3958C30.3333 40.3125 29.2083 40.125 28 39.8333L24.5 39C15.8125 36.9375 13.125 32.6458 15.1667 23.9375L17.2083 15.2083C17.625 13.4375 18.125 11.8958 18.75 10.625C21.1875 5.58333 25.3333 4.22916 32.2917 5.875L35.7708 6.6875C44.5 8.72916 47.1667 13.0417 45.125 21.75Z"
            fill="currentColor"
          />
          <path
            d="M31.375 40.3958C30.0833 41.2708 28.4583 42 26.4792 42.6458L23.1875 43.7292C14.9167 46.3958 10.5625 44.1667 7.87499 35.8958L5.20833 27.6667C2.54166 19.3958 4.74999 15.0208 13.0208 12.3542L16.3125 11.2708C17.1667 11 17.9792 10.7708 18.75 10.625C18.125 11.8958 17.625 13.4375 17.2083 15.2083L15.1667 23.9375C13.125 32.6458 15.8125 36.9375 24.5 39L28 39.8333C29.2083 40.125 30.3333 40.3125 31.375 40.3958Z"
            fill="currentColor"
          />
          <path
            d="M36.4375 21.8959C36.3125 21.8959 36.1875 21.875 36.0417 21.8542L25.9375 19.2917C25.1042 19.0834 24.6042 18.2292 24.8125 17.3959C25.0208 16.5625 25.875 16.0625 26.7083 16.2709L36.8125 18.8334C37.6458 19.0417 38.1458 19.8959 37.9375 20.7292C37.7708 21.4167 37.125 21.8959 36.4375 21.8959Z"
            fill="white"
          />
          <path
            d="M30.3333 28.9375C30.2083 28.9375 30.0833 28.9167 29.9375 28.8959L23.875 27.3542C23.0417 27.1459 22.5417 26.2917 22.75 25.4584C22.9583 24.625 23.8125 24.125 24.6458 24.3334L30.7083 25.875C31.5417 26.0834 32.0417 26.9375 31.8333 27.7709C31.6667 28.4792 31.0417 28.9375 30.3333 28.9375Z"
            fill="white"
          />
        </svg>
      ),
      filterClass: styles.filterReportActive,
    },
    {
      id: "manual",
      label: "manual",
      icon: (isActive: boolean) => (
        <svg
          className={`${styles.icon} ${styles.iconManual} ${
            isActive ? styles.iconActive : ""
          }`}
          width="15"
          height="15"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M42.7083 14.5834V31.25H13.2292C9.95834 31.25 7.29167 33.9167 7.29167 37.1875V14.5834C7.29167 6.25002 9.37501 4.16669 17.7083 4.16669H32.2917C40.625 4.16669 42.7083 6.25002 42.7083 14.5834Z"
            fill="currentColor"
          />
          <path
            d="M42.7083 31.25V38.5417C42.7083 42.5625 39.4375 45.8333 35.4167 45.8333H14.5833C10.5625 45.8333 7.29167 42.5625 7.29167 38.5417V37.1875C7.29167 33.9167 9.95834 31.25 13.2292 31.25H42.7083Z"
            fill="currentColor"
          />
          <path
            d="M33.3333 16.1458H16.6667C15.8125 16.1458 15.1042 15.4375 15.1042 14.5833C15.1042 13.7291 15.8125 13.0208 16.6667 13.0208H33.3333C34.1875 13.0208 34.8958 13.7291 34.8958 14.5833C34.8958 15.4375 34.1875 16.1458 33.3333 16.1458Z"
            fill="white"
          />
          <path
            d="M27.0833 23.4375H16.6667C15.8125 23.4375 15.1042 22.7292 15.1042 21.875C15.1042 21.0208 15.8125 20.3125 16.6667 20.3125H27.0833C27.9375 20.3125 28.6458 21.0208 28.6458 21.875C28.6458 22.7292 27.9375 23.4375 27.0833 23.4375Z"
            fill="white"
          />
        </svg>
      ),
      filterClass: styles.filterManualActive,
    },
    {
      id: "course",
      label: "course",
      icon: (isActive: boolean) => (
        <svg
          className={`${styles.icon} ${styles.iconCourse} ${
            isActive ? styles.iconActive : ""
          }`}
          width="15"
          height="15"
          viewBox="0 0 39 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M31.9898 26.8163C31.9898 24.1788 29.8518 22.0408 27.2143 22.0408C24.5767 22.0408 22.4388 24.1788 22.4388 26.8163C22.4388 28.1696 23.0037 29.3885 23.9081 30.2576V36L27.2143 33.7959L30.5204 36V30.2576C31.4248 29.3885 31.9898 28.1696 31.9898 26.8163Z"
            fill="currentColor"
          />
          <path
            d="M37.1327 0H1.86734C1.05624 0 0.397949 0.657551 0.397949 1.46939V30.8572C0.397949 31.6683 1.05624 32.3265 1.86734 32.3265H20.9694V31.3443C20.0143 30.0372 19.5 28.4694 19.5 26.8163C19.5 22.5625 22.9604 19.102 27.2143 19.102C31.4682 19.102 34.9286 22.5625 34.9286 26.8163C34.9286 28.4701 34.4143 30.038 33.4592 31.345V32.3265H37.1327C37.9438 32.3265 38.6021 31.6683 38.6021 30.8572V1.46939C38.6021 0.657551 37.9438 0 37.1327 0ZM20.9694 13.2245H8.47959V10.2857H20.9694V13.2245ZM30.5204 7.34694H8.47959V4.40816H30.5204V7.34694Z"
            fill="currentColor"
          />
        </svg>
      ),
      filterClass: styles.filterCourseActive,
    },
  ];

  const handleTypeChange = (type: string | null) => {
    setSelectedType(type);
    setKnowledgePage(1); // Reset to page 1 when changing filter
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Toast for displaying API errors */}
      {showToast && (
        <div className="fixed top-6 right-6 z-50">
          <Toast
            message={toastProps.message}
            type={toastProps.type}
            title={toastProps.title}
            onClose={() => setShowToast(false)}
          />
        </div>
      )}
      {/* Decorative elements */}
      <div className="relative z-0 w-full overflow-hidden">
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 transform hidden md:block"
          style={{ left: "28%", top: "5%" }}
          aria-hidden="true"
        >
          <Image
            className="max-w-none opacity-30 dark:opacity-20"
            src={Stripes}
            width={768}
            height={768}
            style={{ width: "auto", height: "auto" }}
            alt="Stripes"
            priority
          />
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-96 bg-gradient-radial from-blue-100/40 to-transparent dark:from-blue-900/10 rounded-full blur-3xl -translate-y-1/4 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-64 bg-gradient-radial from-pink-100/30 to-transparent dark:from-pink-900/10 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4"></div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : profileData ? (
        <div className="w-full z-10" data-aos="fade-up">
          {/* Profile Header - Card Style */}
          <div className="bg-white dark:bg-slate-800 overflow-hidden mb-4 pb-10">
            {/* Banner */}
            <div className="h-[100px] dark:from-blue-700 dark:to-indigo-800 relative">
              <div
                className="pointer-events-none absolute z-10 -translate-x-1/2 transform hidden md:block"
                style={{ left: "28%" }}
                aria-hidden="true"
              >
                <Image
                  className="max-w-none opacity-50"
                  src={Stripes}
                  width={768}
                  height={768}
                  style={{ width: "auto", height: "auto" }}
                  alt="Stripes"
                  priority
                />
              </div>
            </div>

            {/* Profile Container */}
            <div className="max-w-6xl z-20 mx-auto px-4 sm:px-6 relative -mt-16">
              {/* Profile Layout - Image, Info, Stats */}
              <div className="flex flex-col md:flex-row gap-6  items-center md:items-start">
                {/* Profile Image */}
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 rounded-full  border border-blue-500 relative">
                    {isCompany && profileData.company?.logo ? (
                      <Link href={`${profileData.company?.uuid}`}>
                        <Image
                          src={profileData.company.logo}
                          alt={
                            profileData.company?.legal_name || profileData.name
                          }
                          width={400}
                          height={400}
                          className="w-full h-full rounded-full   object-cover"
                        />
                      </Link>
                    ) : profileData.profile_photo_url ? (
                      <Image
                        src={profileData.profile_photo_url}
                        alt={profileData.name}
                        width={400}
                        height={400}
                        className="w-full h-full rounded-full object-cover object-top"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center rounded-full">
                        <span className="text-4xl font-bold text-gray-400 dark:text-slate-400">
                          {profileData.first_name?.charAt(0) || ""}
                          {profileData.last_name?.charAt(0) || ""}
                        </span>
                      </div>
                    )}
                    {isCompanyInsighter && profileData.company?.logo && (
                      <div className="absolute -bottom-3 -right-3 w-14 h-14 rounded-full overflow-hidden shadow-sm bg-white dark:bg-slate-700 z-10 border-4 border-white bg-white">
                        <Link href={`${profileData.company?.uuid}`}>
                          <Image
                            src={profileData.company.logo}
                            alt={profileData.company.legal_name}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                          />
                        </Link>
                      </div>
                    )}
                    {isCompany && enterpriseType === "insighter" && (
                      <div className="absolute -bottom-3 -right-3 w-14 h-14 rounded-full border-4 border-white bg-white dark:bg-slate-700 z-10">
                        {profileData.profile_photo_url ? (
                          <Image
                            src={profileData.profile_photo_url}
                            alt={profileData.name}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover border-3 border-white rounded-full object-top"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center rounded-full">
                            <span className="text-sm font-bold text-gray-400 dark:text-slate-400">
                              {profileData.first_name?.charAt(0) || ""}
                              {profileData.last_name?.charAt(0) || ""}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Profile Info */}
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row h-full justify-between items-center">
                    <div>
                      {/* Name and Badges */}
                      <div className="flex flex-wrap items-center gap-2 mb-1 capitalize">
                        {enterpriseType === "insighter" && (
                          <div>
                            <h1 className="text-2xl font-bold">
                              {profileData.first_name.toLowerCase() || ""}{" "}
                              {profileData.last_name.toLowerCase() || ""}
                            </h1>
                          </div>
                        )}
                        {enterpriseType !== "insighter" && (
                          <h1 className="text-2xl font-bold">
                            {profileData.company?.legal_name || ""}
                          </h1>
                        )}

                        <IconRosetteDiscountCheckFilled className="w-5 h-5 text-blue-500" />
                        {isCompany && enterpriseType !== "insighter" && (
                          <span className="bg-[#EFF8FF] text-[#0978B9] font-bold  text-xs px-2 py-0.5 rounded-full inline-flex items-center">
                            {userProfileT("company")}
                          </span>
                        )}
                        {isCompany && enterpriseType === "insighter" && (
                          <Link href={`${profileData.company?.uuid}`}>
                            <span className="bg-[#EFF8FF] text-[#0978B9] font-bold  text-xs px-2 py-0.5 rounded-full inline-flex items-center">
                              {profileData.company?.legal_name} {t("compmay")}
                            </span>
                          </Link>
                        )}
                        {isInsighter && (
                          <span className="bg-green-100  text-[#1BC653] font-bold uppercase text-xs px-2 py-0.5 rounded-full inline-flex items-center">
                            {userProfileT("insighter")}
                          </span>
                        )}
                        {isCompanyInsighter && (
                          <Link href={`${profileData.company?.uuid}`}>
                            <span className="bg-[#EFF8FF] text-[#0978B9] font-bold uppercase text-xs px-2 py-0.5 rounded-full inline-flex items-center">
                              {profileData.company?.legal_name} {t("compmay")}
                            </span>
                          </Link>
                        )}
                      </div>
                      {(isCompany && entityParam) && <div className="text-blue-500 text-sm font-semibold">{t("manager")}</div>}

                      {/* Title/Role & Location */}
                      <div className="mb-3">
                        {/* 5-Star Rating */}
                        {/* <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg 
                              key={star} 
                              xmlns="http://www.w3.org/2000/svg" 
                              className={`h-4 w-4 ${star <= 4 ? 'text-yellow-400' : 'text-gray-300'}`} 
                              viewBox="0 0 20 20" 
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 01-3.138-3.138 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00.806 1.946 3.42 3.42 0 013.138 3.138z" />
                            </svg>
                          ))}
                          <span className="ml-1 text-xs text-gray-600 dark:text-gray-400">(4.0)</span>
                        </div> */}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-3 mb-4 justify-center md:justify-start">
                        <button className="px-3 py-1.5 text-xs bg-white dark:bg-slate-700 text-gray-800 dark:text-white rounded-md font-medium border border-gray-200 dark:border-slate-600 hover:border-gray-300 dark:hover:border-slate-500 shadow-sm hover:shadow-md transition transform hover:translate-y-[-1px]">
                          {t("follow")}
                        </button>
                      </div>
                    </div>

                    {/* Stats Section */}
                    <div className={`flex justify-center gap-4 mt-5`}>
                      <div className="text-start bg-gradient-to-br from-white to-emerald-50 dark:from-slate-700 dark:to-slate-600 p-3 rounded-lg hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-slate-600 group">
                        <div className="flex items-center mb-2">
                          <div className="p-1.5 bg-emerald-100 dark:bg-emerald-900/30 rounded-full me-2 group-hover:scale-110 transition-transform">
                            <IconFileReport
                              size={18}
                              className="text-emerald-500 dark:text-emerald-400"
                              stroke={2}
                            />
                          </div>
                          <span
                            className="text-xs font-medium text-emerald-600 dark:text-emerald-300"
                            dangerouslySetInnerHTML={{
                              __html: t("publishedKnowledge"),
                            }}
                          />
                        </div>
                        <p className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500 font-bold text-4xl">
                          {knowledgeData?.meta.total || 0}
                        </p>
                      </div>
                      {enterpriseType === "insighter" && (
                        <div className="text-start bg-gradient-to-br from-white to-blue-50 dark:from-slate-700 dark:to-slate-600 p-3 rounded-lg hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-slate-600 group">
                          <div className="flex items-center mb-2">
                            <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-full me-2 group-hover:scale-110 transition-transform">
                              <IconBrandHipchat
                                size={18}
                                className="text-blue-500 dark:text-blue-400"
                                stroke={2}
                              />
                            </div>
                            <span
                              className="text-xs font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500"
                              dangerouslySetInnerHTML={{
                                __html: t("consultingSessions"),
                              }}
                            />
                          </div>
                          <p className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-500 font-bold text-4xl">
                            0
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs with enhanced styling */}
          <div
            className="bg-white max-w-6xl mx-auto dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {/* Get the tab parameter from the search params, default to 'knowledge' if not provided */}
            <Tabs
              defaultValue={searchParams.get("tab") || "knowledge"}
              onChange={handleTabChange}
              styles={{
                tab: {
                  "&[dataActive]": {
                    borderColor: "#3b82f6",
                    color: "#3b82f6",
                    fontWeight: "bold",
                  },
                  "&:hover": {
                    backgroundColor: "#f8fafc",
                    borderColor: "#e2e8f0",
                  },
                },
              }}
            >
              <Tabs.List className="border-b border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/80">
                <Tabs.Tab
                  value="knowledge"
                  className="text-base font-medium px-8 py-4 transition"
                >
                  {t("knowledge")}
                </Tabs.Tab>
                <Tabs.Tab
                  value="about"
                  className="text-base font-medium px-8 py-4 transition"
                >
                  {
                    isCompanyInsighter
                      ? t("aboutMe")
                      : isCompany && !enterpriseType
                        ? t("aboutCompany")
                        : isCompany && enterpriseType
                          ? t("aboutManager")
                          : enterpriseType === "insighter"
                            ? t("aboutMe")
                            : null
                  }
                </Tabs.Tab>
                {/* Hide Meet tab if user is viewing their own profile */}
                {(isInsighter || isCompanyInsighter || isCompany) &&
                  !isOwnProfile &&
                  enterpriseType === "insighter" && (
                    <Tabs.Tab
                      value="meet"
                      className="text-base font-medium px-8 py-4 transition"
                    >
                      {t("meet")} {profileData?.first_name || ""}
                    </Tabs.Tab>
                  )}
              </Tabs.List>

              <Tabs.Panel value="knowledge" className="py-8 px-6 md:px-10">
                {/* Knowledge Type Filters - always shown when knowledgeData exists */}
                {knowledgeData && (
                  <div className="mb-10 flex items-center flex-wrap gap-2 justify-end">
                    <div className="mr-1 opacity-60 flex items-center">
                      <IconFilter size={16} className="mr-1" />
                      <span className="text-xs font-medium">
                        {filterT("filterBy")}:
                      </span>
                    </div>
                    {knowledgeTypes.map((type) => {
                      const isActive = selectedType === type.id;

                      return (
                        <button
                          key={type.id || "all"}
                          onClick={() => handleTypeChange(type.id)}
                          className={`${styles.filterButton} ${
                            isActive
                              ? `${styles.filterButtonActive} ${type.filterClass}`
                              : ""
                          }`}
                        >
                          <span
                            className={`flex items-center ${
                              isRTL ? "flex-row-reverse" : ""
                            }`}
                          >
                            <span className={styles.iconWrapper}>
                              {type.icon(isActive)}
                            </span>
                            <span
                              className={`${
                                isRTL ? "me-2" : "ml-2"
                              } font-medium text-xs`}
                            >
                              {filterT(type.label)}
                            </span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {loadingKnowledge ? (
                  <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                ) : knowledgeData && knowledgeData.data.length > 0 ? (
                  <div>
                    <KnowledgeGrid
                      knowledge={formatKnowledgeItems()}
                      topicName={profileData?.name || ""}
                      showHeader={false}
                      colNumbers={3}
                      locale={locale}
                      showInsighter={false}
                    />

                    {/* Pagination */}
                    {knowledgeData.meta.last_page > 1 && (
                      <div className="flex justify-center mt-10">
                        <div className="flex space-x-1">
                          <button
                            onClick={() =>
                              handlePageChange(
                                knowledgeData.meta.current_page - 1
                              )
                            }
                            disabled={!knowledgeData.links.prev}
                            className={`px-4 py-2 rounded-md ${
                              !knowledgeData.links.prev
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "bg-white text-gray-700 hover:bg-gray-50"
                            } border border-gray-200`}
                          >
                            {isRTL ? t("next") : t("previous")}
                          </button>

                          {knowledgeData.meta.links
                            .filter(
                              (link) =>
                                !link.label.includes("Previous") &&
                                !link.label.includes("Next")
                            )
                            .map((link, index) => {
                              if (link.label === "...") {
                                return (
                                  <span
                                    key={`ellipsis-${index}`}
                                    className="px-4 py-2 text-gray-700"
                                  >
                                    ...
                                  </span>
                                );
                              }
                              return (
                                <button
                                  key={`page-${link.label}`}
                                  onClick={() =>
                                    link.url &&
                                    handlePageChange(parseInt(link.label))
                                  }
                                  className={`px-4 py-2 rounded-md border ${
                                    link.active
                                      ? "bg-blue-50 border-blue-500 text-blue-600"
                                      : "bg-white text-gray-700 hover:bg-gray-50 border-gray-200"
                                  }`}
                                >
                                  {link.label}
                                </button>
                              );
                            })}

                          <button
                            onClick={() =>
                              handlePageChange(
                                knowledgeData.meta.current_page + 1
                              )
                            }
                            disabled={!knowledgeData.links.next}
                            className={`px-4 py-2 rounded-md ${
                              !knowledgeData.links.next
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "bg-white text-gray-700 hover:bg-gray-50"
                            } border border-gray-200`}
                          >
                            {isRTL ? t("previous") : t("next")}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 px-4 bg-gray-50 dark:bg-slate-700/30 rounded-xl text-center">
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-full mb-4 shadow-md">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium mb-2">
                      {t("noKnowledgeItems")}
                    </h3>
                    <p className="text-gray-500">{t("contentUpdateSoon")}</p>
                  </div>
                )}
              </Tabs.Panel>

              <Tabs.Panel value="about" className="py-8 px-6 md:px-10">
                <div className="prose max-w-none dark:prose-invert">
                  {/* Company Information (if applicable) with better styling */}
                  {isCompany && profileData.company && (
                    <div
                      className="bg-gray-50 dark:bg-slate-700/30 rounded-xl p-4"
                      data-aos="fade-up"
                      data-aos-delay="400"
                    >
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-5 w-5 ${
                            isRTL ? "ml-2" : "mr-2"
                          } text-blue-500`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                        {t("companyInfo")}
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Left column (About) - Takes 2/3 of space */}
                        <div className="md:col-span-2 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm h-full">
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                            {t("aboutUs")}
                          </p>
                          <p className="whitespace-pre-line">
                            {profileData.company.about_us}
                          </p>
                        </div>

                        {/* Right column (Details) - Takes 1/3 of space */}
                        <div className="flex flex-col gap-4">
                          {/* Website */}
                          <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm">
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                              {t("websiteLabel")}
                            </p>
                            <p className="font-medium m-0">
                              {profileData.company.website}
                            </p>
                          </div>

                          {/* Social Media */}
                          {profileData.company.social &&
                            profileData.company.social.length > 0 && (
                              <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm">
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                                  {t("socialMedia")}
                                </p>
                                <div className="flex gap-3">
                                  {profileData.company.social.map((social) => (
                                    <a
                                      key={social.id}
                                      href={social.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-xl hover:opacity-80 transition transform hover:scale-110"
                                    >
                                      {getSocialIcon(social.type)}
                                    </a>
                                  ))}
                                </div>
                              </div>
                            )}
                          {/* Country */}
                          {profileData.country && (
                            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm">
                              <div className="flex items-center">
                                <GlobeAsiaAustraliaIcon
                                  className={`w-5 h-5 text-gray-500 dark:text-gray-400 ${
                                    isRTL ? "ml-2" : "mr-2"
                                  }`}
                                />
                                <div>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {t("country")}
                                  </p>
                                  <p className="font-medium">
                                    {profileData.country}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Company Address */}
                          {isCompany && profileData.company?.address && (
                            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm">
                              <div className="flex items-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className={`h-5 w-5 text-gray-500 dark:text-gray-400 ${
                                    isRTL ? "ml-2" : "mr-2"
                                  }`}
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                </svg>
                                <div>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {t("location")}
                                  </p>
                                  <p className="font-medium">
                                    {profileData.company?.address}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  {/* Industries and Consulting Fields in Two Columns */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    {/* Industries Section */}
                    {profileData.industries &&
                      profileData.industries.length > 0 && (
                        <div data-aos="fade-up" data-aos-delay="100">
                          <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className={`h-5 w-5 ${
                                isRTL ? "ml-2" : "mr-2"
                              } text-blue-500`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                              />
                            </svg>
                            {t("industries")}
                          </h3>
                          <div className="flex flex-wrap gap-3">
                            {profileData.industries.map((industry) => (
                              <span
                                key={industry.id}
                                className="bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium shadow-sm transition transform hover:translate-y-[-2px] hover:shadow"
                              >
                                {industry.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                    {/* Consulting Fields Section */}
                    {profileData.consulting_field &&
                      profileData.consulting_field.length > 0 && (
                        <div data-aos="fade-up" data-aos-delay="200">
                          <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className={`h-5 w-5 ${
                                isRTL ? "ml-2" : "mr-2"
                              } text-purple-500`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                              />
                            </svg>
                            {t("consultingFields")}
                          </h3>
                          <div className="flex flex-wrap gap-3">
                            {profileData.consulting_field.map((field) => (
                              <span
                                key={field.id}
                                className="bg-purple-50 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 px-4 py-2 rounded-full text-sm font-medium shadow-sm transition transform hover:translate-y-[-2px] hover:shadow"
                              >
                                {locale === "ar" && field.names?.ar
                                  ? field.names.ar
                                  : field.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                  </div>

                  {/* Certifications Section with better cards */}
                  {profileData.certifications &&
                    profileData.certifications.length > 0 && (
                      <div
                        className="mb-10"
                        data-aos="fade-up"
                        data-aos-delay="300"
                      >
                        <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-5 w-5 ${
                              isRTL ? "ml-2" : "mr-2"
                            } text-green-500`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                            />
                          </svg>
                          {t("certifications")}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {profileData.certifications.map((cert, index) => (
                            <a
                              key={cert.id}
                              href={cert.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block p-6 bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 hover:shadow-lg transition duration-300 transform hover:translate-y-[-4px]"
                              data-aos="fade-up"
                              data-aos-delay={100 * ((index % 3) + 1)}
                            >
                              <div className="flex flex-col items-center">
                                <div>
                                  <NewCertificationIcon
                                    width={64}
                                    height={64}
                                  />
                                </div>
                                <div className="text-center">
                                  <p className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-sm font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset capitalize">
                                    {cert.type.replace(/_/g, " ")}
                                  </p>
                                </div>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  {/* Bio Section - only shown for non-company profiles with bio */}
                  {!isCompany && profileData.bio && (
                    <div
                      className="bg-gray-50 dark:bg-slate-700/30 p-6 rounded-xl mb-10 mt-10"
                      data-aos="fade-up"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2">
                          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className={`h-5 w-5 ${
                                isRTL ? "ml-2" : "mr-2"
                              } text-blue-500`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                            {t("bio")}
                          </h3>
                          <p className="whitespace-pre-line text-gray-700 dark:text-gray-300">
                            {profileData.bio}
                          </p>
                        </div>

                        {/* Contact Information */}
                        <div className="flex flex-col gap-4">
                          {/* Social Media */}
                          {profileData.social &&
                            profileData.social.length > 0 && (
                              <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm">
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                                  {t("socialMedia")}
                                </p>
                                <div className="flex flex-wrap gap-3">
                                  {profileData.social.map((social) => (
                                    <a
                                      key={social.id}
                                      href={social.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-xl hover:opacity-80 transition transform hover:scale-110"
                                    >
                                      {getSocialIcon(social.type)}
                                    </a>
                                  ))}
                                </div>
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Show only Social Media when there's no bio but social media exists */}
                  {!isCompany &&
                    !profileData.bio &&
                    profileData.social &&
                    profileData.social.length > 0 && (
                      <div
                        className="bg-gray-50 dark:bg-slate-700/30 p-6 rounded-xl mb-10 mt-10"
                        data-aos="fade-up"
                      >
                        <div className="grid grid-cols-1 gap-6">
                          <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm">
                            <h3 className="text-xl font-semibold mb-4">
                              {t("socialMedia")}
                            </h3>
                            <div className="flex flex-wrap gap-3">
                              {profileData.social.map((social) => (
                                <a
                                  key={social.id}
                                  href={social.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xl hover:opacity-80 transition transform hover:scale-110"
                                >
                                  {getSocialIcon(social.type)}
                                </a>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                </div>
              </Tabs.Panel>

              {/* Meet Tab Panel with Booking Calendar */}
              <Tabs.Panel value="meet" className="py-8 px-6 md:px-10">
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
                                onClick={handleBookMeeting}
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
                </div>
              </Tabs.Panel>
            </Tabs>

            {/* Meeting Booking Modal */}
            <Modal
              opened={isBookingModalOpen}
              onClose={() => setIsBookingModalOpen(false)}
              title={t("bookASession")}
              size="md"
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

                  <div className="flex justify-end gap-3 mt-6">
                    <Button
                      variant="subtle"
                      onClick={() => setIsBookingModalOpen(false)}
                    >
                      {t("cancel")}
                    </Button>
                    <Button
                      type="submit"
                      loading={isBookingLoading}
                      disabled={Object.keys(validationErrors).some(
                        (key) =>
                          validationErrors[key as keyof typeof validationErrors]
                      )}
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
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="text-center">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-full mb-4 shadow-md inline-block">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t("profileNotFound")}
            </p>
          </div>
        </div>
      )}

      <div className="flex-grow"></div>
      <Footer />
    </div>
  );
}
