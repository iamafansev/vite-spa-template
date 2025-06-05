import { type FC, useCallback } from "react";
import { ErrorComponentProps, useRouter } from "@tanstack/react-router";
import { Button } from "@heroui/react";

import { isError, isResponseError } from "@/shared/lib";

export const ErrorBoundary: FC<ErrorComponentProps> = ({ error }) => {
  const router = useRouter();

  const refetch = useCallback(() => {
    return router.invalidate();
  }, [router]);

  if (isResponseError(error)) {
    switch (error.status) {
      case 404:
        return (
          <div className="flex flex-col items-center pt-32">
            <h1 className="text-4xl">Oops!</h1>
            <p>Not found</p>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center pt-32">
            <h1 className="text-4xl">Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <code>{error.statusText}</code>
            <Button type="button" onClick={refetch} className="mt-6">
              refetch
            </Button>
          </div>
        );
    }
  }

  if (isError(error)) {
    return (
      <div className="flex flex-col items-center pt-32">
        <h1 className="text-4xl">Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <code>{error.message}</code>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center pt-32">
      <h1 className="text-4xl">Somthing went wrong</h1>
      <Button type="button" onPress={refetch} className="mt-6">
        refetch
      </Button>
    </div>
  );
};
