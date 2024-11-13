import { makeLoader } from "react-router-typesafe";

import { sleep } from "@/shared/utils";

export const loader = makeLoader(async (_params, context) => {
    await sleep(500);
    return context.client({ title: "Root" });
});

export type Data = typeof loader;
