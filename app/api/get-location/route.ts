import { NextRequest } from "next/server";
import { locationService } from "@/lib/services/location";

export async function GET(request: NextRequest) {
  // Extract real client IP from Vercel headers
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || undefined;

  const location = await locationService.getLocationByIp(ip);
  return new Response(JSON.stringify(location), { 
    headers: { "Content-Type": "application/json" } 
  });
}
