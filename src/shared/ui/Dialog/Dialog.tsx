import { FC, PropsWithChildren, forwardRef, useMemo } from "react";
import { X } from "lucide-react";

import { cn } from "@/shared/lib";
import { detectCSSFeature } from "@/shared/lib";

import { Button } from "../Button/Button";

import styles from "./Dialog.module.css";

const Header: FC = () => {
  return (
    <header className="flex flex-row w-full">
      <form method="dialog" className="ml-auto">
        <Button variant="ghost">
          <X />
        </Button>
      </form>
    </header>
  );
};

const Container: FC<PropsWithChildren> = ({ children }) => {
  return <div className="px-6 pt-4 pb-6">{children}</div>;
};

type Props = {
  className?: string;
};

export const Dialog = forwardRef<HTMLDialogElement, PropsWithChildren<Props>>(
  ({ children, className }, ref) => {
    // Checking if animation can be used to smoothly close a dialog
    const supportedDisplayAnimation = useMemo(
      () => detectCSSFeature("transition-behavior"),
      []
    );

    return (
      <dialog
        ref={ref}
        className={cn(
          className,
          supportedDisplayAnimation ? styles.dialogNew : styles.dialog
        )}
      >
        <Container>
          <Header />
          {children}
        </Container>
      </dialog>
    );
  }
);
