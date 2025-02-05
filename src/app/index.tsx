import { Client, cacheExchange, fetchExchange } from "urql";
import { RouterProvider } from "@tanstack/react-router";

import { ability } from "@/entities/ability";

import { createRouterWithContext } from "./router";
import "./entry.css";

const getClient = () => {
  return new Client({
    url: import.meta.env.VITE_API_URL,
    exchanges: [cacheExchange, fetchExchange],
  });
};

export const App = () => {
  const client = getClient();

  return (
    <RouterProvider
      router={createRouterWithContext({
        client,
        ability,
      })}
    />
  );
};
