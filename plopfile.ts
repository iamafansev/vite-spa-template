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
        destination: "src/pages/{{name}}",
        templateFiles: ["plop-templates/page/**/*.hbs"],
        base: "plop-templates/page",
      },
      {
        type: "modify",
        path: "src/app/router/routes.tsx",
        pattern:
          "/* THIS IS A PLACEHOLDER FOR APPEND NEW ROUTE BY THE GENERATOR. DO NOT DELETE! */",
        templateFile: "plop-templates/router/appendNewRoute.hbs",
      },
      {
        type: "modify",
        path: "src/app/router/routes.tsx",
        pattern:
          "/* THIS IS A PLACEHOLDER FOR APPEND ROUTE TO ROUTE TREE BY THE GENERATOR. DO NOT DELETE! */",
        templateFile: "plop-templates/router/appendRouteToRouteTree.hbs",
      },
    ],
  });
}
