import { makeLoader } from "react-router-typesafe";

export const loader = makeLoader(() => {
    return Promise.resolve({});
});

export type Data = typeof loader;
