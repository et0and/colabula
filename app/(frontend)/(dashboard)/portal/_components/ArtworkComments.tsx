"use client";
import { useSession } from "@/lib/auth-client";
import { CommentComponent } from "./Comment";
import { CommentForm } from "./CommentForm";
import type { Artwork } from "@prisma/client";
import { useState } from "react";
import { trpc } from "@/app/(backend)/server/trpc";

export type CommentWithUser = {
  id: string;
  content: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  userId: string;
  artworkId: string;
  parentId: string | null;
  user: { id: string; name: string; image: string | null };
  replies: CommentWithUser[];
};

export function ArtworkComments({
  artwork,
}: Readonly<{
  artwork: Artwork & { comments: CommentWithUser[] };
}>) {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [comments, setComments] = useState(artwork.comments);

  const createCommentMutation = trpc.comments.create.useMutation();

  const handleCommentAdded = async (content: string) => {
    if (!userId) return;
    try {
      const newComment = await createCommentMutation.mutateAsync({
        content,
        artworkId: artwork.id,
        userId,
        parentId: null,
      });
      setComments([
        ...comments,
        {
          ...newComment,
          user: {
            id: newComment.userId,
            name: newComment.user.name,
            image: newComment.user.image,
          },
          replies: [],
        } as CommentWithUser,
      ]);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleReplyAdded = async (content: string, parentId: string) => {
    if (!userId) return;

    try {
      const newComment = await fetch(`/api/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content,
          artworkId: artwork.id,
          userId,
          parentId,
        }),
      }).then((res) => res.json());

      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === parentId
            ? {
                ...comment,
                replies: [...(comment.replies || []), newComment],
              }
            : comment
        )
      );
    } catch (error) {
      console.error("Error adding reply:", error);
    }
  };

  if (!userId) {
    return <p>Please sign in to comment</p>;
  }

  return (
    <div className="mt-4 space-y-4 w-full">
      <p className="font-semibold">Comments</p>
      {comments.map((comment) => (
        <CommentComponent
          key={comment.id}
          comment={comment}
          userId={userId}
          onReplyAdded={handleReplyAdded}
          setComments={setComments}
          artworkId={artwork.id}
        />
      ))}
      <CommentForm
        artworkId={artwork.id}
        userId={userId}
        onCommentAdded={handleCommentAdded}
      />
    </div>
  );
}
