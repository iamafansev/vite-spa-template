import { Link as LinkRR, useRouter } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { Link, Button } from "@/shared/ui";
import { useTheme } from "@/entities/theme";

import { routeApi } from "../routeApi";

import LogoIcon from "./vite.svg?react";
import { useCallback } from "react";

const RefetchButton = () => {
  const router = useRouter();
  const { isFetching } = routeApi.useMatch();

  const refetchData = useCallback(() => {
    router.invalidate({
      filter: (value) => {
        return value.id === routeApi.id;
      },
    });
  }, [router]);

  return (
    <Button
      type="button"
      onClick={refetchData}
      loading={Boolean(isFetching)}
      className="my-4"
    >
      reload data
    </Button>
  );
};

export const HomePage = () => {
  const { t } = useTranslation("home");
  const { theme, setTheme } = useTheme();

  const data = routeApi.useLoaderData();

  const toggleTheme = useCallback(() => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }, [theme, setTheme]);

  return (
    <section className="flex flex-col items-center pt-32">
      <LogoIcon />
      <h1 className="font-bold text-4xl">{t("title")}</h1>
      <div className="mt-10 text-center">
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <Link asChild>
          <LinkRR to="/" className="underline">
            go to home page
          </LinkRR>
        </Link>
      </div>
      <Button type="button" onClick={toggleTheme} className="my-4">
        toggle theme
      </Button>
      <RefetchButton />
      <ul>
        {data.getAllPokemon.map(({ key }) => (
          <li key={key}>{key}</li>
        ))}
      </ul>
    </section>
  );
};
