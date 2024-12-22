import type { Client } from "openapi-fetch";
import { QueryFunctionContext } from "@tanstack/react-query";

import { throwAnyErrors } from "@/shared/api/utils";

import type { paths } from "@/shared/api/v1";

type Options = {
  params: paths["/v1/rest/animal/search"]["post"]["parameters"]["query"];
  body: {
    name?: string;
  };
};

export const animalsQueryOptions = (
  fetchClient: Client<paths>,
  options: Options
) => {
  return {
    queryKey: ["animals", options],
    queryFn: ({ signal }: Partial<QueryFunctionContext>) => {
      return fetchClient
        .POST("/v1/rest/animal/search", {
          signal,
          params: { query: options.params },
          body: options.body,
          headers: {
            "content-type": "application/x-www-form-urlencoded",
          },
        })
        .then(throwAnyErrors);
    },
  };
};
