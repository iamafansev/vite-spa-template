import type { Router } from "@/app/router";

declare module "@tanstack/react-router" {
  interface Register {
    router: Router;
  }
}
