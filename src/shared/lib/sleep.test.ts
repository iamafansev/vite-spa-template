import { describe, it, expect, vi } from "vitest";
import { sleep } from "./sleep";

describe("sleep", () => {
  it("should resolve after the specified time", async () => {
    const ms = 1000;
    const start = Date.now();

    await sleep(ms);

    const end = Date.now();
    expect(end - start).toBeGreaterThanOrEqual(ms);
  });

  it("should call setTimeout with the correct duration", async () => {
    const ms = 500;
    const setTimeoutSpy = vi.spyOn(global, "setTimeout");

    await sleep(ms);

    expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), ms);
    setTimeoutSpy.mockRestore();
  });
});
