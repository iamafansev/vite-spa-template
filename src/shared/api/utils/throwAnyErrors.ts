import { FetchResponse } from "openapi-fetch";
import { MediaType } from "openapi-typescript-helpers";

/**
 * Throws any errors present in the fetch response.
 *
 * @template T - The type of the data in the fetch response.
 * @template Options - The type of the options used in the fetch request.
 * @template Media - The type of the media in the fetch response.
 *
 * @param {FetchResponse<T, Options, Media>} fetchResponse - The response from the fetch request.
 * @throws {Response} If there is an error in the fetch response.
 * @throws {Response} If the data is not present in the fetch response.
 * @returns {T} The data from the fetch response.
 */
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
