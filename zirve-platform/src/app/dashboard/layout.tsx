"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Globe,
  Workflow,
  Bot,
  Mail,
  Calendar,
  BarChart3,
  Settings,
  Rocket,
  Bell,
  Search,
  Menu,
  X,
  LogOut,
  HelpCircle,
  Plug,
  ChevronLeft,
  MessageSquare,
  ChevronRight,
  Inbox,
  Link2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  {
    section: "Ana Menü",
    items: [
      { href: "/dashboard", icon: LayoutDashboard, label: "Genel Bakış" },
      { href: "/dashboard/crm", icon: Users, label: "CRM & Müşteriler" },
      { href: "/dashboard/funnel", icon: Globe, label: "Funnel & Web Sitesi" },
      { href: "/dashboard/otomasyon", icon: Workflow, label: "Otomasyon" },
    ],
  },
  {
    section: "İletişim",
    items: [
      { href: "/dashboard/mesajlar", icon: Inbox, label: "Gelen Kutusu" },
      { href: "/dashboard/baglanti", icon: Link2, label: "Meta hesabım" },
      { href: "/dashboard/whatsapp", icon: MessageSquare, label: "WhatsApp" },
      { href: "/dashboard/ai-ajan", icon: Bot, label: "AI Ajan" },
      { href: "/dashboard/pazarlama", icon: Mail, label: "E-posta & SMS" },
      { href: "/dashboard/randevu", icon: Calendar, label: "Randevu Sistemi" },
    ],
  },
  {
    section: "Sistem",
    items: [
      { href: "/dashboard/entegrasyonlar", icon: Plug, label: "Entegrasyonlar" },
      { href: "/dashboard/raporlar", icon: BarChart3, label: "Raporlar" },
    ],
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-[#030712] text-white" style={{ overflow: "hidden" }}>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── SIDEBAR ── */}
      <aside
        className={cn(
          "flex-shrink-0 flex flex-col bg-[#080d1a] border-r border-white/[0.07] transition-all duration-300 ease-in-out z-50",
          // Desktop: part of the flex layout (no fixed)
          "hidden md:flex",
          collapsed ? "w-[68px]" : "w-[240px]"
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-3 h-14 border-b border-white/[0.07] flex-shrink-0">
          {!collapsed ? (
            <Link href="/" className="flex items-center gap-2.5 px-1">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                <Rocket className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-base font-extrabold tracking-tight">
                ZİRVE<span className="text-indigo-400">.</span>
              </span>
            </Link>
          ) : (
            <Link href="/" className="mx-auto">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Rocket className="w-3.5 h-3.5 text-white" />
              </div>
            </Link>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={cn(
              "w-5 h-5 rounded-md bg-white/8 hover:bg-white/15 flex items-center justify-center transition-colors flex-shrink-0",
              collapsed && "mx-auto"
            )}
          >
            {collapsed ? (
              <ChevronRight className="w-3 h-3 text-slate-400" />
            ) : (
              <ChevronLeft className="w-3 h-3 text-slate-400" />
            )}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden py-3 px-2 space-y-4">
          {NAV_ITEMS.map((section) => (
            <div key={section.section}>
              {!collapsed && (
                <p className="px-3 mb-1 text-[10px] font-semibold text-slate-600 uppercase tracking-widest">
                  {section.section}
                </p>
              )}
              <ul className="space-y-0.5">
                {section.items.map((item) => {
                  const active =
                    pathname === item.href ||
                    (item.href !== "/dashboard" && pathname.startsWith(item.href));
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 rounded-xl text-sm transition-all duration-150",
                          collapsed ? "justify-center px-2 py-2.5" : "px-3 py-2",
                          active
                            ? "bg-indigo-600/20 text-indigo-300 font-semibold"
                            : "text-slate-400 hover:bg-white/[0.05] hover:text-white"
                        )}
                        title={collapsed ? item.label : undefined}
                      >
                        <item.icon
                          className={cn("w-4.5 h-4.5 flex-shrink-0", active ? "text-indigo-400" : "")}
                          style={{ width: 18, height: 18 }}
                        />
                        {!collapsed && <span className="truncate">{item.label}</span>}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Bottom */}
        <div className="border-t border-white/[0.07] p-2 space-y-0.5 flex-shrink-0">
          {[
            { href: "/dashboard/ayarlar", icon: Settings, label: "Ayarlar" },
            { href: "/", icon: LogOut, label: "Çıkış Yap" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl text-sm text-slate-400 hover:bg-white/[0.05] hover:text-white transition-all",
                collapsed ? "justify-center px-2 py-2.5" : "px-3 py-2"
              )}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="flex-shrink-0" style={{ width: 18, height: 18 }} />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          ))}
        </div>
      </aside>

      {/* Mobile sidebar (drawer) */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 w-[240px] flex flex-col bg-[#080d1a] border-r border-white/[0.07] transition-transform duration-300 ease-in-out z-50 md:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between px-4 h-14 border-b border-white/[0.07]">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Rocket className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-base font-extrabold">ZİRVE<span className="text-indigo-400">.</span></span>
          </Link>
          <button onClick={() => setMobileOpen(false)} className="p-1 text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-4">
          {NAV_ITEMS.map((section) => (
            <div key={section.section}>
              <p className="px-3 mb-1 text-[10px] font-semibold text-slate-600 uppercase tracking-widest">
                {section.section}
              </p>
              <ul className="space-y-0.5">
                {section.items.map((item) => {
                  const active =
                    pathname === item.href ||
                    (item.href !== "/dashboard" && pathname.startsWith(item.href));
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all",
                          active
                            ? "bg-indigo-600/20 text-indigo-300 font-semibold"
                            : "text-slate-400 hover:bg-white/[0.05] hover:text-white"
                        )}
                      >
                        <item.icon style={{ width: 18, height: 18 }} className="flex-shrink-0" />
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="flex-shrink-0 h-14 border-b border-white/[0.07] bg-[#080d1a]/80 backdrop-blur-xl flex items-center justify-between px-4 gap-3">
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-1.5 text-slate-400 hover:text-white transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Search */}
          <div className="relative hidden sm:block flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Müşteri, kampanya veya otomasyon ara..."
              className="w-full bg-white/[0.04] border border-white/[0.07] rounded-xl pl-9 pr-4 py-1.5 text-sm text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/40 focus:bg-white/[0.06] transition-all"
            />
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button className="relative p-1.5 text-slate-400 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <button className="hidden sm:block p-1.5 text-slate-400 hover:text-white transition-colors">
              <HelpCircle className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold cursor-pointer select-none">
              AY
            </div>
          </div>
        </header>

        {/* Page */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#030712]">
          {children}
        </main>
      </div>
    </div>
  );
}
