import path from "path";
import { fileURLToPath } from "url";
import type { NextConfig } from "next";

// Üst dizinde (ör. C:\Users\aliba) başka bir package-lock.json varsa Turbopack yanlış kök seçer;
// /api/* istekleri 404 HTML döner → fetch().json() "Unexpected token '<'" hatası verir.
const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  output: "standalone",
  turbopack: {
    root: projectRoot,
  },
};

export default nextConfig;
