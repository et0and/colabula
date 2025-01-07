import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString("base64");

    const completion = await openai.chat.completions.create({
      model: "meta-llama/llama-3.2-90b-vision-instruct:free",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Generate a comma-separated list of relevant tags for this artwork. Focus on style, medium, subject matter, and mood. Do not use sentences in your response. It should be structured like this: 'expressionist,painting,death,dark' without a full-stop/period for the last tag.",
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64}`,
              },
            },
          ],
        },
      ],
    });

    return NextResponse.json({ tags: completion.choices[0].message.content });
  } catch (error) {
    console.error("Error analyzing image:", error);
    return NextResponse.json(
      { error: "Failed to analyze image" },
      { status: 500 }
    );
  }
}
