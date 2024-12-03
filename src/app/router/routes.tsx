import {
  createRoute,
  createRootRouteWithContext,
  redirect,
} from "@tanstack/react-router";

import { AppAbility, updateAbility } from "@/entities/ability";
import { RootPage, NoFound, ErrorBoundary } from "@/pages/root";
import { PageLoader } from "@/shared/ui";
import { initI18n } from "@/entities/i18n";

import type { Client } from "urql";

export type RouterContext = {
  ability: AppAbility;
  client: Client;
};

const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: RootPage,
  beforeLoad: ({ context }) => {
    const userLogin = localStorage.getItem("login");

    updateAbility(context.ability, userLogin);

    return Promise.all([initI18n()]);
  },
  notFoundComponent: NoFound,
  pendingComponent: PageLoader,
  errorComponent: ErrorBoundary,
});

const indexRoute = createRoute({
  path: "/",
  getParentRoute: () => rootRoute,
  beforeLoad: ({ location, context }) => {
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
  loader: (options) =>
    import("@/pages/home/api/loader").then((d) => d.loader(options.context)),
  pendingComponent: PageLoader,
}).lazy(() => import("@/pages/home").then((d) => d.Route));

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

export const routeTree = rootRoute.addChildren([loginRoute, indexRoute]);
