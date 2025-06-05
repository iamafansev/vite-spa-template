import type { FC } from "react";
import { useTranslation } from "react-i18next";

import { RouterLink } from "@/shared/ui";

export const NoFound: FC = () => {
  const { t } = useTranslation("notMatchRoute");

  return (
    <div id="error-page" className="flex flex-col items-center pt-32">
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
      <RouterLink to="/">Go home</RouterLink>
    </div>
  );
};
