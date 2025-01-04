import { SchoolApiResponse } from "@/types/schools";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = 50;
  const offset = (page - 1) * limit;

  const response = await fetch(
    `https://catalogue.data.govt.nz/api/3/action/datastore_search_sql?sql=SELECT * FROM "4b292323-9fcc-41f8-814b-3c7b19cf14b3" LIMIT ${limit} OFFSET ${offset}`
  );
  const data: SchoolApiResponse = await response.json();

  const schools = data.result.records
    .map((record) => record.Org_Name)
    .sort((a, b) => a.localeCompare(b));

  return new Response(JSON.stringify(schools), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=2592000, stale-while-revalidate=86400",
    },
  });
}
