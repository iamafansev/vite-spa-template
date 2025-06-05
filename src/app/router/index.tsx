import { ReactNode, StrictMode } from "react";
import { createRouter } from "@tanstack/react-router";
import { HelmetProvider } from "react-helmet-async";
import { HeroUIProvider } from "@heroui/react";

import { QueryClientProvider } from "@tanstack/react-query";
import { AbilityProvider, ability } from "@/entities/ability";
import { ApiClientProvider } from "@/shared/api/client";
import { FullHeightLoader } from "@/shared/ui";
import { ThemeProvider } from "@/shared/theme";
import { RouterContext } from "@/routes/__root";
import { routeTree } from "@/routeTree.gen";

const LOCAL_STORAGE_THEME_KEY = "theme";
const LOCAL_STORAGE_MODE_KEY = "theme-mode";

export const createRouterWithContext = (context: RouterContext) => {
  return createRouter({
    routeTree,
    context,
    defaultPendingComponent: FullHeightLoader,
    defaultPendingMs: 5000,
    Wrap: ({ children }) => {
      return (
        <StrictMode>
          <HelmetProvider>
            <AbilityProvider value={ability}>
              <ApiClientProvider
                value={{
                  fetchClient: context.fetchClient,
                  openapiQueryClient: context.openapiQueryClient,
                }}
              >
                <QueryClientProvider client={context.queryClient}>
                  {children}
                </QueryClientProvider>
              </ApiClientProvider>
            </AbilityProvider>
          </HelmetProvider>
        </StrictMode>
      );
    },
    InnerWrap: ({ children }: { children: ReactNode }) => {
      return (
        <HeroUIProvider disableRipple className="flex flex-col flex-1">
          <ThemeProvider
            onThemeChange={(currentTheme) => {
              const root = window.document.documentElement;
              root.classList.remove("light", "dark");
              root.classList.add(currentTheme);
            }}
            onLoadMode={() => {
              const value = localStorage.getItem(LOCAL_STORAGE_MODE_KEY);
              if (value === "manual" || value === "system") return value;
              return null;
            }}
            onLoadTheme={() => {
              const value = localStorage.getItem(LOCAL_STORAGE_THEME_KEY);
              if (value === "light" || value === "dark") return value;
              return null;
            }}
            onSaveMode={(mode) =>
              localStorage.setItem(LOCAL_STORAGE_MODE_KEY, mode)
            }
            onSaveTheme={(theme) =>
              localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme)
            }
          >
            {children}
          </ThemeProvider>
        </HeroUIProvider>
      );
    },
  });
};

export type Router = ReturnType<typeof createRouterWithContext>;
