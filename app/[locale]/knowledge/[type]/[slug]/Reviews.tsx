'use client';

import React, { useState } from "react";
import { Rating, Textarea, Button, Notification, Card, Text } from "@mantine/core";
import { IconX, IconCheck } from "@tabler/icons-react";
import { useReview } from "@/hooks/knowledgs/useReview";
import { useRouter, useParams } from "next/navigation";

interface ReviewItem {
  id: number;
  rate: number;
  comment: string;
  user_name: string;
  created_date: string;
}

interface ReviewsProps {
  knowledgeSlug: string;
  reviews: ReviewItem[];
  is_review: boolean;
}

export default function Reviews({ knowledgeSlug, reviews, is_review }: ReviewsProps) {
  // Get locale and determine RTL
  const params = useParams();
  const locale = params.locale as string;
  const isRTL = locale === 'ar';
  
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
    signInRequired: isRTL ? 'يجب أن تكون مسجلاً للإضافة مراجعة.' : 'You must be signed in to leave a review.'
  };

  // Retrieve the token from localStorage
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // Even if the user is not signed in, we want to show all reviews.
  // But only show the review form if token exists.
  const { postReview, loading, error, success } = useReview(knowledgeSlug);
  const [rate, setRate] = useState(0);
  const [comment, setComment] = useState("");
  const router = useRouter();
  const [submit, setSubmit] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await postReview(rate, comment);
    router.refresh(); // This will trigger a re-fetch of the page data
    setSubmit(true);
  };

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'}>
      <Card radius="md" withBorder>
        <div>
          <h4 className={`text-lg font-semibold mb-4 ${isRTL ? 'text-right' : 'text-start'}`}>{translations.allReviews}</h4>
          {reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="p-4 border rounded shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">
                      {review.user_name}
                    </span>
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
                    <p className={`mt-2 text-gray-700 ${isRTL ? 'text-right' : 'text-start'}`}>
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
      </Card>
      {token && !is_review && !submit && (
        <Card padding="lg" radius="md" withBorder mt={'md'}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Text fw={500} fs="sm" mb={5} className={isRTL ? 'text-right' : 'text-start'}>
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
              <Text fw={500} size="sm" mb={5} className={isRTL ? 'text-right' : 'text-start'}>
                {translations.comment}
              </Text>
              <Textarea
                placeholder={translations.writeReview}
                value={comment}
                onChange={(e) => setComment(e.currentTarget.value)}
                autosize
                minRows={3}
              />
            </div>
            {error && (
              <Notification
                icon={<IconX size={20} />}
                color="red"
                onClose={() => {}}
                mt="sm"
              >
                {error}
              </Notification>
            )}
            {success && (
              <Notification
                icon={<IconCheck size={20} />}
                color="teal"
                title={translations.allGood}
                onClose={() => {}}
                mt="sm"
              >
                {translations.reviewSuccess}
              </Notification>
            )}
            <Button type="submit" loading={loading} mt="md">
              {translations.submitReview}
            </Button>
          </form>
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
