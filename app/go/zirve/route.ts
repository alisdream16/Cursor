import { NextResponse } from "next/server";
import { getZirveAppUrl } from "@/lib/zirve-url";

export function GET() {
  return NextResponse.redirect(new URL("/giris", getZirveAppUrl()));
}
