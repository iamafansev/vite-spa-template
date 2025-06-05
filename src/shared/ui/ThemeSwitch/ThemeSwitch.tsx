import { VisuallyHidden, useSwitch, SwitchProps } from "@heroui/react";
import { Sun, Moon } from "lucide-react";

export type ThemeSwitchProps = {} & SwitchProps;

export const ThemeSwitch = (props: ThemeSwitchProps) => {
  const {
    Component,
    slots,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps,
  } = useSwitch(props);

  return (
    <div className="flex flex-col gap-2">
      <Component {...getBaseProps()}>
        <VisuallyHidden>
          <input {...getInputProps()} />
        </VisuallyHidden>
        <div
          {...getWrapperProps()}
          className={slots.wrapper({
            class: [
              "w-8 h-8",
              "flex items-center justify-center",
              "rounded-lg bg-default-100 hover:bg-default-200",
            ],
          })}
        >
          {isSelected ? <Sun size={16} /> : <Moon size={16} />}
        </div>
      </Component>
    </div>
  );
};
