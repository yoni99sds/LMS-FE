import StudentLayout from "@/layouts/StudentLayout";
import { BookOpen, CheckCircle, Clock, Award } from "lucide-react";
import WelcomeBanner from "@/components/student/WelcomeBanner";
import StatCard from "@/components/student/StatCard";
import CourseCard from "@/components/student/CourseCard";
import ProgressChart from "@/components/student/ProgressChart";
import RecentActivity from "@/components/student/RecentActivity";
import UpcomingClasses from "@/components/student/UpcomingClasses";
import Achievements from "@/components/student/Achievements";
import CircularProgress from "@/components/student/CircularProgress";

const Dashboard = () => {
  return (
    <StudentLayout>
      <div className="space-y-10 py-12 min-w-0">

        <WelcomeBanner />

        {/* STATS */}
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      
<StatCard
  title="Enrolled Courses"
  value="6"
  sub="+1 this week"
  icon={<BookOpen className="w-6 h-6 text-primary" />}
/>

<StatCard
  title="Completed"
  value="3"
  sub="50% completion"
  icon={<CheckCircle className="w-6 h-6 text-primary" />}
/>

<StatCard
  title="Hours Learned"
  value="24h"
  sub="This month"
  icon={<Clock className="w-6 h-6 text-primary" />}
/>

<StatCard
  title="Certificates"
  value="2"
  sub="Keep going!"
  icon={<Award className="w-6 h-6 text-primary" />}
/>
        </div>

        {/* MAIN GRID (FIXED) */}
        <div className="grid lg:grid-cols-3 gap-7 min-w-0">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-8 min-w-0">

            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">
                  Continue Learning
                </h2>
              </div>

              <div className="space-y-5">
            <CourseCard
  title="React Mastery"
  progress={70}
  image="https://images.unsplash.com/photo-1633356122544-f134324a6cee"
  rating={4.8}
  reviews={1200}
  price="$89.99"
  instructor="Alex Johnson"
/>

<CourseCard
  title="Node.js Backend"
  progress={45}
  image="https://images.unsplash.com/photo-1555066931-4365d14bab8c"
  rating={4.6}
  reviews={860}
  price="$69.99"
  instructor="Sarah Miller"
/>

<CourseCard
  title="UI/UX Fundamentals"
  progress={85}
  image="https://images.unsplash.com/photo-1559028012-481c04fa702d"
  rating={4.7}
  reviews={540}
  price="$59.99"
  instructor="David Chen"
/>
              </div>
            </div>

            <ProgressChart />
          </div>

          {/* RIGHT */}
          <div className="space-y-8 min-w-0">
            <CircularProgress />
            <RecentActivity />
            <UpcomingClasses />
            <Achievements />
          </div>

        </div>

      </div>
    </StudentLayout>
  );
};

export default Dashboard;