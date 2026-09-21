import { useState } from "react";
import {
  Plus,
  Search,
  MoreVertical,
  Pencil,
  Trash2,
  Eye,
  FileText,
  Users,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import InstructorLayout from "@/layouts/InstructorLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

type AssignmentStatus = "Active" | "Closed" | "Draft";

type Assignment = {
  id: number;
  title: string;
  course: string;
  description: string;
  dueDate: string;
  submissions: number;
  totalStudents: number;
  points: number;
  status: AssignmentStatus;
};

const assignments: Assignment[] = [
  {
    id: 1,
    title: "Build a React Portfolio",
    course: "Professional React Development",
    description:
      "Create a responsive personal portfolio using React and modern UI practices.",
    dueDate: "2026-08-30",
    submissions: 32,
    totalStudents: 45,
    points: 100,
    status: "Active",
  },
  {
    id: 2,
    title: "REST API Implementation",
    course: "Node.js Backend Development",
    description:
      "Build a RESTful API with authentication, validation, and database integration.",
    dueDate: "2026-09-02",
    submissions: 18,
    totalStudents: 38,
    points: 100,
    status: "Active",
  },
  {
    id: 3,
    title: "UI Design Challenge",
    course: "UI/UX Design Masterclass",
    description:
      "Design a modern dashboard interface following accessibility and UX principles.",
    dueDate: "2026-08-20",
    submissions: 41,
    totalStudents: 41,
    points: 50,
    status: "Closed",
  },
  {
    id: 4,
    title: "JavaScript Fundamentals",
    course: "Modern JavaScript",
    description:
      "Complete the JavaScript fundamentals exercises covering ES6 and asynchronous programming.",
    dueDate: "2026-09-10",
    submissions: 0,
    totalStudents: 30,
    points: 50,
    status: "Draft",
  },
];

const AssignmentsPage = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "All" | AssignmentStatus
  >("All");

  const filteredAssignments = assignments.filter((assignment) => {
    const matchesSearch =
      assignment.title.toLowerCase().includes(search.toLowerCase()) ||
      assignment.course.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || assignment.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusClass = (status: AssignmentStatus) => {
    switch (status) {
      case "Active":
        return "bg-green-500/10 text-green-600 border-green-500/20";

      case "Closed":
        return "bg-muted text-muted-foreground border-muted";

      case "Draft":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";

      default:
        return "";
    }
  };

  const getSubmissionPercentage = (
    submissions: number,
    totalStudents: number
  ) => {
    if (totalStudents === 0) return 0;

    return Math.round((submissions / totalStudents) * 100);
  };

  return (
   
      <div className="space-y-8">

        {/* ========================================= */}
        {/* HEADER */}
        {/* ========================================= */}
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">
              Assignments
            </h1>

            <p className="text-muted-foreground mt-2">
              Create, manage, and grade assignments for your students.
            </p>
          </div>

          <Button className="rounded-xl">
            <Plus className="mr-2 h-4 w-4" />
            Create Assignment
          </Button>
        </div>

        {/* ========================================= */}
        {/* SUMMARY CARDS */}
        {/* ========================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

          {/* Total */}
          <div className="border rounded-2xl p-5 bg-background shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Total Assignments
                </p>

                <h3 className="text-3xl font-black mt-2">
                  {assignments.length}
                </h3>
              </div>

              <div className="h-11 w-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <FileText className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Active */}
          <div className="border rounded-2xl p-5 bg-background shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Active
                </p>

                <h3 className="text-3xl font-black mt-2">
                  {
                    assignments.filter(
                      (assignment) => assignment.status === "Active"
                    ).length
                  }
                </h3>
              </div>

              <div className="h-11 w-11 rounded-xl bg-green-500/10 text-green-600 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Submissions */}
          <div className="border rounded-2xl p-5 bg-background shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Submissions
                </p>

                <h3 className="text-3xl font-black mt-2">
                  {assignments.reduce(
                    (total, assignment) =>
                      total + assignment.submissions,
                    0
                  )}
                </h3>
              </div>

              <div className="h-11 w-11 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                <Users className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Pending */}
          <div className="border rounded-2xl p-5 bg-background shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Pending
                </p>

                <h3 className="text-3xl font-black mt-2">
                  {assignments.reduce(
                    (total, assignment) =>
                      total +
                      (assignment.totalStudents -
                        assignment.submissions),
                    0
                  )}
                </h3>
              </div>

              <div className="h-11 w-11 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center">
                <Clock className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>

        {/* ========================================= */}
        {/* FILTERS */}
        {/* ========================================= */}
        <div className="flex flex-col lg:flex-row gap-4">

          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

            <Input
              placeholder="Search assignments or courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 h-11 rounded-xl"
            />
          </div>

          {/* Status */}
          <div className="flex flex-wrap gap-2">

            {(["All", "Active", "Closed", "Draft"] as const).map(
              (status) => (
                <Button
                  key={status}
                  variant={
                    statusFilter === status
                      ? "default"
                      : "outline"
                  }
                  onClick={() => setStatusFilter(status)}
                  className="rounded-xl"
                >
                  {status}
                </Button>
              )
            )}
          </div>
        </div>

        {/* ========================================= */}
        {/* ASSIGNMENTS */}
        {/* ========================================= */}
        <div className="space-y-4">

          {filteredAssignments.length === 0 ? (
            <div className="border rounded-2xl p-12 text-center bg-background">
              <AlertCircle className="h-10 w-10 mx-auto text-muted-foreground mb-4" />

              <h3 className="font-bold text-lg">
                No assignments found
              </h3>

              <p className="text-sm text-muted-foreground mt-1">
                Try changing your search or filter.
              </p>
            </div>
          ) : (
            filteredAssignments.map((assignment) => {
              const percentage = getSubmissionPercentage(
                assignment.submissions,
                assignment.totalStudents
              );

              return (
                <div
                  key={assignment.id}
                  className="border rounded-2xl bg-background p-5 md:p-6 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex flex-col gap-5">

                    {/* TOP */}
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">

                      <div className="flex gap-4">

                        {/* ICON */}
                        <div className="h-12 w-12 shrink-0 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                          <FileText className="h-6 w-6" />
                        </div>

                        {/* INFO */}
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-lg font-bold">
                              {assignment.title}
                            </h3>

                            <Badge
                              variant="outline"
                              className={getStatusClass(
                                assignment.status
                              )}
                            >
                              {assignment.status}
                            </Badge>
                          </div>

                          <p className="text-sm text-primary font-medium mt-1">
                            {assignment.course}
                          </p>

                          <p className="text-sm text-muted-foreground mt-2 max-w-2xl">
                            {assignment.description}
                          </p>
                        </div>
                      </div>

                      {/* ACTIONS */}
                      <div className="flex items-center gap-2">

                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-xl"
                          title="View assignment"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>

                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-xl"
                          title="Edit assignment"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>

                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-xl text-red-500 hover:text-red-600"
                          title="Delete assignment"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-xl"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* DETAILS */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t pt-5">

                      {/* Due Date */}
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Due Date
                        </p>

                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />

                          <span className="font-semibold text-sm">
                            {assignment.dueDate}
                          </span>
                        </div>
                      </div>

                      {/* Points */}
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Points
                        </p>

                        <p className="font-semibold text-sm mt-1">
                          {assignment.points} pts
                        </p>
                      </div>

                      {/* Submissions */}
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Submissions
                        </p>

                        <p className="font-semibold text-sm mt-1">
                          {assignment.submissions}/
                          {assignment.totalStudents}
                        </p>
                      </div>

                      {/* Completion */}
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Submission Rate
                        </p>

                        <p className="font-semibold text-sm mt-1">
                          {percentage}%
                        </p>
                      </div>
                    </div>

                    {/* PROGRESS */}
                    <div>
                      <div className="flex justify-between text-xs mb-2">
                        <span className="text-muted-foreground">
                          Student submissions
                        </span>

                        <span className="font-semibold">
                          {percentage}%
                        </span>
                      </div>

                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all"
                          style={{
                            width: `${percentage}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* FOOTER */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t pt-4">

                      <p className="text-xs text-muted-foreground">
                        {assignment.totalStudents -
                          assignment.submissions}{" "}
                        students haven't submitted yet.
                      </p>

                      <Button
                        variant="outline"
                        className="rounded-xl"
                      >
                        View Submissions
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

  );
};

export default AssignmentsPage;