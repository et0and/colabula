"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CommentForm } from "./CommentForm";
import { type CommentWithUser } from "./ArtworkComments";

interface CommentComponentProps {
  comment: CommentWithUser;
  userId: string;
  onReplyAdded: (content: string, parentId: string) => Promise<void>;
  setComments: React.Dispatch<React.SetStateAction<CommentWithUser[]>>;
  artworkId: string;
}

export function CommentComponent({
  comment,
  userId,
  onReplyAdded,
  setComments,
  artworkId,
}: CommentComponentProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleReplySubmitted = (content: string) => {
    onReplyAdded(content, comment.id);
    setShowReplyForm(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start space-x-4">
        <Avatar>
          <AvatarImage src={comment.user.image || ""} />
          <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h4 className="font-semibold">{comment.user.name}</h4>
            <span className="text-sm text-gray-500">
              {new Date(comment.createdAt).toLocaleString()}
            </span>
          </div>
          <p className="mt-1">{comment.content}</p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowReplyForm(!showReplyForm)}
          >
            Reply
          </Button>
        </div>
      </div>

      {showReplyForm && (
        <div className="ml-12">
          <CommentForm
            artworkId={comment.artworkId}
            userId={userId}
            parentId={comment.id}
            onCommentAdded={handleReplySubmitted}
          />
        </div>
      )}

      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-12 space-y-4">
          {comment.replies.map((reply) => (
            <CommentComponent
              key={reply.id}
              comment={reply}
              userId={userId}
              onReplyAdded={onReplyAdded}
              setComments={setComments}
              artworkId={artworkId}
            />
          ))}
        </div>
      )}
    </div>
  );
}
