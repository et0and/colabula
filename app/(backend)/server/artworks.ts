import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { prisma } from "@/lib/prisma";
import { TRPCError } from "@trpc/server";
import * as yup from "yup";
import { router, publicProcedure } from "./index";
import { fileTypeFromBuffer } from "file-type";

const s3 = new S3Client({
  region: "auto",
  endpoint: process.env.AWS_ENDPOINT_URL,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "",
  },
});

const updateArtworkSchema = yup.object({
  id: yup.string().required(),
  title: yup.string().required(),
  content: yup.string().required(),
  tags: yup.array().of(yup.string()).required(),
  existingImages: yup.array().of(yup.string()).required(),
  newImages: yup.array().of(yup.string()).required(),
});

export const artworksRouter = router({
  getArtwork: publicProcedure
    .input(yup.object({ id: yup.string().required() }))
    .query(async ({ input }) => {
      const artwork = await prisma.artwork.findUnique({
        where: { id: input.id },
        include: {
          user: true,
          comments: true,
          ratings: true,
        },
      });
      if (!artwork) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Artwork not found",
        });
      }
      return artwork;
    }),
  updateArtwork: publicProcedure
    .input(updateArtworkSchema)
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session?.user) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      // Upload new images to S3/R2 bucket
      const newImageUrls: string[] = [];
      for (const base64 of input.newImages) {
        if (typeof base64 !== "string") {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Invalid image data",
          });
        }

        const buffer = Buffer.from(base64, "base64");

        const typeResult = await fileTypeFromBuffer(buffer);
        if (!typeResult) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Invalid file type",
          });
        }

        const fileName = `${Date.now()}-${Math.random()
          .toString(16)
          .slice(2)}.${typeResult.ext}`;

        const command = new PutObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME!,
          Key: fileName,
          Body: buffer,
          ContentType: typeResult.mime,
          ACL: "public-read",
        });
        await s3.send(command);
        newImageUrls.push(`${process.env.AWS_PUBLIC_ENDPOINT_URL}/${fileName}`);
      }

      const combinedImageUrls = [...input.existingImages, ...newImageUrls];

      const updatedArtwork = await prisma.artwork.update({
        where: { id: input.id },
        data: {
          title: input.title,
          content: input.content,
          tags: input.tags as string[],
          imageUrls: combinedImageUrls as string[],
        },
      });

      return updatedArtwork;
    }),
  deleteArtwork: publicProcedure
    .input(yup.object({ id: yup.string().required() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session?.user) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const existingArtwork = await prisma.artwork.findUnique({
        where: { id: input.id },
      });
      if (!existingArtwork) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Artwork not found",
        });
      }
      if (existingArtwork.userId !== ctx.session.user.id) {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      await prisma.artwork.delete({ where: { id: input.id } });
      return { success: true };
    }),
});
