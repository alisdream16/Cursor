"use client";

import { useState } from "react";
import {
  Workflow,
  Plus,
  Play,
  Pause,
  Copy,
  Trash2,
  Settings,
  Zap,
  Mail,
  MessageSquare,
  Clock,
  Users,
  Globe,
  Bot,
  ChevronRight,
  BarChart3,
  Check,
  Filter,
  Search,
  Phone,
  Tag,
  Calendar,
  ArrowRight,
  GitBranch,
} from "lucide-react";

const AUTOMATIONS = [
  {
    id: 1,
    name: "Yeni Lead Karşılama",
    description: "Form doldurulduğunda otomatik WhatsApp + e-posta gönder",
    trigger: "Form Dolduruldu",
    triggerIcon: <Globe className="w-4 h-4" />,
    actions: ["WhatsApp Gönder", "E-posta Gönder", "CRM'e Ekle"],
    status: "active",
    runs: 342,
    lastRun: "2 dk önce",
    successRate: 98,
  },
  {
    id: 2,
    name: "Randevu Hatırlatıcısı",
    description: "Randevudan 1 gün ve 1 saat önce SMS + WhatsApp gönder",
    trigger: "Randevu Oluşturuldu",
    triggerIcon: <Calendar className="w-4 h-4" />,
    actions: ["SMS Gönder (1 gün önce)", "WhatsApp (1 sa önce)"],
    status: "active",
    runs: 187,
    lastRun: "45 dk önce",
    successRate: 100,
  },
  {
    id: 3,
    name: "Sıcak Lead Takibi",
    description: "5 gün hareketsiz kalırsa otomatik takip mesajı gönder",
    trigger: "5 Gün Hareketsiz",
    triggerIcon: <Clock className="w-4 h-4" />,
    actions: ["E-posta Gönder", "Göreve Ekle", "Bildirim Gönder"],
    status: "active",
    runs: 94,
    lastRun: "3 sa önce",
    successRate: 87,
  },
  {
    id: 4,
    name: "Satış Sonrası Memnuniyet",
    description: "Satış kapandıktan 3 gün sonra yorum ve referans iste",
    trigger: "Satış Kapandı",
    triggerIcon: <Check className="w-4 h-4" />,
    actions: ["E-posta Gönder", "Referans Formu Gönder"],
    status: "paused",
    runs: 56,
    lastRun: "2 gün önce",
    successRate: 92,
  },
  {
    id: 5,
    name: "Doğum Günü Kampanyası",
    description: "Müşteri doğum gününde özel teklif gönder",
    trigger: "Doğum Günü",
    triggerIcon: <Tag className="w-4 h-4" />,
    actions: ["WhatsApp Gönder", "Özel Teklif Kodu Ekle"],
    status: "active",
    runs: 23,
    lastRun: "1 gün önce",
    successRate: 100,
  },
];

const WORKFLOW_STEPS = [
  { id: 1, type: "trigger", label: "Tetikleyici", detail: "Form Dolduruldu", icon: <Zap className="w-5 h-5" />, color: "from-yellow-500 to-orange-500" },
  { id: 2, type: "delay", label: "Bekle", detail: "5 dakika", icon: <Clock className="w-5 h-5" />, color: "from-slate-600 to-slate-500" },
  { id: 3, type: "action", label: "WhatsApp Gönder", detail: "Karşılama mesajı", icon: <MessageSquare className="w-5 h-5" />, color: "from-green-500 to-emerald-500" },
  { id: 4, type: "action", label: "E-posta Gönder", detail: "Hoş geldin maili", icon: <Mail className="w-5 h-5" />, color: "from-blue-500 to-cyan-500" },
  { id: 5, type: "action", label: "CRM'e Ekle", detail: "Yeni Lead olarak", icon: <Users className="w-5 h-5" />, color: "from-purple-500 to-violet-500" },
  { id: 6, type: "condition", label: "Koşul", detail: "WhatsApp açıldı mı?", icon: <GitBranch className="w-5 h-5" />, color: "from-indigo-500 to-purple-500" },
];

export default function OtomasyonPage() {
  const [search, setSearch] = useState("");

  const filtered = AUTOMATIONS.filter(
    (a) =>
      search === "" ||
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-[1400px]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold">Otomasyon & Workflow</h1>
          <p className="text-slate-500 text-sm mt-1">
            5 aktif otomasyon · Bu ay 702 işlem · %96 başarı oranı
          </p>
        </div>
        <button className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-indigo-500/20">
          <Plus className="w-4 h-4" />
          Yeni Otomasyon
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Aktif Otomasyon", value: "5", icon: Workflow, color: "text-indigo-400", bg: "bg-indigo-500/10" },
          { label: "Bu Ay Çalıştı", value: "702", icon: Zap, color: "text-yellow-400", bg: "bg-yellow-500/10" },
          { label: "Başarı Oranı", value: "%96", icon: Check, color: "text-green-400", bg: "bg-green-500/10" },
          { label: "Tasarruf", value: "42 sa", icon: Clock, color: "text-blue-400", bg: "bg-blue-500/10" },
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

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Automation list */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Otomasyon ara..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#0a0f1e] border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50"
              />
            </div>
          </div>

          {filtered.map((auto) => (
            <div
              key={auto.id}
              className="bg-[#0a0f1e] border border-white/10 hover:border-white/20 rounded-2xl p-5 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`w-2 h-2 rounded-full ${auto.status === "active" ? "bg-green-400" : "bg-slate-500"}`}
                    />
                    <span className="font-bold">{auto.name}</span>
                  </div>
                  <p className="text-sm text-slate-400">{auto.description}</p>
                </div>
                <span
                  className={`text-xs px-2.5 py-1 rounded-full font-semibold ml-3 flex-shrink-0 ${
                    auto.status === "active"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-slate-500/20 text-slate-400"
                  }`}
                >
                  {auto.status === "active" ? "Aktif" : "Durduruldu"}
                </span>
              </div>

              {/* Trigger + actions flow */}
              <div className="flex items-center gap-2 flex-wrap mb-4">
                <div className="flex items-center gap-1.5 bg-yellow-500/10 border border-yellow-500/20 px-3 py-1.5 rounded-lg text-xs">
                  {auto.triggerIcon}
                  <span className="text-yellow-300">{auto.trigger}</span>
                </div>
                {auto.actions.map((action, idx) => (
                  <div key={idx} className="flex items-center gap-1">
                    <ChevronRight className="w-3 h-3 text-slate-600" />
                    <div className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-xs text-slate-400">
                      {action}
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between">
                <div className="flex gap-4 text-xs text-slate-500">
                  <span>{auto.runs} çalışma</span>
                  <span>%{auto.successRate} başarı</span>
                  <span>Son: {auto.lastRun}</span>
                </div>
                <div className="flex gap-1.5">
                  <button className="p-1.5 text-slate-500 hover:text-white hover:bg-white/10 rounded-lg transition-all">
                    <BarChart3 className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1.5 text-slate-500 hover:text-white hover:bg-white/10 rounded-lg transition-all">
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1.5 text-slate-500 hover:text-white hover:bg-white/10 rounded-lg transition-all">
                    <Settings className="w-3.5 h-3.5" />
                  </button>
                  <button
                    className={`p-1.5 rounded-lg transition-all ${
                      auto.status === "active"
                        ? "text-red-400 hover:bg-red-500/10"
                        : "text-green-400 hover:bg-green-500/10"
                    }`}
                  >
                    {auto.status === "active" ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Workflow preview */}
        <div className="bg-[#0a0f1e] border border-white/10 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold">Workflow Önizleme</h3>
            <span className="text-xs text-slate-500">Yeni Lead Karşılama</span>
          </div>

          <div className="space-y-2">
            {WORKFLOW_STEPS.map((step, idx) => (
              <div key={step.id}>
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center flex-shrink-0 shadow-md`}
                  >
                    {step.icon}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold">{step.label}</div>
                    <div className="text-xs text-slate-500">{step.detail}</div>
                  </div>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full ${
                      step.type === "trigger"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : step.type === "condition"
                        ? "bg-purple-500/20 text-purple-400"
                        : step.type === "delay"
                        ? "bg-slate-500/20 text-slate-400"
                        : "bg-blue-500/20 text-blue-400"
                    }`}
                  >
                    {step.type === "trigger" ? "Tetik" : step.type === "condition" ? "Koşul" : step.type === "delay" ? "Bekle" : "Eylem"}
                  </span>
                </div>
                {idx < WORKFLOW_STEPS.length - 1 && (
                  <div className="ml-5 w-0.5 h-3 bg-white/10" />
                )}
              </div>
            ))}
          </div>

          <button className="w-full mt-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600/20 to-purple-600/20 hover:from-indigo-600/30 hover:to-purple-600/30 border border-indigo-500/20 text-sm font-semibold text-indigo-300 transition-all flex items-center justify-center gap-2">
            <Settings className="w-4 h-4" />
            Düzenle
          </button>
        </div>
      </div>
    </div>
  );
}
