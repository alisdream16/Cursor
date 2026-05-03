"use client";

import { useState } from "react";
import {
  Bot,
  MessageSquare,
  Phone,
  Share2,
  Globe,
  Plus,
  Play,
  Pause,
  Settings,
  BarChart3,
  Users,
  Zap,
  TrendingUp,
  Clock,
  CheckCircle2,
  Edit,
  Copy,
  Trash2,
  ChevronRight,
  Send,
  Smile,
  Paperclip,
  Search,
} from "lucide-react";

const AI_AGENTS = [
  {
    id: 1,
    name: "WhatsApp Satış Asistanı",
    channel: "WhatsApp",
    channelIcon: <Phone className="w-4 h-4" />,
    channelColor: "bg-green-500",
    status: "active",
    conversations: 342,
    conversionsToday: 8,
    avgResponseTime: "< 30 sn",
    description: "Fiyat soruları, ürün bilgisi ve randevu alma konularında 7/24 yanıt verir.",
  },
  {
    id: 2,
    name: "Instagram DM Botu",
    channel: "Instagram",
    channelIcon: <Share2 className="w-4 h-4" />,
    channelColor: "bg-gradient-to-br from-purple-500 to-pink-500",
    status: "active",
    conversations: 187,
    conversionsToday: 5,
    avgResponseTime: "< 1 dk",
    description: "Instagram DM'lere otomatik yanıt verir, lead toplar ve yönlendirir.",
  },
  {
    id: 3,
    name: "Web Chat Asistanı",
    channel: "Web Sitesi",
    channelIcon: <Globe className="w-4 h-4" />,
    channelColor: "bg-blue-500",
    status: "paused",
    conversations: 94,
    conversionsToday: 0,
    avgResponseTime: "< 45 sn",
    description: "Web sitesi ziyaretçileriyle konuşur, demo talebi ve bilgi formu doldurur.",
  },
];

const CONVERSATIONS = [
  {
    id: 1,
    name: "Mehmet Y.",
    channel: "WhatsApp",
    lastMsg: "Evet, yarın saat 14 olur mu?",
    time: "2 dk önce",
    unread: 2,
    status: "hot",
    avatar: "MY",
  },
  {
    id: 2,
    name: "Ayşe K.",
    channel: "Instagram",
    lastMsg: "Peki fiyat ne kadar?",
    time: "8 dk önce",
    unread: 1,
    status: "warm",
    avatar: "AK",
  },
  {
    id: 3,
    name: "Burak D.",
    channel: "Web Chat",
    lastMsg: "Teşekkürler, bilgileri aldım.",
    time: "25 dk önce",
    unread: 0,
    status: "cold",
    avatar: "BD",
  },
  {
    id: 4,
    name: "Selin A.",
    channel: "WhatsApp",
    lastMsg: "Ne zaman başlayabiliriz?",
    time: "1 sa önce",
    unread: 0,
    status: "hot",
    avatar: "SA",
  },
];

const CHAT_MESSAGES = [
  { from: "customer", text: "Merhaba, Büyüme paketi hakkında bilgi alabilir miyim?", time: "14:22" },
  {
    from: "ai",
    text: "Merhaba! 😊 Büyüme paketimiz aylık ₺2.490'dan başlıyor. İçerisinde CRM, WhatsApp AI, sınırsız otomasyon ve çok daha fazlası var. Size özel bir demo göstereyim mi?",
    time: "14:22",
  },
  { from: "customer", text: "Evet demo görmek istiyorum", time: "14:23" },
  {
    from: "ai",
    text: "Harika! 🚀 Size 15 dakikalık demo arama ayarlayayım. Yarın veya öbür gün sizin için uygun mu? Tercih ettiğiniz saati söyleyin.",
    time: "14:23",
  },
  { from: "customer", text: "Yarın sabah 10 olur mu?", time: "14:25" },
  {
    from: "ai",
    text: "Mükemmel! ✅ Yarın sabah 10:00'da görüşme ayarlandı. Takvim daveti e-posta adresinize gönderiliyor. Başka bir sorunuz var mı?",
    time: "14:25",
  },
];

export default function AIAjanPage() {
  const [selectedConv, setSelectedConv] = useState(CONVERSATIONS[0]);
  const [inputMsg, setInputMsg] = useState("");

  return (
    <div className="space-y-6 max-w-[1400px]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold">AI Ajan Merkezi</h1>
          <p className="text-slate-500 text-sm mt-1">
            3 aktif kanal · Bugün 623 konuşma · 13 dönüşüm
          </p>
        </div>
        <button className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-indigo-500/20">
          <Plus className="w-4 h-4" />
          Yeni AI Ajan
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Bugün Yanıtlanan", value: "623", icon: MessageSquare, color: "text-blue-400", bg: "bg-blue-500/10" },
          { label: "Ort. Yanıt Süresi", value: "28 sn", icon: Clock, color: "text-green-400", bg: "bg-green-500/10" },
          { label: "Dönüşüm", value: "13", icon: TrendingUp, color: "text-purple-400", bg: "bg-purple-500/10" },
          { label: "Memnuniyet", value: "%94", icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-500/10" },
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

      {/* Agents list */}
      <div className="grid lg:grid-cols-3 gap-4">
        {AI_AGENTS.map((agent) => (
          <div
            key={agent.id}
            className="bg-[#0a0f1e] border border-white/10 hover:border-white/20 rounded-2xl p-5 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 ${agent.channelColor} rounded-xl flex items-center justify-center text-white`}>
                  {agent.channelIcon}
                </div>
                <div>
                  <div className="font-bold text-sm">{agent.name}</div>
                  <div className="text-xs text-slate-500">{agent.channel}</div>
                </div>
              </div>
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  agent.status === "active"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-slate-500/20 text-slate-400"
                }`}
              >
                {agent.status === "active" ? "● Aktif" : "⏸ Durduruldu"}
              </span>
            </div>
            <p className="text-slate-400 text-xs mb-4 leading-relaxed">{agent.description}</p>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[
                { label: "Konuşma", value: agent.conversations },
                { label: "Dönüşüm", value: agent.conversionsToday },
                { label: "Yanıt", value: agent.avgResponseTime },
              ].map((s) => (
                <div key={s.label} className="bg-white/5 rounded-lg p-2 text-center">
                  <div className="font-bold text-sm">{s.value}</div>
                  <div className="text-[10px] text-slate-500">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  agent.status === "active"
                    ? "bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20"
                    : "bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/20"
                }`}
              >
                {agent.status === "active" ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                {agent.status === "active" ? "Durdur" : "Başlat"}
              </button>
              <button className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-all">
                <Settings className="w-4 h-4 text-slate-400" />
              </button>
              <button className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-all">
                <BarChart3 className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Live conversations */}
      <div className="grid lg:grid-cols-3 gap-0 bg-[#0a0f1e] border border-white/10 rounded-2xl overflow-hidden">
        {/* Conversation list */}
        <div className="border-r border-white/10">
          <div className="p-4 border-b border-white/10">
            <h3 className="font-bold mb-3">Canlı Konuşmalar</h3>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Konuşma ara..."
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50"
              />
            </div>
          </div>
          <div className="divide-y divide-white/[0.05] max-h-96 overflow-y-auto">
            {CONVERSATIONS.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedConv(conv)}
                className={`w-full flex items-start gap-3 p-4 hover:bg-white/5 transition-all text-left ${
                  selectedConv.id === conv.id ? "bg-white/5" : ""
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {conv.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">{conv.name}</span>
                    <span className="text-[10px] text-slate-500">{conv.time}</span>
                  </div>
                  <div className="text-xs text-slate-500 truncate">{conv.lastMsg}</div>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-[10px] text-slate-600">{conv.channel}</span>
                    {conv.unread > 0 && (
                      <span className="w-4 h-4 bg-indigo-600 rounded-full text-[10px] font-bold flex items-center justify-center">
                        {conv.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat window */}
        <div className="col-span-2 flex flex-col h-[500px]">
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm font-bold">
                {selectedConv.avatar}
              </div>
              <div>
                <div className="font-semibold text-sm">{selectedConv.name}</div>
                <div className="text-xs text-slate-500">{selectedConv.channel} · AI tarafından yanıtlanıyor</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-green-500/20 text-green-400 px-2.5 py-1 rounded-full font-semibold">● Canlı</span>
              <button className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-all">
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {CHAT_MESSAGES.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.from === "ai" ? "justify-start" : "justify-end"}`}>
                {msg.from === "ai" && (
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mr-2 flex-shrink-0 mt-auto">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-sm px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.from === "ai"
                      ? "bg-white/10 text-white rounded-tl-sm"
                      : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-tr-sm"
                  }`}
                >
                  {msg.text}
                  <div className={`text-[10px] mt-1 ${msg.from === "ai" ? "text-slate-500" : "text-indigo-300"}`}>
                    {msg.time}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
              <button className="text-slate-500 hover:text-white transition-colors">
                <Paperclip className="w-4 h-4" />
              </button>
              <input
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                placeholder="Manuel mesaj yaz (AI'yi geç)..."
                className="flex-1 bg-transparent text-sm text-slate-300 placeholder:text-slate-600 focus:outline-none"
              />
              <button className="text-slate-500 hover:text-white transition-colors">
                <Smile className="w-4 h-4" />
              </button>
              <button className="p-1.5 bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-all">
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-[11px] text-slate-600">AI otomatik yanıt veriyor · Son mesaj 28 sn önce</span>
              <button className="text-[11px] text-indigo-400 hover:text-indigo-300">AI'yi devral →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
