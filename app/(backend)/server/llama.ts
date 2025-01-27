import { z } from "zod";
import { publicProcedure, router } from "./index";
import { TRPCError } from "@trpc/server";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

// Schema for analyzing an image. We simply expect a base64 input of the image.
const analyzeImageSchema = z.object({
  base64: z.string().nonempty("Base64 data is required"),
});

export const llamaRouter = router({
  analyzeImage: publicProcedure
    .input(analyzeImageSchema)
    .mutation(async ({ ctx, input }) => {
      // Ensure user is authenticated
      if (!ctx.session?.user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be logged in to analyze images.",
        });
      }

      try {
        const completion = await openai.chat.completions.create({
          model: "meta-llama/llama-3.2-11b-vision-instruct:free",
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: "Generate a comma-separated list of relevant tags for this artwork, no more than 5 tags in total. Focus on style, medium, subject matter, and mood. Do not use sentences in your response. It should be structured like this: 'expressionist,painting,death,dark' without a full-stop/period for the last tag.",
                },
                {
                  type: "image_url",
                  image_url: {
                    url: `data:image/jpeg;base64,${input.base64}`,
                  },
                },
              ],
            },
          ],
        });

        return { tags: completion.choices[0]?.message?.content || "" };
      } catch (error) {
        console.error("Error analyzing image:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to analyze image",
        });
      }
    }),
});
