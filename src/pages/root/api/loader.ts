import { makeLoader } from "@/shared/router";

export const loader = makeLoader(() => {
  return Promise.resolve({});
});

export type Data = typeof loader;
