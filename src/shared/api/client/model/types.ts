import { Client } from 'openapi-fetch';
import { OpenapiQueryClient } from 'openapi-react-query';

import { paths } from '@/shared/api/types/paths';

export type ApiClients = {
  fetchClient: Client<paths>;
  openapiQueryClient: OpenapiQueryClient<paths>;
};

export type ApiClientConfig = {
  baseUrl: string;
};
