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
