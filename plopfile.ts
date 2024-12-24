import { NodePlopAPI } from "plop";

export default function (plop: NodePlopAPI) {
  plop.setGenerator("page", {
    description: "create application page",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "page name please",
      },
      {
        type: "input",
        name: "route",
        message: "page route please",
      },
    ],
    actions: [
      {
        type: "addMany",
        destination: "public/locales/",
        templateFiles: ["plop-templates/locales/addPageLocales/**/*.hbs"],
        base: "plop-templates/locales/addPageLocales",
      },
      {
        type: "modify",
        path: "src/@types/i18next.d.ts",
        pattern:
          "/* THIS IS A PLACEHOLDER FOR APPEND IMPORT LOCALE BY THE GENERATOR. DO NOT DELETE! */",
        templateFile:
          "plop-templates/locales/appendPageLocaleImportDefenitions.hbs",
      },
      {
        type: "modify",
        path: "src/@types/i18next.d.ts",
        pattern:
          "/* THIS IS A PLACEHOLDER FOR APPEND LOCALE BY THE GENERATOR. DO NOT DELETE! */",
        templateFile: "plop-templates/locales/appendPageLocaleDefenitions.hbs",
      },
      {
        type: "add",
        path: "src/routes/_auth.{{route}}.tsx",
        templateFile: "plop-templates/route/addRoute.hbs",
      },
      {
        type: "addMany",
        destination: "src/pages/{{name}}",
        templateFiles: ["plop-templates/page/**/*.hbs"],
        base: "plop-templates/page",
      },
    ],
  });
}
