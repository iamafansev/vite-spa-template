import { forwardRef } from "react";
import type { FC, LinkHTMLAttributes } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/lib/cn";

const variants = cva("underline", {
  variants: {
    variant: {
      default: "text-blue-700 underline",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface Props
  extends LinkHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof variants> {
  asChild?: boolean;
}

export const Link: FC<Props> = forwardRef<HTMLAnchorElement, Props>(
  ({ asChild, className, variant, ...rest }, ref) => {
    const Comp = asChild ? Slot : "a";

    return (
      <Comp
        {...rest}
        className={cn(variants({ variant, className }))}
        ref={ref}
      />
    );
  }
);
