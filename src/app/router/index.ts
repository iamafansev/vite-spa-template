import { createRouter } from "@tanstack/react-router";

import { PageLoader } from "@/shared/ui";

import { routeTree, type RouterContext } from "./routes";

export const createRouterWithContext = (context: RouterContext) =>
  createRouter({
    routeTree,
    context,
    defaultPendingComponent: PageLoader,
    // Since we're using URQL, we don't want loader calls to ever be stale
    // This will ensure that the loader is always called when the route is preloaded or visited
    defaultPreloadStaleTime: 0,
    defaultPendingMs: 0,
  });

export type Router = ReturnType<typeof createRouterWithContext>;
