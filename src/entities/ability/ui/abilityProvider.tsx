import type { FC, PropsWithChildren } from "react";

import { type AppAbility, AbilityContext } from "../config/abilityContext";

export const AbilityProvider: FC<PropsWithChildren & { value: AppAbility }> = ({
  children,
  value,
}) => {
  return (
    <AbilityContext.Provider value={value}>{children}</AbilityContext.Provider>
  );
};
