import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";

import { cn } from "@/shared/utils/cn";

/**
 * Generates a set of class names for a button component based on the provided variant and size.
 *
 * @param variant - An object containing the following properties:
 *   - `variant`: Defines the visual style of the button. Possible values are:
 *     - `default`: Primary button style with background and foreground colors.
 *     - `destructive`: Destructive button style with background and foreground colors.
 *     - `outline`: Button with a border and background color that changes on hover.
 *     - `secondary`: Secondary button style with background and foreground colors.
 *     - `ghost`: Button with no background, changes color on hover.
 *     - `link`: Button styled as a text link with underline on hover.
 *   - `size`: Defines the size of the button. Possible values are:
 *     - `default`: Default size with height, padding, and rounded corners.
 *     - `sm`: Small size with reduced height, padding, and rounded corners.
 *     - `lg`: Large size with increased height, padding, and rounded corners.
 *     - `icon`: Icon size with equal height and width.
 * @returns A string of class names to be applied to the button component.
 */
const variants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof variants> {
  asChild?: boolean;
  loading?: boolean;
}

/**
 * A button component that supports different variants, sizes, and loading state.
 * It can also render a custom component instead of a button element if `asChild` is true.
 *
 * @param {Object} props - The properties object.
 * @param {string} [props.className] - Additional class names to apply to the button.
 * @param {VariantProps<typeof variants>['variant']} [props.variant] - The variant of the button (e.g., primary, secondary).
 * @param {VariantProps<typeof variants>['size']} [props.size] - The size of the button (e.g., small, medium, large).
 * @param {boolean} [props.asChild=false] - If true, renders a custom component instead of a button element.
 * @param {boolean} [props.loading] - If true, shows a loading spinner instead of the button content.
 * @param {React.ReactNode} props.children - The content to display inside the button.
 * @param {React.Ref<HTMLButtonElement>} ref - The ref to be forwarded to the button element.
 * @returns {JSX.Element} The rendered button component.
 */
export const Button = React.forwardRef<HTMLButtonElement, Props>(
  (
    { className, variant, size, asChild = false, loading, children, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        disabled={loading}
        className={cn(variants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {loading ? (
          <span
            role="progressbar"
            aria-valuenow={0}
            aria-valuemin={0}
            aria-valuemax={10}
          >
            <Loader2 className="animate-spin" />
          </span>
        ) : (
          children
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";
