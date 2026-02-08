'use client';

import React, { useState, useEffect } from "react";
import { Textarea, Button, Card, Text, Loader } from "@mantine/core";
import Image from "next/image";
import { IconX, IconCheck, IconTrash, IconStar, IconStarFilled } from "@tabler/icons-react";
import { useReview } from "@/hooks/knowledgs/useReview";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { useToast } from "@/components/toast/ToastContext";
import { getAuthToken } from "@/lib/authToken";

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
  is_owner?: boolean;
}

interface ReviewsProps {
  knowledgeSlug: string;
  reviews: ReviewItem[];
  is_review: boolean;
  is_owner?: boolean;
  hasPurchasedAny?: boolean;
  onRefreshData?: () => void | Promise<void>;
}

// Helper function to get initials from name
function getInitials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

// Custom RTL-aware Star Rating Component
interface CustomRatingProps {
  value: number;
  onChange: (value: number) => void;
  isRTL: boolean;
  max?: number;
  readOnly?: boolean;
}

function CustomRating({ value, onChange, isRTL, max = 5, readOnly = false }: CustomRatingProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const handleStarClick = (starIndex: number) => {
    if (!readOnly) {
      onChange(starIndex + 1);
    }
  };

  const handleStarHover = (starIndex: number) => {
    if (!readOnly) {
      setHoverValue(starIndex + 1);
    }
  };

  const handleMouseLeave = () => {
    if (!readOnly) {
      setHoverValue(null);
    }
  };

  const currentValue = hoverValue ?? value;

  const stars = Array.from({ length: max }, (_, index) => {
    const filled = (index + 1) <= currentValue;

    return (
      <button
        key={index}
        type="button"
        className={`focus:outline-none transition-colors duration-150 ${readOnly ? 'cursor-default' : 'cursor-pointer'}`}
        onClick={() => handleStarClick(index)}
        onMouseEnter={() => handleStarHover(index)}
        onMouseLeave={handleMouseLeave}
        disabled={readOnly}
      >
        {filled ? (
          <IconStarFilled
            size={20}
            className="text-yellow-400 hover:text-yellow-500"
          />
        ) : (
          <IconStar
            size={20}
            className="text-gray-300 hover:text-yellow-400"
          />
        )}
      </button>
    );
  });

  return (
    <div className="flex gap-1 justify-start" dir={isRTL ? 'rtl' : 'ltr'}>
      {stars}
    </div>
  );
}

export default function Reviews({ knowledgeSlug, reviews, is_review, is_owner, hasPurchasedAny, onRefreshData }: ReviewsProps) {
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
    rateKnowledge: isRTL ? 'قيّم هذا المستند' : 'Rate This Insight',
    comment: isRTL ? 'التعليق' : 'Comment',
    writeReview: isRTL ? 'اكتب ملاحظاتك هنا' : 'Write your review...',
    submitReview: isRTL ? 'تقييم' : 'Submit Review',
    allGood: isRTL ? 'كل شيء جيد!' : 'All good!',
    reviewSuccess: isRTL ? 'تم إرسال المراجعة بنجاح!' : 'Review submitted successfully!',
    signInRequired: isRTL ? 'يجب أن تكون مسجلاً للإضافة مراجعة.' : 'You must be signed in to leave a review.',
    errorSubmitting: isRTL ? 'حدث خطأ في إرسال المراجعة. يرجى المحاولة مرة أخرى.' : 'Error submitting review. Please try again.',
    loadingReviews: isRTL ? 'جارِ تحميل المراجعات...' : 'Loading reviews...',
    commentRequired: isRTL ? 'يرجى كتابة تعليق قبل الإرسال' : 'Please write a comment before submitting',
    deleteReview: isRTL ? 'حذف المراجعة' : 'Delete Review',
    deleteSuccess: isRTL ? 'تم حذف المراجعة بنجاح!' : 'Review deleted successfully!',
    deleteError: isRTL ? 'حدث خطأ في حذف المراجعة. يرجى المحاولة مرة أخرى.' : 'Error deleting review. Please try again.',
    confirmDelete: isRTL ? 'هل أنت متأكد أنك تريد حذف هذه المراجعة؟' : 'Are you sure you want to delete this review?',
    purchaseRequired: isRTL ? 'لترك مراجعة، يجب شراء مستند واحد على الأقل.' : 'To leave a review, you must purchase at least one document.'
  };

  // Retrieve the token from localStorage
  const token = getAuthToken();

  // Even if the user is not signed in, we want to show all reviews.
  // But only show the review form if token exists.
  const { postReview, loading, error: hookError, success } = useReview(knowledgeSlug);
  const [rate, setRate] = useState(0);
  const [rateTouched, setRateTouched] = useState(false);
  const [rateDirty, setRateDirty] = useState(false);
  const [comment, setComment] = useState("");
  const [commentTouched, setCommentTouched] = useState(false);
  const [commentDirty, setCommentDirty] = useState(false);
  const router = useRouter();
  const [submit, setSubmit] = useState(false);
  
  // Single unified loading state for submission and refreshing
  const [submitting, setSubmitting] = useState(false);
  
  // We'll use toast directly instead of maintaining a separate displayError state
  
  // Add state to store the temporary review before page refresh
  const [localReviews, setLocalReviews] = useState<ReviewItem[]>([]);

  // Track review state locally so we can update UI without a full reload
  const [hasReviewed, setHasReviewed] = useState<boolean>(!!is_review);
  
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

  useEffect(() => {
    setHasReviewed(!!is_review);
  }, [is_review]);
  
  // Function to fetch updated reviews directly
  const fetchUpdatedReviews = async () => {
    try {
      const headers: HeadersInit = {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Accept-Language": locale,"X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
      };
      
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
      
      const response = await fetch(
        `https://api.foresighta.co/api/platform/industries/knowledge/${knowledgeSlug}`,
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
    
    // Ensure purchase requirement is met
    if (!hasPurchasedAny) {
      toast.error(translations.purchaseRequired);
      return;
    }
    
    if (rate === 0) {
      setRateTouched(true);
      setRateDirty(true);
      return;
    }
    
    // Add validation for empty comment
    if (!comment.trim()) {
      setCommentTouched(true);
      setCommentDirty(true);
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
      const token = getAuthToken();
      
      if (!token) {
        toast.error(translations.signInRequired);
        setSubmitting(false);
        return;
      }
      
      // Make the API call directly
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

      // Update UI immediately (hide form) and refresh data without reloading the page
      setHasReviewed(true);
      setRate(0);
      setComment("");
      setCommentTouched(false);
      setCommentDirty(false);

      if (onRefreshData) {
        await onRefreshData();
      } else {
        await fetchUpdatedReviews();
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      
      // Handle network errors or other exceptions
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(translations.errorSubmitting);
      }
    } finally {
      setSubmitting(false);
    }
  };
  


  // Function to delete a review
  const deleteReview = async (reviewId: number) => {
    if (!token) {
      toast.error(translations.signInRequired);
      return;
    }
    setSubmitting(true);

    try {
      const response = await fetch(
        `https://api.foresighta.co/api/account/review/knowledge/${reviewId}`,
        {
          method: 'DELETE',
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Accept-Language": locale,
            "X-Timezone": Intl.DateTimeFormat().resolvedOptions().timeZone,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        toast.success(translations.deleteSuccess);

        // Update UI immediately and refresh underlying knowledge data (rating, is_review, etc.)
        setLocalReviews((prev) => prev.filter((r) => r.id !== reviewId));

        if (onRefreshData) {
          await onRefreshData();
        } else {
          await fetchUpdatedReviews();
        }
      } else {
        const data = await response.json();
        toast.error(data.message || translations.deleteError);
      }
    } catch (error) {
      console.error("Error deleting review:", error);
      toast.error(translations.deleteError);
    } finally {
      setSubmitting(false);
    }
  };

  // Use a single loading state for the entire component
  const isLoading = loading || submitting;

  // Determine which reviews to display - prioritize fresh data
  const displayReviews = localReviews && localReviews.length > 0 ? localReviews : reviews || [];
  const rateError =
    rateTouched && rateDirty && rate === 0
      ? (isRTL ? "يرجى اختيار تقييم" : "Please select a rating")
      : undefined;
  const commentError =
    commentTouched && commentDirty && !comment.trim()
      ? translations.commentRequired
      : undefined;

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'}>
     {token && !hasReviewed && !is_owner && hasPurchasedAny && (
        <>
          {!submit && (
            <Card padding="lg" radius="md" withBorder mt={'md'} mb={'md'}>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Text fw={500} fs="xs" mb={5} className={isRTL ? 'text-right' : 'text-start'}>
                    {translations.rateKnowledge}
                  </Text>
                  <div
                    className={`rounded-md w-fit p-2 ${
                      rateError ? "border-red-500 bg-red-50" : "border-gray-200 bg-white"
                    }`}
                  >
                    <CustomRating
                      value={rate}
                      onChange={(value) => {
                        setRate(value);
                        setRateTouched(true);
                        setRateDirty(true);
                      }}
                      isRTL={isRTL}
                    />
                  </div>
                  {rateError && (
                    <Text size="xs" c="red" mt={6} className={isRTL ? "text-right" : "text-start"}>
                      {rateError}
                    </Text>
                  )}
                </div>
                <div>
                  <Textarea
                    placeholder={translations.writeReview}
                    value={comment}
                    
                    error={commentError ? true : undefined}
                    styles={{
                      input: commentError
                        ? { borderColor: "#ef4444", backgroundColor: "#fef2f2" }
                        : undefined,
                    }}
                    onChange={(e) => {
                      setComment(e.currentTarget.value);
                      setCommentDirty(true);
                    }}
                    onBlur={() => setCommentTouched(true)}
                    autosize
                    minRows={3}
                  />
                  {commentError && (
                    <Text size="xs" c="red" mt={6} className={isRTL ? "text-right" : "text-start"}>
                      {commentError}
                    </Text>
                  )}
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
      {token && !is_review && !is_owner && !hasPurchasedAny && (
        <Card className="mt-4">
          <Text color="dimmed" className={isRTL ? 'text-right' : 'text-start'}>
            {translations.purchaseRequired}
          </Text>
        </Card>
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
                      {review.profile_photo_url ? (
                        <div className="relative w-8 h-8 rounded-full overflow-hidden">
                          <Image
                            src={review.profile_photo_url}
                            alt={review.user_name}
                            fill
                            className="object-cover object-top"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-white text-xs">
                          {getInitials(review.user_name)}
                        </div>
                      )}
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
                      <CustomRating
                        value={review.rate}
                        onChange={() => {}} // Read-only, so empty function
                        isRTL={isRTL}
                        readOnly={true}
                      />
                      <span className={`${isRTL ? 'mr-2' : 'ml-2'} text-sm`}>
                        {review.rate}/5
                      </span>
                    </div>
                    <p className={`mt-2 text-gray-700 text-sm ${isRTL ? 'text-right' : 'text-start'}`}>
                      {review.comment}
                    </p>
                    {review.is_owner && (
                      <div className={`mt-3 flex ${isRTL ? 'justify-start' : 'justify-end'}`}>
                        <Button
                          size="xs"
                          color="red"
                          variant="subtle"
                          onClick={() => deleteReview(review.id)}
                          loading={isLoading}
                          className="hover:bg-red-50"
                        >
                          <div className="flex items-center">
                            <IconTrash size={16} className={`${isRTL ? 'ml-1' : 'mr-1'}`} />
                            {translations.deleteReview}
                          </div>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
            <Card className="mt-4 ">
          <Text color="dimmed" className={isRTL ? 'text-right' : 'text-start'}>
            {isRTL ? 'لايوجد مراجعات حتى الآن' : 'No Reviews Yet'}
          </Text>
        </Card>
       </div>           
          )}
        </div>
        
      {/* Only show review form if user is logged in, hasn't already reviewed, and is not the owner */}
    
      
      {/* Show message explaining why owners can't review their own content */}
  
      
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
