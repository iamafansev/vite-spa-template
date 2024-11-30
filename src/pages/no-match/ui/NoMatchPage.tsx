import type { FC } from "react";
import { Link as LinkRRD } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Link } from "@/shared/ui";
import { ROUTES } from "@/shared/router";

export const NoMatchPage: FC = () => {
  const { t } = useTranslation("notMatchRoute");

  return (
    <div id="error-page" className="flex flex-col items-center pt-32">
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
      <Link asChild>
        <LinkRRD to={ROUTES.$buildPath({})}>Go home</LinkRRD>
      </Link>
    </div>
  );
};

NoMatchPage.displayName = "NoMatchPage";
