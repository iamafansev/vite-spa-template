import type { RouteObject } from "react-router-dom";

import { ROUTES } from "@/shared/routes";

export const routes: RouteObject[] = [
    {
        path: ROUTES.$path(),
        lazy: () => import("@/pages/root"),
    },
    {
        path: "*",
        lazy: () => import("@/pages/no-match"),
    },
];
