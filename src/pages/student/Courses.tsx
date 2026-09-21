import StudentLayout from "@/layouts/StudentLayout";
import CourseCard from "@/components/student/CourseCard";

const Courses = () => {
  return (
    <StudentLayout>
      <div className="space-y-8">

        <div>
          <h1 className="text-3xl font-bold">
            My Courses
          </h1>

          <p className="text-muted-foreground">
            Continue learning where you left off.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <CourseCard title="React Mastery" progress={70} />
          <CourseCard title="Node.js Backend" progress={40} />
          <CourseCard title="UI/UX Design" progress={85} />
          <CourseCard title="Advanced TypeScript" progress={55} />
        </div>
      </div>
    </StudentLayout>
  );
};

export default Courses;