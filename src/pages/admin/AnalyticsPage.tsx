import {
  Search,
  TrendingUp,
  TrendingDown,
  Users,
  BookOpen,
  GraduationCap,
  DollarSign,
  BarChart3,
  Activity,
  CheckCircle2,
  Clock3,
  Star,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  CalendarDays,
  RefreshCw,
} from "lucide-react";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type AnalyticsPeriod =
  | "7"
  | "30"
  | "90"
  | "365";

interface CourseAnalytics {
  id: string;
  course: string;
  instructor: string;
  enrollments: number;
  completions: number;
  completionRate: number;
  averageScore: number;
  rating: number;
  revenue: number;
  activeStudents: number;
}

interface MonthlyAnalytics {
  month: string;
  enrollments: number;
  completions: number;
  revenue: number;
  activeUsers: number;
}

const courseAnalyticsData: CourseAnalytics[] = [
  {
    id: "course-001",
    course: "Full Stack Web Development",
    instructor: "John Doe",
    enrollments: 324,
    completions: 253,
    completionRate: 78,
    averageScore: 86,
    rating: 4.8,
    revenue: 124800,
    activeStudents: 216,
  },
  {
    id: "course-002",
    course: "UI/UX Design Fundamentals",
    instructor: "Sarah Smith",
    enrollments: 287,
    completions: 241,
    completionRate: 84,
    averageScore: 89,
    rating: 4.9,
    revenue: 103320,
    activeStudents: 198,
  },
  {
    id: "course-003",
    course: "Advanced JavaScript",
    instructor: "Michael Brown",
    enrollments: 245,
    completions: 174,
    completionRate: 71,
    averageScore: 81,
    rating: 4.7,
    revenue: 88200,
    activeStudents: 164,
  },
  {
    id: "course-004",
    course: "Database Management",
    instructor: "Daniel Wilson",
    enrollments: 198,
    completions: 137,
    completionRate: 69,
    averageScore: 79,
    rating: 4.6,
    revenue: 71280,
    activeStudents: 121,
  },
  {
    id: "course-005",
    course: "Digital Marketing",
    instructor: "Hana Alemu",
    enrollments: 176,
    completions: 144,
    completionRate: 82,
    averageScore: 87,
    rating: 4.8,
    revenue: 63360,
    activeStudents: 142,
  },
  {
    id: "course-006",
    course: "React Development",
    instructor: "Abebe Kebede",
    enrollments: 265,
    completions: 221,
    completionRate: 83,
    averageScore: 91,
    rating: 4.9,
    revenue: 95400,
    activeStudents: 187,
  },
  {
    id: "course-007",
    course: "Node.js Backend Development",
    instructor: "Samuel Tesfaye",
    enrollments: 214,
    completions: 156,
    completionRate: 73,
    averageScore: 84,
    rating: 4.7,
    revenue: 77040,
    activeStudents: 151,
  },
  {
    id: "course-008",
    course: "Product Design",
    instructor: "Marta Bekele",
    enrollments: 189,
    completions: 151,
    completionRate: 80,
    averageScore: 88,
    rating: 4.8,
    revenue: 68040,
    activeStudents: 133,
  },
  {
    id: "course-009",
    course: "Cloud Computing",
    instructor: "Samuel Tesfaye",
    enrollments: 154,
    completions: 103,
    completionRate: 67,
    averageScore: 77,
    rating: 4.5,
    revenue: 55440,
    activeStudents: 104,
  },
  {
    id: "course-010",
    course: "Cybersecurity Fundamentals",
    instructor: "Michael Brown",
    enrollments: 142,
    completions: 96,
    completionRate: 68,
    averageScore: 80,
    rating: 4.6,
    revenue: 51120,
    activeStudents: 98,
  },
  {
    id: "course-011",
    course: "Mobile App Development",
    instructor: "Abebe Kebede",
    enrollments: 168,
    completions: 127,
    completionRate: 76,
    averageScore: 85,
    rating: 4.7,
    revenue: 60480,
    activeStudents: 118,
  },
  {
    id: "course-012",
    course: "DevOps Engineering",
    instructor: "John Doe",
    enrollments: 118,
    completions: 82,
    completionRate: 69,
    averageScore: 82,
    rating: 4.5,
    revenue: 42480,
    activeStudents: 87,
  },
];

const monthlyAnalyticsData: MonthlyAnalytics[] = [
  {
    month: "Jan",
    enrollments: 180,
    completions: 94,
    revenue: 42000,
    activeUsers: 620,
  },
  {
    month: "Feb",
    enrollments: 220,
    completions: 112,
    revenue: 51000,
    activeUsers: 710,
  },
  {
    month: "Mar",
    enrollments: 205,
    completions: 108,
    revenue: 47000,
    activeUsers: 685,
  },
  {
    month: "Apr",
    enrollments: 270,
    completions: 135,
    revenue: 63000,
    activeUsers: 820,
  },
  {
    month: "May",
    enrollments: 250,
    completions: 141,
    revenue: 59000,
    activeUsers: 790,
  },
  {
    month: "Jun",
    enrollments: 310,
    completions: 164,
    revenue: 72000,
    activeUsers: 940,
  },
  {
    month: "Jul",
    enrollments: 295,
    completions: 158,
    revenue: 68000,
    activeUsers: 905,
  },
  {
    month: "Aug",
    enrollments: 340,
    completions: 182,
    revenue: 81000,
    activeUsers: 1040,
  },
  {
    month: "Sep",
    enrollments: 365,
    completions: 196,
    revenue: 88000,
    activeUsers: 1120,
  },
  {
    month: "Oct",
    enrollments: 390,
    completions: 210,
    revenue: 94000,
    activeUsers: 1190,
  },
  {
    month: "Nov",
    enrollments: 420,
    completions: 232,
    revenue: 102000,
    activeUsers: 1280,
  },
  {
    month: "Dec",
    enrollments: 460,
    completions: 250,
    revenue: 114000,
    activeUsers: 1390,
  },
];

const AnalyticsPage = () => {
  const [search, setSearch] = useState("");

  const [period, setPeriod] =
    useState<AnalyticsPeriod>("365");

  const [currentPage, setCurrentPage] =
    useState(1);

  const itemsPerPage = 8;

  /*
   * ============================================
   * PERIOD DATA
   * ============================================
   */

  const periodData = useMemo(() => {
    if (period === "7") {
      return monthlyAnalyticsData.slice(-1);
    }

    if (period === "30") {
      return monthlyAnalyticsData.slice(-2);
    }

    if (period === "90") {
      return monthlyAnalyticsData.slice(-3);
    }

    return monthlyAnalyticsData;
  }, [period]);

  /*
   * ============================================
   * FILTERING
   * ============================================
   */

  const filteredCourses = useMemo(() => {
    const searchValue = search
      .toLowerCase()
      .trim();

    return courseAnalyticsData.filter(
      (course) => {
        return (
          !searchValue ||
          course.course
            .toLowerCase()
            .includes(searchValue) ||
          course.instructor
            .toLowerCase()
            .includes(searchValue)
        );
      }
    );
  }, [search]);

  /*
   * ============================================
   * PAGINATION
   * ============================================
   */

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredCourses.length /
        itemsPerPage
    )
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages
  );

  const paginatedCourses =
    filteredCourses.slice(
      (safeCurrentPage - 1) *
        itemsPerPage,
      safeCurrentPage * itemsPerPage
    );

  /*
   * ============================================
   * STATISTICS
   * ============================================
   */

  const totalEnrollments =
    courseAnalyticsData.reduce(
      (sum, course) =>
        sum + course.enrollments,
      0
    );

  const totalCompletions =
    courseAnalyticsData.reduce(
      (sum, course) =>
        sum + course.completions,
      0
    );

  const totalActiveStudents =
    courseAnalyticsData.reduce(
      (sum, course) =>
        sum + course.activeStudents,
      0
    );

  const totalRevenue =
    courseAnalyticsData.reduce(
      (sum, course) =>
        sum + course.revenue,
      0
    );

  const overallCompletionRate =
    totalEnrollments > 0
      ? Math.round(
          (totalCompletions /
            totalEnrollments) *
            100
        )
      : 0;

  const overallAverageScore =
    courseAnalyticsData.length > 0
      ? Math.round(
          courseAnalyticsData.reduce(
            (sum, course) =>
              sum +
              course.averageScore,
            0
          ) /
            courseAnalyticsData.length
        )
      : 0;

  const overallRating =
    courseAnalyticsData.length > 0
      ? (
          courseAnalyticsData.reduce(
            (sum, course) =>
              sum + course.rating,
            0
          ) /
          courseAnalyticsData.length
        ).toFixed(1)
      : "0.0";

  const periodEnrollments =
    periodData.reduce(
      (sum, month) =>
        sum + month.enrollments,
      0
    );

  const periodCompletions =
    periodData.reduce(
      (sum, month) =>
        sum + month.completions,
      0
    );

  const periodRevenue =
    periodData.reduce(
      (sum, month) =>
        sum + month.revenue,
      0
    );

  const periodActiveUsers =
    periodData.length > 0
      ? periodData[
          periodData.length - 1
        ].activeUsers
      : 0;

  /*
   * ============================================
   * HANDLERS
   * ============================================
   */

  const handleSearchChange = (
    value: string
  ) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handlePeriodChange = (
    value: string
  ) => {
    setPeriod(
      value as AnalyticsPeriod
    );

    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearch("");
    setPeriod("365");
    setCurrentPage(1);
  };

  const handleRefresh = () => {
    console.log(
      "Refresh analytics data"
    );
  };

  /*
   * ============================================
   * CHART HELPERS
   * ============================================
   */

  const maxEnrollments = Math.max(
    ...periodData.map(
      (item) => item.enrollments
    ),
    1
  );

  const maxRevenue = Math.max(
    ...periodData.map(
      (item) => item.revenue
    ),
    1
  );

  const maxActiveUsers = Math.max(
    ...periodData.map(
      (item) => item.activeUsers
    ),
    1
  );

  const getScoreClasses = (
    score: number
  ) => {
    if (score >= 85) {
      return "text-green-600";
    }

    if (score >= 70) {
      return "text-yellow-600";
    }

    return "text-red-500";
  };

  return (
    <div className="space-y-6">
      {/* ===================================== */}
      {/* HEADER */}
      {/* ===================================== */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Analytics
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Monitor platform performance,
            learner activity, course progress
            and revenue.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            onClick={handleRefresh}
            className="rounded-xl"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>

          <Select
            value={period}
            onValueChange={
              handlePeriodChange
            }
          >
            <SelectTrigger className="w-[180px] rounded-xl">
              <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />

              <SelectValue placeholder="Period" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="7">
                Last 7 Days
              </SelectItem>

              <SelectItem value="30">
                Last 30 Days
              </SelectItem>

              <SelectItem value="90">
                Last 90 Days
              </SelectItem>

              <SelectItem value="365">
                Last 12 Months
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* ===================================== */}
      {/* STATISTICS */}
      {/* ===================================== */}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Enrollments
                </p>

                <p className="mt-1 text-2xl font-bold">
                  {periodEnrollments.toLocaleString()}
                </p>

                <div className="mt-2 flex items-center gap-1 text-xs text-green-600">
                  <TrendingUp className="h-3.5 w-3.5" />
                  14.8%
                </div>
              </div>

              <div className="rounded-xl bg-primary/10 p-3 text-primary">
                <GraduationCap className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Completion Rate
                </p>

                <p className="mt-1 text-2xl font-bold">
                  {overallCompletionRate}%
                </p>

                <div className="mt-2 flex items-center gap-1 text-xs text-green-600">
                  <TrendingUp className="h-3.5 w-3.5" />
                  6.4%
                </div>
              </div>

              <div className="rounded-xl bg-green-500/10 p-3 text-green-600">
                <CheckCircle2 className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Active Students
                </p>

                <p className="mt-1 text-2xl font-bold">
                  {totalActiveStudents.toLocaleString()}
                </p>

                <div className="mt-2 flex items-center gap-1 text-xs text-green-600">
                  <TrendingUp className="h-3.5 w-3.5" />
                  9.2%
                </div>
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
                  Average Score
                </p>

                <p className="mt-1 text-2xl font-bold">
                  {overallAverageScore}%
                </p>

                <div className="mt-2 flex items-center gap-1 text-xs text-green-600">
                  <TrendingUp className="h-3.5 w-3.5" />
                  3.2%
                </div>
              </div>

              <div className="rounded-xl bg-purple-500/10 p-3 text-purple-600">
                <BarChart3 className="h-5 w-5" />
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
                  {totalRevenue.toLocaleString()} ETB
                </p>

                <div className="mt-2 flex items-center gap-1 text-xs text-green-600">
                  <TrendingUp className="h-3.5 w-3.5" />
                  18.6%
                </div>
              </div>

              <div className="rounded-xl bg-yellow-500/10 p-3 text-yellow-600">
                <DollarSign className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ===================================== */}
      {/* FILTERS */}
      {/* ===================================== */}

      <Card>
        <CardContent className="p-4">
          <div className="grid gap-3 md:grid-cols-[1fr_auto_auto]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                value={search}
                onChange={(event) =>
                  handleSearchChange(
                    event.target.value
                  )
                }
                placeholder="Search courses or instructors..."
                className="rounded-xl pl-9"
              />
            </div>

            <Select
              value={period}
              onValueChange={
                handlePeriodChange
              }
            >
              <SelectTrigger className="w-full rounded-xl md:w-[180px]">
                <SelectValue placeholder="Period" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="7">
                  Last 7 Days
                </SelectItem>

                <SelectItem value="30">
                  Last 30 Days
                </SelectItem>

                <SelectItem value="90">
                  Last 90 Days
                </SelectItem>

                <SelectItem value="365">
                  Last 12 Months
                </SelectItem>
              </SelectContent>
            </Select>

            {(search ||
              period !== "365") && (
              <Button
                variant="outline"
                onClick={clearFilters}
                className="rounded-xl"
              >
                Clear Filters
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* ===================================== */}
      {/* ENROLLMENT ANALYTICS */}
      {/* ===================================== */}

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-semibold">
                Enrollment Overview
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Enrollment and completion trends
                for the selected period.
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                Enrollments
              </div>

              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                Completions
              </div>
            </div>
          </div>

          <div className="mt-8 flex h-[260px] items-end gap-2 overflow-x-auto">
            {periodData.map(
              (item) => {
                const enrollmentHeight =
                  (item.enrollments /
                    maxEnrollments) *
                  190;

                const completionHeight =
                  (item.completions /
                    maxEnrollments) *
                  190;

                return (
                  <div
                    key={item.month}
                    className="flex min-w-[55px] flex-1 flex-col items-center gap-2"
                  >
                    <div className="flex h-[200px] items-end gap-1">
                      <div
                        className="w-5 rounded-t-lg bg-primary"
                        style={{
                          height: `${enrollmentHeight}px`,
                        }}
                        title={`Enrollments: ${item.enrollments}`}
                      />

                      <div
                        className="w-5 rounded-t-lg bg-green-500"
                        style={{
                          height: `${completionHeight}px`,
                        }}
                        title={`Completions: ${item.completions}`}
                      />
                    </div>

                    <span className="text-xs text-muted-foreground">
                      {item.month}
                    </span>
                  </div>
                );
              }
            )}
          </div>

          <div className="mt-6 grid gap-4 border-t pt-5 sm:grid-cols-3">
            <div>
              <p className="text-sm text-muted-foreground">
                Enrollments
              </p>

              <p className="mt-1 text-xl font-bold">
                {periodEnrollments.toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Completions
              </p>

              <p className="mt-1 text-xl font-bold">
                {periodCompletions.toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Active Users
              </p>

              <p className="mt-1 text-xl font-bold">
                {periodActiveUsers.toLocaleString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ===================================== */}
      {/* REVENUE & USER ACTIVITY */}
      {/* ===================================== */}

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold">
                  Revenue Overview
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  Revenue generated across the
                  selected period.
                </p>
              </div>

              <DollarSign className="h-5 w-5 text-primary" />
            </div>

            <div className="mt-8 flex h-[230px] items-end gap-2 overflow-x-auto">
              {periodData.map(
                (item) => {
                  const height =
                    (item.revenue /
                      maxRevenue) *
                    175;

                  return (
                    <div
                      key={item.month}
                      className="flex min-w-[45px] flex-1 flex-col items-center gap-2"
                    >
                      <div className="flex h-[180px] items-end">
                        <div
                          className="w-7 rounded-t-lg bg-primary"
                          style={{
                            height: `${height}px`,
                          }}
                          title={`${item.revenue.toLocaleString()} ETB`}
                        />
                      </div>

                      <span className="text-xs text-muted-foreground">
                        {item.month}
                      </span>
                    </div>
                  );
                }
              )}
            </div>

            <div className="mt-5 border-t pt-5">
              <p className="text-sm text-muted-foreground">
                Period Revenue
              </p>

              <p className="mt-1 text-2xl font-bold">
                {periodRevenue.toLocaleString()} ETB
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold">
                  Active User Activity
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  Active learner activity across
                  the selected period.
                </p>
              </div>

              <Activity className="h-5 w-5 text-primary" />
            </div>

            <div className="mt-8 flex h-[230px] items-end gap-2 overflow-x-auto">
              {periodData.map(
                (item) => {
                  const height =
                    (item.activeUsers /
                      maxActiveUsers) *
                    175;

                  return (
                    <div
                      key={item.month}
                      className="flex min-w-[45px] flex-1 flex-col items-center gap-2"
                    >
                      <div className="flex h-[180px] items-end">
                        <div
                          className="w-7 rounded-t-lg bg-blue-500"
                          style={{
                            height: `${height}px`,
                          }}
                          title={`${item.activeUsers.toLocaleString()} active users`}
                        />
                      </div>

                      <span className="text-xs text-muted-foreground">
                        {item.month}
                      </span>
                    </div>
                  );
                }
              )}
            </div>

            <div className="mt-5 border-t pt-5">
              <p className="text-sm text-muted-foreground">
                Current Active Users
              </p>

              <p className="mt-1 text-2xl font-bold">
                {periodActiveUsers.toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ===================================== */}
      {/* COURSE PERFORMANCE */}
      {/* ===================================== */}

      <Card className="overflow-hidden">
        <div className="border-b px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold">
                Course Performance
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Performance metrics for individual
                courses.
              </p>
            </div>

            <BookOpen className="h-5 w-5 text-primary" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px]">
            <thead className="border-b bg-muted/30">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Course
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Instructor
                </th>

                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Enrollments
                </th>

                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Completion
                </th>

                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Avg. Score
                </th>

                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Rating
                </th>

                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Revenue
                </th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {paginatedCourses.length >
              0 ? (
                paginatedCourses.map(
                  (course) => (
                    <tr
                      key={course.id}
                      className="transition hover:bg-muted/20"
                    >
                      {/* Course */}

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <BookOpen className="h-5 w-5" />
                          </div>

                          <div className="min-w-0">
                            <p className="max-w-[260px] truncate font-semibold">
                              {course.course}
                            </p>

                            <p className="mt-1 text-xs text-muted-foreground">
                              {
                                course.activeStudents
                              }{" "}
                              active students
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Instructor */}

                      <td className="px-6 py-4">
                        <span className="text-sm text-muted-foreground">
                          {course.instructor}
                        </span>
                      </td>

                      {/* Enrollments */}

                      <td className="px-6 py-4 text-center">
                        <span className="font-semibold">
                          {course.enrollments.toLocaleString()}
                        </span>
                      </td>

                      {/* Completion */}

                      <td className="px-6 py-4 text-center">
                        <span
                          className={`font-semibold ${getScoreClasses(
                            course.completionRate
                          )}`}
                        >
                          {
                            course.completionRate
                          }
                          %
                        </span>
                      </td>

                      {/* Score */}

                      <td className="px-6 py-4 text-center">
                        <span
                          className={`font-semibold ${getScoreClasses(
                            course.averageScore
                          )}`}
                        >
                          {
                            course.averageScore
                          }
                          %
                        </span>
                      </td>

                      {/* Rating */}

                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Star className="h-4 w-4 fill-current text-yellow-500" />

                          <span className="font-semibold">
                            {course.rating.toFixed(
                              1
                            )}
                          </span>
                        </div>
                      </td>

                      {/* Revenue */}

                      <td className="px-6 py-4 text-center">
                        <span className="font-semibold">
                          {course.revenue.toLocaleString()}{" "}
                          ETB
                        </span>
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-16 text-center"
                  >
                    <div className="mx-auto flex max-w-sm flex-col items-center">
                      <div className="rounded-full bg-muted p-4">
                        <BarChart3 className="h-6 w-6 text-muted-foreground" />
                      </div>

                      <h3 className="mt-4 font-semibold">
                        No analytics found
                      </h3>

                      <p className="mt-1 text-sm text-muted-foreground">
                        Try adjusting your search
                        settings.
                      </p>

                      <Button
                        variant="outline"
                        className="mt-4 rounded-xl"
                        onClick={
                          clearFilters
                        }
                      >
                        Clear Filters
                      </Button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* =================================== */}
        {/* PAGINATION */}
        {/* =================================== */}

        <div className="flex flex-col gap-3 border-t px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-medium text-foreground">
              {filteredCourses.length ===
              0
                ? 0
                : (safeCurrentPage - 1) *
                    itemsPerPage +
                  1}
            </span>{" "}
            to{" "}
            <span className="font-medium text-foreground">
              {Math.min(
                safeCurrentPage *
                  itemsPerPage,
                filteredCourses.length
              )}
            </span>{" "}
            of{" "}
            <span className="font-medium text-foreground">
              {filteredCourses.length}
            </span>{" "}
            courses
          </p>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              disabled={
                safeCurrentPage === 1
              }
              onClick={() =>
                setCurrentPage((page) =>
                  Math.max(1, page - 1)
                )
              }
              className="rounded-lg"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex items-center gap-1">
              {Array.from(
                {
                  length: totalPages,
                },
                (_, index) =>
                  index + 1
              ).map((page) => (
                <Button
                  key={page}
                  variant={
                    page ===
                    safeCurrentPage
                      ? "default"
                      : "ghost"
                  }
                  size="sm"
                  onClick={() =>
                    setCurrentPage(page)
                  }
                  className="h-8 w-8 rounded-lg p-0"
                >
                  {page}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              disabled={
                safeCurrentPage ===
                totalPages
              }
              onClick={() =>
                setCurrentPage((page) =>
                  Math.min(
                    totalPages,
                    page + 1
                  )
                )
              }
              className="rounded-lg"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* ===================================== */}
      {/* ADMIN NOTE */}
      {/* ===================================== */}

      <div className="flex items-start gap-3 rounded-xl border bg-muted/20 p-4">
        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

        <div>
          <p className="text-sm font-medium">
            Analytics dashboard
          </p>

          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            Analytics currently use placeholder
            data. Enrollment, completion, active
            user, course performance, payment and
            revenue metrics will be connected to
            the LMS analytics APIs once the backend
            reporting endpoints are implemented.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;