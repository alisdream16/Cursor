import { NextResponse } from "next/server";

const DEFAULT_ZIRVE_ORIGIN = "https://zirve2-production.up.railway.app";

export function GET() {
  const raw = process.env.NEXT_PUBLIC_ZIRVE_APP_URL?.trim();
  const base = (raw && raw.length > 0 ? raw : DEFAULT_ZIRVE_ORIGIN).replace(/\/+$/, "");
  return NextResponse.redirect(new URL("/giris", base));
}
