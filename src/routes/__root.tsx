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
import { RecentPurchasePopup } from "@/components/RecentPurchasePopup";
import { ExitIntentPopup } from "@/components/ExitIntentPopup";
import { useCartSync } from "@/hooks/useCartSync";

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
      { property: "og:title", content: "Aurum — Tiny upgrades. Massive vibes." },
      { property: "og:description", content: "Trending TikTok-favorite gadgets with free US shipping and a 30-day guarantee." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Aurum — Tiny upgrades. Massive vibes." },
      { name: "twitter:description", content: "Trending TikTok-favorite gadgets with free US shipping and a 30-day guarantee." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/ccd40323-1de8-401e-a027-f38c3122bd6d/id-preview-6dbbf896--1d5a1dcd-7ba2-47bb-9953-0fb226ab6eb2.lovable.app-1779991349878.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/ccd40323-1de8-401e-a027-f38c3122bd6d/id-preview-6dbbf896--1d5a1dcd-7ba2-47bb-9953-0fb226ab6eb2.lovable.app-1779991349878.png" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
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
      <RecentPurchasePopup />
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
