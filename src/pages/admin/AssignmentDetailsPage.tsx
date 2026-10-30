import {
  ArrowLeft,
  AlertCircle,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock3,
  ExternalLink,
  FileText,
  LoaderCircle,
  Pencil,
  RefreshCw,
  Users,
} from "lucide-react";

import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import assignmentsApi from "@/api/assignments.api";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type AssignmentStatus = "Draft" | "Published" | "Closed";

interface Reference {
  _id?: string;
  title?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  profilePicture?: string;
}

type ReferenceValue = string | Reference | null | undefined;

interface Assignment {
  _id: string;
  title: string;
  instructions: string;
  courseId: ReferenceValue;
  lessonId?: ReferenceValue;
  dueDate?: string | null;
  maxScore: number;
  fileAttachmentUrl?: string;
  status: AssignmentStatus;
  createdAt: string;
  updatedAt?: string;
}

interface Submission {
  _id: string;
  assignmentId?: ReferenceValue;
  studentId?: ReferenceValue;
  student?: ReferenceValue;
  submittedAt?: string;
  createdAt?: string;
  submittedText?: string;
  submittedFileUrl?: string;
  fileUrl?: string;
  fileAttachmentUrl?: string;
  content?: string;
  answer?: string;
  score?: number | null;
  feedback?: string;
  status?: string;
  gradedAt?: string;
}

const AssignmentDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  const [loading, setLoading] = useState(true);
  const [submissionsLoading, setSubmissionsLoading] = useState(true);

  const [error, setError] = useState("");
  const [submissionsError, setSubmissionsError] = useState("");

  /*
   * ============================================
   * HELPERS
   * ============================================
   */

  const getErrorMessage = (error: unknown): string => {
    if (typeof error === "object" && error !== null) {
      const root = error as {
        response?: {
          data?: {
            message?: string;
          };
        };
        message?: string;
      };

      if (root.response?.data?.message) {
        return root.response.data.message;
      }

      if (root.message) {
        return root.message;
      }
    }

    return "Something went wrong.";
  };

  const getReferenceLabel = (value: ReferenceValue): string => {
    if (!value) {
      return "Not specified";
    }

    if (typeof value === "string") {
      return value;
    }

    return value.title || value.name || value._id || "Not specified";
  };

  const formatDate = (value?: string | null): string => {
    if (!value) {
      return "Not specified";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "Invalid date";
    }

    return date.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const getStatusClasses = (status: AssignmentStatus): string => {
    switch (status) {
      case "Published":
        return "bg-green-500/10 text-green-600";

      case "Closed":
        return "bg-red-500/10 text-red-600";

      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStudentName = (submission: Submission): string => {
    const studentValue = submission.studentId ?? submission.student;

    if (!studentValue) {
      return "Student";
    }

    if (typeof studentValue === "string") {
      return studentValue;
    }

    const fullName = [
      studentValue.firstName,
      studentValue.lastName,
    ]
      .filter(Boolean)
      .join(" ")
      .trim();

    return (
      fullName ||
      studentValue.name ||
      studentValue.email ||
      studentValue._id ||
      "Student"
    );
  };

  const getStudentEmail = (submission: Submission): string => {
    const studentValue = submission.studentId ?? submission.student;

    if (!studentValue || typeof studentValue === "string") {
      return "";
    }

    return studentValue.email || "";
  };

  const getSubmissionFile = (submission: Submission): string => {
    return (
      submission.submittedFileUrl ||
      submission.fileUrl ||
      submission.fileAttachmentUrl ||
      ""
    );
  };

  const getSubmissionText = (submission: Submission): string => {
    return (
      submission.submittedText ||
      submission.content ||
      submission.answer ||
      ""
    );
  };

  const getSubmissionStatus = (submission: Submission): string => {
    if (submission.status) {
      return submission.status;
    }

    return submission.score == null ? "Pending" : "Graded";
  };

  /*
   * ============================================
   * FETCH ASSIGNMENT
   * ============================================
   */

  const fetchAssignment = useCallback(async () => {
    if (!id) {
      setError("Assignment ID is missing.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const item = (await assignmentsApi.getAssignment(
        id,
      )) as unknown as Assignment;

      if (!item?._id) {
        throw new Error("The server returned an invalid assignment.");
      }

      setAssignment(item);
    } catch (err: unknown) {
      setAssignment(null);
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [id]);

  /*
   * ============================================
   * FETCH SUBMISSIONS
   * ============================================
   */

  const fetchSubmissions = useCallback(async () => {
    if (!id) {
      setSubmissionsLoading(false);
      setSubmissionsError("");
      return;
    }

    setSubmissionsLoading(true);
    setSubmissionsError("");

    try {
      const rows = (await assignmentsApi.getSubmissions(
        id,
      )) as unknown as Submission[];

      setSubmissions(Array.isArray(rows) ? rows : []);
    } catch (err: unknown) {
      setSubmissions([]);
      setSubmissionsError(getErrorMessage(err));
    } finally {
      setSubmissionsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    void fetchAssignment();
    void fetchSubmissions();
  }, [fetchAssignment, fetchSubmissions]);

  /*
   * ============================================
   * NAVIGATION
   * ============================================
   */

  const handleEdit = () => {
    if (id) {
      navigate(`/admin/assignments/${id}/edit`);
    }
  };

  /*
   * ============================================
   * LOADING STATE
   * ============================================
   */

  if (loading) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3">
        <LoaderCircle className="h-8 w-8 animate-spin text-primary" />

        <p className="text-sm text-muted-foreground">
          Loading assignment...
        </p>
      </div>
    );
  }

  /*
   * ============================================
   * ERROR STATE
   * ============================================
   */

  if (error || !assignment) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center px-5 text-center">
        <AlertCircle className="h-10 w-10 text-red-500" />

        <h2 className="mt-4 text-xl font-semibold">
          Unable to load assignment
        </h2>

        <p className="mt-2 max-w-lg text-sm text-muted-foreground">
          {error || "The assignment could not be found."}
        </p>

        <div className="mt-5 flex gap-3">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/assignments")}
            className="rounded-xl"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Assignments
          </Button>

          <Button
            onClick={() => void fetchAssignment()}
            className="rounded-xl"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  /*
   * ============================================
   * RENDER
   * ============================================
   */

  return (
    <div className="space-y-6">
      {/* HEADER */}

      <div>
        <Button
          variant="ghost"
          onClick={() => navigate("/admin/assignments")}
          className="-ml-3 mb-4 rounded-xl text-muted-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Assignments
        </Button>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-primary/10 p-3.5 text-primary">
              <FileText className="h-7 w-7" />
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="break-words text-2xl font-bold tracking-tight">
                  {assignment.title}
                </h1>

                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                    assignment.status,
                  )}`}
                >
                  {assignment.status}
                </span>
              </div>

              <p className="mt-2 text-sm text-muted-foreground">
                Created {formatDate(assignment.createdAt)}
              </p>
            </div>
          </div>

          <Button onClick={handleEdit} className="shrink-0 rounded-xl">
            <Pencil className="mr-2 h-4 w-4" />
            Edit Assignment
          </Button>
        </div>
      </div>

      {/* STATISTICS */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm text-muted-foreground">
                Maximum Score
              </p>

              <p className="mt-1 text-2xl font-bold">
                {assignment.maxScore ?? 100}
              </p>
            </div>

            <div className="rounded-xl bg-primary/10 p-3 text-primary">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm text-muted-foreground">
                Submissions
              </p>

              <p className="mt-1 text-2xl font-bold">
                {submissionsLoading ? "—" : submissions.length}
              </p>
            </div>

            <div className="rounded-xl bg-blue-500/10 p-3 text-blue-600">
              <Users className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm text-muted-foreground">Due Date</p>

              <p className="mt-1 text-sm font-semibold">
                {assignment.dueDate
                  ? formatDate(assignment.dueDate)
                  : "No deadline"}
              </p>
            </div>

            <div className="rounded-xl bg-amber-500/10 p-3 text-amber-600">
              <CalendarDays className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-sm text-muted-foreground">
                Last Updated
              </p>

              <p className="mt-1 text-sm font-semibold">
                {formatDate(assignment.updatedAt || assignment.createdAt)}
              </p>
            </div>

            <div className="rounded-xl bg-muted p-3 text-muted-foreground">
              <Clock3 className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ASSIGNMENT INFORMATION */}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(280px,0.8fr)]">
        <Card>
          <CardContent className="space-y-5 p-5 sm:p-7">
            <div>
              <h2 className="text-lg font-semibold">Instructions</h2>

              <p className="mt-1 text-sm text-muted-foreground">
                The instructions provided for this assignment.
              </p>
            </div>

            <div className="whitespace-pre-wrap break-words rounded-xl border bg-muted/20 p-4 text-sm leading-7">
              {assignment.instructions || "No instructions provided."}
            </div>

            {assignment.fileAttachmentUrl && (
              <div className="rounded-xl border p-4">
                <p className="text-sm font-semibold">
                  Assignment Attachment
                </p>

                <a
                  href={assignment.fileAttachmentUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex max-w-full items-center gap-2 break-all text-sm text-primary hover:underline"
                >
                  <ExternalLink className="h-4 w-4 shrink-0" />
                  Open Attachment
                </a>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="space-y-5 p-5 sm:p-7">
            <div>
              <h2 className="text-lg font-semibold">
                Assignment Information
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Course and scheduling details.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <BookOpen className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />

                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Course</p>

                  <p className="mt-1 break-words text-sm font-medium">
                    {getReferenceLabel(assignment.courseId)}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FileText className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />

                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Lesson</p>

                  <p className="mt-1 break-all text-sm font-medium">
                    {getReferenceLabel(assignment.lessonId)}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />

                <div>
                  <p className="text-xs text-muted-foreground">Due Date</p>

                  <p className="mt-1 text-sm font-medium">
                    {formatDate(assignment.dueDate)}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />

                <div>
                  <p className="text-xs text-muted-foreground">Created</p>

                  <p className="mt-1 text-sm font-medium">
                    {formatDate(assignment.createdAt)}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <Button
                variant="outline"
                className="w-full rounded-xl"
                onClick={handleEdit}
              >
                <Pencil className="mr-2 h-4 w-4" />
                Edit Details
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* SUBMISSIONS */}

      <Card className="overflow-hidden">
        <div className="flex flex-col gap-3 border-b p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold">Student Submissions</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Submissions returned by the backend.
            </p>
          </div>

          <Button
            variant="outline"
            className="rounded-xl"
            disabled={submissionsLoading}
            onClick={() => void fetchSubmissions()}
          >
            <RefreshCw
              className={`mr-2 h-4 w-4 ${
                submissionsLoading ? "animate-spin" : ""
              }`}
            />
            Refresh
          </Button>
        </div>

        {submissionsLoading ? (
          <div className="px-5 py-12 text-center">
            <LoaderCircle className="mx-auto h-7 w-7 animate-spin text-primary" />

            <p className="mt-3 text-sm text-muted-foreground">
              Loading submissions...
            </p>
          </div>
        ) : submissionsError ? (
          <div className="px-5 py-12 text-center">
            <AlertCircle className="mx-auto h-8 w-8 text-amber-500" />

            <p className="mt-3 font-semibold">
              Could not load submissions
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              {submissionsError}
            </p>

            <Button
              variant="outline"
              className="mt-4 rounded-xl"
              onClick={() => void fetchSubmissions()}
            >
              Try Again
            </Button>
          </div>
        ) : submissions.length === 0 ? (
          <div className="px-5 py-12 text-center">
            <Users className="mx-auto h-8 w-8 text-muted-foreground" />

            <p className="mt-3 font-semibold">No submissions found</p>

            <p className="mt-1 text-sm text-muted-foreground">
              No submissions were returned for this assignment.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px]">
              <thead className="border-b bg-muted/30">
                <tr>
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Student
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Submitted
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Score
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Status
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Submission
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {submissions.map((submission) => {
                  const attachment = getSubmissionFile(submission);
                  const submittedText = getSubmissionText(submission);
                  const studentEmail = getStudentEmail(submission);

                  return (
                    <tr key={submission._id} className="hover:bg-muted/20">
                      <td className="px-5 py-4">
                        <p className="font-medium">
                          {getStudentName(submission)}
                        </p>

                        {studentEmail ? (
                          <p className="mt-1 text-xs text-muted-foreground">
                            {studentEmail}
                          </p>
                        ) : (
                          <p className="mt-1 text-xs text-muted-foreground">
                            ID: {submission._id}
                          </p>
                        )}
                      </td>

                      <td className="px-5 py-4 text-sm text-muted-foreground">
                        {formatDate(
                          submission.submittedAt || submission.createdAt,
                        )}
                      </td>

                      <td className="px-5 py-4 text-sm font-medium">
                        {submission.score == null
                          ? "Not graded"
                          : `${submission.score} / ${assignment.maxScore}`}
                      </td>

                      <td className="px-5 py-4">
                        <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-semibold">
                          {getSubmissionStatus(submission)}
                        </span>
                      </td>

                      <td className="max-w-xs px-5 py-4">
                        {attachment ? (
                          <a
                            href={attachment}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                          >
                            <ExternalLink className="h-4 w-4 shrink-0" />
                            Open File
                          </a>
                        ) : submittedText ? (
                          <div>
                            <p className="whitespace-pre-wrap break-words text-sm">
                              {submittedText.length > 180
                                ? `${submittedText.slice(0, 180)}...`
                                : submittedText}
                            </p>

                            <span className="mt-1 block text-xs text-muted-foreground">
                              Text response
                            </span>
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">
                            No attachment or text
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};

export default AssignmentDetailsPage;