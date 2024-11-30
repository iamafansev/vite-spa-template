import { makeLoader } from "@/shared/router";
import { mapResultSourseToPromise } from "@/shared/api/utils";
import { sleep } from "@/shared/utils";

import { GetHomePageDataQuery } from "./queries";

export const loader = makeLoader(async (_, context) => {
  await sleep(2500);
  const resultSource = context.client.query(GetHomePageDataQuery, {});

  return mapResultSourseToPromise(resultSource);
});

export type Data = typeof loader;
