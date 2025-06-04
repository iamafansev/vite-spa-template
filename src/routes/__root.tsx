import type { Client } from "openapi-fetch";
import { OpenapiQueryClient } from "openapi-react-query";
import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext } from "@tanstack/react-router";

import { RootPage, NoFound, ErrorBoundary } from "@/pages/root";
import { AppAbility, updateAbility } from "@/entities/ability";
import { PageLoader } from "@/shared/ui";
import { MINUTE } from "@/shared/lib";
import { initI18n } from "@/entities/i18n";
import type { paths } from "@/shared/api/types/paths";

export type RouterContext = {
  ability: AppAbility;
  queryClient: QueryClient;
  fetchClient: Client<paths>;
  openapiQueryClient: OpenapiQueryClient<paths, `${string}/${string}`>;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootPage,
  pendingComponent: PageLoader,
  errorComponent: ErrorBoundary,
  notFoundComponent: NoFound,
  beforeLoad: ({ context }) => {
    const userLogin = localStorage.getItem("login");
    updateAbility(context.ability, userLogin);
  },
  loader: () => {
    return Promise.all([initI18n()]);
  },
  staleTime: MINUTE * 10,
  gcTime: MINUTE * 10,
});
