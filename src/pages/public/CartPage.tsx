
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  GraduationCap,
  ShieldCheck,
  ShoppingCart,
  Star,
  Trash2,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useAppSelector } from "@/hooks/redux";

interface CartCourse {
  id: string;
  title: string;
  instructor: string;
  rating: number;
  reviews: number;
  price: number;
  oldPrice: number;
  image: string;
  badge: string;
  category: string;
  duration: string;
  students: string;
}

const CART_STORAGE_KEY = "edumaster_cart";
const CHECKOUT_PATH = "/dashboard/checkout";
const AUTH_REDIRECT_KEY = "edumaster_auth_redirect";

const formatPrice = (price: number) => `$${price.toFixed(2)}`;

const toNumber = (value: unknown, fallback = 0): number => {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }

  return fallback;
};

const normalizeCartCourse = (
  item: Record<string, unknown>,
): CartCourse => {
  const id =
    typeof item.id === "string"
      ? item.id
      : typeof item.courseId === "string"
        ? item.courseId
        : "";

  const price = Math.max(0, toNumber(item.price));
  const oldPrice = Math.max(
    price,
    toNumber(item.oldPrice, toNumber(item.originalPrice, price)),
  );

  return {
    id,
    title: typeof item.title === "string" ? item.title : "Course",
    instructor:
      typeof item.instructor === "string" ? item.instructor : "Instructor",
    rating: toNumber(item.rating),
    reviews: toNumber(item.reviews),
    price,
    oldPrice,
    image: typeof item.image === "string" ? item.image : "",
    badge: typeof item.badge === "string" ? item.badge : "Course",
    category: typeof item.category === "string" ? item.category : "General",
    duration:
      typeof item.duration === "string" ? item.duration : "Self-paced",
    students:
      typeof item.students === "string" ? item.students : "Students",
  };
};

const loadCart = (): CartCourse[] => {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (!stored) return [];

    const parsed: unknown = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter(
        (item): item is Record<string, unknown> =>
          typeof item === "object" && item !== null,
      )
      .map(normalizeCartCourse)
      .filter((course) => course.id !== "");
  } catch {
    return [];
  }
};

const saveCart = (items: CartCourse[]) => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("edumaster-cart-updated"));
  window.dispatchEvent(new Event("cartUpdated"));
};

const CartPage = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);

  const [cartItems, setCartItems] = useState<CartCourse[]>([]);

  useEffect(() => {
    setCartItems(loadCart());
  }, []);

  useEffect(() => {
    const handleCartUpdate = () => setCartItems(loadCart());

    const handleStorage = (event: StorageEvent) => {
      if (event.key === CART_STORAGE_KEY) {
        setCartItems(loadCart());
      }
    };

    window.addEventListener("edumaster-cart-updated", handleCartUpdate);
    window.addEventListener("cartUpdated", handleCartUpdate);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("edumaster-cart-updated", handleCartUpdate);
      window.removeEventListener("cartUpdated", handleCartUpdate);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const handleRemoveCourse = (courseId: string) => {
    const updated = cartItems.filter((course) => course.id !== courseId);
    setCartItems(updated);
    saveCart(updated);
    toast.success("Course removed from cart.");
  };

  const handleClearCart = () => {
    setCartItems([]);
    localStorage.removeItem(CART_STORAGE_KEY);
    window.dispatchEvent(new Event("edumaster-cart-updated"));
    window.dispatchEvent(new Event("cartUpdated"));
    toast.success("Cart cleared.");
  };

  const subtotal = useMemo(
    () => cartItems.reduce((total, course) => total + course.price, 0),
    [cartItems],
  );

  const originalTotal = useMemo(
    () => cartItems.reduce((total, course) => total + course.oldPrice, 0),
    [cartItems],
  );

  const savings = Math.max(originalTotal - subtotal, 0);
  const discountPercentage =
    originalTotal > 0 ? Math.round((savings / originalTotal) * 100) : 0;

  /*
   * CHECKOUT FLOW:
   * - Empty carts cannot proceed.
   * - Guests have the checkout destination saved in sessionStorage and
   *   React Router state before being sent to login.
   * - Students go to the actual checkout route.
   * - Admins and instructors cannot use student checkout.
   */
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    if (!user) {
      sessionStorage.setItem(AUTH_REDIRECT_KEY, CHECKOUT_PATH);

      navigate("/login", {
        state: { from: CHECKOUT_PATH },
      });

      return;
    }

    const role = String(user.role).toLowerCase();

    if (role !== "student") {
      toast.error(
        "Please log in with a student account to purchase courses.",
      );
      return;
    }

    sessionStorage.removeItem(AUTH_REDIRECT_KEY);
    navigate(CHECKOUT_PATH);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
              <ShoppingCart className="h-12 w-12 text-primary" />
            </div>

            <h1 className="text-3xl font-bold md:text-4xl">
              Your Cart is Empty
            </h1>

            <p className="mt-4 text-muted-foreground">
              You haven't added any courses to your cart yet. Explore our
              courses and start building your learning journey today.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button
                size="lg"
                onClick={() => navigate("/courses")}
                className="rounded-full px-8"
              >
                Browse Courses
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/")}
                className="rounded-full px-8"
              >
                Back to Home
              </Button>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-4 text-left sm:grid-cols-3">
              <div className="rounded-xl border bg-background p-5">
                <BookOpen className="mb-3 h-6 w-6 text-primary" />
                <h3 className="font-semibold">Expert Courses</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Learn from experienced instructors.
                </p>
              </div>

              <div className="rounded-xl border bg-background p-5">
                <GraduationCap className="mb-3 h-6 w-6 text-primary" />
                <h3 className="font-semibold">Learn Anywhere</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Access your courses from anywhere.
                </p>
              </div>

              <div className="rounded-xl border bg-background p-5">
                <ShieldCheck className="mb-3 h-6 w-6 text-primary" />
                <h3 className="font-semibold">Secure Learning</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Your learning progress stays protected.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-muted/20">
      <section className="border-b bg-background">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <Link
            to="/courses"
            className="mb-5 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue Shopping
          </Link>

          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <ShoppingCart className="h-6 w-6 text-primary" />
                <span className="text-sm font-semibold uppercase tracking-wide text-primary">
                  Shopping Cart
                </span>
              </div>

              <h1 className="text-3xl font-bold md:text-4xl">
                Your Courses
              </h1>

              <p className="mt-2 text-muted-foreground">
                {cartItems.length === 1
                  ? "1 course in your cart"
                  : `${cartItems.length} courses in your cart`}
              </p>
            </div>

            <Button
              variant="ghost"
              onClick={handleClearCart}
              className="w-fit text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Clear Cart
            </Button>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">
          <section className="space-y-5">
            {cartItems.map((course) => (
              <div
                key={course.id}
                className="group overflow-hidden rounded-2xl border bg-background shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex flex-col sm:flex-row">
                  <div className="relative aspect-video w-full shrink-0 overflow-hidden sm:aspect-auto sm:w-56">
                    {course.image ? (
                      <img
                        src={course.image}
                        alt={course.title}
                        className="h-full min-h-[180px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex min-h-[180px] items-center justify-center bg-muted">
                        <BookOpen className="h-12 w-12 text-muted-foreground" />
                      </div>
                    )}

                    <div className="absolute left-3 top-3">
                      <Badge className="border-none bg-background/90 text-foreground shadow-sm">
                        {course.badge}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-2 text-xs font-medium">
                        <span className="rounded-full bg-primary/10 px-2.5 py-1 text-primary">
                          {course.category}
                        </span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-muted-foreground">
                          {course.duration}
                        </span>
                      </div>

                      <Link
                        to={`/courses/${course.id}`}
                        className="text-lg font-bold leading-tight hover:text-primary md:text-xl"
                      >
                        {course.title}
                      </Link>

                      <p className="mt-2 text-sm text-muted-foreground">
                        By{" "}
                        <span className="font-semibold text-foreground">
                          {course.instructor}
                        </span>
                      </p>

                      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
                        <div className="flex items-center text-yellow-500">
                          <Star className="mr-1 h-4 w-4 fill-current" />
                          <span className="font-bold">
                            {course.rating > 0
                              ? course.rating.toFixed(1)
                              : "New"}
                          </span>
                        </div>

                        <span className="text-muted-foreground">
                          ({course.reviews.toLocaleString()} reviews)
                        </span>

                        <div className="flex items-center text-muted-foreground">
                          <Users className="mr-1 h-4 w-4" />
                          {course.students}
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                          Lifetime access
                        </div>
                        <div className="flex items-center gap-1">
                          <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                          Certificate
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock3 className="h-3.5 w-3.5 text-primary" />
                          Self-paced
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t pt-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveCourse(course.id)}
                        className="px-0 text-muted-foreground hover:bg-transparent hover:text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remove
                      </Button>

                      <div className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <span className="text-lg font-bold text-primary">
                            {formatPrice(course.price)}
                          </span>

                          {course.oldPrice > course.price && (
                            <span className="text-sm text-muted-foreground line-through">
                              {formatPrice(course.oldPrice)}
                            </span>
                          )}
                        </div>

                        {course.oldPrice > course.price && (
                          <p className="mt-1 text-xs text-green-600 dark:text-green-400">
                            Save {formatPrice(course.oldPrice - course.price)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <Button variant="outline" asChild className="rounded-full">
              <Link to="/courses">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Continue Shopping
              </Link>
            </Button>
          </section>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border bg-background p-6 shadow-sm">
              <h2 className="text-xl font-bold">Order Summary</h2>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Courses</span>
                  <span className="font-medium">{cartItems.length}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Original price</span>
                  <span>{formatPrice(originalTotal)}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Discount</span>
                  <span className="font-medium text-green-600 dark:text-green-400">
                    -{formatPrice(savings)}
                  </span>
                </div>

                <Separator />

                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total</p>
                    <p className="mt-1 text-3xl font-bold text-primary">
                      {formatPrice(subtotal)}
                    </p>
                  </div>

                  {discountPercentage > 0 && (
                    <Badge variant="secondary" className="mb-1">
                      {discountPercentage}% OFF
                    </Badge>
                  )}
                </div>
              </div>

              <Button
                size="lg"
                onClick={handleCheckout}
                className="mt-6 h-12 w-full rounded-full text-base font-bold shadow-lg shadow-primary/20"
              >
                Proceed to Checkout
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <div className="mt-5 flex items-start gap-3 rounded-xl bg-muted/50 p-4">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-semibold">Secure checkout</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    Your payment will be processed through the configured
                    payment system.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border bg-background p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">
                    Start learning immediately
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Access your course after successful payment.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default CartPage;