
import {
  Search,
  Plus,
  MoreHorizontal,
  Pencil,
  Trash2,
  Eye,
  Users,
  UserCheck,
  UserX,
  ShieldCheck,
  GraduationCap,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  Clock3,
  Ban,
  Loader2,
  RefreshCw,
  X,
} from 'lucide-react';

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FormEvent,
} from 'react';

import { useNavigate } from 'react-router-dom';
import { isAxiosError } from 'axios';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import {
  Card,
  CardContent,
} from '@/components/ui/card';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  deleteUser,
  getUsers,
  updateSubAdmin,
  updateUser,
  type AdminUser,
  type GetUsersParams,
  type UpdateUserPayload,
  type UserRole,
  type UserStatus,
  type UsersPagination,
} from '@/api/users.api';

/* ============================================ */
/* TYPES */
/* ============================================ */

interface UserFormState {
  firstName: string;
  lastName: string;
  status: UserStatus;
}

interface UserStats {
  total: number;
  active: number;
  pending: number;
  suspended: number;
  admins: number;
  subAdmins: number;
  instructors: number;
  students: number;
}

const ITEMS_PER_PAGE = 8;

const EMPTY_STATS: UserStats = {
  total: 0,
  active: 0,
  pending: 0,
  suspended: 0,
  admins: 0,
  subAdmins: 0,
  instructors: 0,
  students: 0,
};

/* ============================================ */
/* HELPERS */
/* ============================================ */

function getUserId(user: AdminUser): string {
  return user._id || user.id || '';
}

function getCourseCount(user: AdminUser): number {
  if (typeof user.coursesCount === 'number') {
    return user.coursesCount;
  }

  if (typeof user.enrolledCoursesCount === 'number') {
    return user.enrolledCoursesCount;
  }

  return Array.isArray(user.courses)
    ? user.courses.length
    : 0;
}

function formatDate(value?: string): string {
  if (!value) return '—';

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '—';
  }

  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });
}

function formatLastLogin(user: AdminUser): string {
  const value = user.lastLoginAt || user.lastLogin;

  if (!value) return 'Not available';

  if (value.toLowerCase() === 'never') {
    return 'Never';
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    // Some backends may provide a display string instead
    // of a timestamp, such as "Yesterday".
    return value;
  }

  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  });
}

function getErrorMessage(error: unknown): string {
  if (isAxiosError<{ message?: string; error?: { message?: string } }>(error)) {
    return (
      error.response?.data?.message ||
      error.response?.data?.error?.message ||
      error.message ||
      'The request failed. Please try again.'
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Something went wrong. Please try again.';
}

function readTotal(pagination: UsersPagination): number | null {
  if (typeof pagination.totalResults === 'number') {
    return pagination.totalResults;
  }

  if (typeof pagination.total === 'number') {
    return pagination.total;
  }

  // A one-item query makes totalPages an exact total
  // when the backend uses standard pagination.
  if (
    pagination.limit === 1 &&
    typeof pagination.totalPages === 'number'
  ) {
    return pagination.totalPages;
  }

  return null;
}

function getInitials(
  firstName: string,
  lastName: string,
): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

function getStatusClasses(status: UserStatus): string {
  if (status === 'Active') {
    return 'bg-green-500/10 text-green-600';
  }

  if (status === 'Pending') {
    return 'bg-yellow-500/10 text-yellow-600';
  }

  return 'bg-red-500/10 text-red-500';
}

function getRoleClasses(role: UserRole): string {
  if (role === 'Admin') {
    return 'bg-purple-500/10 text-purple-600';
  }

  if (role === 'SubAdmin') {
    return 'bg-violet-500/10 text-violet-600';
  }

  if (role === 'Instructor') {
    return 'bg-blue-500/10 text-blue-600';
  }

  return 'bg-primary/10 text-primary';
}

function getStatusIcon(status: UserStatus) {
  if (status === 'Active') return CheckCircle2;
  if (status === 'Pending') return Clock3;
  return Ban;
}

function normalizeRole(value: string): UserRole | null {
  if (
    value === 'Admin' ||
    value === 'SubAdmin' ||
    value === 'Instructor' ||
    value === 'Student'
  ) {
    return value;
  }

  return null;
}

function normalizeStatus(value: string): UserStatus | null {
  if (
    value === 'Active' ||
    value === 'Pending' ||
    value === 'Suspended'
  ) {
    return value;
  }

  return null;
}

/* ============================================ */
/* COMPONENT */
/* ============================================ */

const UsersPage = () => {
  const navigate = useNavigate();

  /* ============================================ */
  /* STATE */
/* ============================================ */

  const [users, setUsers] = useState<AdminUser[]>([]);
  const [pagination, setPagination] = useState<UsersPagination>({});
  const [stats, setStats] = useState<UserStats>(EMPTY_STATS);

  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [pageError, setPageError] = useState('');
  const [actionError, setActionError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [editForm, setEditForm] = useState<UserFormState>({
    firstName: '',
    lastName: '',
    status: 'Active',
  });

  /* ============================================ */
  /* SERVER-SIDE FILTERS */
/* ============================================ */

  const queryParams = useMemo<GetUsersParams>(() => {
    const params: GetUsersParams = {
      page: currentPage,
      limit: ITEMS_PER_PAGE,
      sort: '-createdAt',
    };

    const trimmedSearch = search.trim();

    if (trimmedSearch) {
      params.search = trimmedSearch;
    }

    const role = normalizeRole(roleFilter);

    if (role) {
      params.role = role;
    }

    const status = normalizeStatus(statusFilter);

    if (status) {
      params.status = status;
    }

    return params;
  }, [currentPage, search, roleFilter, statusFilter]);

  /* ============================================ */
  /* FETCH USERS */
/* ============================================ */

  const fetchUsers = useCallback(
    async (showRefresh = false) => {
      if (showRefresh) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }

      setPageError('');
      setActionError('');

      try {
        const response = await getUsers(queryParams);
        const fetchedUsers = response.data.users || [];

        setUsers(fetchedUsers);
        setPagination(response.pagination || {});

        const serverTotal = readTotal(response.pagination || {});
        if (serverTotal !== null) {
          setStats((previous) => ({
            ...previous,
            total: serverTotal,
          }));
        }
      } catch (error: unknown) {
        setPageError(getErrorMessage(error));
        setUsers([]);
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    },
    [queryParams],
  );

  useEffect(() => {
    void fetchUsers();
  }, [fetchUsers]);

  /* ============================================ */
  /* FETCH GLOBAL STATISTICS */
/* ============================================ */

  const fetchStats = useCallback(async () => {
    try {
      const queries = [
        getUsers({ page: 1, limit: 1 }),
        getUsers({ page: 1, limit: 1, status: 'Active' }),
        getUsers({ page: 1, limit: 1, status: 'Pending' }),
        getUsers({ page: 1, limit: 1, status: 'Suspended' }),
        getUsers({ page: 1, limit: 1, role: 'Admin' }),
        getUsers({ page: 1, limit: 1, role: 'SubAdmin' }),
        getUsers({ page: 1, limit: 1, role: 'Instructor' }),
        getUsers({ page: 1, limit: 1, role: 'Student' }),
      ] as const;

      const results = await Promise.all(queries);

      const totals = results.map((result) =>
        readTotal(result.pagination || {}),
      );

      // Avoid displaying misleading statistics if the backend
      // doesn't provide count metadata for these queries.
      if (totals.some((total) => total === null)) {
        return;
      }

      setStats({
        total: totals[0] ?? 0,
        active: totals[1] ?? 0,
        pending: totals[2] ?? 0,
        suspended: totals[3] ?? 0,
        admins: totals[4] ?? 0,
        subAdmins: totals[5] ?? 0,
        instructors: totals[6] ?? 0,
        students: totals[7] ?? 0,
      });
    } catch {
      // The table still works if statistics are unavailable.
    }
  }, []);

  useEffect(() => {
    void fetchStats();
  }, [fetchStats]);

  /* ============================================ */
  /* PAGINATION */
/* ============================================ */

  const serverTotal = readTotal(pagination);

  const totalPages = Math.max(
    1,
    typeof pagination.totalPages === 'number'
      ? pagination.totalPages
      : serverTotal !== null
        ? Math.ceil(serverTotal / ITEMS_PER_PAGE)
        : users.length < ITEMS_PER_PAGE
          ? currentPage
          : currentPage + 1,
  );

  const safeCurrentPage = currentPage;

  const startItem =
    users.length === 0
      ? 0
      : (safeCurrentPage - 1) * ITEMS_PER_PAGE + 1;

  const endItem =
    users.length === 0
      ? 0
      : (safeCurrentPage - 1) * ITEMS_PER_PAGE + users.length;

  /* ============================================ */
  /* FILTER HANDLERS */
/* ============================================ */

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleRoleChange = (value: string) => {
    setRoleFilter(value);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((page) => Math.max(1, page - 1));
  };

  const handleNextPage = () => {
    if (typeof pagination.totalPages === 'number') {
      setCurrentPage((page) =>
        Math.min(pagination.totalPages ?? page + 1, page + 1),
      );
      return;
    }

    if (serverTotal !== null) {
      const pages = Math.max(1, Math.ceil(serverTotal / ITEMS_PER_PAGE));
      setCurrentPage((page) => Math.min(pages, page + 1));
      return;
    }

    if (users.length === ITEMS_PER_PAGE) {
      setCurrentPage((page) => page + 1);
    }
  };

  /* ============================================ */
  /* EDIT USER */
/* ============================================ */

  const openEditUser = (user: AdminUser) => {
    setEditingUser(user);
    setEditForm({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      status: user.status,
    });
    setActionError('');
    setSuccessMessage('');
  };

  const closeEditUser = () => {
    if (isSaving) return;

    setEditingUser(null);
    setActionError('');
  };

  const handleEditSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!editingUser) return;

    const id = getUserId(editingUser);

    if (!id) {
      setActionError('This user does not have a valid ID.');
      return;
    }

    const firstName = editForm.firstName.trim();
    const lastName = editForm.lastName.trim();

    if (!firstName || !lastName) {
      setActionError('First name and last name are required.');
      return;
    }

    if (
      editingUser.role === 'SubAdmin' &&
      editForm.status === 'Pending'
    ) {
      setActionError('Sub Admins can only be Active or Suspended.');
      return;
    }

    const payload: UpdateUserPayload = {
      firstName,
      lastName,
      status: editForm.status,
    };

    setIsSaving(true);
    setActionError('');
    setSuccessMessage('');

    try {
      const updatedUser =
        editingUser.role === 'SubAdmin'
          ? await updateSubAdmin(id, payload)
          : await updateUser(id, payload);

      setUsers((currentUsers) =>
        currentUsers.map((user) =>
          getUserId(user) === id ? updatedUser : user,
        ),
      );

      setEditingUser(null);
      setSuccessMessage('User updated successfully.');

      await Promise.all([fetchUsers(true), fetchStats()]);
    } catch (error: unknown) {
      setActionError(getErrorMessage(error));
    } finally {
      setIsSaving(false);
    }
  };

  /* ============================================ */
  /* STATUS UPDATE */
/* ============================================ */

  const handleStatusChange = async (
    user: AdminUser,
    newStatus: UserStatus,
  ) => {
    const id = getUserId(user);

    if (!id) {
      setActionError('This user does not have a valid ID.');
      return;
    }

    if (
      user.role === 'SubAdmin' &&
      newStatus === 'Pending'
    ) {
      setActionError('Sub Admins can only be Active or Suspended.');
      return;
    }

    setActionError('');
    setSuccessMessage('');

    try {
      const payload: UpdateUserPayload = {
        status: newStatus,
      };

      const updatedUser =
        user.role === 'SubAdmin'
          ? await updateSubAdmin(id, payload)
          : await updateUser(id, payload);

      setUsers((currentUsers) =>
        currentUsers.map((item) =>
          getUserId(item) === id ? updatedUser : item,
        ),
      );

      setSuccessMessage(
        `${user.firstName} ${user.lastName} is now ${newStatus}.`,
      );

      await Promise.all([fetchUsers(true), fetchStats()]);
    } catch (error: unknown) {
      setActionError(getErrorMessage(error));
    }
  };

  /* ============================================ */
  /* DELETE USER */
/* ============================================ */

  const handleDeleteUser = async (user: AdminUser) => {
    const id = getUserId(user);

    if (!id) {
      setActionError('This user does not have a valid ID.');
      return;
    }

    if (user.role === 'Admin') {
      setActionError(
        'Admin accounts cannot be deleted through user management.',
      );
      return;
    }

    const confirmed = window.confirm(
      `Delete ${user.firstName} ${user.lastName} (${user.email})? This action cannot be undone.`,
    );

    if (!confirmed) return;

    setActionError('');
    setSuccessMessage('');

    try {
      await deleteUser(id);

      // If the last row on this page was removed, go back a page
      // instead of leaving the user on an empty page.
      if (users.length === 1 && currentPage > 1) {
        setCurrentPage((page) => Math.max(1, page - 1));
      } else {
        await fetchUsers(true);
      }

      await fetchStats();
      setSuccessMessage('User deleted successfully.');
    } catch (error: unknown) {
      setActionError(getErrorMessage(error));
    }
  };

  /* ============================================ */
  /* VIEW USER */
/* ============================================ */

  const handleViewUser = (user: AdminUser) => {
    const id = getUserId(user);

    if (!id) {
      setActionError('This user does not have a valid ID.');
      return;
    }

    navigate(`/admin/users/${encodeURIComponent(id)}`);
  };

  /* ============================================ */
  /* ADD USER */
/* ============================================ */

  const handleAddUser = () => {
    setActionError(
      'Creating general users is not available yet. Your current backend supports creating Sub Admins from the dedicated Sub Admin management page.',
    );
  };

  /* ============================================ */
  /* STATUS AND ROLE ICONS */
/* ============================================ */

  const visibleUsers = useMemo(() => users, [users]);

  /* ============================================ */
  /* RENDER */
/* ============================================ */

  return (
    <div className="space-y-6">
      {/* HEADER */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Users</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage students, instructors, administrators, and Sub Admins.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <Button
            variant="outline"
            onClick={() => {
              void fetchUsers(true);
              void fetchStats();
            }}
            disabled={isLoading || isRefreshing}
            className="rounded-xl"
          >
            <RefreshCw
              className={`mr-2 h-4 w-4 ${
                isRefreshing ? 'animate-spin' : ''
              }`}
            />
            Refresh
          </Button>

          <Button
            onClick={handleAddUser}
            className="rounded-xl"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>
      </div>

      {/* NOTICES */}

      {pageError && (
        <div className="flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/5 p-4">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold">Unable to load users</p>
            <p className="mt-1 break-words text-sm text-muted-foreground">
              {pageError}
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-3 rounded-lg"
              onClick={() => void fetchUsers(true)}
            >
              Try again
            </Button>
          </div>
        </div>
      )}

      {actionError && (
        <div className="flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/5 p-4">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
          <p className="flex-1 break-words text-sm">{actionError}</p>
          <button
            type="button"
            aria-label="Dismiss error"
            onClick={() => setActionError('')}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {successMessage && (
        <div className="flex items-center gap-3 rounded-xl border border-green-500/30 bg-green-500/5 p-4">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600" />
          <p className="flex-1 text-sm text-green-700 dark:text-green-400">
            {successMessage}
          </p>
          <button
            type="button"
            aria-label="Dismiss success message"
            onClick={() => setSuccessMessage('')}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* PRIMARY STATISTICS */}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-xl">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Users
                </p>
                <p className="mt-2 text-2xl font-bold">
                  {isLoading && stats.total === 0 ? '—' : stats.total}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  All registered users
                </p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Users className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Active Users
                </p>
                <p className="mt-2 text-2xl font-bold">
                  {isLoading && stats.total === 0 ? '—' : stats.active}
                </p>
                <p className="mt-1 text-xs text-green-600">
                  Approved users
                </p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-500/10 text-green-600">
                <UserCheck className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Pending
                </p>
                <p className="mt-2 text-2xl font-bold">
                  {isLoading && stats.total === 0 ? '—' : stats.pending}
                </p>
                <p className="mt-1 text-xs text-yellow-600">
                  Waiting for approval
                </p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-600">
                <Clock3 className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Suspended
                </p>
                <p className="mt-2 text-2xl font-bold">
                  {isLoading && stats.total === 0 ? '—' : stats.suspended}
                </p>
                <p className="mt-1 text-xs text-red-500">
                  Suspended accounts
                </p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
                <UserX className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ROLE STATISTICS */}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-xl">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Admins</p>
                <p className="text-lg font-bold">
                  {stats.admins}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Sub Admins</p>
                <p className="text-lg font-bold">
                  {stats.subAdmins}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Instructors</p>
                <p className="text-lg font-bold">
                  {stats.instructors}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Students</p>
                <p className="text-lg font-bold">
                  {stats.students}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* FILTERS */}

      <Card className="rounded-xl">
        <CardContent className="p-4">
          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(event) => handleSearchChange(event.target.value)}
                placeholder="Search users by name or email..."
                className="h-10 rounded-xl pl-9"
              />
            </div>

            <Select value={roleFilter} onValueChange={handleRoleChange}>
              <SelectTrigger className="h-10 w-full rounded-xl lg:w-[180px]">
                <SelectValue placeholder="All Roles" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="SubAdmin">Sub Admin</SelectItem>
                <SelectItem value="Instructor">Instructor</SelectItem>
                <SelectItem value="Student">Student</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={statusFilter}
              onValueChange={handleStatusFilterChange}
            >
              <SelectTrigger className="h-10 w-full rounded-xl lg:w-[180px]">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* USERS TABLE */}

      <Card className="overflow-hidden rounded-xl">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px]">
            <thead>
              <tr className="border-b bg-muted/30">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  User
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Courses
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Joined
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Last Login
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center">
                      <Loader2 className="h-7 w-7 animate-spin text-primary" />
                      <p className="mt-3 text-sm text-muted-foreground">
                        Loading users...
                      </p>
                    </div>
                  </td>
                </tr>
              ) : visibleUsers.length > 0 ? (
                visibleUsers.map((user) => {
                  const id = getUserId(user);
                  const StatusIcon = getStatusIcon(user.status);

                  return (
                    <tr
                      key={id}
                      className="transition hover:bg-muted/20"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {user.profilePicture ? (
                            <img
                              src={user.profilePicture}
                              alt={`${user.firstName} ${user.lastName}`}
                              className="h-10 w-10 shrink-0 rounded-xl object-cover"
                            />
                          ) : (
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-semibold text-primary">
                              {getInitials(user.firstName, user.lastName)}
                            </div>
                          )}

                          <div className="min-w-0">
                            <button
                              type="button"
                              onClick={() => handleViewUser(user)}
                              className="block max-w-[220px] truncate text-left text-sm font-semibold hover:text-primary"
                            >
                              {user.firstName} {user.lastName}
                            </button>
                            <p className="mt-0.5 max-w-[220px] truncate text-xs text-muted-foreground">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getRoleClasses(user.role)}`}
                        >
                          {user.role === 'SubAdmin' ? 'Sub Admin' : user.role}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(user.status)}`}
                        >
                          <StatusIcon className="h-3.5 w-3.5" />
                          {user.status}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-sm font-medium">
                          {getCourseCount(user)}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-sm text-muted-foreground">
                          {formatDate(user.createdAt)}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-sm text-muted-foreground">
                          {formatLastLogin(user)}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="rounded-lg"
                              aria-label={`Actions for ${user.firstName} ${user.lastName}`}
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent align="end" className="w-52">
                            <DropdownMenuItem
                              onClick={() => handleViewUser(user)}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View User
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              onClick={() => openEditUser(user)}
                            >
                              <Pencil className="mr-2 h-4 w-4" />
                              Edit User
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            {user.status !== 'Pending' &&
                              user.role !== 'SubAdmin' && (
                                <DropdownMenuItem
                                  onClick={() =>
                                    void handleStatusChange(user, 'Pending')
                                  }
                                >
                                  <Clock3 className="mr-2 h-4 w-4 text-yellow-600" />
                                  Set Pending
                                </DropdownMenuItem>
                              )}

                            {user.status !== 'Active' && (
                              <DropdownMenuItem
                                onClick={() =>
                                  void handleStatusChange(user, 'Active')
                                }
                              >
                                <CheckCircle2 className="mr-2 h-4 w-4 text-green-600" />
                                Set Active
                              </DropdownMenuItem>
                            )}

                            {user.status !== 'Suspended' && (
                              <DropdownMenuItem
                                onClick={() =>
                                  void handleStatusChange(user, 'Suspended')
                                }
                                className="text-red-500 focus:text-red-500"
                              >
                                <Ban className="mr-2 h-4 w-4" />
                                Suspend User
                              </DropdownMenuItem>
                            )}

                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                              disabled={user.role === 'Admin'}
                              onClick={() => void handleDeleteUser(user)}
                              className="text-red-500 focus:text-red-500"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="rounded-full bg-muted p-4">
                        <Users className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <h3 className="mt-4 text-sm font-semibold">
                        No users found
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Try changing your search or filters.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* PAGINATION */}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Showing{' '}
          <span className="font-medium text-foreground">{startItem}</span>
          {' '}to{' '}
          <span className="font-medium text-foreground">{endItem}</span>
          {' '}of{' '}
          <span className="font-medium text-foreground">
            {serverTotal ?? '—'}
          </span>
          {' '}users
        </p>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePreviousPage}
            disabled={safeCurrentPage <= 1 || isLoading}
            className="rounded-xl"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Previous
          </Button>

          <div className="flex h-9 min-w-9 items-center justify-center rounded-xl border px-3 text-sm font-medium">
            {safeCurrentPage}
          </div>

          <span className="text-sm text-muted-foreground">
            of {totalPages}
          </span>

          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={
              isLoading ||
              (typeof pagination.totalPages === 'number'
                ? currentPage >= pagination.totalPages
                : serverTotal !== null
                  ? currentPage >= Math.ceil(serverTotal / ITEMS_PER_PAGE)
                  : users.length < ITEMS_PER_PAGE)
            }
            className="rounded-xl"
          >
            Next
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* ADMIN NOTE */}

      <div className="flex items-start gap-3 rounded-xl border bg-muted/20 p-4">
        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
        <div>
          <p className="text-sm font-medium">User management</p>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            User records, filters, and status changes are loaded from the
            backend. General user updates support names and account status.
            Sub Admin status changes use the dedicated Sub Admin endpoint.
            Course counts and last-login details depend on fields returned by
            the backend.
          </p>
        </div>
      </div>

      {/* EDIT USER DIALOG */}

      {editingUser && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeEditUser();
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-user-title"
            className="w-full max-w-lg rounded-2xl border bg-background p-6 shadow-xl"
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2 id="edit-user-title" className="text-lg font-semibold">
                  Edit User
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Update account details for {editingUser.email}.
                </p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                disabled={isSaving}
                onClick={closeEditUser}
                aria-label="Close edit form"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {actionError && (
              <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/5 p-3 text-sm text-red-600">
                {actionError}
              </div>
            )}

            <form onSubmit={(event) => void handleEditSubmit(event)} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="edit-first-name" className="text-sm font-medium">
                    First name
                  </label>
                  <Input
                    id="edit-first-name"
                    value={editForm.firstName}
                    onChange={(event) =>
                      setEditForm((current) => ({
                        ...current,
                        firstName: event.target.value,
                      }))
                    }
                    required
                    maxLength={100}
                    disabled={isSaving}
                    className="rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="edit-last-name" className="text-sm font-medium">
                    Last name
                  </label>
                  <Input
                    id="edit-last-name"
                    value={editForm.lastName}
                    onChange={(event) =>
                      setEditForm((current) => ({
                        ...current,
                        lastName: event.target.value,
                      }))
                    }
                    required
                    maxLength={100}
                    disabled={isSaving}
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="edit-email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="edit-email"
                  value={editingUser.email}
                  readOnly
                  disabled
                  className="rounded-xl"
                />
                <p className="text-xs text-muted-foreground">
                  Email and role cannot be changed through this form.
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="edit-status">
                  Account status
                </label>
                <Select
                  value={editForm.status}
                  onValueChange={(value) => {
                    const status = normalizeStatus(value);
                    if (status) {
                      setEditForm((current) => ({
                        ...current,
                        status,
                      }));
                    }
                  }}
                  disabled={isSaving}
                >
                  <SelectTrigger id="edit-status" className="rounded-xl">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    {editingUser.role !== 'SubAdmin' && (
                      <SelectItem value="Pending">Pending</SelectItem>
                    )}
                    <SelectItem value="Suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-xl"
                  onClick={closeEditUser}
                  disabled={isSaving}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="rounded-xl"
                  disabled={isSaving}
                >
                  {isSaving && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
