import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSessionUserId } from "@/lib/session";

export async function GET(req: NextRequest) {
  const id = getSessionUserId(req);
  if (!id) return NextResponse.json({ user: null });

  const user = await prisma.user.findUnique({
    where: { id },
    select: { id: true, email: true, name: true, company: true, plan: true },
  });
  if (!user) return NextResponse.json({ user: null });
  return NextResponse.json({ user });
}
