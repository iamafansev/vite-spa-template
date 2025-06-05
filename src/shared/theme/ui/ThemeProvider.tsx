import { type FC, type PropsWithChildren, useEffect, useState } from "react";

import { type Theme, type Mode, DEFAULT_THEME, DEFAULT_MODE } from "../config";
import { ThemeContext } from "../context/ThemeContext";

interface ThemeProviderProps {
  defaultTheme?: Theme;
  defaultMode?: Mode;
  onLoadTheme: () => Theme | null; // Функция для загрузки темы
  onLoadMode: () => Mode | null; // Функция для загрузки режима
  onSaveTheme: (theme: Theme) => void; // Функция для сохранения темы
  onSaveMode: (mode: Mode) => void; // Функция для сохранения режима
  onThemeChange: (theme: Theme) => void; // Функция для обработки изменений темы
}

export const ThemeProvider: FC<PropsWithChildren<ThemeProviderProps>> = ({
  defaultTheme = DEFAULT_THEME,
  defaultMode = DEFAULT_MODE,
  children,
  onLoadTheme,
  onLoadMode,
  onSaveTheme,
  onSaveMode,
  onThemeChange,
}) => {
  const [theme, setTheme] = useState<Theme>(onLoadTheme?.() || defaultTheme);
  const [mode, setMode] = useState<Mode>(onLoadMode?.() || defaultMode);

  // Определение системной темы
  const getSystemTheme = (): Theme => {
    return window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  // Эффект для отслеживания изменений системной темы
  useEffect(() => {
    if (mode !== "system") {
      return;
    }

    const systemTheme = getSystemTheme();
    setTheme(systemTheme);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, [mode]);

  // Эффект для вызова onThemeChange при изменении темы
  useEffect(() => {
    if (onThemeChange) {
      onThemeChange(theme);
    }
  }, [theme, onThemeChange]);

  // Функции для изменения темы и режима
  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    onSaveTheme(newTheme);
    // Если тему изменили, значит переходим в ручной режим
    onSaveMode("manual");
  };

  const handleSetMode = (newMode: Mode) => {
    setMode(newMode);
    onSaveMode(newMode);
    // изменение темы произойдет в эффекте
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        mode,
        setTheme: handleSetTheme,
        setMode: handleSetMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
