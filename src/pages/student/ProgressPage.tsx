import StudentLayout from "@/layouts/StudentLayout";
import ProgressChart from "@/components/student/ProgressChart";

const ProgressPage = () => {
  return (
    <StudentLayout>
      <div className="space-y-8">

        <div>
          <h1 className="text-4xl font-black">
            Learning Progress
          </h1>

          <p className="text-muted-foreground mt-2">
            Track your learning journey.
          </p>
        </div>

        <ProgressChart />

      </div>
    </StudentLayout>
  );
};

export default ProgressPage;