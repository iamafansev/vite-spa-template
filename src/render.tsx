import { createRoot } from "react-dom/client";

import { App } from "@/app";

export const render = (container: HTMLElement) => {
    const root = createRoot(container);

    root.render(<App />);
};
