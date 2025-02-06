import { StrictMode } from "react";
import { createRouter } from "@tanstack/react-router";
import { HelmetProvider } from "react-helmet-async";

import { QueryClientProvider } from "@tanstack/react-query";
import { AbilityProvider, ability } from "@/entities/ability";
import { ThemeProvider } from "@/entities/theme";
import { ClientFetchProvider } from "@/entities/fetchClient";
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
                <ClientFetchProvider value={context.fetchClient}>
                  <QueryClientProvider client={context.queryClient}>
                    {children}
                  </QueryClientProvider>
                </ClientFetchProvider>
              </AbilityProvider>
            </ThemeProvider>
          </HelmetProvider>
        </StrictMode>
      );
    },
  });
};

export type Router = ReturnType<typeof createRouterWithContext>;
