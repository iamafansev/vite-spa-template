import app from "../../public/locales/en/app.json";
import notMatchRoute from "../../public/locales/en/no-match.json";
import homePage from "../../public/locales/en/home-page.json";
import loginPage from "../../public/locales/en/login-page.json";
/* THIS IS A PLACEHOLDER FOR APPEND IMPORT LOCALE BY THE GENERATOR. DO NOT DELETE! */

type Resources = {
  app: typeof app;
  notMatchRoute: typeof notMatchRoute;
  "home-page": typeof homePage;
  "login-page": typeof loginPage;
  /* THIS IS A PLACEHOLDER FOR APPEND LOCALE BY THE GENERATOR. DO NOT DELETE! */
};

declare module "i18next" {
  interface CustomTypeOptions {
    resources: Resources;
  }
}
