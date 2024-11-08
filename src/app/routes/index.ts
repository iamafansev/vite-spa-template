import type { RouteObject } from "react-router-dom";

export const routes: RouteObject[] = [
    {
        path: "/",
        lazy: () => import("@/pages/Root"),
    },
];
