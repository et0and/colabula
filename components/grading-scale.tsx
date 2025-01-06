"use client";
import React, { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useSession } from "@/lib/auth-client";

interface PostRatingProps {
  artworkId: string;
  initialRating?:
    | {
        rating: number;
        user: {
          id: string;
          name: string;
          image: string | null;
        };
      }[]
    | null;
}

export const PostRating: React.FC<PostRatingProps> = ({
  artworkId,
  initialRating,
}) => {
  const { data: session } = useSession();
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [existingRating, setExistingRating] = useState<number | null>(null);

  useEffect(() => {
    // Update to use initialRating prop instead of fetching
    if (session?.user?.id && initialRating?.length) {
      const userRating = initialRating.find(
        (r) => r.user.id === session.user.id
      );
      if (userRating) {
        setRating(userRating.rating);
        setExistingRating(userRating.rating);
      }
    }
  }, [initialRating, session?.user?.id]);

  const handleRatingChange = (value: number[]) => {
    setRating(value[0]);
  };

  const handleSubmit = async () => {
    if (!session?.user?.id) {
      toast.error("Please sign in to rate");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/ratings", {
        method: existingRating ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          artworkId,
          rating,
          userId: session.user.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit rating");
      }

      setExistingRating(rating);
      toast.success("Rating submitted successfully");
    } catch (error) {
      console.error("Error submitting rating:", error);
      toast.error("Failed to submit rating");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!session?.user?.id) {
    return <p className="text-sm text-muted-foreground">Sign in to rate</p>;
  }

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Your grade:</span>
        <span className="text-2xl font-bold">
          {rating === 0
            ? "NØ"
            : rating === 1
            ? "N1"
            : rating === 2
            ? "N2"
            : rating === 3
            ? "A3"
            : rating === 4
            ? "A4"
            : rating === 5
            ? "M5"
            : rating === 6
            ? "M6"
            : rating === 7
            ? "E7"
            : "E8"}
        </span>
      </div>
      <Slider
        min={0}
        max={8}
        step={1}
        value={[rating]}
        onValueChange={handleRatingChange}
        className="w-full"
      />
      <div className="flex justify-between text-xs text-gray-500">
        <span>NØ</span>
        <span>N1</span>
        <span>N2</span>
        <span>A3</span>
        <span>A4</span>
        <span>M5</span>
        <span>M6</span>
        <span>E7</span>
        <span>E8</span>
      </div>
      <Button onClick={handleSubmit} disabled={isSubmitting} className="w-full">
        {isSubmitting
          ? "Submitting..."
          : existingRating
          ? "Update grade"
          : "Submit grade"}
      </Button>
    </div>
  );
};
