import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
} from "lucide-react";

import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type CourseStatus =
  | "Published"
  | "Draft"
  | "Pending";

interface RecentCourse {
  id: string;
  title: string;
  instructor: string;
  students: number;
  status: CourseStatus;
  price: number;
}

const recentCoursesData: RecentCourse[] = [
  {
    id: "course-001",
    title: "Full Stack Web Development",
    instructor: "John Doe",
    students: 324,
    status: "Published",
    price: 12500,
  },
  {
    id: "course-002",
    title: "UI/UX Design Fundamentals",
    instructor: "Sarah Smith",
    students: 287,
    status: "Published",
    price: 9800,
  },
  {
    id: "course-003",
    title: "Advanced JavaScript",
    instructor: "Michael Brown",
    students: 245,
    status: "Published",
    price: 10500,
  },
  {
    id: "course-004",
    title: "Database Management",
    instructor: "Daniel Wilson",
    students: 198,
    status: "Pending",
    price: 9200,
  },
  {
    id: "course-005",
    title: "Digital Marketing",
    instructor: "Hana Alemu",
    students: 176,
    status: "Draft",
    price: 8500,
  },
];

const RecentCourses = () => {
  const navigate = useNavigate();

  /*
   * ============================================
   * DATA
   * ============================================
   */

  const recentCourses = useMemo(
    () => recentCoursesData.slice(0, 5),
    []
  );

  /*
   * ============================================
   * HANDLERS
   * ============================================
   */

  const handleViewCourse = (id: string) => {
    navigate(`/admin/courses/${id}`);
  };

  const handleViewAll = () => {
    navigate("/admin/courses");
  };

  /*
   * ============================================
   * STATUS HELPERS
   * ============================================
   */

  const getStatusClasses = (
    status: CourseStatus
  ) => {
    if (status === "Published") {
      return "bg-green-500/10 text-green-600";
    }

    if (status === "Pending") {
      return "bg-yellow-500/10 text-yellow-600";
    }

    return "bg-muted text-muted-foreground";
  };

  return (
    <Card className="rounded-xl">
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <div>
          <CardTitle className="text-base">
            Recent Courses
          </CardTitle>

          <p className="mt-1 text-sm text-muted-foreground">
            Recently created and updated courses.
          </p>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleViewAll}
          className="rounded-lg"
        >
          View All

          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="p-0">
        {recentCourses.length > 0 ? (
          <div className="divide-y">
            {recentCourses.map((course) => (
              <div
                key={course.id}
                className="flex items-center gap-4 px-6 py-4 transition hover:bg-muted/20"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <BookOpen className="h-5 w-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <button
                    type="button"
                    onClick={() =>
                      handleViewCourse(
                        course.id
                      )
                    }
                    className="block max-w-full truncate text-left text-sm font-semibold hover:text-primary"
                  >
                    {course.title}
                  </button>

                  <p className="mt-1 truncate text-xs text-muted-foreground">
                    By {course.instructor}
                  </p>
                </div>

                <div className="hidden text-center sm:block">
                  <p className="text-sm font-semibold">
                    {course.students.toLocaleString()}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Students
                  </p>
                </div>

                <div className="hidden sm:block">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
                      course.status
                    )}`}
                  >
                    {course.status ===
                    "Published" ? (
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    ) : (
                      <Clock3 className="h-3.5 w-3.5" />
                    )}

                    {course.status}
                  </span>
                </div>

                <div className="hidden text-right lg:block">
                  <p className="text-sm font-semibold">
                    {course.price.toLocaleString()}{" "}
                    ETB
                  </p>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    handleViewCourse(
                      course.id
                    )
                  }
                  className="rounded-lg"
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
            <div className="rounded-full bg-muted p-4">
              <BookOpen className="h-6 w-6 text-muted-foreground" />
            </div>

            <h3 className="mt-4 font-semibold">
              No recent courses
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              New courses will appear here.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentCourses;