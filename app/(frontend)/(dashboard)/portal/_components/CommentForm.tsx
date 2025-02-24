"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle } from "lucide-react";
import { useState } from "react";

export function CommentForm({
  onCommentAdded,
}: Readonly<{
  artworkId: string;
  userId: string;
  parentId?: string;
  onCommentAdded: (content: string) => void;
}>) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      onCommentAdded(content);
      setContent("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a comment..."
        disabled={isSubmitting}
      />
      <Button type="submit" disabled={isSubmitting || !content.trim()}>
        <MessageCircle />
        {isSubmitting ? "Posting..." : "Post comment"}
      </Button>
    </form>
  );
}
