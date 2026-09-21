import {
  Menu,
  Search,
  Bell,
  User,
  Sun,
  Moon,
  LayoutDashboard,
  Users,
  UserCog,
  BookOpen,
  Tags,
  ShoppingCart,
  CreditCard,
  Star,
  ClipboardList,
  FileBarChart,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";
import { useEffect, useState } from "react";
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

const AdminTopbar = ({ openMenu }: Props) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);

  const firstName = user?.firstName || "Admin";
  const lastName = user?.lastName || "";

  const initials =
    `${firstName.charAt(0)}${lastName.charAt(0)}`
      .toUpperCase()
      .trim() || "A";

  /* =========================
     DARK MODE
  ========================== */

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  /* =========================
     LOGOUT
  ========================== */

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  /* =========================
     NAVIGATION
  ========================== */

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <header
      className="
        fixed
        top-0
        right-0
        left-0
        lg:left-72
        z-40
        h-16
        border-b
        bg-background/95
        backdrop-blur
      "
    >
      <div className="flex h-full items-center justify-between px-4 md:px-6">

        {/* =========================
            LEFT SIDE
        ========================== */}

        <div className="flex items-center gap-3">

          {/* Mobile menu */}

          <button
            type="button"
            onClick={openMenu}
            className="
              rounded-xl
              p-2
              transition
              hover:bg-muted
              lg:hidden
            "
            aria-label="Open menu"
          >
            <Menu size={25} />
          </button>

          {/* Search */}

          <div className="relative hidden w-[220px] sm:block md:w-[300px] lg:w-[360px]">
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
              placeholder="Search users, courses..."
              className="
                rounded-xl
                border
                bg-muted/40
                pl-10
                focus-visible:ring-primary
              "
            />
          </div>

          {/* Mobile search */}

          <button
            type="button"
            className="
              rounded-xl
              p-2
              transition
              hover:bg-muted
              sm:hidden
            "
            aria-label="Search"
          >
            <Search size={20} />
          </button>
        </div>

        {/* =========================
            RIGHT SIDE
        ========================== */}

        <div className="flex items-center gap-1 sm:gap-2">

          {/* Dark mode */}

          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              setIsDarkMode((previous) => !previous)
            }
            className="rounded-full"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          {/* =========================
              NOTIFICATIONS
          ========================== */}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-full"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />

                <span
                  className="
                    absolute
                    right-1
                    top-1
                    h-2
                    w-2
                    rounded-full
                    bg-primary
                  "
                />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-80"
            >
              <DropdownMenuLabel>
                <div className="flex items-center justify-between">
                  <span>Notifications</span>

                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                    3 new
                  </span>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem className="cursor-pointer py-3">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <Users className="h-4 w-4 text-primary" />
                  </div>

                  <div>
                    <p className="text-sm font-medium">
                      New student registered
                    </p>

                    <p className="text-xs text-muted-foreground">
                      A new student joined EduMaster.
                    </p>
                  </div>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem className="cursor-pointer py-3">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <BookOpen className="h-4 w-4 text-primary" />
                  </div>

                  <div>
                    <p className="text-sm font-medium">
                      Course submitted
                    </p>

                    <p className="text-xs text-muted-foreground">
                      A course is waiting for review.
                    </p>
                  </div>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem className="cursor-pointer py-3">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <Bell className="h-4 w-4 text-primary" />
                  </div>

                  <div>
                    <p className="text-sm font-medium">
                      System notification
                    </p>

                    <p className="text-xs text-muted-foreground">
                      Your LMS system is running normally.
                    </p>
                  </div>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* =========================
              ADMIN PROFILE
          ========================== */}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="
                  h-10
                  w-10
                  rounded-full
                  border
                  p-1
                "
              >
                {user?.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt={`${firstName} ${lastName}`}
                    className="h-full w-full rounded-full object-cover"
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
                    {initials}
                  </div>
                )}
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-72"
            >
              {/* =========================
                  PROFILE HEADER
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

                    <p className="truncate text-xs text-muted-foreground">
                      Administrator
                    </p>

                    {user?.email && (
                      <p className="truncate text-[11px] text-muted-foreground">
                        {user.email}
                      </p>
                    )}
                  </div>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              {/* =========================
                  DASHBOARD
              ========================== */}

              <DropdownMenuItem
                onClick={() =>
                  handleNavigation("/admin")
                }
                className="cursor-pointer"
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </DropdownMenuItem>

              {/* =========================
                  USERS
              ========================== */}

              <DropdownMenuItem
                onClick={() =>
                  handleNavigation("/admin/users")
                }
                className="cursor-pointer"
              >
                <Users className="mr-2 h-4 w-4" />
                Users
              </DropdownMenuItem>

              {/* =========================
                  INSTRUCTORS
              ========================== */}

              <DropdownMenuItem
                onClick={() =>
                  handleNavigation("/admin/instructors")
                }
                className="cursor-pointer"
              >
                <UserCog className="mr-2 h-4 w-4" />
                Instructors
              </DropdownMenuItem>

              {/* =========================
                  COURSES
              ========================== */}

              <DropdownMenuItem
                onClick={() =>
                  handleNavigation("/admin/courses")
                }
                className="cursor-pointer"
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Courses
              </DropdownMenuItem>

              {/* =========================
                  CATEGORIES
              ========================== */}

              <DropdownMenuItem
                onClick={() =>
                  handleNavigation("/admin/categories")
                }
                className="cursor-pointer"
              >
                <Tags className="mr-2 h-4 w-4" />
                Categories
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              {/* =========================
                  ORDERS
              ========================== */}

              <DropdownMenuItem
                onClick={() =>
                  handleNavigation("/admin/orders")
                }
                className="cursor-pointer"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Orders
              </DropdownMenuItem>

              {/* =========================
                  PAYMENTS
              ========================== */}

              <DropdownMenuItem
                onClick={() =>
                  handleNavigation("/admin/payments")
                }
                className="cursor-pointer"
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Payments
              </DropdownMenuItem>

              {/* =========================
                  REVIEWS
              ========================== */}

              <DropdownMenuItem
                onClick={() =>
                  handleNavigation("/admin/reviews")
                }
                className="cursor-pointer"
              >
                <Star className="mr-2 h-4 w-4" />
                Reviews
              </DropdownMenuItem>

              {/* =========================
                  ASSIGNMENTS
              ========================== */}

              <DropdownMenuItem
                onClick={() =>
                  handleNavigation("/admin/assignments")
                }
                className="cursor-pointer"
              >
                <ClipboardList className="mr-2 h-4 w-4" />
                Assignments
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              {/* =========================
                  REPORTS
              ========================== */}

              <DropdownMenuItem
                onClick={() =>
                  handleNavigation("/admin/reports")
                }
                className="cursor-pointer"
              >
                <FileBarChart className="mr-2 h-4 w-4" />
                Reports
              </DropdownMenuItem>

              {/* =========================
                  ANALYTICS
              ========================== */}

              <DropdownMenuItem
                onClick={() =>
                  handleNavigation("/admin/analytics")
                }
                className="cursor-pointer"
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                Analytics
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              {/* =========================
                  PROFILE
              ========================== */}

              <DropdownMenuItem
                onClick={() =>
                  handleNavigation("/admin/profile")
                }
                className="cursor-pointer"
              >
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>

              {/* =========================
                  SETTINGS
              ========================== */}

              <DropdownMenuItem
                onClick={() =>
                  handleNavigation("/admin/settings")
                }
                className="cursor-pointer"
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              {/* =========================
                  LOGOUT
              ========================== */}

              <DropdownMenuItem
                onClick={handleLogout}
                className="
                  cursor-pointer
                  text-red-500
                  focus:text-red-500
                "
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

export default AdminTopbar;