import { LoaderFunction, ActionFunction } from "react-router-dom";

/*
  Creating a loader with the correct return type
*/
export const makeLoader = <TLoaderFn extends LoaderFunction>(
  loaderFn: TLoaderFn
) => {
  return loaderFn;
};

/*
  Creating a action with the correct return type
*/
export const makeAction = <TActionFn extends ActionFunction>(
  actionFn: TActionFn
) => {
  return actionFn;
};
