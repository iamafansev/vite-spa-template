import { makeLoader } from "react-router-typesafe";

import { mapResultSourseToPromise } from "@/shared/api/utils";

import { GetHomePageDataQuery } from "./queries";

export const loader = makeLoader(async (_, context) => {
  const resultSource = context.client.query(GetHomePageDataQuery, {});

  return mapResultSourseToPromise(resultSource);
});

export type Data = typeof loader;
