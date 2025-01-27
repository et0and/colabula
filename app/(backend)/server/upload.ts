import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { prisma } from "@/lib/prisma";
import { ArtCategory } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "./index";
import * as yup from "yup";
import { fileTypeFromBuffer } from "file-type";

const s3 = new S3Client({
  region: "auto",
  endpoint: process.env.AWS_ENDPOINT_URL,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "",
  },
});

const MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024; // 50 MiB

const uploadSchema = yup.object({
  images: yup.array().of(yup.string().required()).required(),
  title: yup.string().required(),
  category: yup.mixed<ArtCategory>().required(),
  school: yup.string().required(),
  assessmentLevel: yup.string().required(),
  tags: yup.array().of(yup.string().trim()).required(),
  content: yup.string().required(),
});

export const uploadRouter = router({
  uploadPortfolio: publicProcedure
    .input(uploadSchema)
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session?.user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be logged in to upload portfolios",
        });
      }

      const imageUrls: string[] = [];

      for (const base64 of input.images) {
        const buffer = Buffer.from(base64, "base64");

        // Check file size
        if (buffer.byteLength > MAX_FILE_SIZE_BYTES) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "One of your images exceeds 50MiB",
          });
        }

        // Detect file type
        const typeResult = await fileTypeFromBuffer(buffer);
        if (
          !typeResult ||
          !["image/jpeg", "image/png", "image/webp", "image/gif"].includes(
            typeResult.mime
          )
        ) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message:
              "The file is not a valid image format (only JPG, PNG, GIF, or WEBP).",
          });
        }

        // Use the proper extension and MIME type
        const fileName = `${Date.now()}-${Math.random()
          .toString(16)
          .slice(2)}.${typeResult.ext}`;

        // Upload to S3
        const command = new PutObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME!,
          Key: fileName,
          Body: buffer,
          ContentType: typeResult.mime,
          ACL: "public-read",
        });

        await s3.send(command);

        imageUrls.push(`${process.env.AWS_PUBLIC_ENDPOINT_URL}/${fileName}`);
      }

      const artwork = await prisma.artwork.create({
        data: {
          title: input.title,
          category: input.category,
          school: input.school,
          imageUrls,
          assessmentLevel: input.assessmentLevel,
          tags: input.tags as string[],
          content: input.content,
          userId: ctx.session.user.id,
        },
      });

      return { success: true, artwork };
    }),
});
