import { ReactNode, StrictMode } from "react";
import { createRouter } from "@tanstack/react-router";
import { HelmetProvider } from "react-helmet-async";

import { QueryClientProvider } from "@tanstack/react-query";
import { AbilityProvider, ability } from "@/entities/ability";
import { ThemeProvider } from "@/entities/theme";
import { ApiClientProvider } from "@/shared/api/client";
import { PageLoader } from "@/shared/ui";
import { RouterContext } from "@/routes/__root";
import { routeTree } from "@/routeTree.gen";

export const createRouterWithContext = (context: RouterContext) => {
  return createRouter({
    routeTree,
    context: context,
    defaultPendingComponent: PageLoader,
    defaultPendingMs: 5000,
    Wrap: ({ children }) => {
      return (
        <StrictMode>
          <HelmetProvider>
            <ThemeProvider>
              <AbilityProvider value={ability}>
                <ApiClientProvider
                  value={{
                    fetchClient: context.fetchClient,
                    openapiQueryClient: context.openapiQueryClient,
                  }}
                >
                  <QueryClientProvider client={context.queryClient}>
                    {children}
                  </QueryClientProvider>
                </ApiClientProvider>
              </AbilityProvider>
            </ThemeProvider>
          </HelmetProvider>
        </StrictMode>
      );
    },
    InnerWrap: ({ children }: { children: ReactNode }) => {
      // Тут провайдеры UI нотификации и прочее, что не нужно для маршрутизатора, но нужно для приложения
      return <>{children}</>;
    },
  });
};

export type Router = ReturnType<typeof createRouterWithContext>;
