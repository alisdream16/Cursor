"use client";

import { useState } from "react";
import {
  Calendar,
  Clock,
  Plus,
  ChevronLeft,
  ChevronRight,
  Users,
  Video,
  Phone,
  MapPin,
  Check,
  X,
  MoreHorizontal,
  Bell,
  Settings,
  Link,
  Copy,
} from "lucide-react";

const DAYS = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];
const HOURS = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

const APPOINTMENTS = [
  {
    id: 1,
    title: "Demo Görüşmesi",
    client: "Mehmet Yılmaz",
    type: "video",
    date: "Bugün",
    time: "10:00 - 10:30",
    status: "confirmed",
    avatar: "MY",
    day: 0,
    hour: 1,
  },
  {
    id: 2,
    title: "Danışmanlık Seansı",
    client: "Ayşe Kaya",
    type: "phone",
    date: "Bugün",
    time: "14:00 - 14:45",
    status: "confirmed",
    avatar: "AK",
    day: 0,
    hour: 5,
  },
  {
    id: 3,
    title: "Sunum",
    client: "Burak Demir",
    type: "video",
    date: "Yarın",
    time: "11:00 - 12:00",
    status: "pending",
    avatar: "BD",
    day: 1,
    hour: 2,
  },
  {
    id: 4,
    title: "Kapanış Görüşmesi",
    client: "Selin Arslan",
    type: "in-person",
    date: "Yarın",
    time: "15:00 - 15:30",
    status: "confirmed",
    avatar: "SA",
    day: 1,
    hour: 6,
  },
  {
    id: 5,
    title: "Onboarding",
    client: "Kerem Öztürk",
    type: "video",
    date: "Çarşamba",
    time: "13:00 - 14:00",
    status: "confirmed",
    avatar: "KÖ",
    day: 2,
    hour: 4,
  },
];

const UPCOMING = [
  ...APPOINTMENTS,
  {
    id: 6,
    title: "Strateji Toplantısı",
    client: "Zeynep Çelik",
    type: "video",
    date: "Perşembe",
    time: "10:00 - 11:00",
    status: "pending",
    avatar: "ZÇ",
    day: 3,
    hour: 1,
  },
];

const TYPE_ICONS: Record<string, React.ReactNode> = {
  video: <Video className="w-3.5 h-3.5" />,
  phone: <Phone className="w-3.5 h-3.5" />,
  "in-person": <MapPin className="w-3.5 h-3.5" />,
};

const TYPE_COLORS: Record<string, string> = {
  video: "bg-blue-500/20 text-blue-400",
  phone: "bg-green-500/20 text-green-400",
  "in-person": "bg-orange-500/20 text-orange-400",
};

const CALENDAR_COLORS = [
  "bg-indigo-600",
  "bg-blue-600",
  "bg-purple-600",
  "bg-emerald-600",
  "bg-pink-600",
];

export default function RandevuPage() {
  const [view, setView] = useState<"week" | "list">("week");
  const [currentWeek] = useState("28 Nisan – 4 Mayıs 2026");

  const getAppointmentsForCell = (day: number, hourIdx: number) =>
    APPOINTMENTS.filter((a) => a.day === day && a.hour === hourIdx);

  return (
    <div className="space-y-6 max-w-[1400px]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold">Randevu Sistemi</h1>
          <p className="text-slate-500 text-sm mt-1">
            Bu hafta 8 randevu · 6 onaylandı · 2 beklemede
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2.5 rounded-xl text-sm font-medium transition-all">
            <Link className="w-4 h-4 text-indigo-400" />
            Rezervasyon Linki
          </button>
          <button className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-indigo-500/20">
            <Plus className="w-4 h-4" />
            Randevu Ekle
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Bu Hafta", value: "8", icon: Calendar, color: "text-indigo-400", bg: "bg-indigo-500/10" },
          { label: "Onaylandı", value: "6", icon: Check, color: "text-green-400", bg: "bg-green-500/10" },
          { label: "Beklemede", value: "2", icon: Clock, color: "text-yellow-400", bg: "bg-yellow-500/10" },
          { label: "Bu Ay Toplam", value: "34", icon: Users, color: "text-blue-400", bg: "bg-blue-500/10" },
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

      {/* Booking link card */}
      <div className="bg-gradient-to-r from-indigo-950/80 to-purple-950/60 border border-indigo-500/20 rounded-2xl p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold mb-1">Online Rezervasyon Sayfanız</h3>
            <p className="text-slate-400 text-sm">
              Bu linki paylaşın, müşterileriniz otomatik randevu alsın
            </p>
            <div className="flex items-center gap-2 mt-2 bg-white/10 rounded-xl px-3 py-1.5 w-fit">
              <span className="text-sm text-indigo-300 font-mono">zirve.app/r/ahmetyilmaz</span>
              <button className="text-slate-500 hover:text-white transition-colors">
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <button className="flex items-center gap-2 bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/30 px-4 py-2 rounded-xl text-sm font-medium transition-all">
            <Settings className="w-4 h-4" />
            Sayfayı Düzenle
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 bg-[#0a0f1e] border border-white/10 rounded-2xl overflow-hidden">
          {/* Calendar nav */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <button className="p-1.5 hover:bg-white/10 rounded-lg transition-all">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="font-semibold text-sm">{currentWeek}</span>
              <button className="p-1.5 hover:bg-white/10 rounded-lg transition-all">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => setView("week")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${view === "week" ? "bg-indigo-600 text-white" : "text-slate-400 hover:bg-white/10"}`}
              >
                Hafta
              </button>
              <button
                onClick={() => setView("list")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${view === "list" ? "bg-indigo-600 text-white" : "text-slate-400 hover:bg-white/10"}`}
              >
                Liste
              </button>
            </div>
          </div>

          {/* Week view */}
          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              {/* Day headers */}
              <div className="grid grid-cols-8 border-b border-white/10">
                <div className="p-3 text-xs text-slate-600" />
                {DAYS.map((day, idx) => (
                  <div
                    key={day}
                    className={`p-3 text-center text-xs font-semibold ${idx === 0 ? "text-indigo-400" : "text-slate-400"}`}
                  >
                    <div>{day}</div>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center mx-auto mt-1 text-sm font-bold ${idx === 0 ? "bg-indigo-600 text-white" : ""}`}>
                      {28 + idx}
                    </div>
                  </div>
                ))}
              </div>

              {/* Time slots */}
              {HOURS.map((hour, hourIdx) => (
                <div key={hour} className="grid grid-cols-8 border-b border-white/[0.04] min-h-[60px]">
                  <div className="p-2 text-[10px] text-slate-600 flex items-start justify-end pr-3 pt-2">
                    {hour}
                  </div>
                  {DAYS.map((_, dayIdx) => {
                    const apts = getAppointmentsForCell(dayIdx, hourIdx);
                    return (
                      <div
                        key={dayIdx}
                        className="border-l border-white/[0.04] p-1 hover:bg-white/[0.02] transition-all cursor-pointer group"
                      >
                        {apts.map((apt, ai) => (
                          <div
                            key={apt.id}
                            className={`${CALENDAR_COLORS[ai % CALENDAR_COLORS.length]} rounded-lg p-1.5 text-[10px] leading-tight mb-1`}
                          >
                            <div className="font-bold truncate">{apt.title}</div>
                            <div className="opacity-80 truncate">{apt.client}</div>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming appointments */}
        <div className="bg-[#0a0f1e] border border-white/10 rounded-2xl p-5">
          <h3 className="font-bold mb-4">Yaklaşan Randevular</h3>
          <div className="space-y-3">
            {UPCOMING.slice(0, 6).map((apt) => (
              <div
                key={apt.id}
                className="flex items-start gap-3 p-3 bg-white/5 hover:bg-white/8 rounded-xl transition-all group"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {apt.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold truncate">{apt.title}</div>
                  <div className="text-xs text-slate-500 truncate">{apt.client}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-slate-600">{apt.date}</span>
                    <span className="text-[10px] text-slate-600">{apt.time}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full ${TYPE_COLORS[apt.type]}`}>
                      {TYPE_ICONS[apt.type]}
                      {apt.type === "video" ? "Video" : apt.type === "phone" ? "Telefon" : "Yüz yüze"}
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full ${
                        apt.status === "confirmed"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {apt.status === "confirmed" ? "Onaylandı" : "Beklemede"}
                    </span>
                  </div>
                </div>
                <button className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-500 hover:text-white hover:bg-white/10 rounded-lg transition-all">
                  <MoreHorizontal className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
