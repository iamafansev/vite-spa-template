import { route } from "react-router-typesafe-routes";

export const ROUTES = route({
  path: "",
  children: {
    login: route({
      path: "login",
    }),
    register: route({
      path: "register",
    }),
  },
});
