import { useRouteError, isRouteErrorResponse } from "react-router-dom";

import { isError } from "@/shared/lib";

export const ErrorBoundary = () => {
    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
        switch (error.status) {
            case 404:
                return (
                    <div id="error-page">
                        <h1>Oops!</h1>
                        <p>Not found</p>
                    </div>
                );
            default:
                return (
                    <div id="error-page">
                        <h1>Oops!</h1>
                        <p>Sorry, an unexpected error has occurred.</p>
                        <p>
                            <i>{error.statusText}</i>
                        </p>
                    </div>
                );
        }
    }

    if (isError(error)) {
        return (
            <div id="error-page">
                <h1>Oops!</h1>
                <p>Sorry, an unexpected error has occurred.</p>
                <p>
                    <i>{error.message}</i>
                </p>
            </div>
        );
    }
};

ErrorBoundary.displayName = "ErrorBoundary";
