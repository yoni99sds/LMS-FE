import { Link } from "react-router-dom";
import {
  ArrowLeft,
  BarChart3,
  Download,
  FileBarChart,
  ShieldAlert,
} from "lucide-react";

import { useAppSelector } from "@/hooks/redux";
import {
  hasPermission,
  SUBADMIN_PERMISSIONS,
} from "@/config/subAdminPermissions";

const SubAdminReportsPage = () => {
  const user = useAppSelector((state) => state.auth.user);
  const permissions = user?.permissions ?? [];

  const canView = hasPermission(
    permissions,
    SUBADMIN_PERMISSIONS.REPORTS_VIEW,
  );

  const canExport = hasPermission(
    permissions,
    SUBADMIN_PERMISSIONS.REPORTS_EXPORT,
  );

  if (!canView) {
    return (
      <section className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-6 text-center shadow-sm sm:p-10">
        <ShieldAlert className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
        <h1 className="text-xl font-semibold">Access restricted</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          You do not have permission to view reports.
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
      <div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/sub-admin/dashboard" className="hover:text-foreground">
            Dashboard
          </Link>
          <span>/</span>
          <span>Reports</span>
        </div>

        <h1 className="mt-2 flex items-center gap-2 text-2xl font-bold tracking-tight sm:text-3xl">
          <FileBarChart className="h-7 w-7" />
          Reports
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Access reports permitted for your account. Report contents will be
          loaded from the LMS backend.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-5">
          <BarChart3 className="h-5 w-5 text-muted-foreground" />
          <h2 className="mt-3 font-semibold">Available reports</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Not connected
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Report categories and results will come from the existing API.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <Download className="h-5 w-5 text-muted-foreground" />
          <h2 className="mt-3 font-semibold">Export permissions</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {canExport
              ? "You have permission to export reports."
              : "Your account does not have report export permission."}
          </p>

          {canExport && (
            <button
              type="button"
              disabled
              title="Enable after connecting the report export endpoint"
              className="mt-4 inline-flex cursor-not-allowed items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium opacity-60"
            >
              <Download className="h-4 w-4" />
              Export report
            </button>
          )}
        </div>
      </div>

      <section className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-border bg-card px-4 py-12 text-center">
        <FileBarChart className="mb-4 h-10 w-10 text-muted-foreground" />
        <h2 className="font-semibold">Reports API not connected</h2>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          Connect the existing reports endpoints to show real LMS statistics
          and downloadable reports. Export must remain disabled until a real
          export endpoint is available.
        </p>
      </section>
    </div>
  );
};

export default SubAdminReportsPage;