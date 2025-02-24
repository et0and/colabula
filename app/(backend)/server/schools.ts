import { publicProcedure, router } from "./index";
import { Redis } from "@upstash/redis";
import { TRPCError } from "@trpc/server";
import { SchoolApiResponse } from "@/types/schools";
import * as yup from "yup";

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Cache key for Upstash
const CACHE_KEY = "schools_list";

// Yup schema for validating the school name
const schoolNameSchema = yup.string().required();

// Yup schema for validating the API response
const schoolApiResponseSchema = yup.object({
  result: yup.object({
    records: yup.array().of(
      yup.object({
        Org_Name: schoolNameSchema,
      })
    ),
  }),
});

export const schoolsRouter = router({
  getSchools: publicProcedure.query(async ({ ctx }) => {
    // Make sure the user is authenticated
    if (!ctx.session?.user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Unauthorized",
      });
    }

    try {
      // 1. Check cache for data
      const cachedSchools = await redis.get<string[]>(CACHE_KEY);
      if (cachedSchools) {
        // Return the cached data directly
        return cachedSchools;
      }

      // 2. Fetch from source if no cache hit
      const response = await fetch(
        `https://catalogue.data.govt.nz/api/3/action/datastore_search_sql?sql=SELECT * FROM "4b292323-9fcc-41f8-814b-3c7b19cf14b3"`
      );
      if (!response.ok) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Failed to fetch schools: ${response.statusText}`,
        });
      }

      // 3. Process and cache
      const data: SchoolApiResponse = await response.json();

      // Validate the API response using Yup
      try {
        await schoolApiResponseSchema.validate(data);
      } catch (validationError) {
        console.error("Validation error:", validationError);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Failed to validate schools data`,
        });
      }

      const schools = data.result.records.map((record) => record.Org_Name);

      await redis.set(CACHE_KEY, schools, { ex: 2592000 }); // 30 days

      // 4. Return data
      return schools;
    } catch (error) {
      console.error("Error in schools tRPC API:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch schools",
      });
    }
  }),
});
