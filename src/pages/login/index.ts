import { createLazyRoute } from "@tanstack/react-router";

import { routeApi } from "./routeApi";
import { LoginPage } from "./ui/LoginPage";

export const Route = createLazyRoute(routeApi.id)({
  component: LoginPage,
});
