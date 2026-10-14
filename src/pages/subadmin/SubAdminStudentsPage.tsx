import { Link } from "react-router-dom";
import {
  ArrowLeft,
  GraduationCap,
  Plus,
  Search,
  ShieldAlert,
  Users,
} from "lucide-react";

import { useAppSelector } from "@/hooks/redux";
import {
  hasAnyPermission,
  hasPermission,
  SUBADMIN_PERMISSIONS,
} from "@/config/subAdminPermissions";

const SubAdminStudentsPage = () => {
  const user = useAppSelector((state) => state.auth.user);
  const permissions = user?.permissions ?? [];

  const canView = hasPermission(
    permissions,
    SUBADMIN_PERMISSIONS.STUDENTS_VIEW,
  );

  const canCreate = hasPermission(
    permissions,
    SUBADMIN_PERMISSIONS.STUDENTS_CREATE,
  );

  const canUpdate = hasPermission(
    permissions,
    SUBADMIN_PERMISSIONS.STUDENTS_UPDATE,
  );

  const canUpdateStatus = hasPermission(
    permissions,
    SUBADMIN_PERMISSIONS.STUDENTS_STATUS_UPDATE,
  );

  const canManage = hasAnyPermission(permissions, [
    SUBADMIN_PERMISSIONS.STUDENTS_CREATE,
    SUBADMIN_PERMISSIONS.STUDENTS_UPDATE,
    SUBADMIN_PERMISSIONS.STUDENTS_STATUS_UPDATE,
  ]);

  if (!canView) {
    return (
      <section className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-6 text-center shadow-sm sm:p-10">
        <ShieldAlert className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
        <h1 className="text-xl font-semibold">Access restricted</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          You do not have permission to view student records.
          Contact an administrator if you believe this is incorrect.
        </p>
        <Link
          to="/sub-admin/dashboard"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to dashboard
        </Link>
      </section>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link
              to="/sub-admin/dashboard"
              className="transition-colors hover:text-foreground"
            >
              Dashboard
            </Link>
            <span>/</span>
            <span>Students</span>
          </div>

          <h1 className="mt-2 flex items-center gap-2 text-2xl font-bold tracking-tight sm:text-3xl">
            <GraduationCap className="h-7 w-7" />
            Students
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            View and manage student accounts according to your assigned
            permissions.
          </p>
        </div>

        {canCreate && (
          <button
            type="button"
            disabled
            title="Connect this action to the existing student API"
            className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground opacity-60"
          >
            <Plus className="h-4 w-4" />
            Add student
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Student records</p>
            <Users className="h-5 w-5 text-muted-foreground" />
          </div>
          <p className="mt-3 text-lg font-semibold">Not connected</p>
          <p className="mt-1 text-xs text-muted-foreground">
            The total will appear when the student API is connected.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground">Your access</p>
          <p className="mt-3 text-lg font-semibold">
            {canManage ? "Management access" : "View only"}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {[
              canCreate && "Create",
              canUpdate && "Edit",
              canUpdateStatus && "Update status",
            ]
              .filter(Boolean)
              .join(" · ") || "View student records"}
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold">Student directory</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Student records will appear here after API integration.
            </p>
          </div>

          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              disabled
              aria-label="Search students"
              placeholder="Search students..."
              className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-3 text-sm opacity-60 outline-none"
            />
          </div>
        </div>

        <div className="flex min-h-64 flex-col items-center justify-center px-4 py-12 text-center">
          <Users className="mb-4 h-10 w-10 text-muted-foreground" />
          <h3 className="font-semibold">Student API not connected</h3>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            No student data is being displayed yet. Connect this page to your
            existing student list endpoint to enable searching, pagination,
            editing, and account status management.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubAdminStudentsPage;
