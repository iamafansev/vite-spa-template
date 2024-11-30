import { StrictMode } from "react";
import { HelmetProvider } from "react-helmet-async";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Client,
  cacheExchange,
  fetchExchange,
  Provider as ClientProvider,
} from "urql";

import { ThemeProvider } from "@/entities/theme";

import { routes } from "./routes";
import "./entry.css";

export type HandlerContext = Readonly<{
  client: Client;
}>;

const getClient = () => {
  return new Client({
    url: import.meta.env.VITE_API_URL,
    exchanges: [cacheExchange, fetchExchange],
  });
};

export const App = () => {
  const client = getClient();

  const router = createBrowserRouter(
    routes as Parameters<typeof createBrowserRouter>[0],
    {
      dataStrategy: async ({ matches }) => {
        const context: HandlerContext = {
          client,
        };

        // Run loaders in parallel with the `context` value
        const matchesToLoad = matches.filter((m) => m.shouldLoad);

        const results = await Promise.all(
          matchesToLoad.map((match) =>
            match.resolve((handler) => {
              // Whatever you pass to `handler` will be passed as the 2nd parameter to your loader/action
              return handler(context);
            })
          )
        );

        return results.reduce(
          (acc, result, i) =>
            Object.assign(acc, {
              [matchesToLoad[i].route.id]: result,
            }),
          {}
        );
      },
    }
  );

  router.subscribe((...params) => {
    console.log("subscribe", params);
  });

  console.log("router", router);

  return (
    <StrictMode>
      <HelmetProvider>
        <ThemeProvider>
          <ClientProvider value={client}>
            <RouterProvider router={router} />
          </ClientProvider>
        </ThemeProvider>
      </HelmetProvider>
    </StrictMode>
  );
};
