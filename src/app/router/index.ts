import { createRouter } from "@tanstack/react-router";

import { PageLoader } from "@/shared/ui";
import { RouterContext } from "@/routes/__root";
import { routeTree } from "@/routeTree.gen";

export const createRouterWithContext = (context: RouterContext) =>
  createRouter({
    routeTree,
    context,
    defaultPendingComponent: PageLoader,
  });

export type Router = ReturnType<typeof createRouterWithContext>;
