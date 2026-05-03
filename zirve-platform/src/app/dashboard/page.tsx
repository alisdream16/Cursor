"use client";

import Link from "next/link";
import {
  Users,
  Globe,
  Workflow,
  Bot,
  Mail,
  Calendar,
  TrendingUp,
  MessageSquare,
  ArrowUpRight,
  ChevronRight,
  Zap,
  Target,
  DollarSign,
  Activity,
  Star,
  Clock,
  CheckCircle2,
  AlertCircle,
  Rocket,
  Plus,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";

const REVENUE_DATA = [
  { gun: "Pzt", gelir: 12400, lead: 24 },
  { gun: "Sal", gelir: 18900, lead: 31 },
  { gun: "Çar", gelir: 15600, lead: 28 },
  { gun: "Per", gelir: 22100, lead: 42 },
  { gun: "Cum", gelir: 28400, lead: 55 },
  { gun: "Cmt", gelir: 19800, lead: 38 },
  { gun: "Paz", gelir: 24600, lead: 47 },
];

const PIPELINE_DATA = [
  { stage: "İletişim", count: 142, color: "bg-blue-500" },
  { stage: "Teklif", count: 58, color: "bg-yellow-500" },
  { stage: "Müzakere", count: 34, color: "bg-orange-500" },
  { stage: "Kapandı", count: 21, color: "bg-green-500" },
];

const QUICK_MODULES = [
  {
    href: "/dashboard/crm",
    icon: Users,
    label: "CRM",
    sublabel: "Müşteri Yönetimi",
    color: "from-blue-500 to-cyan-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    stat: "248 müşteri",
  },
  {
    href: "/dashboard/funnel",
    icon: Globe,
    label: "Funnel",
    sublabel: "Web & Satış Sayfaları",
    color: "from-purple-500 to-pink-500",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    stat: "5 aktif funnel",
  },
  {
    href: "/dashboard/otomasyon",
    icon: Workflow,
    label: "Otomasyon",
    sublabel: "İş Akışları",
    color: "from-orange-500 to-red-500",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    stat: "12 aktif akış",
  },
  {
    href: "/dashboard/ai-ajan",
    icon: Bot,
    label: "AI Ajan",
    sublabel: "7/24 Yapay Zeka",
    color: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    stat: "342 yanıt/gün",
  },
  {
    href: "/dashboard/pazarlama",
    icon: Mail,
    label: "Pazarlama",
    sublabel: "E-posta & SMS & WA",
    color: "from-violet-500 to-purple-500",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    stat: "1.2k gönderim",
  },
  {
    href: "/dashboard/randevu",
    icon: Calendar,
    label: "Randevu",
    sublabel: "Takvim & Planlama",
    color: "from-pink-500 to-rose-500",
    bg: "bg-pink-500/10",
    border: "border-pink-500/20",
    stat: "8 bugün",
  },
];

const ACTIVITIES = [
  {
    icon: <Users className="w-4 h-4" />,
    color: "bg-blue-500/20 text-blue-400",
    text: "Yeni müşteri eklendi",
    detail: "Mehmet Yılmaz — CRM'e eklendi",
    time: "2 dk önce",
  },
  {
    icon: <Bot className="w-4 h-4" />,
    color: "bg-emerald-500/20 text-emerald-400",
    text: "AI Ajan yanıt verdi",
    detail: "WhatsApp — Fiyat sorusu yanıtlandı",
    time: "5 dk önce",
  },
  {
    icon: <Calendar className="w-4 h-4" />,
    color: "bg-pink-500/20 text-pink-400",
    text: "Yeni randevu alındı",
    detail: "Ayşe Kaya — Yarın 14:00",
    time: "12 dk önce",
  },
  {
    icon: <DollarSign className="w-4 h-4" />,
    color: "bg-green-500/20 text-green-400",
    text: "Satış kapandı",
    detail: "Büyüme Paketi — ₺2.490",
    time: "28 dk önce",
  },
  {
    icon: <Mail className="w-4 h-4" />,
    color: "bg-violet-500/20 text-violet-400",
    text: "E-posta kampanyası gönderildi",
    detail: "Mayıs Kampanyası — 432 kişi",
    time: "1 sa önce",
  },
];

const STATS_CARDS = [
  {
    label: "Bu Ay Gelir",
    value: "₺142.800",
    change: "+23%",
    positive: true,
    icon: DollarSign,
    color: "text-green-400",
    bg: "bg-green-500/10",
  },
  {
    label: "Yeni Lead",
    value: "265",
    change: "+18%",
    positive: true,
    icon: Target,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    label: "Dönüşüm Oranı",
    value: "%34.2",
    change: "+5.1%",
    positive: true,
    icon: TrendingUp,
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
  },
  {
    label: "AI Yanıt",
    value: "2.847",
    change: "+41%",
    positive: true,
    icon: Bot,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6 max-w-[1400px]">
      {/* Welcome banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-950/80 to-purple-950/60 border border-indigo-500/20 rounded-2xl p-6">
        <div className="absolute right-0 top-0 w-64 h-full opacity-10">
          <div className="w-full h-full bg-gradient-to-l from-indigo-500 to-transparent" />
        </div>
        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold mb-1">
              İyi günler, Ahmet! 👋
            </h1>
            <p className="text-slate-400 text-sm">
              Bugün 8 yeni lead var, AI ajanın 47 mesaja yanıt verdi. Harika gidiyor!
            </p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/30 px-4 py-2 rounded-xl text-sm font-medium transition-all">
              <Plus className="w-4 h-4" />
              Yeni Lead
            </button>
            <button className="flex items-center gap-1.5 bg-white/10 hover:bg-white/15 border border-white/10 px-4 py-2 rounded-xl text-sm font-medium transition-all">
              <Rocket className="w-4 h-4 text-indigo-400" />
              Kampanya Başlat
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS_CARDS.map((stat) => (
          <div
            key={stat.label}
            className="bg-[#0a0f1e] border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded-lg ${
                  stat.positive
                    ? "bg-green-500/10 text-green-400"
                    : "bg-red-500/10 text-red-400"
                }`}
              >
                {stat.change}
              </span>
            </div>
            <div className="text-2xl font-extrabold mb-1">{stat.value}</div>
            <div className="text-xs text-slate-500">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Revenue chart */}
        <div className="lg:col-span-2 bg-[#0a0f1e] border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold">Haftalık Gelir & Lead</h3>
              <p className="text-slate-500 text-xs mt-0.5">Son 7 gün</p>
            </div>
            <div className="flex gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-1 bg-indigo-500 rounded-full inline-block" />
                Gelir
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-1 bg-emerald-500 rounded-full inline-block" />
                Lead
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={REVENUE_DATA}>
              <defs>
                <linearGradient id="colorGelir" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorLead" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
              <XAxis dataKey="gun" stroke="#475569" tick={{ fontSize: 12 }} />
              <YAxis stroke="#475569" tick={{ fontSize: 11 }} width={50} />
              <Tooltip
                contentStyle={{
                  background: "#0f172a",
                  border: "1px solid #1e293b",
                  borderRadius: "12px",
                  fontSize: "12px",
                }}
              />
              <Area
                type="monotone"
                dataKey="gelir"
                stroke="#6366f1"
                fill="url(#colorGelir)"
                strokeWidth={2}
                name="Gelir (₺)"
              />
              <Area
                type="monotone"
                dataKey="lead"
                stroke="#10b981"
                fill="url(#colorLead)"
                strokeWidth={2}
                name="Lead Sayısı"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pipeline */}
        <div className="bg-[#0a0f1e] border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold">Satış Pipeline</h3>
            <Link href="/dashboard/crm" className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
              Tümü <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-4">
            {PIPELINE_DATA.map((stage) => {
              const total = PIPELINE_DATA.reduce((s, d) => s + d.count, 0);
              const pct = Math.round((stage.count / total) * 100);
              return (
                <div key={stage.stage}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-slate-400">{stage.stage}</span>
                    <span className="font-semibold">{stage.count}</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${stage.color} rounded-full transition-all duration-1000`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-6 p-4 bg-white/5 rounded-xl text-center">
            <div className="text-2xl font-extrabold text-green-400">%14.8</div>
            <div className="text-xs text-slate-500 mt-0.5">Toplam Dönüşüm Oranı</div>
          </div>
        </div>
      </div>

      {/* Quick modules + Activity */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Quick modules */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-lg">Hızlı Erişim</h3>
            <span className="text-xs text-slate-500">Tüm modüller</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {QUICK_MODULES.map((mod) => (
              <Link
                key={mod.href}
                href={mod.href}
                className={`group ${mod.bg} border ${mod.border} hover:border-white/20 rounded-2xl p-4 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg`}
              >
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${mod.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200`}
                >
                  <mod.icon className="w-5 h-5 text-white" />
                </div>
                <div className="font-bold text-sm">{mod.label}</div>
                <div className="text-xs text-slate-500 mt-0.5">{mod.sublabel}</div>
                <div className="text-xs text-slate-400 mt-2 font-medium">{mod.stat}</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Activity feed */}
        <div className="bg-[#0a0f1e] border border-white/10 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold">Son Aktiviteler</h3>
            <Activity className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="space-y-4">
            {ACTIVITIES.map((act, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className={`w-8 h-8 ${act.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  {act.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{act.text}</div>
                  <div className="text-xs text-slate-500 truncate">{act.detail}</div>
                </div>
                <div className="text-xs text-slate-600 flex-shrink-0">{act.time}</div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-sm text-slate-400 hover:text-white transition-all">
            Tüm aktiviteler
          </button>
        </div>
      </div>

      {/* Today's tasks */}
      <div className="bg-[#0a0f1e] border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-lg">Bugünün Görevleri</h3>
          <button className="flex items-center gap-1.5 text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
            <Plus className="w-4 h-4" />
            Görev Ekle
          </button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { icon: <CheckCircle2 className="w-4 h-4 text-green-400" />, label: "8 randevu onaylandı", status: "Tamamlandı", done: true },
            { icon: <Clock className="w-4 h-4 text-yellow-400" />, label: "Mayıs kampanyası gönderilecek", status: "Bekliyor", done: false },
            { icon: <AlertCircle className="w-4 h-4 text-red-400" />, label: "3 sıcak lead takibi", status: "Acil", done: false },
            { icon: <Star className="w-4 h-4 text-indigo-400" />, label: "Haftalık rapor hazır", status: "Tamamlandı", done: true },
          ].map((task, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 p-4 rounded-xl border transition-all ${
                task.done
                  ? "bg-white/[0.02] border-white/5 opacity-60"
                  : "bg-white/5 border-white/10 hover:border-white/20"
              }`}
            >
              {task.icon}
              <div>
                <div className={`text-sm font-medium ${task.done ? "line-through text-slate-500" : ""}`}>
                  {task.label}
                </div>
                <div className={`text-xs mt-1 ${
                  task.status === "Acil" ? "text-red-400" :
                  task.status === "Tamamlandı" ? "text-green-400" : "text-yellow-400"
                }`}>
                  {task.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
