import type { FC } from "react";
import { NavLink as NavLinkRRD, type NavLinkProps } from "react-router-dom";

type Props = NavLinkProps & {};

export const Link: FC<Props> = (props) => {
    return <NavLinkRRD {...props} />;
};
