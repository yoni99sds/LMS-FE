
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Loader2,
  Package,
  CreditCard,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import StudentLayout from "@/layouts/StudentLayout";
import { useAppSelector } from "@/hooks/redux";
import {
  getOrderById,
  type Order,
} from "../../api/order.api";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useAppSelector(
    (state) => state.auth
  );

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  const role = String(user?.role ?? "").toLowerCase();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", {
        replace: true,
        state: { from: `/dashboard/orders/${id ?? ""}` },
      });
      return;
    }

    if (role !== "student") {
      if (role === "admin") {
        navigate("/admin", { replace: true });
      } else if (role === "instructor") {
        navigate("/instructor/dashboard", { replace: true });
      } else {
        navigate("/login", { replace: true });
      }
    }
  }, [isAuthenticated, role, navigate, id]);

  useEffect(() => {
    let active = true;

    const loadOrder = async () => {
      if (!id) {
        toast.error("Order ID is missing");
        navigate("/dashboard/orders", { replace: true });
        return;
      }

      if (!isAuthenticated || role !== "student") {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const result = await getOrderById(id);

        if (active) {
          setOrder(result);
        }
      } catch (error: unknown) {
        console.error("Failed to load order:", error);

        const axiosError = error as {
          response?: {
            data?: {
              message?: string;
            };
          };
          message?: string;
        };

        if (active) {
          toast.error(
            axiosError.response?.data?.message ??
              axiosError.message ??
              "Failed to load order"
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void loadOrder();

    return () => {
      active = false;
    };
  }, [id, navigate, isAuthenticated, role]);

  if (!isAuthenticated || role !== "student" || loading) {
    return (
      <StudentLayout>
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="text-center">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
            <p className="mt-3 text-sm text-muted-foreground">
              {loading ? "Loading order details..." : "Redirecting..."}
            </p>
          </div>
        </div>
      </StudentLayout>
    );
  }

  if (!order) {
    return (
      <StudentLayout>
        <div className="mx-auto max-w-4xl py-8">
          <div className="rounded-xl border bg-background p-10 text-center">
            <Package className="mx-auto h-12 w-12 text-muted-foreground" />

            <h1 className="mt-4 text-xl font-semibold">
              Order not found
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              We couldn't load this order. It may not exist or you may
              not have permission to view it.
            </p>

            <Button
              className="mt-6"
              onClick={() => navigate("/dashboard/orders")}
            >
              Back to Orders
            </Button>
          </div>
        </div>
      </StudentLayout>
    );
  }

  const formatPrice = (amount: number) =>
    Number(amount ?? 0).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const statusClass = (status: string) => {
    const normalized = status.toLowerCase();

    if (
      normalized.includes("complete") ||
      normalized.includes("paid")
    ) {
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
    }

    if (
      normalized.includes("cancel") ||
      normalized.includes("fail") ||
      normalized.includes("refund")
    ) {
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
    }

    if (
      normalized.includes("pending") ||
      normalized.includes("process")
    ) {
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
    }

    return "bg-muted text-muted-foreground";
  };

  return (
    <StudentLayout>
      <div className="mx-auto max-w-6xl py-4">
        {/* BACK NAVIGATION */}
        <button
          type="button"
          onClick={() => navigate("/dashboard/orders")}
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Orders
        </button>

        {/* PAGE HEADER */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Order Details
            </h1>

            <p className="mt-2 text-muted-foreground">
              Order #{order.orderNumber}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span
              className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium ${statusClass(
                order.status
              )}`}
            >
              Order: {order.status}
            </span>

            <span
              className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium ${statusClass(
                order.paymentStatus
              )}`}
            >
              Payment: {order.paymentStatus}
            </span>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          {/* ORDER ITEMS */}
          <section className="h-fit rounded-xl border bg-background p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <Package className="h-5 w-5 text-primary" />
              </div>

              <div>
                <h2 className="text-xl font-semibold">
                  Courses
                </h2>

                <p className="text-sm text-muted-foreground">
                  {order.items.length}{" "}
                  {order.items.length === 1 ? "course" : "courses"} in
                  this order
                </p>
              </div>
            </div>

            {order.items.length === 0 ? (
              <p className="py-6 text-sm text-muted-foreground">
                No course items were found for this order.
              </p>
            ) : (
              <div className="space-y-5">
                {order.items.map((item, index) => (
                  <div
                    key={`${item.courseId}-${index}`}
                    className="flex flex-col justify-between gap-3 border-b pb-5 last:border-b-0 last:pb-0 sm:flex-row sm:items-center"
                  >
                    <div className="min-w-0">
                      <h3 className="font-medium">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-sm text-muted-foreground">
                        Quantity: {item.quantity}
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        Unit price: {formatPrice(item.price)}{" "}
                        {order.currency}
                      </p>
                    </div>

                    <div className="font-semibold sm:text-right">
                      {formatPrice(item.price * item.quantity)}{" "}
                      {order.currency}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* ORDER SUMMARY */}
          <aside className="h-fit rounded-xl border bg-background p-6">
            <h2 className="mb-6 text-xl font-semibold">
              Order Summary
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between gap-4 text-sm">
                <span className="text-muted-foreground">
                  Subtotal
                </span>

                <span className="text-right">
                  {formatPrice(order.subtotal)} {order.currency}
                </span>
              </div>

              <div className="flex justify-between gap-4 text-sm">
                <span className="text-muted-foreground">
                  Discount
                </span>

                <span className="text-right">
                  -{formatPrice(order.discount)} {order.currency}
                </span>
              </div>

              <div className="flex justify-between gap-4 text-sm">
                <span className="text-muted-foreground">
                  Tax
                </span>

                <span className="text-right">
                  {formatPrice(order.tax)} {order.currency}
                </span>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between gap-4">
                  <span className="font-semibold">Total</span>

                  <span className="text-lg font-bold">
                    {formatPrice(order.total)} {order.currency}
                  </span>
                </div>
              </div>
            </div>

            {/* ORDER INFORMATION */}
            <div className="mt-6 space-y-4 border-t pt-5">
              <div>
                <p className="text-sm text-muted-foreground">
                  Order Status
                </p>

                <p className="mt-1 font-medium">
                  {order.status}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Payment Status
                </p>

                <p className="mt-1 font-medium">
                  {order.paymentStatus}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Order Date
                </p>

                <p className="mt-1 font-medium">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            {/* PAYMENT ACTION */}
            {order.paymentStatus.toLowerCase() === "pending" && (
              <Button
                className="mt-6 w-full"
                onClick={() =>
                  navigate(`/dashboard/payment/${order._id}`, {
                    state: { order },
                  })
                }
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Continue to Payment
              </Button>
            )}

            <Button
              variant="outline"
              className="mt-3 w-full"
              onClick={() => navigate("/dashboard/orders")}
            >
              View All Orders
            </Button>
          </aside>
        </div>
      </div>
    </StudentLayout>
  );
};

export default OrderDetailsPage;