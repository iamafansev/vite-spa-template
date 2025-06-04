import { QueryClient } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";

import { createApiClients } from "@/shared/api/client";

import { ability } from "@/entities/ability";

import { createRouterWithContext } from "./router";
import "./entry.css";

export const App = () => {
  const { fetchClient, openapiQueryClient } = createApiClients({
    baseUrl: import.meta.env.VITE_API_URL,
  });

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
      },
    },
  });

  return (
    <RouterProvider
      router={createRouterWithContext({
        fetchClient,
        queryClient,
        openapiQueryClient,
        ability,
      })}
    />
  );
};
