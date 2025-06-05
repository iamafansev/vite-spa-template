import { type PropsWithChildren, type HTMLAttributes, forwardRef } from "react";
import { CircularProgress } from "@heroui/react";

import { cn } from "../../lib/cn";

export interface LoadingOverlayProps
  extends HTMLAttributes<HTMLDivElement>,
    PropsWithChildren {
  processing?: boolean;
}

const LoadingOverlay = forwardRef<HTMLDivElement, LoadingOverlayProps>(
  ({ children, className, processing = true, ...rest }, ref) => {
    if (!processing) {
      return children;
    }

    return (
      <div
        ref={ref}
        className={cn("pointer-events-none relative select-none", className)}
        {...rest}
      >
        <div className="absolute inset-0 flex justify-center overflow-hidden z-1000 items-center">
          <CircularProgress className="z-10" label="Loading" />
          <div className="absolute inset-0 backdrop-blur-xs bg-background/10" />
        </div>
        {children}
      </div>
    );
  }
);

LoadingOverlay.displayName = "LoadingOverlay";

export { LoadingOverlay };
