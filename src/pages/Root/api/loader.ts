import { makeLoader } from "react-router-typesafe";

export const loader = makeLoader((_, context) => {
    return context.client(Promise.resolve({}));
});

export type Data = typeof loader;
