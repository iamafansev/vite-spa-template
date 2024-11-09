import { Link } from "@/shared/ui";
import { ROUTES } from "@/shared/routes";

export const NoMatchPage = () => {
    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Not found</p>
            <Link to={ROUTES.$buildPath({})}>Go home</Link>
        </div>
    );
};

NoMatchPage.displayName = "NoMatchPage";
