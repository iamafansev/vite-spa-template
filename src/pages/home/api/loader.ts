import { makeLoader } from "react-router-typesafe";

import { sleep } from "@/shared/utils";

export const loader = makeLoader(async () => {
  await sleep(500);
  return { title: "Root" };
});

export type Data = typeof loader;
