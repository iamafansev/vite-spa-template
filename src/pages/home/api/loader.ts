import { makeLoader } from "react-router-typesafe";

import { makeResult } from "@/shared/api/utils";

import { GetHomePageDataQuery } from "./queries";

export const loader = makeLoader(async (_, context) => {
  const resultSource = context.client.query(GetHomePageDataQuery, {});

  return makeResult(resultSource);
});

export type Data = typeof loader;
