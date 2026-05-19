"use client";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { getZirveAppUrl } from "@/lib/zirve-url";

const ZIRVE_BASE = getZirveAppUrl();

/** Hirenup dashboard içinde ZIRVE sekmesi — site dışına çıkmadan panel */
export default function ZirveEmbedPage() {
  const src = `${ZIRVE_BASE}/giris`;

  return (
    <DashboardLayout>
      <div className="-m-6 flex flex-col" style={{ height: "calc(100vh - 5.5rem)" }}>
        <div className="flex items-center justify-between gap-2 px-4 py-2 bg-slate-50 border-b shrink-0">
          <p className="text-xs text-slate-600">
            Sorun olursa{" "}
            <a href={src} target="_blank" rel="noopener noreferrer" className="underline">
              {ZIRVE_BASE}/giris
            </a>{" "}
            adresini doğrudan açın (app.hirenup.com Zirve değildir).
          </p>
          <a
            href={ZIRVE_BASE}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-primary-600 hover:underline shrink-0"
          >
            Yeni sekmede aç →
          </a>
        </div>
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
