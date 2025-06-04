import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";

import { paths } from "../../types/paths";
import { ApiClientConfig, ApiClients } from "../model/types";

export const createApiClients = (config: ApiClientConfig): ApiClients => {
  const fetchClient = createFetchClient<paths>({ baseUrl: config.baseUrl });
  const openapiQueryClient = createClient(fetchClient);

  return {
    fetchClient,
    openapiQueryClient,
  };
};
