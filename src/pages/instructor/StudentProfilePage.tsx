import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  BookOpen,
  Award,
  Clock,
  CheckCircle2,
  TrendingUp,
  FileText,
  MessageSquare,
  UserCircle2,
} from "lucide-react";

import InstructorLayout from "@/layouts/InstructorLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const StudentProfilePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Temporary student data.
  // Replace this with API data later using the student ID from `id`.
  const student = {
    id: id || "STU-1001",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@example.com",
    phone: "+251 91 123 4567",
    profilePicture: "",
    joinedDate: "January 15, 2026",
    status: "Active",
    enrolledCourses: 4,
    completedCourses: 2,
    averageProgress: 72,
    certificates: 2,
    totalLearningHours: 48,
  };

  const courses = [
    {
      id: 1,
      title: "Professional React Development",
      progress: 85,
      status: "In Progress",
      lastActivity: "2 hours ago",
    },
    {
      id: 2,
      title: "Advanced JavaScript",
      progress: 100,
      status: "Completed",
      lastActivity: "3 days ago",
    },
    {
      id: 3,
      title: "Node.js Backend Development",
      progress: 64,
      status: "In Progress",
      lastActivity: "Yesterday",
    },
    {
      id: 4,
      title: "UI/UX Design Fundamentals",
      progress: 40,
      status: "In Progress",
      lastActivity: "5 days ago",
    },
  ];

  const activities = [
    {
      title: "Completed JavaScript Module 8",
      description: "Advanced JavaScript",
      time: "2 hours ago",
      icon: CheckCircle2,
    },
    {
      title: "Submitted assignment",
      description: "React Authentication Project",
      time: "Yesterday",
      icon: FileText,
    },
    {
      title: "Completed quiz",
      description: "Node.js Fundamentals",
      time: "2 days ago",
      icon: Award,
    },
    {
      title: "Started new lesson",
      description: "UI/UX Design Principles",
      time: "5 days ago",
      icon: BookOpen,
    },
  ];

  const assignments = [
    {
      title: "React Authentication Project",
      course: "Professional React Development",
      score: "92%",
      status: "Graded",
    },
    {
      title: "REST API Assignment",
      course: "Node.js Backend Development",
      score: "88%",
      status: "Graded",
    },
    {
      title: "UI Wireframe Project",
      course: "UI/UX Design Fundamentals",
      score: "Pending",
      status: "Pending",
    },
  ];

  const initials =
    `${student.firstName.charAt(0)}${student.lastName.charAt(0)}`.toUpperCase();

  return (

      <div className="space-y-8 pb-10">

        {/* =========================
            HEADER
        ========================= */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              className="rounded-xl"
              onClick={() => navigate("/instructor/students")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>

            <div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight">
                Student Profile
              </h1>

              <p className="text-muted-foreground mt-1">
                View student information and learning progress.
              </p>
            </div>
          </div>

          <Button className="rounded-xl">
            <MessageSquare className="mr-2 h-4 w-4" />
            Contact Student
          </Button>
        </div>

        {/* =========================
            PROFILE CARD
        ========================= */}
        <div className="border rounded-3xl bg-background shadow-sm overflow-hidden">

          {/* Cover */}
          <div className="h-32 bg-primary/10 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent" />
          </div>

          <div className="px-6 md:px-8 pb-8">

            <div className="flex flex-col md:flex-row md:items-end gap-5 -mt-14">

              {/* Avatar */}
              <div className="relative shrink-0">

                {student.profilePicture ? (
                  <img
                    src={student.profilePicture}
                    alt={`${student.firstName} ${student.lastName}`}
                    className="h-28 w-28 rounded-3xl object-cover border-4 border-background shadow-lg"
                  />
                ) : (
                  <div className="h-28 w-28 rounded-3xl bg-primary text-primary-foreground border-4 border-background shadow-lg flex items-center justify-center text-3xl font-black">
                    {initials}
                  </div>
                )}

                <span className="absolute bottom-2 right-2 h-4 w-4 rounded-full bg-green-500 border-2 border-background" />
              </div>

              {/* Name */}
              <div className="flex-1">

                <div className="flex flex-wrap items-center gap-3">

                  <h2 className="text-2xl md:text-3xl font-black">
                    {student.firstName} {student.lastName}
                  </h2>

                  <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/10">
                    {student.status}
                  </Badge>

                </div>

                <p className="text-muted-foreground mt-1">
                  Student ID: {student.id}
                </p>

              </div>

            </div>

            {/* Contact information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">

              <div className="flex items-center gap-3 p-4 rounded-2xl bg-muted/40">
                <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Mail className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">
                    Email
                  </p>

                  <p className="text-sm font-semibold truncate">
                    {student.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-2xl bg-muted/40">
                <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Phone className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">
                    Phone
                  </p>

                  <p className="text-sm font-semibold">
                    {student.phone}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-2xl bg-muted/40">
                <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Calendar className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">
                    Joined
                  </p>

                  <p className="text-sm font-semibold">
                    {student.joinedDate}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-2xl bg-muted/40">
                <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Clock className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">
                    Learning Time
                  </p>

                  <p className="text-sm font-semibold">
                    {student.totalLearningHours} hours
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* =========================
            STATISTICS
        ========================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

          <StatCard
            icon={<BookOpen className="h-5 w-5" />}
            label="Enrolled Courses"
            value={student.enrolledCourses}
          />

          <StatCard
            icon={<CheckCircle2 className="h-5 w-5" />}
            label="Completed"
            value={student.completedCourses}
          />

          <StatCard
            icon={<TrendingUp className="h-5 w-5" />}
            label="Average Progress"
            value={`${student.averageProgress}%`}
          />

          <StatCard
            icon={<Award className="h-5 w-5" />}
            label="Certificates"
            value={student.certificates}
          />

        </div>

        {/* =========================
            MAIN GRID
        ========================= */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

          {/* =========================
              COURSES
          ========================= */}
          <div className="xl:col-span-2 border rounded-3xl bg-background shadow-sm">

            <div className="p-6 border-b">
              <h2 className="text-xl font-bold">
                Enrolled Courses
              </h2>

              <p className="text-sm text-muted-foreground mt-1">
                Courses currently assigned to this student.
              </p>
            </div>

            <div className="divide-y">

              {courses.map((course) => (
                <div
                  key={course.id}
                  className="p-6 hover:bg-muted/20 transition"
                >

                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">

                    <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <BookOpen className="h-6 w-6" />
                    </div>

                    <div className="flex-1 min-w-0">

                      <div className="flex flex-wrap items-center gap-2">

                        <h3 className="font-bold">
                          {course.title}
                        </h3>

                        <Badge
                          variant="outline"
                          className={
                            course.status === "Completed"
                              ? "text-green-600 border-green-500/30"
                              : ""
                          }
                        >
                          {course.status}
                        </Badge>

                      </div>

                      <div className="mt-3">

                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-muted-foreground">
                            Progress
                          </span>

                          <span className="font-semibold">
                            {course.progress}%
                          </span>
                        </div>

                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full transition-all"
                            style={{
                              width: `${course.progress}%`,
                            }}
                          />
                        </div>

                      </div>

                      <p className="text-xs text-muted-foreground mt-2">
                        Last activity: {course.lastActivity}
                      </p>

                    </div>

                  </div>

                </div>
              ))}

            </div>
          </div>

          {/* =========================
              RECENT ACTIVITY
          ========================= */}
          <div className="border rounded-3xl bg-background shadow-sm">

            <div className="p-6 border-b">
              <h2 className="text-xl font-bold">
                Recent Activity
              </h2>

              <p className="text-sm text-muted-foreground mt-1">
                Latest learning activity.
              </p>
            </div>

            <div className="p-6 space-y-6">

              {activities.map((activity, index) => {
                const Icon = activity.icon;

                return (
                  <div
                    key={index}
                    className="flex gap-3"
                  >

                    <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Icon className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">

                      <p className="text-sm font-semibold">
                        {activity.title}
                      </p>

                      <p className="text-xs text-muted-foreground mt-1">
                        {activity.description}
                      </p>

                      <p className="text-xs text-muted-foreground mt-1">
                        {activity.time}
                      </p>

                    </div>

                  </div>
                );
              })}

            </div>

          </div>

        </div>

        {/* =========================
            ASSIGNMENTS
        ========================= */}
        <div className="border rounded-3xl bg-background shadow-sm overflow-hidden">

          <div className="p-6 border-b">

            <h2 className="text-xl font-bold">
              Assignments
            </h2>

            <p className="text-sm text-muted-foreground mt-1">
              Recent assignment submissions and grades.
            </p>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full text-sm">

              <thead className="bg-muted/30 border-b">

                <tr className="text-left">

                  <th className="p-4 font-semibold">
                    Assignment
                  </th>

                  <th className="p-4 font-semibold">
                    Course
                  </th>

                  <th className="p-4 font-semibold">
                    Score
                  </th>

                  <th className="p-4 font-semibold">
                    Status
                  </th>

                </tr>

              </thead>

              <tbody>

                {assignments.map((assignment, index) => (

                  <tr
                    key={index}
                    className="border-b last:border-0 hover:bg-muted/20 transition"
                  >

                    <td className="p-4 font-medium">
                      {assignment.title}
                    </td>

                    <td className="p-4 text-muted-foreground">
                      {assignment.course}
                    </td>

                    <td className="p-4 font-bold">
                      {assignment.score}
                    </td>

                    <td className="p-4">

                      <Badge
                        className={
                          assignment.status === "Graded"
                            ? "bg-green-500/10 text-green-600 hover:bg-green-500/10"
                            : "bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/10"
                        }
                      >
                        {assignment.status}
                      </Badge>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>
  
  );
};

/* =========================
   STAT CARD
========================= */

type StatCardProps = {
  icon: React.ReactNode;
  label: string;
  value: string | number;
};

const StatCard = ({
  icon,
  label,
  value,
}: StatCardProps) => {
  return (
    <div className="border rounded-2xl bg-background p-5 shadow-sm">

      <div className="flex items-center gap-3">

        <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
          {icon}
        </div>

        <div>

          <p className="text-xs text-muted-foreground">
            {label}
          </p>

          <p className="text-2xl font-black mt-1">
            {value}
          </p>

        </div>

      </div>

    </div>
  );
};

export default StudentProfilePage;