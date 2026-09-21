import { useState } from "react";
import StudentLayout from "@/layouts/StudentLayout";
import CourseCard from "@/components/student/CourseCard";

const courses = [
  { id: 1, title: "React Mastery", progress: 70, status: "active", rating: 4.8 },
  { id: 2, title: "Node.js Backend", progress: 45, status: "active", rating: 4.6 },
  { id: 3, title: "UI/UX Fundamentals", progress: 85, status: "active", rating: 4.9 },
  { id: 4, title: "MongoDB", progress: 25, status: "enrolled", rating: 4.4 },
  { id: 5, title: "HTML & CSS", progress: 100, status: "completed", rating: 5.0 },
];

type Filter = "all" | "active" | "enrolled" | "completed";

const MyCoursesPage = () => {
  const [filter, setFilter] = useState<Filter>("all");

  const filteredCourses =
    filter === "all"
      ? courses
      : courses.filter((c) => c.status === filter);

  return (
    <StudentLayout>
      <div className="space-y-8">

        {/* HEADER */}
        <div>
          <h1 className="text-4xl font-black">My Courses</h1>
          <p className="text-muted-foreground mt-2">
            Continue learning where you left off.
          </p>
        </div>

        {/* FILTER BUTTONS */}
        <div className="flex flex-wrap gap-3">

          {(["all", "active", "enrolled", "completed"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-xl border transition text-sm font-medium ${
                filter === type
                  ? "bg-primary text-white"
                  : "hover:bg-muted"
              }`}
            >
              {type.toUpperCase()}
            </button>
          ))}

        </div>

        {/* GRID */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              title={course.title}
              progress={course.progress}
              rating={course.rating}
            />
          ))}
        </div>

      </div>
    </StudentLayout>
  );
};

export default MyCoursesPage;