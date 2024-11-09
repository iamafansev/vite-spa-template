import { createContext } from "react";

export type Theme = "dark" | "light" | "system";

export const DEFAULT_THEME: Theme = "system";

type ThemeContextInterface = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
};

export const THEMES: Theme[] = ["light", "dark", "system"];

const initialState: ThemeContextInterface = {
    theme: "system",
    setTheme: () => null,
};

export const ThemeContext = createContext<ThemeContextInterface>(initialState);

export const LOCAL_STORAGE_THEME_KEY = "theme";
