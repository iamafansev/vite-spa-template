import { createLazyRoute } from "@tanstack/react-router";

import { routeApi } from "./config/routeApi";
import { HomePage } from "./ui/HomePage";

export const Route = createLazyRoute(routeApi.id)({
  component: HomePage,
});
