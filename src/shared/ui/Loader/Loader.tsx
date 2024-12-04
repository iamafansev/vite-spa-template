import type { FC, HTMLAttributes } from "react";
import { Loader2 } from "lucide-react";

import { cn } from "@/shared/utils";

interface Props extends HTMLAttributes<HTMLDivElement> {
  size?: number;
  valueNow?: number;
  valueMin?: number;
  valueMax?: number;
}

export const Loader: FC<Props> = ({
  size = 32,
  valueNow,
  valueMin,
  valueMax,
  className,
  ...rest
}) => {
  return (
    <div
      className={cn(
        "flex flex-1 flex-col items-center justify-center",
        className
      )}
      {...rest}
    >
      {/* biome-ignore lint/a11y/useFocusableInteractive: <explanation> */}
      <span
        role="progressbar"
        aria-valuenow={valueNow}
        aria-valuemin={valueMin}
        aria-valuemax={valueMax}
      >
        <Loader2 size={size} className="animate-spin" />
      </span>
    </div>
  );
};
