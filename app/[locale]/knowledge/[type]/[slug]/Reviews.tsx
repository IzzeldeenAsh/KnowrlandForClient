'use client';

import React, { useState, useEffect } from "react";
import { Rating, Textarea, Button, Card, Text, Avatar, Loader } from "@mantine/core";
import { IconX, IconCheck } from "@tabler/icons-react";
import { useReview } from "@/hooks/knowledgs/useReview";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useToast } from "@/components/toast/ToastContext";

interface ReviewItem {
  id: number;
  rate: number;
  comment: string;
  user_name: string;
  first_name?: string;
  last_name?: string;
  profile_photo_url?: string;
  uuid?: string;
  roles?: string[];
  created_date: string;
}

interface ReviewsProps {
  knowledgeSlug: string;
  reviews: ReviewItem[];
  is_review: boolean;
  is_owner?: boolean;
}

// Helper function to get initials from name
function getInitials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export default function Reviews({ knowledgeSlug, reviews, is_review, is_owner }: ReviewsProps) {
  // Get locale and determine RTL
  const params = useParams();
  const locale = params.locale as string;
  const isRTL = locale === 'ar';
  
  // Initialize toast service
  const toast = useToast();
  
  // Translations
  const translations = {
    allReviews: isRTL ? 'جميع المراجعات' : 'All Reviews',
    noReviewsYet: isRTL ? 'لا توجد مراجعات حتى الآن.' : 'No reviews yet.',
    rateKnowledge: isRTL ? 'قيّم هذه المعرفة' : 'Rate This Knowledge',
    comment: isRTL ? 'التعليق' : 'Comment',
    writeReview: isRTL ? 'اكتب مراجعتك...' : 'Write your review...',
    submitReview: isRTL ? 'إرسال المراجعة' : 'Submit Review',
    allGood: isRTL ? 'كل شيء جيد!' : 'All good!',
    reviewSuccess: isRTL ? 'تم إرسال المراجعة بنجاح!' : 'Review submitted successfully!',
    signInRequired: isRTL ? 'يجب أن تكون مسجلاً للإضافة مراجعة.' : 'You must be signed in to leave a review.',
    errorSubmitting: isRTL ? 'حدث خطأ في إرسال المراجعة. يرجى المحاولة مرة أخرى.' : 'Error submitting review. Please try again.',
    loadingReviews: isRTL ? 'جارِ تحميل المراجعات...' : 'Loading reviews...',
    commentRequired: isRTL ? 'يرجى كتابة تعليق قبل الإرسال' : 'Please write a comment before submitting'
  };

  // Retrieve the token from localStorage
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // Even if the user is not signed in, we want to show all reviews.
  // But only show the review form if token exists.
  const { postReview, loading, error: hookError, success } = useReview(knowledgeSlug);
  const [rate, setRate] = useState(0);
  const [comment, setComment] = useState("");
  const router = useRouter();
  const [submit, setSubmit] = useState(false);
  
  // Single unified loading state for submission and refreshing
  const [submitting, setSubmitting] = useState(false);
  
  // We'll use toast directly instead of maintaining a separate displayError state
  
  // Add state to store the temporary review before page refresh
  const [localReviews, setLocalReviews] = useState<ReviewItem[]>([]);
  
  // Add a state to track which error messages we've already shown
  const [displayedErrors, setDisplayedErrors] = useState<{[key: string]: boolean}>({});
  
  // Show toast notification when hookError changes - only show each unique error once
  useEffect(() => {
    // Only show error toast if there's an error, we're not submitting, and we haven't shown this error yet
    if (hookError && !submitting && !displayedErrors[hookError]) {
      // Show the error toast just once
      toast.error(hookError);
      
      // Mark this error as displayed so we don't show it again
      setDisplayedErrors(prev => ({
        ...prev,
        [hookError]: true
      }));
    }
  }, [hookError, toast, submitting, displayedErrors]);
  
  // Initialize localReviews with the props reviews
  useEffect(() => {
    setLocalReviews(reviews || []);
  }, [reviews]);
  
  // Function to fetch updated reviews directly
  const fetchUpdatedReviews = async () => {
    try {
      const headers: HeadersInit = {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Accept-Language": locale,
      };
      
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
      
      const response = await fetch(
        `https://api.knoldg.com/api/platform/industries/knowledge/${knowledgeSlug}`,
        {
          method: "GET",
          headers,
          cache: "no-cache" // Ensure fresh data
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        if (data.data && data.data.review) {
          // Update local reviews with the fresh data
          setLocalReviews(data.data.review);
        }
      }
    } catch (error) {
      console.error("Error fetching updated reviews:", error);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prevent multiple submissions
    if (loading || submitting) {
      return;
    }
    
    if (rate === 0) {
      toast.error(isRTL ? "يرجى اختيار تقييم قبل الإرسال" : "Please select a rating before submitting");
      return;
    }
    
    // Add validation for empty comment
    if (!comment.trim()) {
      toast.error(isRTL ? "يرجى كتابة تعليق قبل الإرسال" : "Please write a comment before submitting");
      return;
    }
    
    // Ensure comment is a string (force empty string if undefined/null)
    const safeComment = comment || "";
    
    // Reset any previous errors so we start fresh
    setDisplayedErrors({});
    
    // Begin loading state
    setSubmitting(true);
    
    try {
      // Instead of relying on the hook's state which may not update immediately,
      // let's directly check the response from the API
      const token = localStorage.getItem("token");
      
      if (!token) {
        toast.error(translations.signInRequired);
        setSubmitting(false);
        return;
      }
      
      // Make the API call directly
      const response = await fetch(
        `https://api.knoldg.com/api/account/review/knowledge/${knowledgeSlug}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Accept-Language": locale,
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ rate, comment: safeComment }),
        }
      );
      
      // Parse the response
      const data = await response.json();
      
      // Check if the response was successful
      if (!response.ok) {
        // Handle error response
        let errorMessage = data.message || translations.errorSubmitting;
        
        // Check for structured errors
        if (data.errors) {
          // Get first error message from each field
          const errorMessages = Object.values(data.errors)
            .map((fieldErrors: any) => Array.isArray(fieldErrors) ? fieldErrors[0] : fieldErrors)
            .filter(Boolean);
          
          if (errorMessages.length > 0) {
            errorMessage = errorMessages[0] as string;
          }
        }
        
        toast.error(errorMessage);
        setSubmitting(false);
        return;
      }
      
      // If we got here, the submission was successful
      toast.success(translations.reviewSuccess);
      
      // Refresh the page after a successful API call
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.error("Error submitting review:", error);
      
      // Handle network errors or other exceptions
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(translations.errorSubmitting);
      }
    } finally {
      // Always end the submitting state if we didn't already return early
      if (submitting) {
        setSubmitting(false);
      }
    }
  };
  


  // Use a single loading state for the entire component
  const isLoading = loading || submitting;

  // Determine which reviews to display - prioritize fresh data
  const displayReviews = localReviews && localReviews.length > 0 ? localReviews : reviews || [];

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'}>
     {token && !is_review && !is_owner && (
        <>
          {!submit && (
            <Card padding="lg" radius="md" withBorder mt={'md'} mb={'md'}>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Text fw={500} fs="xs" mb={5} className={isRTL ? 'text-right' : 'text-start'}>
                    {translations.rateKnowledge}
                  </Text>
                  {/* @ts-ignore: The current Rating type doesn't include the `max` prop */}
                  <Rating
                    fractions={1}
                    value={rate}
                    onChange={(value) => setRate(value)}
                  />
                </div>
                <div>
                  <Textarea
                    placeholder={translations.writeReview}
                    value={comment}
                    onChange={(e) => setComment(e.currentTarget.value)}
                    autosize
                    minRows={3}
                  />
                </div>
              
                <Button
                  type="submit"
                  loading={isLoading}
                  mt="md"
                  className="bg-gradient-to-r from-blue-500 to-teal-400 hover:shadow-md transition-all duration-200 hover:-translate-y-1"
                >
                  {translations.submitReview}
                </Button>
              </form>
            </Card>
          )}
        </>
      )}
        <div>
          {isLoading && !displayReviews.length ? (
            <div className="flex flex-col items-center justify-center py-8">
              <Loader size="md" />
              <Text size="sm" mt={2} color="dimmed">{translations.loadingReviews}</Text>
            </div>
          ) : displayReviews.length > 0 ? (
            <div className="space-y-4">
              {displayReviews.map((review) => (
                <div
                  key={review.id}
                  className="p-4 border rounded shadow-sm bg-white"
                >
                  <div className="flex items-center text-xs justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar
                        src={review.profile_photo_url}
                        size="sm"
                        radius="xl"
                        style={{objectPosition: 'top'}}
                        alt={review.user_name}
                      >
                        {!review.profile_photo_url && getInitials(review.user_name)}
                      </Avatar>
                      {review.uuid ? (
                        <Link href={`/${locale}/profile/${review.uuid}?entity=insighter`} className="font-semibold capitalize hover:text-blue-600">
                          {review.user_name.toLowerCase()}
                        </Link>
                      ) : (
                        <span className="font-semibold capitalize">
                          {review.user_name.toLowerCase()}
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(review.created_date).toLocaleDateString(isRTL ? 'en-US' : undefined)}
                    </span>
                  </div>
                  <div className="mt-2">
                    <div className="flex items-center">
                      {/* @ts-ignore: The current Rating type doesn't include the `max` prop */}
                      <Rating
                        fractions={1}
                        value={review.rate}
                        readOnly
                      />
                      <span className={`${isRTL ? 'mr-2' : 'ml-2'} text-sm`}>
                        {review.rate}/5
                      </span>
                    </div>
                    <p className={`mt-2 text-gray-700 text-sm ${isRTL ? 'text-right' : 'text-start'}`}>
                      {review.comment}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className={`text-gray-600 ${isRTL ? 'text-right' : 'text-start'}`}>{translations.noReviewsYet}</p>
          )}
        </div>
        
      {/* Only show review form if user is logged in, hasn't already reviewed, and is not the owner */}
    
      
      {/* Show message explaining why owners can't review their own content */}
      {token && is_owner && (
        <Card className="mt-4">
          <Text color="dimmed" className={isRTL ? 'text-right' : 'text-start'}>
            {isRTL ? 'لا يمكنك مراجعة المحتوى الخاص بك.' : 'You cannot review your own content.'}
          </Text>
        </Card>
      )}
      
      {!token && (
        <Card className="mt-4">
          <Text color="dimmed" className={isRTL ? 'text-right' : 'text-start'}>
            {translations.signInRequired}
          </Text>
        </Card>
      )}
    </div>
  );
}
