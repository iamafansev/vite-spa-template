import { StrictMode } from "react";
import { HelmetProvider } from "react-helmet-async";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ThemeProvider } from "@/entities/theme";
import { PageLoader } from "@/shared/ui";

import { routes } from "./routes";
import "./entry.css";

const ROUTER_FUTURE = {
    v7_startTransition: true,
};

const ROUTES_FUTURE = {
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_skipActionErrorRevalidation: true,
};

export type HandlerContext = Readonly<{
    // identityFN for example
    client: <T>(value: T) => T;
}>;

const getClient = () => {
    // Replace with a real API client
    return <T,>(value: T): T => {
        return value;
    };
};

export const App = () => {
    const client = getClient();

    const router = createBrowserRouter(routes, {
        future: ROUTES_FUTURE,
        dataStrategy: async ({ matches }) => {
            const context: HandlerContext = {
                client,
            };

            // Run loaders in parallel with the `context` value
            const matchesToLoad = matches.filter((m) => m.shouldLoad);

            const results = await Promise.all(
                matchesToLoad.map((match) =>
                    match.resolve((handler) => {
                        // Whatever you pass to `handler` will be passed as the 2nd parameter to your loader/action
                        return handler(context);
                    }),
                ),
            );

            return results.reduce(
                (acc, result, i) =>
                    Object.assign(acc, {
                        [matchesToLoad[i].route.id]: result,
                    }),
                {},
            );
        },
    });

    return (
        <StrictMode>
            <HelmetProvider>
                <ThemeProvider>
                    <RouterProvider future={ROUTER_FUTURE} fallbackElement={<PageLoader />} router={router} />
                </ThemeProvider>
            </HelmetProvider>
        </StrictMode>
    );
};
