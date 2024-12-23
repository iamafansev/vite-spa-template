import { createFileRoute } from "@tanstack/react-router";

import { HomePage, animalsQueryOptions } from "@/pages/home";
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
  loader: async ({ context: { queryClient, fetchClient }, deps }) => {
    const pageNumber = deps.page || 0;
    const pageSize = deps.pageSize || 10;
    const name = deps.name || undefined;

    const result = await queryClient.fetchQuery(
      animalsQueryOptions(fetchClient, {
        params: { pageSize, pageNumber },
        body: { name },
      })
    );

    return result;
  },
});
