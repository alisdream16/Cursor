"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  MessageSquare,
  Send,
  RefreshCw,
  Phone,
  Settings,
  Zap,
  Copy,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Plus,
  Trash2,
  LogIn,
  MoreVertical,
  Bot,
  Activity,
  ChevronRight,
} from "lucide-react";

type SendStatus = "idle" | "sending" | "success" | "error";

/** API /api/whatsapp/accounts ile uyumlu */
type WaAccount = {
  id: string;
  phoneNumberId: string;
  wabaId: string;
  displayName: string;
  phone: string;
  status: "active" | "error" | "pending";
  messagesSent: number | null;
  lastActivity: string;
  isDefault: boolean;
  tokenSource?: "env" | "stored";
};

export default function WhatsAppPage() {
  const [accounts, setAccounts] = useState<WaAccount[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<WaAccount | null>(null);
  const [activeTab, setActiveTab] = useState<"mesajlar" | "test" | "webhook" | "ayarlar">("mesajlar");
  const [showAddModal, setShowAddModal] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [needsSession, setNeedsSession] = useState(false);
  const [metaAppId, setMetaAppId] = useState("");
  const [envConfigured, setEnvConfigured] = useState(false);
  const [outboundTotal, setOutboundTotal] = useState(0);

  const [testTo, setTestTo] = useState("");
  const [testMessage, setTestMessage] = useState("Merhaba! Bu ZİRVE platformundan test mesajıdır. 🚀");
  const [sendStatus, setSendStatus] = useState<SendStatus>("idle");
  const [sendResult, setSendResult] = useState<Record<string, unknown> | null>(null);

  const webhookUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/api/whatsapp/webhook`;

  const loadAccounts = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    setNeedsSession(false);
    try {
      const res = await fetch("/api/whatsapp/accounts", { credentials: "include", cache: "no-store" });
      const data = (await res.json()) as {
        accounts?: WaAccount[];
        error?: string;
        code?: string;
        metaAppId?: string;
        envConfigured?: boolean;
        stats?: { outboundMessages?: number };
      };
      if (res.status === 401 || data.code === "NO_SESSION") {
        setNeedsSession(true);
        setAccounts([]);
        setSelectedAccount(null);
        return;
      }
      if (!res.ok) throw new Error(data.error || "Yüklenemedi");
      const list = data.accounts ?? [];
      setAccounts(list);
      setMetaAppId(data.metaAppId || "");
      setEnvConfigured(Boolean(data.envConfigured));
      setOutboundTotal(data.stats?.outboundMessages ?? 0);
      setSelectedAccount((prev) => {
        if (prev && list.some((a) => a.id === prev.id)) return prev;
        return list[0] ?? null;
      });
    } catch (e) {
      setLoadError(e instanceof Error ? e.message : "Hata");
      setAccounts([]);
      setSelectedAccount(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadAccounts();
  }, [loadAccounts]);

  const handleSendTest = async () => {
    if (!testTo || !testMessage || !selectedAccount) return;
    setSendStatus("sending");
    setSendResult(null);
    try {
      const res = await fetch("/api/whatsapp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          to: testTo,
          type: "text",
          text: testMessage,
          integrationId: selectedAccount.id,
        }),
      });
      const data = await res.json();
      setSendStatus(res.ok && data.success ? "success" : "error");
      setSendResult(data);
      if (res.ok && data.success) void loadAccounts();
    } catch {
      setSendStatus("error");
      setSendResult({ error: "Bağlantı hatası" });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/whatsapp/accounts?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        setLoadError((j as { error?: string }).error || "Silinemedi");
        return;
      }
      if (selectedAccount?.id === id) setSelectedAccount(null);
      setOpenMenu(null);
      await loadAccounts();
    } catch {
      setLoadError("Silme isteği başarısız");
    }
  };

  const devConsoleHref =
    metaAppId && metaAppId.length > 0
      ? `https://developers.facebook.com/apps/${metaAppId}/whatsapp-business/wa-dev-console/`
      : "https://developers.facebook.com/apps/";

  return (
    <div className="space-y-6 max-w-[1100px]">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-extrabold flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-green-400" />
            WhatsApp Hesapları
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Veriler sunucudan gelir: SQLite + Meta Graph (telefon / doğrulanmış isim)
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => void loadAccounts()}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-white/10 text-slate-300 hover:bg-white/[0.05] disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Yenile
          </button>
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-green-500/20"
          >
            <Plus className="w-4 h-4" />
            Yeni Hesap Bağla
          </button>
        </div>
      </div>

      {loadError && (
        <div className="rounded-2xl border border-red-500/30 bg-red-950/40 px-4 py-3 text-sm text-red-200 flex items-center justify-between gap-3">
          <span>{loadError}</span>
          <button type="button" onClick={() => setLoadError(null)} className="text-red-400 hover:text-white">
            <XCircle className="w-4 h-4" />
          </button>
        </div>
      )}

      {!loading && needsSession && (
        <div className="rounded-2xl border border-indigo-500/30 bg-indigo-950/50 px-4 py-4 text-sm text-indigo-100 flex flex-col sm:flex-row sm:items-center gap-3">
          <span>Bu sayfa için önce ZIRVE&apos;de oturum açmalısın (başka bir işletme gibi test etmek için).</span>
          <Link
            href="/dashboard/baglanti"
            className="inline-flex items-center justify-center px-4 py-2 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-500 whitespace-nowrap"
          >
            Hesap oluştur / Meta bağla
          </Link>
        </div>
      )}

      {loading && (
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <RefreshCw className="w-4 h-4 animate-spin" />
          Hesaplar yükleniyor…
        </div>
      )}

      {!loading && !needsSession && accounts.length === 0 && (
        <EmptyState
          envConfigured={envConfigured}
          onAdd={() => setShowAddModal(true)}
          onRefresh={() => void loadAccounts()}
        />
      )}

      {!loading && !needsSession && accounts.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {accounts.map((acc) => (
            <AccountCard
              key={acc.id}
              account={acc}
              isSelected={selectedAccount?.id === acc.id}
              menuOpen={openMenu === acc.id}
              onSelect={() => {
                setSelectedAccount(acc);
                setActiveTab("mesajlar");
                setOpenMenu(null);
              }}
              onMenuToggle={() => setOpenMenu(openMenu === acc.id ? null : acc.id)}
              onDelete={() => void handleDelete(acc.id)}
            />
          ))}
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="border-2 border-dashed border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 text-slate-500 hover:border-green-500/30 hover:text-green-400 transition-all group min-h-[160px]"
          >
            <div className="w-12 h-12 rounded-xl bg-white/[0.04] group-hover:bg-green-500/10 flex items-center justify-center transition-all">
              <Plus className="w-5 h-5" />
            </div>
            <span className="text-sm font-semibold">Yeni Hesap Ekle</span>
          </button>
        </div>
      )}

      {selectedAccount && (
        <div className="bg-[#0a0f1e] border border-white/[0.07] rounded-2xl overflow-hidden">
          <div className="flex items-center gap-4 px-6 py-4 border-b border-white/[0.07]">
            <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-green-400" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-bold truncate">{selectedAccount.displayName}</div>
              <div className="text-xs text-slate-500 truncate">{selectedAccount.phone}</div>
              <div className="text-[10px] text-slate-600 mt-1">
                Token: {selectedAccount.tokenSource === "stored" ? "kayıtlı (hesaba özel)" : "sunucu .env (WHATSAPP_TOKEN)"}
              </div>
            </div>
            <span
              className={`flex-shrink-0 text-[10px] px-2 py-1 rounded-full font-semibold ${
                selectedAccount.status === "active"
                  ? "bg-green-500/15 text-green-400 border border-green-500/20"
                  : "bg-red-500/15 text-red-400 border border-red-500/20"
              }`}
            >
              {selectedAccount.status === "active" ? "● Aktif" : "● Hata"}
            </span>
          </div>

          <div className="flex gap-1 px-4 pt-3 pb-0 border-b border-white/[0.07] overflow-x-auto">
            {[
              { id: "mesajlar" as const, label: "Genel Bakış", icon: Activity },
              { id: "test" as const, label: "Test Gönder", icon: Send },
              { id: "webhook" as const, label: "Webhook", icon: Zap },
              { id: "ayarlar" as const, label: "Ayarlar", icon: Settings },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? "border-green-400 text-green-300"
                    : "border-transparent text-slate-500 hover:text-white"
                }`}
              >
                <tab.icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === "mesajlar" && (
              <div className="space-y-5">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    {
                      label: "Gönderilen (bu kullanıcı, WA)",
                      value:
                        selectedAccount.messagesSent !== null
                          ? selectedAccount.messagesSent.toLocaleString("tr-TR")
                          : outboundTotal.toLocaleString("tr-TR"),
                      sub: selectedAccount.messagesSent === null ? "tüm hatlar toplamı" : undefined,
                      color: "text-green-400",
                    },
                    { label: "Son aktivite", value: selectedAccount.lastActivity, color: "text-blue-400" },
                    { label: "AI yanıtı", value: "Webhook + /api/ai", color: "text-purple-400" },
                    { label: "Webhook", value: "Meta’da ayarla", color: "text-yellow-400" },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-3">
                      <div className={`text-lg font-extrabold ${stat.color}`}>{stat.value}</div>
                      {stat.sub && <div className="text-[10px] text-slate-600 mt-0.5">{stat.sub}</div>}
                      <div className="text-xs text-slate-600 mt-0.5">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-4 flex items-start gap-3">
                  <Bot className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm">AI Ajan</div>
                    <div className="text-xs text-slate-500 mt-1">
                      Gelen mesajlar <code className="text-slate-400">/api/whatsapp/webhook</code> üzerinden işlenir.
                      <code className="text-slate-400"> OPENAI_API_KEY</code> doluysa gerçek model, değilse demo yanıt.
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-500/[0.06] border border-yellow-500/20 rounded-xl p-4 text-xs text-yellow-300">
                  <strong>Webhook:</strong> Meta’da doğrulanmadan gelen mesajlar düşmez. &quot;Webhook&quot; sekmesindeki URL’yi
                  kopyala (localhost için tunnel gerekir).
                </div>
              </div>
            )}

            {activeTab === "test" && (
              <div className="space-y-4 max-w-lg">
                <p className="text-xs text-slate-500">
                  Seçili hat: <strong className="text-slate-300">{selectedAccount.displayName}</strong> — gönderim bu
                  kaydın Phone Number ID ve token kuralına göre yapılır.
                </p>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                    Alıcı telefon (ülke kodu, + veya 0 olmadan)
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text"
                      value={testTo}
                      onChange={(e) => setTestTo(e.target.value)}
                      placeholder="905321234567"
                      className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-green-500/50"
                    />
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    Geliştirme modunda alıcı numarayı Meta’da test alıcısı olarak eklemen gerekir.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Mesaj</label>
                  <textarea
                    value={testMessage}
                    onChange={(e) => setTestMessage(e.target.value)}
                    rows={3}
                    className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-green-500/50 resize-none"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => void handleSendTest()}
                  disabled={!testTo || !testMessage || sendStatus === "sending"}
                  className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 disabled:opacity-50 px-6 py-2.5 rounded-xl text-sm font-bold transition-all"
                >
                  {sendStatus === "sending" ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Gönderiliyor...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Gönder
                    </>
                  )}
                </button>

                {sendResult && (
                  <div
                    className={`rounded-xl p-4 border text-sm ${
                      sendStatus === "success" ? "bg-green-500/10 border-green-500/20" : "bg-red-500/10 border-red-500/20"
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold mb-2">
                      {sendStatus === "success" ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-green-400" />
                          <span className="text-green-300">Gönderildi</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-red-400" />
                          <span className="text-red-300">Hata</span>
                        </>
                      )}
                    </div>
                    <pre className="text-xs text-slate-400 overflow-auto whitespace-pre-wrap">
                      {JSON.stringify(sendResult, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            )}

            {activeTab === "webhook" && (
              <div className="space-y-4 max-w-xl">
                <CopyField label="Callback URL (Meta'ya girilecek)" value={webhookUrl} mono />
                <CopyField label="Verify Token" value="zirve_webhook_secret_2026" mono />

                <div className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-4">
                  <h4 className="font-semibold text-sm mb-3">Adımlar</h4>
                  <ol className="space-y-2 text-sm text-slate-400">
                    {[
                      "developers.facebook.com → Uygulamanı seç",
                      "Sol menü: WhatsApp → Yapılandırma",
                      '"Webhook" bölümünde "Düzenle"',
                      "Callback URL ve Verify Token'ı yapıştır",
                      '"Doğrula ve Kaydet"',
                      '"messages" alanına abone ol',
                    ].map((step, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-5 h-5 bg-indigo-500/20 text-indigo-400 rounded-full text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>

                <a
                  href={devConsoleHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/20 px-4 py-2 rounded-xl text-sm font-semibold text-indigo-300 transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  Meta WhatsApp konsolu
                </a>
              </div>
            )}

            {activeTab === "ayarlar" && (
              <div className="space-y-4 max-w-lg">
                <div className="space-y-1">
                  <div className="text-xs text-slate-500 font-semibold">Phone Number ID</div>
                  <code className="block bg-slate-900 border border-white/[0.07] rounded-xl px-4 py-3 text-sm text-indigo-300 break-all">
                    {selectedAccount.phoneNumberId}
                  </code>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-slate-500 font-semibold">WABA ID</div>
                  <code className="block bg-slate-900 border border-white/[0.07] rounded-xl px-4 py-3 text-sm text-indigo-300 break-all">
                    {selectedAccount.wabaId}
                  </code>
                </div>
                <div className="pt-2 border-t border-white/[0.07]">
                  <button
                    type="button"
                    onClick={() => void handleDelete(selectedAccount.id)}
                    className="flex items-center gap-2 text-red-400 hover:text-red-300 text-sm font-semibold hover:bg-red-500/10 px-3 py-2 rounded-xl transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                    Bu hesabı kaldır
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {showAddModal && (
        <AddAccountModal
          metaAppId={metaAppId}
          onClose={() => setShowAddModal(false)}
          onDone={async () => {
            setShowAddModal(false);
            await loadAccounts();
          }}
        />
      )}
    </div>
  );
}

function AccountCard({
  account,
  isSelected,
  menuOpen,
  onSelect,
  onMenuToggle,
  onDelete,
}: {
  account: WaAccount;
  isSelected: boolean;
  menuOpen: boolean;
  onSelect: () => void;
  onMenuToggle: () => void;
  onDelete: () => void;
}) {
  const msgLabel =
    account.messagesSent !== null ? `${account.messagesSent.toLocaleString("tr-TR")} mesaj` : "çoklu hat";

  return (
    <div
      className={`relative bg-[#0a0f1e] border rounded-2xl p-5 cursor-pointer transition-all ${
        isSelected ? "border-green-500/40 shadow-lg shadow-green-500/5" : "border-white/[0.07] hover:border-white/20"
      }`}
      onClick={onSelect}
    >
      {account.isDefault && (
        <span className="absolute top-3 right-10 text-[10px] bg-green-500/15 text-green-400 border border-green-500/20 px-2 py-0.5 rounded-full font-semibold">
          Varsayılan
        </span>
      )}

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onMenuToggle();
        }}
        className="absolute top-3 right-3 text-slate-600 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-all"
      >
        <MoreVertical className="w-4 h-4" />
      </button>

      {menuOpen && (
        <div
          className="absolute top-10 right-3 z-20 bg-[#0e1628] border border-white/10 rounded-xl shadow-xl py-1 min-w-[140px]"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={onDelete}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Hesabı kaldır
          </button>
        </div>
      )}

      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
          <MessageSquare className="w-5 h-5 text-green-400" />
        </div>
        <div className="min-w-0">
          <div className="font-bold text-sm truncate">{account.displayName}</div>
          <div className="text-xs text-slate-500 truncate">{account.phone}</div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2">
        <span
          className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${
            account.status === "active" ? "bg-green-500/15 text-green-400" : "bg-red-500/15 text-red-400"
          }`}
        >
          {account.status === "active" ? "● Aktif" : "● Hata"}
        </span>
        <span className="text-xs text-slate-600 truncate">{msgLabel}</span>
      </div>
    </div>
  );
}

function CopyField({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    void navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-400 mb-1.5">{label}</label>
      <div className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.1] rounded-xl px-4 py-2.5">
        <code className={`flex-1 break-all text-sm ${mono ? "text-indigo-300" : "text-green-300"}`}>{value}</code>
        <button type="button" onClick={copy} className={`flex-shrink-0 transition-colors ${copied ? "text-green-400" : "text-slate-500 hover:text-white"}`}>
          {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}

function EmptyState({
  envConfigured,
  onAdd,
  onRefresh,
}: {
  envConfigured: boolean;
  onAdd: () => void;
  onRefresh: () => void;
}) {
  return (
    <div className="border-2 border-dashed border-white/10 rounded-2xl p-12 flex flex-col items-center justify-center gap-4 text-center">
      <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center">
        <MessageSquare className="w-8 h-8 text-green-400" />
      </div>
      <div>
        <div className="font-bold text-lg">Kayıtlı WhatsApp hattı yok</div>
        <p className="text-slate-500 text-sm mt-2 max-w-md">
          {envConfigured
            ? "Sunucu .env tanımlı ama veritabanında kayıt oluşmadı. Aşağıdan yenile veya manuel ekle."
            : ".env içinde WHATSAPP_TOKEN ve WHATSAPP_PHONE_NUMBER_ID yoksa otomatik hat da oluşmaz. Önce .env, sonra Yenile veya manuel ekle."}
        </p>
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        <button type="button" onClick={onRefresh} className="px-5 py-2.5 rounded-xl text-sm font-semibold border border-white/10 text-slate-300 hover:bg-white/[0.05]">
          Yenile
        </button>
        <button type="button" onClick={onAdd} className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-2.5 rounded-xl text-sm font-bold">
          <Plus className="w-4 h-4" />
          Hesap ekle
        </button>
      </div>
    </div>
  );
}

function AddAccountModal({
  metaAppId,
  onClose,
  onDone,
}: {
  metaAppId: string;
  onClose: () => void;
  onDone: () => void | Promise<void>;
}) {
  const [step, setStep] = useState<"method" | "manual" | "oauth">("method");
  const [displayName, setDisplayName] = useState("");
  const [phoneNumberId, setPhoneNumberId] = useState("");
  const [wabaId, setWabaId] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const handleManualAdd = async () => {
    if (!displayName.trim() || !phoneNumberId.trim()) return;
    setLoading(true);
    setErr(null);
    try {
      const res = await fetch("/api/whatsapp/accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          displayName: displayName.trim(),
          phoneNumberId: phoneNumberId.trim(),
          wabaId: wabaId.trim() || undefined,
          accessToken: accessToken.trim() || undefined,
        }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error || "Kayıt başarısız");
      await onDone();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Hata");
    } finally {
      setLoading(false);
    }
  };

  const oauthHref = "/api/auth/meta?platform=whatsapp";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-[#0a0f1e] border border-white/10 rounded-2xl w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.07]">
          <h3 className="font-bold">WhatsApp hesabı ekle</h3>
          <button type="button" onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
            <XCircle className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {err && <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2">{err}</div>}

          {step === "method" && (
            <>
              <p className="text-sm text-slate-400">Yöntem seç</p>
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => setStep("oauth")}
                  className="w-full flex items-start gap-4 bg-gradient-to-r from-green-950/60 to-emerald-950/60 hover:from-green-950/80 hover:to-emerald-950/80 border border-green-500/20 rounded-2xl p-4 text-left transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <LogIn className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-green-300">Facebook ile bağlan</div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Sayfa / Instagram kayıtları oluşur. WhatsApp Cloud hattı için ayrıca bu ekrandan Phone Number ID ile manuel eklemen gerekebilir.
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setStep("manual")}
                  className="w-full flex items-start gap-4 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.07] rounded-2xl p-4 text-left transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                    <Settings className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <div className="font-bold text-sm">Manuel (Phone Number ID)</div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      İkinci hat: kendi token’ını girmezsen sunucu .env token’ı kullanılır (aynı token birden fazla hatta çalışmayabilir — o durumda token alanını doldur).
                    </div>
                  </div>
                </button>
              </div>
              {metaAppId && (
                <p className="text-[11px] text-slate-600">
                  App ID (sunucu): <code className="text-slate-400">{metaAppId}</code>
                </p>
              )}
            </>
          )}

          {step === "oauth" && (
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-green-500/20 flex items-center justify-center mx-auto">
                <LogIn className="w-8 h-8 text-green-400" />
              </div>
              <div>
                <div className="font-bold">Facebook OAuth</div>
                <div className="text-xs text-slate-500 mt-1">İzin verdikten sonra Entegrasyonlar sayfasına dönersin; buradan Yenile.</div>
              </div>
              <a
                href={oauthHref}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-3 rounded-xl text-sm font-bold w-full transition-all hover:from-green-500 hover:to-emerald-500"
              >
                <LogIn className="w-4 h-4" />
                Devam et
              </a>
              <button type="button" onClick={() => setStep("method")} className="text-sm text-slate-500 hover:text-white transition-colors">
                ← Geri
              </button>
            </div>
          )}

          {step === "manual" && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Hesap adı</label>
                <input
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Örn: Mağaza WhatsApp"
                  className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Phone Number ID</label>
                <input
                  value={phoneNumberId}
                  onChange={(e) => setPhoneNumberId(e.target.value)}
                  placeholder="Meta → WhatsApp → API Kurulumu"
                  className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">WABA ID (opsiyonel)</label>
                <input
                  value={wabaId}
                  onChange={(e) => setWabaId(e.target.value)}
                  placeholder="Boş bırakılabilir"
                  className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Sistem kullanıcısı token (opsiyonel)</label>
                <textarea
                  value={accessToken}
                  onChange={(e) => setAccessToken(e.target.value)}
                  placeholder="Boş = sunucu WHATSAPP_TOKEN kullanılır"
                  rows={2}
                  className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50 resize-none font-mono text-xs"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep("method")}
                  className="flex-1 py-2.5 border border-white/10 rounded-xl text-sm font-semibold text-slate-400 hover:text-white transition-all"
                >
                  Geri
                </button>
                <button
                  type="button"
                  onClick={() => void handleManualAdd()}
                  disabled={!displayName.trim() || !phoneNumberId.trim() || loading}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 disabled:opacity-50 py-2.5 rounded-xl text-sm font-bold transition-all"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Kaydediliyor
                    </>
                  ) : (
                    "Kaydet"
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
