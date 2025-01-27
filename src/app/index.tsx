import createFetchClient from "openapi-fetch";
import createOpenApiClient from "openapi-react-query";
import { QueryClient } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";

import type { paths } from "@/shared/api/stapi";

import { ability } from "@/entities/ability";

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
  const openapiQueryClient = createOpenApiClient(fetchClient);

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
