import { createContext } from "react";

import { Theme, Mode, DEFAULT_THEME, DEFAULT_MODE } from "../config";

type ThemeContext = {
  theme: Theme;
  mode: Mode;
  setTheme: (theme: Theme) => void;
  setMode: (mode: Mode) => void;
};

const initialState: ThemeContext = {
  theme: DEFAULT_THEME,
  mode: DEFAULT_MODE,
  setTheme: () => {},
  setMode: () => {},
};

export const ThemeContext = createContext<ThemeContext>(initialState);
