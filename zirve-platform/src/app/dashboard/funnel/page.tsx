"use client";

import { useState } from "react";
import {
  Globe,
  Plus,
  Eye,
  Edit,
  Copy,
  Trash2,
  ExternalLink,
  BarChart3,
  TrendingUp,
  Users,
  MousePointer,
  DollarSign,
  Star,
  Smartphone,
  Monitor,
  Layers,
  ChevronRight,
  Check,
  ArrowRight,
} from "lucide-react";

const FUNNELS = [
  {
    id: 1,
    name: "Büyüme Paketi Satış Funnel'ı",
    type: "Satış Funneli",
    steps: 4,
    status: "active",
    visits: 1240,
    conversions: 87,
    convRate: "7.0%",
    revenue: "₺213.300",
    lastEdit: "2 gün önce",
    thumbnail: "from-indigo-600 to-purple-600",
  },
  {
    id: 2,
    name: "Lead Mıknatısı — Ücretsiz Rehber",
    type: "Lead Funnel",
    steps: 3,
    status: "active",
    visits: 3420,
    conversions: 412,
    convRate: "12.0%",
    revenue: "—",
    lastEdit: "5 gün önce",
    thumbnail: "from-emerald-600 to-teal-600",
  },
  {
    id: 3,
    name: "Webinar Kayıt Sayfası",
    type: "Etkinlik",
    steps: 2,
    status: "active",
    visits: 892,
    conversions: 234,
    convRate: "26.2%",
    revenue: "—",
    lastEdit: "1 hafta önce",
    thumbnail: "from-blue-600 to-cyan-600",
  },
  {
    id: 4,
    name: "Ana Web Sitesi",
    type: "Web Sitesi",
    steps: 8,
    status: "draft",
    visits: 0,
    conversions: 0,
    convRate: "—",
    revenue: "—",
    lastEdit: "Bugün",
    thumbnail: "from-orange-600 to-red-600",
  },
];

const TEMPLATES = [
  { name: "SaaS Ürün Landing", category: "Satış", color: "from-indigo-500 to-purple-500" },
  { name: "Danışmanlık Randevu", category: "Hizmet", color: "from-blue-500 to-cyan-500" },
  { name: "E-Kitap Lead Magnet", category: "Lead", color: "from-emerald-500 to-teal-500" },
  { name: "Kurs Satış Sayfası", category: "Eğitim", color: "from-yellow-500 to-orange-500" },
  { name: "Ajans Portfolio", category: "Web", color: "from-pink-500 to-rose-500" },
  { name: "Restaurant Menü", category: "Restoran", color: "from-orange-500 to-red-500" },
];

export default function FunnelPage() {
  const [view, setView] = useState<"funnels" | "websites">("funnels");

  return (
    <div className="space-y-6 max-w-[1400px]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold">Funnel & Web Sitesi</h1>
          <p className="text-slate-500 text-sm mt-1">
            4 sayfa · Bu ay 5.552 ziyaret · 733 dönüşüm
          </p>
        </div>
        <div className="flex gap-2">
          <div className="flex bg-white/5 border border-white/10 rounded-xl p-1">
            <button
              onClick={() => setView("funnels")}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${view === "funnels" ? "bg-indigo-600 text-white" : "text-slate-400"}`}
            >
              Funnel'lar
            </button>
            <button
              onClick={() => setView("websites")}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${view === "websites" ? "bg-indigo-600 text-white" : "text-slate-400"}`}
            >
              Web Siteleri
            </button>
          </div>
          <button className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-indigo-500/20">
            <Plus className="w-4 h-4" />
            Yeni Oluştur
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Bu Ay Ziyaret", value: "5.552", icon: Eye, color: "text-blue-400", bg: "bg-blue-500/10", change: "+18%" },
          { label: "Dönüşüm", value: "733", icon: MousePointer, color: "text-green-400", bg: "bg-green-500/10", change: "+24%" },
          { label: "Ort. Dönüşüm Oranı", value: "%13.2", icon: TrendingUp, color: "text-indigo-400", bg: "bg-indigo-500/10", change: "+3.1%" },
          { label: "Oluşturulan Gelir", value: "₺213k", icon: DollarSign, color: "text-yellow-400", bg: "bg-yellow-500/10", change: "+42%" },
        ].map((stat) => (
          <div key={stat.label} className="bg-[#0a0f1e] border border-white/10 rounded-2xl p-5">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <span className="text-xs font-semibold bg-green-500/10 text-green-400 px-2 py-0.5 rounded-lg">{stat.change}</span>
            </div>
            <div className="text-2xl font-extrabold">{stat.value}</div>
            <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Funnels grid */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* New funnel button */}
        <button className="group h-64 border-2 border-dashed border-white/10 hover:border-indigo-500/50 rounded-2xl flex flex-col items-center justify-center gap-3 transition-all hover:bg-indigo-500/5">
          <div className="w-14 h-14 rounded-2xl bg-white/5 group-hover:bg-indigo-500/20 flex items-center justify-center transition-all">
            <Plus className="w-7 h-7 text-slate-400 group-hover:text-indigo-400 transition-colors" />
          </div>
          <span className="text-sm text-slate-400 group-hover:text-white transition-colors font-medium">Yeni Oluştur</span>
          <span className="text-xs text-slate-600">Şablondan veya sıfırdan</span>
        </button>

        {FUNNELS.map((funnel) => (
          <div
            key={funnel.id}
            className="bg-[#0a0f1e] border border-white/10 hover:border-white/20 rounded-2xl overflow-hidden transition-all group"
          >
            {/* Thumbnail */}
            <div className={`h-32 bg-gradient-to-br ${funnel.thumbnail} relative overflow-hidden`}>
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <Layers className="w-20 h-20" />
              </div>
              <div className="absolute top-3 right-3 flex gap-1.5">
                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${funnel.status === "active" ? "bg-green-500/80 text-white" : "bg-slate-700/80 text-slate-300"}`}>
                  {funnel.status === "active" ? "Yayında" : "Taslak"}
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                <div className="text-xs text-white/70">{funnel.type} · {funnel.steps} adım</div>
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-bold text-sm mb-1 truncate">{funnel.name}</h3>
              <p className="text-xs text-slate-500 mb-3">Son düzenleme: {funnel.lastEdit}</p>

              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  { label: "Ziyaret", value: funnel.visits.toLocaleString() },
                  { label: "Dönüşüm", value: funnel.conversions },
                  { label: "Oran", value: funnel.convRate },
                ].map((s) => (
                  <div key={s.label} className="bg-white/5 rounded-lg p-2 text-center">
                    <div className="font-bold text-xs">{s.value}</div>
                    <div className="text-[10px] text-slate-600">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex gap-1.5">
                <button className="flex-1 flex items-center justify-center gap-1 py-2 bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/20 rounded-xl text-xs font-semibold text-indigo-300 transition-all">
                  <Edit className="w-3 h-3" />
                  Düzenle
                </button>
                <button className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-all">
                  <Eye className="w-3.5 h-3.5 text-slate-400" />
                </button>
                <button className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-all">
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                </button>
                <button className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-all">
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Templates */}
      <div className="bg-[#0a0f1e] border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-bold text-lg">Hazır Şablonlar</h3>
            <p className="text-slate-500 text-sm">50+ profesyonel şablon, dakikalar içinde hazır</p>
          </div>
          <button className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors">
            Tümünü gör <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {TEMPLATES.map((tmpl) => (
            <button
              key={tmpl.name}
              className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl p-4 text-left transition-all"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tmpl.color} mb-3 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <Globe className="w-5 h-5 text-white" />
              </div>
              <div className="text-xs font-semibold mb-0.5">{tmpl.name}</div>
              <div className="text-[10px] text-slate-500">{tmpl.category}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
