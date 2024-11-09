import type { RouteObject } from "react-router-dom";

import { ROUTES } from "@/shared/routes";

export const routes: RouteObject[] = [
    {
        path: ROUTES.$path(),
        lazy: () => import("@/pages/root"),
        // Issue https://github.com/remix-run/react-router/issues/12249
        HydrateFallback: () => null,
    },
];
