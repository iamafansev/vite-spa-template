import {
  useCallback,
  useState,
  ChangeEventHandler,
  FormEventHandler,
} from "react";
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import { Button } from "@/shared/ui";

import { routeApi } from "../routeApi";

export const LoginPage = () => {
  const { t } = useTranslation("login");
  const navigate = useNavigate();
  const { redirect } = routeApi.useSearch();

  const [loginValue, setLoginValue] = useState("");

  const onChangeLogin = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      setLoginValue(event.target.value);
    },
    []
  );

  const submitForm = useCallback<FormEventHandler>(
    (event) => {
      event.preventDefault();
      localStorage.setItem("login", loginValue);
      navigate({ to: redirect, replace: true });
    },
    [loginValue, redirect, navigate]
  );

  return (
    <section className="flex flex-col items-center pt-32">
      <h1 className="font-bold text-4xl">{t("title")}</h1>
      <form className="flex flex-col mt-10 text-center" onSubmit={submitForm}>
        <label className="flex flex-col text-left">
          {t("loginLabel")}
          <input
            id="login"
            name="login"
            onChange={onChangeLogin}
            value={loginValue}
          />
        </label>
        <Button type="submit" className="mt-4">
          {t("submit")}
        </Button>
      </form>
    </section>
  );
};
