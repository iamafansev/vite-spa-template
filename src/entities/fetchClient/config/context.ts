import { createContext } from "react";
import type { Client } from "openapi-fetch";

import type { paths } from "@/shared/api/types/paths";

type ClientFetchContextInterface = Client<paths>;

const initialState: ClientFetchContextInterface =
  {} as ClientFetchContextInterface;

export const ClientFetchContext =
  createContext<ClientFetchContextInterface>(initialState);
