import type { FC } from "react";

import { Loader } from "@/shared/ui";

export const PageLoader: FC = () => {
    return (
        <div className="flex flex-1 flex-col items-center justify-center">
            <Loader />
        </div>
    );
};
