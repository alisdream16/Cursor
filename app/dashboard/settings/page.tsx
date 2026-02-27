"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Settings, Bell, Lock, Globe, Palette, Shield, Check } from "lucide-react"

export default function SettingsPage() {
  const { data: session } = useSession()
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: false,
  })
  const [language, setLanguage] = useState("tr")
  const [theme, setTheme] = useState("light")
  const [saveSuccess, setSaveSuccess] = useState(false)

  if (!session) return null

  const handleSave = () => {
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 2000)
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Ayarlar</h1>
        
        <div className="space-y-6">
          {/* Bildirim Ayarları */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Bell className="w-5 h-5 text-primary-500" />
              <h2 className="text-xl font-semibold text-gray-900">Bildirim Ayarları</h2>
            </div>
            
            <div className="space-y-4">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-gray-700">E-posta bildirimleri</span>
                <input
                  type="checkbox"
                  checked={notifications.email}
                  onChange={(e) => setNotifications({...notifications, email: e.target.checked})}
                  className="w-5 h-5 text-primary-500 rounded focus:ring-primary-500"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-gray-700">Push bildirimleri</span>
                <input
                  type="checkbox"
                  checked={notifications.push}
                  onChange={(e) => setNotifications({...notifications, push: e.target.checked})}
                  className="w-5 h-5 text-primary-500 rounded focus:ring-primary-500"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-gray-700">SMS bildirimleri</span>
                <input
                  type="checkbox"
                  checked={notifications.sms}
                  onChange={(e) => setNotifications({...notifications, sms: e.target.checked})}
                  className="w-5 h-5 text-primary-500 rounded focus:ring-primary-500"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-gray-700">Pazarlama e-postaları</span>
                <input
                  type="checkbox"
                  checked={notifications.marketing}
                  onChange={(e) => setNotifications({...notifications, marketing: e.target.checked})}
                  className="w-5 h-5 text-primary-500 rounded focus:ring-primary-500"
                />
              </label>
            </div>
          </div>

          {/* Dil ve Bölge */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-5 h-5 text-primary-500" />
              <h2 className="text-xl font-semibold text-gray-900">Dil ve Bölge</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Dil</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="tr">Türkçe</option>
                  <option value="en">English</option>
                  <option value="de">Deutsch</option>
                  <option value="fr">Français</option>
                </select>
              </div>
            </div>
          </div>

          {/* Görünüm */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Palette className="w-5 h-5 text-primary-500" />
              <h2 className="text-xl font-semibold text-gray-900">Görünüm</h2>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={() => setTheme("light")}
                className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                  theme === "light" 
                    ? "border-primary-500 bg-primary-50" 
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="w-full h-12 bg-white rounded border border-gray-200 mb-2"></div>
                <span className="text-sm font-medium">Açık Tema</span>
              </button>
              <button
                onClick={() => setTheme("dark")}
                className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                  theme === "dark" 
                    ? "border-primary-500 bg-primary-50" 
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="w-full h-12 bg-gray-800 rounded mb-2"></div>
                <span className="text-sm font-medium">Koyu Tema</span>
              </button>
            </div>
          </div>

          {/* Güvenlik */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-5 h-5 text-primary-500" />
              <h2 className="text-xl font-semibold text-gray-900">Güvenlik</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">İki Faktörlü Doğrulama</h3>
                  <p className="text-sm text-gray-600">Hesabınızı daha güvenli hale getirin</p>
                </div>
                <Button variant="outline" size="sm">
                  Etkinleştir
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">Şifre Değiştir</h3>
                  <p className="text-sm text-gray-600">Son değişiklik: 30 gün önce</p>
                </div>
                <Button variant="outline" size="sm">
                  Değiştir
                </Button>
              </div>
            </div>
          </div>

          {/* Kaydet Butonu */}
          <div className="flex justify-end gap-4">
            {saveSuccess && (
              <div className="flex items-center gap-2 text-green-600">
                <Check className="w-5 h-5" />
                <span>Ayarlar kaydedildi!</span>
              </div>
            )}
            <Button onClick={handleSave} className="bg-primary-500 hover:bg-primary-600 text-white">
              Ayarları Kaydet
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
