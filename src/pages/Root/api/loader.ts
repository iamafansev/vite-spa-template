import { makeLoader } from "react-router-typesafe";

export const loader = makeLoader(async () => {
    return {};
});

export type Data = typeof loader;
