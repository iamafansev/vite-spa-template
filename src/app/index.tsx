import { StrictMode } from "react";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "@tanstack/react-router";
import createFetchClient from "openapi-fetch";
import { QueryClient, QueryClientProvider } from "react-query";

import type { paths } from "@/shared/api/v1";

import { AbilityProvider, ability } from "@/entities/ability";
import { ThemeProvider } from "@/entities/theme";
import { ClientFetchProvider } from "@/entities/fetchClient";

import { createRouterWithContext } from "./router";
import "./entry.css";

const getFetchClient = () => {
  return createFetchClient<paths>({
    baseUrl: import.meta.env.VITE_API_URL,
  });
};

export const App = () => {
  const fetchClient = getFetchClient();
  const queryClient = new QueryClient();

  return (
    <StrictMode>
      <HelmetProvider>
        <ThemeProvider>
          <AbilityProvider value={ability}>
            <ClientFetchProvider value={fetchClient}>
              <QueryClientProvider client={queryClient}>
                <RouterProvider
                  router={createRouterWithContext({
                    fetchClient,
                    queryClient,
                    ability,
                  })}
                />
              </QueryClientProvider>
            </ClientFetchProvider>
          </AbilityProvider>
        </ThemeProvider>
      </HelmetProvider>
    </StrictMode>
  );
};
