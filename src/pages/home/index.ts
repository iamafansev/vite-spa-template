import { createLazyRoute } from "@tanstack/react-router";

import { routeApi } from "./routeApi";
import { HomePage } from "./ui/HomePage";

export const Route = createLazyRoute(routeApi.id)({
  component: HomePage,
});
