import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock,
  DollarSign,
  Edit,
  Eye,
  GraduationCap,
  MoreHorizontal,
  PlayCircle,
  ShieldCheck,
  Star,
  Trash2,
  User,
  Users,
  XCircle,
  AlertCircle,
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

type CourseStatus =
  | "Published"
  | "Pending"
  | "Draft"
  | "Rejected";

interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: "Video" | "Article" | "Quiz";
  freePreview: boolean;
}

interface Review {
  id: string;
  student: string;
  rating: number;
  comment: string;
  date: string;
}

const CourseDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  /*
   * ============================================
   * TEMPORARY COURSE DATA
   * ============================================
   *
   * This will later come from:
   *
   * GET /api/admin/courses/:id
   */

  const course = {
    id: id || "course-001",
    title: "Complete Web Development Bootcamp",

    description:
      "Learn modern web development from fundamentals to advanced projects. This course covers HTML, CSS, JavaScript, React, Node.js, Express, MongoDB, REST APIs, authentication, deployment, and real-world application development.",

    shortDescription:
      "Learn modern web development through practical projects and real-world applications.",

    category: "Web Development",

    level: "Intermediate",

    language: "English",

    status: "Published" as CourseStatus,

    price: 59,

    originalPrice: 99,

    students: 184,

    rating: 4.9,

    reviews: 48,

    revenue: 4820,

    lessons: 64,

    duration: "18h 45m",

    certificate: true,

    createdAt: "January 20, 2026",

    updatedAt: "September 12, 2026",

    instructor: {
      id: "1",
      firstName: "John",
      lastName: "Instructor",
      email: "instructor@edumaster.com",
      specialization:
        "Software Development & Web Technologies",
      profilePicture: "",
    },
  };

  /*
   * ============================================
   * TEMPORARY LESSON DATA
   * ============================================
   */

  const lessons: Lesson[] = [
    {
      id: "lesson-001",
      title: "Introduction to Web Development",
      duration: "18 min",
      type: "Video",
      freePreview: true,
    },
    {
      id: "lesson-002",
      title: "How the Web Works",
      duration: "24 min",
      type: "Video",
      freePreview: true,
    },
    {
      id: "lesson-003",
      title: "HTML Fundamentals",
      duration: "42 min",
      type: "Video",
      freePreview: false,
    },
    {
      id: "lesson-004",
      title: "Semantic HTML",
      duration: "31 min",
      type: "Video",
      freePreview: false,
    },
    {
      id: "lesson-005",
      title: "CSS Fundamentals",
      duration: "48 min",
      type: "Video",
      freePreview: false,
    },
    {
      id: "lesson-006",
      title: "CSS Layout & Flexbox",
      duration: "52 min",
      type: "Video",
      freePreview: false,
    },
    {
      id: "lesson-007",
      title: "JavaScript Fundamentals",
      duration: "1h 12m",
      type: "Video",
      freePreview: false,
    },
    {
      id: "lesson-008",
      title: "JavaScript Practice Quiz",
      duration: "15 min",
      type: "Quiz",
      freePreview: false,
    },
    {
      id: "lesson-009",
      title: "Introduction to React",
      duration: "47 min",
      type: "Video",
      freePreview: false,
    },
    {
      id: "lesson-010",
      title: "React Components",
      duration: "56 min",
      type: "Video",
      freePreview: false,
    },
  ];

  /*
   * ============================================
   * TEMPORARY REVIEW DATA
   * ============================================
   */

  const reviews: Review[] = [
    {
      id: "review-001",
      student: "Michael Adams",
      rating: 5,
      comment:
        "Excellent course. The practical projects made the concepts much easier to understand.",
      date: "Sep 14, 2026",
    },
    {
      id: "review-002",
      student: "Sarah Wilson",
      rating: 5,
      comment:
        "Very well structured and easy to follow. I especially enjoyed the React and Node sections.",
      date: "Sep 09, 2026",
    },
    {
      id: "review-003",
      student: "Daniel Brown",
      rating: 4,
      comment:
        "Great content overall. Some of the advanced sections could use more examples.",
      date: "Sep 03, 2026",
    },
  ];

  /*
   * ============================================
   * ACTIONS
   * ============================================
   */

  const handleBack = () => {
    navigate("/admin/courses");
  };

  const handleEdit = () => {
    console.log("Edit course:", course.id);
  };

  const handleApprove = () => {
    console.log("Approve course:", course.id);
  };

  const handleReject = () => {
    console.log("Reject course:", course.id);
  };

  const handlePublish = () => {
    console.log("Publish course:", course.id);
  };

  const handleDelete = () => {
    console.log("Delete course:", course.id);
  };

  const handleInstructor = () => {
    navigate(
      `/admin/instructors/${course.instructor.id}`
    );
  };

  /*
   * ============================================
   * STATUS HELPERS
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

  const getLessonIcon = (
    type: Lesson["type"]
  ) => {
    switch (type) {
      case "Video":
        return (
          <PlayCircle className="h-4 w-4" />
        );

      case "Quiz":
        return (
          <CheckCircle2 className="h-4 w-4" />
        );

      case "Article":
        return (
          <BookOpen className="h-4 w-4" />
        );

      default:
        return (
          <BookOpen className="h-4 w-4" />
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* ===================================== */}
      {/* HEADER */}
      {/* ===================================== */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
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
              Course Details
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Review and manage this course.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            onClick={handleEdit}
            className="rounded-xl"
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit Course
          </Button>

          {course.status === "Pending" && (
            <>
              <Button
                onClick={handleApprove}
                className="rounded-xl"
              >
                <ShieldCheck className="mr-2 h-4 w-4" />
                Approve
              </Button>

              <Button
                variant="destructive"
                onClick={handleReject}
                className="rounded-xl"
              >
                <XCircle className="mr-2 h-4 w-4" />
                Reject
              </Button>
            </>
          )}

          {course.status === "Draft" && (
            <Button
              onClick={handlePublish}
              className="rounded-xl"
            >
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Publish
            </Button>
          )}
        </div>
      </div>

      {/* ===================================== */}
      {/* COURSE HERO */}
      {/* ===================================== */}

      <Card className="overflow-hidden">
        <div className="grid lg:grid-cols-[320px_1fr]">
          {/* Course Image Placeholder */}
          <div className="flex min-h-[230px] items-center justify-center bg-primary/10 lg:min-h-[280px]">
            <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-primary text-primary-foreground shadow-lg">
              <GraduationCap className="h-12 w-12" />
            </div>
          </div>

          <div className="p-6 lg:p-8">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                  course.status
                )}`}
              >
                {course.status}
              </span>

              <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
                {course.category}
              </span>

              <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
                {course.level}
              </span>
            </div>

            <h2 className="mt-4 text-2xl font-bold leading-tight lg:text-3xl">
              {course.title}
            </h2>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
              {course.shortDescription}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-muted-foreground">
              <button
                type="button"
                onClick={handleInstructor}
                className="flex items-center gap-2 font-medium text-foreground hover:text-primary"
              >
                <User className="h-4 w-4" />
                {course.instructor.firstName}{" "}
                {course.instructor.lastName}
              </button>

              <span className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                {course.createdAt}
              </span>

              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {course.duration}
              </span>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button
                variant="outline"
                className="rounded-xl"
                onClick={() =>
                  console.log(
                    "Preview course:",
                    course.id
                  )
                }
              >
                <Eye className="mr-2 h-4 w-4" />
                Preview Course
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-xl"
                  >
                    <MoreHorizontal className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={handleEdit}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Course
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={handleDelete}
                    className="text-red-500 focus:text-red-500"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Course
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </Card>

      {/* ===================================== */}
      {/* STATISTICS */}
      {/* ===================================== */}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Students
                </p>

                <p className="mt-1 text-2xl font-bold">
                  {course.students.toLocaleString()}
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
                  Lessons
                </p>

                <p className="mt-1 text-2xl font-bold">
                  {course.lessons}
                </p>
              </div>

              <div className="rounded-xl bg-primary/10 p-3 text-primary">
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
                  Rating
                </p>

                <div className="mt-1 flex items-center gap-1.5">
                  <p className="text-2xl font-bold">
                    {course.rating.toFixed(1)}
                  </p>

                  <Star className="h-5 w-5 fill-current text-yellow-500" />
                </div>
              </div>

              <div className="rounded-xl bg-yellow-500/10 p-3 text-yellow-600">
                <Star className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Revenue
                </p>

                <p className="mt-1 text-2xl font-bold">
                  ${course.revenue.toLocaleString()}
                </p>
              </div>

              <div className="rounded-xl bg-green-500/10 p-3 text-green-600">
                <DollarSign className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Price
                </p>

                <p className="mt-1 text-2xl font-bold">
                  ${course.price}
                </p>
              </div>

              <div className="rounded-xl bg-purple-500/10 p-3 text-purple-600">
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
        {/* COURSE DESCRIPTION */}
        {/* ================================= */}

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Course Description</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-sm leading-7 text-muted-foreground">
              {course.description}
            </p>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <p className="text-xs text-muted-foreground">
                  Category
                </p>

                <p className="mt-1 font-medium">
                  {course.category}
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">
                  Level
                </p>

                <p className="mt-1 font-medium">
                  {course.level}
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">
                  Language
                </p>

                <p className="mt-1 font-medium">
                  {course.language}
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">
                  Certificate
                </p>

                <p className="mt-1 flex items-center gap-1.5 font-medium">
                  {course.certificate ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      Included
                    </>
                  ) : (
                    "Not included"
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ================================= */}
        {/* INSTRUCTOR */}
        {/* ================================= */}

        <Card>
          <CardHeader>
            <CardTitle>Instructor</CardTitle>
          </CardHeader>

          <CardContent>
            <button
              type="button"
              onClick={handleInstructor}
              className="flex w-full items-center gap-3 rounded-xl text-left transition hover:bg-muted/40"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {course.instructor.profilePicture ? (
                  <img
                    src={
                      course.instructor.profilePicture
                    }
                    alt={`${course.instructor.firstName} ${course.instructor.lastName}`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  `${course.instructor.firstName.charAt(
                    0
                  )}${course.instructor.lastName.charAt(
                    0
                  )}`.toUpperCase()
                )}
              </div>

              <div className="min-w-0">
                <p className="font-semibold">
                  {course.instructor.firstName}{" "}
                  {course.instructor.lastName}
                </p>

                <p className="truncate text-xs text-muted-foreground">
                  {course.instructor.email}
                </p>
              </div>
            </button>

            <div className="mt-5 rounded-xl bg-muted/40 p-4">
              <p className="text-xs text-muted-foreground">
                Specialization
              </p>

              <p className="mt-1 text-sm font-medium">
                {course.instructor.specialization}
              </p>
            </div>

            <Button
              variant="outline"
              className="mt-4 w-full rounded-xl"
              onClick={handleInstructor}
            >
              View Instructor
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* ===================================== */}
      {/* CURRICULUM */}
      {/* ===================================== */}

      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Course Curriculum</CardTitle>

            <p className="mt-1 text-sm text-muted-foreground">
              {course.lessons} lessons •{" "}
              {course.duration} total duration
            </p>
          </div>

          <span className="hidden rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary sm:inline-flex">
            {lessons.length} shown
          </span>
        </CardHeader>

        <CardContent className="p-0">
          <div className="divide-y">
            {lessons.map((lesson, index) => (
              <div
                key={lesson.id}
                className="flex items-center gap-4 px-6 py-4 transition hover:bg-muted/20"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                  {index + 1}
                </div>

                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <div className="text-primary">
                    {getLessonIcon(
                      lesson.type
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">
                      {lesson.title}
                    </p>

                    <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <span>
                        {lesson.type}
                      </span>

                      <span>•</span>

                      <span>
                        {lesson.duration}
                      </span>

                      {lesson.freePreview && (
                        <>
                          <span>•</span>

                          <span className="font-medium text-green-600">
                            Free Preview
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="hidden rounded-lg sm:flex"
                  onClick={() =>
                    console.log(
                      "Preview lesson:",
                      lesson.id
                    )
                  }
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="border-t bg-muted/20 px-6 py-4 text-center">
            <Button
              variant="outline"
              className="rounded-xl"
              onClick={() =>
                console.log(
                  "View complete curriculum"
                )
              }
            >
              View Complete Curriculum
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* ===================================== */}
      {/* REVIEWS */}
      {/* ===================================== */}

      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Reviews</CardTitle>

            <p className="mt-1 text-sm text-muted-foreground">
              Student feedback for this course.
            </p>
          </div>

          <Button
            variant="outline"
            className="rounded-xl"
            onClick={() =>
              console.log(
                "View all reviews:",
                course.id
              )
            }
          >
            View All
          </Button>
        </CardHeader>

        <CardContent className="space-y-5">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="rounded-xl border p-4"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {review.student
                      .split(" ")
                      .map((part) =>
                        part.charAt(0)
                      )
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>

                  <div>
                    <p className="text-sm font-semibold">
                      {review.student}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {review.date}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {Array.from(
                    { length: 5 },
                    (_, index) => (
                      <Star
                        key={index}
                        className={`h-4 w-4 ${
                          index <
                          review.rating
                            ? "fill-current text-yellow-500"
                            : "text-muted-foreground/30"
                        }`}
                      />
                    )
                  )}
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                {review.comment}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* ===================================== */}
      {/* COURSE INFORMATION */}
      {/* ===================================== */}

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Pricing</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex items-end gap-3">
              <span className="text-3xl font-bold">
                ${course.price}
              </span>

              <span className="pb-1 text-sm text-muted-foreground line-through">
                ${course.originalPrice}
              </span>
            </div>

            <p className="mt-2 text-sm text-muted-foreground">
              Current course price.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Course Timeline</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Created
              </span>

              <span className="text-sm font-medium">
                {course.createdAt}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Last Updated
              </span>

              <span className="text-sm font-medium">
                {course.updatedAt}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ===================================== */}
      {/* ADMIN MODERATION NOTICE */}
      {/* ===================================== */}

      <div className="flex items-start gap-3 rounded-xl border bg-muted/20 p-4">
        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

        <div>
          <p className="text-sm font-medium">
            Course moderation
          </p>

          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            This page currently uses placeholder course,
            curriculum, enrollment, revenue, and review
            data. Approve, reject, publish, edit, and
            delete actions will be connected to the admin
            course API when the backend endpoints are
            implemented.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;