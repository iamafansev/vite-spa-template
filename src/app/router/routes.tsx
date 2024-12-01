import {
  createRoute,
  createRootRouteWithContext,
  redirect,
} from "@tanstack/react-router";

import { RootPage, NoFound, ErrorBoundary } from "@/pages/root";
import { PageLoader } from "@/shared/ui";
import { RouterContext } from "@/shared/router";

export type { RouterContext };

const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: RootPage,
  notFoundComponent: NoFound,
  pendingComponent: PageLoader,
  errorComponent: ErrorBoundary,
});

const indexRoute = createRoute({
  path: "/",
  getParentRoute: () => rootRoute,
  beforeLoad: ({ location }) => {
    const isAuthenticated = localStorage.getItem("login");

    if (!isAuthenticated) {
      throw redirect({
        to: "/login",
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
  beforeLoad: () => {
    const isAuthenticated = localStorage.getItem("login");

    if (isAuthenticated) {
      throw redirect({
        to: "/",
      });
    }
  },
  pendingComponent: PageLoader,
}).lazy(() => import("@/pages/login").then((d) => d.Route));

export const routeTree = rootRoute.addChildren([loginRoute, indexRoute]);
