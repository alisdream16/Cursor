"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Inbox, MessageSquare, Share2, Globe, RefreshCw, Link2, Loader2, CheckCircle2, XCircle } from "lucide-react";

type Conv = {
  id: string;
  channel: string;
  channelLabel: string;
  lastMessage: string;
  lastAt: string;
  contactName: string;
  contactPhone: string | null;
};

type Integ = { platform: string; label: string | null; accountId: string | null };

export default function MesajlarPage() {
  const [loading, setLoading] = useState(true);
  const [unauth, setUnauth] = useState(false);
  const [conversations, setConversations] = useState<Conv[]>([]);
  const [integrations, setIntegrations] = useState<Integ[]>([]);
  const [filter, setFilter] = useState<string>("all");

  const [connectedBanner, setConnectedBanner] = useState(false);
  const [waMissingBanner, setWaMissingBanner] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setUnauth(false);
    try {
      const res = await fetch("/api/inbox/conversations", { credentials: "include", cache: "no-store" });
      if (res.status === 401) {
        setUnauth(true);
        setConversations([]);
        setIntegrations([]);
        return;
      }
      const data = (await res.json()) as { conversations?: Conv[]; integrations?: Integ[] };
      setConversations(data.conversations ?? []);
      setIntegrations(data.integrations ?? []);
    } catch {
      setConversations([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    if (p.get("connected") === "1") {
      setConnectedBanner(true);
      if (p.get("whatsapp") === "0") setWaMissingBanner(true);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const filtered =
    filter === "all" ? conversations : conversations.filter((c) => c.channel === filter);

  const channelIcon = (ch: string) => {
    if (ch === "whatsapp") return <MessageSquare className="w-4 h-4 text-green-400" />;
    if (ch === "instagram") return <Share2 className="w-4 h-4 text-pink-400" />;
    if (ch === "facebook") return <Globe className="w-4 h-4 text-blue-400" />;
    return <Inbox className="w-4 h-4 text-slate-400" />;
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-slate-500">
        <Loader2 className="w-5 h-5 animate-spin" />
        Gelen kutusu yükleniyor…
      </div>
    );
  }

  if (unauth) {
    return (
      <div className="max-w-lg space-y-4">
        <h1 className="text-2xl font-extrabold flex items-center gap-2">
          <Inbox className="w-7 h-7 text-indigo-400" />
          Gelen kutusu
        </h1>
        <p className="text-slate-500 text-sm">Önce işletme hesabı oluşturup Meta ile bağlanmalısın.</p>
        <Link
          href="/dashboard/baglanti"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600"
        >
          <Link2 className="w-4 h-4" />
          Bağlantı sayfasına git
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-[1000px]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold flex items-center gap-2">
            <Inbox className="w-7 h-7 text-indigo-400" />
            Gelen kutusu
          </h1>
          <p className="text-slate-500 text-sm mt-1">WhatsApp, Instagram ve Facebook mesajları tek listede</p>
        </div>
        <button
          type="button"
          onClick={() => void load()}
          className="flex items-center gap-2 self-start px-4 py-2 rounded-xl text-sm font-semibold border border-white/10 text-slate-300 hover:bg-white/[0.05]"
        >
          <RefreshCw className="w-4 h-4" />
          Yenile
        </button>
      </div>

      {connectedBanner && (
        <div className="rounded-2xl border border-green-500/30 bg-green-950/40 px-4 py-3 text-sm text-green-100 flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="flex items-start gap-3 flex-1">
            <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
            <span>
              Meta hesabın bağlandı. Bağlı kanallar aşağıda; WhatsApp için gelen mesajlar webhook ile listelenir.
            </span>
          </div>
          <button type="button" onClick={() => setConnectedBanner(false)} className="text-green-500 hover:text-white p-1 self-end sm:self-start" aria-label="Kapat">
            <XCircle className="w-4 h-4" />
          </button>
        </div>
      )}

      {waMissingBanner && (
        <div className="rounded-2xl border border-amber-500/30 bg-amber-950/40 px-4 py-3 text-sm text-amber-100 flex flex-col sm:flex-row sm:items-start gap-3">
          <span className="flex-1">
            <strong>WhatsApp hattı bulunamadı.</strong> Facebook sayfan ile WhatsApp Business hesabı Meta’da bağlı olmayabilir veya Graph telefon listesi boş döndü.
            <Link href="/dashboard/whatsapp" className="block mt-2 text-amber-200 font-semibold hover:underline">
              WhatsApp → Manuel Phone Number ID ile ekle
            </Link>
          </span>
          <button type="button" onClick={() => setWaMissingBanner(false)} className="text-amber-500 hover:text-white p-1 shrink-0" aria-label="Kapat">
            <XCircle className="w-4 h-4" />
          </button>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {[
          { id: "all", label: "Tümü" },
          { id: "whatsapp", label: "WhatsApp" },
          { id: "instagram", label: "Instagram" },
          { id: "facebook", label: "Facebook" },
        ].map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setFilter(t.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              filter === t.id
                ? "bg-indigo-600 border-indigo-500 text-white"
                : "bg-white/[0.04] border-white/10 text-slate-400 hover:text-white"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {integrations.length > 0 && (
        <div className="bg-[#0a0f1e] border border-white/[0.07] rounded-2xl p-4">
          <div className="text-xs font-semibold text-slate-500 mb-2">Bağlı kanallar</div>
          <div className="flex flex-wrap gap-2">
            {integrations.map((i) => (
              <span
                key={`${i.platform}-${i.accountId}`}
                className="text-[11px] px-2 py-1 rounded-lg bg-white/[0.05] border border-white/10 text-slate-300"
              >
                {i.platform}: {i.label ?? i.accountId ?? "—"}
              </span>
            ))}
          </div>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="border border-dashed border-white/15 rounded-2xl p-12 text-center text-slate-500 text-sm">
          Henüz birleşik konuşma yok. WhatsApp webhook çalıştığında veya diğer kanallardan mesaj düştüğünde burada
          görünecek.
          <div className="mt-4">
            <Link href="/dashboard/baglanti" className="text-indigo-400 font-semibold hover:underline">
              Meta hesabını bağla
            </Link>
            {" · "}
            <Link href="/dashboard/whatsapp" className="text-indigo-400 font-semibold hover:underline">
              WhatsApp ayarları
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((c) => (
            <div
              key={c.id}
              className="bg-[#0a0f1e] border border-white/[0.07] rounded-2xl p-4 flex items-start gap-4 hover:border-white/15 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center flex-shrink-0">
                {channelIcon(c.channel)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-sm truncate">{c.contactName}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.06] text-slate-400 border border-white/10">
                    {c.channelLabel}
                  </span>
                </div>
                <p className="text-sm text-slate-400 truncate mt-1">{c.lastMessage || "—"}</p>
                {c.contactPhone && <p className="text-[11px] text-slate-600 mt-1">{c.contactPhone}</p>}
              </div>
              <div className="text-[11px] text-slate-600 flex-shrink-0 whitespace-nowrap">
                {new Date(c.lastAt).toLocaleString("tr-TR", { dateStyle: "short", timeStyle: "short" })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
