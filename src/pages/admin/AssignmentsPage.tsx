import {
  Search,
  Plus,
  MoreHorizontal,
  Pencil,
  Trash2,
  Eye,
  FileText,
  BookOpen,
  CheckCircle2,
  XCircle,
  Clock3,
  Users,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  ClipboardCheck,
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

type AssignmentStatus =
  | "Published"
  | "Draft"
  | "Closed";

interface Assignment {
  id: string;
  title: string;
  courseId: string;
  course: string;
  instructor: string;
  submissions: number;
  students: number;
  dueDate: string;
  status: AssignmentStatus;
  averageScore: number;
  createdAt: string;
}

const assignmentsData: Assignment[] = [
  {
    id: "ass-001",
    title: "Build a REST API",
    courseId: "course-001",
    course: "Full Stack Web Development",
    instructor: "John Doe",
    submissions: 42,
    students: 56,
    dueDate: "September 20, 2026",
    status: "Published",
    averageScore: 84,
    createdAt: "September 01, 2026",
  },
  {
    id: "ass-002",
    title: "UI Dashboard Design",
    courseId: "course-002",
    course: "UI/UX Design Fundamentals",
    instructor: "Sarah Smith",
    submissions: 31,
    students: 40,
    dueDate: "September 18, 2026",
    status: "Published",
    averageScore: 89,
    createdAt: "September 02, 2026",
  },
  {
    id: "ass-003",
    title: "JavaScript ES6 Challenge",
    courseId: "course-003",
    course: "Advanced JavaScript",
    instructor: "Michael Brown",
    submissions: 25,
    students: 32,
    dueDate: "September 15, 2026",
    status: "Closed",
    averageScore: 78,
    createdAt: "August 25, 2026",
  },
  {
    id: "ass-004",
    title: "Database Schema Project",
    courseId: "course-004",
    course: "Database Management",
    instructor: "Daniel Wilson",
    submissions: 18,
    students: 35,
    dueDate: "September 25, 2026",
    status: "Published",
    averageScore: 82,
    createdAt: "September 05, 2026",
  },
  {
    id: "ass-005",
    title: "Marketing Strategy Report",
    courseId: "course-005",
    course: "Digital Marketing",
    instructor: "Hana Alemu",
    submissions: 0,
    students: 28,
    dueDate: "October 05, 2026",
    status: "Draft",
    averageScore: 0,
    createdAt: "September 10, 2026",
  },
  {
    id: "ass-006",
    title: "React Component Architecture",
    courseId: "course-006",
    course: "React Development",
    instructor: "Abebe Kebede",
    submissions: 37,
    students: 45,
    dueDate: "September 22, 2026",
    status: "Published",
    averageScore: 91,
    createdAt: "September 04, 2026",
  },
  {
    id: "ass-007",
    title: "Authentication Implementation",
    courseId: "course-007",
    course: "Node.js Backend Development",
    instructor: "Samuel Tesfaye",
    submissions: 29,
    students: 38,
    dueDate: "September 12, 2026",
    status: "Closed",
    averageScore: 86,
    createdAt: "August 20, 2026",
  },
  {
    id: "ass-008",
    title: "Figma Mobile App Prototype",
    courseId: "course-008",
    course: "Product Design",
    instructor: "Marta Bekele",
    submissions: 12,
    students: 30,
    dueDate: "October 10, 2026",
    status: "Published",
    averageScore: 88,
    createdAt: "September 11, 2026",
  },
  {
    id: "ass-009",
    title: "MongoDB Data Modeling",
    courseId: "course-004",
    course: "Database Management",
    instructor: "Daniel Wilson",
    submissions: 21,
    students: 35,
    dueDate: "September 28, 2026",
    status: "Published",
    averageScore: 80,
    createdAt: "September 08, 2026",
  },
  {
    id: "ass-010",
    title: "Responsive Web Layout",
    courseId: "course-001",
    course: "Full Stack Web Development",
    instructor: "John Doe",
    submissions: 48,
    students: 56,
    dueDate: "September 16, 2026",
    status: "Closed",
    averageScore: 87,
    createdAt: "August 28, 2026",
  },
  {
    id: "ass-011",
    title: "Brand Identity Project",
    courseId: "course-008",
    course: "Product Design",
    instructor: "Marta Bekele",
    submissions: 16,
    students: 30,
    dueDate: "October 15, 2026",
    status: "Draft",
    averageScore: 0,
    createdAt: "September 12, 2026",
  },
  {
    id: "ass-012",
    title: "Node.js Authentication API",
    courseId: "course-007",
    course: "Node.js Backend Development",
    instructor: "Samuel Tesfaye",
    submissions: 26,
    students: 38,
    dueDate: "September 30, 2026",
    status: "Published",
    averageScore: 83,
    createdAt: "September 09, 2026",
  },
];

const AssignmentsPage = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState<string>("all");

  const [courseFilter, setCourseFilter] =
    useState<string>("all");

  const [currentPage, setCurrentPage] =
    useState(1);

  const itemsPerPage = 8;

  /*
   * ============================================
   * FILTERING
   * ============================================
   */

  const filteredAssignments = useMemo(() => {
    const searchValue = search
      .toLowerCase()
      .trim();

    return assignmentsData.filter(
      (assignment) => {
        const matchesSearch =
          !searchValue ||
          assignment.title
            .toLowerCase()
            .includes(searchValue) ||
          assignment.course
            .toLowerCase()
            .includes(searchValue) ||
          assignment.instructor
            .toLowerCase()
            .includes(searchValue);

        const matchesStatus =
          statusFilter === "all" ||
          assignment.status === statusFilter;

        const matchesCourse =
          courseFilter === "all" ||
          assignment.course === courseFilter;

        return (
          matchesSearch &&
          matchesStatus &&
          matchesCourse
        );
      }
    );
  }, [
    search,
    statusFilter,
    courseFilter,
  ]);

  /*
   * ============================================
   * PAGINATION
   * ============================================
   */

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredAssignments.length /
        itemsPerPage
    )
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages
  );

  const paginatedAssignments =
    filteredAssignments.slice(
      (safeCurrentPage - 1) *
        itemsPerPage,
      safeCurrentPage * itemsPerPage
    );

  /*
   * ============================================
   * STATISTICS
   * ============================================
   */

  const totalAssignments =
    assignmentsData.length;

  const publishedAssignments =
    assignmentsData.filter(
      (assignment) =>
        assignment.status === "Published"
    ).length;

  const draftAssignments =
    assignmentsData.filter(
      (assignment) =>
        assignment.status === "Draft"
    ).length;

  const closedAssignments =
    assignmentsData.filter(
      (assignment) =>
        assignment.status === "Closed"
    ).length;

  const totalSubmissions =
    assignmentsData.reduce(
      (sum, assignment) =>
        sum + assignment.submissions,
      0
    );

  const totalStudents =
    assignmentsData.reduce(
      (sum, assignment) =>
        sum + assignment.students,
      0
    );

  const gradedAssignments =
    assignmentsData.filter(
      (assignment) =>
        assignment.averageScore > 0
    );

  const averageScore =
    gradedAssignments.length > 0
      ? Math.round(
          gradedAssignments.reduce(
            (sum, assignment) =>
              sum +
              assignment.averageScore,
            0
          ) /
            gradedAssignments.length
        )
      : 0;

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

  const handleCourseChange = (
    value: string
  ) => {
    setCourseFilter(value);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setCourseFilter("all");
    setCurrentPage(1);
  };

  const handleAddAssignment = () => {
    console.log("Add assignment");
  };

  const handleView = (id: string) => {
    console.log("View assignment:", id);
  };

  const handleEdit = (id: string) => {
    console.log("Edit assignment:", id);
  };

  const handleToggleStatus = (
    id: string
  ) => {
    console.log(
      "Toggle assignment status:",
      id
    );
  };

  const handleDelete = (id: string) => {
    console.log(
      "Delete assignment:",
      id
    );
  };

  const handleViewCourse = (
    courseId: string
  ) => {
    navigate(`/admin/courses/${courseId}`);
  };

  /*
   * ============================================
   * STATUS HELPERS
   * ============================================
   */

  const getStatusClasses = (
    status: AssignmentStatus
  ) => {
    if (status === "Published") {
      return "bg-green-500/10 text-green-600";
    }

    if (status === "Draft") {
      return "bg-yellow-500/10 text-yellow-600";
    }

    return "bg-muted text-muted-foreground";
  };

  const getScoreClasses = (
    score: number
  ) => {
    if (score >= 85) {
      return "text-green-600";
    }

    if (score >= 70) {
      return "text-yellow-600";
    }

    return "text-red-500";
  };

  const courses = Array.from(
    new Set(
      assignmentsData.map(
        (assignment) =>
          assignment.course
      )
    )
  );

  return (
    <div className="space-y-6">
      {/* ===================================== */}
      {/* HEADER */}
      {/* ===================================== */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Assignments
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage course assignments,
            submissions, deadlines and
            student performance.
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

      {/* ===================================== */}
      {/* STATISTICS */}
      {/* ===================================== */}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Total Assignments
                </p>

                <p className="mt-1 text-2xl font-bold">
                  {totalAssignments}
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
                  Draft
                </p>

                <p className="mt-1 text-2xl font-bold">
                  {draftAssignments}
                </p>
              </div>

              <div className="rounded-xl bg-yellow-500/10 p-3 text-yellow-600">
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
                  Submissions
                </p>

                <p className="mt-1 text-2xl font-bold">
                  {totalSubmissions.toLocaleString()}
                </p>
              </div>

              <div className="rounded-xl bg-blue-500/10 p-3 text-blue-600">
                <Users className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Average Score
                </p>

                <p className="mt-1 text-2xl font-bold">
                  {averageScore}%
                </p>
              </div>

              <div className="rounded-xl bg-purple-500/10 p-3 text-purple-600">
                <ClipboardCheck className="h-5 w-5" />
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
          <div className="grid gap-3 md:grid-cols-[1fr_200px_240px_auto]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                value={search}
                onChange={(event) =>
                  handleSearchChange(
                    event.target.value
                  )
                }
                placeholder="Search assignments..."
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
                <SelectValue placeholder="Status" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">
                  All Statuses
                </SelectItem>

                <SelectItem value="Published">
                  Published
                </SelectItem>

                <SelectItem value="Draft">
                  Draft
                </SelectItem>

                <SelectItem value="Closed">
                  Closed
                </SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={courseFilter}
              onValueChange={
                handleCourseChange
              }
            >
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Course" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">
                  All Courses
                </SelectItem>

                {courses.map((course) => (
                  <SelectItem
                    key={course}
                    value={course}
                  >
                    {course}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {(search ||
              statusFilter !== "all" ||
              courseFilter !== "all") && (
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

      {/* ===================================== */}
      {/* ASSIGNMENT TABLE */}
      {/* ===================================== */}

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px]">
            <thead className="border-b bg-muted/30">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Assignment
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Course
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Instructor
                </th>

                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Submissions
                </th>

                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Due Date
                </th>

                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Score
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
              {paginatedAssignments.length >
              0 ? (
                paginatedAssignments.map(
                  (assignment) => (
                    <tr
                      key={assignment.id}
                      className="transition hover:bg-muted/20"
                    >
                      {/* Assignment */}

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <FileText className="h-5 w-5" />
                          </div>

                          <div className="min-w-0">
                            <p className="font-semibold">
                              {assignment.title}
                            </p>

                            <p className="mt-1 text-xs text-muted-foreground">
                              {assignment.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Course */}

                      <td className="px-6 py-4">
                        <button
                          type="button"
                          onClick={() =>
                            handleViewCourse(
                              assignment.courseId
                            )
                          }
                          className="text-left"
                        >
                          <p className="max-w-[220px] truncate text-sm font-medium hover:text-primary">
                            {assignment.course}
                          </p>
                        </button>
                      </td>

                      {/* Instructor */}

                      <td className="px-6 py-4">
                        <span className="text-sm text-muted-foreground">
                          {assignment.instructor}
                        </span>
                      </td>

                      {/* Submissions */}

                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />

                          <span className="font-semibold">
                            {
                              assignment.submissions
                            }
                            /
                            {
                              assignment.students
                            }
                          </span>
                        </div>
                      </td>

                      {/* Due Date */}

                      <td className="px-6 py-4 text-center">
                        <span className="text-sm">
                          {assignment.dueDate}
                        </span>
                      </td>

                      {/* Score */}

                      <td className="px-6 py-4 text-center">
                        {assignment.averageScore >
                        0 ? (
                          <span
                            className={`font-semibold ${getScoreClasses(
                              assignment.averageScore
                            )}`}
                          >
                            {
                              assignment.averageScore
                            }
                            %
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
                            assignment.status
                          )}`}
                        >
                          {assignment.status ===
                          "Published" ? (
                            <CheckCircle2 className="h-3.5 w-3.5" />
                          ) : assignment.status ===
                            "Draft" ? (
                            <Clock3 className="h-3.5 w-3.5" />
                          ) : (
                            <XCircle className="h-3.5 w-3.5" />
                          )}

                          {assignment.status}
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
                                  assignment.id
                                )
                              }
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Assignment
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              onClick={() =>
                                handleEdit(
                                  assignment.id
                                )
                              }
                            >
                              <Pencil className="mr-2 h-4 w-4" />
                              Edit Assignment
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                              onClick={() =>
                                handleToggleStatus(
                                  assignment.id
                                )
                              }
                            >
                              {assignment.status ===
                              "Published" ? (
                                <>
                                  <XCircle className="mr-2 h-4 w-4" />
                                  Close Assignment
                                </>
                              ) : (
                                <>
                                  <CheckCircle2 className="mr-2 h-4 w-4" />
                                  Publish Assignment
                                </>
                              )}
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                              onClick={() =>
                                handleDelete(
                                  assignment.id
                                )
                              }
                              className="text-red-500 focus:text-red-500"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Assignment
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    className="px-6 py-16 text-center"
                  >
                    <div className="mx-auto flex max-w-sm flex-col items-center">
                      <div className="rounded-full bg-muted p-4">
                        <FileText className="h-6 w-6 text-muted-foreground" />
                      </div>

                      <h3 className="mt-4 font-semibold">
                        No assignments found
                      </h3>

                      <p className="mt-1 text-sm text-muted-foreground">
                        Try adjusting your search
                        or filter settings.
                      </p>

                      <Button
                        variant="outline"
                        className="mt-4 rounded-xl"
                        onClick={
                          clearFilters
                        }
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
              {filteredAssignments.length ===
              0
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
                filteredAssignments.length
              )}
            </span>{" "}
            of{" "}
            <span className="font-medium text-foreground">
              {filteredAssignments.length}
            </span>{" "}
            assignments
          </p>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              disabled={
                safeCurrentPage === 1
              }
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
                {
                  length: totalPages,
                },
                (_, index) =>
                  index + 1
              ).map((page) => (
                <Button
                  key={page}
                  variant={
                    page ===
                    safeCurrentPage
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
                safeCurrentPage ===
                totalPages
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
      {/* ADMIN NOTE */}
      {/* ===================================== */}

      <div className="flex items-start gap-3 rounded-xl border bg-muted/20 p-4">
        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

        <div>
          <p className="text-sm font-medium">
            Assignment management
          </p>

          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            Assignments currently use placeholder
            data. Create, edit, publish, close,
            delete, submission and grading actions
            will be connected to the assignment API
            once the backend endpoints are
            implemented.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AssignmentsPage;