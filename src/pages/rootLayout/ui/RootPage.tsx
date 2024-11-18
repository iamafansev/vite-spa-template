import { Outlet, useNavigation, ScrollRestoration } from "react-router-dom";
import { useLoaderData } from "react-router-typesafe";

import { PageLoader, SubmittingOverlay } from "@/shared/ui";

import type { Data } from "../api/loader";

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
