import {
  BarChart3,
  FileBarChart,
  Download,
  CalendarDays,
  Users,
  GraduationCap,
  BookOpen,
  DollarSign,
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  Star,
  ClipboardList,
  UserPlus,
  ArrowUpRight,
  ArrowDownRight,
  FileText,
  PieChart,
  Activity,
  RefreshCcw,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ReportPeriod = "7d" | "30d" | "90d" | "1y";

interface ReportMetric {
  label: string;
  value: string;
  change: string;
  positive: boolean;
  icon: React.ReactNode;
}

const ReportsPage = () => {
  const [period, setPeriod] = useState<ReportPeriod>("30d");

  const reportMetrics: ReportMetric[] = [
    {
      label: "Total Revenue",
      value: "$48,295",
      change: "12.8%",
      positive: true,
      icon: <DollarSign className="h-5 w-5" />,
    },
    {
      label: "New Users",
      value: "384",
      change: "8.4%",
      positive: true,
      icon: <UserPlus className="h-5 w-5" />,
    },
    {
      label: "Course Enrollments",
      value: "1,248",
      change: "15.2%",
      positive: true,
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      label: "Completed Courses",
      value: "692",
      change: "6.7%",
      positive: true,
      icon: <GraduationCap className="h-5 w-5" />,
    },
  ];

  const monthlyRevenue = [
    { month: "Jan", value: 5200 },
    { month: "Feb", value: 6800 },
    { month: "Mar", value: 5900 },
    { month: "Apr", value: 7600 },
    { month: "May", value: 8400 },
    { month: "Jun", value: 9100 },
    { month: "Jul", value: 10200 },
    { month: "Aug", value: 11600 },
  ];

  const enrollmentData = [
    { month: "Jan", students: 112 },
    { month: "Feb", students: 145 },
    { month: "Mar", students: 138 },
    { month: "Apr", students: 172 },
    { month: "May", students: 196 },
    { month: "Jun", students: 214 },
    { month: "Jul", students: 238 },
    { month: "Aug", students: 267 },
  ];

  const coursePerformance = [
    {
      name: "Full-Stack Web Development",
      enrollments: 284,
      completion: 78,
      rating: 4.8,
      revenue: "$12,480",
    },
    {
      name: "React & TypeScript Masterclass",
      enrollments: 231,
      completion: 82,
      rating: 4.9,
      revenue: "$9,840",
    },
    {
      name: "Node.js API Development",
      enrollments: 187,
      completion: 74,
      rating: 4.7,
      revenue: "$7,420",
    },
    {
      name: "UI/UX Design Fundamentals",
      enrollments: 164,
      completion: 86,
      rating: 4.8,
      revenue: "$6,920",
    },
    {
      name: "Python for Beginners",
      enrollments: 152,
      completion: 71,
      rating: 4.6,
      revenue: "$5,840",
    },
  ];

  const instructorPerformance = [
    {
      name: "John Instructor",
      courses: 8,
      students: 642,
      revenue: "$18,420",
      rating: 4.9,
    },
    {
      name: "Robert Smith",
      courses: 6,
      students: 438,
      revenue: "$12,840",
      rating: 4.8,
    },
    {
      name: "Anna Wilson",
      courses: 5,
      students: 326,
      revenue: "$8,920",
      rating: 4.7,
    },
    {
      name: "Michael Carter",
      courses: 4,
      students: 284,
      revenue: "$6,740",
      rating: 4.6,
    },
  ];

  const handleExport = (reportName: string) => {
    console.log(`Exporting ${reportName} report`);
  };

  const handleGenerate = () => {
    console.log(`Generating report for period: ${period}`);
  };

  const getPeriodLabel = () => {
    switch (period) {
      case "7d":
        return "Last 7 Days";
      case "30d":
        return "Last 30 Days";
      case "90d":
        return "Last 90 Days";
      case "1y":
        return "Last 12 Months";
      default:
        return "Last 30 Days";
    }
  };

  const maxRevenue = Math.max(
    ...monthlyRevenue.map((item) => item.value)
  );

  const maxEnrollments = Math.max(
    ...enrollmentData.map((item) => item.students)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
            <FileBarChart className="h-4 w-4" />
            <span>Administration</span>
            <span>/</span>
            <span>Reports</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Reports
          </h1>

          <p className="mt-1 text-muted-foreground">
            Generate and review detailed reports about your LMS
            platform.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <Select
            value={period}
            onValueChange={(value) =>
              setPeriod(value as ReportPeriod)
            }
          >
            <SelectTrigger className="w-full sm:w-[170px]">
              <CalendarDays className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="90d">Last 90 Days</SelectItem>
              <SelectItem value="1y">Last 12 Months</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={handleGenerate}>
            <RefreshCcw className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Period Banner */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Activity className="h-5 w-5" />
              </div>

              <div>
                <p className="font-semibold">
                  Report period: {getPeriodLabel()}
                </p>

                <p className="mt-0.5 text-sm text-muted-foreground">
                  Showing platform performance and activity for the
                  selected reporting period.
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              onClick={() => handleExport("Platform")}
            >
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {reportMetrics.map((metric) => (
          <Card key={metric.label}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {metric.label}
                  </p>

                  <p className="mt-1 text-2xl font-bold">
                    {metric.value}
                  </p>

                  <div className="mt-2 flex items-center gap-1.5">
                    {metric.positive ? (
                      <ArrowUpRight className="h-4 w-4 text-green-600" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-red-600" />
                    )}

                    <span
                      className={
                        metric.positive
                          ? "text-sm font-medium text-green-600"
                          : "text-sm font-medium text-red-600"
                      }
                    >
                      {metric.change}
                    </span>

                    <span className="text-xs text-muted-foreground">
                      vs previous period
                    </span>
                  </div>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  {metric.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue + Enrollment Charts */}
      <div className="grid gap-6 xl:grid-cols-2">
        {/* Revenue */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Revenue Overview</CardTitle>

                <p className="mt-1 text-sm text-muted-foreground">
                  Monthly platform revenue
                </p>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleExport("Revenue")}
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            <div className="flex h-[280px] items-end gap-2 sm:gap-4">
              {monthlyRevenue.map((item) => {
                const height = Math.max(
                  8,
                  (item.value / maxRevenue) * 100
                );

                return (
                  <div
                    key={item.month}
                    className="flex h-full flex-1 flex-col justify-end"
                  >
                    <div className="group relative flex flex-1 items-end">
                      <div
                        className="w-full rounded-t-lg bg-primary/80 transition-all hover:bg-primary"
                        style={{ height: `${height}%` }}
                      >
                        <div className="pointer-events-none absolute -top-8 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs text-background group-hover:block">
                          ${item.value.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    <p className="mt-2 text-center text-xs text-muted-foreground">
                      {item.month}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 flex items-center justify-between border-t pt-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  Total Revenue
                </p>

                <p className="text-xl font-bold">$64,800</p>
              </div>

              <div className="flex items-center gap-1 text-sm font-medium text-green-600">
                <TrendingUp className="h-4 w-4" />
                18.4%
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enrollments */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Enrollment Growth</CardTitle>

                <p className="mt-1 text-sm text-muted-foreground">
                  New student enrollments
                </p>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleExport("Enrollment")}
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            <div className="flex h-[280px] items-end gap-2 sm:gap-4">
              {enrollmentData.map((item) => {
                const height = Math.max(
                  8,
                  (item.students / maxEnrollments) * 100
                );

                return (
                  <div
                    key={item.month}
                    className="flex h-full flex-1 flex-col justify-end"
                  >
                    <div className="group relative flex flex-1 items-end">
                      <div
                        className="w-full rounded-t-lg bg-green-500/70 transition-all hover:bg-green-500"
                        style={{ height: `${height}%` }}
                      >
                        <div className="pointer-events-none absolute -top-8 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs text-background group-hover:block">
                          {item.students} students
                        </div>
                      </div>
                    </div>

                    <p className="mt-2 text-center text-xs text-muted-foreground">
                      {item.month}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 flex items-center justify-between border-t pt-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  Total New Students
                </p>

                <p className="text-xl font-bold">1,482</p>
              </div>

              <div className="flex items-center gap-1 text-sm font-medium text-green-600">
                <TrendingUp className="h-4 w-4" />
                15.2%
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Platform Distribution */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Users className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Students
                </p>
                <p className="text-xl font-bold">2,697</p>
              </div>
            </div>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: "72%" }}
              />
            </div>

            <p className="mt-2 text-xs text-muted-foreground">
              72% of registered users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600">
                <GraduationCap className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Instructors
                </p>
                <p className="text-xl font-bold">148</p>
              </div>
            </div>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-purple-500"
                style={{ width: "8%" }}
              />
            </div>

            <p className="mt-2 text-xs text-muted-foreground">
              8% of registered users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600">
                <BookOpen className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Courses
                </p>
                <p className="text-xl font-bold">326</p>
              </div>
            </div>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-orange-500"
                style={{ width: "64%" }}
              />
            </div>

            <p className="mt-2 text-xs text-muted-foreground">
              64% published
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-600">
                <Star className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Avg. Rating
                </p>
                <p className="text-xl font-bold">4.7 / 5</p>
              </div>
            </div>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-yellow-500"
                style={{ width: "94%" }}
              />
            </div>

            <p className="mt-2 text-xs text-muted-foreground">
              Based on 1,284 reviews
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Course Performance */}
      <Card className="overflow-hidden">
        <CardHeader>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Course Performance</CardTitle>

              <p className="mt-1 text-sm text-muted-foreground">
                Performance metrics for top courses.
              </p>
            </div>

            <Button
              variant="outline"
              onClick={() => handleExport("Course Performance")}
            >
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Course
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Enrollments
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Completion
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Rating
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Revenue
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {coursePerformance.map((course) => (
                  <tr
                    key={course.name}
                    className="transition-colors hover:bg-muted/20"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <BookOpen className="h-4 w-4" />
                        </div>

                        <span className="text-sm font-medium">
                          {course.name}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm">
                      {course.enrollments}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-2 w-24 overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-green-500"
                            style={{
                              width: `${course.completion}%`,
                            }}
                          />
                        </div>

                        <span className="text-sm">
                          {course.completion}%
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">
                          {course.rating}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm font-semibold">
                      {course.revenue}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="divide-y lg:hidden">
            {coursePerformance.map((course) => (
              <div key={course.name} className="p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <BookOpen className="h-5 w-5" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-semibold">
                      {course.name}
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      {course.enrollments} enrollments
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border p-3">
                    <p className="text-xs text-muted-foreground">
                      Completion
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                      {course.completion}%
                    </p>
                  </div>

                  <div className="rounded-xl border p-3">
                    <p className="text-xs text-muted-foreground">
                      Rating
                    </p>

                    <div className="mt-1 flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold">
                        {course.rating}
                      </span>
                    </div>
                  </div>

                  <div className="rounded-xl border p-3 col-span-2">
                    <p className="text-xs text-muted-foreground">
                      Revenue
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                      {course.revenue}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Instructor Performance */}
      <Card className="overflow-hidden">
        <CardHeader>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Instructor Performance</CardTitle>

              <p className="mt-1 text-sm text-muted-foreground">
                Revenue, students, and ratings by instructor.
              </p>
            </div>

            <Button
              variant="outline"
              onClick={() =>
                handleExport("Instructor Performance")
              }
            >
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Instructor
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Courses
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Students
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Rating
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Revenue
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {instructorPerformance.map((instructor) => (
                  <tr
                    key={instructor.name}
                    className="transition-colors hover:bg-muted/20"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                          {instructor.name
                            .split(" ")
                            .map((name) => name.charAt(0))
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
                        </div>

                        <span className="text-sm font-medium">
                          {instructor.name}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm">
                      {instructor.courses}
                    </td>

                    <td className="px-6 py-4 text-sm">
                      {instructor.students}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">
                          {instructor.rating}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm font-semibold">
                      {instructor.revenue}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="divide-y lg:hidden">
            {instructorPerformance.map((instructor) => (
              <div key={instructor.name} className="p-4 sm:p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {instructor.name
                      .split(" ")
                      .map((name) => name.charAt(0))
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>

                  <div>
                    <p className="text-sm font-semibold">
                      {instructor.name}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {instructor.courses} courses
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border p-3">
                    <p className="text-xs text-muted-foreground">
                      Students
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                      {instructor.students}
                    </p>
                  </div>

                  <div className="rounded-xl border p-3">
                    <p className="text-xs text-muted-foreground">
                      Rating
                    </p>

                    <div className="mt-1 flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold">
                        {instructor.rating}
                      </span>
                    </div>
                  </div>

                  <div className="col-span-2 rounded-xl border p-3">
                    <p className="text-xs text-muted-foreground">
                      Revenue
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                      {instructor.revenue}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Reports</CardTitle>

          <p className="text-sm text-muted-foreground">
            Export specific areas of the platform.
          </p>
        </CardHeader>

        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Button
              variant="outline"
              className="h-auto justify-start p-4"
              onClick={() => handleExport("Users")}
            >
              <Users className="mr-3 h-5 w-5 text-primary" />

              <span className="text-left">
                <span className="block font-semibold">
                  User Report
                </span>

                <span className="block text-xs text-muted-foreground">
                  Users and registration data
                </span>
              </span>
            </Button>

            <Button
              variant="outline"
              className="h-auto justify-start p-4"
              onClick={() => handleExport("Sales")}
            >
              <ShoppingCart className="mr-3 h-5 w-5 text-green-600" />

              <span className="text-left">
                <span className="block font-semibold">
                  Sales Report
                </span>

                <span className="block text-xs text-muted-foreground">
                  Orders and revenue
                </span>
              </span>
            </Button>

            <Button
              variant="outline"
              className="h-auto justify-start p-4"
              onClick={() => handleExport("Courses")}
            >
              <BookOpen className="mr-3 h-5 w-5 text-purple-600" />

              <span className="text-left">
                <span className="block font-semibold">
                  Course Report
                </span>

                <span className="block text-xs text-muted-foreground">
                  Course performance
                </span>
              </span>
            </Button>

            <Button
              variant="outline"
              className="h-auto justify-start p-4"
              onClick={() => handleExport("Assignments")}
            >
              <ClipboardList className="mr-3 h-5 w-5 text-orange-600" />

              <span className="text-left">
                <span className="block font-semibold">
                  Assignment Report
                </span>

                <span className="block text-xs text-muted-foreground">
                  Submissions and scores
                </span>
              </span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Bottom Notice */}
      <div className="rounded-xl border border-dashed bg-muted/20 p-4">
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">
            Development note:
          </strong>{" "}
          Report information is currently based on placeholder
          analytics data. Export and report generation will be
          connected to the backend analytics/reporting APIs later.
        </p>
      </div>
    </div>
  );
};

export default ReportsPage;