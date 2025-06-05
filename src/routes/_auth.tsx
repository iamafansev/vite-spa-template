import {
  createFileRoute,
  redirect,
  Outlet,
  useRouter,
  useRouterState,
} from "@tanstack/react-router";
import { FC, PropsWithChildren, useState } from "react";
import { LogOut } from "lucide-react";
import {
  Avatar,
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarContent,
  NavbarItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";

import { updateAbility, useAbility } from "@/entities/ability";
import { LoadingOverlay, ThemeSwitch } from "@/shared/ui";
import { useTheme } from "@/shared/theme";
import { RouterLink } from "@/shared/ui";
import { sleep } from "@/shared/lib";

const Overlay: FC<PropsWithChildren> = ({ children }) => {
  const isLoading = useRouterState({
    select: (state) => state.isLoading,
  });

  const { isFetching } = Route.useMatch();

  return isFetching || isLoading ? (
    <LoadingOverlay className="static">{children}</LoadingOverlay>
  ) : (
    children
  );
};

export const Logo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export const AppLayout: FC = () => {
  const { theme, setTheme } = useTheme();
  const ability = useAbility();
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logout = async () => {
    await sleep(500);
    localStorage.removeItem("login");
    updateAbility(ability, null);
    router.invalidate();
  };

  const userLogin = localStorage.getItem("login") || "No name";

  return (
    <>
      <Navbar
        maxWidth="full"
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
        </NavbarContent>

        <NavbarContent className="pr-3" justify="center">
          <NavbarBrand>
            <Logo />
            <p className="font-bold text-inherit">ACME</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4 w-full" justify="center">
          <NavbarItem>
            <RouterLink to="/">Home</RouterLink>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem>
            <ThemeSwitch
              isSelected={theme === "dark"}
              onValueChange={(isSelected) =>
                setTheme(isSelected ? "dark" : "light")
              }
            />
          </NavbarItem>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name={userLogin}
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <RouterLink
                  to="/profile"
                  isBlock
                  size="sm"
                  className="block"
                  color="foreground"
                >
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{userLogin}</p>
                </RouterLink>
              </DropdownItem>
              <DropdownItem
                key="logout"
                color="danger"
                onPress={logout}
                startContent={<LogOut size={16} />}
              >
                <span>Log Out</span>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>
      <Overlay>
        <Outlet />
      </Overlay>
    </>
  );
};

export const Route = createFileRoute("/_auth")({
  component: AppLayout,
  beforeLoad: ({ location, context }) => {
    if (context.ability.cannot("read", "all")) {
      throw redirect({
        to: "/login",
        replace: true,
        search: {
          redirect: location.href,
        },
      });
    }
  },
});
