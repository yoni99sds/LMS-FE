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
} from "lucide-react";

import {
  useMemo,
  useState,
} from "react";

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

/* ============================================ */
/* TYPES */
/* ============================================ */

type UserRole =
  | "Admin"
  | "Instructor"
  | "Student";

type UserStatus =
  | "Active"
  | "Pending"
  | "Suspended";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  courses: number;
  joinedAt: string;
  lastLogin: string;
}

/* ============================================ */
/* MOCK DATA */
/* ============================================ */
/*
 * New users should normally be created with
 * status: "Pending".
 *
 * The admin can then:
 *
 * Pending -> Active
 * Pending -> Suspended
 *
 * Existing users can also be changed:
 *
 * Active -> Suspended
 * Suspended -> Active
 */

const initialUsers: User[] = [
  {
    id: "user-001",
    firstName: "Yonas",
    lastName: "Gebrehiwot",
    email: "yonasgeb09@gmail.com",
    role: "Admin",
    status: "Active",
    courses: 0,
    joinedAt: "Sep 17, 2026",
    lastLogin: "Today",
  },
  {
    id: "user-002",
    firstName: "John",
    lastName: "Instructor",
    email: "instructor@edumaster.com",
    role: "Instructor",
    status: "Active",
    courses: 8,
    joinedAt: "Sep 12, 2026",
    lastLogin: "Today",
  },
  {
    id: "user-003",
    firstName: "Abel",
    lastName: "Tesfaye",
    email: "abel@example.com",
    role: "Student",
    status: "Pending",
    courses: 0,
    joinedAt: "Sep 10, 2026",
    lastLogin: "Never",
  },
  {
    id: "user-004",
    firstName: "Sara",
    lastName: "Mohammed",
    email: "sara@example.com",
    role: "Student",
    status: "Active",
    courses: 6,
    joinedAt: "Sep 08, 2026",
    lastLogin: "Yesterday",
  },
  {
    id: "user-005",
    firstName: "Michael",
    lastName: "Brown",
    email: "michael@example.com",
    role: "Instructor",
    status: "Pending",
    courses: 0,
    joinedAt: "Sep 05, 2026",
    lastLogin: "Never",
  },
  {
    id: "user-006",
    firstName: "Hana",
    lastName: "Alemu",
    email: "hana@example.com",
    role: "Student",
    status: "Suspended",
    courses: 2,
    joinedAt: "Sep 02, 2026",
    lastLogin: "5 days ago",
  },
  {
    id: "user-007",
    firstName: "Daniel",
    lastName: "Wilson",
    email: "daniel@example.com",
    role: "Instructor",
    status: "Active",
    courses: 5,
    joinedAt: "Aug 29, 2026",
    lastLogin: "2 days ago",
  },
  {
    id: "user-008",
    firstName: "Marta",
    lastName: "Kebede",
    email: "marta@example.com",
    role: "Student",
    status: "Suspended",
    courses: 3,
    joinedAt: "Aug 26, 2026",
    lastLogin: "1 week ago",
  },
  {
    id: "user-009",
    firstName: "Samuel",
    lastName: "Bekele",
    email: "samuel@example.com",
    role: "Student",
    status: "Pending",
    courses: 0,
    joinedAt: "Aug 22, 2026",
    lastLogin: "Never",
  },
  {
    id: "user-010",
    firstName: "Rachel",
    lastName: "Johnson",
    email: "rachel@example.com",
    role: "Student",
    status: "Active",
    courses: 5,
    joinedAt: "Aug 18, 2026",
    lastLogin: "Yesterday",
  },
  {
    id: "user-011",
    firstName: "Peter",
    lastName: "Smith",
    email: "peter@example.com",
    role: "Instructor",
    status: "Suspended",
    courses: 4,
    joinedAt: "Aug 15, 2026",
    lastLogin: "2 weeks ago",
  },
  {
    id: "user-012",
    firstName: "Meron",
    lastName: "Haile",
    email: "meron@example.com",
    role: "Student",
    status: "Active",
    courses: 8,
    joinedAt: "Aug 10, 2026",
    lastLogin: "Today",
  },
  {
    id: "user-013",
    firstName: "Thomas",
    lastName: "Anderson",
    email: "thomas@example.com",
    role: "Student",
    status: "Active",
    courses: 3,
    joinedAt: "Aug 07, 2026",
    lastLogin: "3 days ago",
  },
  {
    id: "user-014",
    firstName: "Liya",
    lastName: "Tadesse",
    email: "liya@example.com",
    role: "Instructor",
    status: "Pending",
    courses: 0,
    joinedAt: "Aug 03, 2026",
    lastLogin: "Never",
  },
  {
    id: "user-015",
    firstName: "David",
    lastName: "Miller",
    email: "david@example.com",
    role: "Student",
    status: "Active",
    courses: 5,
    joinedAt: "Jul 29, 2026",
    lastLogin: "Yesterday",
  },
  {
    id: "user-016",
    firstName: "Bethlehem",
    lastName: "Worku",
    email: "bethlehem@example.com",
    role: "Student",
    status: "Pending",
    courses: 0,
    joinedAt: "Jul 25, 2026",
    lastLogin: "Never",
  },
];

/* ============================================ */
/* COMPONENT */
/* ============================================ */

const UsersPage = () => {
  const navigate = useNavigate();

  /* ============================================ */
  /* STATE */
  /* ============================================ */

  const [users, setUsers] =
    useState<User[]>(initialUsers);

  const [search, setSearch] =
    useState("");

  const [roleFilter, setRoleFilter] =
    useState<string>("all");

  const [statusFilter, setStatusFilter] =
    useState<string>("all");

  const [currentPage, setCurrentPage] =
    useState(1);

  const itemsPerPage = 8;

  /* ============================================ */
  /* FILTERING */
  /* ============================================ */

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const fullName =
        `${user.firstName} ${user.lastName}`.toLowerCase();

      const searchValue =
        search.toLowerCase().trim();

      const matchesSearch =
        !searchValue ||
        fullName.includes(searchValue) ||
        user.email
          .toLowerCase()
          .includes(searchValue);

      const matchesRole =
        roleFilter === "all" ||
        user.role === roleFilter;

      const matchesStatus =
        statusFilter === "all" ||
        user.status === statusFilter;

      return (
        matchesSearch &&
        matchesRole &&
        matchesStatus
      );
    });
  }, [
    users,
    search,
    roleFilter,
    statusFilter,
  ]);

  /* ============================================ */
  /* PAGINATION */
  /* ============================================ */

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredUsers.length /
        itemsPerPage
    )
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages
  );

  const paginatedUsers = useMemo(() => {
    const start =
      (safeCurrentPage - 1) *
      itemsPerPage;

    return filteredUsers.slice(
      start,
      start + itemsPerPage
    );
  }, [
    filteredUsers,
    safeCurrentPage,
  ]);

  const startItem =
    filteredUsers.length === 0
      ? 0
      : (safeCurrentPage - 1) *
          itemsPerPage +
        1;

  const endItem = Math.min(
    safeCurrentPage * itemsPerPage,
    filteredUsers.length
  );

  /* ============================================ */
  /* STATISTICS */
  /* ============================================ */

  const totalUsers =
    users.length;

  const activeUsers =
    users.filter(
      (user) =>
        user.status === "Active"
    ).length;

  const pendingUsers =
    users.filter(
      (user) =>
        user.status === "Pending"
    ).length;

  const suspendedUsers =
    users.filter(
      (user) =>
        user.status === "Suspended"
    ).length;

  const instructors =
    users.filter(
      (user) =>
        user.role === "Instructor"
    ).length;

  const students =
    users.filter(
      (user) =>
        user.role === "Student"
    ).length;

  const admins =
    users.filter(
      (user) =>
        user.role === "Admin"
    ).length;

  /* ============================================ */
  /* HANDLERS */
  /* ============================================ */

  const handleAddUser = () => {
    console.log(
      "Add user clicked"
    );

    /*
     * Later this will navigate to
     * an Add User page or open a dialog.
     */
  };

  const handleViewUser = (
    id: string
  ) => {
    navigate(`/admin/users/${id}`);
  };

  const handleEditUser = (
    id: string
  ) => {
    console.log(
      "Edit user:",
      id
    );
  };

  const handleDeleteUser = (
    id: string
  ) => {
    console.log(
      "Delete user:",
      id
    );
  };

  /* ============================================ */
  /* STATUS UPDATE */
  /* ============================================ */

  const handleStatusChange = (
    id: string,
    newStatus: UserStatus
  ) => {
    setUsers((currentUsers) =>
      currentUsers.map((user) =>
        user.id === id
          ? {
              ...user,
              status: newStatus,
            }
          : user
      )
    );

    console.log(
      `User ${id} status changed to ${newStatus}`
    );
  };

  /* ============================================ */
  /* APPROVE USER */
  /* ============================================ */

  const handleApproveUser = (
    id: string
  ) => {
    handleStatusChange(
      id,
      "Active"
    );
  };

  /* ============================================ */
  /* SUSPEND USER */
  /* ============================================ */

  const handleSuspendUser = (
    id: string
  ) => {
    handleStatusChange(
      id,
      "Suspended"
    );
  };

  /* ============================================ */
  /* REACTIVATE USER */
  /* ============================================ */

  const handleActivateUser = (
    id: string
  ) => {
    handleStatusChange(
      id,
      "Active"
    );
  };

  /* ============================================ */
  /* FILTER HANDLERS */
  /* ============================================ */

  const handleRoleChange = (
    value: string
  ) => {
    setRoleFilter(value);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (
    value: string
  ) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handleSearchChange = (
    value: string
  ) => {
    setSearch(value);
    setCurrentPage(1);
  };

  /* ============================================ */
  /* PAGINATION HANDLERS */
  /* ============================================ */

  const handlePreviousPage = () => {
    setCurrentPage((page) =>
      Math.max(1, page - 1)
    );
  };

  const handleNextPage = () => {
    setCurrentPage((page) =>
      Math.min(
        totalPages,
        page + 1
      )
    );
  };

  /* ============================================ */
  /* STATUS HELPERS */
  /* ============================================ */

  const getStatusClasses = (
    status: UserStatus
  ) => {
    if (status === "Active") {
      return "bg-green-500/10 text-green-600";
    }

    if (status === "Pending") {
      return "bg-yellow-500/10 text-yellow-600";
    }

    return "bg-red-500/10 text-red-500";
  };

  const getStatusIcon = (
    status: UserStatus
  ) => {
    if (status === "Active") {
      return CheckCircle2;
    }

    if (status === "Pending") {
      return Clock3;
    }

    return Ban;
  };

  const getRoleClasses = (
    role: UserRole
  ) => {
    if (role === "Admin") {
      return "bg-purple-500/10 text-purple-600";
    }

    if (role === "Instructor") {
      return "bg-blue-500/10 text-blue-600";
    }

    return "bg-primary/10 text-primary";
  };

  const getInitials = (
    firstName: string,
    lastName: string
  ) => {
    return `${firstName.charAt(
      0
    )}${lastName.charAt(0)}`.toUpperCase();
  };

  /* ============================================ */
  /* RETURN */
  /* ============================================ */

  return (
    <div className="space-y-6">
      {/* ====================================== */}
      {/* HEADER */}
      {/* ====================================== */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Users
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage students, instructors,
            and administrators.
          </p>
        </div>

        <Button
          onClick={handleAddUser}
          className="w-full rounded-xl sm:w-auto"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      {/* ====================================== */}
      {/* STATISTICS */}
      {/* ====================================== */}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* TOTAL */}

        <Card className="rounded-xl">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Users
                </p>

                <p className="mt-2 text-2xl font-bold">
                  {totalUsers}
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

        {/* ACTIVE */}

        <Card className="rounded-xl">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Active Users
                </p>

                <p className="mt-2 text-2xl font-bold">
                  {activeUsers}
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

        {/* PENDING */}

        <Card className="rounded-xl">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Pending
                </p>

                <p className="mt-2 text-2xl font-bold">
                  {pendingUsers}
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

        {/* SUSPENDED */}

        <Card className="rounded-xl">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Suspended
                </p>

                <p className="mt-2 text-2xl font-bold">
                  {suspendedUsers}
                </p>

                <p className="mt-1 text-xs text-red-500">
                  Rejected or suspended
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
                <UserX className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ====================================== */}
      {/* SECONDARY STATISTICS */}
      {/* ====================================== */}

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="rounded-xl">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600">
                <ShieldCheck className="h-5 w-5" />
              </div>

              <div>
                <p className="text-xs text-muted-foreground">
                  Administrators
                </p>

                <p className="text-lg font-bold">
                  {admins}
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
                <p className="text-xs text-muted-foreground">
                  Instructors
                </p>

                <p className="text-lg font-bold">
                  {instructors}
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
                <p className="text-xs text-muted-foreground">
                  Students
                </p>

                <p className="text-lg font-bold">
                  {students}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ====================================== */}
      {/* FILTERS */}
      {/* ====================================== */}

      <Card className="rounded-xl">
        <CardContent className="p-4">
          <div className="flex flex-col gap-3 lg:flex-row">
            {/* SEARCH */}

            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                value={search}
                onChange={(event) =>
                  handleSearchChange(
                    event.target.value
                  )
                }
                placeholder="Search users by name or email..."
                className="h-10 rounded-xl pl-9"
              />
            </div>

            {/* ROLE */}

            <Select
              value={roleFilter}
              onValueChange={
                handleRoleChange
              }
            >
              <SelectTrigger className="h-10 w-full rounded-xl lg:w-[180px]">
                <SelectValue placeholder="All Roles" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">
                  All Roles
                </SelectItem>

                <SelectItem value="Admin">
                  Admin
                </SelectItem>

                <SelectItem value="Instructor">
                  Instructor
                </SelectItem>

                <SelectItem value="Student">
                  Student
                </SelectItem>
              </SelectContent>
            </Select>

            {/* STATUS */}

            <Select
              value={statusFilter}
              onValueChange={
                handleStatusFilterChange
              }
            >
              <SelectTrigger className="h-10 w-full rounded-xl lg:w-[180px]">
                <SelectValue placeholder="All Statuses" />
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
          </div>
        </CardContent>
      </Card>

      {/* ====================================== */}
      {/* USERS TABLE */}
      {/* ====================================== */}

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
              {paginatedUsers.length > 0 ? (
                paginatedUsers.map(
                  (user) => {
                    const StatusIcon =
                      getStatusIcon(
                        user.status
                      );

                    return (
                      <tr
                        key={user.id}
                        className="transition hover:bg-muted/20"
                      >
                        {/* USER */}

                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-semibold text-primary">
                              {getInitials(
                                user.firstName,
                                user.lastName
                              )}
                            </div>

                            <div className="min-w-0">
                              <button
                                type="button"
                                onClick={() =>
                                  handleViewUser(
                                    user.id
                                  )
                                }
                                className="block max-w-[220px] truncate text-left text-sm font-semibold hover:text-primary"
                              >
                                {
                                  user.firstName
                                }{" "}
                                {
                                  user.lastName
                                }
                              </button>

                              <p className="mt-0.5 max-w-[220px] truncate text-xs text-muted-foreground">
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* ROLE */}

                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getRoleClasses(
                              user.role
                            )}`}
                          >
                            {user.role}
                          </span>
                        </td>

                        {/* STATUS */}

                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
                              user.status
                            )}`}
                          >
                            <StatusIcon className="h-3.5 w-3.5" />

                            {user.status}
                          </span>
                        </td>

                        {/* COURSES */}

                        <td className="px-6 py-4">
                          <span className="text-sm font-medium">
                            {user.courses}
                          </span>
                        </td>

                        {/* JOINED */}

                        <td className="px-6 py-4">
                          <span className="text-sm text-muted-foreground">
                            {user.joinedAt}
                          </span>
                        </td>

                        {/* LAST LOGIN */}

                        <td className="px-6 py-4">
                          <span className="text-sm text-muted-foreground">
                            {user.lastLogin}
                          </span>
                        </td>

                        {/* ACTIONS */}

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
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                              align="end"
                              className="w-52"
                            >
                              {/* VIEW */}

                              <DropdownMenuItem
                                onClick={() =>
                                  handleViewUser(
                                    user.id
                                  )
                                }
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                View User
                              </DropdownMenuItem>

                              {/* EDIT */}

                              <DropdownMenuItem
                                onClick={() =>
                                  handleEditUser(
                                    user.id
                                  )
                                }
                              >
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit User
                              </DropdownMenuItem>

                              <DropdownMenuSeparator />

                              {/* PENDING */}

                              {user.status !==
                                "Pending" && (
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleStatusChange(
                                      user.id,
                                      "Pending"
                                    )
                                  }
                                >
                                  <Clock3 className="mr-2 h-4 w-4 text-yellow-600" />
                                  Set Pending
                                </DropdownMenuItem>
                              )}

                              {/* ACTIVE */}

                              {user.status !==
                                "Active" && (
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleActivateUser(
                                      user.id
                                    )
                                  }
                                >
                                  <CheckCircle2 className="mr-2 h-4 w-4 text-green-600" />
                                  Set Active
                                </DropdownMenuItem>
                              )}

                              {/* SUSPENDED */}

                              {user.status !==
                                "Suspended" && (
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleSuspendUser(
                                      user.id
                                    )
                                  }
                                  className="text-red-500 focus:text-red-500"
                                >
                                  <Ban className="mr-2 h-4 w-4" />
                                  Suspend User
                                </DropdownMenuItem>
                              )}

                              <DropdownMenuSeparator />

                              {/* DELETE */}

                              <DropdownMenuItem
                                onClick={() =>
                                  handleDeleteUser(
                                    user.id
                                  )
                                }
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
                  }
                )
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-16 text-center"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <div className="rounded-full bg-muted p-4">
                        <Users className="h-6 w-6 text-muted-foreground" />
                      </div>

                      <h3 className="mt-4 text-sm font-semibold">
                        No users found
                      </h3>

                      <p className="mt-1 text-sm text-muted-foreground">
                        Try changing your search
                        or filters.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ====================================== */}
      {/* PAGINATION */}
      {/* ====================================== */}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-medium text-foreground">
            {startItem}
          </span>{" "}
          to{" "}
          <span className="font-medium text-foreground">
            {endItem}
          </span>{" "}
          of{" "}
          <span className="font-medium text-foreground">
            {filteredUsers.length}
          </span>{" "}
          users
        </p>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={
              handlePreviousPage
            }
            disabled={
              safeCurrentPage === 1
            }
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
            onClick={
              handleNextPage
            }
            disabled={
              safeCurrentPage ===
              totalPages
            }
            className="rounded-xl"
          >
            Next
            <ChevronRight className="mr-1 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* ====================================== */}
      {/* ADMIN NOTE */}
      {/* ====================================== */}

      <div className="flex items-start gap-3 rounded-xl border bg-muted/20 p-4">
        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />

        <div>
          <p className="text-sm font-medium">
            User approval workflow
          </p>

          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            New users should initially have a
            Pending status. Administrators can
            approve users by setting their status
            to Active or reject/suspend them by
            setting their status to Suspended.
            Status changes are currently stored
            locally in the admin interface and
            will be connected to the backend API
            later.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;