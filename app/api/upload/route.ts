import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { prisma } from "@/lib/prisma";
import { ArtCategory } from "@prisma/client";

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const category = formData.get("category") as ArtCategory;
  const title = formData.get("title") as string;
  const school = formData.get("school") as string;
  const tags = (formData.get("tags") as string).split(",");

  // Generate unique filename
  const fileName = `${Date.now()}-${file.name}`;

  // Upload to S3
  const uploadCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: fileName,
    Body: Buffer.from(await file.arrayBuffer()),
    ContentType: file.type,
  });

  await s3.send(uploadCommand);

  // Create database record
  const artwork = await prisma.artwork.create({
    data: {
      title,
      school,
      category,
      imageUrl: `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${fileName}`,
      tags,
      userId: "user-id", // You'll need to get this from your auth system
    },
  });

  return Response.json({ success: true, artwork });
}
