import { Link as LinkRRD } from "react-router-dom";

import { Link } from "@/shared/ui";
import { ROUTES } from "@/shared/routes";

export const NoMatchPage = () => {
    return (
        <div id="error-page" className="flex flex-col items-center pt-32">
            <h1>Oops!</h1>
            <p>Not found</p>
            <Link asChild>
                <LinkRRD to={ROUTES.$buildPath({})}>Go home</LinkRRD>
            </Link>
        </div>
    );
};

NoMatchPage.displayName = "NoMatchPage";
