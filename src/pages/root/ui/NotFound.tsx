import type { FC } from "react";
import { Link as LinkRR } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { Link } from "@/shared/ui";

export const NoFound: FC = () => {
  const { t } = useTranslation("notMatchRoute");

  return (
    <div id="error-page" className="flex flex-col items-center pt-32">
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
      <Link asChild>
        <LinkRR to="/">Go home</LinkRR>
      </Link>
    </div>
  );
};
