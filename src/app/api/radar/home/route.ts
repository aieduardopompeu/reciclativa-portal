import { NextResponse } from "next/server";
import { getRadarHomeData } from "@/lib/radar";

export const runtime = "nodejs";

export async function GET() {
  const data = await getRadarHomeData();
  return NextResponse.json(data);
}
