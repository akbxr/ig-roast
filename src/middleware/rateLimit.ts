import { NextRequest, NextResponse } from "next/server";

const rateLimitMap = new Map<string, { count: number; lastRequest: number }>();
const RATE_LIMIT = 100; // Number of requests
const TIME_WINDOW = 60 * 1000; // Time window in milliseconds (1 minute)

export function rateLimit(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") || request.ip || "unknown";
  const now = Date.now();

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, { count: 1, lastRequest: now });
    return NextResponse.next();
  }

  const rateLimitInfo = rateLimitMap.get(ip)!;
  if (now - rateLimitInfo.lastRequest > TIME_WINDOW) {
    rateLimitMap.set(ip, { count: 1, lastRequest: now });
    return NextResponse.next();
  }

  if (rateLimitInfo.count >= RATE_LIMIT) {
    return NextResponse.json(
      { message: "Too many requests, please try again later." },
      { status: 429 }
    );
  }

  rateLimitInfo.count += 1;
  rateLimitInfo.lastRequest = now;
  return NextResponse.next();
}
