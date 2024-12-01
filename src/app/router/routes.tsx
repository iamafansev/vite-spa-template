import {
  createRoute,
  createRootRouteWithContext,
} from "@tanstack/react-router";

import { RootPage, NoFound } from "@/pages/root";
import { PageLoader } from "@/shared/ui";
import { RouterContext } from "@/shared/router";

const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: RootPage,
  notFoundComponent: NoFound,
  pendingComponent: PageLoader,
});

const indexRoute = createRoute({
  path: "/",
  getParentRoute: () => rootRoute,
  loader: (options) =>
    import("@/pages/home/api/loader").then((d) => d.loader(options.context)),
  pendingComponent: PageLoader,
}).lazy(() => import("@/pages/home").then((d) => d.Route));

export const routeTree = rootRoute.addChildren([indexRoute]);
