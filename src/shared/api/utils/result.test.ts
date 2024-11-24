import { describe, it, expect } from "vitest";
import { OperationResult, OperationResultSource, makeResult, gql } from "urql";

import { mapResultSourseToPromise } from "./result";

const query = gql`
  query {
    user {
      id
    }
  }
`;

describe("mapResultSourseToPromise", () => {
  it("should return data when there is no error", async () => {
    const mockData = { foo: "bar" };

    const mockResult = makeResult(
      {
        key: 1,
        query,
        variables: {},
        kind: "query",
        context: { url: "", requestPolicy: "cache-first" },
      },
      {
        data: mockData,
        errors: undefined,
        extensions: undefined,
      }
    );

    const mockSource: OperationResultSource<
      OperationResult<typeof mockData, object>
    > = {
      toPromise: () => Promise.resolve(mockResult),
    } as OperationResultSource<OperationResult<typeof mockData, object>>;

    const result = await mapResultSourseToPromise(mockSource);
    expect(result).toEqual(mockData);
  });

  it("should throw an error when there is an error in the result", async () => {
    const mockResult = makeResult(
      {
        key: 1,
        query,
        variables: {},
        kind: "query",
        context: { url: "", requestPolicy: "cache-first" },
      },
      {
        data: null,
        errors: [new Error("Test error")],
        extensions: undefined,
      }
    );

    const mockSource: OperationResultSource<OperationResult<null, object>> = {
      toPromise: () => Promise.resolve(mockResult),
    } as OperationResultSource<OperationResult<null, object>>;

    try {
      await mapResultSourseToPromise(mockSource);
    } catch (error) {
      expect(error).toMatchObject({
        status: 500,
        statusText: expect.stringMatching("Test error"),
      });
    }
  });
});
