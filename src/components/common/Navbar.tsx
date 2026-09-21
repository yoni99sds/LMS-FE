import { Link, useNavigate } from "react-router-dom";
import {
  GraduationCap,
  Search,
  ShoppingCart,
  Menu,
  X,
  Sun,
  Moon,
  User,
  Settings,
  LogOut,
  BookOpen,
  History,
  LayoutDashboard,
  UserCog,
  Tags,
  CreditCard,
  Star,
  ClipboardList,
  FileBarChart,
  BarChart3,
  Users,
  Wallet,
  PlusCircle,
} from "lucide-react";
import { useState, useEffect } from "react";

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

import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { logout } from "@/features/auth/authSlice";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { isAuthenticated, user } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      isDarkMode
    );
  }, [isDarkMode]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setIsMenuOpen(false);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const role = user?.role?.toLowerCase();

  const profileImage = user?.profilePicture;

  const initials =
    `${user?.firstName?.[0] || ""}${user?.lastName?.[0] || ""}`.toUpperCase();

  /*
   * ============================================================
   * STUDENT MENU
   * ============================================================
   */
  const renderStudentMenu = () => {
    return (
      <>
        <DropdownMenuItem
          onClick={() => navigate("/dashboard/student")}
        >
          <LayoutDashboard className="mr-2 h-4 w-4" />
          Dashboard
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => navigate("/dashboard/courses")}
        >
          <BookOpen className="mr-2 h-4 w-4" />
          My Courses
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => navigate("/dashboard/profile")}
        >
          <User className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => navigate("/dashboard/orders")}
        >
          <History className="mr-2 h-4 w-4" />
          Order History
        </DropdownMenuItem>
      </>
    );
  };

  /*
   * ============================================================
   * INSTRUCTOR MENU
   * ============================================================
   */
  const renderInstructorMenu = () => {
    return (
      <>
        <DropdownMenuItem
          onClick={() => navigate("/instructor")}
        >
          <LayoutDashboard className="mr-2 h-4 w-4" />
          Dashboard
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => navigate("/instructor/courses")}
        >
          <BookOpen className="mr-2 h-4 w-4" />
          My Courses
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() =>
            navigate("/instructor/courses/create")
          }
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Course
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() =>
            navigate("/instructor/assignments")
          }
        >
          <ClipboardList className="mr-2 h-4 w-4" />
          Assignments
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => navigate("/instructor/students")}
        >
          <Users className="mr-2 h-4 w-4" />
          Students
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => navigate("/instructor/earnings")}
        >
          <Wallet className="mr-2 h-4 w-4" />
          Earnings
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => navigate("/instructor/reviews")}
        >
          <Star className="mr-2 h-4 w-4" />
          Reviews
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() =>
            navigate("/instructor/notifications")
          }
        >
          <History className="mr-2 h-4 w-4" />
          Notifications
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => navigate("/instructor/profile")}
        >
          <User className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => navigate("/instructor/settings")}
        >
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>
      </>
    );
  };

  /*
   * ============================================================
   * ADMIN MENU
   * ============================================================
   */
  const renderAdminMenu = () => {
    return (
      <>
        <DropdownMenuItem
          onClick={() => navigate("/admin")}
        >
          <LayoutDashboard className="mr-2 h-4 w-4" />
          Dashboard
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => navigate("/admin/users")}
        >
          <Users className="mr-2 h-4 w-4" />
          Users
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => navigate("/admin/instructors")}
        >
          <UserCog className="mr-2 h-4 w-4" />
          Instructors
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => navigate("/admin/courses")}
        >
          <BookOpen className="mr-2 h-4 w-4" />
          Courses
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => navigate("/admin/categories")}
        >
          <Tags className="mr-2 h-4 w-4" />
          Categories
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => navigate("/admin/orders")}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Orders
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => navigate("/admin/payments")}
        >
          <CreditCard className="mr-2 h-4 w-4" />
          Payments
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => navigate("/admin/reviews")}
        >
          <Star className="mr-2 h-4 w-4" />
          Reviews
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => navigate("/admin/assignments")}
        >
          <ClipboardList className="mr-2 h-4 w-4" />
          Assignments
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => navigate("/admin/reports")}
        >
          <FileBarChart className="mr-2 h-4 w-4" />
          Reports
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => navigate("/admin/analytics")}
        >
          <BarChart3 className="mr-2 h-4 w-4" />
          Analytics
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => navigate("/admin/profile")}
        >
          <User className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => navigate("/admin/settings")}
        >
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>
      </>
    );
  };

  /*
   * ============================================================
   * ROLE-BASED DROPDOWN
   * ============================================================
   */
  const renderDropdownItems = () => {
    switch (role) {
      case "admin":
        return renderAdminMenu();

      case "instructor":
        return renderInstructorMenu();

      case "student":
      default:
        return renderStudentMenu();
    }
  };

  /*
   * ============================================================
   * ROLE DISPLAY NAME
   * ============================================================
   */
  const getRoleDisplayName = () => {
    switch (role) {
      case "admin":
        return "Administrator";

      case "instructor":
        return "Instructor";

      case "student":
        return "Student";

      default:
        return "User";
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 border-b bg-background/80 backdrop-blur-md">

      {/* ======================================================
          MAIN CONTAINER
      ====================================================== */}
      <div className="h-full max-w-full px-6 flex items-center justify-between">

        {/* ====================================================
            LEFT
        ==================================================== */}
        <div className="flex items-center gap-6">

          <Link
            to="/"
            className="flex items-center gap-2"
          >
            <div className="bg-primary p-1.5 rounded-lg">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>

            <span className="hidden sm:block font-bold text-xl">
              EduMaster
            </span>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden md:flex gap-6">
            <Link
              to="/courses"
              className="transition-colors hover:text-primary"
            >
              Courses
            </Link>

            <Link
              to="/about"
              className="transition-colors hover:text-primary"
            >
              About
            </Link>

            <Link
              to="/pricing"
              className="transition-colors hover:text-primary"
            >
              Pricing
            </Link>

            <Link
              to="/blog"
              className="transition-colors hover:text-primary"
            >
              Blog
            </Link>
          </div>
        </div>

        {/* ====================================================
            RIGHT
        ==================================================== */}
        <div className="flex items-center gap-3 h-16">

          {/* SEARCH */}
          <div className="hidden md:flex relative w-[260px]">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

            <Input
              className="pl-9 h-9"
              placeholder="Search courses..."
            />
          </div>

          {/* THEME */}
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>

          {/* CART */}
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 relative"
            onClick={() => navigate("/cart")}
          >
            <ShoppingCart />

            <span className="absolute -top-1 -right-1 h-4 w-4 text-[10px] bg-primary text-white rounded-full flex items-center justify-center">
              0
            </span>
          </Button>

          {/* ==================================================
              AUTHENTICATED USER
          ================================================== */}
          {isAuthenticated ? (
            <DropdownMenu>

              <DropdownMenuTrigger asChild>
                <button
                  className="h-9 w-9 flex-shrink-0 rounded-full overflow-hidden border-2 border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-label="Open user menu"
                >
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt={`${user?.firstName || "User"} profile`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-primary text-white flex items-center justify-center font-bold">
                      {initials || "U"}
                    </div>
                  )}
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                sideOffset={8}
                className="w-60 z-[9999]"
              >

                {/* USER INFORMATION */}
                <DropdownMenuLabel>
                  <div className="flex items-center gap-3">

                    <div className="h-9 w-9 rounded-full overflow-hidden border border-primary flex-shrink-0">
                      {profileImage ? (
                        <img
                          src={profileImage}
                          alt={`${user?.firstName || "User"} profile`}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full bg-primary text-white flex items-center justify-center text-xs font-bold">
                          {initials || "U"}
                        </div>
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="font-medium truncate">
                        {user?.firstName} {user?.lastName}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {getRoleDisplayName()}
                      </p>
                    </div>

                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                {/* ROLE-SPECIFIC MENU */}
                {renderDropdownItems()}

                <DropdownMenuSeparator />

                {/* LOGOUT */}
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-500 focus:text-red-500"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>

              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            /* =================================================
               GUEST AUTH
            ================================================== */
            <div className="hidden md:flex gap-2">
              <Button
                onClick={() => navigate("/login")}
                variant="ghost"
              >
                Login
              </Button>

              <Button
                onClick={() => navigate("/register")}
              >
                Register
              </Button>
            </div>
          )}

          {/* ==================================================
              MOBILE MENU BUTTON
          ================================================== */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-9 w-9"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={
              isMenuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
          >
            {isMenuOpen ? (
              <X />
            ) : (
              <Menu />
            )}
          </Button>

        </div>
      </div>

      {/* ======================================================
          MOBILE MENU
      ====================================================== */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background p-4 space-y-4">

          {/* MOBILE SEARCH */}
          <Input
            placeholder="Search courses..."
          />

          {/* PUBLIC NAVIGATION */}
          <div className="flex flex-col gap-3">

            <Link
              to="/courses"
              onClick={() => setIsMenuOpen(false)}
            >
              Courses
            </Link>

            <Link
              to="/about"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>

            <Link
              to="/pricing"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>

            <Link
              to="/blog"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>

          </div>

          {/* MOBILE AUTHENTICATED MENU */}
          {isAuthenticated && (
            <>
              <div className="border-t pt-4">

                <div className="flex items-center gap-3 mb-3">

                  <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-primary flex-shrink-0">
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt={`${user?.firstName || "User"} profile`}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-primary text-white flex items-center justify-center font-bold">
                        {initials || "U"}
                      </div>
                    )}
                  </div>

                  <div>
                    <p className="font-medium">
                      {user?.firstName} {user?.lastName}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {getRoleDisplayName()}
                    </p>
                  </div>

                </div>

                {/* MOBILE ROLE MENU */}
                <div className="flex flex-col gap-1">

                  {role === "admin" && (
                    <>
                      <button
                        onClick={() => handleNavigate("/admin")}
                        className="flex items-center gap-3 rounded-md px-3 py-2 text-left hover:bg-muted"
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                      </button>

                      <button
                        onClick={() => handleNavigate("/admin/users")}
                        className="flex items-center gap-3 rounded-md px-3 py-2 text-left hover:bg-muted"
                      >
                        <Users className="h-4 w-4" />
                        Users
                      </button>

                      <button
                        onClick={() => handleNavigate("/admin/instructors")}
                        className="flex items-center gap-3 rounded-md px-3 py-2 text-left hover:bg-muted"
                      >
                        <UserCog className="h-4 w-4" />
                        Instructors
                      </button>

                      <button
                        onClick={() => handleNavigate("/admin/courses")}
                        className="flex items-center gap-3 rounded-md px-3 py-2 text-left hover:bg-muted"
                      >
                        <BookOpen className="h-4 w-4" />
                        Courses
                      </button>

                      <button
                        onClick={() => handleNavigate("/admin/categories")}
                        className="flex items-center gap-3 rounded-md px-3 py-2 text-left hover:bg-muted"
                      >
                        <Tags className="h-4 w-4" />
                        Categories
                      </button>

                      <button
                        onClick={() => handleNavigate("/admin/orders")}
                        className="flex items-center gap-3 rounded-md px-3 py-2 text-left hover:bg-muted"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        Orders
                      </button>

                      <button
                        onClick={() => handleNavigate("/admin/payments")}
                        className="flex items-center gap-3 rounded-md px-3 py-2 text-left hover:bg-muted"
                      >
                        <CreditCard className="h-4 w-4" />
                        Payments
                      </button>

                      <button
                        onClick={() => handleNavigate("/admin/reviews")}
                        className="flex items-center gap-3 rounded-md px-3 py-2 text-left hover:bg-muted"
                      >
                        <Star className="h-4 w-4" />
                        Reviews
                      </button>

                      <button
                        onClick={() => handleNavigate("/admin/assignments")}
                        className="flex items-center gap-3 rounded-md px-3 py-2 text-left hover:bg-muted"
                      >
                        <ClipboardList className="h-4 w-4" />
                        Assignments
                      </button>

                      <button
                        onClick={() => handleNavigate("/admin/reports")}
                        className="flex items-center gap-3 rounded-md px-3 py-2 text-left hover:bg-muted"
                      >
                        <FileBarChart className="h-4 w-4" />
                        Reports
                      </button>

                      <button
                        onClick={() => handleNavigate("/admin/analytics")}
                        className="flex items-center gap-3 rounded-md px-3 py-2 text-left hover:bg-muted"
                      >
                        <BarChart3 className="h-4 w-4" />
                        Analytics
                      </button>

                      <button
                        onClick={() => handleNavigate("/admin/profile")}
                        className="flex items-center gap-3 rounded-md px-3 py-2 text-left hover:bg-muted"
                      >
                        <User className="h-4 w-4" />
                        Profile
                      </button>

                      <button
                        onClick={() => handleNavigate("/admin/settings")}
                        className="flex items-center gap-3 rounded-md px-3 py-2 text-left hover:bg-muted"
                      >
                        <Settings className="h-4 w-4" />
                        Settings
                      </button>
                    </>
                  )}

                  {role === "instructor" && (
                    <>
                      <button
                        onClick={() => handleNavigate("/instructor")}
                        className="flex items-center gap-3 rounded-md px-3 py-2 text-left hover:bg-muted"
                      >
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                      </button>

                      <button
                        onClick={() =>
                          handleNavigate("/instructor/courses")
                        }
                        className="flex items-center gap-3 rounded-md px-3 py-2 text-left hover:bg-muted"
                      >
                        <BookOpen className="h-4 w-4" />
                        My Courses
                      </button>

                      <button
                        onClick={() =>
                          handleNavigate(
                            "/instructor/courses/create"
                          )
                        }
                        className="flex items-center gap-3 rounded-md px-3 py-2 text-left hover:bg-muted"
                      >
                        <PlusCircle className="h-4 w-4" />
                        Create Course
                      </button>

                      <button
                        onClick={() =>
                          handleNavigate(
                            "/instructor/assignments"
                          )
                        }
                        className="flex items-center gap-3 rounded-md px-3 py-2 text-left hover:bg-muted"
                      >
                        <ClipboardList className="h-4 w-4" />
                        Assignments
                      </button>

                      <button
                        onClick={() =>
                          handleNavigate(
                            "/instructor/students"
                          )
                        }
                        className="flex items-center gap-3 rounded-md px-3 py-2 text-left hover:bg-muted"
                      >
                        <Users className="h-4 w-4" />
                        Students
                      </button>

                      <button
                        onClick={() =>
                          handleNavigate(
                            "/instructor/earnings"
                          )
                        }
                        className="flex items-center gap-3 rounded-md px-3 py-2 text-left hover:bg-muted"
                      >
                        <Wallet className="h-4 w-4" />
                        Earnings
                      </button>

                      <button
                        onClick={() =>
                          handleNavigate(
                            "/instructor/reviews"
                          )
                        }
                        className="flex items-center gap-3 rounded-md px-3 py-2 text-left hover:bg-muted"
                      >
                        <Star className="h-4 w-4" />
                        Reviews
                      </button>

                      <button
                        onClick={() =>
                          handleNavigate(
                            "/instructor/profile"
                          )
                        }
                        className="flex items-center gap-3 rounded-md px-3 py-2 text-left hover:bg-muted"
                      >
                        <User className="h-4 w-4" />
                        Profile
                      </button>

                      <button
                        onClick={() =>
                          handleNavigate(
                            "/instructor/settings"
                          )
                        }
                        className="flex items-center gap-3 rounded-md px-3 py-2 text-left hover:bg-muted"
                      >
                        <Settings className="h-4 w-4" />
                        Settings
                      </button>
                    </>
                  )}

                  {role !== "admin" &&
                    role !== "instructor" && (
                      <>
                        <button
                          onClick={() =>
                            handleNavigate(
                              "/dashboard/student"
                            )
                          }
                          className="flex items-center gap-3 rounded-md px-3 py-2 text-left hover:bg-muted"
                        >
                          <LayoutDashboard className="h-4 w-4" />
                          Dashboard
                        </button>

                        <button
                          onClick={() =>
                            handleNavigate(
                              "/dashboard/courses"
                            )
                          }
                          className="flex items-center gap-3 rounded-md px-3 py-2 text-left hover:bg-muted"
                        >
                          <BookOpen className="h-4 w-4" />
                          My Courses
                        </button>

                        <button
                          onClick={() =>
                            handleNavigate(
                              "/dashboard/profile"
                            )
                          }
                          className="flex items-center gap-3 rounded-md px-3 py-2 text-left hover:bg-muted"
                        >
                          <User className="h-4 w-4" />
                          Profile
                        </button>

                        <button
                          onClick={() =>
                            handleNavigate(
                              "/dashboard/orders"
                            )
                          }
                          className="flex items-center gap-3 rounded-md px-3 py-2 text-left hover:bg-muted"
                        >
                          <History className="h-4 w-4" />
                          Order History
                        </button>
                      </>
                    )}

                </div>

                {/* MOBILE LOGOUT */}
                <div className="border-t mt-3 pt-3">

                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-red-500 hover:bg-red-500/10"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>

                </div>

              </div>
            </>
          )}

          {/* MOBILE GUEST BUTTONS */}
          {!isAuthenticated && (
            <div className="flex gap-2 border-t pt-4">
              <Button
                onClick={() => {
                  navigate("/login");
                  setIsMenuOpen(false);
                }}
                variant="outline"
                className="flex-1"
              >
                Login
              </Button>

              <Button
                onClick={() => {
                  navigate("/register");
                  setIsMenuOpen(false);
                }}
                className="flex-1"
              >
                Register
              </Button>
            </div>
          )}

        </div>
      )}
    </nav>
  );
};

export default Navbar;