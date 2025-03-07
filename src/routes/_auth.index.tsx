import { createFileRoute } from "@tanstack/react-router";

import { HomePage } from "@/pages/home";
import { PageLoader } from "@/shared/ui";

export const Route = createFileRoute("/_auth/")({
  component: HomePage,
  pendingComponent: PageLoader,
  validateSearch: (
    search: Record<string, unknown>
  ): { name?: string; page?: number; pageSize?: number } => {
    return {
      name: typeof search?.name === "string" ? search.name : undefined,
      page: typeof search?.page === "number" ? search.page : undefined,
      pageSize:
        typeof search?.pageSize === "number" ? search.pageSize : undefined,
    };
  },
  loaderDeps: ({ search }) => search,
  loader: async ({ context: { queryClient, openapiQueryClient }, deps }) => {
    const pageNumber = deps.page || 0;
    const pageSize = deps.pageSize || 10;
    const name = deps.name || undefined;
    const body = { name };

    const result = await queryClient.fetchQuery(
      openapiQueryClient.queryOptions("post", "/v1/rest/animal/search", {
        params: { query: { pageSize, pageNumber } },
        body,
        bodySerializer: (body) => {
          const params = new URLSearchParams();

          if (!body) return params;

          for (const [paramName, paramValue] of Object.entries(body)) {
            if (paramValue !== undefined) {
              params.append(paramName, paramValue.toString());
            }
          }
          return params;
        },
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
      })
    );

    return result;
  },
});
