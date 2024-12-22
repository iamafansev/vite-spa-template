import type { FC, PropsWithChildren, ContextType } from "react";

import { ClientFetchContext } from "../config/context";

type Props = {
  value: ContextType<typeof ClientFetchContext>;
} & PropsWithChildren;

export const ClientFetchProvider: FC<Props> = ({ children, value }) => {
  return (
    <ClientFetchContext.Provider value={value}>
      {children}
    </ClientFetchContext.Provider>
  );
};
