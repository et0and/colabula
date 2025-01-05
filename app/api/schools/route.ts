import { SchoolApiResponse } from "@/types/schools";
import { compress } from "@/lib/compression";

export async function GET() {
  // Fetch all schools in one request
  const response = await fetch(
    `https://catalogue.data.govt.nz/api/3/action/datastore_search_sql?sql=SELECT * FROM "4b292323-9fcc-41f8-814b-3c7b19cf14b3"`
  );
  const data: SchoolApiResponse = await response.json();

  const schools = data.result.records
    .map((record) => record.Org_Name)
    .sort((a, b) => a.localeCompare(b));

  // Compress the JSON response
  const compressed = await compress(JSON.stringify(schools));

  return new Response(compressed, {
    headers: {
      "Content-Type": "application/json",
      "Content-Encoding": "gzip",
      "Cache-Control": "public, max-age=604800, stale-while-revalidate=86400", // Cache for 7 days
      Vary: "Accept-Encoding",
    },
  });
}
