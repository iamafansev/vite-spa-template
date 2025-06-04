import { useContext } from "react";

import { ApiClientContext } from "../model/context";

export const useApiClient = () => {
  const context = useContext(ApiClientContext);

  if (!context) {
    throw new Error("useApiClient must be used within ApiClientProvider");
  }

  return context;
};
