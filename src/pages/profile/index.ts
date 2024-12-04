import { createLazyRoute } from "@tanstack/react-router";

import { routeApi } from "./routeApi";
import { ProfilePage } from "./ui/ProfilePage";

export const Route = createLazyRoute(routeApi.id)({
  component: ProfilePage,
});
