import type { RouteObject } from "react-router-dom";

import { ROUTES } from "@/shared/routes";

export const routes: RouteObject[] = [
  {
    path: ROUTES.$path(),
    lazy: () => import("@/pages/rootLayout"),
    children: [
      {
        index: true,
        lazy: () => import("@/pages/home"),
      },
      {
        path: "*",
        lazy: () => import("@/pages/no-match"),
      },
    ],
  },
];
