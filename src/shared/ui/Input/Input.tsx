import { forwardRef, ComponentProps, useState, useEffect } from "react";

import { cn } from "@/lib/utils";

interface InputProps extends ComponentProps<"input"> {
  initialValue?: string;
}

function useControlledValue<T>(
  controlledValue: T | undefined,
  initialValue: T
) {
  const [value, setValue] = useState<T>(
    controlledValue !== undefined ? controlledValue : initialValue
  );

  useEffect(() => {
    if (controlledValue !== undefined) {
      setValue(controlledValue);
    }
  }, [controlledValue]);

  return [value, setValue] as const;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, onChange, value, initialValue, ...props }, ref) => {
    const [internalValue, setInternalValue] = useControlledValue(
      value,
      initialValue || ""
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e);
      } else {
        setInternalValue(e.target.value);
      }
    };

    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        value={value !== undefined ? value : internalValue}
        onChange={handleChange}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
