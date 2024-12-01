import { mapResultSourseToPromise } from "@/shared/api/utils";

import { RouterContext } from "@/shared/router";
import { GetHomePageDataQuery } from "./queries";

export const loader = async (context: RouterContext) => {
  const resultSource = context.client.query(GetHomePageDataQuery, {});

  return mapResultSourseToPromise(resultSource);
};
