import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  Plus,
  Search,
  MoreVertical,
  Pencil,
  Eye,
  Users,
  Star,
  BookOpen,
  FileText,
  CheckCircle2,
  Clock,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

type CourseStatus = "Published" | "Draft" | "Pending";

type Course = {
  id: number;
  title: string;
  description: string;
  category: string;
  students: number;
  rating: number;
  reviews: number;
  price: string;
  status: CourseStatus;
  lessons: number;
  duration: string;
  image: string;
};

const courses: Course[] = [
  {
    id: 1,
    title: "Professional React Development",
    description:
      "Master modern React development and build production-ready applications.",
    category: "Development",
    students: 1240,
    rating: 4.8,
    reviews: 320,
    price: "$89.99",
    status: "Published",
    lessons: 42,
    duration: "12 Weeks",
    image:
      "https://storage.googleapis.com/dala-prod-public-storage/generated-images/678ea2b5-4cb5-4e95-8f1f-9d90d381aff8/react-course-thumbnail-5f467410-1781888612690.webp",
  },
  {
    id: 2,
    title: "Advanced Node.js Backend",
    description:
      "Build scalable backend applications using Node.js, Express and MongoDB.",
    category: "Development",
    students: 850,
    rating: 4.9,
    reviews: 210,
    price: "$79.99",
    status: "Published",
    lessons: 36,
    duration: "10 Weeks",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
  },
  {
    id: 3,
    title: "UI/UX Design Masterclass",
    description:
      "Learn user interface and user experience design from fundamentals to advanced concepts.",
    category: "Design",
    students: 620,
    rating: 4.7,
    reviews: 145,
    price: "$69.99",
    status: "Published",
    lessons: 30,
    duration: "8 Weeks",
    image:
      "https://storage.googleapis.com/dala-prod-public-storage/generated-images/678ea2b5-4cb5-4e95-8f1f-9d90d381aff8/ui-ux-design-course-thumbnail-6f2b3030-1781888612958.webp",
  },
  {
    id: 4,
    title: "TypeScript for Modern Developers",
    description:
      "Learn TypeScript and improve the reliability and scalability of your applications.",
    category: "Development",
    students: 0,
    rating: 0,
    reviews: 0,
    price: "$59.99",
    status: "Draft",
    lessons: 24,
    duration: "6 Weeks",
    image:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea",
  },
  {
    id: 5,
    title: "Full Stack MERN Development",
    description:
      "Build complete full-stack applications with MongoDB, Express, React and Node.js.",
    category: "Development",
    students: 0,
    rating: 0,
    reviews: 0,
    price: "$99.99",
    status: "Pending",
    lessons: 50,
    duration: "16 Weeks",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
  },
];

const CoursesPage = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<"All" | CourseStatus>("All");

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        course.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        course.category
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        course.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const totalStudents = courses.reduce(
    (total, course) => total + course.students,
    0
  );

  const publishedCourses = courses.filter(
    (course) => course.status === "Published"
  ).length;

  const draftCourses = courses.filter(
    (course) => course.status === "Draft"
  ).length;

  const pendingCourses = courses.filter(
    (course) => course.status === "Pending"
  ).length;

  return (
    <div className="space-y-8">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight">
            My Courses
          </h1>

          <p className="mt-2 text-muted-foreground">
            Create, manage and monitor all your courses.
          </p>
        </div>

        <Button
          asChild
          className="rounded-xl h-11 px-5"
        >
          <Link to="/instructor/courses/create">
            <Plus className="mr-2 h-5 w-5" />
            Create Course
          </Link>
        </Button>
      </div>

      {/* =====================================================
          STATISTICS
      ====================================================== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

        <StatCard
          icon={<BookOpen className="h-5 w-5" />}
          label="Total Courses"
          value={courses.length}
        />

        <StatCard
          icon={<CheckCircle2 className="h-5 w-5" />}
          label="Published"
          value={publishedCourses}
        />

        <StatCard
          icon={<FileText className="h-5 w-5" />}
          label="Drafts"
          value={draftCourses}
        />

        <StatCard
          icon={<Users className="h-5 w-5" />}
          label="Total Students"
          value={totalStudents.toLocaleString()}
        />

      </div>

      {/* =====================================================
          SEARCH + FILTER
      ====================================================== */}

      <div className="border bg-background rounded-2xl p-4">

        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">

          {/* SEARCH */}

          <div className="relative w-full lg:max-w-md">

            <Search
              className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                h-4
                w-4
                text-muted-foreground
              "
            />

            <Input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search your courses..."
              className="pl-10 h-11 rounded-xl"
            />

          </div>

          {/* FILTERS */}

          <div className="flex flex-wrap gap-2">

            {(
              ["All", "Published", "Draft", "Pending"] as const
            ).map((status) => (
              <Button
                key={status}
                variant={
                  statusFilter === status
                    ? "default"
                    : "outline"
                }
                size="sm"
                onClick={() =>
                  setStatusFilter(status)
                }
                className="rounded-xl"
              >
                {status}
              </Button>
            ))}

          </div>
        </div>
      </div>

      {/* =====================================================
          COURSE LIST
      ====================================================== */}

      <div className="space-y-5">

        {filteredCourses.length === 0 ? (
          <div className="border rounded-2xl p-12 text-center bg-background">

            <BookOpen
              className="
                mx-auto
                h-12
                w-12
                text-muted-foreground/50
              "
            />

            <h3 className="mt-4 text-xl font-bold">
              No courses found
            </h3>

            <p className="mt-2 text-muted-foreground">
              Try changing your search or filter.
            </p>

          </div>
        ) : (
          filteredCourses.map((course) => (
            <CourseManagementCard
              key={course.id}
              course={course}
            />
          ))
        )}

      </div>

      {/* =====================================================
          FOOTER INFO
      ====================================================== */}

      <div
        className="
          flex
          flex-col
          sm:flex-row
          justify-between
          gap-3
          text-sm
          text-muted-foreground
        "
      >
        <span>
          Showing {filteredCourses.length} of{" "}
          {courses.length} courses
        </span>

        {pendingCourses > 0 && (
          <span className="flex items-center gap-2">
            <Clock className="h-4 w-4" />

            {pendingCourses} course
            {pendingCourses > 1 ? "s" : ""} awaiting
            approval
          </span>
        )}
      </div>
    </div>
  );
};

/* =========================================================
   STAT CARD
========================================================= */

type StatCardProps = {
  icon: React.ReactNode;
  label: string;
  value: string | number;
};

const StatCard = ({
  icon,
  label,
  value,
}: StatCardProps) => {
  return (
    <div
      className="
        border
        rounded-2xl
        bg-background
        p-5
        shadow-sm
      "
    >
      <div className="flex items-center justify-between">

        <div
          className="
            h-11
            w-11
            rounded-xl
            bg-primary/10
            text-primary
            flex
            items-center
            justify-center
          "
        >
          {icon}
        </div>

      </div>

      <div className="mt-5">

        <p className="text-2xl font-black">
          {value}
        </p>

        <p className="mt-1 text-sm text-muted-foreground">
          {label}
        </p>

      </div>
    </div>
  );
};

/* =========================================================
   COURSE MANAGEMENT CARD
========================================================= */

type CourseManagementCardProps = {
  course: Course;
};

const CourseManagementCard = ({
  course,
}: CourseManagementCardProps) => {

  const statusClasses = {
    Published:
      "bg-green-500/10 text-green-600 border-green-500/20",

    Draft:
      "bg-muted text-muted-foreground border-border",

    Pending:
      "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  };

  return (
    <div
      className="
        group
        border
        rounded-2xl
        bg-background
        overflow-hidden
        shadow-sm
        hover:shadow-md
        transition-all
      "
    >
      <div className="flex flex-col lg:flex-row">

        {/* =================================================
            IMAGE
        ================================================== */}

        <div
          className="
            relative
            w-full
            lg:w-64
            xl:w-72
            shrink-0
            aspect-video
            lg:aspect-auto
            lg:h-48
            overflow-hidden
          "
        >
          <img
            src={course.image}
            alt={course.title}
            className="
              w-full
              h-full
              object-cover
              transition-transform
              duration-500
              group-hover:scale-105
            "
          />

          <Badge
            className={`
              absolute
              top-3
              left-3
              border
              ${statusClasses[course.status]}
            `}
          >
            {course.status}
          </Badge>
        </div>

        {/* =================================================
            CONTENT
        ================================================== */}

        <div className="flex-1 p-5 lg:p-6">

          <div
            className="
              flex
              flex-col
              xl:flex-row
              xl:justify-between
              gap-5
            "
          >

            {/* =================================================
                LEFT CONTENT
            ================================================== */}

            <div className="min-w-0">

              <div className="flex items-center gap-2 mb-2">

                <Badge
                  variant="secondary"
                  className="rounded-full text-xs"
                >
                  {course.category}
                </Badge>

                <span className="text-xs text-muted-foreground">
                  {course.duration}
                </span>

              </div>

              <h2
                className="
                  text-xl
                  font-bold
                  line-clamp-2
                  group-hover:text-primary
                  transition-colors
                "
              >
                {course.title}
              </h2>

              <p
                className="
                  text-sm
                  text-muted-foreground
                  mt-2
                  line-clamp-2
                  max-w-2xl
                "
              >
                {course.description}
              </p>

              {/* COURSE META */}

              <div
                className="
                  flex
                  flex-wrap
                  items-center
                  gap-x-5
                  gap-y-2
                  mt-4
                  text-sm
                "
              >

                {/* LESSONS */}

                <div className="flex items-center gap-1.5">

                  <BookOpen
                    className="
                      h-4
                      w-4
                      text-muted-foreground
                    "
                  />

                  <span>
                    {course.lessons} lessons
                  </span>

                </div>

                {/* STUDENTS */}

                <div className="flex items-center gap-1.5">

                  <Users
                    className="
                      h-4
                      w-4
                      text-muted-foreground
                    "
                  />

                  <span>
                    {course.students.toLocaleString()}{" "}
                    students
                  </span>

                </div>

                {/* RATING */}

                {course.rating > 0 && (
                  <div className="flex items-center gap-1.5">

                    <Star
                      className="
                        h-4
                        w-4
                        fill-yellow-400
                        text-yellow-400
                      "
                    />

                    <span className="font-semibold">
                      {course.rating}
                    </span>

                    <span className="text-muted-foreground">
                      ({course.reviews})
                    </span>

                  </div>
                )}

              </div>
            </div>

            {/* =================================================
                RIGHT CONTENT
            ================================================== */}

            <div
              className="
                flex
                xl:flex-col
                items-center
                xl:items-end
                justify-between
                gap-4
                xl:min-w-[130px]
              "
            >

              <div className="text-xl font-black text-primary">
                {course.price}
              </div>

              <div className="flex items-center gap-2">

                {/* VIEW */}

                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl"
                  asChild
                >
                  <Link
                    to={`/courses/${course.id}`}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </Link>
                </Button>

                {/* EDIT */}

                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-xl"
                  asChild
                >
                  <Link
                    to={`/instructor/courses/${course.id}/edit`}
                  >
                    <Pencil className="h-4 w-4" />
                  </Link>
                </Button>

                {/* MORE */}

                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-xl"
                >
                  <MoreVertical className="h-5 w-5" />
                </Button>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;