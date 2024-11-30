import {
  Outlet,
  useNavigation,
  ScrollRestoration,
  useLoaderData,
} from "react-router-dom";

import { PageLoader, SubmittingOverlay } from "@/shared/ui";

import type { Data } from "../api/loader";

export function HydrateFallback() {
  return <p>Loading Game...</p>;
}

export const RootPage = () => {
  useLoaderData<Data>();
  const navigation = useNavigation();

  switch (navigation.state) {
    case "idle":
      return (
        <div>
          <Outlet />
          <ScrollRestoration />
        </div>
      );
    case "loading":
      return <PageLoader />;
    case "submitting":
      return (
        <SubmittingOverlay>
          <Outlet />
        </SubmittingOverlay>
      );
  }
};
