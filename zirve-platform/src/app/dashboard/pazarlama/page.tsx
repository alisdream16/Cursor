"use client";

import { useState } from "react";
import {
  Mail,
  MessageSquare,
  Phone,
  Plus,
  Send,
  Users,
  BarChart3,
  TrendingUp,
  Eye,
  MousePointer,
  Calendar,
  Clock,
  ChevronRight,
  Play,
  Pause,
  Copy,
  Edit,
  Star,
  Filter,
} from "lucide-react";

const CAMPAIGNS = [
  {
    id: 1,
    name: "Mayıs Özel Kampanyası",
    type: "email",
    status: "active",
    sent: 1240,
    opened: 487,
    clicked: 124,
    openRate: "39.3%",
    clickRate: "10.0%",
    date: "1 Mayıs 2026",
  },
  {
    id: 2,
    name: "WhatsApp Yeni Ürün Duyurusu",
    type: "whatsapp",
    status: "sent",
    sent: 834,
    opened: 792,
    clicked: 301,
    openRate: "95.0%",
    clickRate: "36.1%",
    date: "28 Nisan 2026",
  },
  {
    id: 3,
    name: "SMS Flash Satış",
    type: "sms",
    status: "sent",
    sent: 512,
    opened: 487,
    clicked: 98,
    openRate: "95.1%",
    clickRate: "19.1%",
    date: "25 Nisan 2026",
  },
  {
    id: 4,
    name: "Haziran Kampanyası",
    type: "email",
    status: "draft",
    sent: 0,
    opened: 0,
    clicked: 0,
    openRate: "—",
    clickRate: "—",
    date: "Hazırlanıyor",
  },
];

const TYPE_CONFIG: Record<string, { icon: React.ReactNode; label: string; color: string; bg: string }> = {
  email: { icon: <Mail className="w-4 h-4" />, label: "E-posta", color: "text-blue-400", bg: "bg-blue-500/10" },
  whatsapp: { icon: <MessageSquare className="w-4 h-4" />, label: "WhatsApp", color: "text-green-400", bg: "bg-green-500/10" },
  sms: { icon: <Phone className="w-4 h-4" />, label: "SMS", color: "text-yellow-400", bg: "bg-yellow-500/10" },
};

const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  active: { label: "Aktif", color: "bg-green-500/20 text-green-400" },
  sent: { label: "Gönderildi", color: "bg-blue-500/20 text-blue-400" },
  draft: { label: "Taslak", color: "bg-slate-500/20 text-slate-400" },
  scheduled: { label: "Planlandı", color: "bg-yellow-500/20 text-yellow-400" },
};

export default function PazarlamaPage() {
  const [activeTab, setActiveTab] = useState<"email" | "whatsapp" | "sms">("email");

  return (
    <div className="space-y-6 max-w-[1400px]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold">E-posta, SMS & WhatsApp</h1>
          <p className="text-slate-500 text-sm mt-1">
            4 kampanya · Bu ay 2.586 gönderim · %48 ortalama açılış
          </p>
        </div>
        <button className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-indigo-500/20">
          <Plus className="w-4 h-4" />
          Yeni Kampanya
        </button>
      </div>

      {/* Channel stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { type: "email", label: "E-posta", sent: "1.240", openRate: "39%", icon: Mail, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
          { type: "whatsapp", label: "WhatsApp", sent: "834", openRate: "95%", icon: MessageSquare, color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20" },
          { type: "sms", label: "SMS", sent: "512", openRate: "95%", icon: Phone, color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/20" },
        ].map((ch) => (
          <button
            key={ch.type}
            onClick={() => setActiveTab(ch.type as "email" | "whatsapp" | "sms")}
            className={`${ch.bg} border rounded-2xl p-5 text-left transition-all ${
              activeTab === ch.type ? `${ch.border} shadow-lg scale-[1.02]` : "border-white/10 hover:border-white/20"
            }`}
          >
            <div className={`w-10 h-10 ${ch.bg} border ${ch.border} rounded-xl flex items-center justify-center mb-3`}>
              <ch.icon className={`w-5 h-5 ${ch.color}`} />
            </div>
            <div className="font-bold">{ch.sent}</div>
            <div className="text-xs text-slate-500 mt-0.5">{ch.label} gönderim</div>
            <div className={`text-sm font-bold mt-1 ${ch.color}`}>{ch.openRate} açılış</div>
          </button>
        ))}
      </div>

      {/* Campaigns */}
      <div className="bg-[#0a0f1e] border border-white/10 rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
          <h3 className="font-bold">Kampanyalar</h3>
          <button className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors">
            <Filter className="w-4 h-4" />
            Filtrele
          </button>
        </div>

        <div className="hidden sm:grid grid-cols-[1fr_auto_auto_auto_auto_auto_auto] gap-4 px-5 py-3 border-b border-white/10 text-xs text-slate-500 font-semibold uppercase tracking-wider">
          <span>Kampanya</span>
          <span>Gönderildi</span>
          <span>Açıldı</span>
          <span>Tıklandı</span>
          <span>Açılış %</span>
          <span>Tıklanma %</span>
          <span>İşlemler</span>
        </div>

        <div className="divide-y divide-white/[0.05]">
          {CAMPAIGNS.map((camp) => {
            const typeConf = TYPE_CONFIG[camp.type];
            const statusConf = STATUS_CONFIG[camp.status];
            return (
              <div
                key={camp.id}
                className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto_auto_auto_auto_auto] gap-3 sm:gap-4 px-5 py-4 items-center hover:bg-white/[0.02] transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 ${typeConf.bg} rounded-xl flex items-center justify-center ${typeConf.color}`}>
                    {typeConf.icon}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{camp.name}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-slate-500">{typeConf.label}</span>
                      <span className="text-slate-700">·</span>
                      <span className="text-xs text-slate-500">{camp.date}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${statusConf.color}`}>
                        {statusConf.label}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="hidden sm:block text-sm text-center">{camp.sent.toLocaleString()}</div>
                <div className="hidden sm:block text-sm text-center">{camp.opened.toLocaleString()}</div>
                <div className="hidden sm:block text-sm text-center">{camp.clicked.toLocaleString()}</div>
                <div className="hidden sm:block text-sm font-semibold text-blue-400 text-center">{camp.openRate}</div>
                <div className="hidden sm:block text-sm font-semibold text-green-400 text-center">{camp.clickRate}</div>
                <div className="flex items-center gap-1">
                  <button className="p-1.5 text-slate-500 hover:text-white hover:bg-white/10 rounded-lg transition-all">
                    <BarChart3 className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1.5 text-slate-500 hover:text-white hover:bg-white/10 rounded-lg transition-all">
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1.5 text-slate-500 hover:text-white hover:bg-white/10 rounded-lg transition-all">
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Email sequences */}
      <div className="bg-[#0a0f1e] border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-bold text-lg">E-posta Dizileri (Sequence)</h3>
            <p className="text-slate-500 text-sm">Otomatik e-posta akışları</p>
          </div>
          <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-xl text-sm transition-all">
            <Plus className="w-4 h-4" />
            Yeni Dizi
          </button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: "Hoş Geldin Dizisi", emails: 5, active: 124, openRate: "52%", color: "from-blue-500 to-cyan-500" },
            { name: "Satış Takip Dizisi", emails: 7, active: 87, openRate: "44%", color: "from-purple-500 to-pink-500" },
            { name: "Müşteri Memnuniyet", emails: 3, active: 234, openRate: "61%", color: "from-green-500 to-emerald-500" },
          ].map((seq) => (
            <div key={seq.name} className="bg-white/5 border border-white/10 hover:border-white/20 rounded-2xl p-4 transition-all">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${seq.color} flex items-center justify-center mb-3`}>
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div className="font-bold text-sm mb-1">{seq.name}</div>
              <div className="text-xs text-slate-500 mb-3">{seq.emails} e-posta · {seq.active} aktif aboneye</div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-blue-400">{seq.openRate} açılış</span>
                <button className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                  Düzenle <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
