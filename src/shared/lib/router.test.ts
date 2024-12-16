import { describe, it, expect, vi } from "vitest";
import {
  useLoaderDeps,
  RegisteredRouter,
  useRouteContext,
  useParams,
} from "@tanstack/react-router";
import { makeLoaderByPath } from "./router";

describe("makeLoaderByPath", () => {
  it("should return a loader function", () => {
    const loaderFn = vi.fn();
    const loader = makeLoaderByPath<"test">()(loaderFn);
    expect(loader).toBe(loaderFn);
  });

  it("should call the loader function with correct arguments", () => {
    const loaderFn = vi.fn();
    const loader = makeLoaderByPath<"test">()(loaderFn);

    const mockContext = {} as ReturnType<
      typeof useRouteContext<RegisteredRouter, "test">
    >;
    const mockSearch = {} as ReturnType<
      typeof useLoaderDeps<RegisteredRouter, "test">
    >;
    const mockParams = {} as ReturnType<
      typeof useParams<RegisteredRouter, "test">
    >;

    loader({
      cause: "enter",
      context: mockContext,
      search: mockSearch,
      params: mockParams,
    });

    expect(loaderFn).toHaveBeenCalledWith({
      cause: "enter",
      context: mockContext,
      search: mockSearch,
      params: mockParams,
    });
  });
});
