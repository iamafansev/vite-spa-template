import { ReactNode } from "react";

import { ApiClientContext } from "../model/context";
import { ApiClients } from "../model/types";

export const ApiClientProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value: ApiClients;
}) => {
  return (
    <ApiClientContext.Provider value={value}>
      {children}
    </ApiClientContext.Provider>
  );
};
