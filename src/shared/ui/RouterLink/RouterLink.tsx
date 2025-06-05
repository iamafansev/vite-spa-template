import { forwardRef } from "react";
import { createLink, LinkComponent } from "@tanstack/react-router";
import { Link as UILink, LinkProps as UILinkProps } from "@heroui/react";

type UILinkComponentProps = {} & Omit<UILinkProps, "href">;

const UILinkComponent = forwardRef<HTMLAnchorElement, UILinkComponentProps>(
  (props, ref) => {
    return <UILink ref={ref} {...props} />;
  }
);

const CreatedLinkComponent = createLink(UILinkComponent);

export const RouterLink: LinkComponent<typeof UILinkComponent> = (props) => {
  return <CreatedLinkComponent preload={"intent"} {...props} />;
};
