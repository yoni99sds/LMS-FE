import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertCircle,
  Ban,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Eye,
  Package,
  RefreshCw,
  Search,
  Truck,
  MoreHorizontal,
  XCircle,
  ShoppingBag,
  DollarSign,
  ClipboardList,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type OrderStatus =
  | "Pending"
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Cancelled";

type PaymentStatus = "Paid" | "Pending" | "Failed" | "Refunded";

type Order = {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  courseTitle: string;
  amount: number;
  paymentMethod: string;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  createdAt: string;
};

const initialOrders: Order[] = [
  {
    id: "ORD-001",
    orderNumber: "#ORD-2026-001",
    customerName: "Abebe Kebede",
    customerEmail: "abebe@example.com",
    courseTitle: "Full Stack Web Development",
    amount: 4500,
    paymentMethod: "Telebirr",
    paymentStatus: "Paid",
    status: "Delivered",
    createdAt: "Sep 15, 2026",
  },
  {
    id: "ORD-002",
    orderNumber: "#ORD-2026-002",
    customerName: "Sara Ahmed",
    customerEmail: "sara@example.com",
    courseTitle: "UI/UX Design Masterclass",
    amount: 3200,
    paymentMethod: "Chapa",
    paymentStatus: "Paid",
    status: "Processing",
    createdAt: "Sep 15, 2026",
  },
  {
    id: "ORD-003",
    orderNumber: "#ORD-2026-003",
    customerName: "Dawit Tesfaye",
    customerEmail: "dawit@example.com",
    courseTitle: "React & TypeScript",
    amount: 3800,
    paymentMethod: "Bank Transfer",
    paymentStatus: "Pending",
    status: "Pending",
    createdAt: "Sep 14, 2026",
  },
  {
    id: "ORD-004",
    orderNumber: "#ORD-2026-004",
    customerName: "Hana Bekele",
    customerEmail: "hana@example.com",
    courseTitle: "Node.js Backend Development",
    amount: 4000,
    paymentMethod: "Telebirr",
    paymentStatus: "Paid",
    status: "Shipped",
    createdAt: "Sep 14, 2026",
  },
  {
    id: "ORD-005",
    orderNumber: "#ORD-2026-005",
    customerName: "Michael John",
    customerEmail: "michael@example.com",
    courseTitle: "MongoDB & Database Design",
    amount: 2800,
    paymentMethod: "Chapa",
    paymentStatus: "Paid",
    status: "Delivered",
    createdAt: "Sep 13, 2026",
  },
  {
    id: "ORD-006",
    orderNumber: "#ORD-2026-006",
    customerName: "Meron Alemu",
    customerEmail: "meron@example.com",
    courseTitle: "Digital Marketing",
    amount: 2500,
    paymentMethod: "Telebirr",
    paymentStatus: "Failed",
    status: "Cancelled",
    createdAt: "Sep 13, 2026",
  },
  {
    id: "ORD-007",
    orderNumber: "#ORD-2026-007",
    customerName: "Samuel Girma",
    customerEmail: "samuel@example.com",
    courseTitle: "Advanced JavaScript",
    amount: 3500,
    paymentMethod: "Chapa",
    paymentStatus: "Paid",
    status: "Processing",
    createdAt: "Sep 12, 2026",
  },
  {
    id: "ORD-008",
    orderNumber: "#ORD-2026-008",
    customerName: "Rahel Solomon",
    customerEmail: "rahel@example.com",
    courseTitle: "Graphic Design Fundamentals",
    amount: 2200,
    paymentMethod: "Bank Transfer",
    paymentStatus: "Paid",
    status: "Delivered",
    createdAt: "Sep 12, 2026",
  },
  {
    id: "ORD-009",
    orderNumber: "#ORD-2026-009",
    customerName: "Yared Worku",
    customerEmail: "yared@example.com",
    courseTitle: "Python for Beginners",
    amount: 3000,
    paymentMethod: "Telebirr",
    paymentStatus: "Pending",
    status: "Pending",
    createdAt: "Sep 11, 2026",
  },
  {
    id: "ORD-010",
    orderNumber: "#ORD-2026-010",
    customerName: "Betty Daniel",
    customerEmail: "betty@example.com",
    courseTitle: "Frontend Development",
    amount: 4200,
    paymentMethod: "Chapa",
    paymentStatus: "Paid",
    status: "Shipped",
    createdAt: "Sep 11, 2026",
  },
  {
    id: "ORD-011",
    orderNumber: "#ORD-2026-011",
    customerName: "Nahom Tadesse",
    customerEmail: "nahom@example.com",
    courseTitle: "REST API Development",
    amount: 3600,
    paymentMethod: "Telebirr",
    paymentStatus: "Paid",
    status: "Processing",
    createdAt: "Sep 10, 2026",
  },
  {
    id: "ORD-012",
    orderNumber: "#ORD-2026-012",
    customerName: "Liya Mengistu",
    customerEmail: "liya@example.com",
    courseTitle: "Figma UI Design",
    amount: 2700,
    paymentMethod: "Chapa",
    paymentStatus: "Refunded",
    status: "Cancelled",
    createdAt: "Sep 10, 2026",
  },
];

const ITEMS_PER_PAGE = 8;

const formatCurrency = (amount: number) => {
  return `${amount.toLocaleString()} ETB`;
};

const getStatusStyles = (status: OrderStatus) => {
  switch (status) {
    case "Pending":
      return {
        className:
          "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
        icon: Clock3,
      };

    case "Processing":
      return {
        className:
          "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
        icon: RefreshCw,
      };

    case "Shipped":
      return {
        className:
          "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
        icon: Truck,
      };

    case "Delivered":
      return {
        className:
          "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
        icon: CheckCircle2,
      };

    case "Cancelled":
      return {
        className:
          "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
        icon: Ban,
      };
  }
};

const getPaymentStatusStyles = (status: PaymentStatus) => {
  switch (status) {
    case "Paid":
      return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";

    case "Pending":
      return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";

    case "Failed":
      return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";

    case "Refunded":
      return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";
  }
};

const OrdersPage = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState<Order[]>(initialOrders);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // =========================================================
  // FILTER ORDERS
  // =========================================================

  const filteredOrders = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return orders.filter((order) => {
      const matchesSearch =
        !query ||
        order.orderNumber.toLowerCase().includes(query) ||
        order.customerName.toLowerCase().includes(query) ||
        order.customerEmail.toLowerCase().includes(query) ||
        order.courseTitle.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "all" || order.status === statusFilter;

      const matchesPayment =
        paymentFilter === "all" ||
        order.paymentStatus === paymentFilter;

      return matchesSearch && matchesStatus && matchesPayment;
    });
  }, [orders, searchQuery, statusFilter, paymentFilter]);

  // =========================================================
  // PAGINATION
  // =========================================================

  const totalPages = Math.max(
    1,
    Math.ceil(filteredOrders.length / ITEMS_PER_PAGE)
  );

  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

    return filteredOrders.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );
  }, [filteredOrders, currentPage]);

  // =========================================================
  // STATISTICS
  // =========================================================

  const statistics = useMemo(() => {
    const totalRevenue = orders
      .filter((order) => order.paymentStatus === "Paid")
      .reduce((total, order) => total + order.amount, 0);

    const pending = orders.filter(
      (order) => order.status === "Pending"
    ).length;

    const processing = orders.filter(
      (order) => order.status === "Processing"
    ).length;

    const shipped = orders.filter(
      (order) => order.status === "Shipped"
    ).length;

    const delivered = orders.filter(
      (order) => order.status === "Delivered"
    ).length;

    const cancelled = orders.filter(
      (order) => order.status === "Cancelled"
    ).length;

    return {
      total: orders.length,
      totalRevenue,
      pending,
      processing,
      shipped,
      delivered,
      cancelled,
    };
  }, [orders]);

  // =========================================================
  // STATUS HANDLERS
  // =========================================================

  const handleStatusChange = (
    id: string,
    newStatus: OrderStatus
  ) => {
    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === id
          ? {
              ...order,
              status: newStatus,
            }
          : order
      )
    );

    console.log(
      `Order ${id} status changed to ${newStatus}`
    );
  };

  const handleProcessOrder = (id: string) => {
    handleStatusChange(id, "Processing");
  };

  const handleShipOrder = (id: string) => {
    handleStatusChange(id, "Shipped");
  };

  const handleDeliverOrder = (id: string) => {
    handleStatusChange(id, "Delivered");
  };

  const handleCancelOrder = (id: string) => {
    handleStatusChange(id, "Cancelled");
  };

  const handlePendingOrder = (id: string) => {
    handleStatusChange(id, "Pending");
  };

  // =========================================================
  // OTHER HANDLERS
  // =========================================================

  const handleViewOrder = (id: string) => {
    console.log(`View order ${id}`);

    // Connect to order details route later.
    // Example:
    // navigate(`/admin/orders/${id}`);
  };

  const handleRefresh = () => {
    console.log("Refreshing orders...");
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) {
      return;
    }

    setCurrentPage(page);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setPaymentFilter("all");
    setCurrentPage(1);
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="space-y-6">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-6 w-6 text-primary" />

            <h1 className="text-2xl font-bold tracking-tight">
              Orders
            </h1>
          </div>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage customer orders, payments, and order status.
          </p>
        </div>

        <Button
          variant="outline"
          className="rounded-xl"
          onClick={handleRefresh}
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* =====================================================
          STATISTICS
      ===================================================== */}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-2xl">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Total Orders
                </p>

                <p className="mt-1 text-2xl font-bold">
                  {statistics.total}
                </p>
              </div>

              <div className="rounded-xl bg-primary/10 p-3">
                <ClipboardList className="h-5 w-5 text-primary" />
              </div>
            </div>

            <p className="mt-3 text-xs text-muted-foreground">
              All customer orders
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Revenue
                </p>

                <p className="mt-1 text-2xl font-bold">
                  {formatCurrency(statistics.totalRevenue)}
                </p>
              </div>

              <div className="rounded-xl bg-green-100 p-3 dark:bg-green-900/30">
                <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
            </div>

            <p className="mt-3 text-xs text-muted-foreground">
              From paid orders
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Pending
                </p>

                <p className="mt-1 text-2xl font-bold">
                  {statistics.pending}
                </p>
              </div>

              <div className="rounded-xl bg-yellow-100 p-3 dark:bg-yellow-900/30">
                <Clock3 className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>

            <p className="mt-3 text-xs text-muted-foreground">
              Awaiting processing
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Delivered
                </p>

                <p className="mt-1 text-2xl font-bold">
                  {statistics.delivered}
                </p>
              </div>

              <div className="rounded-xl bg-green-100 p-3 dark:bg-green-900/30">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
            </div>

            <p className="mt-3 text-xs text-muted-foreground">
              Successfully completed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* =====================================================
          STATUS SUMMARY
      ===================================================== */}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <Card className="rounded-2xl">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock3 className="h-5 w-5 text-yellow-500" />

              <div>
                <p className="text-xs text-muted-foreground">
                  Pending
                </p>

                <p className="font-semibold">
                  {statistics.pending}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <RefreshCw className="h-5 w-5 text-blue-500" />

              <div>
                <p className="text-xs text-muted-foreground">
                  Processing
                </p>

                <p className="font-semibold">
                  {statistics.processing}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Truck className="h-5 w-5 text-purple-500" />

              <div>
                <p className="text-xs text-muted-foreground">
                  Shipped
                </p>

                <p className="font-semibold">
                  {statistics.shipped}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-500" />

              <div>
                <p className="text-xs text-muted-foreground">
                  Delivered
                </p>

                <p className="font-semibold">
                  {statistics.delivered}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <XCircle className="h-5 w-5 text-red-500" />

              <div>
                <p className="text-xs text-muted-foreground">
                  Cancelled
                </p>

                <p className="font-semibold">
                  {statistics.cancelled}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* =====================================================
          FILTERS
      ===================================================== */}

      <Card className="rounded-2xl">
        <CardContent className="p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            {/* SEARCH */}

            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                value={searchQuery}
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search order number, customer, email, or course..."
                className="h-10 rounded-xl pl-9"
              />
            </div>

            {/* STATUS */}

            <Select
              value={statusFilter}
              onValueChange={(value) => {
                setStatusFilter(value);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="h-10 w-full rounded-xl lg:w-[180px]">
                <SelectValue placeholder="Order status" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">
                  All Statuses
                </SelectItem>

                <SelectItem value="Pending">
                  Pending
                </SelectItem>

                <SelectItem value="Processing">
                  Processing
                </SelectItem>

                <SelectItem value="Shipped">
                  Shipped
                </SelectItem>

                <SelectItem value="Delivered">
                  Delivered
                </SelectItem>

                <SelectItem value="Cancelled">
                  Cancelled
                </SelectItem>
              </SelectContent>
            </Select>

            {/* PAYMENT */}

            <Select
              value={paymentFilter}
              onValueChange={(value) => {
                setPaymentFilter(value);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="h-10 w-full rounded-xl lg:w-[180px]">
                <SelectValue placeholder="Payment status" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">
                  All Payments
                </SelectItem>

                <SelectItem value="Paid">
                  Paid
                </SelectItem>

                <SelectItem value="Pending">
                  Pending
                </SelectItem>

                <SelectItem value="Failed">
                  Failed
                </SelectItem>

                <SelectItem value="Refunded">
                  Refunded
                </SelectItem>
              </SelectContent>
            </Select>

            {(searchQuery ||
              statusFilter !== "all" ||
              paymentFilter !== "all") && (
              <Button
                variant="ghost"
                className="rounded-xl"
                onClick={clearFilters}
              >
                Clear
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* =====================================================
          TABLE
      ===================================================== */}

      <Card className="overflow-hidden rounded-2xl">
        <CardHeader className="border-b bg-muted/20">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">
                Orders
              </CardTitle>

              <p className="mt-1 text-sm text-muted-foreground">
                {filteredOrders.length} order
                {filteredOrders.length !== 1 ? "s" : ""} found
              </p>
            </div>

            <Package className="h-5 w-5 text-muted-foreground" />
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {paginatedOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
              <ShoppingBag className="mb-4 h-10 w-10 text-muted-foreground" />

              <h3 className="font-semibold">
                No orders found
              </h3>

              <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                Try changing your search or filter criteria.
              </p>

              <Button
                variant="outline"
                className="mt-4 rounded-xl"
                onClick={clearFilters}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1200px]">
                <thead className="bg-muted/30">
                  <tr className="text-left text-sm">
                    <th className="px-6 py-4 font-medium">
                      Order
                    </th>

                    <th className="px-6 py-4 font-medium">
                      Customer
                    </th>

                    <th className="px-6 py-4 font-medium">
                      Course
                    </th>

                    <th className="px-6 py-4 font-medium">
                      Amount
                    </th>

                    <th className="px-6 py-4 font-medium">
                      Payment
                    </th>

                    <th className="px-6 py-4 font-medium">
                      Status
                    </th>

                    <th className="px-6 py-4 font-medium">
                      Date
                    </th>

                    <th className="px-6 py-4 text-right font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {paginatedOrders.map((order) => {
                    const statusStyles =
                      getStatusStyles(order.status);

                    const StatusIcon = statusStyles.icon;

                    return (
                      <tr
                        key={order.id}
                        className="transition-colors hover:bg-muted/20"
                      >
                        {/* ORDER */}

                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium">
                              {order.orderNumber}
                            </p>

                            <p className="mt-1 text-xs text-muted-foreground">
                              {order.id}
                            </p>
                          </div>
                        </td>

                        {/* CUSTOMER */}

                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium">
                              {order.customerName}
                            </p>

                            <p className="mt-1 text-xs text-muted-foreground">
                              {order.customerEmail}
                            </p>
                          </div>
                        </td>

                        {/* COURSE */}

                        <td className="max-w-[220px] px-6 py-4">
                          <p className="truncate text-sm">
                            {order.courseTitle}
                          </p>
                        </td>

                        {/* AMOUNT */}

                        <td className="px-6 py-4">
                          <p className="font-semibold">
                            {formatCurrency(order.amount)}
                          </p>
                        </td>

                        {/* PAYMENT */}

                        <td className="px-6 py-4">
                          <div>
                            <span
                              className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getPaymentStatusStyles(
                                order.paymentStatus
                              )}`}
                            >
                              {order.paymentStatus}
                            </span>

                            <p className="mt-1 text-xs text-muted-foreground">
                              {order.paymentMethod}
                            </p>
                          </div>
                        </td>

                        {/* ORDER STATUS */}

                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles.className}`}
                          >
                            <StatusIcon className="h-3.5 w-3.5" />

                            {order.status}
                          </span>
                        </td>

                        {/* DATE */}

                        <td className="px-6 py-4 text-sm text-muted-foreground">
                          {order.createdAt}
                        </td>

                        {/* ACTIONS */}

                        <td className="px-6 py-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-9 w-9 rounded-xl"
                              >
                                <MoreHorizontal className="h-4 w-4" />

                                <span className="sr-only">
                                  Open order actions
                                </span>
                              </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                              align="end"
                              className="w-52"
                            >
                              {/* VIEW */}

                              <DropdownMenuItem
                                onClick={() =>
                                  handleViewOrder(order.id)
                                }
                              >
                                <Eye className="mr-2 h-4 w-4" />

                                View Order
                              </DropdownMenuItem>

                              <DropdownMenuSeparator />

                              {/* PENDING */}

                              {order.status !== "Pending" && (
                                <DropdownMenuItem
                                  onClick={() =>
                                    handlePendingOrder(
                                      order.id
                                    )
                                  }
                                >
                                  <Clock3 className="mr-2 h-4 w-4" />

                                  Set Pending
                                </DropdownMenuItem>
                              )}

                              {/* PROCESSING */}

                              {order.status !== "Processing" && (
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleProcessOrder(
                                      order.id
                                    )
                                  }
                                >
                                  <RefreshCw className="mr-2 h-4 w-4" />

                                  Set Processing
                                </DropdownMenuItem>
                              )}

                              {/* SHIPPED */}

                              {order.status !== "Shipped" && (
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleShipOrder(order.id)
                                  }
                                >
                                  <Truck className="mr-2 h-4 w-4" />

                                  Mark as Shipped
                                </DropdownMenuItem>
                              )}

                              {/* DELIVERED */}

                              {order.status !== "Delivered" && (
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleDeliverOrder(
                                      order.id
                                    )
                                  }
                                >
                                  <CheckCircle2 className="mr-2 h-4 w-4" />

                                  Mark as Delivered
                                </DropdownMenuItem>
                              )}

                              {/* CANCELLED */}

                              {order.status !== "Cancelled" && (
                                <>
                                  <DropdownMenuSeparator />

                                  <DropdownMenuItem
                                    className="text-destructive focus:text-destructive"
                                    onClick={() =>
                                      handleCancelOrder(
                                        order.id
                                      )
                                    }
                                  >
                                    <Ban className="mr-2 h-4 w-4" />

                                    Cancel Order
                                  </DropdownMenuItem>
                                </>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* =====================================================
          PAGINATION
      ===================================================== */}

      {filteredOrders.length > 0 && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-medium text-foreground">
              {(currentPage - 1) * ITEMS_PER_PAGE + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium text-foreground">
              {Math.min(
                currentPage * ITEMS_PER_PAGE,
                filteredOrders.length
              )}
            </span>{" "}
            of{" "}
            <span className="font-medium text-foreground">
              {filteredOrders.length}
            </span>{" "}
            orders
          </p>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-xl"
              disabled={currentPage === 1}
              onClick={() =>
                handlePageChange(currentPage - 1)
              }
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex items-center gap-1">
              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              ).map((page) => (
                <Button
                  key={page}
                  variant={
                    currentPage === page
                      ? "default"
                      : "outline"
                  }
                  size="sm"
                  className="h-9 min-w-9 rounded-xl"
                  onClick={() =>
                    handlePageChange(page)
                  }
                >
                  {page}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-xl"
              disabled={currentPage === totalPages}
              onClick={() =>
                handlePageChange(currentPage + 1)
              }
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* =====================================================
          ADMIN NOTE
      ===================================================== */}

      <Card className="rounded-2xl border-dashed">
        <CardContent className="flex gap-3 p-5">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />

          <div>
            <h3 className="font-medium">
              Order management
            </h3>

            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Order status changes are currently handled in
              the frontend state for development. Once the
              backend order API is connected, status updates
              will be persisted to MongoDB and restricted to
              authorized administrators.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrdersPage;