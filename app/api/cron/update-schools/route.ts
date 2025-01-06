import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { SchoolApiResponse } from "@/types/schools";

export const runtime = "edge";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (
    process.env.CRON_SECRET &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const response = await fetch(
      `https://catalogue.data.govt.nz/api/3/action/datastore_search_sql?sql=SELECT * FROM "4b292323-9fcc-41f8-814b-3c7b19cf14b3"`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch schools: ${response.statusText}`);
    }

    const data: SchoolApiResponse = await response.json();
    const schools = data.result.records
      .map((record) => record.Org_Name)
      .sort((a, b) => a.localeCompare(b));

    await redis.set("schools_list", schools, { ex: 2592000 }); // 30 days expiry

    return NextResponse.json({
      success: true,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error updating schools:", error);
    return NextResponse.json(
      { error: "Failed to update schools" },
      { status: 500 }
    );
  }
}
