import { useAbility as useAbilityCasl } from "@casl/react";

import { AbilityContext } from "../config/abilityContext";

export const useAbility = () => {
  return useAbilityCasl(AbilityContext);
};
