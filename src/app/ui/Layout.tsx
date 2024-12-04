import { FC } from "react";
import { Link as LinkRR, Outlet } from "@tanstack/react-router";
import { LogOut, Sun, SunMoon, Moon } from "lucide-react";

import { useTheme } from "@/entities/theme";
import { Button, Link } from "@/shared/ui";

export const AppLayout: FC = () => {
  const { theme, setTheme } = useTheme();

  const userLogin = localStorage.getItem("login") || "No name";

  return (
    <>
      <header className="px-6 py-4 flex justify-between items-center">
        <nav>
          <ul>
            <li>
              <Link asChild>
                <LinkRR to="/">Pockemons</LinkRR>
              </Link>
            </li>
          </ul>
        </nav>
        <nav>
          <ul className="flex">
            <li>
              <Button
                type="button"
                variant={theme === "light" ? "default" : "ghost"}
                onClick={() => setTheme("light")}
              >
                <Sun />
              </Button>
            </li>
            <li>
              <Button
                type="button"
                variant={theme === "system" ? "default" : "ghost"}
                onClick={() => setTheme("system")}
              >
                <SunMoon />
              </Button>
            </li>
            <li>
              <Button
                type="button"
                variant={theme === "dark" ? "default" : "ghost"}
                onClick={() => setTheme("dark")}
              >
                <Moon />
              </Button>
            </li>
          </ul>
        </nav>
        <nav>
          <ul className="flex items-center">
            <li className="pr-4">
              <Link asChild>
                <LinkRR to="/profile">{userLogin}</LinkRR>
              </Link>
            </li>
            <li>
              <Button variant="ghost" asChild>
                <LinkRR to="/logout">
                  <LogOut />
                </LinkRR>
              </Button>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </>
  );
};
