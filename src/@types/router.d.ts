import {
  AgnosticNonIndexRouteObject as AgnosticNonIndexRouteObjectOriginal,
  AgnosticIndexRouteObject as AgnosticIndexRouteObjectOriginal,
  LazyRouteFunction as LazyRouteFunctionOriginal,
  LoaderFunctionArgs as LoaderFunctionArgsOriginal,
  ActionFunctionArgs as ActionFunctionArgsOriginal,
  DataFunctionReturnValue as DataFunctionReturnValueOriginal,
} from "react-router-dom";

import type { HandlerContext } from "@/app";

declare module "react-router-dom" {
  /**
   * Route loader function signature
   */
  type LoaderFunction<Context = unknown> = {
    (
      args: LoaderFunctionArgsOriginal<Context>,
      handlerCtx: HandlerContext
    ): DataFunctionReturnValueOriginal;
  } & {
    hydrate?: boolean;
  };
  /**
   * Route action function signature
   */
  interface ActionFunction<Context = unknown> {
    (
      args: ActionFunctionArgsOriginal<Context>,
      handlerCtx: HandlerContext
    ): DataFunctionReturnValueOriginal;
  }

  type IndexRouteObject = {
    caseSensitive?: AgnosticIndexRouteObjectOriginal["caseSensitive"];
    path?: AgnosticIndexRouteObjectOriginal["path"];
    id?: AgnosticIndexRouteObjectOriginal["id"];
    loader?: LoaderFunction;
    action?: ActionFunction;
    hasErrorBoundary?: AgnosticIndexRouteObjectOriginal["hasErrorBoundary"];
    shouldRevalidate?: AgnosticIndexRouteObjectOriginal["shouldRevalidate"];
    handle?: AgnosticIndexRouteObjectOriginal["handle"];
    index: true;
    children?: undefined;
    element?: React.ReactNode | null;
    hydrateFallbackElement?: React.ReactNode | null;
    errorElement?: React.ReactNode | null;
    Component?: React.ComponentType | null;
    HydrateFallback?: React.ComponentType | null;
    ErrorBoundary?: React.ComponentType | null;
    lazy?: LazyRouteFunctionOriginal<RouteObject>;
  };

  type NonIndexRouteObject = {
    caseSensitive?: AgnosticNonIndexRouteObjectOriginal["caseSensitive"];
    path?: AgnosticNonIndexRouteObjectOriginal["path"];
    id?: AgnosticNonIndexRouteObjectOriginal["id"];
    loader?: LoaderFunction;
    action?: ActionFunction;
    hasErrorBoundary?: AgnosticNonIndexRouteObjectOriginal["hasErrorBoundary"];
    shouldRevalidate?: AgnosticNonIndexRouteObjectOriginal["shouldRevalidate"];
    handle?: AgnosticNonIndexRouteObjectOriginal["handle"];
    index?: false;
    children?: RouteObject[];
    element?: React.ReactNode | null;
    hydrateFallbackElement?: React.ReactNode | null;
    errorElement?: React.ReactNode | null;
    Component?: React.ComponentType | null;
    HydrateFallback?: React.ComponentType | null;
    ErrorBoundary?: React.ComponentType | null;
    lazy?: LazyRouteFunctionOriginal<RouteObject>;
  };

  type RouteObject = IndexRouteObject | NonIndexRouteObject;
}
