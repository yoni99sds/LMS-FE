
import { useCallback, useEffect, useState } from "react";
import {
  Eye,
  Loader2,
  Package,
  ShoppingBag,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import StudentLayout from "@/layouts/StudentLayout";
import { useAppSelector } from "@/hooks/redux";
import {
  getMyOrders,
  type Order,
} from "../../api/order.api";

const OrdersPage = () => {
  const navigate = useNavigate();

  const { isAuthenticated, user } = useAppSelector(
    (state) => state.auth
  );

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const role = String(user?.role ?? "").toLowerCase();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", {
        replace: true,
        state: { from: "/dashboard/orders" },
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
  }, [isAuthenticated, role, navigate]);

  const loadOrders = useCallback(async () => {
    if (!isAuthenticated || role !== "student") {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const result = await getMyOrders();

      setOrders(result.orders ?? []);
    } catch (error: unknown) {
      console.error("Failed to load orders:", error);

      const axiosError = error as {
        response?: {
          data?: {
            message?: string;
          };
        };
        message?: string;
      };

      toast.error(
        axiosError.response?.data?.message ??
          axiosError.message ??
          "Failed to load orders"
      );
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, role]);

  useEffect(() => {
    void loadOrders();
  }, [loadOrders]);

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

  if (!isAuthenticated || role !== "student" || loading) {
    return (
      <StudentLayout>
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="text-center">
            <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />

            <p className="mt-3 text-sm text-muted-foreground">
              {loading ? "Loading your orders..." : "Redirecting..."}
            </p>
          </div>
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout>
      <div className="mx-auto max-w-6xl py-4">
        {/* PAGE HEADER */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              My Orders
            </h1>

            <p className="mt-2 text-muted-foreground">
              View your course orders and payment status.
            </p>
          </div>

          <Button
            variant="outline"
            onClick={() => navigate("/courses")}
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            Browse Courses
          </Button>
        </div>

        {/* SUMMARY CARDS */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border bg-background p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <Package className="h-5 w-5 text-primary" />
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Total Orders
                </p>

                <p className="text-2xl font-bold">
                  {orders.length}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-background p-5">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <ShoppingBag className="h-5 w-5 text-primary" />
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Courses Ordered
                </p>

                <p className="text-2xl font-bold">
                  {orders.reduce(
                    (total, order) => total + order.items.length,
                    0
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-background p-5 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <Eye className="h-5 w-5 text-primary" />
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Pending Payments
                </p>

                <p className="text-2xl font-bold">
                  {
                    orders.filter(
                      (order) =>
                        order.paymentStatus.toLowerCase() === "pending"
                    ).length
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* EMPTY STATE */}
        {orders.length === 0 ? (
          <div className="rounded-xl border bg-background p-12 text-center">
            <Package className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />

            <h2 className="text-xl font-semibold">
              No orders yet
            </h2>

            <p className="mt-2 text-muted-foreground">
              Your course purchases will appear here.
            </p>

            <Button
              className="mt-6"
              onClick={() => navigate("/courses")}
            >
              Browse Courses
            </Button>
          </div>
        ) : (
          /* ORDERS TABLE */
          <div className="overflow-hidden rounded-xl border bg-background">
            <div className="border-b p-5">
              <h2 className="text-lg font-semibold">
                Order History
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Select an order to review its details.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px]">
                <thead className="border-b bg-muted/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium">
                      Order
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-medium">
                      Courses
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-medium">
                      Total
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-medium">
                      Status
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-medium">
                      Payment
                    </th>

                    <th className="px-6 py-4 text-right text-sm font-medium">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order._id}
                      className="border-b transition-colors last:border-b-0 hover:bg-muted/30"
                    >
                      <td className="px-6 py-4">
                        <div className="font-medium">
                          {order.orderNumber}
                        </div>

                        <div className="mt-1 text-sm text-muted-foreground">
                          {new Date(
                            order.createdAt
                          ).toLocaleDateString()}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="font-medium">
                          {order.items.length}{" "}
                          {order.items.length === 1
                            ? "course"
                            : "courses"}
                        </div>
                      </td>

                      <td className="px-6 py-4 font-medium">
                        {formatPrice(order.total)} {order.currency}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${statusClass(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${statusClass(
                            order.paymentStatus
                          )}`}
                        >
                          {order.paymentStatus}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            navigate(
                              `/dashboard/orders/${order._id}`
                            )
                          }
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </StudentLayout>
  );
};

export default OrdersPage;