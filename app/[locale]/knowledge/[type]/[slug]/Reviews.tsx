'use client';

import React, { useState } from "react";
import { Rating, Textarea, Button, Notification, Card, Text } from "@mantine/core";
import { IconX, IconCheck } from "@tabler/icons-react";
import { useReview } from "@/hooks/knowledgs/useReview";

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
}

export default function Reviews({ knowledgeSlug, reviews }: ReviewsProps) {
  // Retrieve the token from localStorage
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // Even if the user is not signed in, we want to show all reviews.
  // But only show the review form if token exists.
  const { postReview, loading, error, success } = useReview(knowledgeSlug);
  const [rate, setRate] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await postReview(rate, comment);
  };

  return (
    <>
    <Card   radius="md" withBorder>
      <div >
        <h4 className="text-lg font-semibold mb-4">All Reviews</h4>
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
                    {review.created_date}
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
                    <span className="ml-2 text-sm">
                      {review.rate}/5
                    </span>
                  </div>
                  <p className="mt-2 text-gray-700">
                    {review.comment}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No reviews yet.</p>
        )}
      </div>
      </Card>

      <Card  padding="lg" radius="md" withBorder mt={'md'}>
        {token ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Text fw={500} fs="sm" mb={5}>
                Rate This Knowledge
              </Text>
              {/* @ts-ignore: The current Rating type doesn't include the `max` prop */}
              <Rating
                fractions={1}
                value={rate}
                onChange={(value) => setRate(value)}
              />
            </div>
            <div>
              <Text fw={500} size="sm" mb={5}>
                Comment
              </Text>
              <Textarea
                placeholder="Write your review..."
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
                title="Bummer!"
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
                title="All good!"
                onClose={() => {}}
                mt="sm"
              >
                Review submitted successfully!
              </Notification>
            )}
            <Button type="submit" loading={loading} mt="md">
              Submit Review
            </Button>
          </form>
        ) : (
          <Text color="dimmed">
            You must be signed in to leave a review.
          </Text>
        )}
      </Card>
      </>
  );
}
