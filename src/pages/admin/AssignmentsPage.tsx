
import {
  Search,
  Plus,
  MoreHorizontal,
  Pencil,
  Trash2,
  Eye,
  BookOpen,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
  FileText,
  CalendarDays,
  Clock3,
  AlertCircle,
  LoaderCircle,
} from 'lucide-react';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import assignmentsApi, {
  type Assignment,
  type AssignmentStatus,
  type AssignmentReference,
  type AssignmentPagination,
} from '@/api/assignments.api';

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

const ITEMS_PER_PAGE = 8;

const AssignmentsPage = () => {
  const navigate = useNavigate();

  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  /*
   * HELPERS
   */

  const getErrorMessage = (error: unknown): string => {
    if (typeof error === 'object' && error !== null) {
      const root = error as {
        response?: {
          data?: {
            message?: string;
          };
        };
        message?: string;
      };

      if (root.response?.data?.message) {
        return root.response.data.message;
      }

      if (root.message) {
        return root.message;
      }
    }

    return 'Something went wrong.';
  };

  const getReferenceLabel = (
    value: string | AssignmentReference | null | undefined,
  ): string => {
    if (!value) return 'Unassigned';

    if (typeof value === 'string') {
      return value;
    }

    return value.title || value.name || value._id || 'Unassigned';
  };

  const getStatusClasses = (status: AssignmentStatus) => {
    switch (status) {
      case 'Published':
        return 'bg-green-500/10 text-green-600';

      case 'Closed':
        return 'bg-red-500/10 text-red-600';

      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const formatDate = (value?: string | null): string => {
    if (!value) return 'No deadline';

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return 'Invalid date';
    }

    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  /*
   * FETCH ASSIGNMENTS
   */

  const fetchAssignments = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const response = await assignmentsApi.getAssignments({
        page: currentPage,
        limit: ITEMS_PER_PAGE,
        sort: '-createdAt',
        ...(search.trim() ? { search: search.trim() } : {}),
        ...(statusFilter !== 'all'
          ? { status: statusFilter as AssignmentStatus }
          : {}),
      });

      const rows = response.assignments;
      const pagination: AssignmentPagination = response.pagination ?? {};

      const total =
        pagination.totalResults ??
        pagination.total ??
        rows.length;

      const pages =
        pagination.totalPages ??
        Math.max(1, Math.ceil(total / ITEMS_PER_PAGE));

      setAssignments(rows);
      setTotalItems(total);
      setTotalPages(Math.max(1, pages));
    } catch (err: unknown) {
      setError(getErrorMessage(err));
      setAssignments([]);
      setTotalItems(0);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, [currentPage, search, statusFilter]);

  useEffect(() => {
    void fetchAssignments();
  }, [fetchAssignments]);

  /*
   * SERVER-SIDE FILTERING
   *
   * Search and status are sent to the backend.
   * Do not filter the current page again in the frontend.
   */

  const filteredAssignments = useMemo(
    () => assignments,
    [assignments],
  );

  /*
   * STATISTICS
   *
   * These counts describe the currently loaded page.
   * For global counts across every page, add a backend
   * statistics endpoint.
   */

  const publishedAssignments = assignments.filter(
    (assignment) => assignment.status === 'Published',
  ).length;

  const draftAssignments = assignments.filter(
    (assignment) => assignment.status === 'Draft',
  ).length;

  const closedAssignments = assignments.filter(
    (assignment) => assignment.status === 'Closed',
  ).length;

  /*
   * HANDLERS
   */

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearch('');
    setStatusFilter('all');
    setCurrentPage(1);
  };

  const handleAddAssignment = () => {
    navigate('/admin/assignments/new');
  };

  const handleView = (id: string) => {
    navigate(`/admin/assignments/${id}`);
  };

  const handleEdit = (id: string) => {
    navigate(`/admin/assignments/${id}/edit`);
  };

  const handleDelete = async (assignment: Assignment) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${assignment.title}"?`,
    );

    if (!confirmed) return;

    setDeletingId(assignment._id);

    try {
      await assignmentsApi.deleteAssignment(assignment._id);

      toast.success('Assignment deleted successfully');

      if (assignments.length === 1 && currentPage > 1) {
        setCurrentPage((page) => Math.max(1, page - 1));
      } else {
        await fetchAssignments();
      }
    } catch (err: unknown) {
      toast.error('Failed to delete assignment', {
        description: getErrorMessage(err),
      });
    } finally {
      setDeletingId(null);
    }
  };

  /*
   * PAGINATION
   */

  const safeCurrentPage = Math.min(currentPage, totalPages);

  /*
   * RENDER
   */

  return (
    <div className="space-y-6">
      {/* HEADER */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Assignments
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Create assignments, manage deadlines, and review student work.
          </p>
        </div>

        <Button
          onClick={handleAddAssignment}
          className="rounded-xl"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Assignment
        </Button>
      </div>

      {/* STATISTICS */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Total Assignments
                </p>
                <p className="mt-1 text-2xl font-bold">
                  {totalItems.toLocaleString()}
                </p>
              </div>

              <div className="rounded-xl bg-primary/10 p-3 text-primary">
                <FileText className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Published
                </p>
                <p className="mt-1 text-2xl font-bold">
                  {publishedAssignments}
                </p>
              </div>

              <div className="rounded-xl bg-green-500/10 p-3 text-green-600">
                <CheckCircle2 className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Drafts
                </p>
                <p className="mt-1 text-2xl font-bold">
                  {draftAssignments}
                </p>
              </div>

              <div className="rounded-xl bg-muted p-3 text-muted-foreground">
                <Clock3 className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Closed
                </p>
                <p className="mt-1 text-2xl font-bold">
                  {closedAssignments}
                </p>
              </div>

              <div className="rounded-xl bg-red-500/10 p-3 text-red-600">
                <XCircle className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* FILTERS */}

      <Card>
        <CardContent className="p-4">
          <div className="grid gap-3 md:grid-cols-[1fr_200px_auto]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                value={search}
                onChange={(event) =>
                  handleSearchChange(event.target.value)
                }
                placeholder="Search assignments..."
                className="rounded-xl pl-9"
              />
            </div>

            <Select
              value={statusFilter}
              onValueChange={handleStatusChange}
            >
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Status" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Published">Published</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>

            {(search || statusFilter !== 'all') && (
              <Button
                variant="outline"
                onClick={clearFilters}
                className="rounded-xl"
              >
                Clear Filters
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* ASSIGNMENT TABLE */}

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px]">
            <thead className="border-b bg-muted/30">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Assignment
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Course
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Due Date
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Max Score
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center">
                    <LoaderCircle className="mx-auto h-8 w-8 animate-spin text-primary" />
                    <p className="mt-3 text-sm text-muted-foreground">
                      Loading assignments...
                    </p>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center">
                    <AlertCircle className="mx-auto h-8 w-8 text-red-500" />

                    <p className="mt-3 font-semibold">
                      Could not load assignments
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {error}
                    </p>

                    <Button
                      variant="outline"
                      className="mt-4 rounded-xl"
                      onClick={() => void fetchAssignments()}
                    >
                      Try Again
                    </Button>
                  </td>
                </tr>
              ) : filteredAssignments.length > 0 ? (
                filteredAssignments.map((assignment) => (
                  <tr
                    key={assignment._id}
                    className="transition hover:bg-muted/20"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                          <FileText className="h-5 w-5" />
                        </div>

                        <div className="min-w-0">
                          <p className="max-w-[280px] truncate font-semibold">
                            {assignment.title}
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            Created {formatDate(assignment.createdAt)}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm">
                        <BookOpen className="h-4 w-4 shrink-0 text-muted-foreground" />
                        <span className="max-w-[180px] truncate">
                          {getReferenceLabel(assignment.courseId)}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CalendarDays className="h-4 w-4 shrink-0" />
                        {formatDate(assignment.dueDate)}
                      </div>
                    </td>

                    <td className="px-6 py-4 text-center">
                      <span className="font-semibold">
                        {assignment.maxScore ?? 100}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
                          assignment.status,
                        )}`}
                      >
                        {assignment.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-lg"
                            aria-label={`Actions for ${assignment.title}`}
                          >
                            <MoreHorizontal className="h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem
                            onClick={() => handleView(assignment._id)}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Assignment
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            onClick={() => handleEdit(assignment._id)}
                          >
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit Assignment
                          </DropdownMenuItem>

                          <DropdownMenuSeparator />

                          <DropdownMenuItem
                            disabled={deletingId === assignment._id}
                            onClick={() => void handleDelete(assignment)}
                            className="text-red-500 focus:text-red-500"
                          >
                            {deletingId === assignment._id ? (
                              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="mr-2 h-4 w-4" />
                            )}
                            Delete Assignment
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center">
                    <div className="mx-auto flex max-w-sm flex-col items-center">
                      <div className="rounded-full bg-muted p-4">
                        <FileText className="h-6 w-6 text-muted-foreground" />
                      </div>

                      <h3 className="mt-4 font-semibold">
                        No assignments found
                      </h3>

                      <p className="mt-1 text-sm text-muted-foreground">
                        Try adjusting your search or create an assignment.
                      </p>

                      <Button
                        className="mt-4 rounded-xl"
                        onClick={handleAddAssignment}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Create Assignment
                      </Button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}

        <div className="flex flex-col gap-3 border-t px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Showing{' '}
            <span className="font-medium text-foreground">
              {totalItems === 0
                ? 0
                : (safeCurrentPage - 1) * ITEMS_PER_PAGE + 1}
            </span>{' '}
            to{' '}
            <span className="font-medium text-foreground">
              {Math.min(safeCurrentPage * ITEMS_PER_PAGE, totalItems)}
            </span>{' '}
            of{' '}
            <span className="font-medium text-foreground">
              {totalItems}
            </span>{' '}
            assignments
          </p>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              disabled={safeCurrentPage <= 1 || loading}
              onClick={() =>
                setCurrentPage((page) => Math.max(1, page - 1))
              }
              className="rounded-lg"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <span className="min-w-20 text-center text-sm">
              Page {safeCurrentPage} of {totalPages}
            </span>

            <Button
              variant="outline"
              size="icon"
              disabled={safeCurrentPage >= totalPages || loading}
              onClick={() =>
                setCurrentPage((page) =>
                  Math.min(totalPages, page + 1),
                )
              }
              className="rounded-lg"
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AssignmentsPage;
