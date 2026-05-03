"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Link2, LogIn, MessageSquare, Share2, Globe, CheckCircle2, XCircle, Loader2 } from "lucide-react";

type MeUser = { id: string; email: string; name: string | null };

function formatMetaCallbackError(raw: string | null): string | null {
  if (!raw) return null;
  if (raw === "cancelled") return "İşlem iptal edildi.";
  if (raw === "no_code") return "Meta kodu gelmedi. Tekrar dene.";
  if (raw === "bad_state") return "Oturum bilgisi bozuldu. Önce bu sayfadan tekrar Meta ile bağlan.";
  if (raw === "no_user") return "Kullanıcı kimliği eksik. Önce hesap oluştur, sonra Meta.";
  if (raw === "user_not_found") return "ZIRVE hesabı bulunamadı. Yeniden kayıt ol.";
  if (raw === "server_error") return "Sunucu hatası. Terminal loglarına bak.";
  if (raw.startsWith("token_failed:")) {
    const detail = raw.slice("token_failed:".length);
    return `Meta token hatası: ${detail}. Genelde sebep: Uygulama ayarlarındaki "OAuth yönlendirme URI" ile tarayıcı adresin uyuşmuyor (ör. http://localhost:3000 vs http://127.0.0.1:3000). İkisini de Meta'ya ekle ve bağlanırken hep aynı hostu kullan.`;
  }
  if (raw.startsWith("pages_failed:")) {
    return `Sayfa listesi alınamadı: ${raw.slice("pages_failed:".length)}. İzinleri ve işletme rollerini kontrol et.`;
  }
  return raw;
}

export default function BaglantiPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [user, setUser] = useState<MeUser | null>(null);
  const [loadingMe, setLoadingMe] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [nextFlag, setNextFlag] = useState<string | null>(null);
  const [platform, setPlatform] = useState("all");
  const [urlError, setUrlError] = useState<string | null>(null);
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    setNextFlag(p.get("next"));
    setPlatform(p.get("platform") || "all");
    setUrlError(p.get("error"));
    setOrigin(window.location.origin);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/auth/me", { credentials: "include" });
        const data = (await res.json()) as { user: MeUser | null };
        if (!cancelled) {
          setUser(data.user ?? null);
          if (data.user?.email) setEmail(data.user.email);
          if (data.user?.name) setName(data.user.name);
        }
      } catch {
        if (!cancelled) setUser(null);
      } finally {
        if (!cancelled) setLoadingMe(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const register = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, name: name || email.split("@")[0] }),
      });
      const raw = await res.text();
      const ct = res.headers.get("content-type") || "";
      let data: { error?: string; user?: MeUser };
      try {
        data = JSON.parse(raw) as { error?: string; user?: MeUser };
      } catch {
        throw new Error(
          ct.includes("application/json")
            ? "Sunucu yanıtı okunamadı."
            : "API yanıtı JSON değil (çoğunlukla 404 HTML). `platform` klasöründe `npm run dev` çalıştırıp sunucuyu yeniden başlatın; üst dizindeki fazladan package-lock.json Turbopack kökünü bozuyordu — düzeltildi."
        );
      }
      if (!res.ok) throw new Error(data.error || "Kayıt başarısız");
      setUser(data.user!);
      if (nextFlag === "meta") {
        window.location.href = `/api/auth/meta?platform=${encodeURIComponent(platform)}`;
      }
    } catch (e2) {
      setErr(e2 instanceof Error ? e2.message : "Hata");
    } finally {
      setSubmitting(false);
    }
  };

  const startMeta = () => {
    window.location.href = `/api/auth/meta?platform=${encodeURIComponent(platform)}`;
  };

  if (loadingMe) {
    return (
      <div className="flex items-center justify-center min-h-[40vh] text-slate-500 gap-2">
        <Loader2 className="w-5 h-5 animate-spin" />
        Yükleniyor…
      </div>
    );
  }

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold flex items-center gap-2">
          <Link2 className="w-7 h-7 text-indigo-400" />
          Hesabını bağla
        </h1>
        <p className="text-slate-500 text-sm mt-2">
          Başka bir işletme gibi: önce ZIRVE&apos;de kendini oluştur, sonra tek tıkla Meta ile WhatsApp, Instagram ve
          Facebook sayfalarını bağla. Mesajların{" "}
          <Link href="/dashboard/mesajlar" className="text-indigo-400 hover:underline">
            Gelen Kutusu
          </Link>
          &apos;nda birleşir.
        </p>
      </div>

      {urlError && (
        <div className="rounded-2xl border border-red-500/30 bg-red-950/40 px-4 py-3 text-sm text-red-200 flex flex-col gap-2">
          <div className="flex items-start gap-2">
            <XCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{formatMetaCallbackError(urlError)}</span>
          </div>
          <p className="text-[11px] text-red-300/80 pl-6">
            Meta Developer → Uygulama → Facebook Girişi → Ayarlar → Geçerli OAuth yönlendirme URI:
            <code className="block mt-1 text-red-200 break-all bg-black/30 rounded px-2 py-1">
              {origin ? `${origin}/api/auth/meta/callback` : "…/api/auth/meta/callback"}
            </code>
          </p>
        </div>
      )}

      {!user ? (
        <form onSubmit={register} className="bg-[#0a0f1e] border border-white/[0.07] rounded-2xl p-6 space-y-4">
          <h2 className="font-bold text-lg">1. İşletme hesabı</h2>
          <p className="text-xs text-slate-500">Şifresiz başlangıç — sadece e-posta (geliştirme için).</p>
          {err && <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2">{err}</div>}
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">E-posta</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="siz@isletme.com"
              className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">İşletme adı</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Örn: Hirenup"
              className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-60"
          >
            {submitting ? "Kaydediliyor…" : nextFlag === "meta" ? "Kaydet ve Meta’ya git" : "Hesabı oluştur"}
          </button>
        </form>
      ) : (
        <div className="bg-green-500/[0.08] border border-green-500/20 rounded-2xl p-4 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
          <div className="text-sm">
            <div className="font-bold text-green-300">Oturum açık</div>
            <div className="text-slate-400 mt-0.5">
              {user.email} · {user.name}
            </div>
          </div>
        </div>
      )}

      <div className="bg-[#0a0f1e] border border-white/[0.07] rounded-2xl p-6 space-y-4">
        <h2 className="font-bold text-lg">2. Meta (WhatsApp + Instagram + Facebook)</h2>
        <p className="text-sm text-slate-500">
          Facebook ile giriş yapıp izin verdiğinde sayfaların, Instagram iş hesabın ve varsa WhatsApp Cloud hatların bu
          ZIRVE hesabına kaydedilir.
        </p>
        <div className="grid sm:grid-cols-3 gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2 bg-white/[0.03] border border-white/[0.07] rounded-xl p-3">
            <MessageSquare className="w-4 h-4 text-green-400" />
            WhatsApp
          </div>
          <div className="flex items-center gap-2 bg-white/[0.03] border border-white/[0.07] rounded-xl p-3">
            <Share2 className="w-4 h-4 text-pink-400" />
            Instagram DM
          </div>
          <div className="flex items-center gap-2 bg-white/[0.03] border border-white/[0.07] rounded-xl p-3">
            <Globe className="w-4 h-4 text-blue-400" />
            Facebook Sayfa
          </div>
        </div>
        {!user ? (
          <p className="text-xs text-amber-300/90">Önce yukarıdan işletme hesabını oluştur.</p>
        ) : (
          <button
            type="button"
            onClick={startMeta}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 shadow-lg shadow-green-500/15"
          >
            <LogIn className="w-4 h-4" />
            Meta ile bağlan
          </button>
        )}
      </div>

      <div className="bg-indigo-500/[0.06] border border-indigo-500/20 rounded-2xl p-5 text-sm text-slate-400">
        <p className="font-semibold text-indigo-200 mb-2">Sonraki adımlar (yol haritası)</p>
        <ul className="list-disc list-inside space-y-1 text-xs">
          <li>Satış hunisi ve siparişler → CRM ile birleştirilecek</li>
          <li>Instagram / Facebook içgörüleri (insights) → Meta Insights API</li>
          <li>Reklam performansı → Marketing API (uygulama incelemesi gerekebilir)</li>
        </ul>
        <Link href="/dashboard/mesajlar" className="inline-block mt-3 text-indigo-400 hover:underline text-xs font-semibold">
          Gelen kutusuna git →
        </Link>
      </div>
    </div>
  );
}
