import { OperationResult, OperationResultSource } from "urql";

const throwAnyErrors = <T, V extends object>(result: OperationResult<T, V>) => {
  const { data, error } = result;

  if (error) {
    throw new Response(error.message, { status: 500 });
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

export const makeResult = <T, V extends object>(
  result: OperationResultSource<OperationResult<T, V>>
) => {
  return result.toPromise().catch(mapUnknownError).then(throwAnyErrors);
};
