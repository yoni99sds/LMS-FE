import {
  Users,
  UserCog,
  BookOpen,
  ShoppingCart,
  CreditCard,
  TrendingUp,
  MoreHorizontal,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  DollarSign,
  GraduationCap,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useAppSelector } from "@/hooks/redux";

const DashboardPage = () => {
  const navigate = useNavigate();

  const { user } = useAppSelector((state) => state.auth);

  const firstName = user?.firstName || "Admin";

  /*
   * ============================================================
   * DASHBOARD PLACEHOLDER DATA
   * ============================================================
   * These values will later be replaced with real API data.
   */

  const stats = [
    {
      title: "Total Users",
      value: "2,845",
      change: "+12.5%",
      description: "from last month",
      icon: Users,
      path: "/admin/users",
    },
    {
      title: "Instructors",
      value: "148",
      change: "+8.2%",
      description: "from last month",
      icon: UserCog,
      path: "/admin/instructors",
    },
    {
      title: "Total Courses",
      value: "326",
      change: "+5.4%",
      description: "from last month",
      icon: BookOpen,
      path: "/admin/courses",
    },
    {
      title: "Total Revenue",
      value: "$48,295",
      change: "+18.7%",
      description: "from last month",
      icon: DollarSign,
      path: "/admin/payments",
    },
  ];

  const recentUsers = [
    {
      id: 1,
      name: "Abebe Kebede",
      email: "abebe@example.com",
      role: "Student",
      status: "Active",
      date: "Today, 10:24 AM",
    },
    {
      id: 2,
      name: "Sara Johnson",
      email: "sara@example.com",
      role: "Instructor",
      status: "Active",
      date: "Today, 09:42 AM",
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael@example.com",
      role: "Student",
      status: "Active",
      date: "Yesterday",
    },
    {
      id: 4,
      name: "Hanna Tesfaye",
      email: "hanna@example.com",
      role: "Student",
      status: "Pending",
      date: "Yesterday",
    },
    {
      id: 5,
      name: "Daniel Wilson",
      email: "daniel@example.com",
      role: "Instructor",
      status: "Active",
      date: "2 days ago",
    },
  ];

  const recentCourses = [
    {
      id: 1,
      title: "Complete React & TypeScript",
      instructor: "Sara Johnson",
      category: "Development",
      students: 284,
      status: "Published",
    },
    {
      id: 2,
      title: "UI/UX Design Masterclass",
      instructor: "Daniel Wilson",
      category: "Design",
      students: 196,
      status: "Published",
    },
    {
      id: 3,
      title: "Node.js Backend Development",
      instructor: "Michael Smith",
      category: "Development",
      students: 142,
      status: "Pending",
    },
    {
      id: 4,
      title: "Digital Marketing Fundamentals",
      instructor: "Anna Davis",
      category: "Marketing",
      students: 118,
      status: "Published",
    },
  ];

  const recentOrders = [
    {
      id: "#ORD-1048",
      customer: "Abebe Kebede",
      course: "React & TypeScript",
      amount: "$49.00",
      status: "Completed",
    },
    {
      id: "#ORD-1047",
      customer: "Hanna Tesfaye",
      course: "UI/UX Design",
      amount: "$39.00",
      status: "Completed",
    },
    {
      id: "#ORD-1046",
      customer: "John Smith",
      course: "Node.js Backend",
      amount: "$59.00",
      status: "Pending",
    },
    {
      id: "#ORD-1045",
      customer: "Sara Wilson",
      course: "Digital Marketing",
      amount: "$29.00",
      status: "Completed",
    },
  ];

  const revenueData = [
    { month: "Jan", value: 3200 },
    { month: "Feb", value: 4100 },
    { month: "Mar", value: 3600 },
    { month: "Apr", value: 5200 },
    { month: "May", value: 6100 },
    { month: "Jun", value: 5800 },
    { month: "Jul", value: 7200 },
    { month: "Aug", value: 8295 },
  ];

  const maxRevenue = Math.max(
    ...revenueData.map((item) => item.value)
  );

  const quickActions = [
    {
      title: "Manage Users",
      description: "View and manage platform users",
      icon: Users,
      path: "/admin/users",
    },
    {
      title: "Review Courses",
      description: "Review submitted courses",
      icon: BookOpen,
      path: "/admin/courses",
    },
    {
      title: "View Payments",
      description: "Check recent transactions",
      icon: CreditCard,
      path: "/admin/payments",
    },
    {
      title: "View Reports",
      description: "Generate platform reports",
      icon: TrendingUp,
      path: "/admin/reports",
    },
  ];

  /*
   * ============================================================
   * HELPERS
   * ============================================================
   */

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const getStatusClass = (status: string) => {
    if (status === "Active" || status === "Completed") {
      return "bg-green-500/10 text-green-600";
    }

    return "bg-yellow-500/10 text-yellow-600";
  };

  /*
   * ============================================================
   * PAGE
   * ============================================================
   */

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-4 sm:space-y-6">

      {/* ======================================================
          PAGE HEADER
      ======================================================= */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div className="min-w-0">
          <p className="text-sm font-medium text-muted-foreground">
            Administration
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
            Welcome back, {firstName} 👋
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Here's what's happening with your LMS today.
          </p>
        </div>

        <div className="flex w-full gap-2 sm:w-auto">

          <Button
            variant="outline"
            className="flex-1 rounded-xl sm:flex-none"
            onClick={() => navigate("/admin/reports")}
          >
            <TrendingUp className="mr-2 h-4 w-4" />
            Reports
          </Button>

          <Button
            className="flex-1 rounded-xl sm:flex-none"
            onClick={() => navigate("/admin/courses")}
          >
            <BookOpen className="mr-2 h-4 w-4" />
            <span className="hidden xs:inline sm:inline">
              Manage Courses
            </span>
            <span className="xs:hidden">
              Courses
            </span>
          </Button>

        </div>
      </div>

      {/* ======================================================
          STAT CARDS
      ======================================================= */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Card
              key={stat.title}
              className="
                cursor-pointer
                rounded-2xl
                border
                shadow-sm
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:shadow-md
              "
              onClick={() => navigate(stat.path)}
            >
              <CardContent className="p-4 sm:p-5">

                <div className="flex items-start justify-between">

                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      bg-primary/10
                      text-primary
                      sm:h-11
                      sm:w-11
                    "
                  >
                    <Icon size={20} />
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={(event) => {
                      event.stopPropagation();
                      navigate(stat.path);
                    }}
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>

                </div>

                <div className="mt-4">

                  <p className="text-sm text-muted-foreground">
                    {stat.title}
                  </p>

                  <div className="mt-1 flex flex-wrap items-end justify-between gap-2">

                    <h2 className="text-2xl font-bold">
                      {stat.value}
                    </h2>

                    <span
                      className="
                        inline-flex
                        items-center
                        gap-1
                        rounded-full
                        bg-green-500/10
                        px-2
                        py-1
                        text-xs
                        font-semibold
                        text-green-600
                      "
                    >
                      <TrendingUp size={12} />
                      {stat.change}
                    </span>

                  </div>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {stat.description}
                  </p>

                </div>

              </CardContent>
            </Card>
          );
        })}

      </div>

      {/* ======================================================
          REVENUE + QUICK ACTIONS
      ======================================================= */}
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">

        {/* REVENUE */}
        <Card className="min-w-0 rounded-2xl shadow-sm">

          <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <div className="min-w-0">
              <CardTitle className="text-lg">
                Revenue Overview
              </CardTitle>

              <p className="mt-1 text-sm text-muted-foreground">
                Monthly revenue performance
              </p>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full rounded-xl sm:w-auto"
                >
                  Last 8 months
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  Last 30 days
                </DropdownMenuItem>

                <DropdownMenuItem>
                  Last 6 months
                </DropdownMenuItem>

                <DropdownMenuItem>
                  Last 12 months
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

          </CardHeader>

          <CardContent>

            <div className="mb-6 flex flex-wrap items-end gap-3">

              <h3 className="text-3xl font-bold">
                $48,295
              </h3>

              <span className="mb-1 flex items-center gap-1 text-sm font-medium text-green-600">
                <TrendingUp size={15} />
                18.7%
              </span>

            </div>

            {/* MOBILE-SAFE CHART */}
            <div className="w-full overflow-hidden">

              <div className="flex h-[220px] items-end gap-1.5 sm:h-[260px] sm:gap-4">

                {revenueData.map((item) => {
                  const height =
                    (item.value / maxRevenue) * 100;

                  return (
                    <div
                      key={item.month}
                      className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2"
                    >

                      <div className="flex h-full w-full items-end">

                        <div
                          className="
                            w-full
                            rounded-t-md
                            bg-primary
                            opacity-80
                            transition-all
                            hover:opacity-100
                            sm:rounded-t-lg
                          "
                          style={{
                            height: `${height}%`,
                          }}
                          title={`$${item.value.toLocaleString()}`}
                        />

                      </div>

                      <span className="text-[10px] text-muted-foreground sm:text-xs">
                        {item.month}
                      </span>

                    </div>
                  );
                })}

              </div>

            </div>

          </CardContent>
        </Card>

        {/* QUICK ACTIONS */}
        <Card className="min-w-0 rounded-2xl shadow-sm">

          <CardHeader>

            <CardTitle className="text-lg">
              Quick Actions
            </CardTitle>

            <p className="text-sm text-muted-foreground">
              Frequently used administration tools
            </p>

          </CardHeader>

          <CardContent className="space-y-3">

            {quickActions.map((action) => {
              const Icon = action.icon;

              return (
                <button
                  key={action.title}
                  type="button"
                  onClick={() => navigate(action.path)}
                  className="
                    flex
                    w-full
                    min-w-0
                    items-center
                    gap-3
                    rounded-xl
                    border
                    p-3
                    text-left
                    transition
                    hover:bg-muted
                  "
                >

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon size={18} />
                  </div>

                  <div className="min-w-0 flex-1">

                    <p className="truncate text-sm font-semibold">
                      {action.title}
                    </p>

                    <p className="truncate text-xs text-muted-foreground">
                      {action.description}
                    </p>

                  </div>

                  <ArrowUpRight
                    size={16}
                    className="shrink-0 text-muted-foreground"
                  />

                </button>
              );
            })}

          </CardContent>
        </Card>

      </div>

      {/* ======================================================
          RECENT USERS + SYSTEM STATUS
      ======================================================= */}
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">

        {/* ====================================================
            RECENT USERS
        ===================================================== */}
        <Card className="min-w-0 overflow-hidden rounded-2xl shadow-sm">

          <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <div className="min-w-0">
              <CardTitle className="text-lg">
                Recent Users
              </CardTitle>

              <p className="mt-1 text-sm text-muted-foreground">
                Recently registered platform users
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="w-full rounded-xl sm:w-auto"
              onClick={() => navigate("/admin/users")}
            >
              View all
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>

          </CardHeader>

          <CardContent className="p-0 sm:p-6">

            {/* ==================================================
                DESKTOP TABLE
            =================================================== */}
            <div className="hidden overflow-x-auto sm:block">

              <table className="w-full min-w-[650px]">

                <thead>
                  <tr className="border-b text-left">

                    <th className="px-0 pb-3 text-xs font-semibold text-muted-foreground">
                      USER
                    </th>

                    <th className="pb-3 text-xs font-semibold text-muted-foreground">
                      ROLE
                    </th>

                    <th className="pb-3 text-xs font-semibold text-muted-foreground">
                      STATUS
                    </th>

                    <th className="pb-3 text-xs font-semibold text-muted-foreground">
                      JOINED
                    </th>

                    <th className="pb-3" />

                  </tr>
                </thead>

                <tbody>

                  {recentUsers.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b last:border-0"
                    >

                      <td className="py-4">

                        <div className="flex items-center gap-3">

                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                            {getInitials(item.name)}
                          </div>

                          <div className="min-w-0">

                            <p className="text-sm font-medium">
                              {item.name}
                            </p>

                            <p className="max-w-[220px] truncate text-xs text-muted-foreground">
                              {item.email}
                            </p>

                          </div>

                        </div>

                      </td>

                      <td className="py-4">
                        <span className="text-sm">
                          {item.role}
                        </span>
                      </td>

                      <td className="py-4">

                        <span
                          className={`
                            inline-flex
                            rounded-full
                            px-2.5
                            py-1
                            text-xs
                            font-medium
                            ${getStatusClass(item.status)}
                          `}
                        >
                          {item.status}
                        </span>

                      </td>

                      <td className="py-4 text-sm text-muted-foreground">
                        {item.date}
                      </td>

                      <td className="py-4 text-right">

                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() =>
                            navigate(
                              `/admin/users/${item.id}`
                            )
                          }
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>

                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>

            {/* ==================================================
                MOBILE USER CARDS
            =================================================== */}
            <div className="space-y-3 px-4 pb-4 sm:hidden">

              {recentUsers.map((item) => (
                <div
                  key={item.id}
                  className="
                    rounded-xl
                    border
                    p-3
                    transition-colors
                    hover:bg-muted/40
                  "
                >

                  {/* USER TOP */}
                  <div className="flex items-start gap-3">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                      {getInitials(item.name)}
                    </div>

                    <div className="min-w-0 flex-1">

                      <div className="flex items-start justify-between gap-2">

                        <div className="min-w-0">

                          <p className="truncate text-sm font-semibold">
                            {item.name}
                          </p>

                          <p className="truncate text-xs text-muted-foreground">
                            {item.email}
                          </p>

                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 shrink-0 rounded-full"
                          onClick={() =>
                            navigate(
                              `/admin/users/${item.id}`
                            )
                          }
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>

                      </div>

                    </div>

                  </div>

                  {/* USER DETAILS */}
                  <div className="mt-3 flex flex-wrap items-center gap-2">

                    <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium">
                      {item.role}
                    </span>

                    <span
                      className={`
                        rounded-full
                        px-2.5
                        py-1
                        text-xs
                        font-medium
                        ${getStatusClass(item.status)}
                      `}
                    >
                      {item.status}
                    </span>

                    <span className="text-xs text-muted-foreground">
                      {item.date}
                    </span>

                  </div>

                </div>
              ))}

            </div>

          </CardContent>
        </Card>

        {/* ====================================================
            SYSTEM STATUS
        ===================================================== */}
        <Card className="min-w-0 rounded-2xl shadow-sm">

          <CardHeader>

            <CardTitle className="text-lg">
              System Status
            </CardTitle>

            <p className="text-sm text-muted-foreground">
              Current platform health
            </p>

          </CardHeader>

          <CardContent className="space-y-4">

            {/* API */}
            <div className="flex items-center justify-between gap-3 rounded-xl border p-3">

              <div className="flex min-w-0 items-center gap-3">

                <div className="shrink-0 rounded-lg bg-green-500/10 p-2 text-green-600">
                  <CheckCircle2 size={18} />
                </div>

                <div className="min-w-0">

                  <p className="text-sm font-medium">
                    API Server
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Operational
                  </p>

                </div>

              </div>

              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-green-500" />

            </div>

            {/* DATABASE */}
            <div className="flex items-center justify-between gap-3 rounded-xl border p-3">

              <div className="flex min-w-0 items-center gap-3">

                <div className="shrink-0 rounded-lg bg-green-500/10 p-2 text-green-600">
                  <CheckCircle2 size={18} />
                </div>

                <div className="min-w-0">

                  <p className="text-sm font-medium">
                    Database
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Connected
                  </p>

                </div>

              </div>

              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-green-500" />

            </div>

            {/* REDIS */}
            <div className="flex items-center justify-between gap-3 rounded-xl border p-3">

              <div className="flex min-w-0 items-center gap-3">

                <div className="shrink-0 rounded-lg bg-green-500/10 p-2 text-green-600">
                  <CheckCircle2 size={18} />
                </div>

                <div className="min-w-0">

                  <p className="text-sm font-medium">
                    Redis
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Connected
                  </p>

                </div>

              </div>

              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-green-500" />

            </div>

            {/* PENDING REVIEWS */}
            <div className="flex items-center justify-between gap-3 rounded-xl border p-3">

              <div className="flex min-w-0 items-center gap-3">

                <div className="shrink-0 rounded-lg bg-yellow-500/10 p-2 text-yellow-600">
                  <AlertCircle size={18} />
                </div>

                <div className="min-w-0">

                  <p className="text-sm font-medium">
                    Pending Reviews
                  </p>

                  <p className="truncate text-xs text-muted-foreground">
                    12 items require attention
                  </p>

                </div>

              </div>

              <span className="shrink-0 text-xs font-semibold text-yellow-600">
                12
              </span>

            </div>

          </CardContent>
        </Card>

      </div>

      {/* ======================================================
          RECENT COURSES + ORDERS
      ======================================================= */}
      <div className="grid gap-6 xl:grid-cols-2">

        {/* RECENT COURSES */}
        <Card className="min-w-0 rounded-2xl shadow-sm">

          <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

            <div className="min-w-0">

              <CardTitle className="text-lg">
                Recent Courses
              </CardTitle>

              <p className="mt-1 text-sm text-muted-foreground">
                Latest courses on the platform
              </p>

            </div>

            <Button
              variant="ghost"
              size="sm"
              className="w-full rounded-xl sm:w-auto"
              onClick={() => navigate("/admin/courses")}
            >
              View all
            </Button>

          </CardHeader>

          <CardContent className="space-y-3">

            {recentCourses.map((course) => (
              <div
                key={course.id}
                className="
                  flex
                  min-w-0
                  items-center
                  gap-3
                  rounded-xl
                  border
                  p-3
                  transition
                  hover:bg-muted/50
                "
              >

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <GraduationCap size={20} />
                </div>

                <div className="min-w-0 flex-1">

                  <p className="truncate text-sm font-semibold">
                    {course.title}
                  </p>

                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {course.instructor} • {course.category}
                  </p>

                  {/* MOBILE COURSE INFO */}
                  <div className="mt-2 flex items-center gap-2 sm:hidden">

                    <span className="text-xs text-muted-foreground">
                      {course.students} students
                    </span>

                    <span
                      className={`
                        inline-flex
                        rounded-full
                        px-2
                        py-0.5
                        text-[10px]
                        font-medium
                        ${
                          course.status === "Published"
                            ? "bg-green-500/10 text-green-600"
                            : "bg-yellow-500/10 text-yellow-600"
                        }
                      `}
                    >
                      {course.status}
                    </span>

                  </div>

                </div>

                {/* DESKTOP COURSE INFO */}
                <div className="hidden shrink-0 text-right sm:block">

                  <p className="text-xs font-medium">
                    {course.students} students
                  </p>

                  <span
                    className={`
                      mt-1
                      inline-flex
                      rounded-full
                      px-2
                      py-0.5
                      text-[10px]
                      font-medium
                      ${
                        course.status === "Published"
                          ? "bg-green-500/10 text-green-600"
                          : "bg-yellow-500/10 text-yellow-600"
                      }
                    `}
                  >
                    {course.status}
                  </span>

                </div>

              </div>
            ))}

          </CardContent>
        </Card>

        {/* RECENT ORDERS */}
        <Card className="min-w-0 rounded-2xl shadow-sm">

          <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

            <div className="min-w-0">

              <CardTitle className="text-lg">
                Recent Orders
              </CardTitle>

              <p className="mt-1 text-sm text-muted-foreground">
                Latest course purchases
              </p>

            </div>

            <Button
              variant="ghost"
              size="sm"
              className="w-full rounded-xl sm:w-auto"
              onClick={() => navigate("/admin/orders")}
            >
              View all
            </Button>

          </CardHeader>

          <CardContent>

            <div className="space-y-3">

              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="
                    flex
                    min-w-0
                    items-center
                    gap-3
                    rounded-xl
                    border
                    p-3
                  "
                >

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <ShoppingCart size={18} />
                  </div>

                  <div className="min-w-0 flex-1">

                    <div className="flex items-center gap-2">

                      <p className="text-sm font-semibold">
                        {order.id}
                      </p>

                      <span
                        className={`
                          hidden
                          rounded-full
                          px-2
                          py-0.5
                          text-[10px]
                          font-medium
                          sm:inline-flex
                          ${getStatusClass(order.status)}
                        `}
                      >
                        {order.status}
                      </span>

                    </div>

                    <p className="truncate text-xs text-muted-foreground">
                      {order.customer} • {order.course}
                    </p>

                    {/* MOBILE STATUS */}
                    <span
                      className={`
                        mt-1
                        inline-flex
                        rounded-full
                        px-2
                        py-0.5
                        text-[10px]
                        font-medium
                        sm:hidden
                        ${getStatusClass(order.status)}
                      `}
                    >
                      {order.status}
                    </span>

                  </div>

                  <p className="shrink-0 text-sm font-bold">
                    {order.amount}
                  </p>

                </div>
              ))}

            </div>

          </CardContent>
        </Card>

      </div>

      {/* ======================================================
          PLATFORM SUMMARY
      ======================================================= */}
      <Card className="min-w-0 rounded-2xl shadow-sm">

        <CardHeader>

          <CardTitle className="text-lg">
            Platform Summary
          </CardTitle>

          <p className="text-sm text-muted-foreground">
            Current LMS activity
          </p>

        </CardHeader>

        <CardContent>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {/* ACTIVE STUDENTS */}
            <div className="rounded-2xl bg-muted/40 p-4">

              <div className="flex items-center gap-3">

                <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
                  <Users size={19} />
                </div>

                <div>

                  <p className="text-xs text-muted-foreground">
                    Active Students
                  </p>

                  <p className="text-xl font-bold">
                    2,514
                  </p>

                </div>

              </div>

            </div>

            {/* PUBLISHED COURSES */}
            <div className="rounded-2xl bg-muted/40 p-4">

              <div className="flex items-center gap-3">

                <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
                  <BookOpen size={19} />
                </div>

                <div>

                  <p className="text-xs text-muted-foreground">
                    Published Courses
                  </p>

                  <p className="text-xl font-bold">
                    294
                  </p>

                </div>

              </div>

            </div>

            {/* ORDERS */}
            <div className="rounded-2xl bg-muted/40 p-4">

              <div className="flex items-center gap-3">

                <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
                  <ShoppingCart size={19} />
                </div>

                <div>

                  <p className="text-xs text-muted-foreground">
                    Orders This Month
                  </p>

                  <p className="text-xl font-bold">
                    1,248
                  </p>

                </div>

              </div>

            </div>

            {/* PENDING APPROVALS */}
            <div className="rounded-2xl bg-muted/40 p-4">

              <div className="flex items-center gap-3">

                <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
                  <Clock size={19} />
                </div>

                <div>

                  <p className="text-xs text-muted-foreground">
                    Pending Approvals
                  </p>

                  <p className="text-xl font-bold">
                    12
                  </p>

                </div>

              </div>

            </div>

          </div>

        </CardContent>
      </Card>

    </div>
  );
};

export default DashboardPage;