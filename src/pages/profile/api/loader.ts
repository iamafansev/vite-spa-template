import { sleep } from "@/shared/utils";
import { makeLoaderByPath } from "@/shared/lib";

import { routeApi } from "../config/routeApi";

const makeLoader = makeLoaderByPath<typeof routeApi.id>();

export const loader = makeLoader(async () => {
  await sleep(500);

  return {
    userLogin: localStorage.getItem("login"),
  };
});
