import { StrictMode } from "react";
import { HelmetProvider } from "react-helmet-async";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { PageLoader } from "@/shared/ui";

import { routes } from "./routes";
import "./entry.css";

const router = createBrowserRouter(routes, {
    future: {
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_skipActionErrorRevalidation: true,
    },
});

export const App = () => {
    return (
        <StrictMode>
            <HelmetProvider>
                <RouterProvider fallbackElement={<PageLoader />} router={router} />
            </HelmetProvider>
        </StrictMode>
    );
};
