import { OperationResult, OperationResultSource } from "urql";

const throwAnyErrors = <T, V extends object>(result: OperationResult<T, V>) => {
  const { data, error } = result;

  if (error) {
    throw new Response(error.message, {
      status: 500,
      statusText: error.message,
    });
  }

  if (!data) {
    throw new Response("Unexpected error", { status: 500 });
  }

  return data;
};

const mapUnknownError = (error: unknown) => {
  if (error instanceof Error) {
    throw new Response(error.message, { status: 500 });
  }

  throw new Response("Unexpected error", { status: 500 });
};

/**
 * Transforms an `OperationResultSource` into a promise, handling errors appropriately.
 *
 * @template T - The type of the successful result.
 * @template V - The type of the variables object.
 * @param {OperationResultSource<OperationResult<T, V>>} result - The operation result source to transform.
 * @returns {Promise<NonNullable<T>>} A promise that resolves with the operation result or rejects with an error.
 */

export const mapResultSourseToPromise = <T, V extends object>(
  result: OperationResultSource<OperationResult<T, V>>
) => {
  return result.toPromise().catch(mapUnknownError).then(throwAnyErrors);
};
