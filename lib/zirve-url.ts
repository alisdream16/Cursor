/** ZIRVE panel adresi — hirenup.com/app.* HireNUp'tur, Zirve değil */
const ZIRVE_RAILWAY = "https://zirve2-production.up.railway.app";

export function getZirveAppUrl(): string {
  const raw = process.env.NEXT_PUBLIC_ZIRVE_APP_URL?.trim().replace(/\/+$/, "");
  if (raw && !raw.includes("hirenup.com")) {
    return raw;
  }
  return ZIRVE_RAILWAY;
}
