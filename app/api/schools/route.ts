import { SchoolApiResponse } from "@/types/schools";

export async function GET() {
  const response = await fetch(
    "https://catalogue.data.govt.nz/api/3/action/datastore_search_sql?sql=SELECT%20*%20FROM%20%224b292323-9fcc-41f8-814b-3c7b19cf14b3%22"
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
