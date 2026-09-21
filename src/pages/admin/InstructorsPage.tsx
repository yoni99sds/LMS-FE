import {
  Search,
  UserPlus,
  MoreHorizontal,
  Eye,
  Pencil,
  UserX,
  UserCheck,
  Trash2,
  Users,
  BookOpen,
  Star,
  DollarSign,
  Mail,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
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

type InstructorStatus =
  | "Active"
  | "Suspended"
  | "Pending";

interface Instructor {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string;
  status: InstructorStatus;
  courses: number;
  students: number;
  rating: number;
  revenue: number;
  joinedAt: string;
  emailVerified: boolean;
}

const instructorsData: Instructor[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Instructor",
    email: "instructor@edumaster.com",
    profilePicture: "",
    status: "Active",
    courses: 12,
    students: 486,
    rating: 4.8,
    revenue: 12450,
    joinedAt: "Jan 15, 2026",
    emailVerified: true,
  },
  {
    id: "2",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@edumaster.com",
    profilePicture: "",
    status: "Active",
    courses: 8,
    students: 325,
    rating: 4.9,
    revenue: 9870,
    joinedAt: "Feb 03, 2026",
    emailVerified: true,
  },
  {
    id: "3",
    firstName: "Michael",
    lastName: "Brown",
    email: "michael.brown@edumaster.com",
    profilePicture: "",
    status: "Active",
    courses: 15,
    students: 712,
    rating: 4.7,
    revenue: 15890,
    joinedAt: "Jan 28, 2026",
    emailVerified: true,
  },
  {
    id: "4",
    firstName: "Emily",
    lastName: "Davis",
    email: "emily.davis@edumaster.com",
    profilePicture: "",
    status: "Pending",
    courses: 3,
    students: 74,
    rating: 4.6,
    revenue: 2140,
    joinedAt: "Mar 12, 2026",
    emailVerified: false,
  },
  {
    id: "5",
    firstName: "Daniel",
    lastName: "Wilson",
    email: "daniel.wilson@edumaster.com",
    profilePicture: "",
    status: "Suspended",
    courses: 6,
    students: 194,
    rating: 4.4,
    revenue: 5320,
    joinedAt: "Dec 20, 2025",
    emailVerified: true,
  },
  {
    id: "6",
    firstName: "Jessica",
    lastName: "Miller",
    email: "jessica.miller@edumaster.com",
    profilePicture: "",
    status: "Active",
    courses: 10,
    students: 391,
    rating: 4.8,
    revenue: 11280,
    joinedAt: "Feb 18, 2026",
    emailVerified: true,
  },
  {
    id: "7",
    firstName: "Robert",
    lastName: "Taylor",
    email: "robert.taylor@edumaster.com",
    profilePicture: "",
    status: "Active",
    courses: 7,
    students: 267,
    rating: 4.5,
    revenue: 7460,
    joinedAt: "Mar 01, 2026",
    emailVerified: true,
  },
  {
    id: "8",
    firstName: "Anna",
    lastName: "Anderson",
    email: "anna.anderson@edumaster.com",
    profilePicture: "",
    status: "Pending",
    courses: 2,
    students: 31,
    rating: 4.3,
    revenue: 980,
    joinedAt: "Mar 15, 2026",
    emailVerified: false,
  },
];

const InstructorsPage = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<string>("all");

  const [currentPage, setCurrentPage] =
    useState(1);

  const itemsPerPage = 6;

  /*
   * ===============================
   * FILTER INSTRUCTORS
   * ===============================
   */
  const filteredInstructors = useMemo(() => {
    const searchValue = search
      .toLowerCase()
      .trim();

    return instructorsData.filter((instructor) => {
      const fullName =
        `${instructor.firstName} ${instructor.lastName}`
          .toLowerCase();

      const matchesSearch =
        !searchValue ||
        fullName.includes(searchValue) ||
        instructor.email
          .toLowerCase()
          .includes(searchValue);

      const matchesStatus =
        statusFilter === "all" ||
        instructor.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  /*
   * ===============================
   * PAGINATION
   * ===============================
   */
  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredInstructors.length / itemsPerPage
    )
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages
  );

  const paginatedInstructors =
    filteredInstructors.slice(
      (safeCurrentPage - 1) * itemsPerPage,
      safeCurrentPage * itemsPerPage
    );

  /*
   * ===============================
   * STATISTICS
   * ===============================
   */
  const totalInstructors =
    instructorsData.length;

  const activeInstructors =
    instructorsData.filter(
      (item) => item.status === "Active"
    ).length;

  const pendingInstructors =
    instructorsData.filter(
      (item) => item.status === "Pending"
    ).length;

  const totalStudents =
    instructorsData.reduce(
      (sum, instructor) =>
        sum + instructor.students,
      0
    );

  /*
   * ===============================
   * HANDLERS
   * ===============================
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

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setCurrentPage(1);
  };

  const handleView = (id: string) => {
    navigate(`/admin/instructors/${id}`);
  };

  const handleEdit = (id: string) => {
    console.log("Edit instructor:", id);
  };

  const handleSuspend = (id: string) => {
    console.log("Suspend instructor:", id);
  };

  const handleActivate = (id: string) => {
    console.log("Activate instructor:", id);
  };

  const handleDelete = (id: string) => {
    console.log("Delete instructor:", id);
  };

  /*
   * ===============================
   * HELPERS
   * ===============================
   */

  const getInitials = (
    firstName: string,
    lastName: string
  ) => {
    return `${firstName.charAt(
      0
    )}${lastName.charAt(0)}`.toUpperCase();
  };

  const getStatusClasses = (
    status: InstructorStatus
  ) => {
    switch (status) {
      case "Active":
        return "bg-green-500/10 text-green-600";

      case "Suspended":
        return "bg-red-500/10 text-red-600";

      case "Pending":
        return "bg-yellow-500/10 text-yellow-600";

      default:
        return "bg-muted text-muted-foreground";
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
            Instructors
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage instructors and monitor their
            teaching activity.
          </p>
        </div>

        <Button
          className="rounded-xl"
          onClick={() =>
            console.log("Add instructor")
          }
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Add Instructor
        </Button>
      </div>

      {/* ===================================== */}
      {/* STATISTICS */}
      {/* ===================================== */}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total */}
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Total Instructors
                </p>

                <p className="mt-1 text-2xl font-bold">
                  {totalInstructors}
                </p>
              </div>

              <div className="rounded-xl bg-primary/10 p-3 text-primary">
                <GraduationCap className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active */}
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Active
                </p>

                <p className="mt-1 text-2xl font-bold">
                  {activeInstructors}
                </p>
              </div>

              <div className="rounded-xl bg-green-500/10 p-3 text-green-600">
                <UserCheck className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pending */}
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Pending
                </p>

                <p className="mt-1 text-2xl font-bold">
                  {pendingInstructors}
                </p>
              </div>

              <div className="rounded-xl bg-yellow-500/10 p-3 text-yellow-600">
                <Users className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Students */}
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Total Students
                </p>

                <p className="mt-1 text-2xl font-bold">
                  {totalStudents.toLocaleString()}
                </p>
              </div>

              <div className="rounded-xl bg-blue-500/10 p-3 text-blue-600">
                <Users className="h-5 w-5" />
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
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                value={search}
                onChange={(event) =>
                  handleSearchChange(
                    event.target.value
                  )
                }
                placeholder="Search instructors by name or email..."
                className="rounded-xl pl-9"
              />
            </div>

            {/* Status */}
            <Select
              value={statusFilter}
              onValueChange={
                handleStatusChange
              }
            >
              <SelectTrigger className="w-full rounded-xl lg:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">
                  All Statuses
                </SelectItem>

                <SelectItem value="Active">
                  Active
                </SelectItem>

                <SelectItem value="Pending">
                  Pending
                </SelectItem>

                <SelectItem value="Suspended">
                  Suspended
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Clear */}
            {(search ||
              statusFilter !== "all") && (
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
      {/* INSTRUCTORS TABLE */}
      {/* ===================================== */}

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px]">
            <thead className="border-b bg-muted/30">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Instructor
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Status
                </th>

                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Courses
                </th>

                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Students
                </th>

                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Rating
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Revenue
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {paginatedInstructors.length > 0 ? (
                paginatedInstructors.map(
                  (instructor) => {
                    const fullName = `${instructor.firstName} ${instructor.lastName}`;

                    return (
                      <tr
                        key={instructor.id}
                        className="transition hover:bg-muted/20"
                      >
                        {/* Instructor */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary text-sm font-bold text-primary-foreground">
                              {instructor.profilePicture ? (
                                <img
                                  src={
                                    instructor.profilePicture
                                  }
                                  alt={fullName}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                getInitials(
                                  instructor.firstName,
                                  instructor.lastName
                                )
                              )}
                            </div>

                            <div className="min-w-0">
                              <p className="truncate font-semibold">
                                {fullName}
                              </p>

                              <div className="mt-1 flex items-center gap-1.5">
                                <Mail className="h-3.5 w-3.5 text-muted-foreground" />

                                <p className="max-w-[220px] truncate text-xs text-muted-foreground">
                                  {instructor.email}
                                </p>
                              </div>

                              {!instructor.emailVerified && (
                                <p className="mt-1 text-[11px] text-yellow-600">
                                  Email not verified
                                </p>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
                              instructor.status
                            )}`}
                          >
                            {instructor.status}
                          </span>
                        </td>

                        {/* Courses */}
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <BookOpen className="h-4 w-4 text-muted-foreground" />

                            <span className="font-medium">
                              {instructor.courses}
                            </span>
                          </div>
                        </td>

                        {/* Students */}
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <Users className="h-4 w-4 text-muted-foreground" />

                            <span className="font-medium">
                              {instructor.students.toLocaleString()}
                            </span>
                          </div>
                        </td>

                        {/* Rating */}
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <Star className="h-4 w-4 fill-current text-yellow-500" />

                            <span className="font-medium">
                              {instructor.rating.toFixed(
                                1
                              )}
                            </span>
                          </div>
                        </td>

                        {/* Revenue */}
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <DollarSign className="h-4 w-4 text-muted-foreground" />

                            <span className="font-semibold">
                              {instructor.revenue.toLocaleString()}
                            </span>
                          </div>
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
                              className="w-48"
                            >
                              <DropdownMenuItem
                                onClick={() =>
                                  handleView(
                                    instructor.id
                                  )
                                }
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                View Profile
                              </DropdownMenuItem>

                              <DropdownMenuItem
                                onClick={() =>
                                  handleEdit(
                                    instructor.id
                                  )
                                }
                              >
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit Instructor
                              </DropdownMenuItem>

                              <DropdownMenuSeparator />

                              {instructor.status ===
                              "Suspended" ? (
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleActivate(
                                      instructor.id
                                    )
                                  }
                                >
                                  <UserCheck className="mr-2 h-4 w-4" />
                                  Activate
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleSuspend(
                                      instructor.id
                                    )
                                  }
                                  className="text-yellow-600 focus:text-yellow-600"
                                >
                                  <UserX className="mr-2 h-4 w-4" />
                                  Suspend
                                </DropdownMenuItem>
                              )}

                              <DropdownMenuSeparator />

                              <DropdownMenuItem
                                onClick={() =>
                                  handleDelete(
                                    instructor.id
                                  )
                                }
                                className="text-red-500 focus:text-red-500"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Instructor
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    );
                  }
                )
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-16 text-center"
                  >
                    <div className="mx-auto flex max-w-sm flex-col items-center">
                      <div className="rounded-full bg-muted p-4">
                        <Users className="h-6 w-6 text-muted-foreground" />
                      </div>

                      <h3 className="mt-4 font-semibold">
                        No instructors found
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

        {/* ================================= */}
        {/* PAGINATION */}
        {/* ================================= */}

        <div className="flex flex-col gap-3 border-t px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-medium text-foreground">
              {filteredInstructors.length === 0
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
                filteredInstructors.length
              )}
            </span>{" "}
            of{" "}
            <span className="font-medium text-foreground">
              {filteredInstructors.length}
            </span>{" "}
            instructors
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
      {/* FOOTER NOTE */}
      {/* ===================================== */}

      <div className="flex items-start gap-3 rounded-xl border bg-muted/20 p-4">
        <GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

        <div>
          <p className="text-sm font-medium">
            Instructor management
          </p>

          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            The instructor information currently shown
            is placeholder data. It will be connected to
            the backend instructor APIs when the admin
            management API is implemented.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InstructorsPage;