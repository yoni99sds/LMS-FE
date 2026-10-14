
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Loader2,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/redux";
import api from "@/lib/api";
import StudentLayout from "@/layouts/StudentLayout";

const CART_KEY = "edumaster_cart";
const CART_EVENT = "edumaster-cart-updated";
const CHECKOUT_PATH = "/dashboard/checkout";

interface CartItem {
  id?: string;
  _id?: string;
  courseId?: string;
  title?: string;
  name?: string;
  price?: number | string;
  thumbnail?: string;
  image?: string;
  instructor?: string | { name?: string };
  quantity?: number;
}

interface OrderResponse {
  _id?: string;
  id?: string;
}

const getCourseId = (item: CartItem): string =>
  String(item.courseId ?? item._id ?? item.id ?? "");

const getCourseTitle = (item: CartItem): string =>
  item.title ?? item.name ?? "Untitled course";

const getCoursePrice = (item: CartItem): number => {
  const price = Number(item.price ?? 0);
  return Number.isFinite(price) && price >= 0 ? price : 0;
};

const readCart = (): CartItem[] => {
  try {
    const stored = localStorage.getItem(CART_KEY);

    if (!stored) return [];

    const parsed: unknown = JSON.parse(stored);

    return Array.isArray(parsed) ? (parsed as CartItem[]) : [];
  } catch {
    return [];
  }
};

const CheckoutPage = () => {
  const navigate = useNavigate();

  const { user, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  const [cart, setCart] = useState<CartItem[]>(readCart);
  const [submitting, setSubmitting] = useState(false);

  const role = String(user?.role ?? "").toLowerCase();

  // Keep the checkout cart synchronized with the cart page.
  useEffect(() => {
    const refreshCart = () => {
      setCart(readCart());
    };

    window.addEventListener(CART_EVENT, refreshCart);
    window.addEventListener("cartUpdated", refreshCart);
    window.addEventListener("storage", refreshCart);

    return () => {
      window.removeEventListener(CART_EVENT, refreshCart);
      window.removeEventListener("cartUpdated", refreshCart);
      window.removeEventListener("storage", refreshCart);
    };
  }, []);

  // Only authenticated students can access checkout.
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", {
        replace: true,
        state: { from: CHECKOUT_PATH },
      });

      return;
    }

    if (role !== "student") {
      toast.error("Only student accounts can access checkout.");

      if (role === "admin") {
        navigate("/admin", { replace: true });
      } else if (role === "instructor") {
        navigate("/instructor/dashboard", { replace: true });
      } else {
        navigate("/login", { replace: true });
      }
    }
  }, [isAuthenticated, role, navigate]);

  const subtotal = useMemo(() => {
    return cart.reduce((total, item) => {
      const quantity = Math.max(1, Number(item.quantity) || 1);

      return total + getCoursePrice(item) * quantity;
    }, 0);
  }, [cart]);

  const formatPrice = (price: number) =>
    price.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  // Remove a course from the cart.
  const removeItem = (courseId: string) => {
    const updated = cart.filter(
      (item) => getCourseId(item) !== courseId
    );

    localStorage.setItem(CART_KEY, JSON.stringify(updated));

    setCart(updated);

    window.dispatchEvent(new Event(CART_EVENT));
    window.dispatchEvent(new Event("cartUpdated"));

    toast.success("Course removed from cart.");
  };

  // Submit the order.
  const handlePlaceOrder = async () => {
    if (!isAuthenticated || role !== "student") {
      navigate("/login", {
        state: { from: CHECKOUT_PATH },
      });

      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty.");
      navigate("/cart");
      return;
    }

    const invalidItem = cart.find(
      (item) => !getCourseId(item)
    );

    if (invalidItem) {
      toast.error(
        "A cart item is missing its course ID. Remove it and add the course again."
      );

      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        items: cart.map((item) => ({
          courseId: getCourseId(item),
          quantity: Math.max(1, Number(item.quantity) || 1),
        })),
      };

      // Confirm this endpoint and payload match your backend.
      const response = await api.post(
        "/api/v1/orders",
        payload
      );

      const data = response.data;

      const order = (
        data?.data?.order ??
        data?.order ??
        data?.data ??
        data
      ) as OrderResponse | undefined;

      if (response.status < 200 || response.status >= 300) {
        throw new Error("Unable to create your order.");
      }

      // Clear the cart only after successful order creation.
      localStorage.removeItem(CART_KEY);

      setCart([]);

      window.dispatchEvent(new Event(CART_EVENT));
      window.dispatchEvent(new Event("cartUpdated"));

      toast.success("Order created successfully.");

      const orderId = order?._id ?? order?.id;

      if (orderId) {
        navigate(`/dashboard/orders/${orderId}`, {
          replace: true,
        });
      } else {
        navigate("/dashboard/orders", {
          replace: true,
        });
      }
    } catch (error: unknown) {
      const err = error as {
        response?: {
          data?: {
            message?: string;
          };
        };
        message?: string;
      };

      toast.error(
        err.response?.data?.message ??
          err.message ??
          "Checkout failed. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Display a loading state while redirecting unauthorized users.
  if (!isAuthenticated || role !== "student") {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin" />

          <p className="mt-3 text-sm text-muted-foreground">
            Redirecting...
          </p>
        </div>
      </div>
    );
  }

  return (
    <StudentLayout>
      <div className="mx-auto max-w-6xl py-4">
        {/* BACK TO CART */}
        <Link
          to="/cart"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to cart
        </Link>

        {/* PAGE HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Checkout
          </h1>

          <p className="mt-2 text-muted-foreground">
            Review your courses before placing your order.
          </p>
        </div>

        {cart.length === 0 ? (
          /* EMPTY CART */
          <div className="rounded-xl border bg-background p-10 text-center">
            <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground" />

            <h2 className="mt-4 text-xl font-semibold">
              Your cart is empty
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Add a course before proceeding to checkout.
            </p>

            <Button className="mt-6" asChild>
              <Link to="/courses">Browse courses</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
            {/* COURSE LIST */}
            <section className="min-w-0 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  Your courses ({cart.length})
                </h2>

                <span className="text-sm text-muted-foreground">
                  {cart.length} {cart.length === 1 ? "item" : "items"}
                </span>
              </div>

              {cart.map((item, index) => {
                const courseId = getCourseId(item);
                const title = getCourseTitle(item);
                const image = item.thumbnail ?? item.image;

                const instructor =
                  typeof item.instructor === "string"
                    ? item.instructor
                    : item.instructor?.name;

                return (
                  <div
                    key={courseId || `cart-item-${index}`}
                    className="flex gap-4 rounded-xl border bg-background p-4"
                  >
                    {/* COURSE IMAGE */}
                    {image ? (
                      <img
                        src={image}
                        alt={title}
                        className="h-24 w-32 shrink-0 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="flex h-24 w-32 shrink-0 items-center justify-center rounded-lg bg-muted">
                        <ShoppingCart className="h-7 w-7 text-muted-foreground" />
                      </div>
                    )}

                    {/* COURSE DETAILS */}
                    <div className="min-w-0 flex-1">
                      <h3 className="line-clamp-2 font-semibold">
                        {title}
                      </h3>

                      {instructor && (
                        <p className="mt-1 text-sm text-muted-foreground">
                          {instructor}
                        </p>
                      )}

                      <p className="mt-2 font-semibold">
                        ETB {formatPrice(getCoursePrice(item))}
                      </p>

                      {(Number(item.quantity) || 1) > 1 && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          Quantity: {Math.max(1, Number(item.quantity) || 1)}
                        </p>
                      )}
                    </div>

                    {/* REMOVE COURSE */}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      aria-label={`Remove ${title}`}
                      title="Remove course"
                      onClick={() => removeItem(courseId)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                );
              })}

              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-auto"
                asChild
              >
                <Link to="/courses">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Continue browsing
                </Link>
              </Button>
            </section>

            {/* ORDER SUMMARY */}
            <aside className="h-fit rounded-xl border bg-background p-6 lg:sticky lg:top-4">
              <h2 className="text-lg font-semibold">
                Order summary
              </h2>

              <div className="mt-5 space-y-4 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">
                    Courses
                  </span>

                  <span>{cart.length}</span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">
                    Subtotal
                  </span>

                  <span>ETB {formatPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">
                    Discount
                  </span>

                  <span>ETB 0.00</span>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between gap-4 text-base font-bold">
                    <span>Total</span>

                    <span>ETB {formatPrice(subtotal)}</span>
                  </div>
                </div>
              </div>

              <Button
                className="mt-6 w-full"
                disabled={submitting || cart.length === 0}
                onClick={handlePlaceOrder}
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Place order"
                )}
              </Button>

              <p className="mt-3 text-center text-xs text-muted-foreground">
                Your order will be submitted for processing.
              </p>

              <div className="mt-5 rounded-lg bg-muted/50 p-3 text-xs text-muted-foreground">
                <p className="font-medium text-foreground">
                  Ready to learn?
                </p>

                <p className="mt-1">
                  Review your selected courses and place your order
                  when you're ready.
                </p>
              </div>
            </aside>
          </div>
        )}
      </div>
    </StudentLayout>
  );
};

export default CheckoutPage;