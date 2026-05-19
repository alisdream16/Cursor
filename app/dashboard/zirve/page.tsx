"use client";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";

const ZIRVE_BASE =
  process.env.NEXT_PUBLIC_ZIRVE_APP_URL?.replace(/\/+$/, "") ||
  "https://zirve2-production.up.railway.app";

/** Hirenup dashboard içinde ZIRVE sekmesi — site dışına çıkmadan panel */
export default function ZirveEmbedPage() {
  const src = `${ZIRVE_BASE}/giris`;

  return (
    <DashboardLayout>
      <div className="-m-6 flex flex-col" style={{ height: "calc(100vh - 5.5rem)" }}>
        <div className="flex items-center justify-between gap-2 px-4 py-2 bg-slate-50 border-b shrink-0">
          <p className="text-xs text-slate-600">
            &quot;Server error&quot; → Railway&apos;de AUTH_SECRET + DATABASE_URL ekle, redeploy.
          </p>
          <a
            href={ZIRVE_BASE}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-primary-600 hover:underline shrink-0"
          >
            Yeni sekmede aç →
          </a>
        </motion>
        <iframe
          src={src}
          title="Zirve CRM"
          className="flex-1 w-full min-h-0 border-0 bg-white"
          allow="clipboard-write"
        />
      </div>
    </DashboardLayout>
  );
}
