import { useState } from "react";
import InstructorLayout from "@/layouts/InstructorLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  BookOpen,
  Star,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  UserPlus,
} from "lucide-react";

/* =========================================================
   MOCK DATA
========================================================= */

const revenueData = [
  { month: "Mar", value: 3200 },
  { month: "Apr", value: 4100 },
  { month: "May", value: 3800 },
  { month: "Jun", value: 5200 },
  { month: "Jul", value: 6100 },
  { month: "Aug", value: 7450 },
];

const enrollmentData = [
  { month: "Mar", value: 180 },
  { month: "Apr", value: 240 },
  { month: "May", value: 210 },
  { month: "Jun", value: 320 },
  { month: "Jul", value: 390 },
  { month: "Aug", value: 465 },
];

const coursePerformance = [
  {
    name: "Professional React Development",
    students: 1240,
    revenue: "$12,450",
    rating: 4.9,
    completion: 82,
  },
  {
    name: "Node.js Backend Development",
    students: 850,
    revenue: "$8,720",
    rating: 4.8,
    completion: 76,
  },
  {
    name: "UI/UX Design Masterclass",
    students: 620,
    revenue: "$6,340",
    rating: 4.7,
    completion: 71,
  },
  {
    name: "JavaScript Advanced",
    students: 480,
    revenue: "$4,280",
    rating: 4.6,
    completion: 68,
  },
];

const ratingData = [
  { month: "Mar", value: 4.5 },
  { month: "Apr", value: 4.6 },
  { month: "May", value: 4.6 },
  { month: "Jun", value: 4.7 },
  { month: "Jul", value: 4.8 },
  { month: "Aug", value: 4.8 },
];

/* =========================================================
   PAGE
========================================================= */

const AnalyticsPage = () => {
  const [period, setPeriod] = useState("Last 6 Months");

  return (
  
      <div className="space-y-8">

        {/* =================================================
            HEADER
        ================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

          <div>
            <h1 className="text-4xl font-black tracking-tight">
              Analytics
            </h1>

            <p className="text-muted-foreground mt-2">
              Understand your course performance, students, and revenue.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="rounded-xl gap-2"
              onClick={() =>
                setPeriod(
                  period === "Last 6 Months"
                    ? "This Year"
                    : "Last 6 Months"
                )
              }
            >
              <Calendar className="h-4 w-4" />
              {period}
            </Button>

            <Button className="rounded-xl gap-2">
              <BarChart3 className="h-4 w-4" />
              Generate Report
            </Button>
          </div>

        </div>

        {/* =================================================
            OVERVIEW CARDS
        ================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

          {/* REVENUE */}
          <AnalyticsCard
            title="Total Revenue"
            value="$42,850"
            description="Compared with previous period"
            percentage="+18.2%"
            positive
            icon={<DollarSign className="h-6 w-6" />}
          />

          {/* STUDENTS */}
          <AnalyticsCard
            title="Total Students"
            value="3,190"
            description="Active students"
            percentage="+12.5%"
            positive
            icon={<Users className="h-6 w-6" />}
          />

          {/* COURSES */}
          <AnalyticsCard
            title="Published Courses"
            value="8"
            description="Across all categories"
            percentage="+2"
            positive
            icon={<BookOpen className="h-6 w-6" />}
          />

          {/* RATING */}
          <AnalyticsCard
            title="Average Rating"
            value="4.8"
            description="Based on 300 reviews"
            percentage="+0.3"
            positive
            icon={<Star className="h-6 w-6" />}
          />

        </div>

        {/* =================================================
            REVENUE + ENROLLMENTS
        ================================================= */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          {/* REVENUE CHART */}
          <ChartCard
            title="Revenue Growth"
            description="Monthly revenue performance"
            value="$29,850"
            trend="+16.4%"
            trendPositive
          >
            <div className="h-72 flex items-end justify-between gap-3 sm:gap-5">

              {revenueData.map((item) => {
                const maxValue = 8000;
                const height = (item.value / maxValue) * 100;

                return (
                  <div
                    key={item.month}
                    className="flex-1 h-full flex flex-col justify-end items-center gap-3"
                  >
                    <div className="w-full h-full flex items-end justify-center">
                      <div
                        className="w-full max-w-[52px] bg-primary/80 hover:bg-primary rounded-t-xl transition-all duration-300 cursor-pointer"
                        style={{
                          height: `${height}%`,
                        }}
                        title={`$${item.value}`}
                      />
                    </div>

                    <span className="text-xs text-muted-foreground">
                      {item.month}
                    </span>
                  </div>
                );
              })}

            </div>
          </ChartCard>

          {/* ENROLLMENT CHART */}
          <ChartCard
            title="Student Enrollment"
            description="New student enrollments"
            value="1,805"
            trend="+22.8%"
            trendPositive
          >
            <div className="h-72 flex items-end justify-between gap-3 sm:gap-5">

              {enrollmentData.map((item) => {
                const maxValue = 500;
                const height = (item.value / maxValue) * 100;

                return (
                  <div
                    key={item.month}
                    className="flex-1 h-full flex flex-col justify-end items-center gap-3"
                  >
                    <div className="w-full h-full flex items-end justify-center">
                      <div
                        className="w-full max-w-[52px] bg-primary/50 hover:bg-primary rounded-t-xl transition-all duration-300 cursor-pointer"
                        style={{
                          height: `${height}%`,
                        }}
                        title={`${item.value} students`}
                      />
                    </div>

                    <span className="text-xs text-muted-foreground">
                      {item.month}
                    </span>
                  </div>
                );
              })}

            </div>
          </ChartCard>

        </div>

        {/* =================================================
            PERFORMANCE SUMMARY
        ================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* NEW STUDENTS */}
          <div className="border rounded-3xl bg-background p-6 shadow-sm">

            <div className="flex items-center justify-between">
              <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                <UserPlus className="h-6 w-6" />
              </div>

              <div className="flex items-center gap-1 text-sm font-semibold text-green-600">
                <ArrowUpRight className="h-4 w-4" />
                14.2%
              </div>
            </div>

            <div className="mt-6">
              <p className="text-sm text-muted-foreground">
                New Students
              </p>

              <h3 className="text-3xl font-black mt-1">
                465
              </h3>

              <p className="text-xs text-muted-foreground mt-2">
                Students joined this month
              </p>
            </div>

          </div>

          {/* COMPLETION */}
          <div className="border rounded-3xl bg-background p-6 shadow-sm">

            <div className="flex items-center justify-between">
              <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                <TrendingUp className="h-6 w-6" />
              </div>

              <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/10">
                Healthy
              </Badge>
            </div>

            <div className="mt-6">
              <p className="text-sm text-muted-foreground">
                Average Completion
              </p>

              <h3 className="text-3xl font-black mt-1">
                74.2%
              </h3>

              <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: "74.2%" }}
                />
              </div>
            </div>

          </div>

          {/* ENGAGEMENT */}
          <div className="border rounded-3xl bg-background p-6 shadow-sm">

            <div className="flex items-center justify-between">
              <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                <Users className="h-6 w-6" />
              </div>

              <div className="flex items-center gap-1 text-sm font-semibold text-red-500">
                <ArrowDownRight className="h-4 w-4" />
                2.4%
              </div>
            </div>

            <div className="mt-6">
              <p className="text-sm text-muted-foreground">
                Student Engagement
              </p>

              <h3 className="text-3xl font-black mt-1">
                68.5%
              </h3>

              <p className="text-xs text-muted-foreground mt-2">
                Average weekly engagement
              </p>
            </div>

          </div>

        </div>

        {/* =================================================
            COURSE PERFORMANCE
        ================================================= */}
        <div className="border rounded-3xl bg-background shadow-sm overflow-hidden">

          <div className="p-6 border-b">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

              <div>
                <h2 className="text-xl font-bold">
                  Course Performance
                </h2>

                <p className="text-sm text-muted-foreground mt-1">
                  Compare the performance of your courses.
                </p>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="rounded-xl"
              >
                View All Courses
              </Button>

            </div>

          </div>

          {/* DESKTOP TABLE */}
          <div className="hidden md:block">

            <div className="grid grid-cols-5 gap-4 p-4 bg-muted/30 border-b text-sm font-semibold">
              <span>Course</span>
              <span>Students</span>
              <span>Revenue</span>
              <span>Rating</span>
              <span>Completion</span>
            </div>

            {coursePerformance.map((course) => (
              <div
                key={course.name}
                className="grid grid-cols-5 gap-4 items-center p-4 border-b last:border-b-0 hover:bg-muted/30 transition"
              >

                <span className="font-semibold truncate">
                  {course.name}
                </span>

                <span className="text-sm">
                  {course.students.toLocaleString()}
                </span>

                <span className="font-bold">
                  {course.revenue}
                </span>

                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">
                    {course.rating}
                  </span>
                </span>

                <div className="flex items-center gap-3">

                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{
                        width: `${course.completion}%`,
                      }}
                    />
                  </div>

                  <span className="text-sm font-medium w-10">
                    {course.completion}%
                  </span>

                </div>

              </div>
            ))}

          </div>

          {/* MOBILE CARDS */}
          <div className="md:hidden divide-y">

            {coursePerformance.map((course) => (
              <div
                key={course.name}
                className="p-5 space-y-5"
              >

                <div>
                  <h3 className="font-bold">
                    {course.name}
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-4">

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Students
                    </p>

                    <p className="font-bold mt-1">
                      {course.students.toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Revenue
                    </p>

                    <p className="font-bold mt-1">
                      {course.revenue}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Rating
                    </p>

                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold">
                        {course.rating}
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Completion
                    </p>

                    <p className="font-bold mt-1">
                      {course.completion}%
                    </p>
                  </div>

                </div>

                <div>
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-muted-foreground">
                      Completion Rate
                    </span>

                    <span className="font-semibold">
                      {course.completion}%
                    </span>
                  </div>

                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{
                        width: `${course.completion}%`,
                      }}
                    />
                  </div>
                </div>

              </div>
            ))}

          </div>

        </div>

        {/* =================================================
            RATING TREND
        ================================================= */}
        <div className="border rounded-3xl bg-background p-6 shadow-sm">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

            <div>
              <h2 className="text-xl font-bold">
                Rating Trend
              </h2>

              <p className="text-sm text-muted-foreground mt-1">
                How your average student rating has changed.
              </p>
            </div>

            <div className="text-right">
              <p className="text-3xl font-black">
                4.8
              </p>

              <div className="flex items-center justify-end gap-1 text-sm text-green-600">
                <TrendingUp className="h-4 w-4" />
                +0.3
              </div>
            </div>

          </div>

          <div className="h-48 flex items-end justify-between gap-4">

            {ratingData.map((item) => {
              const minRating = 4;
              const maxRating = 5;

              const height =
                ((item.value - minRating) /
                  (maxRating - minRating)) *
                100;

              return (
                <div
                  key={item.month}
                  className="flex-1 h-full flex flex-col justify-end items-center gap-3"
                >

                  <div className="w-full h-full flex items-end justify-center">
                    <div
                      className="w-full max-w-[50px] bg-primary/70 hover:bg-primary rounded-t-xl transition-all"
                      style={{
                        height: `${Math.max(height, 15)}%`,
                      }}
                      title={`${item.value}/5`}
                    />
                  </div>

                  <span className="text-xs text-muted-foreground">
                    {item.month}
                  </span>

                </div>
              );
            })}

          </div>

        </div>

    </div>
  
  );
};

/* =========================================================
   ANALYTICS CARD
========================================================= */

type AnalyticsCardProps = {
  title: string;
  value: string;
  description: string;
  percentage: string;
  positive?: boolean;
  icon: React.ReactNode;
};

const AnalyticsCard = ({
  title,
  value,
  description,
  percentage,
  positive,
  icon,
}: AnalyticsCardProps) => {
  return (
    <div className="border rounded-3xl bg-background p-6 shadow-sm hover:shadow-md transition-all">

      <div className="flex items-start justify-between">

        <div className="p-3 rounded-2xl bg-primary/10 text-primary">
          {icon}
        </div>

        <div
          className={`flex items-center gap-1 text-sm font-semibold ${
            positive ? "text-green-600" : "text-red-500"
          }`}
        >
          {positive ? (
            <ArrowUpRight className="h-4 w-4" />
          ) : (
            <ArrowDownRight className="h-4 w-4" />
          )}

          {percentage}
        </div>

      </div>

      <div className="mt-6">

        <p className="text-sm text-muted-foreground">
          {title}
        </p>

        <h3 className="text-3xl font-black mt-1">
          {value}
        </h3>

        <p className="text-xs text-muted-foreground mt-2">
          {description}
        </p>

      </div>

    </div>
  );
};

/* =========================================================
   CHART CARD
========================================================= */

type ChartCardProps = {
  title: string;
  description: string;
  value: string;
  trend: string;
  trendPositive?: boolean;
  children: React.ReactNode;
};

const ChartCard = ({
  title,
  description,
  value,
  trend,
  trendPositive,
  children,
}: ChartCardProps) => {
  return (
    <div className="border rounded-3xl bg-background p-6 shadow-sm">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

        <div>
          <h2 className="text-xl font-bold">
            {title}
          </h2>

          <p className="text-sm text-muted-foreground mt-1">
            {description}
          </p>
        </div>

        <div className="sm:text-right">

          <p className="text-2xl font-black">
            {value}
          </p>

          <div
            className={`flex items-center sm:justify-end gap-1 text-sm font-semibold ${
              trendPositive
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {trendPositive ? (
              <ArrowUpRight className="h-4 w-4" />
            ) : (
              <ArrowDownRight className="h-4 w-4" />
            )}

            {trend}
          </div>

        </div>

      </div>

      {children}

    </div>
  );
};

export default AnalyticsPage;