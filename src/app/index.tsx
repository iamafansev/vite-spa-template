import { StrictMode } from "react";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "@tanstack/react-router";
import {
  Client,
  cacheExchange,
  fetchExchange,
  Provider as ClientProvider,
} from "urql";

import { ThemeProvider } from "@/entities/theme";

import { createRouterWithContext } from "./router";
import "./entry.css";

const getClient = () => {
  return new Client({
    url: import.meta.env.VITE_API_URL,
    exchanges: [cacheExchange, fetchExchange],
  });
};

export const App = () => {
  const client = getClient();

  return (
    <StrictMode>
      <HelmetProvider>
        <ThemeProvider>
          <ClientProvider value={client}>
            <RouterProvider router={createRouterWithContext({ client })} />
          </ClientProvider>
        </ThemeProvider>
      </HelmetProvider>
    </StrictMode>
  );
};
