import { NavLink } from "@/shared/ui";
import { ROUTES } from "@/shared/routes";

export const NoMatchPage = () => {
    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Not found</p>
            <NavLink to={ROUTES.$buildPath({})}>Go home</NavLink>
        </div>
    );
};

NoMatchPage.displayName = "NoMatchPage";
