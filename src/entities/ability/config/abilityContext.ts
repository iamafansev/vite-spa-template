import { createContext } from "react";
import { createMongoAbility, MongoAbility } from "@casl/ability";
import { createContextualCan } from "@casl/react";

type Actions = "create" | "read" | "update" | "delete";
type Subjects = "User" | "all";
export type AppAbility = MongoAbility<[Actions, Subjects]>;

export const ability = createMongoAbility<AppAbility>();

export const AbilityContext = createContext(ability);
export const Can = createContextualCan(AbilityContext.Consumer);
