import {
  Search,
  Plus,
  MoreHorizontal,
  Pencil,
  Trash2,
  Eye,
  FolderTree,
  BookOpen,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Layers3,
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

type CategoryStatus = "Active" | "Inactive";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  courses: number;
  students: number;
  status: CategoryStatus;
  createdAt: string;
}

const categoriesData: Category[] = [
  {
    id: "cat-001",
    name: "Web Development",
    slug: "web-development",
    description:
      "Courses covering frontend, backend, full-stack development and modern web technologies.",
    courses: 48,
    students: 1248,
    status: "Active",
    createdAt: "January 08, 2026",
  },
  {
    id: "cat-002",
    name: "Programming",
    slug: "programming",
    description:
      "Programming languages, software development, algorithms and application development.",
    courses: 72,
    students: 2184,
    status: "Active",
    createdAt: "January 10, 2026",
  },
  {
    id: "cat-003",
    name: "Design",
    slug: "design",
    description:
      "UI/UX design, graphic design, Figma and digital product design.",
    courses: 36,
    students: 964,
    status: "Active",
    createdAt: "January 12, 2026",
  },
  {
    id: "cat-004",
    name: "Database",
    slug: "database",
    description:
      "Database management, SQL, NoSQL, MongoDB and database architecture.",
    courses: 24,
    students: 682,
    status: "Active",
    createdAt: "January 15, 2026",
  },
  {
    id: "cat-005",
    name: "Data Analytics",
    slug: "data-analytics",
    description:
      "Data analysis, visualization, Excel, statistics and business intelligence.",
    courses: 29,
    students: 815,
    status: "Active",
    createdAt: "January 17, 2026",
  },
  {
    id: "cat-006",
    name: "Marketing",
    slug: "marketing",
    description:
      "Digital marketing, SEO, social media marketing and business growth strategies.",
    courses: 31,
    students: 924,
    status: "Active",
    createdAt: "January 20, 2026",
  },
  {
    id: "cat-007",
    name: "Business",
    slug: "business",
    description:
      "Business management, entrepreneurship, leadership and professional development.",
    courses: 38,
    students: 1126,
    status: "Active",
    createdAt: "January 22, 2026",
  },
  {
    id: "cat-008",
    name: "Photography",
    slug: "photography",
    description:
      "Photography fundamentals, camera techniques, editing and visual storytelling.",
    courses: 16,
    students: 438,
    status: "Active",
    createdAt: "February 02, 2026",
  },
  {
    id: "cat-009",
    name: "Mobile Development",
    slug: "mobile-development",
    description:
      "Android, iOS, React Native, Flutter and cross-platform mobile development.",
    courses: 21,
    students: 574,
    status: "Active",
    createdAt: "February 08, 2026",
  },
  {
    id: "cat-010",
    name: "Cybersecurity",
    slug: "cybersecurity",
    description:
      "Network security, application security, ethical security practices and cyber defense.",
    courses: 11,
    students: 296,
    status: "Inactive",
    createdAt: "February 15, 2026",
  },
  {
    id: "cat-011",
    name: "Cloud Computing",
    slug: "cloud-computing",
    description:
      "Cloud infrastructure, deployment, containers and modern cloud platforms.",
    courses: 13,
    students: 341,
    status: "Active",
    createdAt: "March 01, 2026",
  },
  {
    id: "cat-012",
    name: "DevOps",
    slug: "devops",
    description:
      "CI/CD, Docker, deployment automation, monitoring and development operations.",
    courses: 7,
    students: 186,
    status: "Inactive",
    createdAt: "March 05, 2026",
  },
];

const CategoriesPage = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState<string>("all");

  const [currentPage, setCurrentPage] =
    useState(1);

  const itemsPerPage = 8;

  /*
   * ============================================
   * FILTERING
   * ============================================
   */

  const filteredCategories = useMemo(() => {
    const searchValue = search
      .toLowerCase()
      .trim();

    return categoriesData.filter((category) => {
      const matchesSearch =
        !searchValue ||
        category.name
          .toLowerCase()
          .includes(searchValue) ||
        category.slug
          .toLowerCase()
          .includes(searchValue) ||
        category.description
          .toLowerCase()
          .includes(searchValue);

      const matchesStatus =
        statusFilter === "all" ||
        category.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  /*
   * ============================================
   * PAGINATION
   * ============================================
   */

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredCategories.length / itemsPerPage
    )
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages
  );

  const paginatedCategories =
    filteredCategories.slice(
      (safeCurrentPage - 1) * itemsPerPage,
      safeCurrentPage * itemsPerPage
    );

  /*
   * ============================================
   * STATISTICS
   * ============================================
   */

  const totalCategories =
    categoriesData.length;

  const activeCategories =
    categoriesData.filter(
      (category) =>
        category.status === "Active"
    ).length;

  const inactiveCategories =
    categoriesData.filter(
      (category) =>
        category.status === "Inactive"
    ).length;

  const totalCourses =
    categoriesData.reduce(
      (sum, category) =>
        sum + category.courses,
      0
    );

  const totalStudents =
    categoriesData.reduce(
      (sum, category) =>
        sum + category.students,
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

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setCurrentPage(1);
  };

  const handleAddCategory = () => {
    console.log("Add category");
  };

  const handleView = (id: string) => {
    console.log("View category:", id);
  };

  const handleEdit = (id: string) => {
    console.log("Edit category:", id);
  };

  const handleToggleStatus = (
    id: string
  ) => {
    console.log(
      "Toggle category status:",
      id
    );
  };

  const handleDelete = (id: string) => {
    console.log("Delete category:", id);
  };

  /*
   * ============================================
   * STATUS HELPERS
   * ============================================
   */

  const getStatusClasses = (
    status: CategoryStatus
  ) => {
    return status === "Active"
      ? "bg-green-500/10 text-green-600"
      : "bg-muted text-muted-foreground";
  };

  return (
    <div className="space-y-6">
      {/* ===================================== */}
      {/* HEADER */}
      {/* ===================================== */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Categories
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Organize courses and manage the platform
            category structure.
          </p>
        </div>

        <Button
          onClick={handleAddCategory}
          className="rounded-xl"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Category
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
                  Total Categories
                </p>

                <p className="mt-1 text-2xl font-bold">
                  {totalCategories}
                </p>
              </div>

              <div className="rounded-xl bg-primary/10 p-3 text-primary">
                <FolderTree className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Active
                </p>

                <p className="mt-1 text-2xl font-bold">
                  {activeCategories}
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
                  Inactive
                </p>

                <p className="mt-1 text-2xl font-bold">
                  {inactiveCategories}
                </p>
              </div>

              <div className="rounded-xl bg-muted p-3 text-muted-foreground">
                <XCircle className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Courses
                </p>

                <p className="mt-1 text-2xl font-bold">
                  {totalCourses.toLocaleString()}
                </p>
              </div>

              <div className="rounded-xl bg-blue-500/10 p-3 text-blue-600">
                <BookOpen className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

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

              <div className="rounded-xl bg-purple-500/10 p-3 text-purple-600">
                <Layers3 className="h-5 w-5" />
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
          <div className="grid gap-3 md:grid-cols-[1fr_200px_auto]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                value={search}
                onChange={(event) =>
                  handleSearchChange(
                    event.target.value
                  )
                }
                placeholder="Search categories..."
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

                <SelectItem value="Active">
                  Active
                </SelectItem>

                <SelectItem value="Inactive">
                  Inactive
                </SelectItem>
              </SelectContent>
            </Select>

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
      {/* CATEGORY TABLE */}
      {/* ===================================== */}

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px]">
            <thead className="border-b bg-muted/30">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Category
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Description
                </th>

                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Courses
                </th>

                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Students
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
              {paginatedCategories.length > 0 ? (
                paginatedCategories.map(
                  (category) => (
                    <tr
                      key={category.id}
                      className="transition hover:bg-muted/20"
                    >
                      {/* Category */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <FolderTree className="h-5 w-5" />
                          </div>

                          <div className="min-w-0">
                            <p className="font-semibold">
                              {category.name}
                            </p>

                            <p className="mt-1 text-xs text-muted-foreground">
                              /{category.slug}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Description */}
                      <td className="px-6 py-4">
                        <p className="max-w-[380px] truncate text-sm text-muted-foreground">
                          {category.description}
                        </p>
                      </td>

                      {/* Courses */}
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <BookOpen className="h-4 w-4 text-muted-foreground" />

                          <span className="font-semibold">
                            {category.courses}
                          </span>
                        </div>
                      </td>

                      {/* Students */}
                      <td className="px-6 py-4 text-center">
                        <span className="font-medium">
                          {category.students.toLocaleString()}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
                            category.status
                          )}`}
                        >
                          {category.status ===
                          "Active" ? (
                            <CheckCircle2 className="h-3.5 w-3.5" />
                          ) : (
                            <XCircle className="h-3.5 w-3.5" />
                          )}

                          {category.status}
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
                            className="w-52"
                          >
                            <DropdownMenuItem
                              onClick={() =>
                                handleView(
                                  category.id
                                )
                              }
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Category
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              onClick={() =>
                                handleEdit(
                                  category.id
                                )
                              }
                            >
                              <Pencil className="mr-2 h-4 w-4" />
                              Edit Category
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                              onClick={() =>
                                handleToggleStatus(
                                  category.id
                                )
                              }
                            >
                              {category.status ===
                              "Active" ? (
                                <>
                                  <XCircle className="mr-2 h-4 w-4" />
                                  Deactivate
                                </>
                              ) : (
                                <>
                                  <CheckCircle2 className="mr-2 h-4 w-4" />
                                  Activate
                                </>
                              )}
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                              onClick={() =>
                                handleDelete(
                                  category.id
                                )
                              }
                              className="text-red-500 focus:text-red-500"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Category
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
                    colSpan={6}
                    className="px-6 py-16 text-center"
                  >
                    <div className="mx-auto flex max-w-sm flex-col items-center">
                      <div className="rounded-full bg-muted p-4">
                        <FolderTree className="h-6 w-6 text-muted-foreground" />
                      </div>

                      <h3 className="mt-4 font-semibold">
                        No categories found
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

        {/* =================================== */}
        {/* PAGINATION */}
        {/* =================================== */}

        <div className="flex flex-col gap-3 border-t px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-medium text-foreground">
              {filteredCategories.length === 0
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
                filteredCategories.length
              )}
            </span>{" "}
            of{" "}
            <span className="font-medium text-foreground">
              {filteredCategories.length}
            </span>{" "}
            categories
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
            Category management
          </p>

          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            Categories currently use placeholder data.
            Add, edit, activate, deactivate, and delete
            actions will be connected to the category API
            once the backend endpoints are implemented.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;