import { SchoolApiResponse } from "@/types/schools";
import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { compress } from "@/lib/compression";
import { auth } from "@/lib/auth";

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Cache key for Upstash
const CACHE_KEY = "schools_list";

export async function GET(req: Request) {
  const sessionData = await auth.api.getSession({
    headers: req.headers,
  });

  if (!sessionData?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    // Try to get cached data first
    const cachedSchools = await redis.get<string[]>(CACHE_KEY);

    if (cachedSchools) {
      const compressed = await compress(JSON.stringify(cachedSchools));

      return new NextResponse(compressed, {
        headers: {
          "Content-Type": "application/json",
          "Content-Encoding": "gzip",
          "Cache-Control": "public, max-age=2592000", // 30 days
          Vary: "Accept-Encoding",
        },
      });
    }

    // If no cached data, fetch from source
    const response = await fetch(
      `https://catalogue.data.govt.nz/api/3/action/datastore_search_sql?sql=SELECT * FROM "4b292323-9fcc-41f8-814b-3c7b19cf14b3" ORDER BY "Org_Name"`,
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch schools: ${response.statusText}`);
    }

    const data: SchoolApiResponse = await response.json();
    // After fetching and processing:
const schools = data.result.records.map((record) => record.Org_Name); // No sorting needed
const compressed = await compress(JSON.stringify(schools));
await redis.set(CACHE_KEY, compressed, { ex: 2592000 }); // Cache compressed bytes

// On cache hit:
const cachedCompressed = await redis.get<string>(CACHE_KEY);
if (cachedCompressed) {
  return new NextResponse(cachedCompressed, {
      headers: {
        "Content-Type": "application/json",
        "Content-Encoding": "gzip",
        "Cache-Control": "public, max-age=2592000", // 30 days
        Vary: "Accept-Encoding",
      },
    });
  } catch (error) {
    console.error("Error in schools API:", error);
    return NextResponse.json(
      { error: "Failed to fetch schools" },
      { status: 500 },
    );
  }
}
