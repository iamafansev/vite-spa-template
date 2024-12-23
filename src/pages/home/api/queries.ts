import type { Client } from "openapi-fetch";
import { QueryFunctionContext } from "@tanstack/react-query";

import { throwAnyErrors } from "@/shared/api/utils";

import type { paths } from "@/shared/api/stapi";

type Options = {
  params: paths["/v1/rest/animal/search"]["post"]["parameters"]["query"];
  body: Exclude<
    paths["/v1/rest/animal/search"]["post"]["requestBody"],
    undefined
  >["content"]["application/x-www-form-urlencoded"];
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
          bodySerializer: (body) => {
            const params = new URLSearchParams();

            for (const name in body) {
              const value = body[name as keyof Options["body"]];
              if (value !== undefined) {
                params.append(name, value.toString());
              }
            }
            return params;
          },
          headers: {
            "content-type": "application/x-www-form-urlencoded",
          },
        })
        .then(throwAnyErrors);
    },
  };
};
