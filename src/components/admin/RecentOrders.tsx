import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  CreditCard,
  ShoppingCart,
  XCircle,
} from "lucide-react";

import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type OrderStatus =
  | "Completed"
  | "Pending"
  | "Cancelled";

interface RecentOrder {
  id: string;
  orderNumber: string;
  customer: string;
  course: string;
  amount: number;
  status: OrderStatus;
  date: string;
}

const recentOrdersData: RecentOrder[] = [
  {
    id: "order-001",
    orderNumber: "#ORD-1001",
    customer: "Abel Tesfaye",
    course: "Full Stack Web Development",
    amount: 12500,
    status: "Completed",
    date: "Today, 10:42 AM",
  },
  {
    id: "order-002",
    orderNumber: "#ORD-1002",
    customer: "Sara Mohammed",
    course: "UI/UX Design Fundamentals",
    amount: 9800,
    status: "Completed",
    date: "Today, 09:18 AM",
  },
  {
    id: "order-003",
    orderNumber: "#ORD-1003",
    customer: "Hana Alemu",
    course: "Digital Marketing",
    amount: 8500,
    status: "Pending",
    date: "Yesterday",
  },
  {
    id: "order-004",
    orderNumber: "#ORD-1004",
    customer: "Daniel Bekele",
    course: "Advanced JavaScript",
    amount: 10500,
    status: "Completed",
    date: "Yesterday",
  },
  {
    id: "order-005",
    orderNumber: "#ORD-1005",
    customer: "Marta Wilson",
    course: "Product Design",
    amount: 9000,
    status: "Cancelled",
    date: "2 days ago",
  },
];

const RecentOrders = () => {
  const navigate = useNavigate();

  /*
   * ============================================
   * DATA
   * ============================================
   */

  const recentOrders = useMemo(
    () => recentOrdersData.slice(0, 5),
    []
  );

  /*
   * ============================================
   * HANDLERS
   * ============================================
   */

  const handleViewOrder = (id: string) => {
    console.log("View order:", id);
  };

  const handleViewAll = () => {
    navigate("/admin/orders");
  };

  /*
   * ============================================
   * STATUS HELPERS
   * ============================================
   */

  const getStatusClasses = (
    status: OrderStatus
  ) => {
    if (status === "Completed") {
      return "bg-green-500/10 text-green-600";
    }

    if (status === "Pending") {
      return "bg-yellow-500/10 text-yellow-600";
    }

    return "bg-red-500/10 text-red-500";
  };

  const getStatusIcon = (
    status: OrderStatus
  ) => {
    if (status === "Completed") {
      return CheckCircle2;
    }

    if (status === "Pending") {
      return Clock3;
    }

    return XCircle;
  };

  return (
    <Card className="rounded-xl">
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <div>
          <CardTitle className="text-base">
            Recent Orders
          </CardTitle>

          <p className="mt-1 text-sm text-muted-foreground">
            Latest course purchases and payment activity.
          </p>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleViewAll}
          className="rounded-lg"
        >
          View All

          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="p-0">
        {recentOrders.length > 0 ? (
          <div className="divide-y">
            {recentOrders.map((order) => {
              const StatusIcon =
                getStatusIcon(
                  order.status
                );

              return (
                <div
                  key={order.id}
                  className="flex items-center gap-4 px-6 py-4 transition hover:bg-muted/20"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <ShoppingCart className="h-5 w-5" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <button
                      type="button"
                      onClick={() =>
                        handleViewOrder(
                          order.id
                        )
                      }
                      className="text-sm font-semibold hover:text-primary"
                    >
                      {order.orderNumber}
                    </button>

                    <p className="mt-1 truncate text-xs text-muted-foreground">
                      {order.customer}
                    </p>

                    <p className="mt-0.5 truncate text-xs text-muted-foreground">
                      {order.course}
                    </p>
                  </div>

                  <div className="hidden text-right sm:block">
                    <p className="text-sm font-semibold">
                      {order.amount.toLocaleString()}{" "}
                      ETB
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      {order.date}
                    </p>
                  </div>

                  <div className="hidden sm:block">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
                        order.status
                      )}`}
                    >
                      <StatusIcon className="h-3.5 w-3.5" />

                      {order.status}
                    </span>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      handleViewOrder(
                        order.id
                      )
                    }
                    className="rounded-lg"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
            <div className="rounded-full bg-muted p-4">
              <CreditCard className="h-6 w-6 text-muted-foreground" />
            </div>

            <h3 className="mt-4 font-semibold">
              No recent orders
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              New orders will appear here.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentOrders;