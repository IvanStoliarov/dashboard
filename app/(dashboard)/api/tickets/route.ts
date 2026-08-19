import { getTicketsAPI } from "@/lib/data/tickets";

export async function GET() {
  const { data, error } = await getTicketsAPI();

  if (error || !data) {
    console.error("Failed to fetch tickets", error);
    return Response.json(
      { error: "Failed to fetch tickets" },
      { status: 500 },
    );
  }

  return Response.json(data);
}
