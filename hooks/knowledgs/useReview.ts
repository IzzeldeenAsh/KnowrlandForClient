import { useState } from "react";

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

  const postReview = async (rate: number, comment: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("You must be signed in to submit a review.");
      }
      const response = await fetch(
        `https://api.knoldg.com/api/account/review/knowledge/${knowledgeSlug}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Accept-Language": "en",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ rate, comment }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        // errorData might be like:
        // { "message": "Already reviewed", "errors": { "rate": ["Already reviewed"] } }
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
