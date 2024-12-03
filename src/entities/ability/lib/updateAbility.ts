import { AbilityBuilder, createMongoAbility } from "@casl/ability";

import type { AppAbility } from "../config/abilityContext";

export const updateAbility = (ability: AppAbility, user?: string | null) => {
  const { can, cannot, rules } = new AbilityBuilder<AppAbility>(
    createMongoAbility
  );

  if (!user) {
    cannot("read", "all");
    ability.update(rules);
    return;
  }

  can("read", "all");

  ability.update(rules);
};
