import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  SlidersHorizontal,
  MoreHorizontal,
  Eye,
  Mail,
  Users,
  BookOpen,
  TrendingUp,
  UserCheck,
} from "lucide-react";

import InstructorLayout from "@/layouts/InstructorLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Student = {
  id: number;
  name: string;
  email: string;
  avatar: string;
  course: string;
  progress: number;
  enrolledDate: string;
  status: "Active" | "Inactive";
};

const students: Student[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    course: "Professional React Development",
    progress: 82,
    enrolledDate: "2026-05-12",
    status: "Active",
  },
  {
    id: 2,
    name: "Michael Brown",
    email: "michael.brown@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    course: "Professional React Development",
    progress: 65,
    enrolledDate: "2026-05-18",
    status: "Active",
  },
  {
    id: 3,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    course: "Advanced React Patterns",
    progress: 91,
    enrolledDate: "2026-04-28",
    status: "Active",
  },
  {
    id: 4,
    name: "Daniel Wilson",
    email: "daniel.wilson@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Daniel",
    course: "JavaScript Masterclass",
    progress: 47,
    enrolledDate: "2026-06-02",
    status: "Active",
  },
  {
    id: 5,
    name: "Jessica Martinez",
    email: "jessica.martinez@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica",
    course: "Professional React Development",
    progress: 35,
    enrolledDate: "2026-06-10",
    status: "Inactive",
  },
  {
    id: 6,
    name: "David Anderson",
    email: "david.anderson@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    course: "Advanced React Patterns",
    progress: 73,
    enrolledDate: "2026-05-22",
    status: "Active",
  },
  {
    id: 7,
    name: "Olivia Thomas",
    email: "olivia.thomas@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia",
    course: "JavaScript Masterclass",
    progress: 58,
    enrolledDate: "2026-06-05",
    status: "Active",
  },
  {
    id: 8,
    name: "James Taylor",
    email: "james.taylor@example.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    course: "Professional React Development",
    progress: 22,
    enrolledDate: "2026-06-18",
    status: "Inactive",
  },
];

const StudentsPage = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "All" | "Active" | "Inactive"
  >("All");

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        student.name.toLowerCase().includes(searchValue) ||
        student.email.toLowerCase().includes(searchValue) ||
        student.course.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" || student.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const totalStudents = students.length;

  const activeStudents = students.filter(
    (student) => student.status === "Active"
  ).length;

  const averageProgress = Math.round(
    students.reduce((sum, student) => sum + student.progress, 0) /
      students.length
  );

  const coursesCount = new Set(students.map((student) => student.course)).size;

  return (
    
      <div className="space-y-8">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">
              Students
            </h1>

            <p className="text-muted-foreground mt-2">
              Manage and track the students enrolled in your courses.
            </p>
          </div>
        </div>

        {/* STAT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

          {/* TOTAL STUDENTS */}
          <div className="border rounded-2xl p-5 bg-background shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Total Students
                </p>

                <h2 className="text-3xl font-black mt-2">
                  {totalStudents}
                </h2>
              </div>

              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                <Users className="h-6 w-6" />
              </div>
            </div>

            <p className="text-xs text-muted-foreground mt-4">
              Students across your courses
            </p>
          </div>

          {/* ACTIVE STUDENTS */}
          <div className="border rounded-2xl p-5 bg-background shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Active Students
                </p>

                <h2 className="text-3xl font-black mt-2">
                  {activeStudents}
                </h2>
              </div>

              <div className="p-3 rounded-xl bg-green-500/10 text-green-600">
                <UserCheck className="h-6 w-6" />
              </div>
            </div>

            <p className="text-xs text-muted-foreground mt-4">
              Currently learning
            </p>
          </div>

          {/* COURSES */}
          <div className="border rounded-2xl p-5 bg-background shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Enrolled Courses
                </p>

                <h2 className="text-3xl font-black mt-2">
                  {coursesCount}
                </h2>
              </div>

              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-600">
                <BookOpen className="h-6 w-6" />
              </div>
            </div>

            <p className="text-xs text-muted-foreground mt-4">
              Courses with enrolled students
            </p>
          </div>

          {/* AVERAGE PROGRESS */}
          <div className="border rounded-2xl p-5 bg-background shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Avg. Progress
                </p>

                <h2 className="text-3xl font-black mt-2">
                  {averageProgress}%
                </h2>
              </div>

              <div className="p-3 rounded-xl bg-purple-500/10 text-purple-600">
                <TrendingUp className="h-6 w-6" />
              </div>
            </div>

            <p className="text-xs text-muted-foreground mt-4">
              Average course completion
            </p>
          </div>
        </div>

        {/* SEARCH + FILTER */}
        <div className="flex flex-col lg:flex-row gap-4">

          {/* SEARCH */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search students by name, email or course..."
              className="pl-10 h-11 rounded-xl"
            />
          </div>

          {/* FILTER */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />

            <Button
              variant={statusFilter === "All" ? "default" : "outline"}
              onClick={() => setStatusFilter("All")}
              className="rounded-xl"
            >
              All
            </Button>

            <Button
              variant={statusFilter === "Active" ? "default" : "outline"}
              onClick={() => setStatusFilter("Active")}
              className="rounded-xl"
            >
              Active
            </Button>

            <Button
              variant={statusFilter === "Inactive" ? "default" : "outline"}
              onClick={() => setStatusFilter("Inactive")}
              className="rounded-xl"
            >
              Inactive
            </Button>
          </div>
        </div>

        {/* DESKTOP TABLE */}
        <div className="hidden md:block border rounded-2xl overflow-hidden bg-background shadow-sm">

          {/* TABLE HEADER */}
          <div className="grid grid-cols-[2fr_1.5fr_1.4fr_1fr_1fr_auto] gap-4 px-6 py-4 bg-muted/30 border-b text-sm font-semibold">
            <span>Student</span>
            <span>Course</span>
            <span>Progress</span>
            <span>Enrolled</span>
            <span>Status</span>
            <span></span>
          </div>

          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <div
                key={student.id}
                className="grid grid-cols-[2fr_1.5fr_1.4fr_1fr_1fr_auto] gap-4 items-center px-6 py-5 border-b last:border-b-0 hover:bg-muted/20 transition"
              >

                {/* STUDENT */}
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={student.avatar}
                    alt={student.name}
                    className="h-11 w-11 rounded-full object-cover border bg-muted"
                  />

                  <div className="min-w-0">
                    <p className="font-semibold truncate">
                      {student.name}
                    </p>

                    <p className="text-xs text-muted-foreground truncate">
                      {student.email}
                    </p>
                  </div>
                </div>

                {/* COURSE */}
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">
                    {student.course}
                  </p>
                </div>

                {/* PROGRESS */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">
                      Progress
                    </span>

                    <span className="font-semibold">
                      {student.progress}%
                    </span>
                  </div>

                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{
                        width: `${student.progress}%`,
                      }}
                    />
                  </div>
                </div>

                {/* DATE */}
                <span className="text-sm text-muted-foreground">
                  {student.enrolledDate}
                </span>

                {/* STATUS */}
                <Badge
                  className={
                    student.status === "Active"
                      ? "bg-green-500/10 text-green-600 hover:bg-green-500/10"
                      : "bg-muted text-muted-foreground hover:bg-muted"
                  }
                >
                  {student.status}
                </Badge>

                {/* ACTION */}
                <Link to={`/instructor/students/${student.id}`}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-xl"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            ))
          ) : (
            <div className="p-12 text-center">
              <Users className="h-10 w-10 mx-auto text-muted-foreground/50" />

              <h3 className="font-semibold mt-4">
                No students found
              </h3>

              <p className="text-sm text-muted-foreground mt-1">
                Try changing your search or filter.
              </p>
            </div>
          )}
        </div>

        {/* MOBILE CARDS */}
        <div className="md:hidden space-y-4">

          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <div
                key={student.id}
                className="border rounded-2xl p-5 bg-background shadow-sm"
              >

                {/* TOP */}
                <div className="flex items-start justify-between gap-3">

                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="h-12 w-12 rounded-full object-cover border bg-muted"
                    />

                    <div className="min-w-0">
                      <h3 className="font-bold truncate">
                        {student.name}
                      </h3>

                      <p className="text-xs text-muted-foreground truncate">
                        {student.email}
                      </p>
                    </div>
                  </div>

                  <Badge
                    className={
                      student.status === "Active"
                        ? "bg-green-500/10 text-green-600 hover:bg-green-500/10"
                        : "bg-muted text-muted-foreground hover:bg-muted"
                    }
                  >
                    {student.status}
                  </Badge>
                </div>

                {/* COURSE */}
                <div className="mt-5">
                  <p className="text-xs text-muted-foreground">
                    Course
                  </p>

                  <p className="font-medium mt-1">
                    {student.course}
                  </p>
                </div>

                {/* PROGRESS */}
                <div className="mt-5">
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-muted-foreground">
                      Course Progress
                    </span>

                    <span className="font-semibold">
                      {student.progress}%
                    </span>
                  </div>

                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{
                        width: `${student.progress}%`,
                      }}
                    />
                  </div>
                </div>

                {/* FOOTER */}
                <div className="flex items-center justify-between mt-5 pt-4 border-t">

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Enrolled
                    </p>

                    <p className="text-sm font-medium">
                      {student.enrolledDate}
                    </p>
                  </div>

                  <div className="flex gap-2">

                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-xl"
                      onClick={() =>
                        window.location.href = `mailto:${student.email}`
                      }
                    >
                      <Mail className="h-4 w-4" />
                    </Button>

                    <Link
                      to={`/instructor/students/${student.id}`}
                    >
                      <Button
                        variant="default"
                        size="icon"
                        className="rounded-xl"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>

                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-xl"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>

                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="border rounded-2xl p-10 text-center">
              <Users className="h-10 w-10 mx-auto text-muted-foreground/50" />

              <h3 className="font-semibold mt-4">
                No students found
              </h3>

              <p className="text-sm text-muted-foreground mt-1">
                Try changing your search or filter.
              </p>
            </div>
          )}

        </div>
      </div>
   
  );
};

export default StudentsPage;