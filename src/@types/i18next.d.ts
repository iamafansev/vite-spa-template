import app from "../../public/locales/en/app.json";
import home from "../../public/locales/en/home.json";
import login from "../../public/locales/en/login.json";
import notMatchRoute from "../../public/locales/en/notMatchRoute.json";

type Resources = {
  app: typeof app;
  home: typeof home;
  login: typeof login;
  notMatchRoute: typeof notMatchRoute;
};

declare module "i18next" {
  interface CustomTypeOptions {
    resources: Resources;
  }
}
