import { type FC, type PropsWithChildren, useMemo, useEffect, useCallback } from "react";
import { useLocalStorage } from "react-use";

import { ThemeContext, LOCAL_STORAGE_THEME_KEY, THEMES, type Theme, DEFAULT_THEME } from "../config/themeContext";

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
    const [storageValue, setStorageValue] = useLocalStorage<Theme>(LOCAL_STORAGE_THEME_KEY, DEFAULT_THEME);

    const theme = useMemo(() => {
        if (storageValue && THEMES.includes(storageValue)) {
            return storageValue;
        }

        return DEFAULT_THEME;
    }, [storageValue]);

    useEffect(() => {
        if (storageValue !== theme) {
            // устанавливаем дефолтную тему, если валидация не проходит
            setStorageValue(DEFAULT_THEME);
        }
    }, [setStorageValue, storageValue, theme]);

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");

        if (theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
            root.classList.add(systemTheme);
        } else {
            root.classList.add(theme);
        }
    }, [theme]);

    const setTheme = useCallback(
        (newTheme: Theme) => {
            setStorageValue(newTheme);
        },
        [setStorageValue],
    );

    return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};
