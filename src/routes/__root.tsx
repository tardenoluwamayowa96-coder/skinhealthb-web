import { createServerFn } from "@tanstack/react-start";
import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { Shell } from "@/components/shell";
import { BRAND } from "@/lib/brand";
import { Toaster } from "sonner";
import appCss from "../styles.css?url";

const fetchSessionUser = createServerFn({ method: "GET" }).handler(async () => {
  const { getSessionUser } = await import("@/lib/auth/verify.server");
  const u = await getSessionUser();
  return u ? { id: u.id, email: u.email } : null;
});

export const Route = createRootRoute({
  beforeLoad: async () => ({ sessionUser: await fetchSessionUser() }),
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: `${BRAND.instagramHandle} · ${BRAND.name}` },
      {
        name: "description",
        content:
          "Skinhealthb — produits cosmétiques authentiques au Togo. Instagram et TikTok @skinhealthb. Flooz 96 83 60 21, Mixx by Yas 92 90 75 01, livraison dans toutes les villes.",
      },
      { name: "theme-color", content: "#F3F0E8" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "default" },
      { name: "apple-mobile-web-app-title", content: BRAND.name },
      { name: "application-name", content: BRAND.instagramHandle },
      { property: "og:url", content: BRAND.siteUrl },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32.png" },
      { rel: "icon", type: "image/png", sizes: "48x48", href: "/favicon-48.png" },
      { rel: "icon", type: "image/png", sizes: "192x192", href: "/icon-192.png" },
      { rel: "icon", type: "image/png", sizes: "512x512", href: "/icon-512.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/__grok/icon-180.png" },
      { rel: "apple-touch-icon", sizes: "167x167", href: "/brand/icon-167.png" },
      { rel: "apple-touch-icon", sizes: "152x152", href: "/brand/icon-152.png" },
      { rel: "apple-touch-icon", sizes: "120x120", href: "/brand/icon-120.png" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600&family=Outfit:wght@400;500;600&display=swap",
      },
      { rel: "canonical", href: BRAND.siteUrl },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "me", href: BRAND.instagramUrl },
      { rel: "me", href: BRAND.tiktokUrl },
    ],
  }),
  component: () => (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: BRAND.name,
              alternateName: BRAND.instagramHandle,
              description: BRAND.tagline,
              sameAs: [BRAND.instagramUrl, BRAND.tiktokUrl],
            }),
          }}
        />
        <AuthProvider>
          <Shell>
            <Outlet />
          </Shell>
          <Toaster position="top-center" richColors={false} />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});
