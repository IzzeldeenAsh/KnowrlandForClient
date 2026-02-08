import { useState } from "react";
import { useLocale } from "next-intl";
import { getAuthToken } from "@/lib/authToken";

interface UseReviewReturn {
  postReview: (rate: number, comment: string) => Promise<void>;
  loading: boolean;
  error: string | null;
  success: boolean;
}

export function useReview(knowledgeSlug: string): UseReviewReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const locale = useLocale();
  
  const postReview = async (rate: number, comment: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error("You must be signed in to submit a review.");
      }
      const response = await fetch(
        `https://api.foresighta.co/api/account/review/knowledge/${knowledgeSlug}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Accept-Language": locale,"X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ rate, comment }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        // Handle structured error responses
        if (errorData && errorData.errors) {
          // Get first error message from each field
          const errorMessages = Object.values(errorData.errors)
            .map((fieldErrors: any) => Array.isArray(fieldErrors) ? fieldErrors[0] : fieldErrors)
            .filter(Boolean);
          
          if (errorMessages.length > 0) {
            throw new Error(errorMessages[0] as string);
          }
        }
        // Fall back to the main error message or a default
        throw new Error(errorData.message || "Failed to submit review");
      }
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { postReview, loading, error, success };
}
