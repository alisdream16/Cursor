"use client";

import { useState, useEffect } from "react";
import {
  Check,
  Plus,
  Settings,
  ExternalLink,
  Search,
  Zap,
  RefreshCw,
  Trash2,
  Globe,
  MessageSquare,
  BarChart3,
  Users,
  Calendar,
  Webhook,
  LogIn,
  CheckCircle2,
  XCircle,
  Info,
} from "lucide-react";

// Meta OAuth başlatmak için URL
const META_OAUTH_URL = "/api/auth/meta";


type IntegrationStatus = "connected" | "disconnected" | "error";

interface Integration {
  id: string;
  name: string;
  description: string;
  category: string;
  status: IntegrationStatus;
  logo: string;
  color: string;
  authType: "oauth" | "apikey" | "webhook";
  connectedAs?: string;
  lastSync?: string;
  features: string[];
  popular?: boolean;
}

const INTEGRATIONS: Integration[] = [
  // Mesajlaşma
  {
    id: "whatsapp",
    name: "WhatsApp Business",
    description: "Müşterilere WhatsApp üzerinden mesaj gönderin, AI botu kurun, kampanya yapın.",
    category: "Mesajlaşma",
    status: "connected",
    logo: "💬",
    color: "from-green-600 to-emerald-600",
    authType: "oauth",
    connectedAs: "+90 532 *** 4567",
    lastSync: "2 dk önce",
    features: ["Toplu mesaj", "AI chatbot", "Medya gönderimi", "Okundu bilgisi"],
    popular: true,
  },
  {
    id: "instagram",
    name: "Instagram",
    description: "Instagram DM'lerine otomatik yanıt verin ve lead toplayın.",
    category: "Mesajlaşma",
    status: "connected",
    logo: "📸",
    color: "from-purple-600 to-pink-600",
    authType: "oauth",
    connectedAs: "@markaniz",
    lastSync: "5 dk önce",
    features: ["DM otomasyonu", "Yorum yanıtlama", "Lead toplama", "Story takibi"],
    popular: true,
  },
  {
    id: "telegram",
    name: "Telegram",
    description: "Telegram Bot API ile müşterilerinize anlık bildirim ve mesaj gönderin.",
    category: "Mesajlaşma",
    status: "disconnected",
    logo: "✈️",
    color: "from-blue-500 to-cyan-500",
    authType: "apikey",
    features: ["Bot mesajları", "Grup yönetimi", "Medya gönderimi"],
  },
  // E-ticaret
  {
    id: "ebay",
    name: "eBay",
    description: "eBay mağazanızı bağlayın. Sipariş, stok ve müşteri mesajlarını buradan yönetin.",
    category: "E-Ticaret",
    status: "disconnected",
    logo: "🛒",
    color: "from-yellow-500 to-orange-500",
    authType: "oauth",
    features: ["Sipariş takibi", "Stok yönetimi", "Müşteri mesajları", "İade yönetimi", "Satış analitiği"],
    popular: true,
  },
  {
    id: "shopify",
    name: "Shopify",
    description: "Shopify mağazanızdaki siparişler, müşteriler ve ürünleri senkronize edin.",
    category: "E-Ticaret",
    status: "connected",
    logo: "🏪",
    color: "from-green-500 to-teal-500",
    authType: "oauth",
    connectedAs: "magazam.myshopify.com",
    lastSync: "15 dk önce",
    features: ["Sipariş senkronizasyonu", "Müşteri CRM", "Terk sepet otomasyonu", "Ürün senkronizasyonu"],
    popular: true,
  },
  {
    id: "trendyol",
    name: "Trendyol",
    description: "Trendyol mağazanızdaki siparişler ve müşteri mesajlarını yönetin.",
    category: "E-Ticaret",
    status: "disconnected",
    logo: "🧡",
    color: "from-orange-500 to-red-500",
    authType: "apikey",
    features: ["Sipariş yönetimi", "Müşteri mesajları", "İade takibi", "Kargo bilgisi"],
    popular: true,
  },
  {
    id: "hepsiburada",
    name: "Hepsiburada",
    description: "Hepsiburada siparişlerini ve müşteri sorularını ZIRVE'den takip edin.",
    category: "E-Ticaret",
    status: "disconnected",
    logo: "🔶",
    color: "from-orange-400 to-yellow-500",
    authType: "apikey",
    features: ["Sipariş takibi", "Mesaj yönetimi", "Stok güncelleme"],
  },
  // Proje / İş Araçları
  {
    id: "miro",
    name: "Miro",
    description: "Miro board'larınızı projelerinize bağlayın, müşterilerle paylaşın.",
    category: "Proje Araçları",
    status: "disconnected",
    logo: "🎯",
    color: "from-yellow-400 to-orange-400",
    authType: "oauth",
    features: ["Board paylaşımı", "Proje görünümü", "Görev takibi"],
  },
  {
    id: "notion",
    name: "Notion",
    description: "Notion veritabanınızı CRM ile senkronize edin.",
    category: "Proje Araçları",
    status: "disconnected",
    logo: "📝",
    color: "from-slate-700 to-slate-600",
    authType: "oauth",
    features: ["Veri senkronizasyonu", "CRM entegrasyonu", "Görev bağlama"],
  },
  {
    id: "slack",
    name: "Slack",
    description: "Yeni lead ve satış bildirimlerini Slack kanalınıza gönderin.",
    category: "Proje Araçları",
    status: "connected",
    logo: "💼",
    color: "from-violet-600 to-purple-600",
    authType: "oauth",
    connectedAs: "#satis-bildirimleri",
    lastSync: "Anlık",
    features: ["Anlık bildirimler", "Komut entegrasyonu", "Kanal mesajları"],
  },
  // Ödeme
  {
    id: "iyzico",
    name: "İyzico",
    description: "Türkiye'nin ödeme altyapısı ile tahsilat yapın.",
    category: "Ödeme",
    status: "connected",
    logo: "💳",
    color: "from-blue-600 to-indigo-600",
    authType: "apikey",
    connectedAs: "Test Modu",
    lastSync: "Aktif",
    features: ["Taksitli ödeme", "3D Secure", "İade yönetimi", "Fatura"],
    popular: true,
  },
  {
    id: "stripe",
    name: "Stripe",
    description: "Global ödeme altyapısı. Kart, Apple Pay, Google Pay kabul edin.",
    category: "Ödeme",
    status: "disconnected",
    logo: "⚡",
    color: "from-indigo-600 to-purple-600",
    authType: "apikey",
    features: ["Kart ödemeleri", "Abonelik yönetimi", "Fatura otomasyonu"],
  },
  // Email & Pazarlama
  {
    id: "google-ads",
    name: "Google Ads",
    description: "Google reklam dönüşümlerini CRM'e otomatik çekin.",
    category: "Pazarlama",
    status: "disconnected",
    logo: "🔍",
    color: "from-blue-500 to-green-500",
    authType: "oauth",
    features: ["Dönüşüm takibi", "Kitle senkronizasyonu", "Reklam analitiği"],
    popular: true,
  },
  {
    id: "meta-ads",
    name: "Meta Ads",
    description: "Facebook ve Instagram reklam lead'lerini anında CRM'e aktarın.",
    category: "Pazarlama",
    status: "connected",
    logo: "👥",
    color: "from-blue-600 to-indigo-600",
    authType: "oauth",
    connectedAs: "Marka Sayfanız",
    lastSync: "Anlık",
    features: ["Lead Form entegrasyonu", "Custom Audience", "Piksel", "Retargeting"],
    popular: true,
  },
  // Takvim & Video
  {
    id: "google-calendar",
    name: "Google Takvim",
    description: "Randevularınız otomatik Google Takvim'e eklensin.",
    category: "Takvim",
    status: "connected",
    logo: "📅",
    color: "from-blue-400 to-cyan-500",
    authType: "oauth",
    connectedAs: "ahmet@gmail.com",
    lastSync: "Anlık",
    features: ["Çift yönlü senkronizasyon", "Otomatik hatırlatma", "Zoom linki ekleme"],
  },
  {
    id: "zoom",
    name: "Zoom",
    description: "Randevu oluşturulduğunda otomatik Zoom toplantısı açın.",
    category: "Video",
    status: "disconnected",
    logo: "📹",
    color: "from-blue-500 to-blue-600",
    authType: "oauth",
    features: ["Otomatik toplantı", "Kayıt yönetimi", "Katılımcı takibi"],
  },
  // Webhook & API
  {
    id: "zapier",
    name: "Zapier",
    description: "5000+ uygulamayı Zapier üzerinden ZIRVE'ye bağlayın.",
    category: "Otomasyon",
    status: "disconnected",
    logo: "⚡",
    color: "from-orange-500 to-yellow-500",
    authType: "apikey",
    features: ["5000+ uygulama", "Tetikleyici & eylem", "Veri dönüşümü"],
  },
  {
    id: "webhook",
    name: "Özel Webhook",
    description: "Kendi sisteminizden ZIRVE'ye veri gönderin veya alın.",
    category: "Geliştirici",
    status: "disconnected",
    logo: "🔗",
    color: "from-slate-600 to-slate-500",
    authType: "webhook",
    features: ["Gelen webhook", "Giden webhook", "İmza doğrulama", "Yeniden deneme"],
  },
];

const CATEGORIES = [
  "Tümü",
  "Mesajlaşma",
  "E-Ticaret",
  "Pazarlama",
  "Ödeme",
  "Proje Araçları",
  "Takvim",
  "Video",
  "Otomasyon",
  "Geliştirici",
];

const STATUS_LABELS: Record<IntegrationStatus, { label: string; color: string; dot: string }> = {
  connected: { label: "Bağlı", color: "bg-green-500/15 text-green-400 border border-green-500/20", dot: "bg-green-400" },
  disconnected: { label: "Bağlı Değil", color: "bg-white/5 text-slate-500 border border-white/10", dot: "bg-slate-600" },
  error: { label: "Hata", color: "bg-red-500/15 text-red-400 border border-red-500/20", dot: "bg-red-400" },
};

const AUTH_LABELS: Record<string, { label: string; desc: string }> = {
  oauth: { label: "1 Tıkla Bağlan", desc: "Hesabınızla giriş yapmanız yeterli" },
  apikey: { label: "API Key ile Bağlan", desc: "API anahtarınızı girin" },
  webhook: { label: "Webhook URL", desc: "Sisteminize URL ekleyin" },
};

export default function EntegrasyonlarPage() {
  const [activeCategory, setActiveCategory] = useState("Tümü");
  const [search, setSearch] = useState("");
  const [integrations, setIntegrations] = useState(INTEGRATIONS);
  const [connectingId, setConnectingId] = useState<string | null>(null);
  const [oauthSuccess, setOauthSuccess] = useState(false);

  // OAuth callback sonucunu kontrol et
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("success") === "true") {
      const pages = params.get("pages");
      setOauthSuccess(true);
      // Meta entegrasyonlarını bağlı olarak işaretle
      setIntegrations((prev) =>
        prev.map((i) =>
          ["whatsapp", "instagram", "meta-ads"].includes(i.id)
            ? { ...i, status: "connected" as IntegrationStatus, connectedAs: "Hesabın bağlandı", lastSync: "Az önce" }
            : i
        )
      );
      // URL'yi temizle
      window.history.replaceState({}, "", "/dashboard/entegrasyonlar");
    }
  }, []);

  const handleConnect = (integration: Integration) => {
    // Meta ürünleri için OAuth flow başlat
    if (["whatsapp", "instagram", "meta-ads"].includes(integration.id) && integration.authType === "oauth") {
      window.location.href = `${META_OAUTH_URL}?platform=${integration.id}`;
      return;
    }

    // Diğerleri için simüle et
    setConnectingId(integration.id);
    setTimeout(() => {
      setIntegrations((prev) =>
        prev.map((i) =>
          i.id === integration.id
            ? { ...i, status: "connected" as IntegrationStatus, connectedAs: "Bağlantı kuruldu", lastSync: "Az önce" }
            : i
        )
      );
      setConnectingId(null);
    }, 2000);
  };

  const handleDisconnect = (id: string) => {
    setIntegrations((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, status: "disconnected" as IntegrationStatus, connectedAs: undefined, lastSync: undefined } : i
      )
    );
  };

  const filtered = integrations.filter((i: Integration) => {
    const matchCat = activeCategory === "Tümü" || i.category === activeCategory;
    const matchSearch =
      search === "" ||
      i.name.toLowerCase().includes(search.toLowerCase()) ||
      i.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const connectedCount = integrations.filter((i: Integration) => i.status === "connected").length;

  return (
    <div className="space-y-6 max-w-[1400px]">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold">Entegrasyonlar</h1>
        <p className="text-slate-500 text-sm mt-1">
          {connectedCount} aktif bağlantı · Tek tıkla bağlan, hepsini buradan yönet
        </p>
      </div>

      {/* OAuth Başarı Banner */}
      {oauthSuccess && (
        <div className="bg-green-950/60 border border-green-500/30 rounded-2xl p-4 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
          <div>
            <div className="font-bold text-green-300 text-sm">Hesabın başarıyla bağlandı! 🎉</div>
            <div className="text-green-600 text-xs">WhatsApp, Instagram ve Facebook sayfaların otomatik olarak ZIRVE&apos;ye eklendi.</div>
          </div>
          <button onClick={() => setOauthSuccess(false)} className="ml-auto text-green-600 hover:text-green-400">
            <XCircle className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Info banner */}
      <div className="bg-gradient-to-r from-indigo-950/70 to-purple-950/50 border border-indigo-500/20 rounded-2xl p-5">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
            <Info className="w-5 h-5 text-indigo-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold mb-2">Kullanıcıların Kendi Hesabını Nasıl Bağlar?</h3>
            <div className="grid sm:grid-cols-3 gap-3 text-sm">
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-[10px] flex items-center justify-center font-bold flex-shrink-0 mt-0.5">1</span>
                <span className="text-slate-400">&quot;1 Tıkla Bağlan&quot; butonuna tıkla</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-[10px] flex items-center justify-center font-bold flex-shrink-0 mt-0.5">2</span>
                <span className="text-slate-400">Facebook/Meta hesabına giriş yap, izin ver</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-[10px] flex items-center justify-center font-bold flex-shrink-0 mt-0.5">3</span>
                <span className="text-slate-400">WhatsApp + Instagram + Facebook otomatik bağlanır ✅</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Aktif Bağlantı", value: connectedCount.toString(), icon: Check, color: "text-green-400", bg: "bg-green-500/10" },
          { label: "Kullanılabilir", value: INTEGRATIONS.length.toString(), icon: Globe, color: "text-blue-400", bg: "bg-blue-500/10" },
          { label: "Bu Ay Senkronizasyon", value: "12.4k", icon: RefreshCw, color: "text-indigo-400", bg: "bg-indigo-500/10" },
          { label: "Otomasyon Tetiklendi", value: "342", icon: Zap, color: "text-yellow-400", bg: "bg-yellow-500/10" },
        ].map((stat) => (
          <div key={stat.label} className="bg-[#0a0f1e] border border-white/10 rounded-2xl p-5">
            <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center mb-3`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div className="text-2xl font-extrabold">{stat.value}</div>
            <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Search + filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Entegrasyon ara... (WhatsApp, eBay, Shopify...)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0a0f1e] border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/40"
          />
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 flex-wrap">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeCategory === cat
                ? "bg-indigo-600 text-white"
                : "bg-white/[0.04] text-slate-400 hover:bg-white/[0.08] hover:text-white border border-white/[0.07]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Connected first, then available */}
      {["Bağlı Entegrasyonlar", "Kullanılabilir Entegrasyonlar"].map((groupLabel) => {
        const isConnected = groupLabel === "Bağlı Entegrasyonlar";
        const group = filtered.filter((i: Integration) =>
          isConnected ? i.status === "connected" : i.status !== "connected"
        );
        if (group.length === 0) return null;
        return (
          <div key={groupLabel}>
            <h3 className="font-bold text-sm text-slate-400 mb-3 flex items-center gap-2">
              {isConnected ? (
                <span className="w-2 h-2 bg-green-400 rounded-full inline-block" />
              ) : (
                <span className="w-2 h-2 bg-slate-600 rounded-full inline-block" />
              )}
              {groupLabel} ({group.length})
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {group.map((integration: Integration) => {
                const statusConf = STATUS_LABELS[integration.status];
                const authConf = AUTH_LABELS[integration.authType];
                const isConnecting = connectingId === integration.id;
                return (
                  <div
                    key={integration.id}
                    className={`relative bg-[#0a0f1e] border rounded-2xl p-5 transition-all hover:border-white/20 flex flex-col gap-4 ${
                      integration.status === "connected"
                        ? "border-green-500/20"
                        : "border-white/[0.07]"
                    }`}
                  >
                    {integration.popular && integration.status !== "connected" && (
                      <span className="absolute top-3 right-3 text-[10px] bg-indigo-500/20 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded-full font-semibold">
                        Popüler
                      </span>
                    )}

                    {/* Logo + name */}
                    <div className="flex items-start gap-3">
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${integration.color} flex items-center justify-center text-2xl flex-shrink-0 shadow-lg`}>
                        {integration.logo}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-sm">{integration.name}</div>
                        <span className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full mt-1 ${statusConf.color}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${statusConf.dot}`} />
                          {statusConf.label}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed flex-1">
                      {integration.description}
                    </p>

                    {/* Connected info */}
                    {integration.status === "connected" && integration.connectedAs && (
                      <div className="bg-green-500/[0.08] border border-green-500/20 rounded-xl px-3 py-2 text-xs">
                        <div className="text-green-400 font-semibold">{integration.connectedAs}</div>
                        {integration.lastSync && (
                          <div className="text-slate-500">Son senkronizasyon: {integration.lastSync}</div>
                        )}
                      </div>
                    )}

                    {/* Features */}
                    <div className="flex flex-wrap gap-1.5">
                      {integration.features.slice(0, 3).map((f: string) => (
                        <span key={f} className="bg-white/[0.04] border border-white/[0.07] text-[10px] text-slate-500 px-2 py-0.5 rounded-lg">
                          {f}
                        </span>
                      ))}
                      {integration.features.length > 3 && (
                        <span className="text-[10px] text-slate-600">+{integration.features.length - 3}</span>
                      )}
                    </div>

                    {/* Auth type hint */}
                    {integration.status !== "connected" && (
                      <div className="text-[11px] text-slate-600 flex items-center gap-1.5">
                        <Zap className="w-3 h-3" />
                        {authConf.label} — {authConf.desc}
                      </div>
                    )}

                    {/* Action buttons */}
                    <div className="flex gap-2 mt-auto">
                      {integration.status === "connected" ? (
                        <>
                          <button className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.07] rounded-xl text-xs font-semibold text-slate-300 transition-all">
                            <Settings className="w-3.5 h-3.5" />
                            Ayarlar
                          </button>
                          <button
                            onClick={() => handleDisconnect(integration.id)}
                            className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          <button className="p-2 text-slate-500 hover:text-blue-400 hover:bg-blue-500/10 rounded-xl transition-all">
                            <RefreshCw className="w-3.5 h-3.5" />
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleConnect(integration)}
                          disabled={isConnecting}
                          className={`flex-1 flex items-center justify-center gap-2 py-2.5 disabled:opacity-70 disabled:cursor-not-allowed rounded-xl text-sm font-bold transition-all ${
                            integration.authType === "oauth"
                              ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-md shadow-indigo-500/20"
                              : "bg-white/[0.06] hover:bg-white/[0.10] border border-white/10"
                          }`}
                        >
                          {isConnecting ? (
                            <>
                              <RefreshCw className="w-4 h-4 animate-spin" />
                              Yönlendiriliyor...
                            </>
                          ) : integration.authType === "oauth" ? (
                            <>
                              <LogIn className="w-4 h-4" />
                              1 Tıkla Bağlan
                            </>
                          ) : (
                            <>
                              <Plus className="w-4 h-4" />
                              Bağlan
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Custom webhook section */}
      <div className="bg-[#0a0f1e] border border-white/[0.07] rounded-2xl p-6">
        <div className="flex items-start gap-4 mb-5">
          <div className="w-10 h-10 rounded-xl bg-slate-500/20 flex items-center justify-center flex-shrink-0">
            <Webhook className="w-5 h-5 text-slate-400" />
          </div>
          <div>
            <h3 className="font-bold">Özel Entegrasyon & Webhook</h3>
            <p className="text-slate-400 text-sm mt-1">
              Listede olmayan bir uygulama mı var? Webhook veya API ile saniyeler içinde bağlayın.
            </p>
          </div>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            {
              title: "Gelen Webhook",
              desc: "Herhangi bir sistemden ZIRVE'ye veri gönderin",
              color: "from-blue-600 to-indigo-600",
              example: "POST https://api.zirve.app/webhook/abc123",
            },
            {
              title: "Giden Webhook",
              desc: "ZIRVE'den kendi sisteminize anlık bildirim alın",
              color: "from-purple-600 to-violet-600",
              example: "Her yeni lead'de POST isteği gönderir",
            },
            {
              title: "REST API",
              desc: "Full API erişimi ile istediğinizi entegre edin",
              color: "from-emerald-600 to-teal-600",
              example: "API Dokümantasyonuna erişin",
            },
          ].map((item) => (
            <div key={item.title} className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-4">
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center mb-3`}>
                <Webhook className="w-4 h-4 text-white" />
              </div>
              <div className="font-semibold text-sm mb-1">{item.title}</div>
              <p className="text-xs text-slate-500 mb-3">{item.desc}</p>
              <code className="text-[10px] text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded-lg block truncate">
                {item.example}
              </code>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
