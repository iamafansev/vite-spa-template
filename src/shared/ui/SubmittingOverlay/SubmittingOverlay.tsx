import { type PropsWithChildren, type HTMLAttributes, forwardRef } from "react";

import { cn } from "@/shared/lib";

import { Loader } from "../Loader/Loader";

interface Props extends HTMLAttributes<HTMLDivElement>, PropsWithChildren {}

const SubmittingOverlay = forwardRef<HTMLDivElement, Props>(
  ({ children, className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("pointer-events-none relative select-none", className)}
        {...rest}
      >
        <div
          className={cn(
            "absolute",
            "inset-0",
            "flex",
            "justify-center",
            "overflow-hidden",
            "z-[1000]",
            "items-center"
          )}
        >
          <Loader className="z-10" />
          <div
            className={cn(
              "absolute",
              "inset-0",
              "backdrop-blur-sm",
              "bg-background/10"
            )}
          />
        </div>
        {children}
      </div>
    );
  }
);

export { SubmittingOverlay };
