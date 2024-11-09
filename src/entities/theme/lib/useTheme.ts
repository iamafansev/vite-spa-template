import { useContext } from "react";

import { ThemeContext } from "../config/themeContext";

export const useTheme = () => {
    return useContext(ThemeContext);
};
