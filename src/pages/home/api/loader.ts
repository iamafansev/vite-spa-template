import { makeLoader } from "react-router-typesafe";

import { sleep } from "@/shared/utils";

import ExampleQuery from "./model.graphql";

export const loader = makeLoader(async (_params) => {
    await sleep(500);
    return { title: "Root" };
});

export type Data = typeof loader;
