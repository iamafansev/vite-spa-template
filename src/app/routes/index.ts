import type { RouteObject } from "react-router-dom";

export const routes: RouteObject[] = [
    {
        path: "/",
        lazy: () => import("@/pages/Root"),
        // Issue https://github.com/remix-run/react-router/issues/12249
        HydrateFallback: () => null,
    },
];
