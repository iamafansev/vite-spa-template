import { createRouter } from "@tanstack/react-router";

import { PageLoader } from "@/shared/ui";

import { routeTree, type RouterContext } from "./routes";

export const createRouterWithContext = (context: RouterContext) =>
  createRouter({
    routeTree,
    context,
    defaultPendingComponent: PageLoader,
  });

export type Router = ReturnType<typeof createRouterWithContext>;
