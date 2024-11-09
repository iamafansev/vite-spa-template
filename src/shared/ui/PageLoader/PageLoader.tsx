import type { FC } from "react";
import { Loader2 } from "lucide-react";

export const PageLoader: FC = () => {
    return <Loader2 className="animate-spin" />;
};
