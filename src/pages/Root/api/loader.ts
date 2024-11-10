import { makeLoader } from "react-router-typesafe";

export const loader = makeLoader(() => {
    return {};
});

export type Data = typeof loader;
