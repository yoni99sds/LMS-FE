import { Link } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  Plus,
  Search,
  ShieldAlert,
  UserCog,
} from "lucide-react";

import { useAppSelector } from "@/hooks/redux";
import {
  hasPermission,
  SUBADMIN_PERMISSIONS,
} from "@/config/subAdminPermissions";

const SubAdminInstructorsPage = () => {
  const user = useAppSelector((state) => state.auth.user);
  const permissions = user?.permissions ?? [];

  const canView = hasPermission(
    permissions,
    SUBADMIN_PERMISSIONS.INSTRUCTORS_VIEW,
  );

  const canCreate = hasPermission(
    permissions,
    SUBADMIN_PERMISSIONS.INSTRUCTORS_CREATE,
  );

  const canUpdate = hasPermission(
    permissions,
    SUBADMIN_PERMISSIONS.INSTRUCTORS_UPDATE,
  );

  const canUpdateStatus = hasPermission(
    permissions,
    SUBADMIN_PERMISSIONS.INSTRUCTORS_STATUS_UPDATE,
  );

  if (!canView) {
    return (
      <section className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-6 text-center shadow-sm sm:p-10">
        <ShieldAlert className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
        <h1 className="text-xl font-semibold">Access restricted</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          You do not have permission to view instructor records.
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
              className="hover:text-foreground"
            >
              Dashboard
            </Link>
            <span>/</span>
            <span>Instructors</span>
          </div>

          <h1 className="mt-2 flex items-center gap-2 text-2xl font-bold tracking-tight sm:text-3xl">
            <UserCog className="h-7 w-7" />
            Instructors
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Review and manage instructor accounts within your assigned access.
          </p>
        </div>

        {canCreate && (
          <button
            type="button"
            disabled
            title="Connect this action to the existing instructor API"
            className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground opacity-60"
          >
            <Plus className="h-4 w-4" />
            Add instructor
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-5">
          <UserCog className="h-5 w-5 text-muted-foreground" />
          <p className="mt-3 text-sm text-muted-foreground">
            Instructor records
          </p>
          <p className="mt-1 text-lg font-semibold">Not connected</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <BookOpen className="h-5 w-5 text-muted-foreground" />
          <p className="mt-3 text-sm text-muted-foreground">
            Instructor courses
          </p>
          <p className="mt-1 text-lg font-semibold">Not connected</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground">Your permissions</p>
          <p className="mt-3 text-sm font-medium">
            {[
              "View",
              ...(canCreate ? ["Create"] : []),
              ...(canUpdate ? ["Edit"] : []),
              ...(canUpdateStatus ? ["Update status"] : []),
            ].join(" · ")}
          </p>
        </div>
      </div>

      <section className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold">Instructor directory</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Instructor details and account actions will appear here.
            </p>
          </div>

          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              disabled
              aria-label="Search instructors"
              placeholder="Search instructors..."
              className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-3 text-sm opacity-60 outline-none"
            />
          </div>
        </div>

        <div className="flex min-h-64 flex-col items-center justify-center px-4 py-12 text-center">
          <UserCog className="mb-4 h-10 w-10 text-muted-foreground" />
          <h3 className="font-semibold">Instructor API not connected</h3>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            Connect your existing instructor endpoints before enabling the
            directory, search, pagination, create/edit forms, or activate and
            deactivate actions. Permanent deletion is intentionally excluded.
          </p>
        </div>
      </section>
    </div>
  );
};

export default SubAdminInstructorsPage;
