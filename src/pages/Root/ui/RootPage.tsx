import { Outlet, useNavigation } from "react-router-dom";
import { useLoaderData } from "react-router-typesafe";

import { PageLoader } from "@/shared/ui";

import type { Data } from "../api/loader";

export const RootPage = () => {
    useLoaderData<Data>();
    const navigation = useNavigation();

    switch (navigation.state) {
        case "loading":
            return <PageLoader />;
        case "idle":
        case "submitting":
            return <Outlet />;
    }
};

RootPage.displayName = "RootPage";
