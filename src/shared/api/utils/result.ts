import { FetchResponse } from "openapi-fetch";
import { MediaType } from "openapi-typescript-helpers";

export const throwAnyErrors = <
  T extends Record<string | number, unknown>,
  Options,
  Media extends MediaType
>(
  fetchResponse: FetchResponse<T, Options, Media>
) => {
  const { data, error, response } = fetchResponse;

  if (error) {
    throw response;
  }

  if (!data) {
    throw new Response("Unexpected error", {
      statusText: "Unexpected error",
      status: 500,
    });
  }

  return data;
};
