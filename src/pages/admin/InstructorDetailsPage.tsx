import {
  ArrowLeft,
  Mail,
  Shield,
  CalendarDays,
  Clock,
  CheckCircle2,
  XCircle,
  Edit,
  UserX,
  UserCheck,
  BookOpen,
  Users,
  DollarSign,
  Star,
  Award,
  BarChart3,
  MoreHorizontal,
  Eye,
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Course {
  id: string;
  title: string;
  students: number;
  rating: number;
  revenue: number;
  status: "Published" | "Draft";
}

const InstructorDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  /*
   * ============================================
   * TEMPORARY INSTRUCTOR DATA
   * ============================================
   *
   * This will later be replaced with the
   * backend instructor API.
   */
  const instructor = {
    id: id || "1",
    firstName: "John",
    lastName: "Instructor",
    email: "instructor@edumaster.com",
    profilePicture: "",
    status: "Active",
    role: "Instructor",
    isEmailVerified: true,
    isMfaActive: false,
    joinedAt: "January 15, 2026",
    lastLogin: "September 17, 2026",

    bio: "Experienced instructor focused on helping students build practical skills through structured and engaging online courses.",

    specialization:
      "Software Development & Web Technologies",

    courses: 12,
    students: 486,
    rating: 4.8,
    totalReviews: 127,
    revenue: 12450,
    completionRate: 84,
  };

  /*
   * ============================================
   * TEMPORARY COURSE DATA
   * ============================================
   */
  const courses: Course[] = [
    {
      id: "course-1",
      title: "Complete Web Development Bootcamp",
      students: 184,
      rating: 4.9,
      revenue: 4820,
      status: "Published",
    },
    {
      id: "course-2",
      title: "React & TypeScript Masterclass",
      students: 126,
      rating: 4.8,
      revenue: 3650,
      status: "Published",
    },
    {
      id: "course-3",
      title: "Node.js & Express API Development",
      students: 98,
      rating: 4.7,
      revenue: 2480,
      status: "Published",
    },
    {
      id: "course-4",
      title: "MongoDB for Modern Applications",
      students: 52,
      rating: 4.6,
      revenue: 1500,
      status: "Draft",
    },
  ];

  const fullName = `${instructor.firstName} ${instructor.lastName}`;

  const initials =
    `${instructor.firstName.charAt(
      0
    )}${instructor.lastName.charAt(0)}`
      .toUpperCase();

  /*
   * ============================================
   * ACTIONS
   * ============================================
   */

  const handleBack = () => {
    navigate("/admin/instructors");
  };

  const handleEdit = () => {
    console.log("Edit instructor:", instructor.id);
  };

  const handleSuspend = () => {
    console.log("Suspend instructor:", instructor.id);
  };

  const handleActivate = () => {
    console.log("Activate instructor:", instructor.id);
  };

  const handleViewCourse = (courseId: string) => {
    navigate(`/admin/courses/${courseId}`);
  };

  return (
    <div className="space-y-6">
      {/* ===================================== */}
      {/* PAGE HEADER */}
      {/* ===================================== */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={handleBack}
            className="rounded-xl"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Instructor Details
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              View and manage instructor information.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            onClick={handleEdit}
            className="rounded-xl"
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit Instructor
          </Button>

          {instructor.status === "Active" ? (
            <Button
              variant="destructive"
              onClick={handleSuspend}
              className="rounded-xl"
            >
              <UserX className="mr-2 h-4 w-4" />
              Suspend
            </Button>
          ) : (
            <Button
              onClick={handleActivate}
              className="rounded-xl"
            >
              <UserCheck className="mr-2 h-4 w-4" />
              Activate
            </Button>
          )}
        </div>
      </div>

      {/* ===================================== */}
      {/* PROFILE HEADER */}
      {/* ===================================== */}

      <Card className="overflow-hidden">
        <div className="h-28 bg-primary/10" />

        <CardContent className="-mt-14 px-6 pb-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            {/* Profile */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-4 border-background bg-primary text-3xl font-bold text-primary-foreground shadow-lg">
                {instructor.profilePicture ? (
                  <img
                    src={instructor.profilePicture}
                    alt={fullName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  initials
                )}
              </div>

              <div className="pb-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-2xl font-bold">
                    {fullName}
                  </h2>

                  <span className="rounded-full bg-green-500/10 px-2.5 py-1 text-xs font-semibold text-green-600">
                    {instructor.status}
                  </span>
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Mail className="h-4 w-4" />
                    {instructor.email}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Shield className="h-4 w-4" />
                    {instructor.role}
                  </span>
                </div>

                <p className="mt-2 text-sm text-muted-foreground">
                  {instructor.specialization}
                </p>
              </div>
            </div>

            {/* Verification */}
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2 rounded-xl border px-3 py-2">
                {instructor.isEmailVerified ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-500" />
                )}

                <span className="text-xs font-medium">
                  {instructor.isEmailVerified
                    ? "Email Verified"
                    : "Email Not Verified"}
                </span>
              </div>

              <div className="flex items-center gap-2 rounded-xl border px-3 py-2">
                <Shield className="h-4 w-4 text-muted-foreground" />

                <span className="text-xs font-medium">
                  {instructor.isMfaActive
                    ? "MFA Enabled"
                    : "MFA Disabled"}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ===================================== */}
      {/* PERFORMANCE STATISTICS */}
      {/* ===================================== */}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Courses */}
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Total Courses
                </p>

                <p className="mt-1 text-2xl font-bold">
                  {instructor.courses}
                </p>
              </div>

              <div className="rounded-xl bg-primary/10 p-3 text-primary">
                <BookOpen className="h-5 w-5" />
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
                  {instructor.students.toLocaleString()}
                </p>
              </div>

              <div className="rounded-xl bg-blue-500/10 p-3 text-blue-600">
                <Users className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rating */}
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Average Rating
                </p>

                <div className="mt-1 flex items-center gap-2">
                  <p className="text-2xl font-bold">
                    {instructor.rating.toFixed(1)}
                  </p>

                  <Star className="h-5 w-5 fill-current text-yellow-500" />
                </div>
              </div>

              <div className="rounded-xl bg-yellow-500/10 p-3 text-yellow-600">
                <Award className="h-5 w-5" />
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
                  Total Revenue
                </p>

                <p className="mt-1 text-2xl font-bold">
                  ${instructor.revenue.toLocaleString()}
                </p>
              </div>

              <div className="rounded-xl bg-green-500/10 p-3 text-green-600">
                <DollarSign className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ===================================== */}
      {/* MAIN CONTENT */}
      {/* ===================================== */}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* ================================= */}
        {/* ABOUT */}
        {/* ================================= */}

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>About Instructor</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-sm leading-7 text-muted-foreground">
              {instructor.bio}
            </p>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <p className="text-xs text-muted-foreground">
                  Specialization
                </p>

                <p className="mt-1 font-medium">
                  {instructor.specialization}
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">
                  Total Reviews
                </p>

                <p className="mt-1 font-medium">
                  {instructor.totalReviews}
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">
                  Completion Rate
                </p>

                <p className="mt-1 font-medium">
                  {instructor.completionRate}%
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">
                  Instructor ID
                </p>

                <p className="mt-1 break-all font-mono text-xs font-medium">
                  {instructor.id}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ================================= */}
        {/* ACCOUNT INFORMATION */}
        {/* ================================= */}

        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-muted p-2">
                <CalendarDays className="h-4 w-4" />
              </div>

              <div>
                <p className="text-xs text-muted-foreground">
                  Joined
                </p>

                <p className="mt-1 text-sm font-medium">
                  {instructor.joinedAt}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-muted p-2">
                <Clock className="h-4 w-4" />
              </div>

              <div>
                <p className="text-xs text-muted-foreground">
                  Last Login
                </p>

                <p className="mt-1 text-sm font-medium">
                  {instructor.lastLogin}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-muted p-2">
                <Shield className="h-4 w-4" />
              </div>

              <div>
                <p className="text-xs text-muted-foreground">
                  Account Role
                </p>

                <p className="mt-1 text-sm font-medium">
                  {instructor.role}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ===================================== */}
      {/* ANALYTICS OVERVIEW */}
      {/* ===================================== */}

      <div>
        <h2 className="mb-4 text-lg font-semibold">
          Performance Overview
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-primary/10 p-3 text-primary">
                  <BarChart3 className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Student Completion
                  </p>

                  <p className="mt-1 text-xl font-bold">
                    {instructor.completionRate}%
                  </p>
                </div>
              </div>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{
                    width: `${instructor.completionRate}%`,
                  }}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-yellow-500/10 p-3 text-yellow-600">
                  <Star className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Average Rating
                  </p>

                  <p className="mt-1 text-xl font-bold">
                    {instructor.rating.toFixed(1)} / 5
                  </p>
                </div>
              </div>

              <p className="mt-4 text-xs text-muted-foreground">
                Based on {instructor.totalReviews} reviews.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-green-500/10 p-3 text-green-600">
                  <DollarSign className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Revenue Generated
                  </p>

                  <p className="mt-1 text-xl font-bold">
                    ${instructor.revenue.toLocaleString()}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-xs text-muted-foreground">
                Total instructor course revenue.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ===================================== */}
      {/* COURSES */}
      {/* ===================================== */}

      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Instructor Courses</CardTitle>

            <p className="mt-1 text-sm text-muted-foreground">
              Courses created and managed by this instructor.
            </p>
          </div>

          <Button
            variant="outline"
            className="hidden rounded-xl sm:flex"
            onClick={() =>
              navigate("/admin/courses")
            }
          >
            View All Courses
          </Button>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px]">
              <thead className="border-y bg-muted/30">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Course
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

                  <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {courses.map((course) => (
                  <tr
                    key={course.id}
                    className="transition hover:bg-muted/20"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                          <BookOpen className="h-5 w-5" />
                        </div>

                        <div className="min-w-0">
                          <p className="max-w-[300px] truncate font-medium">
                            {course.title}
                          </p>

                          <p className="mt-1 text-xs text-muted-foreground">
                            ID: {course.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <Users className="h-4 w-4 text-muted-foreground" />

                        <span className="font-medium">
                          {course.students.toLocaleString()}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <Star className="h-4 w-4 fill-current text-yellow-500" />

                        <span className="font-medium">
                          {course.rating.toFixed(1)}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />

                        <span className="font-semibold">
                          {course.revenue.toLocaleString()}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-center">
                      <span
                        className={`
                          inline-flex
                          rounded-full
                          px-2.5
                          py-1
                          text-xs
                          font-semibold
                          ${
                            course.status ===
                            "Published"
                              ? "bg-green-500/10 text-green-600"
                              : "bg-yellow-500/10 text-yellow-600"
                          }
                        `}
                      >
                        {course.status}
                      </span>
                    </td>

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

                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() =>
                              handleViewCourse(
                                course.id
                              )
                            }
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Course
                          </DropdownMenuItem>

                          <DropdownMenuSeparator />

                          <DropdownMenuItem
                            onClick={() =>
                              console.log(
                                "Edit course:",
                                course.id
                              )
                            }
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Course
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border-t p-4 sm:hidden">
            <Button
              variant="outline"
              className="w-full rounded-xl"
              onClick={() =>
                navigate("/admin/courses")
              }
            >
              View All Courses
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* ===================================== */}
      {/* ADMIN NOTE */}
      {/* ===================================== */}

      <div className="rounded-xl border bg-muted/20 p-4">
        <div className="flex items-start gap-3">
          <Shield className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

          <div>
            <p className="text-sm font-medium">
              Instructor management
            </p>

            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              The instructor information and course
              statistics currently shown are placeholder
              data. These values will be connected to the
              backend instructor and course APIs later.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorDetailsPage;