import { mapResultSourseToPromise } from "@/shared/api/utils";
import { makeLoaderByPath } from "@/shared/lib";

import { GetHomePageDataQuery } from "./queries";
import { routeApi } from "../config/routeApi";

const makeLoader = makeLoaderByPath<typeof routeApi.id>();

export const loader = makeLoader(async ({ context, search }) => {
  const page = search.page || 1;

  const resultSource = context.client.query(GetHomePageDataQuery, {
    offset: (page - 1) * 10,
    take: page * 10,
  });

  return mapResultSourseToPromise(resultSource);
});
