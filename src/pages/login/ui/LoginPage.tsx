import { useActionState } from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Button, Input } from "@heroui/react";

import { sleep } from "@/shared/lib";
import { LoadingOverlay } from "@/shared/ui";

import { routeApi } from "../config/routeApi";

type FormState = {
  data: { login: string };
};

export const LoginPage = () => {
  const { t } = useTranslation("login-page");
  const navigate = useNavigate();
  const { redirect } = routeApi.useSearch();

  const isLoading = useRouterState({
    select: (state) => state.isLoading,
  });

  const [, action, isPending] = useActionState(
    async (prevState: FormState, formData: FormData) => {
      const login = formData.get("login");

      if (!login || typeof login !== "string") {
        return prevState;
      }

      await sleep(1000);

      localStorage.setItem("login", login);
      navigate({ to: redirect, replace: true });

      return { data: { login } };
    },
    { data: { login: "" } }
  );

  return (
    <LoadingOverlay className="static" processing={isLoading}>
      <section className="flex flex-col items-center pt-32">
        <h1 className="font-bold text-4xl">{t("title")}</h1>
        <form className="flex flex-col mt-10 text-center" action={action}>
          <Input
            id="login"
            name="login"
            label="Login"
            isDisabled={isPending}
            size="sm"
          />
          <Button type="submit" className="mt-6" isLoading={isPending}>
            Submit
          </Button>
        </form>
      </section>
    </LoadingOverlay>
  );
};
