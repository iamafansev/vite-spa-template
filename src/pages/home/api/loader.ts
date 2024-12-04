import { mapResultSourseToPromise } from "@/shared/api/utils";

import { RouterContext } from "@/app/router/routes";
import { sleep } from "@/shared/utils";

import { GetHomePageDataQuery } from "./queries";

export const loader = async (context: RouterContext) => {
  await sleep(1000);
  const resultSource = context.client.query(
    GetHomePageDataQuery,
    {},
    { requestPolicy: "network-only" }
  );

  return mapResultSourseToPromise(resultSource);
};
