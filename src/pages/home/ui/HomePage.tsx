import { FC, PropsWithChildren, useCallback } from "react";
import { useRouter } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { Button, SubmittingOverlay } from "@/shared/ui";

import { routeApi } from "../routeApi";

import LogoIcon from "./vite.svg?react";

const Overlay: FC<PropsWithChildren> = ({ children }) => {
  const { isFetching } = routeApi.useMatch();

  return isFetching ? (
    <SubmittingOverlay className="static">{children}</SubmittingOverlay>
  ) : (
    children
  );
};

export const HomePage = () => {
  const { t } = useTranslation("home");

  const router = useRouter();
  const data = routeApi.useLoaderData();

  const refetchData = useCallback(() => {
    router.invalidate({
      filter: (value) => {
        return value.id === routeApi.id;
      },
    });
  }, [router]);

  return (
    <Overlay>
      <section className="flex flex-col items-center pt-32">
        <LogoIcon />
        <h1 className="font-bold text-4xl">{t("title")}</h1>
        <ul className="mt-10">
          {data.getAllPokemon.map(({ key }) => (
            <li key={key}>{key}</li>
          ))}
        </ul>
        <Button type="button" onClick={refetchData} className="my-4">
          reload data
        </Button>
      </section>
    </Overlay>
  );
};
