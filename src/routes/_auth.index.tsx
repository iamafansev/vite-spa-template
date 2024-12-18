import { createFileRoute } from "@tanstack/react-router";

import { HomePage, GetHomePageDataQuery } from "@/pages/home";
import { mapResultSourseToPromise } from "@/shared/api/utils";
import { PageLoader } from "@/shared/ui";

export const Route = createFileRoute("/_auth/")({
  component: HomePage,
  pendingComponent: PageLoader,
  validateSearch: (search: Record<string, unknown>): { page?: number } => {
    return {
      page: typeof search?.page === "number" ? search.page : undefined,
    };
  },
  loaderDeps: ({ search: { page } }) => ({ page }),
  loader: ({ context, deps }) => {
    const page = deps.page || 1;

    const resultSource = context.client.query(GetHomePageDataQuery, {
      offset: (page - 1) * 10,
      take: page * 10,
    });

    return mapResultSourseToPromise(resultSource);
  },
});
