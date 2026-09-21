import {
  Search,
  Plus,
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
  CheckCircle2,
  XCircle,
  Clock,
  BookOpen,
  Users,
  Star,
  DollarSign,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
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

type CourseStatus =
  | "Published"
  | "Draft"
  | "Pending"
  | "Rejected";

interface Course {
  id: string;
  title: string;
  description: string;
  instructorId: string;
  instructorName: string;
  category: string;
  status: CourseStatus;
  students: number;
  rating: number;
  reviews: number;
  revenue: number;
  price: number;
  lessons: number;
  createdAt: string;
}

const coursesData: Course[] = [
  {
    id: "course-001",
    title: "Complete Web Development Bootcamp",
    description:
      "Learn modern web development from fundamentals to advanced projects.",
    instructorId: "1",
    instructorName: "John Instructor",
    category: "Web Development",
    status: "Published",
    students: 184,
    rating: 4.9,
    reviews: 48,
    revenue: 4820,
    price: 59,
    lessons: 64,
    createdAt: "Jan 20, 2026",
  },
  {
    id: "course-002",
    title: "React & TypeScript Masterclass",
    description:
      "Build production-ready React applications using TypeScript.",
    instructorId: "1",
    instructorName: "John Instructor",
    category: "Programming",
    status: "Published",
    students: 126,
    rating: 4.8,
    reviews: 37,
    revenue: 3650,
    price: 49,
    lessons: 52,
    createdAt: "Feb 04, 2026",
  },
  {
    id: "course-003",
    title: "Node.js & Express API Development",
    description:
      "Create secure and scalable REST APIs with Node.js and Express.",
    instructorId: "1",
    instructorName: "John Instructor",
    category: "Programming",
    status: "Published",
    students: 98,
    rating: 4.7,
    reviews: 29,
    revenue: 2480,
    price: 45,
    lessons: 46,
    createdAt: "Feb 18, 2026",
  },
  {
    id: "course-004",
    title: "MongoDB for Modern Applications",
    description:
      "Master MongoDB database design, queries, indexes and aggregation.",
    instructorId: "1",
    instructorName: "John Instructor",
    category: "Database",
    status: "Draft",
    students: 0,
    rating: 0,
    reviews: 0,
    revenue: 0,
    price: 39,
    lessons: 34,
    createdAt: "Mar 02, 2026",
  },
  {
    id: "course-005",
    title: "UI/UX Design Fundamentals",
    description:
      "Learn user-centered design principles and modern design workflows.",
    instructorId: "2",
    instructorName: "Sarah Johnson",
    category: "Design",
    status: "Published",
    students: 215,
    rating: 4.9,
    reviews: 61,
    revenue: 5890,
    price: 55,
    lessons: 42,
    createdAt: "Jan 12, 2026",
  },
  {
    id: "course-006",
    title: "Advanced JavaScript",
    description:
      "Deep dive into modern JavaScript concepts and application patterns.",
    instructorId: "3",
    instructorName: "Michael Brown",
    category: "Programming",
    status: "Pending",
    students: 72,
    rating: 4.6,
    reviews: 18,
    revenue: 1920,
    price: 42,
    lessons: 39,
    createdAt: "Mar 08, 2026",
  },
  {
    id: "course-007",
    title: "Digital Marketing Strategy",
    description:
      "Build effective digital marketing campaigns for modern businesses.",
    instructorId: "2",
    instructorName: "Sarah Johnson",
    category: "Marketing",
    status: "Published",
    students: 164,
    rating: 4.7,
    reviews: 43,
    revenue: 4210,
    price: 49,
    lessons: 36,
    createdAt: "Feb 11, 2026",
  },
  {
    id: "course-008",
    title: "Python for Beginners",
    description:
      "Start programming with Python through practical exercises.",
    instructorId: "3",
    instructorName: "Michael Brown",
    category: "Programming",
    status: "Rejected",
    students: 0,
    rating: 0,
    reviews: 0,
    revenue: 0,
    price: 35,
    lessons: 28,
    createdAt: "Mar 10, 2026",
  },
  {
    id: "course-009",
    title: "Data Analytics with Excel",
    description:
      "Analyze business data and create professional Excel reports.",
    instructorId: "4",
    instructorName: "Emily Davis",
    category: "Data Analytics",
    status: "Pending",
    students: 34,
    rating: 4.4,
    reviews: 7,
    revenue: 780,
    price: 29,
    lessons: 25,
    createdAt: "Mar 13, 2026",
  },
  {
    id: "course-010",
    title: "Graphic Design with Figma",
    description:
      "Create professional interfaces and design systems using Figma.",
    instructorId: "2",
    instructorName: "Sarah Johnson",
    category: "Design",
    status: "Draft",
    students: 0,
    rating: 0,
    reviews: 0,
    revenue: 0,
    price: 45,
    lessons: 31,
    createdAt: "Mar 15, 2026",
  },
];

const CoursesPage = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<string>("all");

  const [categoryFilter, setCategoryFilter] =
    useState<string>("all");

  const [instructorFilter, setInstructorFilter] =
    useState<string>("all");

  const [currentPage, setCurrentPage] =
    useState(1);

  const itemsPerPage = 6;

  /*
   * ============================================
   * FILTER OPTIONS
   * ============================================
   */

  const categories = useMemo(() => {
    return Array.from(
      new Set(
        coursesData.map(
          (course) => course.category
        )
      )
    );
  }, []);

  const instructors = useMemo(() => {
    return Array.from(
      new Map(
        coursesData.map((course) => [
          course.instructorId,
          course.instructorName,
        ])
      ).entries()
    );
  }, []);

  /*
   * ============================================
   * FILTER COURSES
   * ============================================
   */

  const filteredCourses = useMemo(() => {
    const searchValue = search
      .toLowerCase()
      .trim();

    return coursesData.filter((course) => {
      const matchesSearch =
        !searchValue ||
        course.title
          .toLowerCase()
          .includes(searchValue) ||
        course.description
          .toLowerCase()
          .includes(searchValue) ||
        course.instructorName
          .toLowerCase()
          .includes(searchValue);

      const matchesStatus =
        statusFilter === "all" ||
        course.status === statusFilter;

      const matchesCategory =
        categoryFilter === "all" ||
        course.category === categoryFilter;

      const matchesInstructor =
        instructorFilter === "all" ||
        course.instructorId === instructorFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCategory &&
        matchesInstructor
      );
    });
  }, [
    search,
    statusFilter,
    categoryFilter,
    instructorFilter,
  ]);

  /*
   * ============================================
   * PAGINATION
   * ============================================
   */

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredCourses.length / itemsPerPage
    )
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages
  );

  const paginatedCourses =
    filteredCourses.slice(
      (safeCurrentPage - 1) * itemsPerPage,
      safeCurrentPage * itemsPerPage
    );

  /*
   * ============================================
   * STATISTICS
   * ============================================
   */

  const totalCourses = coursesData.length;

  const publishedCourses =
    coursesData.filter(
      (course) => course.status === "Published"
    ).length;

  const pendingCourses =
    coursesData.filter(
      (course) => course.status === "Pending"
    ).length;

  const totalStudents =
    coursesData.reduce(
      (sum, course) =>
        sum + course.students,
      0
    );

  const totalRevenue =
    coursesData.reduce(
      (sum, course) =>
        sum + course.revenue,
      0
    );

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

  const handleCategoryChange = (
    value: string
  ) => {
    setCategoryFilter(value);
    setCurrentPage(1);
  };

  const handleInstructorChange = (
    value: string
  ) => {
    setInstructorFilter(value);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setCategoryFilter("all");
    setInstructorFilter("all");
    setCurrentPage(1);
  };

  const handleView = (id: string) => {
    navigate(`/admin/courses/${id}`);
  };

  const handleEdit = (id: string) => {
    console.log("Edit course:", id);
  };

  const handleApprove = (id: string) => {
    console.log("Approve course:", id);
  };

  const handleReject = (id: string) => {
    console.log("Reject course:", id);
  };

  const handlePublish = (id: string) => {
    console.log("Publish course:", id);
  };

  const handleDelete = (id: string) => {
    console.log("Delete course:", id);
  };

  /*
   * ============================================
   * STATUS STYLES
   * ============================================
   */

  const getStatusClasses = (
    status: CourseStatus
  ) => {
    switch (status) {
      case "Published":
        return "bg-green-500/10 text-green-600";

      case "Pending":
        return "bg-yellow-500/10 text-yellow-600";

      case "Draft":
        return "bg-muted text-muted-foreground";

      case "Rejected":
        return "bg-red-500/10 text-red-600";

      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (
    status: CourseStatus
  ) => {
    switch (status) {
      case "Published":
        return (
          <CheckCircle2 className="h-3.5 w-3.5" />
        );

      case "Pending":
        return (
          <Clock className="h-3.5 w-3.5" />
        );

      case "Draft":
        return (
          <BookOpen className="h-3.5 w-3.5" />
        );

      case "Rejected":
        return (
          <XCircle className="h-3.5 w-3.5" />
        );

      default:
        return null;
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
            Courses
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage, review, and monitor all platform
            courses.
          </p>
        </div>

        <Button
          className="rounded-xl"
          onClick={() =>
            console.log("Create course")
          }
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Course
        </Button>
      </div>

      {/* ===================================== */}
      {/* STATISTICS */}
      {/* ===================================== */}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {/* Total */}
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Total Courses
                </p>

                <p className="mt-1 text-2xl font-bold">
                  {totalCourses}
                </p>
              </div>

              <div className="rounded-xl bg-primary/10 p-3 text-primary">
                <BookOpen className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Published */}
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Published
                </p>

                <p className="mt-1 text-2xl font-bold">
                  {publishedCourses}
                </p>
              </div>

              <div className="rounded-xl bg-green-500/10 p-3 text-green-600">
                <CheckCircle2 className="h-5 w-5" />
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
                  Pending Review
                </p>

                <p className="mt-1 text-2xl font-bold">
                  {pendingCourses}
                </p>
              </div>

              <div className="rounded-xl bg-yellow-500/10 p-3 text-yellow-600">
                <Clock className="h-5 w-5" />
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
                  Enrollments
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

        {/* Revenue */}
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Revenue
                </p>

                <p className="mt-1 text-2xl font-bold">
                  ${totalRevenue.toLocaleString()}
                </p>
              </div>

              <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-600">
                <DollarSign className="h-5 w-5" />
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
          <div className="grid gap-3 lg:grid-cols-[1fr_180px_180px_200px_auto]">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                value={search}
                onChange={(event) =>
                  handleSearchChange(
                    event.target.value
                  )
                }
                placeholder="Search courses..."
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

                <SelectItem value="Pending">
                  Pending
                </SelectItem>

                <SelectItem value="Draft">
                  Draft
                </SelectItem>

                <SelectItem value="Rejected">
                  Rejected
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Category */}
            <Select
              value={categoryFilter}
              onValueChange={
                handleCategoryChange
              }
            >
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Category" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">
                  All Categories
                </SelectItem>

                {categories.map(
                  (category) => (
                    <SelectItem
                      key={category}
                      value={category}
                    >
                      {category}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>

            {/* Instructor */}
            <Select
              value={instructorFilter}
              onValueChange={
                handleInstructorChange
              }
            >
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Instructor" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">
                  All Instructors
                </SelectItem>

                {instructors.map(
                  ([id, name]) => (
                    <SelectItem
                      key={id}
                      value={id}
                    >
                      {name}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>

            {/* Clear */}
            {(search ||
              statusFilter !== "all" ||
              categoryFilter !== "all" ||
              instructorFilter !== "all") && (
              <Button
                variant="outline"
                onClick={clearFilters}
                className="rounded-xl"
              >
                Clear
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* ===================================== */}
      {/* COURSES TABLE */}
      {/* ===================================== */}

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px]">
            <thead className="border-b bg-muted/30">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Course
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Instructor
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Category
                </th>

                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Status
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
              {paginatedCourses.length > 0 ? (
                paginatedCourses.map(
                  (course) => (
                    <tr
                      key={course.id}
                      className="transition hover:bg-muted/20"
                    >
                      {/* Course */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <BookOpen className="h-5 w-5" />
                          </div>

                          <div className="min-w-0">
                            <p className="max-w-[280px] truncate font-semibold">
                              {course.title}
                            </p>

                            <p className="mt-1 max-w-[300px] truncate text-xs text-muted-foreground">
                              {course.lessons} lessons • $
                              {course.price}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Instructor */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                            {course.instructorName
                              .split(" ")
                              .map(
                                (part) =>
                                  part.charAt(0)
                              )
                              .join("")
                              .slice(0, 2)
                              .toUpperCase()}
                          </div>

                          <span className="text-sm font-medium">
                            {course.instructorName}
                          </span>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-6 py-4">
                        <span className="rounded-lg bg-muted px-2.5 py-1 text-xs font-medium">
                          {course.category}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
                            course.status
                          )}`}
                        >
                          {getStatusIcon(
                            course.status
                          )}

                          {course.status}
                        </span>
                      </td>

                      {/* Students */}
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <Users className="h-4 w-4 text-muted-foreground" />

                          <span className="font-medium">
                            {course.students.toLocaleString()}
                          </span>
                        </div>
                      </td>

                      {/* Rating */}
                      <td className="px-6 py-4 text-center">
                        {course.rating > 0 ? (
                          <div className="flex items-center justify-center gap-1.5">
                            <Star className="h-4 w-4 fill-current text-yellow-500" />

                            <span className="font-medium">
                              {course.rating.toFixed(
                                1
                              )}
                            </span>

                            <span className="text-xs text-muted-foreground">
                              ({course.reviews})
                            </span>
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground">
                            No ratings
                          </span>
                        )}
                      </td>

                      {/* Revenue */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />

                          <span className="font-semibold">
                            {course.revenue.toLocaleString()}
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
                            className="w-52"
                          >
                            <DropdownMenuItem
                              onClick={() =>
                                handleView(
                                  course.id
                                )
                              }
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Course
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              onClick={() =>
                                handleEdit(
                                  course.id
                                )
                              }
                            >
                              <Pencil className="mr-2 h-4 w-4" />
                              Edit Course
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            {course.status ===
                              "Pending" && (
                              <>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleApprove(
                                      course.id
                                    )
                                  }
                                  className="text-green-600 focus:text-green-600"
                                >
                                  <ShieldCheck className="mr-2 h-4 w-4" />
                                  Approve Course
                                </DropdownMenuItem>

                                <DropdownMenuItem
                                  onClick={() =>
                                    handleReject(
                                      course.id
                                    )
                                  }
                                  className="text-red-500 focus:text-red-500"
                                >
                                  <XCircle className="mr-2 h-4 w-4" />
                                  Reject Course
                                </DropdownMenuItem>

                                <DropdownMenuSeparator />
                              </>
                            )}

                            {course.status ===
                              "Draft" && (
                              <DropdownMenuItem
                                onClick={() =>
                                  handlePublish(
                                    course.id
                                  )
                                }
                              >
                                <CheckCircle2 className="mr-2 h-4 w-4" />
                                Publish Course
                              </DropdownMenuItem>
                            )}

                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                              onClick={() =>
                                handleDelete(
                                  course.id
                                )
                              }
                              className="text-red-500 focus:text-red-500"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Course
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
                        <BookOpen className="h-6 w-6 text-muted-foreground" />
                      </div>

                      <h3 className="mt-4 font-semibold">
                        No courses found
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
              {filteredCourses.length === 0
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
                filteredCourses.length
              )}
            </span>{" "}
            of{" "}
            <span className="font-medium text-foreground">
              {filteredCourses.length}
            </span>{" "}
            courses
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
      {/* ADMIN NOTE */}
      {/* ===================================== */}

      <div className="flex items-start gap-3 rounded-xl border bg-muted/20 p-4">
        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

        <div>
          <p className="text-sm font-medium">
            Course moderation
          </p>

          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            Courses currently use placeholder data.
            Pending courses can later be reviewed and
            approved or rejected through the admin API.
            Statistics will also be calculated from the
            real course, enrollment, review, and payment
            collections.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;