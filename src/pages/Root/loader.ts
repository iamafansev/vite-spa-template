import {makeLoader} from "react-router-typesafe";

export const loader = makeLoader(() => {
    return {title: 'Root'};
});

export type Data = typeof loader;