import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Toaster } from "@/components/ui/sonner";
import { CartDrawer } from "@/components/CartDrawer";
import { ExitIntentPopup } from "@/components/ExitIntentPopup";
import { useCartSync } from "@/hooks/useCartSync";

const SITE_URL = "https://rocket-commerce-gen.lovable.app";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold">404</h1>
        <p className="mt-4 text-muted-foreground">The page you're looking for doesn't exist.</p>
        <Link to="/" className="mt-6 inline-flex items-center justify-center rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background">
          Go home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">Refresh or head back home.</p>
        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background"
          >
            Try again
          </button>
          <a href="/" className="rounded-full border border-border px-5 py-2 text-sm font-medium">Home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Aurum — Tiny upgrades. Massive vibes." },
      { name: "description", content: "Trending TikTok-favorite gadgets with free US shipping and a 30-day guarantee." },
      { property: "og:site_name", content: "Aurum" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "preconnect", href: "https://cdn.shopify.com" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Aurum",
          url: SITE_URL,
          sameAs: [],
          contactPoint: { "@type": "ContactPoint", email: "support@aurum.shop", contactType: "customer support" },
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function AppShell() {
  useCartSync();
  return (
    <>
      <Outlet />
      <CartDrawer />
      <ExitIntentPopup />
      <Toaster position="top-center" />
    </>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <AppShell />
    </QueryClientProvider>
  );
}
