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
  ChevronDown,
  Code2,
  Database,
  Palette,
  Briefcase,
  Megaphone,
  Trash2,
} from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import { toast } from "sonner";

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

interface CartItem {
  courseId: string;
  title: string;
  price: number;
  image: string;
  instructor: string;
  quantity?: number;
}

const CART_STORAGE_KEY = "edumaster_cart";
const CART_UPDATED_EVENT = "edumaster-cart-updated";
const CHECKOUT_PATH = "/dashboard/checkout";
const THEME_STORAGE_KEY = "edumaster_theme";

const readCart = (): CartItem[] => {
  try {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);

    if (!storedCart) return [];

    const parsedCart: unknown = JSON.parse(storedCart);

    if (!Array.isArray(parsedCart)) return [];

    return parsedCart.filter(
      (item): item is CartItem =>
        item !== null &&
        typeof item === "object" &&
        typeof item.courseId === "string" &&
        typeof item.title === "string" &&
        typeof item.price === "number"
    );
  } catch {
    return [];
  }
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      return localStorage.getItem(THEME_STORAGE_KEY) === "dark";
    } catch {
      return false;
    }
  });
  const [isCoursesMenuOpen, setIsCoursesMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>(readCart);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { isAuthenticated, user } = useAppSelector(
    (state) => state.auth
  );

  const role = user?.role?.toLowerCase();
  const isStudent = isAuthenticated && role === "student";
  const shouldShowCart = !isAuthenticated || isStudent;
  const profileImage = user?.profilePicture;

  const initials = `${user?.firstName?.[0] || ""}${
    user?.lastName?.[0] || ""
  }`.toUpperCase();

  // ============================================================
  // DARK MODE: RESTORE AND PERSIST
  // ============================================================
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);

    try {
      localStorage.setItem(
        THEME_STORAGE_KEY,
        isDarkMode ? "dark" : "light"
      );
    } catch {
      // Continue if browser storage is unavailable.
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((previous) => !previous);
  };

  // ============================================================
  // CART SYNCHRONIZATION
  // ============================================================
  const refreshCart = useCallback(() => {
    setCartItems(readCart());
  }, []);

  useEffect(() => {
    const handleCartUpdate = (event: Event) => {
      const customEvent = event as CustomEvent<CartItem[]>;

      if (Array.isArray(customEvent.detail)) {
        setCartItems(customEvent.detail);
      } else {
        refreshCart();
      }
    };

    const handleStorage = (event: StorageEvent) => {
      if (event.key === CART_STORAGE_KEY || event.key === null) {
        refreshCart();
      }
    };

    window.addEventListener(CART_UPDATED_EVENT, handleCartUpdate);
    window.addEventListener("storage", handleStorage);

    refreshCart();

    return () => {
      window.removeEventListener(CART_UPDATED_EVENT, handleCartUpdate);
      window.removeEventListener("storage", handleStorage);
    };
  }, [refreshCart]);

  // ============================================================
  // CART COUNT AND TOTAL
  // ============================================================
  const cartCount = cartItems.reduce(
    (total, item) => total + Math.max(1, item.quantity ?? 1),
    0
  );

  const cartTotal = cartItems.reduce(
    (total, item) =>
      total + item.price * Math.max(1, item.quantity ?? 1),
    0
  );

  // ============================================================
  // REMOVE COURSE FROM CART
  // ============================================================
  const handleRemoveCartItem = (courseId: string) => {
    const updatedCart = cartItems.filter(
      (item) => item.courseId !== courseId
    );

    try {
      localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(updatedCart)
      );

      setCartItems(updatedCart);

      window.dispatchEvent(
        new CustomEvent(CART_UPDATED_EVENT, {
          detail: updatedCart,
        })
      );

      toast.success("Course removed from cart.");
    } catch (error) {
      console.error("Failed to update cart:", error);
      toast.error("Could not update your cart. Please try again.");
    }
  };

  // ============================================================
  // CHECKOUT
  // Guest -> login, preserving checkout destination.
  // Student -> checkout directly.
  // Admin/instructor -> blocked.
  // ============================================================
  const handleCheckout = () => {
    setIsMenuOpen(false);
    setIsCoursesMenuOpen(false);

    if (cartItems.length === 0) {
      toast.error("Your cart is empty.");
      navigate("/courses");
      return;
    }

    if (!isAuthenticated) {
      navigate("/login", {
        state: {
          from: CHECKOUT_PATH,
        },
      });
      return;
    }

    if (role !== "student") {
      toast.error("Only student accounts can proceed to checkout.");
      return;
    }

    navigate(CHECKOUT_PATH);
  };

  // ============================================================
  // LOGOUT
  // ============================================================
  const handleLogout = () => {
    dispatch(logout());
    setIsMenuOpen(false);
    setIsCoursesMenuOpen(false);
    navigate("/");
    toast.success("Logged out successfully.");
  };

  // ============================================================
  // NAVIGATION
  // ============================================================
  const handleNavigate = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
    setIsCoursesMenuOpen(false);
  };

  const handleCourseCategory = (category?: string) => {
    if (!category) {
      navigate("/courses");
    } else {
      navigate(`/courses?category=${encodeURIComponent(category)}`);
    }

    setIsMenuOpen(false);
    setIsCoursesMenuOpen(false);
  };

  // ============================================================
  // ROLE DISPLAY NAME
  // ============================================================
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

  // ============================================================
  // STUDENT DESKTOP MENU
  // ============================================================
  const renderStudentMenu = () => (
    <>
      <DropdownMenuItem
        onClick={() => handleNavigate("/dashboard/student")}
      >
        <LayoutDashboard className="mr-2 h-4 w-4" />
        Dashboard
      </DropdownMenuItem>

      <DropdownMenuItem
        onClick={() => handleNavigate("/dashboard/courses")}
      >
        <BookOpen className="mr-2 h-4 w-4" />
        My Courses
      </DropdownMenuItem>

      <DropdownMenuItem
        onClick={() => handleNavigate("/dashboard/profile")}
      >
        <User className="mr-2 h-4 w-4" />
        Profile
      </DropdownMenuItem>

      <DropdownMenuItem
        onClick={() => handleNavigate("/dashboard/orders")}
      >
        <History className="mr-2 h-4 w-4" />
        Order History
      </DropdownMenuItem>
    </>
  );

  // ============================================================
  // INSTRUCTOR DESKTOP MENU
  // ============================================================
  const renderInstructorMenu = () => (
    <>
      <DropdownMenuItem
        onClick={() => handleNavigate("/instructor/dashboard")}
      >
        <LayoutDashboard className="mr-2 h-4 w-4" />
        Dashboard
      </DropdownMenuItem>

      <DropdownMenuItem
        onClick={() => handleNavigate("/instructor/courses")}
      >
        <BookOpen className="mr-2 h-4 w-4" />
        My Courses
      </DropdownMenuItem>

      <DropdownMenuItem
        onClick={() => handleNavigate("/instructor/courses/create")}
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Create Course
      </DropdownMenuItem>

      <DropdownMenuItem
        onClick={() => handleNavigate("/instructor/assignments")}
      >
        <ClipboardList className="mr-2 h-4 w-4" />
        Assignments
      </DropdownMenuItem>

      <DropdownMenuItem
        onClick={() => handleNavigate("/instructor/students")}
      >
        <Users className="mr-2 h-4 w-4" />
        Students
      </DropdownMenuItem>

      <DropdownMenuItem
        onClick={() => handleNavigate("/instructor/revenue")}
      >
        <Wallet className="mr-2 h-4 w-4" />
        Revenue
      </DropdownMenuItem>

      <DropdownMenuItem
        onClick={() => handleNavigate("/instructor/reviews")}
      >
        <Star className="mr-2 h-4 w-4" />
        Reviews
      </DropdownMenuItem>

      <DropdownMenuSeparator />

      <DropdownMenuItem
        onClick={() => handleNavigate("/instructor/profile")}
      >
        <User className="mr-2 h-4 w-4" />
        Profile
      </DropdownMenuItem>

      <DropdownMenuItem
        onClick={() => handleNavigate("/instructor/settings")}
      >
        <Settings className="mr-2 h-4 w-4" />
        Settings
      </DropdownMenuItem>
    </>
  );

  // ============================================================
  // ADMIN DESKTOP MENU
  // ============================================================
  const renderAdminMenu = () => (
    <>
      <DropdownMenuItem onClick={() => handleNavigate("/admin")}>
        <LayoutDashboard className="mr-2 h-4 w-4" />
        Dashboard
      </DropdownMenuItem>

      <DropdownMenuItem onClick={() => handleNavigate("/admin/users")}>
        <Users className="mr-2 h-4 w-4" />
        Users
      </DropdownMenuItem>

      <DropdownMenuItem
        onClick={() => handleNavigate("/admin/instructors")}
      >
        <UserCog className="mr-2 h-4 w-4" />
        Instructors
      </DropdownMenuItem>

      <DropdownMenuItem onClick={() => handleNavigate("/admin/courses")}>
        <BookOpen className="mr-2 h-4 w-4" />
        Courses
      </DropdownMenuItem>

      <DropdownMenuItem
        onClick={() => handleNavigate("/admin/categories")}
      >
        <Tags className="mr-2 h-4 w-4" />
        Categories
      </DropdownMenuItem>

      <DropdownMenuItem onClick={() => handleNavigate("/admin/orders")}>
        <ShoppingCart className="mr-2 h-4 w-4" />
        Orders
      </DropdownMenuItem>

      <DropdownMenuItem
        onClick={() => handleNavigate("/admin/payments")}
      >
        <CreditCard className="mr-2 h-4 w-4" />
        Payments
      </DropdownMenuItem>

      <DropdownMenuItem onClick={() => handleNavigate("/admin/reviews")}>
        <Star className="mr-2 h-4 w-4" />
        Reviews
      </DropdownMenuItem>

      <DropdownMenuItem
        onClick={() => handleNavigate("/admin/assignments")}
      >
        <ClipboardList className="mr-2 h-4 w-4" />
        Assignments
      </DropdownMenuItem>

      <DropdownMenuItem onClick={() => handleNavigate("/admin/reports")}>
        <FileBarChart className="mr-2 h-4 w-4" />
        Reports
      </DropdownMenuItem>

      <DropdownMenuItem
        onClick={() => handleNavigate("/admin/analytics")}
      >
        <BarChart3 className="mr-2 h-4 w-4" />
        Analytics
      </DropdownMenuItem>

      <DropdownMenuSeparator />

      <DropdownMenuItem onClick={() => handleNavigate("/admin/profile")}>
        <User className="mr-2 h-4 w-4" />
        Profile
      </DropdownMenuItem>

      <DropdownMenuItem onClick={() => handleNavigate("/admin/settings")}>
        <Settings className="mr-2 h-4 w-4" />
        Settings
      </DropdownMenuItem>
    </>
  );

  const renderDropdownItems = () => {
    switch (role) {
      case "admin":
        return renderAdminMenu();
      case "instructor":
        return renderInstructorMenu();
      case "student":
        return renderStudentMenu();
      default:
        return null;
    }
  };

  // ============================================================
  // COURSE CATEGORY MENU
  // ============================================================
  const renderCourseCategories = () => (
    <>
      <DropdownMenuItem onClick={() => handleCourseCategory()}>
        <BookOpen className="mr-2 h-4 w-4" />
        All Courses
      </DropdownMenuItem>

      <DropdownMenuItem
        onClick={() => handleCourseCategory("Development")}
      >
        <Code2 className="mr-2 h-4 w-4" />
        Development
      </DropdownMenuItem>

      <DropdownMenuItem
        onClick={() => handleCourseCategory("Data Science")}
      >
        <Database className="mr-2 h-4 w-4" />
        Data Science
      </DropdownMenuItem>

      <DropdownMenuItem onClick={() => handleCourseCategory("Design")}>
        <Palette className="mr-2 h-4 w-4" />
        Design
      </DropdownMenuItem>

      <DropdownMenuItem onClick={() => handleCourseCategory("Business")}>
        <Briefcase className="mr-2 h-4 w-4" />
        Business
      </DropdownMenuItem>

      <DropdownMenuItem onClick={() => handleCourseCategory("Marketing")}>
        <Megaphone className="mr-2 h-4 w-4" />
        Marketing
      </DropdownMenuItem>
    </>
  );

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 h-16 border-b bg-background/80 backdrop-blur-md">
      <div className="flex h-full max-w-full items-center justify-between px-6">
        {/* LOGO AND DESKTOP NAVIGATION */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="flex items-center gap-2"
            onClick={() => {
              setIsMenuOpen(false);
              setIsCoursesMenuOpen(false);
            }}
          >
            <div className="rounded-lg bg-primary p-1.5">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>

            <span className="hidden text-xl font-bold sm:block">
              EduMaster
            </span>
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="flex items-center gap-1 outline-none transition-colors hover:text-primary"
                  type="button"
                >
                  Courses
                  <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="start"
                sideOffset={8}
                className="z-[9999] w-56"
              >
                <DropdownMenuLabel>Browse Courses</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {renderCourseCategories()}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/about" className="transition-colors hover:text-primary">
              About
            </Link>

            <Link to="/pricing" className="transition-colors hover:text-primary">
              Pricing
            </Link>

            <Link to="/blog" className="transition-colors hover:text-primary">
              Blog
            </Link>
          </div>
        </div>

        {/* SEARCH, THEME, CART AND USER */}
        <div className="flex h-16 items-center gap-3">
          <div className="relative hidden w-[260px] md:flex">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              className="h-9 pl-9"
              placeholder="Search courses..."
              aria-label="Search courses"
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  const query = event.currentTarget.value.trim();

                  navigate(
                    query
                      ? `/courses?search=${encodeURIComponent(query)}`
                      : "/courses"
                  );
                }
              }}
            />
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            onClick={toggleDarkMode}
            aria-label={
              isDarkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {isDarkMode ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>

          {/* CART: GUESTS AND STUDENTS */}
          {shouldShowCart && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative h-9 w-9"
                  aria-label={`Shopping cart with ${cartCount} items`}
                >
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                      {cartCount > 99 ? "99+" : cartCount}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                sideOffset={8}
                className="z-[9999] w-[380px] max-w-[calc(100vw-2rem)] p-0"
              >
                <div className="border-b px-4 py-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-semibold">
                        Shopping Cart
                      </h3>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {cartCount} {cartCount === 1 ? "item" : "items"} in your cart
                      </p>
                    </div>
                    <ShoppingCart className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>

                {cartItems.length === 0 ? (
                  <div className="px-5 py-8 text-center">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                      <ShoppingCart className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <p className="font-medium">Your cart is empty</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Add courses to your cart to see them here.
                    </p>
                    <Button
                      className="mt-4"
                      size="sm"
                      onClick={() => handleNavigate("/courses")}
                    >
                      Browse Courses
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="max-h-[360px] overflow-y-auto">
                      {cartItems.map((item) => {
                        const quantity = Math.max(1, item.quantity ?? 1);

                        return (
                          <div
                            key={item.courseId}
                            className="border-b px-4 py-3 transition-colors hover:bg-muted/50"
                          >
                            <div className="flex gap-3">
                              <button
                                type="button"
                                className="h-16 w-20 flex-shrink-0 overflow-hidden rounded-md bg-muted"
                                onClick={() =>
                                  handleNavigate(`/courses/${item.courseId}`)
                                }
                                aria-label={`View ${item.title}`}
                              >
                                {item.image ? (
                                  <img
                                    src={item.image}
                                    alt={item.title}
                                    className="h-full w-full object-cover"
                                  />
                                ) : (
                                  <div className="flex h-full w-full items-center justify-center">
                                    <BookOpen className="h-6 w-6 text-muted-foreground" />
                                  </div>
                                )}
                              </button>

                              <div className="min-w-0 flex-1">
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleNavigate(`/courses/${item.courseId}`)
                                  }
                                  className="w-full text-left"
                                >
                                  <p className="line-clamp-2 text-sm font-medium transition-colors hover:text-primary">
                                    {item.title}
                                  </p>
                                </button>

                                <p className="mt-1 truncate text-xs text-muted-foreground">
                                  {item.instructor || "Course instructor"}
                                </p>

                                <div className="mt-2 flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-semibold">
                                      {item.price.toFixed(2)} ETB
                                    </span>
                                    {quantity > 1 && (
                                      <span className="text-xs text-muted-foreground">
                                        × {quantity}
                                      </span>
                                    )}
                                  </div>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleRemoveCartItem(item.courseId)
                                    }
                                    className="text-muted-foreground transition-colors hover:text-red-500"
                                    aria-label={`Remove ${item.title} from cart`}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="space-y-3 p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          Subtotal
                        </span>
                        <span className="text-lg font-bold">
                          {cartTotal.toLocaleString("en-ET", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}{" "}
                          ETB
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          variant="outline"
                          onClick={() => handleNavigate("/cart")}
                        >
                          View Cart
                        </Button>
                        <Button onClick={handleCheckout}>
                          Checkout
                        </Button>
                      </div>

                      {!isAuthenticated && (
                        <p className="text-center text-xs text-muted-foreground">
                          Sign in with a student account to complete checkout.
                        </p>
                      )}
                    </div>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* AUTHENTICATED USER */}
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="h-9 w-9 flex-shrink-0 overflow-hidden rounded-full border-2 border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-label="Open user menu"
                  type="button"
                >
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt={`${user?.firstName || "User"} profile`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-primary font-bold text-white">
                      {initials || "U"}
                    </div>
                  )}
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                sideOffset={8}
                className="z-[9999] w-60"
              >
                <DropdownMenuLabel>
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 flex-shrink-0 overflow-hidden rounded-full border border-primary">
                      {profileImage ? (
                        <img
                          src={profileImage}
                          alt={`${user?.firstName || "User"} profile`}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-primary text-xs font-bold text-white">
                          {initials || "U"}
                        </div>
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-medium">
                        {user?.firstName || user?.name || "User"}{" "}
                        {user?.lastName || ""}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {getRoleDisplayName()}
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
                {renderDropdownItems()}
                <DropdownMenuSeparator />

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
            <div className="hidden gap-2 md:flex">
              <Button onClick={() => navigate("/login")} variant="ghost">
                Login
              </Button>
              <Button onClick={() => navigate("/register")}>
                Register
              </Button>
            </div>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 md:hidden"
            onClick={() => setIsMenuOpen((previous) => !previous)}
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="max-h-[calc(100vh-4rem)] space-y-4 overflow-y-auto border-t bg-background p-4 md:hidden">
          <Input
            placeholder="Search courses..."
            aria-label="Search courses"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                const query = event.currentTarget.value.trim();
                handleNavigate(
                  query
                    ? `/courses?search=${encodeURIComponent(query)}`
                    : "/courses"
                );
              }
            }}
          />

          {shouldShowCart && (
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => handleNavigate("/cart")}
                className="flex w-full items-center justify-between rounded-md px-3 py-2 hover:bg-muted"
              >
                <span className="flex items-center gap-3">
                  <ShoppingCart className="h-5 w-5" />
                  Shopping Cart
                </span>
                <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-primary px-2 text-xs font-bold text-primary-foreground">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              </button>

              {cartItems.length > 0 && (
                <Button className="w-full" onClick={handleCheckout}>
                  Checkout · {cartTotal.toLocaleString("en-ET")} ETB
                </Button>
              )}
            </div>
          )}

          <div className="flex flex-col gap-1">
            <button
              type="button"
              onClick={() => setIsCoursesMenuOpen((previous) => !previous)}
              className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left hover:bg-muted"
            >
              <span className="flex items-center gap-3">
                <BookOpen className="h-5 w-5" />
                Courses
              </span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  isCoursesMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isCoursesMenuOpen && (
              <div className="ml-4 space-y-1 border-l pl-3">
                {[
                  { label: "All Courses", icon: <BookOpen className="h-4 w-4" /> },
                  { label: "Development", icon: <Code2 className="h-4 w-4" /> },
                  { label: "Data Science", icon: <Database className="h-4 w-4" /> },
                  { label: "Design", icon: <Palette className="h-4 w-4" /> },
                  { label: "Business", icon: <Briefcase className="h-4 w-4" /> },
                  { label: "Marketing", icon: <Megaphone className="h-4 w-4" /> },
                ].map((category) => (
                  <button
                    key={category.label}
                    type="button"
                    onClick={() =>
                      handleCourseCategory(
                        category.label === "All Courses"
                          ? undefined
                          : category.label
                      )
                    }
                    className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm hover:bg-muted"
                  >
                    {category.icon}
                    {category.label}
                  </button>
                ))}
              </div>
            )}

            <Link
              to="/about"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-md px-3 py-2 hover:bg-muted"
            >
              About
            </Link>
            <Link
              to="/pricing"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-md px-3 py-2 hover:bg-muted"
            >
              Pricing
            </Link>
            <Link
              to="/blog"
              onClick={() => setIsMenuOpen(false)}
              className="rounded-md px-3 py-2 hover:bg-muted"
            >
              Blog
            </Link>
          </div>

          {isAuthenticated && (
            <div className="border-t pt-4">
              <div className="mb-3 flex items-center gap-3">
                <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border-2 border-primary">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt={`${user?.firstName || "User"} profile`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-primary font-bold text-white">
                      {initials || "U"}
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="truncate font-medium">
                    {user?.firstName || user?.name || "User"}{" "}
                    {user?.lastName || ""}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {getRoleDisplayName()}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                {role === "admin" && (
                  <>
                    <MobileMenuButton icon={<LayoutDashboard className="h-4 w-4" />} label="Dashboard" onClick={() => handleNavigate("/admin")} />
                    <MobileMenuButton icon={<Users className="h-4 w-4" />} label="Users" onClick={() => handleNavigate("/admin/users")} />
                    <MobileMenuButton icon={<UserCog className="h-4 w-4" />} label="Instructors" onClick={() => handleNavigate("/admin/instructors")} />
                    <MobileMenuButton icon={<BookOpen className="h-4 w-4" />} label="Courses" onClick={() => handleNavigate("/admin/courses")} />
                    <MobileMenuButton icon={<Tags className="h-4 w-4" />} label="Categories" onClick={() => handleNavigate("/admin/categories")} />
                    <MobileMenuButton icon={<ShoppingCart className="h-4 w-4" />} label="Orders" onClick={() => handleNavigate("/admin/orders")} />
                    <MobileMenuButton icon={<CreditCard className="h-4 w-4" />} label="Payments" onClick={() => handleNavigate("/admin/payments")} />
                    <MobileMenuButton icon={<Star className="h-4 w-4" />} label="Reviews" onClick={() => handleNavigate("/admin/reviews")} />
                    <MobileMenuButton icon={<ClipboardList className="h-4 w-4" />} label="Assignments" onClick={() => handleNavigate("/admin/assignments")} />
                    <MobileMenuButton icon={<FileBarChart className="h-4 w-4" />} label="Reports" onClick={() => handleNavigate("/admin/reports")} />
                    <MobileMenuButton icon={<BarChart3 className="h-4 w-4" />} label="Analytics" onClick={() => handleNavigate("/admin/analytics")} />
                    <MobileMenuButton icon={<User className="h-4 w-4" />} label="Profile" onClick={() => handleNavigate("/admin/profile")} />
                    <MobileMenuButton icon={<Settings className="h-4 w-4" />} label="Settings" onClick={() => handleNavigate("/admin/settings")} />
                  </>
                )}

                {role === "instructor" && (
                  <>
                    <MobileMenuButton icon={<LayoutDashboard className="h-4 w-4" />} label="Dashboard" onClick={() => handleNavigate("/instructor/dashboard")} />
                    <MobileMenuButton icon={<BookOpen className="h-4 w-4" />} label="My Courses" onClick={() => handleNavigate("/instructor/courses")} />
                    <MobileMenuButton icon={<PlusCircle className="h-4 w-4" />} label="Create Course" onClick={() => handleNavigate("/instructor/courses/create")} />
                    <MobileMenuButton icon={<ClipboardList className="h-4 w-4" />} label="Assignments" onClick={() => handleNavigate("/instructor/assignments")} />
                    <MobileMenuButton icon={<Users className="h-4 w-4" />} label="Students" onClick={() => handleNavigate("/instructor/students")} />
                    <MobileMenuButton icon={<Wallet className="h-4 w-4" />} label="Revenue" onClick={() => handleNavigate("/instructor/revenue")} />
                    <MobileMenuButton icon={<Star className="h-4 w-4" />} label="Reviews" onClick={() => handleNavigate("/instructor/reviews")} />
                    <MobileMenuButton icon={<User className="h-4 w-4" />} label="Profile" onClick={() => handleNavigate("/instructor/profile")} />
                    <MobileMenuButton icon={<Settings className="h-4 w-4" />} label="Settings" onClick={() => handleNavigate("/instructor/settings")} />
                  </>
                )}

                {role === "student" && (
                  <>
                    <MobileMenuButton icon={<LayoutDashboard className="h-4 w-4" />} label="Dashboard" onClick={() => handleNavigate("/dashboard/student")} />
                    <MobileMenuButton icon={<BookOpen className="h-4 w-4" />} label="My Courses" onClick={() => handleNavigate("/dashboard/courses")} />
                    <MobileMenuButton icon={<User className="h-4 w-4" />} label="Profile" onClick={() => handleNavigate("/dashboard/profile")} />
                    <MobileMenuButton icon={<History className="h-4 w-4" />} label="Order History" onClick={() => handleNavigate("/dashboard/orders")} />
                  </>
                )}
              </div>

              <div className="mt-3 border-t pt-3">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-red-500 hover:bg-red-500/10"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            </div>
          )}

          {!isAuthenticated && (
            <div className="flex gap-2 border-t pt-4">
              <Button
                onClick={() => handleNavigate("/login")}
                variant="outline"
                className="flex-1"
              >
                Login
              </Button>
              <Button
                onClick={() => handleNavigate("/register")}
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

interface MobileMenuButtonProps {
  icon: ReactNode;
  label: string;
  onClick: () => void;
}

const MobileMenuButton = ({
  icon,
  label,
  onClick,
}: MobileMenuButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    className="flex items-center gap-3 rounded-md px-3 py-2 text-left hover:bg-muted"
  >
    {icon}
    {label}
  </button>
);

export default Navbar;

