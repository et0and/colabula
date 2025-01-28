import { publicProcedure, router } from "./index";
import { Redis } from "@upstash/redis";
import { TRPCError } from "@trpc/server";
import { compress } from "@/lib/compression";
import { SchoolApiResponse } from "@/types/schools";

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Cache key for Upstash
const CACHE_KEY = "schools_list";

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
      // 1. Check cache for already-compressed data
      const cachedCompressed = await redis.get<string>(CACHE_KEY);
      if (cachedCompressed) {
        // Return the compressed data directly
        return cachedCompressed;
      }

      // 2. Fetch from source if no cache hit
      const response = await fetch(
        `https://catalogue.data.govt.nz/api/3/action/datastore_search_sql?sql=SELECT * FROM "4b292323..." ORDER BY "Org_Name"`
      );
      if (!response.ok) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Failed to fetch schools: ${response.statusText}`,
        });
      }

      // 3. Compress the new data and store in Redis
      const data: SchoolApiResponse = await response.json();
      const schools = data.result.records.map((record) => record.Org_Name);

      const compressed = await compress(JSON.stringify(schools));
      await redis.set(CACHE_KEY, compressed, { ex: 2592000 }); // 30 days

      // 4. Return compressed data
      return compressed;
    } catch (error) {
      console.error("Error in schools tRPC API:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch schools",
      });
    }
  }),
});
