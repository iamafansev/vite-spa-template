import { FC, useCallback } from "react";
import { useFormStatus } from "react-dom";
import { Link as LinkRR, Outlet, useRouter } from "@tanstack/react-router";
import { LogOut, Sun, SunMoon, Moon } from "lucide-react";

import { useTheme } from "@/entities/theme";
import { updateAbility, useAbility } from "@/entities/ability";
import { Button, Link } from "@/shared/ui";
import { sleep } from "@/shared/utils";

const LogoutAction: FC = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="ghost" loading={pending}>
      <LogOut />
    </Button>
  );
};

export const AppLayout: FC = () => {
  const { theme, setTheme } = useTheme();
  const ability = useAbility();
  const router = useRouter();

  const userLogin = localStorage.getItem("login") || "No name";

  const logoutAction = useCallback(async () => {
    await sleep(1000);
    localStorage.removeItem("login");
    updateAbility(ability, null);
    router.invalidate();
  }, [ability, router]);

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
              <form action={logoutAction}>
                <LogoutAction />
              </form>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </>
  );
};
