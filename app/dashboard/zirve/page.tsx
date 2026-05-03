"use client";

import { useCallback, useMemo, useState } from "react";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Button } from "@/components/ui/button";
import { ExternalLink, Copy, Check, Link2, Github } from "lucide-react";

const ENV_ZIRVE = process.env.NEXT_PUBLIC_ZIRVE_APP_URL ?? "http://localhost:3001";
const DEFAULT_VERIFY = "zirve_webhook_secret_2026";

function trimSlash(s: string) {
  return s.replace(/\/+$/, "");
}

export default function ZirveHubPage() {
  const [baseUrl, setBaseUrl] = useState(ENV_ZIRVE);
  const [copied, setCopied] = useState<string | null>(null);

  const oauthCallback = useMemo(
    () => `${trimSlash(baseUrl || "http://localhost:3001")}/api/auth/meta/callback`,
    [baseUrl]
  );
  const whatsappWebhook = useMemo(
    () => `${trimSlash(baseUrl || "http://localhost:3001")}/api/whatsapp/webhook`,
    [baseUrl]
  );
  const instagramWebhook = useMemo(
    () => `${trimSlash(baseUrl || "http://localhost:3001")}/api/instagram/webhook`,
    [baseUrl]
  );

  const copy = useCallback(async (label: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      setCopied(null);
    }
  }, []);

  const panelHref = trimSlash(baseUrl || ENV_ZIRVE);

  return (
    <DashboardLayout>
      <div className="max-w-3xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Link2 className="w-8 h-8 text-primary-600" />
            ZIRVE — Meta & WhatsApp
          </h1>
          <p className="text-gray-600 mt-2">
            Railway kapalıyken ZIRVE&apos;yi GitHub üzerinden{" "}
            <strong className="text-gray-800">Vercel</strong> (veya benzeri ücretsiz host) ile ayağa kaldır; aşağıdaki
            adresleri Meta uygulamanla birebir eşleştir. OAuth ve webhook <strong>ZIRVE uygulamasının</strong> public
            URL&apos;sine gider (Hirenup değil).
          </p>
        </div>

        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <p className="font-semibold mb-1">GitHub ile hızlı test</p>
          <ol className="list-decimal list-inside space-y-1 text-amber-900/90">
            <li>Repo: GitHub&apos;da kodun güncel olduğundan emin ol.</li>
            <li>
              <a
                href="https://vercel.com/new"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-medium inline-flex items-center gap-1"
              >
                vercel.com/new <ExternalLink className="w-3 h-3 inline" />
              </a>{" "}
              → Import Git → repoyu seç → <strong>Root Directory: zirve-platform</strong> → Deploy.
            </li>
            <li>Deploy bitince çıkan URL&apos;yi (örn. https://xxx.vercel.app) aşağıya yapıştır.</li>
            <li>Meta Developer&apos;da OAuth ve Webhook alanlarına bu sayfadaki satırları kopyala.</li>
          </ol>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="font-semibold text-gray-900">ZIRVE panel adresi</h2>
          <p className="text-sm text-gray-600">
            Yerelde iki sunucu: Hirenup 3000, ZIRVE 3001. Canlıda Vercel URL&apos;n buraya yazılmalı; build sırasında
            <code className="mx-1 rounded bg-gray-100 px-1">NEXT_PUBLIC_ZIRVE_APP_URL</code> Hirenup&apos;ta da aynı
            olursa menü doğrudan doğru yere gider.
          </p>
          <label className="block text-xs font-medium text-gray-500">ZIRVE kök URL (https, sonunda / olmasın)</label>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="url"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value.trim())}
              placeholder="https://zirve-xxx.vercel.app"
              className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm"
            />
            <Button type="button" variant="outline" onClick={() => setBaseUrl(ENV_ZIRVE)}>
              .env değerine sıfırla
            </Button>
          </div>
          <a
            href={panelHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex"
          >
            <Button className="gap-2">
              ZIRVE panelini aç
              <ExternalLink className="w-4 h-4" />
            </Button>
          </a>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-6">
          <h2 className="font-semibold text-gray-900 flex items-center gap-2">
            Meta (Facebook) — yapıştırılacak adresler
          </h2>

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-medium text-gray-700">OAuth geçerli yönlendirme URI</span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-1 shrink-0"
                onClick={() => copy("oauth", oauthCallback)}
              >
                {copied === "oauth" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                Kopyala
              </Button>
            </div>
            <code className="block text-xs sm:text-sm break-all rounded-lg bg-gray-900 text-green-100 p-3">
              {oauthCallback}
            </code>
            <p className="text-xs text-gray-500">
              Meta → Uygulama → Facebook Girişi → Ayarlar → Geçerli OAuth yönlendirme URI. Tarayıcıda ZIRVE&apos;yi
              hangi host ile açıyorsan (localhost vs 127.0.0.1 vs vercel.app) aynı host burada olmalı.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-medium text-gray-700">WhatsApp Webhook — Callback URL</span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-1 shrink-0"
                onClick={() => copy("wa", whatsappWebhook)}
              >
                {copied === "wa" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                Kopyala
              </Button>
            </div>
            <code className="block text-xs sm:text-sm break-all rounded-lg bg-gray-900 text-green-100 p-3">
              {whatsappWebhook}
            </code>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-medium text-gray-700">Instagram Webhook (Quickstart / IG)</span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-1 shrink-0"
                onClick={() => copy("ig", instagramWebhook)}
              >
                {copied === "ig" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                Kopyala
              </Button>
            </div>
            <code className="block text-xs sm:text-sm break-all rounded-lg bg-gray-900 text-green-100 p-3">
              {instagramWebhook}
            </code>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-medium text-gray-700">Verify token (WhatsApp / IG webhook)</span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-1 shrink-0"
                onClick={() => copy("verify", DEFAULT_VERIFY)}
              >
                {copied === "verify" ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                Kopyala
              </Button>
            </div>
            <code className="block text-xs sm:text-sm break-all rounded-lg bg-gray-900 text-green-100 p-3">
              {DEFAULT_VERIFY}
            </code>
            <p className="text-xs text-gray-500">
              Vercel&apos;de ZIRVE için <code className="rounded bg-gray-100 px-1">WHATSAPP_WEBHOOK_VERIFY_TOKEN</code>{" "}
              aynı değeri kullan; değiştirdiysen burayı da güncelle.
            </p>
          </div>
        </div>

        <p className="text-xs text-gray-500 flex items-center gap-2">
          <Github className="w-4 h-4" />
          Kaynak:{" "}
          <a
            href="https://github.com/alisdream16/Cursor"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 underline"
          >
            github.com/alisdream16/Cursor
          </a>{" "}
          (klasör <code className="rounded bg-gray-100 px-1">zirve-platform</code>)
        </p>
      </div>
    </DashboardLayout>
  );
}
