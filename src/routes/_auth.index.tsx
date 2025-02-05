import { createFileRoute } from "@tanstack/react-router";

import { HomePage, GetHomePageDataQuery } from "@/pages/home";
import { PageLoader } from "@/shared/ui";
import { mapResultSourseToPromise } from "@/shared/api/utils";

export const Route = createFileRoute("/_auth/")({
  component: HomePage,
  pendingComponent: PageLoader,
  validateSearch: (
    search: Record<string, unknown>
  ): { name?: string; page?: number; pageSize?: number } => {
    return {
      page: typeof search?.page === "number" ? search.page : undefined,
      pageSize:
        typeof search?.pageSize === "number" ? search.pageSize : undefined,
    };
  },
  loaderDeps: ({ search }) => search,
  loader: async ({ context: { client }, deps }) => {
    const pageNumber = deps.page || 0;
    const pageSize = deps.pageSize || 10;

    const resultSource = client.query(
      GetHomePageDataQuery,
      {
        offset: pageNumber * pageSize,
        take: pageSize,
      },
      {
        requestPolicy: "network-only",
      }
    );

    return mapResultSourseToPromise(resultSource);
  },
});
