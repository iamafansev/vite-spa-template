import { FC, useCallback } from "react";
import { useFormStatus } from "react-dom";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { Button, SubmittingOverlay } from "@/shared/ui";

import { routeApi } from "../config/routeApi";
import { sleep } from "@/shared/lib";

const LoginFormContent: FC = () => {
  const { pending } = useFormStatus();

  return (
    <>
      <label className="flex flex-col text-left">
        Login
        <input id="login" name="login" disabled={pending} />
      </label>
      <Button type="submit" className="mt-4" loading={pending}>
        Submit
      </Button>
    </>
  );
};

export const LoginPage = () => {
  const { t } = useTranslation("login-page");
  const navigate = useNavigate();
  const { redirect } = routeApi.useSearch();

  const isLoading = useRouterState({
    select: (state) => state.isLoading,
  });

  const loginAction = useCallback(
    async (formData: FormData) => {
      const login = formData.get("login");

      if (!login || typeof login !== "string") {
        return;
      }

      await sleep(1000);

      localStorage.setItem("login", login);
      navigate({ to: redirect, replace: true });
    },
    [redirect, navigate]
  );

  return (
    <SubmittingOverlay className="static" processing={isLoading}>
      <section className="flex flex-col items-center pt-32">
        <h1 className="font-bold text-4xl">{t("title")}</h1>
        <form className="flex flex-col mt-10 text-center" action={loginAction}>
          <LoginFormContent />
        </form>
      </section>
    </SubmittingOverlay>
  );
};
