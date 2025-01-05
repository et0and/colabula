import { Artwork } from "@prisma/client";
import { User } from "better-auth";

type CommentWithUser = Comment & {
  id: string;
  user: User;
  replies?: (Comment & { user: User })[];
};

type ArtworkWithComments = Artwork & {
  comments: CommentWithUser[];
};

export type { CommentWithUser, ArtworkWithComments };
