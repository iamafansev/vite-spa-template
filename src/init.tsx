import { initI18n } from "@/entities/i18n";

import { render } from "./render";

const container = document.getElementById("root") as HTMLElement;

initI18n().then(() => {
  render(container);
});
