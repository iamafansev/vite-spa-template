import { StrictMode } from "react";
import { createRouter } from "@tanstack/react-router";
import { HelmetProvider } from "react-helmet-async";

import { Provider as ClientProvider } from "urql";
import { AbilityProvider, ability } from "@/entities/ability";
import { ThemeProvider } from "@/entities/theme";
import { PageLoader } from "@/shared/ui";
import { RouterContext } from "@/routes/__root";
import { routeTree } from "@/routeTree.gen";

export const createRouterWithContext = (context: RouterContext) => {
  return createRouter({
    routeTree,
    context: context,
    defaultPendingComponent: PageLoader,
    defaultPendingMs: 3000,
    Wrap: ({ children }) => {
      return (
        <StrictMode>
          <HelmetProvider>
            <ThemeProvider>
              <AbilityProvider value={ability}>
                <ClientProvider value={context.client}>
                  {children}
                </ClientProvider>
              </AbilityProvider>
            </ThemeProvider>
          </HelmetProvider>
        </StrictMode>
      );
    },
  });
};

export type Router = ReturnType<typeof createRouterWithContext>;
