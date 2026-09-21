import {
  BookOpen,
  Users,
  DollarSign,
  Star,
  Plus,
  ArrowUpRight,
  TrendingUp,
  MoreHorizontal,
  MessageSquare,
  Eye,
  BarChart3,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";


/* =========================================================
   DASHBOARD STATISTICS
========================================================= */

const stats = [
  {
    title: "Total Courses",
    value: "12",
    change: "+2 this month",
    icon: BookOpen,
  },
  {
    title: "Total Students",
    value: "2,847",
    change: "+12.5%",
    icon: Users,
  },
  {
    title: "Total Revenue",
    value: "$24,680",
    change: "+18.2%",
    icon: DollarSign,
  },
  {
    title: "Average Rating",
    value: "4.8",
    change: "+0.2 this month",
    icon: Star,
  },
];


/* =========================================================
   COURSES
========================================================= */

const courses = [
  {
    title: "Professional React Development",
    students: 1240,
    rating: 4.9,
    revenue: "$8,420",
    status: "Published",
    image:
      "https://storage.googleapis.com/dala-prod-public-storage/generated-images/678ea2b5-4cb5-4e95-8f1f-9d90d381aff8/react-course-thumbnail-5f467410-1781888612690.webp",
  },
  {
    title: "Advanced Node.js Backend",
    students: 842,
    rating: 4.8,
    revenue: "$5,240",
    status: "Published",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
  },
  {
    title: "Full Stack MERN Development",
    students: 615,
    rating: 4.7,
    revenue: "$4,860",
    status: "Published",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
  },
];


/* =========================================================
   RECENT ENROLLMENTS
========================================================= */

const enrollments = [
  {
    name: "Michael Anderson",
    course: "Professional React Development",
    date: "Today",
    image: "https://i.pravatar.cc/100?img=12",
  },
  {
    name: "Sarah Williams",
    course: "Advanced Node.js Backend",
    date: "Yesterday",
    image: "https://i.pravatar.cc/100?img=32",
  },
  {
    name: "David Miller",
    course: "Full Stack MERN Development",
    date: "2 days ago",
    image: "https://i.pravatar.cc/100?img=45",
  },
  {
    name: "Emma Johnson",
    course: "Professional React Development",
    date: "3 days ago",
    image: "https://i.pravatar.cc/100?img=47",
  },
];


/* =========================================================
   RECENT REVIEWS
========================================================= */

const reviews = [
  {
    name: "James Wilson",
    course: "Professional React Development",
    rating: 5,
    comment:
      "Excellent course. The explanations are clear and the projects are very practical.",
    image: "https://i.pravatar.cc/100?img=11",
  },
  {
    name: "Sophia Brown",
    course: "Advanced Node.js Backend",
    rating: 5,
    comment:
      "One of the best backend courses I've taken. Very well structured.",
    image: "https://i.pravatar.cc/100?img=24",
  },
  {
    name: "Daniel Smith",
    course: "Full Stack MERN Development",
    rating: 4,
    comment:
      "Great content and projects. I would definitely recommend this course.",
    image: "https://i.pravatar.cc/100?img=14",
  },
];


/* =========================================================
   DASHBOARD PAGE
========================================================= */

const DashboardPage = () => {
  return (
    <div className="space-y-8">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

        <div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight">
            Welcome back, Alex 👋
          </h1>

          <p className="text-muted-foreground mt-2">
            Here's what's happening with your courses today.
          </p>
        </div>


        <Button
          onClick={() => {
            window.location.href = "/instructor/courses/create";
          }}
          className="rounded-xl w-full md:w-auto"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Course
        </Button>

      </div>


      {/* =====================================================
          STATISTICS
      ====================================================== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="
                bg-background
                border
                rounded-2xl
                p-5
                shadow-sm
                hover:shadow-md
                transition
              "
            >

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-sm text-muted-foreground">
                    {stat.title}
                  </p>

                  <h2 className="text-3xl font-black mt-2">
                    {stat.value}
                  </h2>

                </div>

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
                  <Icon className="h-5 w-5" />
                </div>

              </div>


              <div className="flex items-center gap-1 mt-4 text-sm text-green-600">
                <TrendingUp className="h-4 w-4" />
                {stat.change}
              </div>

            </div>
          );
        })}

      </div>


      {/* =====================================================
          REVENUE + QUICK ACTIONS
      ====================================================== */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* ===================================================
            REVENUE
        ==================================================== */}

        <div className="xl:col-span-2 bg-background border rounded-2xl p-6">

          <div className="flex items-center justify-between mb-6">

            <div>

              <h2 className="text-xl font-bold">
                Revenue Overview
              </h2>

              <p className="text-sm text-muted-foreground mt-1">
                Your earnings over the last 7 months
              </p>

            </div>

            <Button variant="outline" size="sm">
              This Year
            </Button>

          </div>


          {/* SIMPLE CHART */}

          <div className="h-64 flex items-end gap-3 sm:gap-5 border-b">

            {[45, 62, 52, 78, 65, 88, 96].map(
              (height, index) => (
                <div
                  key={index}
                  className="
                    flex-1
                    flex
                    flex-col
                    items-center
                    justify-end
                    gap-2
                    h-full
                  "
                >

                  <div
                    className="
                      w-full
                      max-w-[45px]
                      bg-primary/80
                      rounded-t-lg
                      hover:bg-primary
                      transition
                    "
                    style={{
                      height: `${height}%`,
                    }}
                  />

                  <span className="text-xs text-muted-foreground">
                    {
                      [
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                        "Aug",
                      ][index]
                    }
                  </span>

                </div>
              )
            )}

          </div>


          <div className="flex items-center gap-2 mt-5">

            <span className="text-2xl font-black">
              $24,680
            </span>

            <span className="text-sm text-green-600 flex items-center">
              <ArrowUpRight className="h-4 w-4" />
              18.2%
            </span>

          </div>

        </div>


        {/* ===================================================
            QUICK ACTIONS
        ==================================================== */}

        <div className="bg-background border rounded-2xl p-6">

          <h2 className="text-xl font-bold">
            Quick Actions
          </h2>

          <p className="text-sm text-muted-foreground mt-1 mb-5">
            Manage your teaching activity
          </p>


          <div className="space-y-3">

            {/* CREATE COURSE */}

            <Button
              variant="outline"
              className="w-full justify-start h-12 rounded-xl"
              onClick={() =>
                (window.location.href =
                  "/instructor/courses/create")
              }
            >
              <Plus className="mr-3 h-5 w-5 text-primary" />
              Create New Course
            </Button>


            {/* STUDENTS */}

            <Button
              variant="outline"
              className="w-full justify-start h-12 rounded-xl"
              onClick={() =>
                (window.location.href =
                  "/instructor/students")
              }
            >
              <Users className="mr-3 h-5 w-5 text-primary" />
              View Students
            </Button>


            {/* ANALYTICS */}

            <Button
              variant="outline"
              className="w-full justify-start h-12 rounded-xl"
              onClick={() =>
                (window.location.href =
                  "/instructor/analytics")
              }
            >
              <BarChartIcon />
              View Analytics
            </Button>


            {/* REVIEWS */}

            <Button
              variant="outline"
              className="w-full justify-start h-12 rounded-xl"
              onClick={() =>
                (window.location.href =
                  "/instructor/reviews")
              }
            >
              <MessageSquare className="mr-3 h-5 w-5 text-primary" />
              Read Reviews
            </Button>

          </div>

        </div>

      </div>


      {/* =====================================================
          COURSE PERFORMANCE
      ====================================================== */}

      <div className="bg-background border rounded-2xl overflow-hidden">

        <div className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b">

          <div>

            <h2 className="text-xl font-bold">
              Course Performance
            </h2>

            <p className="text-sm text-muted-foreground mt-1">
              See how your courses are performing
            </p>

          </div>


          <Button
            variant="ghost"
            className="text-primary"
            onClick={() =>
              (window.location.href =
                "/instructor/courses")
            }
          >
            View All
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>

        </div>


        <div className="divide-y">

          {courses.map((course) => (
            <div
              key={course.title}
              className="
                p-5
                flex
                flex-col
                lg:flex-row
                lg:items-center
                gap-5
                hover:bg-muted/30
                transition
              "
            >

              <img
                src={course.image}
                alt={course.title}
                className="
                  w-full
                  lg:w-40
                  h-24
                  object-cover
                  rounded-xl
                "
              />


              <div className="flex-1 min-w-0">

                <div className="flex flex-wrap items-center gap-2">

                  <h3 className="font-bold text-lg line-clamp-1">
                    {course.title}
                  </h3>

                  <Badge className="bg-green-500/10 text-green-600 border-none">
                    {course.status}
                  </Badge>

                </div>


                <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">

                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {course.students.toLocaleString()} students
                  </span>

                  <span className="flex items-center gap-1 text-yellow-500">
                    <Star className="h-4 w-4 fill-current" />
                    {course.rating}
                  </span>

                </div>

              </div>


              <div className="lg:text-right">

                <p className="text-xs text-muted-foreground">
                  Revenue
                </p>

                <p className="font-black text-lg">
                  {course.revenue}
                </p>

              </div>


              <Button
                variant="ghost"
                size="icon"
                className="self-end lg:self-center"
              >
                <MoreHorizontal className="h-5 w-5" />
              </Button>

            </div>
          ))}

        </div>

      </div>


      {/* =====================================================
          BOTTOM SECTION
      ====================================================== */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* ===================================================
            RECENT ENROLLMENTS
        ==================================================== */}

        <div className="bg-background border rounded-2xl">

          <div className="p-6 border-b flex items-center justify-between">

            <div>

              <h2 className="text-xl font-bold">
                Recent Enrollments
              </h2>

              <p className="text-sm text-muted-foreground mt-1">
                Latest students who joined your courses
              </p>

            </div>


            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                (window.location.href =
                  "/instructor/students")
              }
            >
              <Eye className="h-5 w-5" />
            </Button>

          </div>


          <div className="divide-y">

            {enrollments.map((student) => (
              <div
                key={student.name}
                className="p-4 flex items-center gap-4"
              >

                <img
                  src={student.image}
                  alt={student.name}
                  className="
                    w-11
                    h-11
                    rounded-full
                    object-cover
                  "
                />


                <div className="flex-1 min-w-0">

                  <p className="font-semibold truncate">
                    {student.name}
                  </p>

                  <p className="text-xs text-muted-foreground truncate">
                    {student.course}
                  </p>

                </div>


                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {student.date}
                </span>

              </div>
            ))}

          </div>

        </div>


        {/* ===================================================
            REVIEWS
        ==================================================== */}

        <div className="bg-background border rounded-2xl">

          <div className="p-6 border-b flex items-center justify-between">

            <div>

              <h2 className="text-xl font-bold">
                Recent Reviews
              </h2>

              <p className="text-sm text-muted-foreground mt-1">
                What your students are saying
              </p>

            </div>


            <Button
              variant="ghost"
              className="text-primary"
              onClick={() =>
                (window.location.href =
                  "/instructor/reviews")
              }
            >
              View All
            </Button>

          </div>


          <div className="divide-y">

            {reviews.map((review) => (
              <div
                key={review.name}
                className="p-5"
              >

                <div className="flex gap-3">

                  <img
                    src={review.image}
                    alt={review.name}
                    className="
                      w-10
                      h-10
                      rounded-full
                      object-cover
                    "
                  />


                  <div className="flex-1 min-w-0">

                    <div className="
                      flex
                      flex-col
                      sm:flex-row
                      sm:items-center
                      sm:justify-between
                      gap-1
                    ">

                      <p className="font-semibold">
                        {review.name}
                      </p>


                      <div className="flex items-center">

                        {Array.from({
                          length: 5,
                        }).map((_, index) => (
                          <Star
                            key={index}
                            className={`
                              h-3.5
                              w-3.5
                              ${
                                index < review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-muted"
                              }
                            `}
                          />
                        ))}

                      </div>

                    </div>


                    <p className="text-xs text-muted-foreground mt-1">
                      {review.course}
                    </p>


                    <p className="
                      text-sm
                      mt-2
                      text-muted-foreground
                      line-clamp-2
                    ">
                      {review.comment}
                    </p>

                  </div>

                </div>

              </div>
            ))}

          </div>

        </div>

      </div>

    </div>
  );
};


/* =========================================================
   SMALL REUSABLE ICON
========================================================= */

const BarChartIcon = () => (
  <BarChart3 className="mr-3 h-5 w-5 text-primary" />
);


export default DashboardPage;