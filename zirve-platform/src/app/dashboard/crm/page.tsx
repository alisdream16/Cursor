"use client";

import { useState } from "react";
import {
  Users,
  Search,
  Plus,
  Filter,
  MoreHorizontal,
  Phone,
  Mail,
  MessageSquare,
  Star,
  StarOff,
  TrendingUp,
  TrendingDown,
  ChevronDown,
  Tag,
  Calendar,
  DollarSign,
  CheckCircle2,
  Clock,
  XCircle,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";

const CONTACTS = [
  {
    id: 1,
    name: "Mehmet Yılmaz",
    email: "mehmet@example.com",
    phone: "+90 532 123 4567",
    company: "Yılmaz Dijital",
    stage: "Sıcak Lead",
    stageColor: "bg-orange-500/20 text-orange-400",
    value: "₺12.500",
    lastContact: "2 gün önce",
    source: "Instagram",
    starred: true,
    avatar: "MY",
    tags: ["VIP", "Ajans"],
  },
  {
    id: 2,
    name: "Ayşe Kaya",
    email: "ayse@ecommerce.com",
    phone: "+90 541 987 6543",
    company: "Kaya E-Ticaret",
    stage: "Müzakere",
    stageColor: "bg-yellow-500/20 text-yellow-400",
    value: "₺8.200",
    lastContact: "5 saat önce",
    source: "WhatsApp",
    starred: true,
    avatar: "AK",
    tags: ["E-Ticaret"],
  },
  {
    id: 3,
    name: "Burak Demir",
    email: "burak@coaching.com",
    phone: "+90 555 456 7890",
    company: "Demir Koçluk",
    stage: "Teklif Gönderildi",
    stageColor: "bg-blue-500/20 text-blue-400",
    value: "₺5.400",
    lastContact: "1 gün önce",
    source: "Funnel",
    starred: false,
    avatar: "BD",
    tags: ["Koçluk"],
  },
  {
    id: 4,
    name: "Selin Arslan",
    email: "selin@saloon.com",
    phone: "+90 533 321 0987",
    company: "Selin Güzellik",
    stage: "Müşteri",
    stageColor: "bg-green-500/20 text-green-400",
    value: "₺3.900",
    lastContact: "3 saat önce",
    source: "Google",
    starred: false,
    avatar: "SA",
    tags: ["Güzellik", "Tekrar"],
  },
  {
    id: 5,
    name: "Kerem Öztürk",
    email: "kerem@teknoloji.com",
    phone: "+90 542 654 3210",
    company: "Öztürk Teknoloji",
    stage: "Soğuk Lead",
    stageColor: "bg-slate-500/20 text-slate-400",
    value: "₺15.000",
    lastContact: "1 hafta önce",
    source: "LinkedIn",
    starred: false,
    avatar: "KÖ",
    tags: ["Teknoloji", "Büyük"],
  },
  {
    id: 6,
    name: "Zeynep Çelik",
    email: "zeynep@hukuk.com",
    phone: "+90 530 789 0123",
    company: "Çelik Hukuk",
    stage: "İlk Görüşme",
    stageColor: "bg-purple-500/20 text-purple-400",
    value: "₺7.800",
    lastContact: "Bugün",
    source: "Reklam",
    starred: true,
    avatar: "ZÇ",
    tags: ["Hukuk"],
  },
];

const STAGES = ["Tümü", "Soğuk Lead", "Sıcak Lead", "İlk Görüşme", "Teklif Gönderildi", "Müzakere", "Müşteri"];
const PIPELINE_STAGES = [
  { label: "Yeni Lead", count: 45, color: "bg-blue-500", value: "₺142k" },
  { label: "İletişimde", count: 32, color: "bg-yellow-500", value: "₺98k" },
  { label: "Teklif", count: 18, color: "bg-orange-500", value: "₺67k" },
  { label: "Müzakere", count: 11, color: "bg-purple-500", value: "₺45k" },
  { label: "Kapandı", count: 8, color: "bg-green-500", value: "₺28k" },
];

export default function CRMPage() {
  const [activeStage, setActiveStage] = useState("Tümü");
  const [view, setView] = useState<"list" | "kanban">("list");
  const [contacts, setContacts] = useState(CONTACTS);
  const [search, setSearch] = useState("");

  const filtered = contacts.filter((c) => {
    const matchesStage = activeStage === "Tümü" || c.stage === activeStage;
    const matchesSearch =
      search === "" ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.company.toLowerCase().includes(search.toLowerCase());
    return matchesStage && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-[1400px]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold">CRM & Müşteri Yönetimi</h1>
          <p className="text-slate-500 text-sm mt-1">
            248 müşteri · 45 aktif lead · Bu ay ₺142.800 pipeline
          </p>
        </div>
        <button className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-indigo-500/20 hover:scale-105">
          <Plus className="w-4 h-4" />
          Yeni Müşteri Ekle
        </button>
      </div>

      {/* Pipeline overview */}
      <div className="bg-[#0a0f1e] border border-white/10 rounded-2xl p-5">
        <h3 className="font-bold mb-4">Satış Pipeline Özeti</h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {PIPELINE_STAGES.map((stage) => (
            <div
              key={stage.label}
              className="bg-white/5 rounded-xl p-3 text-center hover:bg-white/10 transition-all cursor-pointer"
            >
              <div className={`w-2 h-2 ${stage.color} rounded-full mx-auto mb-2`} />
              <div className="font-bold text-lg">{stage.count}</div>
              <div className="text-xs text-slate-400">{stage.label}</div>
              <div className="text-xs font-semibold text-slate-300 mt-1">{stage.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters and search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="İsim, e-posta veya şirket ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0a0f1e] border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50 transition-all"
          />
        </div>
        <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2.5 rounded-xl text-sm text-slate-300 transition-all">
          <Filter className="w-4 h-4" />
          Filtrele
          <ChevronDown className="w-3 h-3" />
        </button>
      </div>

      {/* Stage filter */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {STAGES.map((stage) => (
          <button
            key={stage}
            onClick={() => setActiveStage(stage)}
            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              activeStage === stage
                ? "bg-indigo-600 text-white"
                : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/10"
            }`}
          >
            {stage}
          </button>
        ))}
      </div>

      {/* Contacts table */}
      <div className="bg-[#0a0f1e] border border-white/10 rounded-2xl overflow-hidden">
        {/* Table header */}
        <div className="hidden sm:grid grid-cols-[1fr_1fr_1fr_auto_auto_auto] gap-4 px-5 py-3 border-b border-white/10 text-xs text-slate-500 font-semibold uppercase tracking-wider">
          <span>Müşteri</span>
          <span>Şirket & Kaynak</span>
          <span>Aşama</span>
          <span>Değer</span>
          <span>Son İletişim</span>
          <span>İşlemler</span>
        </div>

        {/* Rows */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-slate-500">
            <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>Sonuç bulunamadı</p>
          </div>
        ) : (
          <div className="divide-y divide-white/[0.05]">
            {filtered.map((contact) => (
              <div
                key={contact.id}
                className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_1fr_auto_auto_auto] gap-3 sm:gap-4 px-5 py-4 hover:bg-white/[0.03] transition-all group items-center"
              >
                {/* Name */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {contact.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-sm flex items-center gap-1.5">
                      {contact.name}
                      {contact.starred && (
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      )}
                    </div>
                    <div className="text-xs text-slate-500">{contact.email}</div>
                  </div>
                </div>

                {/* Company */}
                <div className="hidden sm:block">
                  <div className="text-sm text-slate-300">{contact.company}</div>
                  <div className="text-xs text-slate-500">{contact.source}</div>
                </div>

                {/* Stage */}
                <div className="hidden sm:block">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${contact.stageColor}`}
                  >
                    {contact.stage}
                  </span>
                </div>

                {/* Value */}
                <div className="hidden sm:block text-sm font-bold text-green-400">
                  {contact.value}
                </div>

                {/* Last contact */}
                <div className="hidden sm:block text-xs text-slate-500">
                  {contact.lastContact}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">
                  <button className="p-1.5 text-slate-500 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all">
                    <Phone className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1.5 text-slate-500 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all">
                    <MessageSquare className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1.5 text-slate-500 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-all">
                    <Mail className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1.5 text-slate-500 hover:text-white hover:bg-white/10 rounded-lg transition-all">
                    <MoreHorizontal className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="px-5 py-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-500">
          <span>{filtered.length} müşteri gösteriliyor</span>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-all">← Önceki</button>
            <button className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-all">Sonraki →</button>
          </div>
        </div>
      </div>
    </div>
  );
}
