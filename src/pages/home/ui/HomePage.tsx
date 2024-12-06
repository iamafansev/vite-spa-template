import { FC, PropsWithChildren, useCallback } from "react";
import {
  useRouter,
  Link as LinkRR,
  useRouterState,
} from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { Button, SubmittingOverlay } from "@/shared/ui";

import { routeApi } from "../config/routeApi";

const Overlay: FC<PropsWithChildren> = ({ children }) => {
  const isLoading = useRouterState({
    select: (state) => state.isLoading,
  });
  const { isFetching } = routeApi.useMatch();

  return isFetching || isLoading ? (
    <SubmittingOverlay className="static">{children}</SubmittingOverlay>
  ) : (
    children
  );
};

export const HomePage = () => {
  const { t } = useTranslation("home");

  const router = useRouter();
  const data = routeApi.useLoaderData();

  const search = routeApi.useSearch();

  const currentPage = search.page || 1;

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
        <h1 className="font-bold text-4xl">{t("title")}</h1>
        <ul className="mt-10">
          {data.getAllPokemon.map(({ key }, index) => (
            <li key={key}>
              {index + 1}: {key}
            </li>
          ))}
        </ul>
        <Button asChild className="my-4">
          <LinkRR to="/" search={{ page: currentPage + 1 }}>
            {t("fetchMore")}
          </LinkRR>
        </Button>
        <Button type="button" onClick={refetchData} className="my-4">
          reload data
        </Button>
      </section>
    </Overlay>
  );
};
