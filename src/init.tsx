import { createRoot } from "react-dom/client";

import { App } from "@/app";
import { initI18n } from "@/entities/i18n";

export const init = () => {
  initI18n().then(() => {
    const container = document.getElementById("root") as HTMLElement;
    const root = createRoot(container);
    root.render(<App />);
  });
};
