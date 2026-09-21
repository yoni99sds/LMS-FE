import {
  Search,
  MoreHorizontal,
  Eye,
  Download,
  RotateCcw,
  RefreshCcw,
  CheckCircle2,
  XCircle,
  Clock,
  CreditCard,
  DollarSign,
  TrendingUp,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Receipt,
  Wallet,
  ArrowDownLeft,
} from "lucide-react";

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Card,
  CardContent,
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

type PaymentStatus =
  | "Successful"
  | "Pending"
  | "Failed"
  | "Refunded";

type PaymentProvider =
  | "Chapa"
  | "ArifPay"
  | "Telebirr";

interface Payment {
  id: string;
  transactionId: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  courseId: string;
  courseTitle: string;
  provider: PaymentProvider;
  amount: number;
  fee: number;
  netAmount: number;
  status: PaymentStatus;
  createdAt: string;
}

const paymentsData: Payment[] = [
  {
    id: "payment-001",
    transactionId: "CHP-7F92A1",
    orderNumber: "EDU-2026-0001",
    customerId: "user-001",
    customerName: "Michael Adams",
    customerEmail: "michael@example.com",
    courseId: "course-001",
    courseTitle:
      "Complete Web Development Bootcamp",
    provider: "Chapa",
    amount: 59,
    fee: 1.77,
    netAmount: 57.23,
    status: "Successful",
    createdAt: "Sep 16, 2026 14:32",
  },
  {
    id: "payment-002",
    transactionId: "ARP-91B42C",
    orderNumber: "EDU-2026-0002",
    customerId: "user-002",
    customerName: "Sarah Wilson",
    customerEmail: "sarah@example.com",
    courseId: "course-002",
    courseTitle:
      "React & TypeScript Masterclass",
    provider: "ArifPay",
    amount: 49,
    fee: 1.47,
    netAmount: 47.53,
    status: "Successful",
    createdAt: "Sep 16, 2026 12:18",
  },
  {
    id: "payment-003",
    transactionId: "CHP-4D81E7",
    orderNumber: "EDU-2026-0003",
    customerId: "user-003",
    customerName: "Daniel Brown",
    customerEmail: "daniel@example.com",
    courseId: "course-003",
    courseTitle:
      "Node.js & Express API Development",
    provider: "Chapa",
    amount: 45,
    fee: 1.35,
    netAmount: 43.65,
    status: "Pending",
    createdAt: "Sep 15, 2026 18:45",
  },
  {
    id: "payment-004",
    transactionId: "TEL-3A72D9",
    orderNumber: "EDU-2026-0004",
    customerId: "user-004",
    customerName: "Emily Davis",
    customerEmail: "emily@example.com",
    courseId: "course-005",
    courseTitle:
      "UI/UX Design Fundamentals",
    provider: "Telebirr",
    amount: 55,
    fee: 1.65,
    netAmount: 53.35,
    status: "Successful",
    createdAt: "Sep 15, 2026 15:21",
  },
  {
    id: "payment-005",
    transactionId: "CHP-8K42LM",
    orderNumber: "EDU-2026-0005",
    customerId: "user-005",
    customerName: "James Miller",
    customerEmail: "james@example.com",
    courseId: "course-007",
    courseTitle:
      "Digital Marketing Strategy",
    provider: "Chapa",
    amount: 49,
    fee: 1.47,
    netAmount: 47.53,
    status: "Successful",
    createdAt: "Sep 14, 2026 11:42",
  },
  {
    id: "payment-006",
    transactionId: "ARP-7P31XZ",
    orderNumber: "EDU-2026-0006",
    customerId: "user-006",
    customerName: "Robert Taylor",
    customerEmail: "robert@example.com",
    courseId: "course-001",
    courseTitle:
      "Complete Web Development Bootcamp",
    provider: "ArifPay",
    amount: 59,
    fee: 0,
    netAmount: 0,
    status: "Failed",
    createdAt: "Sep 14, 2026 09:17",
  },
  {
    id: "payment-007",
    transactionId: "CHP-5Q83RT",
    orderNumber: "EDU-2026-0007",
    customerId: "user-007",
    customerName: "Jessica Moore",
    customerEmail: "jessica@example.com",
    courseId: "course-004",
    courseTitle:
      "MongoDB for Modern Applications",
    provider: "Chapa",
    amount: 39,
    fee: 1.17,
    netAmount: 0,
    status: "Refunded",
    createdAt: "Sep 13, 2026 16:03",
  },
  {
    id: "payment-008",
    transactionId: "TEL-9M52KA",
    orderNumber: "EDU-2026-0008",
    customerId: "user-008",
    customerName: "William Anderson",
    customerEmail: "william@example.com",
    courseId: "course-003",
    courseTitle:
      "Node.js & Express API Development",
    provider: "Telebirr",
    amount: 45,
    fee: 1.35,
    netAmount: 43.65,
    status: "Successful",
    createdAt: "Sep 13, 2026 13:28",
  },
  {
    id: "payment-009",
    transactionId: "CHP-1N74VB",
    orderNumber: "EDU-2026-0009",
    customerId: "user-009",
    customerName: "Olivia Thomas",
    customerEmail: "olivia@example.com",
    courseId: "course-005",
    courseTitle:
      "UI/UX Design Fundamentals",
    provider: "Chapa",
    amount: 55,
    fee: 1.65,
    netAmount: 53.35,
    status: "Successful",
    createdAt: "Sep 12, 2026 17:36",
  },
  {
    id: "payment-010",
    transactionId: "ARP-2W91CD",
    orderNumber: "EDU-2026-0010",
    customerId: "user-010",
    customerName: "Benjamin Jackson",
    customerEmail: "benjamin@example.com",
    courseId: "course-006",
    courseTitle:
      "Advanced JavaScript",
    provider: "ArifPay",
    amount: 42,
    fee: 1.26,
    netAmount: 40.74,
    status: "Pending",
    createdAt: "Sep 12, 2026 10:14",
  },
  {
    id: "payment-011",
    transactionId: "CHP-6R82YT",
    orderNumber: "EDU-2026-0011",
    customerId: "user-011",
    customerName: "Sophia White",
    customerEmail: "sophia@example.com",
    courseId: "course-007",
    courseTitle:
      "Digital Marketing Strategy",
    provider: "Chapa",
    amount: 49,
    fee: 1.47,
    netAmount: 47.53,
    status: "Successful",
    createdAt: "Sep 11, 2026 14:08",
  },
  {
    id: "payment-012",
    transactionId: "TEL-8K43PQ",
    orderNumber: "EDU-2026-0012",
    customerId: "user-012",
    customerName: "Alexander Harris",
    customerEmail: "alexander@example.com",
    courseId: "course-002",
    courseTitle:
      "React & TypeScript Masterclass",
    provider: "Telebirr",
    amount: 49,
    fee: 1.47,
    netAmount: 47.53,
    status: "Successful",
    createdAt: "Sep 10, 2026 16:51",
  },
];

const PaymentsPage = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState<string>("all");

  const [providerFilter, setProviderFilter] =
    useState<string>("all");

  const [currentPage, setCurrentPage] =
    useState(1);

  const itemsPerPage = 8;

  /*
   * ============================================
   * FILTERING
   * ============================================
   */

  const filteredPayments = useMemo(() => {
    const searchValue = search
      .toLowerCase()
      .trim();

    return paymentsData.filter((payment) => {
      const matchesSearch =
        !searchValue ||
        payment.transactionId
          .toLowerCase()
          .includes(searchValue) ||
        payment.orderNumber
          .toLowerCase()
          .includes(searchValue) ||
        payment.customerName
          .toLowerCase()
          .includes(searchValue) ||
        payment.customerEmail
          .toLowerCase()
          .includes(searchValue) ||
        payment.courseTitle
          .toLowerCase()
          .includes(searchValue);

      const matchesStatus =
        statusFilter === "all" ||
        payment.status === statusFilter;

      const matchesProvider =
        providerFilter === "all" ||
        payment.provider === providerFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesProvider
      );
    });
  }, [
    search,
    statusFilter,
    providerFilter,
  ]);

  /*
   * ============================================
   * PAGINATION
   * ============================================
   */

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredPayments.length / itemsPerPage
    )
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages
  );

  const paginatedPayments =
    filteredPayments.slice(
      (safeCurrentPage - 1) * itemsPerPage,
      safeCurrentPage * itemsPerPage
    );

  /*
   * ============================================
   * STATISTICS
   * ============================================
   */

  const totalTransactions =
    paymentsData.length;

  const successfulPayments =
    paymentsData.filter(
      (payment) =>
        payment.status === "Successful"
    );

  const pendingPayments =
    paymentsData.filter(
      (payment) =>
        payment.status === "Pending"
    ).length;

  const failedPayments =
    paymentsData.filter(
      (payment) =>
        payment.status === "Failed"
    ).length;

  const refundedPayments =
    paymentsData.filter(
      (payment) =>
        payment.status === "Refunded"
    ).length;

  const totalCollected =
    successfulPayments.reduce(
      (sum, payment) =>
        sum + payment.amount,
      0
    );

  const totalFees =
    successfulPayments.reduce(
      (sum, payment) =>
        sum + payment.fee,
      0
    );

  const totalNetRevenue =
    successfulPayments.reduce(
      (sum, payment) =>
        sum + payment.netAmount,
      0
    );

  /*
   * ============================================
   * HANDLERS
   * ============================================
   */

  const handleSearchChange = (
    value: string
  ) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (
    value: string
  ) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handleProviderChange = (
    value: string
  ) => {
    setProviderFilter(value);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setProviderFilter("all");
    setCurrentPage(1);
  };

  const handleView = (id: string) => {
    console.log("View payment:", id);
  };

  const handleOrder = (
    orderNumber: string
  ) => {
    console.log(
      "View order:",
      orderNumber
    );
  };

  const handleCustomer = (
    customerId: string
  ) => {
    navigate(
      `/admin/users/${customerId}`
    );
  };

  const handleRefund = (id: string) => {
    console.log(
      "Refund payment:",
      id
    );
  };

  const handleRetry = (id: string) => {
    console.log(
      "Retry payment:",
      id
    );
  };

  const handleDownload = (
    id: string
  ) => {
    console.log(
      "Download payment receipt:",
      id
    );
  };

  const handleReconcile = () => {
    console.log("Reconcile payments");
  };

  /*
   * ============================================
   * STATUS HELPERS
   * ============================================
   */

  const getStatusClasses = (
    status: PaymentStatus
  ) => {
    switch (status) {
      case "Successful":
        return "bg-green-500/10 text-green-600";

      case "Pending":
        return "bg-yellow-500/10 text-yellow-600";

      case "Failed":
        return "bg-red-500/10 text-red-600";

      case "Refunded":
        return "bg-purple-500/10 text-purple-600";

      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (
    status: PaymentStatus
  ) => {
    switch (status) {
      case "Successful":
        return (
          <CheckCircle2 className="h-3.5 w-3.5" />
        );

      case "Pending":
        return (
          <Clock className="h-3.5 w-3.5" />
        );

      case "Failed":
        return (
          <XCircle className="h-3.5 w-3.5" />
        );

      case "Refunded":
        return (
          <RotateCcw className="h-3.5 w-3.5" />
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* ===================================== */}
      {/* HEADER */}
      {/* ===================================== */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Payments
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Monitor transactions, payment providers,
            refunds, and financial activity.
          </p>
        </div>

        <Button
          variant="outline"
          onClick={handleReconcile}
          className="rounded-xl"
        >
          <RefreshCcw className="mr-2 h-4 w-4" />
          Reconcile Payments
        </Button>
      </div>

      {/* ===================================== */}
      {/* STATISTICS */}
      {/* ===================================== */}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Transactions
                </p>

                <p className="mt-1 text-2xl font-bold">
                  {totalTransactions}
                </p>
              </div>

              <div className="rounded-xl bg-primary/10 p-3 text-primary">
                <CreditCard className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Collected
                </p>

                <p className="mt-1 text-2xl font-bold">
                  ${totalCollected.toLocaleString()}
                </p>
              </div>

              <div className="rounded-xl bg-green-500/10 p-3 text-green-600">
                <TrendingUp className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Processing Fees
                </p>

                <p className="mt-1 text-2xl font-bold">
                  ${totalFees.toFixed(2)}
                </p>
              </div>

              <div className="rounded-xl bg-yellow-500/10 p-3 text-yellow-600">
                <Wallet className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Net Revenue
                </p>

                <p className="mt-1 text-2xl font-bold">
                  ${totalNetRevenue.toFixed(2)}
                </p>
              </div>

              <div className="rounded-xl bg-blue-500/10 p-3 text-blue-600">
                <DollarSign className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Pending
                </p>

                <p className="mt-1 text-2xl font-bold">
                  {pendingPayments}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  {failedPayments} failed •{" "}
                  {refundedPayments} refunded
                </p>
              </div>

              <div className="rounded-xl bg-orange-500/10 p-3 text-orange-600">
                <Clock className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ===================================== */}
      {/* FILTERS */}
      {/* ===================================== */}

      <Card>
        <CardContent className="p-4">
          <div className="grid gap-3 lg:grid-cols-[1fr_180px_180px_auto]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                value={search}
                onChange={(event) =>
                  handleSearchChange(
                    event.target.value
                  )
                }
                placeholder="Search transaction, order, customer..."
                className="rounded-xl pl-9"
              />
            </div>

            <Select
              value={statusFilter}
              onValueChange={
                handleStatusChange
              }
            >
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Payment Status" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">
                  All Statuses
                </SelectItem>

                <SelectItem value="Successful">
                  Successful
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

            <Select
              value={providerFilter}
              onValueChange={
                handleProviderChange
              }
            >
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Provider" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">
                  All Providers
                </SelectItem>

                <SelectItem value="Chapa">
                  Chapa
                </SelectItem>

                <SelectItem value="ArifPay">
                  ArifPay
                </SelectItem>

                <SelectItem value="Telebirr">
                  Telebirr
                </SelectItem>
              </SelectContent>
            </Select>

            {(search ||
              statusFilter !== "all" ||
              providerFilter !== "all") && (
              <Button
                variant="outline"
                onClick={clearFilters}
                className="rounded-xl"
              >
                Clear
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* ===================================== */}
      {/* PAYMENTS TABLE */}
      {/* ===================================== */}

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1250px]">
            <thead className="border-b bg-muted/30">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Transaction
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Customer
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Course
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Provider
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Amount
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Net
                </th>

                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Status
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Date
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {paginatedPayments.length > 0 ? (
                paginatedPayments.map(
                  (payment) => (
                    <tr
                      key={payment.id}
                      className="transition hover:bg-muted/20"
                    >
                      {/* Transaction */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <Receipt className="h-5 w-5" />
                          </div>

                          <div>
                            <p className="font-semibold">
                              {payment.transactionId}
                            </p>

                            <button
                              type="button"
                              onClick={() =>
                                handleOrder(
                                  payment.orderNumber
                                )
                              }
                              className="mt-1 text-xs text-muted-foreground hover:text-primary"
                            >
                              {payment.orderNumber}
                            </button>
                          </div>
                        </div>
                      </td>

                      {/* Customer */}
                      <td className="px-6 py-4">
                        <button
                          type="button"
                          onClick={() =>
                            handleCustomer(
                              payment.customerId
                            )
                          }
                          className="text-left"
                        >
                          <p className="text-sm font-semibold hover:text-primary">
                            {payment.customerName}
                          </p>

                          <p className="mt-1 text-xs text-muted-foreground">
                            {payment.customerEmail}
                          </p>
                        </button>
                      </td>

                      {/* Course */}
                      <td className="px-6 py-4">
                        <button
                          type="button"
                          onClick={() =>
                            navigate(
                              `/admin/courses/${payment.courseId}`
                            )
                          }
                          className="max-w-[260px] text-left"
                        >
                          <p className="truncate text-sm font-medium hover:text-primary">
                            {payment.courseTitle}
                          </p>
                        </button>
                      </td>

                      {/* Provider */}
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center rounded-lg bg-muted px-3 py-1.5 text-xs font-semibold">
                          {payment.provider}
                        </span>
                      </td>

                      {/* Amount */}
                      <td className="px-6 py-4 text-right">
                        <div>
                          <p className="font-semibold">
                            $
                            {payment.amount.toFixed(
                              2
                            )}
                          </p>

                          {payment.fee > 0 && (
                            <p className="mt-1 text-xs text-muted-foreground">
                              Fee $
                              {payment.fee.toFixed(
                                2
                              )}
                            </p>
                          )}
                        </div>
                      </td>

                      {/* Net */}
                      <td className="px-6 py-4 text-right">
                        {payment.status ===
                        "Successful" ? (
                          <span className="font-semibold">
                            $
                            {payment.netAmount.toFixed(
                              2
                            )}
                          </span>
                        ) : (
                          <span className="text-sm text-muted-foreground">
                            —
                          </span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
                            payment.status
                          )}`}
                        >
                          {getStatusIcon(
                            payment.status
                          )}

                          {payment.status}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4">
                        <span className="text-sm text-muted-foreground">
                          {payment.createdAt}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger
                            asChild
                          >
                            <Button
                              variant="ghost"
                              size="icon"
                              className="rounded-lg"
                            >
                              <MoreHorizontal className="h-5 w-5" />
                            </Button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent
                            align="end"
                            className="w-56"
                          >
                            <DropdownMenuItem
                              onClick={() =>
                                handleView(
                                  payment.id
                                )
                              }
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Payment
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              onClick={() =>
                                handleDownload(
                                  payment.id
                                )
                              }
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Download Receipt
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            {payment.status ===
                              "Failed" && (
                              <DropdownMenuItem
                                onClick={() =>
                                  handleRetry(
                                    payment.id
                                  )
                                }
                              >
                                <RefreshCcw className="mr-2 h-4 w-4" />
                                Retry Payment
                              </DropdownMenuItem>
                            )}

                            {payment.status ===
                              "Successful" && (
                              <DropdownMenuItem
                                onClick={() =>
                                  handleRefund(
                                    payment.id
                                  )
                                }
                              >
                                <ArrowDownLeft className="mr-2 h-4 w-4" />
                                Refund Payment
                              </DropdownMenuItem>
                            )}

                            {payment.status ===
                              "Refunded" && (
                              <DropdownMenuItem
                                disabled
                              >
                                <RotateCcw className="mr-2 h-4 w-4" />
                                Already Refunded
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td
                    colSpan={9}
                    className="px-6 py-16 text-center"
                  >
                    <div className="mx-auto flex max-w-sm flex-col items-center">
                      <div className="rounded-full bg-muted p-4">
                        <CreditCard className="h-6 w-6 text-muted-foreground" />
                      </div>

                      <h3 className="mt-4 font-semibold">
                        No payments found
                      </h3>

                      <p className="mt-1 text-sm text-muted-foreground">
                        Try adjusting your search or
                        filter settings.
                      </p>

                      <Button
                        variant="outline"
                        className="mt-4 rounded-xl"
                        onClick={clearFilters}
                      >
                        Clear Filters
                      </Button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* =================================== */}
        {/* PAGINATION */}
        {/* =================================== */}

        <div className="flex flex-col gap-3 border-t px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-medium text-foreground">
              {filteredPayments.length === 0
                ? 0
                : (safeCurrentPage - 1) *
                    itemsPerPage +
                  1}
            </span>{" "}
            to{" "}
            <span className="font-medium text-foreground">
              {Math.min(
                safeCurrentPage *
                  itemsPerPage,
                filteredPayments.length
              )}
            </span>{" "}
            of{" "}
            <span className="font-medium text-foreground">
              {filteredPayments.length}
            </span>{" "}
            payments
          </p>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              disabled={safeCurrentPage === 1}
              onClick={() =>
                setCurrentPage((page) =>
                  Math.max(1, page - 1)
                )
              }
              className="rounded-lg"
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
                    page === safeCurrentPage
                      ? "default"
                      : "ghost"
                  }
                  size="sm"
                  onClick={() =>
                    setCurrentPage(page)
                  }
                  className="h-8 w-8 rounded-lg p-0"
                >
                  {page}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              disabled={
                safeCurrentPage === totalPages
              }
              onClick={() =>
                setCurrentPage((page) =>
                  Math.min(
                    totalPages,
                    page + 1
                  )
                )
              }
              className="rounded-lg"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* ===================================== */}
      {/* PAYMENT PROVIDERS */}
      {/* ===================================== */}

      <div className="grid gap-4 md:grid-cols-3">
        {(
          [
            "Chapa",
            "ArifPay",
            "Telebirr",
          ] as PaymentProvider[]
        ).map((provider) => {
          const providerPayments =
            paymentsData.filter(
              (payment) =>
                payment.provider === provider &&
                payment.status ===
                  "Successful"
            );

          const providerTotal =
            providerPayments.reduce(
              (sum, payment) =>
                sum + payment.amount,
              0
            );

          return (
            <Card key={provider}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold">
                      {provider}
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      Successful transactions
                    </p>
                  </div>

                  <div className="rounded-xl bg-primary/10 p-3 text-primary">
                    <CreditCard className="h-5 w-5" />
                  </div>
                </div>

                <div className="mt-5 flex items-end justify-between">
                  <div>
                    <p className="text-2xl font-bold">
                      {providerPayments.length}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      transactions
                    </p>
                  </div>

                  <p className="font-semibold">
                    ${providerTotal.toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* ===================================== */}
      {/* ADMIN NOTE */}
      {/* ===================================== */}

      <div className="flex items-start gap-3 rounded-xl border bg-muted/20 p-4">
        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

        <div>
          <p className="text-sm font-medium">
            Payment reconciliation
          </p>

          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            Payment records currently use placeholder
            data. Real transaction verification, provider
            webhooks, refunds, reconciliation, receipts,
            and financial reporting will be connected to
            Chapa, ArifPay, Telebirr, and the LMS payment
            API later.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentsPage;