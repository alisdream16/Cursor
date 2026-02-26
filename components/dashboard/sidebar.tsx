"use client"

import { useSession } from "next-auth/react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { 
  User, 
  Building2, 
  Bell, 
  Settings, 
  BarChart3, 
  Users, 
  Briefcase, 
  FolderKanban,
  FileText,
  Zap,
  Shield,
  ChevronRight,
  MessageCircle,
  Bot,
  Calendar,
  ClipboardList,
  DollarSign,
  Clock,
  PieChart,
  CreditCard
} from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface MenuItem {
  label: string
  href: string
  icon: React.ReactNode
  requiresPermission?: string
  children?: MenuItem[]
}

export function DashboardSidebar() {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [userPermissions, setUserPermissions] = useState<string[]>([])
  const [userCompanies, setUserCompanies] = useState<any[]>([])
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  useEffect(() => {
    const fetchData = async () => {
      if (session?.user?.id) {
        try {
          const [permsRes, companiesRes] = await Promise.all([
            fetch("/api/permissions/my-permissions"),
            fetch("/api/companies/my-companies"),
          ])
          
          if (permsRes.ok) {
            const perms = await permsRes.json()
            setUserPermissions(perms.permissions?.map((p: any) => p.type) || [])
          }
          
          if (companiesRes.ok) {
            const companies = await companiesRes.json()
            setUserCompanies(companies.companies || [])
          }
        } catch (error) {
          console.error("Error fetching data:", error)
        }
      }
    }
    fetchData()
  }, [session])

  const accountType = session?.user?.accountType

  const hasPermission = (permission: string) => {
    return userPermissions.includes(permission)
  }

  const toggleExpand = (item: string) => {
    setExpandedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    )
  }

  const getMenuItems = (): MenuItem[] => {
    // Temel menü - herkes için
    const baseItems: MenuItem[] = [
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: <PieChart className="w-5 h-5" />,
      },
      {
        label: "Profil",
        href: "/dashboard/profile",
        icon: <User className="w-5 h-5" />,
      },
      {
        label: "Mesajlar",
        href: "/dashboard/messages",
        icon: <MessageCircle className="w-5 h-5" />,
      },
      {
        label: "Bildirimler",
        href: "/dashboard/notifications",
        icon: <Bell className="w-5 h-5" />,
      },
    ]

    // === FREELANCER ===
    if (accountType === "FREELANCER") {
      baseItems.push(
        {
          label: "İş İlanları",
          href: "/dashboard/freelancer/jobs",
          icon: <Briefcase className="w-5 h-5" />,
        },
        {
          label: "Projelerim",
          href: "/dashboard/freelancer/projects",
          icon: <FolderKanban className="w-5 h-5" />,
        },
        {
          label: "Görevler",
          href: "/dashboard/freelancer/tasks",
          icon: <ClipboardList className="w-5 h-5" />,
        },
        {
          label: "Kazançlarım",
          href: "/dashboard/freelancer/earnings",
          icon: <DollarSign className="w-5 h-5" />,
        },
        {
          label: "Değerlendirmeler",
          href: "/dashboard/freelancer/reviews",
          icon: <Shield className="w-5 h-5" />,
        }
      )
    }

    // === ÇALIŞAN (WORKER) - Sistem Entegrasyonları ===
    if (accountType === "WORKER") {
      baseItems.push(
        {
          label: "Projeler",
          href: "/dashboard/worker/projects",
          icon: <FolderKanban className="w-5 h-5" />,
        },
        {
          label: "Görevler",
          href: "/dashboard/worker/tasks",
          icon: <ClipboardList className="w-5 h-5" />,
        },
        {
          label: "İzinler",
          href: "/dashboard/worker/leaves",
          icon: <Calendar className="w-5 h-5" />,
        },
        {
          label: "Çalışma Saatleri",
          href: "/dashboard/worker/timesheet",
          icon: <Clock className="w-5 h-5" />,
        },
        {
          label: "Raporlar",
          href: "/dashboard/worker/reports",
          icon: <FileText className="w-5 h-5" />,
        },
        {
          label: "Entegrasyonlar",
          href: "/dashboard/worker/integrations",
          icon: <Zap className="w-5 h-5" />,
        }
      )

      // Şirket erişimi varsa
      if (userCompanies.length > 0) {
        userCompanies.forEach((company) => {
          baseItems.push({
            label: company.name,
            href: `/dashboard/company/${company.id}`,
            icon: <Building2 className="w-5 h-5" />,
            children: [
              {
                label: "Projeler",
                href: `/dashboard/company/${company.id}/projects`,
                icon: <FolderKanban className="w-4 h-4" />,
              },
              {
                label: "Görevler",
                href: `/dashboard/company/${company.id}/tasks`,
                icon: <ClipboardList className="w-4 h-4" />,
              },
              {
                label: "Çalışanlar",
                href: `/dashboard/company/${company.id}/employees`,
                icon: <Users className="w-4 h-4" />,
              },
            ],
          })
        })
      }
    }

    // === ŞİRKET (EMPLOYER) - Tam Sistem Entegrasyonları ===
    if (accountType === "EMPLOYER") {
      baseItems.push(
        // Şirket Yönetimi
        {
          label: "Şirketlerim",
          href: "/dashboard/employer/companies",
          icon: <Building2 className="w-5 h-5" />,
          children: [
            {
              label: "Şirketler",
              href: "/dashboard/employer/company",
              icon: <Building2 className="w-4 h-4" />,
            },
            {
              label: "Yeni Şirket",
              href: "/dashboard/employer/company/create",
              icon: <Building2 className="w-4 h-4" />,
            },
          ],
        },
        // Çalışan Yönetimi
        {
          label: "Çalışanlar",
          href: "/dashboard/employer/employees",
          icon: <Users className="w-5 h-5" />,
          children: [
            {
              label: "Çalışan Listesi",
              href: "/dashboard/employer/employees",
              icon: <Users className="w-4 h-4" />,
            },
            {
              label: "Yetki Yönetimi",
              href: "/dashboard/employer/permissions",
              icon: <Shield className="w-4 h-4" />,
            },
          ],
        },
        // Projeler
        {
          label: "Projeler",
          href: "/dashboard/employer/projects",
          icon: <FolderKanban className="w-5 h-5" />,
          children: [
            {
              label: "Tüm Projeler",
              href: "/dashboard/employer/projects",
              icon: <FolderKanban className="w-4 h-4" />,
            },
            {
              label: "Yeni Proje",
              href: "/dashboard/employer/projects/new",
              icon: <FolderKanban className="w-4 h-4" />,
            },
          ],
        },
        // Görevler
        {
          label: "Görevler",
          href: "/dashboard/employer/tasks",
          icon: <ClipboardList className="w-5 h-5" />,
        },
        // İzinler
        {
          label: "İzin Yönetimi",
          href: "/dashboard/employer/leaves",
          icon: <Calendar className="w-5 h-5" />,
        },
        // Muhasebe
        {
          label: "Muhasebe",
          href: "/dashboard/employer/accounting",
          icon: <DollarSign className="w-5 h-5" />,
          children: [
            {
              label: "Genel Bakış",
              href: "/dashboard/employer/accounting",
              icon: <DollarSign className="w-4 h-4" />,
            },
            {
              label: "Faturalar",
              href: "/dashboard/employer/accounting/invoices",
              icon: <FileText className="w-4 h-4" />,
            },
            {
              label: "Ödemeler",
              href: "/dashboard/employer/accounting/payments",
              icon: <CreditCard className="w-4 h-4" />,
            },
          ],
        },
        // Raporlama
        {
          label: "Raporlar",
          href: "/dashboard/employer/reports",
          icon: <BarChart3 className="w-5 h-5" />,
        },
        // Entegrasyonlar
        {
          label: "Entegrasyonlar",
          href: "/dashboard/employer/integrations",
          icon: <Zap className="w-5 h-5" />,
        },
        // İş İlanları
        {
          label: "İş İlanları",
          href: "/dashboard/employer/jobs",
          icon: <Briefcase className="w-5 h-5" />,
        }
      )
    }

    // Ortak alt menüler
    baseItems.push(
      {
        label: "Üyelik",
        href: "/dashboard/subscription",
        icon: <CreditCard className="w-5 h-5" />,
      },
      {
        label: "AI Asistan",
        href: "/dashboard/ai-assistant",
        icon: <Bot className="w-5 h-5" />,
      },
      {
        label: "Güvenlik",
        href: "/dashboard/security",
        icon: <Shield className="w-5 h-5" />,
      },
      {
        label: "KYC Doğrulama",
        href: "/dashboard/kyc",
        icon: <Shield className="w-5 h-5" />,
      }
    )

    return baseItems
  }

  const menuItems = getMenuItems()

  const isActive = (href: string) => {
    return pathname === href || pathname?.startsWith(href + "/")
  }

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0 overflow-y-auto">
      <div className="p-4">
        {/* Üyelik Durumu */}
        <div className="mb-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
          <p className="text-xs font-medium text-green-800">🎁 Deneme Sürümü</p>
          <p className="text-xs text-green-600">Tüm özellikler 1 ay ücretsiz!</p>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => (
            <div key={item.href}>
              {item.children ? (
                <div>
                  <button
                    onClick={() => toggleExpand(item.href)}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2 rounded-lg transition",
                      isActive(item.href)
                        ? "bg-primary-50 text-primary-700 font-medium"
                        : "text-gray-700 hover:bg-gray-50"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span className="text-sm">{item.label}</span>
                    </div>
                    <ChevronRight
                      className={cn(
                        "w-4 h-4 transition-transform",
                        expandedItems.includes(item.href) && "rotate-90"
                      )}
                    />
                  </button>
                  {expandedItems.includes(item.href) && (
                    <div className="ml-8 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-lg transition text-sm",
                            isActive(child.href)
                              ? "bg-primary-50 text-primary-700 font-medium"
                              : "text-gray-600 hover:bg-gray-50"
                          )}
                        >
                          {child.icon}
                          <span>{child.label}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg transition",
                    isActive(item.href)
                      ? "bg-primary-50 text-primary-700 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  )}
                >
                  {item.icon}
                  <span className="text-sm">{item.label}</span>
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  )
}
