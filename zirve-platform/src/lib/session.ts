import { NextRequest, NextResponse } from "next/server";

export const SESSION_COOKIE = "zirve_user_id";
const MAX_AGE = 60 * 60 * 24 * 365; // 1 yıl

export function getSessionUserId(req: NextRequest): string | null {
  return req.cookies.get(SESSION_COOKIE)?.value ?? null;
}

export function setSessionOnResponse(res: NextResponse, userId: string) {
  res.cookies.set(SESSION_COOKIE, userId, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export function clearSessionOnResponse(res: NextResponse) {
  res.cookies.set(SESSION_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
}
