
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserCog,
  BookOpen,
  FolderTree,
  ShoppingCart,
  CreditCard,
  Star,
  ClipboardList,
  FileBarChart,
  BarChart3,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";

import { useAppSelector } from "@/hooks/redux";
import {
  SUBADMIN_PERMISSIONS,
  hasPermission,
} from "@/config/subAdminPermissions";

const dashboardModules = [
  {
    title: "Students",
    description: "Review student accounts and manage permitted actions.",
    path: "/sub-admin/students",
    permission: SUBADMIN_PERMISSIONS.STUDENTS_VIEW,
    icon: Users,
  },
  {
    title: "Instructors",
    description: "Manage instructor records within your assigned permissions.",
    path: "/sub-admin/instructors",
    permission: SUBADMIN_PERMISSIONS.INSTRUCTORS_VIEW,
    icon: UserCog,
  },
  {
    title: "Courses",
    description: "Review courses and access permitted course operations.",
    path: "/sub-admin/courses",
    permission: SUBADMIN_PERMISSIONS.COURSES_VIEW,
    icon: BookOpen,
  },
  {
    title: "Categories",
    description: "View the course category structure.",
    path: "/sub-admin/categories",
    permission: SUBADMIN_PERMISSIONS.CATEGORIES_VIEW,
    icon: FolderTree,
  },
  {
    title: "Orders",
    description: "Review customer orders.",
    path: "/sub-admin/orders",
    permission: SUBADMIN_PERMISSIONS.ORDERS_VIEW,
    icon: ShoppingCart,
  },
  {
    title: "Payments",
    description: "View payment records without refund privileges.",
    path: "/sub-admin/payments",
    permission: SUBADMIN_PERMISSIONS.PAYMENTS_VIEW,
    icon: CreditCard,
  },
  {
    title: "Reviews",
    description: "Review learner feedback and permitted moderation tasks.",
    path: "/sub-admin/reviews",
    permission: SUBADMIN_PERMISSIONS.REVIEWS_VIEW,
    icon: Star,
  },
  {
    title: "Assignments",
    description: "Review and manage assignments where authorized.",
    path: "/sub-admin/assignments",
    permission: SUBADMIN_PERMISSIONS.ASSIGNMENTS_VIEW,
    icon: ClipboardList,
  },
  {
    title: "Reports",
    description: "View available operational reports.",
    path: "/sub-admin/reports",
    permission: SUBADMIN_PERMISSIONS.REPORTS_VIEW,
    icon: FileBarChart,
  },
  {
    title: "Analytics",
    description: "Explore available LMS analytics.",
    path: "/sub-admin/analytics",
    permission: SUBADMIN_PERMISSIONS.ANALYTICS_VIEW,
    icon: BarChart3,
  },
];

const SubAdminDashboard = () => {
  const { user } = useAppSelector((state) => state.auth);

  const firstName =
    user?.firstName || user?.name?.split(" ")[0] || "there";

  const permissions = user?.permissions ?? [];

  const visibleModules = dashboardModules.filter((module) =>
    hasPermission(permissions, module.permission),
  );

  const canViewDashboard = hasPermission(
    permissions,
    SUBADMIN_PERMISSIONS.DASHBOARD_VIEW,
  );

  if (!canViewDashboard) {
    return (
      <section className="mx-auto max-w-3xl rounded-2xl border p-6 sm:p-8">
        <ShieldCheck className="mb-3 h-8 w-8 text-muted-foreground" />
        <h1 className="text-xl font-bold">Dashboard access restricted</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Your account does not have permission to view this dashboard.
          Contact an administrator if you believe this is incorrect.
        </p>
      </section>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6">
      {/* Page heading */}
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
            <LayoutDashboard size={16} />
            <span>Sub Admin / Dashboard</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Welcome back, {firstName}
          </h1>

          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            Manage the LMS operations available to your account.
          </p>
        </div>

        <div className="inline-flex w-fit items-center gap-2 rounded-full border bg-background px-3 py-2 text-xs font-medium sm:text-sm">
          <ShieldCheck size={16} className="text-primary" />
          <span>Restricted access</span>
        </div>
      </section>

      {/* Permission summary */}
      <section className="rounded-2xl border bg-card p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-primary/10 p-3 text-primary">
            <ShieldCheck size={22} />
          </div>

          <div className="min-w-0">
            <h2 className="font-semibold">Your access permissions</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              The sections below are displayed according to the
              permissions assigned to your account. Restricted operations
              must also be checked by the backend.
            </p>

            <p className="mt-3 text-sm font-medium">
              {permissions.length} permission
              {permissions.length === 1 ? "" : "s"} assigned
            </p>
          </div>
        </div>
      </section>

      {/* Available modules */}
      <section className="space-y-4">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold sm:text-xl">
              Available modules
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Open a section to continue working.
            </p>
          </div>

          <span className="shrink-0 text-sm text-muted-foreground">
            {visibleModules.length} available
          </span>
        </div>

        {visibleModules.length === 0 ? (
          <div className="rounded-2xl border border-dashed p-8 text-center">
            <p className="font-medium">No management modules available</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Ask your administrator to assign the permissions you need.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {visibleModules.map((module) => {
              const Icon = module.icon;

              return (
                <Link
                  key={module.path}
                  to={module.path}
                  className="
                    group flex min-w-0 items-start gap-4 rounded-2xl
                    border bg-card p-4 transition
                    hover:border-primary/50 hover:shadow-sm
                    focus-visible:outline-none focus-visible:ring-2
                    focus-visible:ring-primary
                    sm:p-5
                  "
                >
                  <div className="shrink-0 rounded-xl bg-primary/10 p-3 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon size={22} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="truncate font-semibold">
                        {module.title}
                      </h3>
                      <ArrowUpRight
                        size={18}
                        className="shrink-0 text-muted-foreground transition group-hover:text-primary"
                      />
                    </div>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {module.description}
                    </p>

                    <p className="mt-3 text-xs font-medium text-primary">
                      Open module
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default SubAdminDashboard;
