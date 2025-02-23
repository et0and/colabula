import * as yup from "yup";
import { publicProcedure, router } from "./index";
import { prisma } from "@/lib/prisma";
import { TRPCError } from "@trpc/server";

const ratingSchema = yup.object({
  artworkId: yup.string().required(),
  rating: yup.number().min(0).max(8).required(),
  userId: yup.string().required(),
});

export const ratingsRouter = router({
  getRating: publicProcedure
    .input(yup.object({ artworkId: yup.string().required() }))
    .query(async ({ ctx, input }) => {
      if (!ctx.session) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be logged in to view ratings",
        });
      }

      const rating = await prisma.rating.findUnique({
        where: {
          userId_artworkId: {
            userId: ctx.session.user.id,
            artworkId: input.artworkId,
          },
        },
      });
      return { rating };
    }),

  submitRating: publicProcedure
    .input(ratingSchema)
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be logged in to submit ratings",
        });
      }

      if (input.userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Cannot submit a rating on behalf of another user",
        });
      }

      const newRating = await prisma.rating.create({
        data: {
          value: input.rating,
          artworkId: input.artworkId,
          userId: input.userId,
        },
        include: {
          user: true,
        },
      });
      return newRating;
    }),

  // Add this procedure to support updating an existing rating
  updateRating: publicProcedure
    .input(ratingSchema)
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be logged in to update ratings",
        });
      }

      // Make sure there's an existing rating to update; handle errors as needed
      try {
        const updatedRating = await prisma.rating.update({
          where: {
            userId_artworkId: {
              userId: ctx.session.user.id,
              artworkId: input.artworkId,
            },
          },
          data: {
            value: input.rating,
          },
          include: {
            user: true,
          },
        });
        return updatedRating;
      } catch (error) {
        if (
          error instanceof Error &&
          "code" in error &&
          error.code === "P2025"
        ) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Rating not found",
          });
        }
        throw error;
      }
    }),
});
