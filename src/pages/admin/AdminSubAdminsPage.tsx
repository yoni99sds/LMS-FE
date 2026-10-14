
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { FormEvent } from "react";

import {
  AlertCircle,
  Check,
  ChevronDown,
  ChevronUp,
  LoaderCircle,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  UserCog,
  Users,
  X,
} from "lucide-react";
import { toast } from "sonner";

import {
  SUBADMIN_PERMISSIONS,
  type SubAdminPermission,
} from "@/config/subAdminPermissions";

import {
  adminSubAdminsApi,
  type CreateSubAdminPayload,
  type SubAdminAccount,
} from "@/api/adminSubAdminsApi";

interface PermissionGroup {
  title: string;
  description: string;
  permissions: {
    value: SubAdminPermission;
    label: string;
  }[];
}

const permissionGroups: PermissionGroup[] = [
  {
    title: "Dashboard",
    description: "Access the SubAdmin dashboard.",
    permissions: [
      {
        value: SUBADMIN_PERMISSIONS.DASHBOARD_VIEW,
        label: "View dashboard",
      },
    ],
  },
  {
    title: "Students",
    description: "Manage student accounts.",
    permissions: [
      {
        value: SUBADMIN_PERMISSIONS.STUDENTS_VIEW,
        label: "View students",
      },
      {
        value: SUBADMIN_PERMISSIONS.STUDENTS_CREATE,
        label: "Create students",
      },
      {
        value: SUBADMIN_PERMISSIONS.STUDENTS_UPDATE,
        label: "Edit students",
      },
      {
        value: SUBADMIN_PERMISSIONS.STUDENTS_STATUS_UPDATE,
        label: "Activate or deactivate students",
      },
    ],
  },
  {
    title: "Instructors",
    description: "Manage instructor accounts.",
    permissions: [
      {
        value: SUBADMIN_PERMISSIONS.INSTRUCTORS_VIEW,
        label: "View instructors",
      },
      {
        value: SUBADMIN_PERMISSIONS.INSTRUCTORS_CREATE,
        label: "Create instructors",
      },
      {
        value: SUBADMIN_PERMISSIONS.INSTRUCTORS_UPDATE,
        label: "Edit instructors",
      },
      {
        value: SUBADMIN_PERMISSIONS.INSTRUCTORS_STATUS_UPDATE,
        label: "Activate or deactivate instructors",
      },
    ],
  },
  {
    title: "Courses and Categories",
    description: "Manage learning content.",
    permissions: [
      {
        value: SUBADMIN_PERMISSIONS.COURSES_VIEW,
        label: "View courses",
      },
      {
        value: SUBADMIN_PERMISSIONS.COURSES_UPDATE,
        label: "Edit courses",
      },
      {
        value: SUBADMIN_PERMISSIONS.COURSES_REVIEW,
        label: "Review courses",
      },
      {
        value: SUBADMIN_PERMISSIONS.CATEGORIES_VIEW,
        label: "View categories",
      },
    ],
  },
  {
    title: "Assignments and Reviews",
    description: "Review assignments and moderate learner reviews.",
    permissions: [
      {
        value: SUBADMIN_PERMISSIONS.ASSIGNMENTS_VIEW,
        label: "View assignments",
      },
      {
        value: SUBADMIN_PERMISSIONS.ASSIGNMENTS_MANAGE,
        label: "Manage assignments",
      },
      {
        value: SUBADMIN_PERMISSIONS.REVIEWS_VIEW,
        label: "View reviews",
      },
      {
        value: SUBADMIN_PERMISSIONS.REVIEWS_MODERATE,
        label: "Moderate reviews",
      },
    ],
  },
  {
    title: "Reports and Analytics",
    description: "Access reports and analytics.",
    permissions: [
      {
        value: SUBADMIN_PERMISSIONS.REPORTS_VIEW,
        label: "View reports",
      },
      {
        value: SUBADMIN_PERMISSIONS.REPORTS_EXPORT,
        label: "Export reports",
      },
      {
        value: SUBADMIN_PERMISSIONS.ANALYTICS_VIEW,
        label: "View analytics",
      },
    ],
  },
  {
    title: "Commerce",
    description: "View orders and payments.",
    permissions: [
      {
        value: SUBADMIN_PERMISSIONS.ORDERS_VIEW,
        label: "View orders",
      },
      {
        value: SUBADMIN_PERMISSIONS.PAYMENTS_VIEW,
        label: "View payments",
      },
    ],
  },
  {
    title: "Profile",
    description: "Access the SubAdmin profile.",
    permissions: [
      {
        value: SUBADMIN_PERMISSIONS.PROFILE_VIEW,
        label: "View profile",
      },
    ],
  },
];

const DEFAULT_PERMISSIONS: SubAdminPermission[] = [
  SUBADMIN_PERMISSIONS.DASHBOARD_VIEW,
  SUBADMIN_PERMISSIONS.STUDENTS_VIEW,
  SUBADMIN_PERMISSIONS.COURSES_VIEW,
  SUBADMIN_PERMISSIONS.REPORTS_VIEW,
  SUBADMIN_PERMISSIONS.PROFILE_VIEW,
];

const INITIAL_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const formatDate = (value?: string): string => {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "—";

  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

const getDisplayName = (
  account: SubAdminAccount,
): string => {
  const name =
    `${account.firstName ?? ""} ${account.lastName ?? ""}`.trim();

  return name || account.email;
};

const isAccountActive = (
  account: SubAdminAccount,
): boolean => {
  if (typeof account.isActive === "boolean") {
    return account.isActive;
  }

  if (account.status) {
    return account.status.toLowerCase() === "active";
  }

  return true;
};

const AdminSubAdminsPage = () => {
  const [accounts, setAccounts] = useState<SubAdminAccount[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState(INITIAL_FORM);

  const [expandedGroups, setExpandedGroups] = useState<string[]>(
    permissionGroups.map((group) => group.title),
  );

  const [selectedPermissions, setSelectedPermissions] =
    useState<SubAdminPermission[]>(DEFAULT_PERMISSIONS);

  const allPermissions = useMemo(
    () =>
      permissionGroups.flatMap((group) =>
        group.permissions.map((permission) => permission.value),
      ),
    [],
  );

  const loadAccounts = useCallback(async () => {
    setLoading(true);
    setLoadError("");

    try {
      const data = await adminSubAdminsApi.list();
      setAccounts(data);
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to load SubAdmin accounts.";

      setLoadError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadAccounts();
  }, [loadAccounts]);

  const filteredAccounts = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return accounts;

    return accounts.filter((account) => {
      return (
        getDisplayName(account).toLowerCase().includes(query) ||
        account.email.toLowerCase().includes(query)
      );
    });
  }, [accounts, search]);

  const activeCount = useMemo(
    () => accounts.filter(isAccountActive).length,
    [accounts],
  );

  const togglePermission = (
    permission: SubAdminPermission,
  ) => {
    setSelectedPermissions((current) =>
      current.includes(permission)
        ? current.filter((item) => item !== permission)
        : [...current, permission],
    );
  };

  const toggleGroup = (title: string) => {
    setExpandedGroups((current) =>
      current.includes(title)
        ? current.filter((item) => item !== title)
        : [...current, title],
    );
  };

  const resetForm = () => {
    setForm(INITIAL_FORM);
    setSelectedPermissions(DEFAULT_PERMISSIONS);
  };

  const toggleAllPermissions = () => {
    setSelectedPermissions((current) =>
      current.length === allPermissions.length
        ? []
        : [...allPermissions],
    );
  };

  const handleCreate = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (selectedPermissions.length === 0) {
      toast.error("Select at least one permission.");
      return;
    }

    const payload: CreateSubAdminPayload = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim().toLowerCase(),
      password: form.password,
      role: "SubAdmin",
      permissions: selectedPermissions,
    };

    setSubmitting(true);

    try {
      await adminSubAdminsApi.create(payload);

      toast.success("SubAdmin account created successfully.");

      resetForm();
      setFormOpen(false);

      await loadAccounts();
    } catch (error: unknown) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to create the SubAdmin account.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      {/* Page heading */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Admin</span>
            <span>/</span>
            <span>SubAdmins</span>
          </div>

          <h1 className="mt-2 flex items-center gap-2 text-2xl font-bold tracking-tight sm:text-3xl">
            <ShieldCheck className="h-7 w-7" />
            SubAdmin Management
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Create SubAdmin accounts and assign permissions
            according to each person's responsibilities.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setFormOpen((current) => !current)}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          {formOpen ? (
            <X className="h-4 w-4" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
          {formOpen ? "Close form" : "Create SubAdmin"}
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Total SubAdmins
            </p>
            <Users className="h-5 w-5 text-muted-foreground" />
          </div>

          <p className="mt-3 text-3xl font-bold">
            {loading ? "—" : accounts.length}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            Accounts returned by the backend.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Active accounts
            </p>
            <UserCog className="h-5 w-5 text-muted-foreground" />
          </div>

          <p className="mt-3 text-3xl font-bold">
            {loading ? "—" : activeCount}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            Based on account status returned by the API.
          </p>
        </div>
      </div>

      {/* Create form */}
      {formOpen && (
        <section className="rounded-xl border border-border bg-card">
          <div className="border-b border-border p-5">
            <h2 className="text-lg font-semibold">
              Create a SubAdmin
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Enter account details and select permissions.
            </p>
          </div>

          <form
            onSubmit={handleCreate}
            className="space-y-6 p-5"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="subadmin-first-name"
                  className="text-sm font-medium"
                >
                  First name
                </label>
                <input
                  id="subadmin-first-name"
                  autoComplete="given-name"
                  required
                  maxLength={80}
                  value={form.firstName}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      firstName: event.target.value,
                    }))
                  }
                  placeholder="First name"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="subadmin-last-name"
                  className="text-sm font-medium"
                >
                  Last name
                </label>
                <input
                  id="subadmin-last-name"
                  autoComplete="family-name"
                  required
                  maxLength={80}
                  value={form.lastName}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      lastName: event.target.value,
                    }))
                  }
                  placeholder="Last name"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="subadmin-email"
                  className="text-sm font-medium"
                >
                  Email address
                </label>
                <input
                  id="subadmin-email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={254}
                  value={form.email}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      email: event.target.value,
                    }))
                  }
                  placeholder="subadmin@example.com"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="subadmin-password"
                  className="text-sm font-medium"
                >
                  Temporary password
                </label>
                <input
                  id="subadmin-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  minLength={8}
                  value={form.password}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      password: event.target.value,
                    }))
                  }
                  placeholder="At least 8 characters"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
                />
                <p className="text-xs text-muted-foreground">
                  The backend must hash passwords before saving them.
                </p>
              </div>
            </div>

            {/* Permission selection */}
            <div className="space-y-4">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <h3 className="font-semibold">
                    Assign permissions
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {selectedPermissions.length} selected
                  </p>
                </div>

                <button
                  type="button"
                  onClick={toggleAllPermissions}
                  className="self-start rounded-lg border border-border px-3 py-2 text-sm font-medium hover:bg-muted sm:self-auto"
                >
                  {selectedPermissions.length ===
                  allPermissions.length
                    ? "Clear all"
                    : "Select all"}
                </button>
              </div>

              <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
                {permissionGroups.map((group) => {
                  const expanded = expandedGroups.includes(
                    group.title,
                  );

                  return (
                    <div
                      key={group.title}
                      className="overflow-hidden rounded-lg border border-border"
                    >
                      <button
                        type="button"
                        onClick={() => toggleGroup(group.title)}
                        aria-expanded={expanded}
                        className="flex w-full items-center justify-between gap-3 bg-muted/30 p-4 text-left hover:bg-muted/60"
                      >
                        <span>
                          <span className="block text-sm font-semibold">
                            {group.title}
                          </span>
                          <span className="mt-1 block text-xs text-muted-foreground">
                            {group.description}
                          </span>
                        </span>

                        {expanded ? (
                          <ChevronUp className="h-4 w-4 shrink-0" />
                        ) : (
                          <ChevronDown className="h-4 w-4 shrink-0" />
                        )}
                      </button>

                      {expanded && (
                        <div className="space-y-3 p-4">
                          {group.permissions.map((permission) => (
                            <label
                              key={permission.value}
                              className="flex cursor-pointer items-start gap-3 text-sm"
                            >
                              <input
                                type="checkbox"
                                checked={selectedPermissions.includes(
                                  permission.value,
                                )}
                                onChange={() =>
                                  togglePermission(
                                    permission.value,
                                  )
                                }
                                className="mt-0.5 h-4 w-4 accent-primary"
                              />
                              <span>{permission.label}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <p className="flex items-start gap-2 rounded-lg border border-border bg-muted/20 p-3 text-xs text-muted-foreground">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
                Grant only the permissions required. Your backend
                must enforce permissions on protected endpoints.
              </p>
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:justify-end">
              <button
                type="button"
                disabled={submitting}
                onClick={() => {
                  resetForm();
                  setFormOpen(false);
                }}
                className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium hover:bg-muted disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={
                  submitting ||
                  selectedPermissions.length === 0
                }
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? (
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                ) : (
                  <Check className="h-4 w-4" />
                )}
                {submitting
                  ? "Creating account..."
                  : "Create SubAdmin"}
              </button>
            </div>
          </form>
        </section>
      )}

      {/* Account directory */}
      <section className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="flex flex-col gap-4 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold">SubAdmin accounts</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Search and review accounts returned by the backend.
            </p>
          </div>

          <div className="flex w-full gap-2 sm:w-auto">
            <div className="relative min-w-0 flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search name or email"
                aria-label="Search SubAdmin accounts"
                className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-3 text-sm outline-none focus:border-primary"
              />
            </div>

            <button
              type="button"
              onClick={() => void loadAccounts()}
              disabled={loading}
              aria-label="Refresh SubAdmin accounts"
              title="Refresh"
              className="inline-flex items-center justify-center rounded-lg border border-border px-3 py-2 hover:bg-muted disabled:opacity-50"
            >
              <RefreshCw
                className={`h-4 w-4 ${
                  loading ? "animate-spin" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {loadError && (
          <div
            role="alert"
            className="m-4 flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4"
          >
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />

            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">
                Unable to load accounts
              </p>
              <p className="mt-1 break-words text-sm text-muted-foreground">
                {loadError}
              </p>
            </div>

            <button
              type="button"
              onClick={() => void loadAccounts()}
              className="text-sm font-medium text-primary"
            >
              Retry
            </button>
          </div>
        )}

        {loading ? (
          <div className="flex min-h-52 items-center justify-center gap-3 text-sm text-muted-foreground">
            <LoaderCircle className="h-5 w-5 animate-spin" />
            Loading SubAdmin accounts...
          </div>
        ) : !loadError && filteredAccounts.length === 0 ? (
          <div className="flex min-h-60 flex-col items-center justify-center px-4 py-12 text-center">
            <Users className="mb-4 h-10 w-10 text-muted-foreground" />

            <h3 className="font-semibold">
              {search
                ? "No matching accounts"
                : "No SubAdmin accounts found"}
            </h3>

            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              {search
                ? "Try a different name or email address."
                : "Create a SubAdmin account to get started. Existing accounts will appear here when the API returns them."}
            </p>
          </div>
        ) : !loadError ? (
          <>
            {/* Mobile account cards */}
            <div className="space-y-3 p-4 md:hidden">
              {filteredAccounts.map((account) => (
                <article
                  key={account._id}
                  className="rounded-lg border border-border p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                      {(
                        account.firstName?.[0] ??
                        account.email[0] ??
                        "S"
                      ).toUpperCase()}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="break-words font-medium">
                        {getDisplayName(account)}
                      </p>

                      <p className="break-all text-sm text-muted-foreground">
                        {account.email}
                      </p>

                      <p className="mt-2 text-xs text-muted-foreground">
                        {account.permissions?.length ?? 0} permissions
                      </p>
                    </div>

                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
                        isAccountActive(account)
                          ? "bg-emerald-500/10 text-emerald-600"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {isAccountActive(account)
                        ? "Active"
                        : "Inactive"}
                    </span>
                  </div>

                  <div className="mt-3 border-t border-border pt-3 text-xs text-muted-foreground">
                    Created {formatDate(account.createdAt)}
                  </div>
                </article>
              ))}
            </div>

            {/* Desktop account table */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[700px] text-left text-sm">
                <thead className="bg-muted/30 text-muted-foreground">
                  <tr>
                    <th className="px-5 py-3 font-medium">
                      SubAdmin
                    </th>
                    <th className="px-5 py-3 font-medium">
                      Role
                    </th>
                    <th className="px-5 py-3 font-medium">
                      Permissions
                    </th>
                    <th className="px-5 py-3 font-medium">
                      Status
                    </th>
                    <th className="px-5 py-3 font-medium">
                      Created
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-border">
                  {filteredAccounts.map((account) => (
                    <tr
                      key={account._id}
                      className="transition-colors hover:bg-muted/20"
                    >
                      <td className="px-5 py-4">
                        <p className="font-medium">
                          {getDisplayName(account)}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {account.email}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        {account.role}
                      </td>

                      <td className="px-5 py-4">
                        {account.permissions?.length ?? 0}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                            isAccountActive(account)
                              ? "bg-emerald-500/10 text-emerald-600"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {isAccountActive(account)
                            ? "Active"
                            : "Inactive"}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-muted-foreground">
                        {formatDate(account.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : null}

        {!loading &&
          !loadError &&
          filteredAccounts.length > 0 && (
            <div className="border-t border-border px-4 py-3 text-xs text-muted-foreground">
              Showing {filteredAccounts.length} of {accounts.length} accounts
            </div>
          )}
      </section>
    </div>
  );
};

export default AdminSubAdminsPage;
