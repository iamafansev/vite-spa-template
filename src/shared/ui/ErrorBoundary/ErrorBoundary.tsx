import { useRouteError, isRouteErrorResponse, useRevalidator } from "react-router-dom";

import { isError } from "@/shared/lib";

import { Button } from "../Button/Button";

export const ErrorBoundary = () => {
    const error = useRouteError();
    const revalidator = useRevalidator();

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
                            <Button
                                type="button"
                                loading={revalidator.state === "loading"}
                                onClick={revalidator.revalidate}
                            >
                                refetch
                            </Button>
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
