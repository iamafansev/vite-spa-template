import { createFileRoute, redirect } from "@tanstack/react-router";

import { LoginPage } from "@/pages/login";
import { FullHeightLoader } from "@/shared/ui";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  pendingComponent: FullHeightLoader,
  beforeLoad: ({ context }) => {
    if (context.ability.can("read", "all")) {
      throw redirect({
        to: "/",
        replace: true,
      });
    }
  },
  validateSearch: (search: Record<string, unknown>): { redirect: string } => {
    return {
      redirect: typeof search?.redirect === "string" ? search?.redirect : "/",
    };
  },
});
