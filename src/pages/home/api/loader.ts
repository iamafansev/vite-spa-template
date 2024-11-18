import { makeLoader } from "react-router-typesafe";

import { GetHomePageDataQuery } from "./queries";

export const loader = makeLoader(async (_, context) => {
  return context.client.query(GetHomePageDataQuery, {});
});

export type Data = typeof loader;
