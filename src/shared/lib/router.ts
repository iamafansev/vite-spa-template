import {
  useLoaderDeps,
  RegisteredRouter,
  useRouteContext,
  useParams,
} from "@tanstack/react-router";

type LoaderFunction<TFrom extends string> = (options: {
  cause: "preload" | "enter" | "stay";
  context: ReturnType<typeof useRouteContext<RegisteredRouter, TFrom>>;
  search: ReturnType<typeof useLoaderDeps<RegisteredRouter, TFrom>>;
  params: ReturnType<typeof useParams<RegisteredRouter, TFrom>>;
}) => unknown;

export const makeLoaderByPath =
  <TFrom extends string>() =>
  <TLoaderFn extends LoaderFunction<TFrom>>(loaderFn: TLoaderFn) => {
    return loaderFn;
  };
