import { Link as LinkRR } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { Link, Button } from "@/shared/ui";

import { useTheme } from "@/entities/theme";

import { routeApi } from "../routeApi";

import LogoIcon from "./vite.svg?react";
import { useCallback } from "react";

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
      <ul>
        {data.getAllPokemon.map(({ key }) => (
          <li key={key}>{key}</li>
        ))}
      </ul>
    </section>
  );
};

HomePage.displayName = "HomePage";
