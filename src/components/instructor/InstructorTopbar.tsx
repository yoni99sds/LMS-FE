
import {
  Menu,
  Search,
  Bell,
  User,
  Sun,
  Moon,
  LayoutDashboard,
  BookOpen,
  PlusCircle,
  Users,
  ClipboardList,
  Star,
  BarChart3,
  DollarSign,
  Settings,
  LogOut,
} from "lucide-react";

import { useState, useEffect } from "react";
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

import {
  useAppDispatch,
  useAppSelector,
} from "@/hooks/redux";

import { logout } from "@/features/auth/authSlice";

type Props = {
  openMenu: () => void;
};

const InstructorTopbar = ({ openMenu }: Props) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const firstName = user?.firstName || "Instructor";
  const lastName = user?.lastName || "";

  const fullName = `${firstName} ${lastName}`.trim();

  const initials =
    `${firstName.charAt(0)}${lastName.charAt(0)}`
      .toUpperCase()
      .trim() || "I";

  return (
    <header
      className="
        fixed
        top-0
        right-0
        left-0
        lg:left-72
        h-16
        z-40
        bg-background/95
        backdrop-blur
        border-b
        flex
        items-center
        justify-between
        px-4
        md:px-6
      "
    >
      {/* =========================
          LEFT
      ========================== */}
      <div className="flex items-center gap-3">

        {/* MOBILE MENU */}
        <button
          type="button"
          onClick={openMenu}
          className="
            lg:hidden
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            hover:bg-muted
            transition
          "
          aria-label="Open instructor menu"
        >
          <Menu size={24} />
        </button>

        {/* SEARCH */}
        <div className="relative hidden sm:block w-[220px] md:w-[300px]">
          <Search
            size={18}
            className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              text-muted-foreground
            "
          />

          <Input
            type="search"
            placeholder="Search..."
            className="
              pl-10
              rounded-xl
              bg-muted/40
              border
              focus-visible:ring-primary
            "
          />
        </div>
      </div>

      {/* =========================
          RIGHT
      ========================== */}
      <div className="flex items-center gap-2">

        {/* MOBILE SEARCH */}
        <button
          type="button"
          className="
            sm:hidden
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            hover:bg-muted
            transition
          "
          aria-label="Search"
        >
          <Search size={20} />
        </button>

        {/* DARK MODE */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() =>
            setIsDarkMode((current) => !current)
          }
          className="rounded-full"
          aria-label={
            isDarkMode
              ? "Switch to light mode"
              : "Switch to dark mode"
          }
        >
          {isDarkMode ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>

        {/* NOTIFICATIONS */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="relative rounded-full"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />

          <span
            className="
              absolute
              -right-0.5
              -top-0.5
              h-2
              w-2
              rounded-full
              bg-primary
            "
          />
        </Button>

        {/* =========================
            PROFILE DROPDOWN
        ========================== */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              className="
                h-10
                w-10
                rounded-full
                border
                p-1
                overflow-hidden
              "
              aria-label="Open instructor profile menu"
            >
              {user?.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt={fullName}
                  className="
                    h-full
                    w-full
                    rounded-full
                    object-cover
                  "
                />
              ) : (
                <div
                  className="
                    flex
                    h-full
                    w-full
                    items-center
                    justify-center
                    rounded-full
                    bg-primary
                    text-sm
                    font-bold
                    text-primary-foreground
                  "
                >
                  {initials || (
                    <User size={18} />
                  )}
                </div>
              )}
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            sideOffset={8}
            className="w-64"
          >
            {/* =========================
                USER INFORMATION
            ========================== */}
            <DropdownMenuLabel>
              <div className="flex items-center gap-3 py-1">

                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-full
                    bg-primary
                    font-bold
                    text-primary-foreground
                  "
                >
                  {user?.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt={fullName}
                      className="
                        h-full
                        w-full
                        object-cover
                      "
                    />
                  ) : (
                    initials || "I"
                  )}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">
                    {fullName}
                  </p>

                  <p className="truncate text-xs font-normal text-muted-foreground">
                    {user?.email || "Instructor"}
                  </p>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            {/* =========================
                MAIN
            ========================== */}

            {/* DASHBOARD */}
            <DropdownMenuItem
              onClick={() =>
                navigate("/instructor/dashboard")
              }
              className="cursor-pointer gap-3 rounded-lg"
            >
              <LayoutDashboard
                size={17}
                className="text-muted-foreground"
              />
              <span>Dashboard</span>
            </DropdownMenuItem>

            {/* MY COURSES */}
            <DropdownMenuItem
              onClick={() =>
                navigate("/instructor/courses")
              }
              className="cursor-pointer gap-3 rounded-lg"
            >
              <BookOpen
                size={17}
                className="text-muted-foreground"
              />
              <span>My Courses</span>
            </DropdownMenuItem>

            {/* CREATE COURSE */}
            <DropdownMenuItem
              onClick={() =>
                navigate("/instructor/courses/create")
              }
              className="cursor-pointer gap-3 rounded-lg"
            >
              <PlusCircle
                size={17}
                className="text-muted-foreground"
              />
              <span>Create Course</span>
            </DropdownMenuItem>

            {/* STUDENTS */}
            <DropdownMenuItem
              onClick={() =>
                navigate("/instructor/students")
              }
              className="cursor-pointer gap-3 rounded-lg"
            >
              <Users
                size={17}
                className="text-muted-foreground"
              />
              <span>Students</span>
            </DropdownMenuItem>

            {/* ASSIGNMENTS */}
            <DropdownMenuItem
              onClick={() =>
                navigate("/instructor/assignments")
              }
              className="cursor-pointer gap-3 rounded-lg"
            >
              <ClipboardList
                size={17}
                className="text-muted-foreground"
              />
              <span>Assignments</span>
            </DropdownMenuItem>

            {/* =========================
                INSIGHTS
            ========================== */}

            <DropdownMenuSeparator />

            <DropdownMenuLabel className="px-2 py-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
              Insights
            </DropdownMenuLabel>

            {/* REVIEWS */}
            <DropdownMenuItem
              onClick={() =>
                navigate("/instructor/reviews")
              }
              className="cursor-pointer gap-3 rounded-lg"
            >
              <Star
                size={17}
                className="text-muted-foreground"
              />
              <span>Reviews</span>
            </DropdownMenuItem>

            {/* ANALYTICS */}
            <DropdownMenuItem
              onClick={() =>
                navigate("/instructor/analytics")
              }
              className="cursor-pointer gap-3 rounded-lg"
            >
              <BarChart3
                size={17}
                className="text-muted-foreground"
              />
              <span>Analytics</span>
            </DropdownMenuItem>

            {/* REVENUE */}
            <DropdownMenuItem
              onClick={() =>
                navigate("/instructor/revenue")
              }
              className="cursor-pointer gap-3 rounded-lg"
            >
              <DollarSign
                size={17}
                className="text-muted-foreground"
              />
              <span>Revenue</span>
            </DropdownMenuItem>

            {/* =========================
                ACCOUNT
            ========================== */}

            <DropdownMenuSeparator />

            <DropdownMenuLabel className="px-2 py-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
              Account
            </DropdownMenuLabel>

            {/* PROFILE */}
            <DropdownMenuItem
              onClick={() =>
                navigate("/instructor/profile")
              }
              className="cursor-pointer gap-3 rounded-lg"
            >
              <User
                size={17}
                className="text-muted-foreground"
              />
              <span>Profile</span>
            </DropdownMenuItem>

            {/* SETTINGS */}
            <DropdownMenuItem
              onClick={() =>
                navigate("/instructor/settings")
              }
              className="cursor-pointer gap-3 rounded-lg"
            >
              <Settings
                size={17}
                className="text-muted-foreground"
              />
              <span>Settings</span>
            </DropdownMenuItem>

            {/* LOGOUT */}
            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={handleLogout}
              className="
                cursor-pointer
                gap-3
                rounded-lg
                text-red-500
                focus:bg-red-500/10
                focus:text-red-500
              "
            >
              <LogOut size={17} />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default InstructorTopbar;

