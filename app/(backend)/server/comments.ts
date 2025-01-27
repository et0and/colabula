import { router, publicProcedure } from "./index";
import { prisma } from "@/lib/prisma";
import { TRPCError } from "@trpc/server";
import * as yup from "yup";

const createCommentSchema = yup.object({
  content: yup.string().trim().required(),
  artworkId: yup.string().required(),
  userId: yup.string().required(),
  parentId: yup.string().nullable(),
});

export const commentsRouter = router({
  create: publicProcedure
    .input(createCommentSchema)
    .mutation(async ({ ctx, input }) => {
      // Check if the user is logged in
      if (!ctx.session?.user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be logged in to create comments.",
        });
      }

      const { content, artworkId, userId, parentId } = input;
      try {
        // Create the comment
        const comment = await prisma.comment.create({
          data: {
            content,
            artworkId,
            userId,
            parentId,
          },
          include: {
            user: true,
            ...(parentId
              ? {}
              : {
                  replies: {
                    include: {
                      user: true,
                    },
                  },
                }),
          },
        });

        return comment;
      } catch (error) {
        console.error("Error creating comment:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create comment.",
        });
      }
    }),
});
