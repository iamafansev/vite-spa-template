import { useContext } from "react";

import { ClientFetchContext } from "../config/context";

export const useClientFetch = () => {
  return useContext(ClientFetchContext);
};
