"use client";
import React, { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useSession } from "@/lib/auth-client";
import { trpc } from "@/app/(backend)/server/trpc";

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

  // tRPC mutations
  const submitRating = trpc.ratings.submitRating.useMutation({
    onSuccess: () => {
      toast.success("Rating submitted successfully");
      setExistingRating(rating);
    },
    onError: () => {
      toast.error("Failed to submit rating");
    },
  });

  const updateRating = trpc.ratings.updateRating.useMutation({
    onSuccess: () => {
      toast.success("Rating updated successfully");
      setExistingRating(rating);
    },
    onError: () => {
      toast.error("Failed to update rating");
    },
  });

  useEffect(() => {
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
      if (existingRating) {
        await updateRating.mutateAsync({
          artworkId,
          rating,
        });
      } else {
        await submitRating.mutateAsync({
          artworkId,
          rating,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!session?.user?.id) {
    return <p className="text-sm text-muted-foreground">Sign in to rate</p>;
  }

  const getGradeLabel = (rating: number) => {
    const gradeLabels = ["NØ", "N1", "N2", "A3", "A4", "M5", "M6", "E7", "E8"];
    return gradeLabels[rating] || "E8";
  };

  const getButtonLabel = () => {
    if (isSubmitting) return "Submitting...";
    return existingRating ? "Update grade" : "Submit grade";
  };

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Your grade:</span>
        <span className="text-2xl font-bold">{getGradeLabel(rating)}</span>
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
        {getButtonLabel()}
      </Button>
    </div>
  );
};
