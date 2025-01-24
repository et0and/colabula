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
  const sessionData = await auth.api.getSession({ headers: req.headers });
  if (!sessionData?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // 1. Check cache for COMPRESSED data
    const cachedCompressed = await redis.get<string>(CACHE_KEY);
    if (cachedCompressed) {
      return new NextResponse(cachedCompressed, {
        headers: {
          "Content-Type": "application/json",
          "Content-Encoding": "gzip",
          "Cache-Control": "public, max-age=2592000",
          Vary: "Accept-Encoding",
        },
      });
    }

    // 2. Cache miss: fetch from source
    const response = await fetch(
      `https://catalogue.data.govt.nz/api/3/action/datastore_search_sql?sql=SELECT * FROM "4b292323..." ORDER BY "Org_Name"`
    );
    if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);

    // 3. Process and cache
    const data: SchoolApiResponse = await response.json();
    const schools = data.result.records.map((record) => record.Org_Name);
    const compressed = await compress(JSON.stringify(schools));
    await redis.set(CACHE_KEY, compressed, { ex: 2592000 });

    // 4. Return the new compressed data
    return new NextResponse(compressed, {
      headers: {
        "Content-Type": "application/json",
        "Content-Encoding": "gzip",
        "Cache-Control": "public, max-age=2592000",
        Vary: "Accept-Encoding",
      },
    });
  } catch (error) {
    console.error("Error in schools API:", error);
    return NextResponse.json(
      { error: "Failed to fetch schools" },
      { status: 500 }
    );
  }
}