import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import faviconUrl from "@/assets/logo.png";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
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
      { title: "D C Bikaneri Sweets — Sweet Shop in Ludhiana" },
      { name: "description", content: "D C Bikaneri Sweets, Ludhiana — authentic Bikaneri mithai, kaju katli, rasgulla, laddoo & fresh dairy. Order on WhatsApp with same-day home delivery." },
      { name: "author", content: "D C Bikaneri Sweets" },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "googlebot", content: "index, follow" },
      { name: "keywords", content: "Bikaneri sweets Ludhiana, sweet shop Ludhiana, mithai shop Ludhiana, kaju katli, rasgulla, laddoo, paneer, fresh dairy, home delivery sweets Ludhiana, D C Bikaneri Sweets" },
      { name: "theme-color", content: "#5a1a0a" },
      { name: "geo.region", content: "IN-PB" },
      { name: "geo.placename", content: "Ludhiana, Punjab" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "D C Bikaneri Sweets" },
      { property: "og:locale", content: "en_IN" },
      { property: "og:url", content: "https://dcbikanerisweets.com/" },
      { property: "og:title", content: "D C Bikaneri Sweets — Sweet Shop in Ludhiana" },
      { property: "og:description", content: "Authentic Bikaneri sweets & fresh dairy in Ludhiana with same-day home delivery. Call or WhatsApp to order." },
      { property: "og:image", content: "https://dcbikanerisweets.com/og-cover.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "D C Bikaneri Sweets — Sweet Shop in Ludhiana" },
      { name: "twitter:description", content: "Authentic Bikaneri sweets & fresh dairy in Ludhiana with same-day home delivery." },
      { name: "twitter:image", content: "https://dcbikanerisweets.com/og-cover.jpg" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "canonical",
        href: "https://dcbikanerisweets.com/",
      },
      {
        rel: "icon",
        type: "image/png",
        href: faviconUrl,
      },
      {
        rel: "apple-touch-icon",
        href: faviconUrl,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
