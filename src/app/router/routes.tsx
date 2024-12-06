import {
  createRoute,
  createRootRouteWithContext,
  redirect,
} from "@tanstack/react-router";

import { AppAbility, updateAbility } from "@/entities/ability";
import { RootPage, NoFound, ErrorBoundary } from "@/pages/root";
import { PageLoader } from "@/shared/ui";
import { MINUTE } from "@/shared/lib";
import { initI18n } from "@/entities/i18n";

import { AppLayout } from "../ui/Layout";

import type { Client } from "urql";

export type RouterContext = {
  ability: AppAbility;
  client: Client;
};

const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: RootPage,
  loader: () => {
    return Promise.all([initI18n()]);
  },
  staleTime: MINUTE * 10,
  gcTime: MINUTE * 10,
  notFoundComponent: NoFound,
  pendingComponent: PageLoader,
  errorComponent: ErrorBoundary,
});

const authenticatedRoute = createRoute({
  id: "authenticated",
  getParentRoute: () => rootRoute,
  beforeLoad: ({ location, context }) => {
    const userLogin = localStorage.getItem("login");
    updateAbility(context.ability, userLogin);

    if (context.ability.cannot("read", "all")) {
      throw redirect({
        to: "/login",
        replace: true,
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: AppLayout,
});

const indexRoute = createRoute({
  path: "/",
  getParentRoute: () => authenticatedRoute,
  validateSearch: (search: Record<string, unknown>): { page?: number } => {
    return {
      page: typeof search?.page === "number" ? search.page : undefined,
    };
  },
  loaderDeps: ({ search: { page } }) => ({ page }),
  loader: (options) =>
    import("@/pages/home/api/loader").then((d) =>
      d.loader({
        ...options,
        search: options.deps,
      })
    ),
  pendingComponent: PageLoader,
}).lazy(() => import("@/pages/home").then((d) => d.Route));

const profileRoute = createRoute({
  path: "profile",
  getParentRoute: () => authenticatedRoute,
  loader: () => import("@/pages/profile/api/loader").then((d) => d.loader()),
  pendingComponent: PageLoader,
}).lazy(() => import("@/pages/profile").then((d) => d.Route));

const loginRoute = createRoute({
  path: "/login",
  getParentRoute: () => rootRoute,
  beforeLoad: ({ context }) => {
    if (context.ability.can("read", "all")) {
      throw redirect({
        to: "/",
        replace: true,
      });
    }
  },

  validateSearch: (search: Record<string, unknown>): { redirect: string } => {
    return {
      redirect:
        typeof search?.redirect === "string"
          ? search?.redirect
          : indexRoute.path,
    };
  },
  pendingComponent: PageLoader,
}).lazy(() => import("@/pages/login").then((d) => d.Route));

const logoutRoute = createRoute({
  path: "/logout",
  getParentRoute: () => rootRoute,
  beforeLoad: ({ context }) => {
    updateAbility(context.ability, null);
    localStorage.removeItem("login");

    throw redirect({
      to: "/",
      replace: true,
    });
  },
  pendingComponent: PageLoader,
});

export const routeTree = rootRoute.addChildren([
  authenticatedRoute.addChildren([profileRoute, indexRoute]),
  loginRoute,
  logoutRoute,
]);
