import { NextResponse } from "next/server";
export async function GET() {
  const body = {
    ok: true,
    service: process.env.NEXT_PUBLIC_APP_NAME || "GSC Intelligence",
    env: process.env.APP_ENV || "unknown",
    request_id: crypto.randomUUID(),
    ts: new Date().toISOString(),
  };
  return NextResponse.json(body, { status: 200 });
}
