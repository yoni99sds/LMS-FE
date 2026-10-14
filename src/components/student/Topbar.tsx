
import {
  Menu,
  Search,
  ShoppingCart,
  Bell,
  User,
  BookOpen,
  ShoppingBag,
  Settings,
  LogOut,
  Trash2,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { logout } from "@/features/auth/authSlice";

type Props = {
  openMenu: () => void;
};

interface CartItem {
  courseId: string;
  title: string;
  price: number;
  image?: string;
  instructor?: string;
  quantity?: number;
}

const CART_STORAGE_KEY = "edumaster_cart";
const CART_UPDATED_EVENT = "edumaster-cart-updated";
const CHECKOUT_PATH = "/dashboard/checkout";

const readCart = (): CartItem[] => {
  try {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);

    if (!storedCart) return [];

    const parsed: unknown = JSON.parse(storedCart);

    if (!Array.isArray(parsed)) return [];

    return parsed.filter(
      (item): item is CartItem =>
        item !== null &&
        typeof item === "object" &&
        typeof item.courseId === "string" &&
        typeof item.title === "string" &&
        typeof item.price === "number" &&
        Number.isFinite(item.price)
    );
  } catch {
    return [];
  }
};

const Topbar = ({ openMenu }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  const [profileOpen, setProfileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>(readCart);

  const firstName = user?.firstName || user?.name || "Student";
  const lastName = user?.lastName || "";
  const fullName = `${firstName} ${lastName}`.trim();

  const initials =
    `${firstName.charAt(0)}${lastName.charAt(0)}`
      .toUpperCase()
      .trim() || "S";

  const role = user?.role?.toLowerCase();
  const profilePicture = user?.profilePicture;

  // ============================================================
  // CART SYNCHRONIZATION
  // Keep the student topbar synchronized with the homepage navbar.
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
      if (
        event.key === CART_STORAGE_KEY ||
        event.key === null
      ) {
        refreshCart();
      }
    };

    window.addEventListener(
      CART_UPDATED_EVENT,
      handleCartUpdate
    );
    window.addEventListener("storage", handleStorage);

    refreshCart();

    return () => {
      window.removeEventListener(
        CART_UPDATED_EVENT,
        handleCartUpdate
      );
      window.removeEventListener("storage", handleStorage);
    };
  }, [refreshCart]);

  // ============================================================
  // CART COUNT AND SUBTOTAL
  // ============================================================
  const cartCount = cartItems.reduce(
    (total, item) =>
      total + Math.max(1, item.quantity ?? 1),
    0
  );

  const cartTotal = cartItems.reduce(
    (total, item) =>
      total + item.price * Math.max(1, item.quantity ?? 1),
    0
  );

  const formatPrice = (price: number) =>
    price.toLocaleString("en-ET", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  // ============================================================
  // NAVIGATION
  // ============================================================
  const handleNavigation = (path: string) => {
    setProfileOpen(false);
    setCartOpen(false);
    navigate(path);
  };

  // ============================================================
  // REMOVE COURSE FROM CART
  // Uses the same storage key and custom event as the homepage.
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
  // ============================================================
  const handleCheckout = () => {
    setCartOpen(false);

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
    setProfileOpen(false);
    setCartOpen(false);
    dispatch(logout());
    navigate("/");
    toast.success("Logged out successfully.");
  };

  return (
    <header
      className="
        fixed top-0 right-0 left-0 lg:left-72 z-40 h-16
        border-b border-border
        bg-background/70 backdrop-blur-xl
        supports-[backdrop-filter]:bg-background/60
      "
    >
      <div className="flex h-full items-center justify-between px-4 sm:px-6">
        {/* LEFT SIDE */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={openMenu}
            className="
              flex h-10 w-10 items-center justify-center
              rounded-xl text-muted-foreground
              transition hover:bg-muted hover:text-foreground
              lg:hidden
            "
            aria-label="Open student menu"
          >
            <Menu size={23} />
          </button>

          <div className="lg:hidden">
            <p className="text-sm font-bold leading-tight">
              EduMaster
            </p>
            <p className="text-[10px] text-muted-foreground">
              Student Portal
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* SEARCH */}
          <div
            className="
              hidden md:flex h-10 w-64 lg:w-72
              items-center gap-2 rounded-xl
              border border-border bg-background/50 px-3
              transition focus-within:border-primary
              focus-within:ring-2 focus-within:ring-primary/10
            "
          >
            <Search
              size={17}
              className="shrink-0 text-muted-foreground"
            />

            <input
              type="text"
              placeholder="Search courses..."
              aria-label="Search courses"
              className="
                w-full bg-transparent text-sm outline-none
                placeholder:text-muted-foreground
              "
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  const query = event.currentTarget.value.trim();

                  handleNavigation(
                    query
                      ? `/courses?search=${encodeURIComponent(query)}`
                      : "/courses"
                  );
                }
              }}
            />
          </div>

          {/* ==================================================
              SHOPPING CART DROPDOWN
          =================================================== */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setCartOpen((current) => !current);
                setProfileOpen(false);
              }}
              className="
                relative flex h-10 w-10 items-center justify-center
                rounded-xl text-muted-foreground
                transition hover:bg-muted hover:text-foreground
              "
              aria-label={`Shopping cart with ${cartCount} items`}
              aria-expanded={cartOpen}
              aria-haspopup="dialog"
            >
              <ShoppingCart size={20} />

              {cartCount > 0 && (
                <span
                  className="
                    absolute -right-1 -top-1
                    flex h-4 min-w-4 items-center justify-center
                    rounded-full bg-primary px-1
                    text-[10px] font-bold text-primary-foreground
                  "
                >
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </button>

            {cartOpen && (
              <>
                {/* Close dropdown when clicking outside */}
                <button
                  type="button"
                  aria-label="Close shopping cart"
                  className="fixed inset-0 z-40 cursor-default"
                  onClick={() => setCartOpen(false)}
                />

                <div
                  role="dialog"
                  aria-label="Shopping cart"
                  className="
                    absolute right-0 top-12 z-50
                    w-[380px] max-w-[calc(100vw-2rem)]
                    overflow-hidden rounded-2xl
                    border border-border bg-background
                    shadow-xl animate-in fade-in-0 zoom-in-95
                    duration-150
                  "
                >
                  {/* CART HEADER */}
                  <div className="border-b border-border px-4 py-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-semibold">
                          Shopping Cart
                        </h3>

                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {cartCount}{" "}
                          {cartCount === 1 ? "item" : "items"} in your cart
                        </p>
                      </div>

                      <ShoppingCart
                        size={20}
                        className="text-muted-foreground"
                      />
                    </div>
                  </div>

                  {/* EMPTY CART */}
                  {cartItems.length === 0 ? (
                    <div className="px-5 py-8 text-center">
                      <div
                        className="
                          mx-auto mb-3 flex h-12 w-12
                          items-center justify-center
                          rounded-full bg-muted
                        "
                      >
                        <ShoppingCart
                          size={24}
                          className="text-muted-foreground"
                        />
                      </div>

                      <p className="font-medium">
                        Your cart is empty
                      </p>

                      <p className="mt-1 text-sm text-muted-foreground">
                        Add courses to your cart to see them here.
                      </p>

                      <button
                        type="button"
                        onClick={() =>
                          handleNavigation("/courses")
                        }
                        className="
                          mt-4 rounded-lg bg-primary px-4 py-2
                          text-sm font-medium text-primary-foreground
                          transition hover:opacity-90
                        "
                      >
                        Browse Courses
                      </button>
                    </div>
                  ) : (
                    <>
                      {/* CART ITEMS */}
                      <div className="max-h-[360px] overflow-y-auto">
                        {cartItems.map((item) => {
                          const quantity = Math.max(
                            1,
                            item.quantity ?? 1
                          );

                          return (
                            <div
                              key={item.courseId}
                              className="
                                border-b border-border px-4 py-3
                                transition-colors hover:bg-muted/50
                              "
                            >
                              <div className="flex gap-3">
                                <button
                                  type="button"
                                  className="
                                    h-16 w-20 flex-shrink-0
                                    overflow-hidden rounded-md bg-muted
                                  "
                                  onClick={() =>
                                    handleNavigation(
                                      `/courses/${item.courseId}`
                                    )
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
                                      <BookOpen
                                        size={24}
                                        className="text-muted-foreground"
                                      />
                                    </div>
                                  )}
                                </button>

                                <div className="min-w-0 flex-1">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleNavigation(
                                        `/courses/${item.courseId}`
                                      )
                                    }
                                    className="w-full text-left"
                                  >
                                    <p className="line-clamp-2 text-sm font-medium transition-colors hover:text-primary">
                                      {item.title}
                                    </p>
                                  </button>

                                  <p className="mt-1 truncate text-xs text-muted-foreground">
                                    {item.instructor ||
                                      "Course instructor"}
                                  </p>

                                  <div className="mt-2 flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm font-semibold">
                                        {formatPrice(item.price)} ETB
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
                                        handleRemoveCartItem(
                                          item.courseId
                                        )
                                      }
                                      className="
                                        rounded-md p-1
                                        text-muted-foreground
                                        transition-colors
                                        hover:bg-red-500/10
                                        hover:text-red-500
                                      "
                                      aria-label={`Remove ${item.title} from cart`}
                                    >
                                      <Trash2 size={16} />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* SUBTOTAL AND ACTIONS */}
                      <div className="space-y-3 p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            Subtotal
                          </span>

                          <span className="text-lg font-bold">
                            {formatPrice(cartTotal)} ETB
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              handleNavigation("/cart")
                            }
                            className="
                              rounded-lg border border-border
                              px-3 py-2 text-sm font-medium
                              transition hover:bg-muted
                            "
                          >
                            View Cart
                          </button>

                          <button
                            type="button"
                            onClick={handleCheckout}
                            className="
                              rounded-lg bg-primary px-3 py-2
                              text-sm font-medium text-primary-foreground
                              transition hover:opacity-90
                            "
                          >
                            Checkout
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </>
            )}
          </div>

          {/* NOTIFICATIONS */}
          <button
            type="button"
            className="
              relative flex h-10 w-10 items-center justify-center
              rounded-xl text-muted-foreground
              transition hover:bg-muted hover:text-foreground
            "
            aria-label="Notifications"
          >
            <Bell size={19} />

            <span
              className="
                absolute right-1.5 top-1.5
                h-2 w-2 rounded-full bg-primary
              "
            />
          </button>

          {/* ==================================================
              PROFILE DROPDOWN
          =================================================== */}
          <div className="relative ml-1">
            <button
              type="button"
              onClick={() => {
                setProfileOpen((current) => !current);
                setCartOpen(false);
              }}
              className="
                flex h-10 w-10 shrink-0 items-center justify-center
                overflow-hidden rounded-full border-2 border-primary
                bg-primary text-sm font-bold
                text-primary-foreground transition hover:opacity-90
              "
              aria-label={`Open profile menu for ${fullName}`}
              aria-expanded={profileOpen}
            >
              {profilePicture ? (
                <img
                  src={profilePicture}
                  alt={fullName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span>{initials}</span>
              )}
            </button>

            {profileOpen && (
              <>
                <button
                  type="button"
                  aria-label="Close profile menu"
                  className="fixed inset-0 z-40 cursor-default"
                  onClick={() => setProfileOpen(false)}
                />

                <div
                  className="
                    absolute right-0 top-12 z-50 w-64
                    overflow-hidden rounded-2xl
                    border border-border bg-background
                    shadow-xl animate-in fade-in-0 zoom-in-95
                    duration-150
                  "
                >
                  {/* USER INFO */}
                  <div className="border-b border-border px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="
                          flex h-11 w-11 shrink-0 items-center
                          justify-center overflow-hidden rounded-full
                          bg-primary text-sm font-bold
                          text-primary-foreground
                        "
                      >
                        {profilePicture ? (
                          <img
                            src={profilePicture}
                            alt={fullName}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          initials
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">
                          {fullName}
                        </p>

                        <p className="truncate text-xs text-muted-foreground">
                          {user?.email || "Student"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* MENU ITEMS */}
                  <div className="p-2">
                    <button
                      type="button"
                      onClick={() =>
                        handleNavigation("/dashboard/profile")
                      }
                      className="
                        flex w-full items-center gap-3 rounded-xl
                        px-3 py-2.5 text-sm font-medium
                        transition hover:bg-muted
                      "
                    >
                      <User
                        size={18}
                        className="text-muted-foreground"
                      />
                      <span>My Profile</span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleNavigation("/dashboard/courses")
                      }
                      className="
                        flex w-full items-center gap-3 rounded-xl
                        px-3 py-2.5 text-sm font-medium
                        transition hover:bg-muted
                      "
                    >
                      <BookOpen
                        size={18}
                        className="text-muted-foreground"
                      />
                      <span>My Courses</span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleNavigation("/dashboard/orders")
                      }
                      className="
                        flex w-full items-center gap-3 rounded-xl
                        px-3 py-2.5 text-sm font-medium
                        transition hover:bg-muted
                      "
                    >
                      <ShoppingBag
                        size={18}
                        className="text-muted-foreground"
                      />
                      <span>My Orders</span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleNavigation("/dashboard/settings")
                      }
                      className="
                        flex w-full items-center gap-3 rounded-xl
                        px-3 py-2.5 text-sm font-medium
                        transition hover:bg-muted
                      "
                    >
                      <Settings
                        size={18}
                        className="text-muted-foreground"
                      />
                      <span>Settings</span>
                    </button>
                  </div>

                  {/* LOGOUT */}
                  <div className="border-t border-border p-2">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="
                        flex w-full items-center gap-3 rounded-xl
                        px-3 py-2.5 text-sm font-medium
                        text-red-500 transition hover:bg-red-500/10
                      "
                    >
                      <LogOut size={18} />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;