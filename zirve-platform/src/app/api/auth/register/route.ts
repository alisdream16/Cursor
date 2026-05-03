import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { setSessionOnResponse } from "@/lib/session";

/** E-posta ile hızlı kayıt / giriş (şifresiz MVP) */
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { email?: string; name?: string };
    const email = body.email?.trim().toLowerCase();
    const name = body.name?.trim() || "İşletme";

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Geçerli bir e-posta girin" }, { status: 400 });
    }

    const user =
      (await prisma.user.findUnique({ where: { email } })) ??
      (await prisma.user.create({ data: { email, name } }));

    if (user.name !== name && name !== "İşletme") {
      await prisma.user.update({ where: { id: user.id }, data: { name } });
    }

    const res = NextResponse.json({
      ok: true,
      user: { id: user.id, email: user.email, name: user.name },
    });
    setSessionOnResponse(res, user.id);
    return res;
  } catch (e) {
    console.error("register", e);
    return NextResponse.json({ error: "Kayıt başarısız" }, { status: 500 });
  }
}
