
import { useEffect, useState } from "react";
import {
  Menu,
  Search,
  Bell,
  Sun,
  Moon,
  LogOut,
  LayoutDashboard,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { logout } from "@/features/auth/authSlice";

type Props = {
  openMenu: () => void;
};

const SubAdminTopbar = ({ openMenu }: Props) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof document === "undefined") return false;
    return document.documentElement.classList.contains("dark");
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const firstName =
    user?.firstName || user?.name?.split(" ")[0] || "Sub Admin";

  const lastName =
    user?.lastName ||
    user?.name?.split(" ").slice(1).join(" ") ||
    "";

  const initials =
    `${firstName.charAt(0)}${lastName.charAt(0)}`
      .toUpperCase()
      .trim() || "S";

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/", { replace: true });
  };

  return (
    <header
      className="
        fixed left-0 right-0 top-0 z-40 h-16
        border-b bg-background/95 backdrop-blur
        lg:left-72
      "
    >
      <div className="flex h-full items-center justify-between gap-2 px-3 sm:px-4 md:px-6">
        {/* Left side */}
        <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={openMenu}
            className="shrink-0 rounded-xl p-2 transition hover:bg-muted lg:hidden"
            aria-label="Open navigation menu"
          >
            <Menu size={24} />
          </button>

          <div className="relative hidden w-full max-w-[360px] sm:block">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              type="search"
              placeholder="Search..."
              aria-label="Search"
              className="rounded-xl border bg-muted/40 pl-10 focus-visible:ring-primary"
            />
          </div>

          <span className="truncate text-sm font-semibold sm:hidden">
            Sub Admin
          </span>
        </div>

        {/* Right side */}
        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsDarkMode((previous) => !previous)}
            className="rounded-full"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-full"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-72">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="px-3 py-5 text-sm text-muted-foreground">
                Notifications will appear here when connected to the
                notification API.
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-10 w-10 rounded-full border p-1"
                aria-label="Open profile menu"
              >
                {user?.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt={`${firstName} ${lastName}`}
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  <span className="flex h-full w-full items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {initials}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuLabel>
                <div className="flex items-center gap-3 py-1">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary font-bold text-primary-foreground">
                    {user?.profilePicture ? (
                      <img
                        src={user.profilePicture}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      initials
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate font-semibold">
                      {firstName} {lastName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Sub Administrator
                    </p>
                    {user?.email && (
                      <p className="truncate text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    )}
                  </div>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => navigate("/sub-admin/dashboard")}
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </DropdownMenuItem>

              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => navigate("/sub-admin/profile")}
              >
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer text-red-500 focus:text-red-500"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default SubAdminTopbar;
