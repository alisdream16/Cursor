"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Bot,
  Zap,
  Users,
  BarChart3,
  Mail,
  MessageSquare,
  Calendar,
  Globe,
  TrendingUp,
  Shield,
  ChevronRight,
  Check,
  Star,
  ArrowRight,
  Play,
  Menu,
  X,
  Phone,
  Share2,
  Workflow,
  Layers,
  Target,
  Rocket,
  Award,
  Clock,
  DollarSign,
  HeartHandshake,
  Sparkles,
  ChevronDown,
} from "lucide-react";

const FEATURES = [
  {
    icon: <Users className="w-6 h-6" />,
    title: "Akıllı CRM",
    description:
      "Müşterilerinizi tek ekrandan takip edin. Kim aradı, ne konuşuldu, ne zaman takip edilmeli — hepsi otomatik.",
    color: "from-blue-500 to-cyan-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Funnel & Web Sitesi",
    description:
      "Sürükle-bırak ile dakikalar içinde satış sayfanızı ve funnel sisteminizi oluşturun. Kod bilgisi gerekmez.",
    color: "from-purple-500 to-pink-500",
    bg: "bg-purple-500/10",
  },
  {
    icon: <Workflow className="w-6 h-6" />,
    title: "Otomasyon & Workflow",
    description:
      "Tekrarlayan işleri otomasyona bırakın. E-posta, SMS, WhatsApp — hepsi otomatik çalışsın.",
    color: "from-orange-500 to-red-500",
    bg: "bg-orange-500/10",
  },
  {
    icon: <Bot className="w-6 h-6" />,
    title: "Yapay Zeka Ajanları",
    description:
      "7/24 müşterilerinizle konuşan AI asistanlar. WhatsApp, Instagram DM ve web chat — hiç uyumayan satış ekibi.",
    color: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-500/10",
  },
  {
    icon: <Mail className="w-6 h-6" />,
    title: "E-posta & SMS Pazarlama",
    description:
      "Kişiselleştirilmiş kampanyalar oluşturun. Doğru mesajı, doğru kişiye, doğru anda gönderin.",
    color: "from-violet-500 to-purple-500",
    bg: "bg-violet-500/10",
  },
  {
    icon: <Calendar className="w-6 h-6" />,
    title: "Randevu Sistemi",
    description:
      "Online randevu alın, hatırlatma mesajları otomatik gitsin. Takvimlerinizi hiç doldurmak bu kadar kolay olmamıştı.",
    color: "from-pink-500 to-rose-500",
    bg: "bg-pink-500/10",
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: "WhatsApp Pazarlama",
    description:
      "Toplu WhatsApp kampanyaları, chatbot entegrasyonu ve müşteri segmentasyonu ile satışlarınızı artırın.",
    color: "from-green-500 to-emerald-500",
    bg: "bg-green-500/10",
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Satış Pipeline",
    description:
      "Hangi lead'in nerede olduğunu görün. Fırsatları kaçırmayın, satışa giden yolu optimize edin.",
    color: "from-yellow-500 to-orange-500",
    bg: "bg-yellow-500/10",
  },
];

const TESTIMONIALS = [
  {
    name: "Mehmet Yılmaz",
    role: "Dijital Pazarlama Ajansı Kurucusu",
    text: "ZIRVE'ye geçtikten sonra hem 7 farklı aboneliği iptal ettim, hem de müşteri dönüşüm oranım %340 arttı. Bu platform rakip yok.",
    rating: 5,
    avatar: "MY",
  },
  {
    name: "Ayşe Kaya",
    role: "E-ticaret Girişimcisi",
    text: "WhatsApp AI ajansı tam devrimdi. Artık gece 2'de gelen müşteri sorularına bile anında yanıt gidiyor. Satışlarım durmuyor.",
    rating: 5,
    avatar: "AK",
  },
  {
    name: "Burak Demir",
    role: "Eğitim Koçu",
    text: "Funnel oluşturma o kadar kolay ki inanamadım. Teknik hiçbir şey bilmiyorum ama 1 saatte profesyonel satış sayfam hazırdı.",
    rating: 5,
    avatar: "BD",
  },
  {
    name: "Selin Arslan",
    role: "Güzellik Salonu Sahibi",
    text: "Online randevu sistemi hayatımı kurtardı. Telefonla uğraşmak yerine müşterilerle ilgileniyorum. ZIRVE olmadan nasıl çalışırdım bilmiyorum.",
    rating: 5,
    avatar: "SA",
  },
];

const PRICING = [
  {
    name: "Başlangıç",
    price: "₺990",
    period: "/ay",
    desc: "Küçük işletmeler ve solo girişimciler için mükemmel",
    features: [
      "500 aktif müşteri",
      "CRM & Satış Pipeline",
      "5 Funnel & Web Sitesi",
      "E-posta & SMS (1.000 mesaj/ay)",
      "Randevu Sistemi",
      "Temel Otomasyon",
      "Canlı destek",
    ],
    cta: "Ücretsiz Dene",
    popular: false,
    color: "border-white/10",
  },
  {
    name: "Büyüme",
    price: "₺2.490",
    period: "/ay",
    desc: "Hızla büyüyen işletmeler için tam güç",
    features: [
      "Sınırsız müşteri",
      "Her şey Başlangıç'ta +",
      "WhatsApp AI Ajanı",
      "Sınırsız otomasyon",
      "E-posta & SMS (10.000/ay)",
      "Instagram DM Botu",
      "Öncelikli destek",
      "Kurulum desteği",
    ],
    cta: "Ücretsiz Dene",
    popular: true,
    color: "border-indigo-500",
  },
  {
    name: "Ajans",
    price: "₺5.990",
    period: "/ay",
    desc: "Ajanslar ve büyük ekipler için tam güç",
    features: [
      "Her şey Büyüme'de +",
      "Sınırsız alt hesap",
      "White-label (kendi markanızla)",
      "API & Webhook erişimi",
      "Özel AI eğitimi",
      "Sınırsız mesaj",
      "Özel hesap müdürü",
      "SLA garantisi",
    ],
    cta: "İletişime Geç",
    popular: false,
    color: "border-white/10",
  },
];

const STATS = [
  { value: "12.000+", label: "Aktif İşletme" },
  { value: "%340", label: "Ortalama Dönüşüm Artışı" },
  { value: "7/24", label: "Yapay Zeka Desteği" },
  { value: "₺0", label: "Kurulum Ücreti" },
];

const TOOLS_REPLACED = [
  "HubSpot",
  "Mailchimp",
  "Calendly",
  "Typeform",
  "ActiveCampaign",
  "ClickFunnels",
  "ManyChat",
  "Stripe",
  "Zapier",
  "Intercom",
];

const FAQ = [
  {
    q: "Teknik bilgi gerekiyor mu?",
    a: "Hiç gerekmez. ZIRVE tamamen sürükle-bırak mantığıyla çalışır. Bilgisayarda internette gezinen herkes kullanabilir. Kurulum sihirbazlarımız her adımda sizi yönlendirir.",
  },
  {
    q: "Kurulumu ne kadar sürer?",
    a: "CRM ve temel otomasyonları ortalama 30 dakikada kurabilirsiniz. Funnel ve web sitenizi ise 1-2 saat içinde yayınlayabilirsiniz. Destek ekibimiz kurulum boyunca yanınızdadır.",
  },
  {
    q: "Mevcut araçlarımdan verilerimi taşıyabilir miyim?",
    a: "Evet! Excel, HubSpot, Mailchimp ve 50'den fazla platformdan verilerinizi tek tıkla içe aktarabilirsiniz. Ücretsiz taşıma desteği sunuyoruz.",
  },
  {
    q: "WhatsApp entegrasyonu nasıl çalışıyor?",
    a: "WhatsApp Business API ile doğrudan entegre çalışıyoruz. Yapay zeka ajanınız 7/24 mesajlara yanıt verir, randevu alır, satış süreçlerini yönetir. Meta onaylı ortağız.",
  },
  {
    q: "İptal edebilir miyim?",
    a: "İstediğiniz zaman, herhangi bir ceza ödemeden iptal edebilirsiniz. Aylık abonelikte bir sonraki dönem öncesine kadar kullanmaya devam edersiniz.",
  },
  {
    q: "Kaç kullanıcı ekleyebilirim?",
    a: "Tüm planlarda sınırsız kullanıcı ekleyebilirsiniz. Ekibinizi büyüttükçe ek ücret ödemezsiniz.",
  },
];

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeFeature, setActiveFeature] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % FEATURES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#030712] text-white overflow-x-hidden">
      {/* ── NAVBAR ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#030712]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Rocket className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              ZİRVE<span className="text-indigo-400">.</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              ["Özellikler", "#ozellikler"],
              ["Fiyatlandırma", "#fiyatlandirma"],
              ["Nasıl Çalışır", "#nasil-calisir"],
              ["SSS", "#sss"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="text-sm text-slate-400 hover:text-white transition-colors"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/dashboard"
              className="text-sm text-slate-400 hover:text-white transition-colors px-4 py-2"
            >
              Giriş Yap
            </Link>
            <Link
              href="/dashboard"
              className="text-sm bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105"
            >
              Ücretsiz Başla →
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-[#0a0f1e] border-b border-white/10 px-4 py-6 flex flex-col gap-4">
            {[
              ["Özellikler", "#ozellikler"],
              ["Fiyatlandırma", "#fiyatlandirma"],
              ["Nasıl Çalışır", "#nasil-calisir"],
              ["SSS", "#sss"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="text-slate-300 hover:text-white transition-colors py-1"
              >
                {label}
              </a>
            ))}
            <Link
              href="/dashboard"
              onClick={() => setMenuOpen(false)}
              className="mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-center px-5 py-3 rounded-xl font-semibold"
            >
              Ücretsiz Başla →
            </Link>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
      >
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-3xl" />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 rounded-full px-4 py-1.5 mb-8 text-sm text-indigo-300">
            <Sparkles className="w-4 h-4" />
            <span>Yapay Zeka Destekli Türkiye&apos;nin #1 İşletme Platformu</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 tracking-tight">
            İşletmenizi{" "}
            <span className="gradient-text">Zirveye</span>
            <br />
            Taşıyın
          </h1>

          <p className="text-xl sm:text-2xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            CRM, Funnel, Otomasyon, WhatsApp AI ve daha fazlası —{" "}
            <strong className="text-white">tek platformda</strong>.
            <br />
            Teknik bilgi gerekmez. 14 gün ücretsiz.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="/dashboard"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 px-8 py-4 rounded-2xl text-lg font-bold transition-all duration-200 shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105"
            >
              <Rocket className="w-5 h-5" />
              14 Gün Ücretsiz Dene
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-200">
              <Play className="w-5 h-5 text-indigo-400" />
              Demo İzle
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-20">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-sm"
              >
                <div className="text-2xl font-extrabold gradient-text mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Tools replaced */}
          <div className="max-w-4xl mx-auto">
            <p className="text-sm text-slate-500 mb-4">
              Aşağıdaki araçların tamamının yerini alır:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {TOOLS_REPLACED.map((tool) => (
                <span
                  key={tool}
                  className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-xs text-slate-400 line-through"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="nasil-calisir" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-4 py-1.5 mb-4 text-sm text-emerald-300">
              <Zap className="w-4 h-4" />
              <span>3 Adımda Başlayın</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
              İlk müşterinizi{" "}
              <span className="gradient-text">bugün kazanın</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Kurulum sihirbazımız sizi adım adım yönlendirir. Hiçbir teknik bilgiye gerek yok.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: <Rocket className="w-8 h-8" />,
                title: "Hesap Aç",
                desc: "E-posta ile 30 saniyede kayıt ol. Kredi kartı gerekmez. 14 gün tüm özellikleri ücretsiz kullan.",
                color: "from-blue-500 to-cyan-500",
              },
              {
                step: "02",
                icon: <Layers className="w-8 h-8" />,
                title: "Sistemi Kur",
                desc: "Kurulum sihirbazı seni yönlendirir. CRM'ini kur, funnel'ını seç, WhatsApp botunu aktif et.",
                color: "from-indigo-500 to-purple-500",
              },
              {
                step: "03",
                icon: <TrendingUp className="w-8 h-8" />,
                title: "Büyü",
                desc: "Sisteminiz otomatik çalışır. Siz sadece büyümeye odaklanın, gerisini ZIRVE halletsin.",
                color: "from-purple-500 to-pink-500",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative group bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-white/20 rounded-3xl p-8 transition-all duration-300"
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  {item.icon}
                </div>
                <div className="text-5xl font-black text-white/5 absolute top-6 right-8">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="ozellikler" className="py-24 relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-4 py-1.5 mb-4 text-sm text-purple-300">
              <Sparkles className="w-4 h-4" />
              <span>Tüm Araçlar Bir Arada</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
              İhtiyacınız olan her şey{" "}
              <span className="gradient-text">burada</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              10 farklı abonelik yerine tek ZIRVE. Hem tasarruf edin hem de daha güçlü bir sistemle çalışın.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map((feature, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setActiveFeature(idx)}
                className={`group relative ${feature.bg} border rounded-2xl p-6 transition-all duration-300 cursor-pointer ${
                  activeFeature === idx
                    ? "border-indigo-500/50 shadow-lg shadow-indigo-500/10 scale-[1.02]"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform duration-300`}
                >
                  {feature.icon}
                </div>
                <h3 className="font-bold text-base mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI HIGHLIGHT ── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/50 to-purple-950/50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 rounded-full px-4 py-1.5 mb-6 text-sm text-indigo-300">
                <Bot className="w-4 h-4" />
                <span>Yapay Zeka Gücü</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-extrabold mb-6">
                7/24 Uyumayan{" "}
                <span className="gradient-text">Satış Ekibi</span>
              </h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Yapay zeka ajanlarımız WhatsApp, Instagram DM ve web chat üzerinden müşterilerinizle konuşur, randevu alır, satışı kapatır. Siz uyurken bile kazanın.
              </p>
              <div className="space-y-4">
                {[
                  { icon: <MessageSquare className="w-5 h-5 text-green-400" />, text: "WhatsApp, Instagram ve web chatine otomatik yanıt" },
                  { icon: <Calendar className="w-5 h-5 text-blue-400" />, text: "Randevu alır ve takvime ekler" },
                  { icon: <Target className="w-5 h-5 text-purple-400" />, text: "Lead'leri qualify eder ve CRM'e ekler" },
                  { icon: <DollarSign className="w-5 h-5 text-yellow-400" />, text: "Satış sürecini adım adım ilerletir" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <p className="text-slate-300 pt-2">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Chat Demo */}
            <div className="relative">
              <div className="bg-[#0a0f1e] border border-white/10 rounded-3xl p-6 shadow-2xl">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">WhatsApp AI Asistan</div>
                    <div className="text-xs text-green-400 flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      Çevrimiçi • 7/24 aktif
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { from: "customer", text: "Merhaba, fiyatlarınız hakkında bilgi alabilir miyim?" },
                    { from: "ai", text: "Merhaba! 😊 Size özel bir teklif hazırlayabilirim. Hangi paket ilginizi çekiyor?" },
                    { from: "customer", text: "Büyüme paketini düşünüyordum" },
                    { from: "ai", text: "Harika bir seçim! 🚀 Büyüme paketi aylık ₺2.490. Hemen bir demo aramak ister misiniz? Size 15 dakika ayırabilir miyim?" },
                  ].map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.from === "ai" ? "justify-start" : "justify-end"}`}
                    >
                      <div
                        className={`max-w-xs px-4 py-2.5 rounded-2xl text-sm ${
                          msg.from === "ai"
                            ? "bg-white/10 text-white rounded-tl-sm"
                            : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-tr-sm"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-start">
                    <div className="bg-white/10 px-4 py-2.5 rounded-2xl rounded-tl-sm">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "200ms" }} />
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "400ms" }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl px-4 py-2 text-sm font-bold shadow-xl">
                ⚡ Anlık Yanıt
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full px-4 py-1.5 mb-4 text-sm text-yellow-300">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>Müşteri Yorumları</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
              Gerçek Sonuçlar,{" "}
              <span className="gradient-text-gold">Gerçek İnsanlar</span>
            </h2>
            <p className="text-slate-400 text-lg">
              12.000+ işletme ZIRVE ile büyüdü
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="bg-white/[0.03] border border-white/10 hover:border-white/20 rounded-2xl p-6 transition-all duration-300 hover:bg-white/[0.06]"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  &quot;{t.text}&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-xs text-slate-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="fiyatlandirma" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-1.5 mb-4 text-sm text-green-300">
              <DollarSign className="w-4 h-4" />
              <span>Şeffaf Fiyatlandırma</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
              Aylık abonelik karmaşası{" "}
              <span className="gradient-text">bitti</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Katman yok. Gizli ücret yok. İstediğin zaman iptal et.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PRICING.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-3xl p-8 border ${plan.color} transition-all duration-300 ${
                  plan.popular
                    ? "bg-gradient-to-b from-indigo-950/80 to-purple-950/50 shadow-2xl shadow-indigo-500/20 scale-[1.03]"
                    : "bg-white/[0.03] hover:bg-white/[0.06]"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                    ⭐ En Popüler
                  </div>
                )}
                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                <p className="text-slate-500 text-sm mb-6">{plan.desc}</p>
                <div className="flex items-end gap-1 mb-8">
                  <span className="text-4xl font-extrabold">{plan.price}</span>
                  <span className="text-slate-500 mb-1">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-sm">
                      <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300">{feat}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/dashboard"
                  className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold transition-all duration-200 ${
                    plan.popular
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-500/30 hover:scale-105"
                      : "bg-white/10 hover:bg-white/15 border border-white/10"
                  }`}
                >
                  {plan.cta}
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-slate-500">
            {[
              { icon: <Shield className="w-4 h-4" />, text: "14 gün ücretsiz" },
              { icon: <Clock className="w-4 h-4" />, text: "İstediğin zaman iptal" },
              { icon: <Award className="w-4 h-4" />, text: "Türk Lirası fiyatlama" },
              { icon: <HeartHandshake className="w-4 h-4" />, text: "Türkçe 7/24 destek" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2">
                {item.icon}
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="sss" className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold mb-4">
              Sıkça Sorulan{" "}
              <span className="gradient-text">Sorular</span>
            </h2>
            <p className="text-slate-400">
              Aklınızdaki soruların cevapları burada
            </p>
          </div>

          <div className="space-y-3">
            {FAQ.map((item, idx) => (
              <div
                key={idx}
                className="bg-white/[0.03] border border-white/10 hover:border-white/20 rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-semibold text-sm sm:text-base">{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-indigo-400 transition-transform duration-300 flex-shrink-0 ml-4 ${
                      activeFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {activeFaq === idx && (
                  <div className="px-6 pb-6 text-slate-400 text-sm leading-relaxed border-t border-white/10 pt-4">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/60 to-purple-950/60" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-600/20 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-8 text-sm">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span>14 gün ücretsiz, kredi kartı gerekmez</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6">
            Bugün başlayın,
            <br />
            <span className="gradient-text">yarın fark görün</span>
          </h2>
          <p className="text-slate-400 text-xl mb-10 max-w-2xl mx-auto">
            12.000+ işletme gibi siz de işletmenizi ZIRVE ile büyütün. Kurulum 30 dakika, sonuçlar anında.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 px-10 py-5 rounded-2xl text-xl font-bold transition-all duration-200 shadow-2xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105"
            >
              <Rocket className="w-6 h-6" />
              Ücretsiz Başla
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="https://wa.me/905551234567"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-green-600/20 hover:bg-green-600/30 border border-green-500/30 hover:border-green-500/50 px-10 py-5 rounded-2xl text-xl font-semibold text-green-300 transition-all duration-200"
            >
              <Phone className="w-6 h-6" />
              WhatsApp&apos;tan Yaz
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            {/* Brand */}
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <Rocket className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">
                  ZİRVE<span className="text-indigo-400">.</span>
                </span>
              </div>
              <p className="text-slate-400 text-sm max-w-xs leading-relaxed mb-4">
                Türkiye&apos;nin en kapsamlı pazarlama ve satış platformu. İşletmenizi zirveye taşıyın.
              </p>
              <div className="flex gap-3">
                {[Share2, MessageSquare, Phone].map((Icon, idx) => (
                  <button
                    key={idx}
                    className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-colors"
                  >
                    <Icon className="w-4 h-4 text-slate-400" />
                  </button>
                ))}
              </div>
            </div>

            {[
              {
                title: "Platform",
                links: ["CRM", "Funnel Builder", "Otomasyon", "WhatsApp AI", "E-posta", "Randevu Sistemi"],
              },
              {
                title: "Şirket",
                links: ["Hakkımızda", "Blog", "Kariyer", "Basın", "Ortak Ol"],
              },
              {
                title: "Destek",
                links: ["Yardım Merkezi", "Canlı Sohbet", "Eğitim Videoları", "API Dokümantasyonu", "İletişim"],
              },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="font-semibold text-sm mb-4 text-slate-300">{col.title}</h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-slate-500 hover:text-white transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
            <p>© 2026 ZİRVE. Tüm hakları saklıdır.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Gizlilik Politikası</a>
              <a href="#" className="hover:text-white transition-colors">Kullanım Koşulları</a>
              <a href="#" className="hover:text-white transition-colors">KVKK</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
