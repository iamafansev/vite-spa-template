import type {
    ActionFunction as OriginalActionFunction,
    ActionFunctionArgs,
    LoaderFunction as OriginalLoaderFunction,
    LoaderFunctionArgs,
    IndexRouteObject as OriginalIndexRouteObject,
    LazyRouteFunction,
    IndexRouteProps as OriginalIndexRouteProps,
    NonIndexRouteObject as OriginalNonIndexRouteObject,
    ShouldRevalidateFunction as OriginalShouldRevalidateFunction,
} from "react-router-dom";

import type {
    LazyRouteFunction as OriginalLazyRouteFunction,
    AgnosticBaseRouteObject as OriginalAgnosticBaseRouteObject,
} from "@remix-run/router";

// Change the context type here
type HandlerContext = Readonly<{
    // identityFN
    client: <T>(value: T) => T;
}>;

type LoaderFunctionCustom<Context = unknown> = (
    args: LoaderFunctionArgs<Context>,
    handlerCtx: HandlerContext,
) => ReturnType<OriginalLoaderFunction>;

type ActionFunctionCustom<Context = unknown> = (
    args: ActionFunctionArgs<Context>,
    handlerCtx: HandlerContext,
) => ReturnType<OriginalActionFunction>;

declare module "react-router-dom" {
    type LoaderFunction<Context = unknown> = LoaderFunctionCustom<Context>;
    type ActionFunction<Context = unknown> = ActionFunctionCustom<Context>;

    interface IndexRouteObject extends OriginalIndexRouteObject {
        loader?: LoaderFunction;
        action?: ActionFunction;
        lazy?: OriginalLazyRouteFunction<IndexRouteObject>;
    }

    interface NonIndexRouteObject extends OriginalNonIndexRouteObject {
        loader?: LoaderFunction;
        action?: ActionFunction;
        lazy?: OriginalLazyRouteFunction<NonIndexRouteObject>;
    }
}

type AgnosticBaseRouteObject = OriginalAgnosticBaseRouteObject & {
    loader?: LoaderFunctionCustom | boolean;
    action?: ActionFunctionCustom | boolean;
    lazy?: LazyRouteFunction<AgnosticBaseRouteObject>;
};

declare module "@remix-run/router" {
    type AgnosticIndexRouteObject = AgnosticBaseRouteObject & {
        children?: undefined;
        index: true;
    };
}
