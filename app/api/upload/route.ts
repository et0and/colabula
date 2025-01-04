import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { prisma } from "@/lib/prisma";
import { ArtCategory } from "@prisma/client";
import { auth } from "@/lib/auth";

const s3 = new S3Client({
  region: "auto",
  endpoint: process.env.AWS_ENDPOINT_URL,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: Request) {
  const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MiB in bytes
  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

  const sessionData = await auth.api.getSession({
    headers: req.headers,
  });

  if (!sessionData?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!ALLOWED_TYPES.includes(file.type)) {
    return Response.json(
      { error: "Only JPG, PNG and WEBP files are allowed" },
      { status: 400 }
    );
  }

  if (file.size > MAX_FILE_SIZE) {
    return Response.json(
      { error: "File size must be less than 50MiB" },
      { status: 400 }
    );
  }

  const category = formData.get("category") as ArtCategory;
  const title = formData.get("title") as string;
  const school = formData.get("school") as string;
  const tags = (formData.get("tags") as string)
    .split(",")
    .map((tag) => tag.trim());
  const content = formData.get("content") as string;

  // Generate unique filename
  const fileName = `${Date.now()}-${file.name}`;

  // Upload to S3
  const uploadCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: fileName,
    Body: Buffer.from(await file.arrayBuffer()),
    ContentType: file.type,
    ACL: "public-read",
  });

  await s3.send(uploadCommand);

  const artwork = await prisma.artwork.create({
    data: {
      title,
      school,
      category,
      imageUrl: `${process.env.AWS_ENDPOINT_URL}/${fileName}`,
      tags,
      content,
      userId: sessionData.user.id,
    },
  });

  return Response.json({ success: true, artwork });
}
