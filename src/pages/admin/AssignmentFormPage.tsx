import {
  ArrowLeft,
  AlertCircle,
  BookOpen,
  CalendarDays,
  FileText,
  LoaderCircle,
  Save,
} from "lucide-react";

import { useCallback, useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import API from "@/api/auth.api";
import assignmentsApi from "@/api/assignments.api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

type AssignmentStatus = "Draft" | "Published" | "Closed";

interface CourseOption {
  _id: string;
  title: string;
}

interface Assignment {
  _id: string;
  courseId: string | { _id?: string; title?: string };
  lessonId?: string | { _id?: string } | null;
  title: string;
  instructions: string;
  dueDate?: string | null;
  maxScore?: number;
  fileAttachmentUrl?: string;
  status: AssignmentStatus;
}

interface AssignmentFormValues {
  courseId: string;
  lessonId: string;
  title: string;
  instructions: string;
  dueDate: string;
  maxScore: string;
  fileAttachmentUrl: string;
  status: AssignmentStatus;
}

const initialValues: AssignmentFormValues = {
  courseId: "",
  lessonId: "",
  title: "",
  instructions: "",
  dueDate: "",
  maxScore: "100",
  fileAttachmentUrl: "",
  status: "Draft",
};

const AssignmentFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const isEditing = Boolean(id && id !== "new");

  const [form, setForm] = useState<AssignmentFormValues>(initialValues);
  const [courses, setCourses] = useState<CourseOption[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [coursesError, setCoursesError] = useState("");

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

  const getReferenceId = (
    value: string | { _id?: string } | null | undefined,
  ): string => {
    if (!value) {
      return "";
    }

    return typeof value === "string" ? value : value._id || "";
  };

  const formatDateTimeLocal = (value?: string | null): string => {
    if (!value) {
      return "";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "";
    }

    const pad = (number: number) => String(number).padStart(2, "0");

    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
      date.getDate(),
    )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  };

  /*
   * ============================================
   * FETCH COURSES AND ASSIGNMENT
   * ============================================
   */

  const fetchFormData = useCallback(async () => {
    setLoading(true);
    setError("");
    setCoursesError("");

    try {
      // Courses are still loaded through the existing courses API.
      const courseRequest = API.get("/courses", {
        params: {
          page: 1,
          limit: 100,
          sort: "title",
        },
      });

      // Assignment operations use the shared assignment API service.
      const assignmentRequest =
        isEditing && id
          ? assignmentsApi.getAssignment(id)
          : Promise.resolve(null);

      const [courseResult, assignmentResult] = await Promise.allSettled([
        courseRequest,
        assignmentRequest,
      ]);

      /*
       * PROCESS COURSES
       */

      if (courseResult.status === "fulfilled") {
        const payload = courseResult.value.data;
        const rows = payload?.data?.courses;

        if (Array.isArray(rows)) {
          const validCourses = rows.filter(
            (course: unknown): course is CourseOption => {
              if (typeof course !== "object" || course === null) {
                return false;
              }

              const item = course as Partial<CourseOption>;

              return (
                typeof item._id === "string" &&
                typeof item.title === "string"
              );
            },
          );

          setCourses(validCourses);
        } else {
          setCourses([]);
          setCoursesError(
            "The courses API returned an unexpected response.",
          );
        }
      } else {
        setCourses([]);
        setCoursesError(getErrorMessage(courseResult.reason));
      }

      /*
       * PROCESS ASSIGNMENT WHEN EDITING
       */

      if (isEditing) {
        if (assignmentResult.status === "rejected") {
          throw assignmentResult.reason;
        }

        if (
          assignmentResult.status !== "fulfilled" ||
          assignmentResult.value === null
        ) {
          throw new Error("Could not load the assignment.");
        }

        const assignment = assignmentResult.value as unknown as Assignment;

        if (!assignment?._id) {
          throw new Error("The API returned an invalid assignment.");
        }

        setForm({
          courseId: getReferenceId(assignment.courseId),
          lessonId: getReferenceId(assignment.lessonId),
          title: assignment.title || "",
          instructions: assignment.instructions || "",
          dueDate: formatDateTimeLocal(assignment.dueDate),
          maxScore: String(assignment.maxScore ?? 100),
          fileAttachmentUrl: assignment.fileAttachmentUrl || "",
          status: assignment.status || "Draft",
        });
      } else {
        setForm(initialValues);
      }
    } catch (err: unknown) {
      const message = getErrorMessage(err);

      setError(message);

      toast.error("Unable to load assignment form", {
        description: message,
      });
    } finally {
      setLoading(false);
    }
  }, [id, isEditing]);

  useEffect(() => {
    void fetchFormData();
  }, [fetchFormData]);

  /*
   * ============================================
   * FORM HANDLERS
   * ============================================
   */

  const updateField = <K extends keyof AssignmentFormValues>(
    field: K,
    value: AssignmentFormValues[K],
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (saving) {
      return;
    }

    if (!isEditing && !form.courseId) {
      toast.error("Please select a course.");
      return;
    }

    if (!form.title.trim()) {
      toast.error("Assignment title is required.");
      return;
    }

    if (!form.instructions.trim()) {
      toast.error("Assignment instructions are required.");
      return;
    }

    const maxScore = Number(form.maxScore);

    if (!Number.isFinite(maxScore) || maxScore <= 0) {
      toast.error("Maximum score must be greater than zero.");
      return;
    }

    if (
      form.dueDate &&
      Number.isNaN(new Date(form.dueDate).getTime())
    ) {
      toast.error("Please enter a valid due date.");
      return;
    }

    const payload = {
      ...(!isEditing ? { courseId: form.courseId } : {}),
      lessonId: form.lessonId.trim() || null,
      title: form.title.trim(),
      instructions: form.instructions.trim(),
      dueDate: form.dueDate
        ? new Date(form.dueDate).toISOString()
        : null,
      maxScore,
      fileAttachmentUrl: form.fileAttachmentUrl.trim(),
      status: form.status,
    };

    setSaving(true);

    try {
      if (isEditing && id) {
        await assignmentsApi.updateAssignment(
          id,
          payload as Parameters<
            typeof assignmentsApi.updateAssignment
          >[1],
        );

        toast.success("Assignment updated successfully");

        navigate(`/admin/assignments/${id}`);
      } else {
        const createdAssignment = (await assignmentsApi.createAssignment(
          payload as Parameters<
            typeof assignmentsApi.createAssignment
          >[0],
        )) as unknown as Assignment;

        toast.success("Assignment created successfully");

        if (createdAssignment?._id) {
          navigate(`/admin/assignments/${createdAssignment._id}`);
        } else {
          navigate("/admin/assignments");
        }
      }
    } catch (err: unknown) {
      toast.error(
        isEditing
          ? "Failed to update assignment"
          : "Failed to create assignment",
        {
          description: getErrorMessage(err),
        },
      );
    } finally {
      setSaving(false);
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
          Loading assignment form...
        </p>
      </div>
    );
  }

  /*
   * ============================================
   * ERROR STATE
   * ============================================
   */

  if (error) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center px-5 text-center">
        <AlertCircle className="h-9 w-9 text-red-500" />

        <h2 className="mt-4 text-xl font-semibold">
          Could not load assignment form
        </h2>

        <p className="mt-2 max-w-lg text-sm text-muted-foreground">
          {error}
        </p>

        <div className="mt-5 flex gap-3">
          <Button
            variant="outline"
            className="rounded-xl"
            onClick={() =>
              navigate(
                isEditing && id
                  ? `/admin/assignments/${id}`
                  : "/admin/assignments",
              )
            }
          >
            Go Back
          </Button>

          <Button
            className="rounded-xl"
            onClick={() => void fetchFormData()}
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
          onClick={() =>
            navigate(
              isEditing && id
                ? `/admin/assignments/${id}`
                : "/admin/assignments",
            )
          }
          className="-ml-3 mb-4 rounded-xl text-muted-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-primary/10 p-3.5 text-primary">
            <FileText className="h-7 w-7" />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {isEditing ? "Edit Assignment" : "Create Assignment"}
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              {isEditing
                ? "Update the assignment information and settings."
                : "Create a new assignment for a course."}
            </p>
          </div>
        </div>
      </div>

      {/* COURSE WARNING */}

      {coursesError && (
        <div className="flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />

          <div>
            <p className="font-medium">Course list unavailable</p>

            <p className="mt-1 text-muted-foreground">{coursesError}</p>

            <Button
              type="button"
              variant="link"
              className="mt-1 h-auto p-0"
              onClick={() => void fetchFormData()}
            >
              Retry
            </Button>
          </div>
        </div>
      )}

      {/* FORM */}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(280px,0.8fr)]">
          {/* LEFT COLUMN */}

          <div className="space-y-6">
            <Card>
              <CardContent className="space-y-5 p-5 sm:p-7">
                <div>
                  <h2 className="font-semibold">Basic Information</h2>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Enter the assignment title and instructions.
                  </p>
                </div>

                {/* COURSE */}

                <div>
                  <label
                    htmlFor="courseId"
                    className="mb-2 block text-sm font-medium"
                  >
                    Course <span className="text-red-500">*</span>
                  </label>

                  <div className="relative">
                    <BookOpen className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <select
                      id="courseId"
                      value={form.courseId}
                      onChange={(event) =>
                        updateField("courseId", event.target.value)
                      }
                      disabled={isEditing || courses.length === 0}
                      required={!isEditing}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-9 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">
                        {courses.length
                          ? "Select a course"
                          : "No courses available"}
                      </option>

                      {courses.map((course) => (
                        <option key={course._id} value={course._id}>
                          {course.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  {isEditing && (
                    <p className="mt-2 text-xs text-muted-foreground">
                      The course cannot be changed while editing this
                      assignment.
                    </p>
                  )}
                </div>

                {/* TITLE */}

                <div>
                  <label
                    htmlFor="title"
                    className="mb-2 block text-sm font-medium"
                  >
                    Assignment Title{" "}
                    <span className="text-red-500">*</span>
                  </label>

                  <Input
                    id="title"
                    value={form.title}
                    onChange={(event) =>
                      updateField("title", event.target.value)
                    }
                    placeholder="e.g. Database Design Project"
                    maxLength={100}
                    required
                    className="rounded-xl"
                  />

                  <p className="mt-1 text-right text-xs text-muted-foreground">
                    {form.title.length}/100
                  </p>
                </div>

                {/* INSTRUCTIONS */}

                <div>
                  <label
                    htmlFor="instructions"
                    className="mb-2 block text-sm font-medium"
                  >
                    Instructions <span className="text-red-500">*</span>
                  </label>

                  <textarea
                    id="instructions"
                    value={form.instructions}
                    onChange={(event) =>
                      updateField("instructions", event.target.value)
                    }
                    placeholder="Explain the task, requirements, and expected deliverables..."
                    rows={10}
                    required
                    className="flex w-full rounded-xl border border-input bg-background px-3 py-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>

                {/* LESSON */}

                <div>
                  <label
                    htmlFor="lessonId"
                    className="mb-2 block text-sm font-medium"
                  >
                    Lesson ID{" "}
                    <span className="text-muted-foreground">
                      (Optional)
                    </span>
                  </label>

                  <Input
                    id="lessonId"
                    value={form.lessonId}
                    onChange={(event) =>
                      updateField("lessonId", event.target.value)
                    }
                    placeholder="Enter the related lesson ID"
                    className="rounded-xl"
                  />

                  <p className="mt-2 text-xs leading-5 text-muted-foreground">
                    If provided, the lesson must belong to the selected
                    course.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* SCHEDULE AND GRADING */}

            <Card>
              <CardContent className="space-y-5 p-5 sm:p-7">
                <div>
                  <h2 className="font-semibold">Schedule and Grading</h2>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Set the deadline and maximum score.
                  </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="dueDate"
                      className="mb-2 block text-sm font-medium"
                    >
                      Due Date
                    </label>

                    <div className="relative">
                      <CalendarDays className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                      <Input
                        id="dueDate"
                        type="datetime-local"
                        value={form.dueDate}
                        onChange={(event) =>
                          updateField("dueDate", event.target.value)
                        }
                        className="rounded-xl pl-9"
                      />
                    </div>

                    <p className="mt-2 text-xs text-muted-foreground">
                      Leave blank if there is no deadline.
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="maxScore"
                      className="mb-2 block text-sm font-medium"
                    >
                      Maximum Score{" "}
                      <span className="text-red-500">*</span>
                    </label>

                    <Input
                      id="maxScore"
                      type="number"
                      min="1"
                      step="any"
                      value={form.maxScore}
                      onChange={(event) =>
                        updateField("maxScore", event.target.value)
                      }
                      required
                      className="rounded-xl"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT COLUMN */}

          <div className="space-y-6">
            {/* STATUS */}

            <Card>
              <CardContent className="space-y-5 p-5">
                <div>
                  <h2 className="font-semibold">Publishing</h2>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Choose whether this assignment is a draft, published,
                    or closed.
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="status"
                    className="mb-2 block text-sm font-medium"
                  >
                    Status
                  </label>

                  <select
                    id="status"
                    value={form.status}
                    onChange={(event) =>
                      updateField(
                        "status",
                        event.target.value as AssignmentStatus,
                      )
                    }
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="Draft">Draft</option>
                    <option value="Published">Published</option>
                    <option value="Closed">Closed</option>
                  </select>

                  <p className="mt-3 rounded-xl bg-muted/50 p-3 text-xs leading-5 text-muted-foreground">
                    {form.status === "Draft" &&
                      "Draft assignments are not visible to students."}

                    {form.status === "Published" &&
                      "Published assignments are available to eligible students."}

                    {form.status === "Closed" &&
                      "Closed assignments are no longer available through the student assignment detail endpoint."}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* ATTACHMENT */}

            <Card>
              <CardContent className="space-y-4 p-5">
                <div>
                  <h2 className="font-semibold">Attachment</h2>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Add a link to an assignment resource.
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="fileAttachmentUrl"
                    className="mb-2 block text-sm font-medium"
                  >
                    Attachment URL
                  </label>

                  <Input
                    id="fileAttachmentUrl"
                    type="url"
                    value={form.fileAttachmentUrl}
                    onChange={(event) =>
                      updateField("fileAttachmentUrl", event.target.value)
                    }
                    placeholder="https://example.com/assignment.pdf"
                    className="rounded-xl"
                  />

                  <p className="mt-2 text-xs leading-5 text-muted-foreground">
                    This field stores a URL. It does not upload files.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* CHECKLIST */}

            <Card>
              <CardContent className="p-5">
                <h2 className="font-semibold">Before Saving</h2>

                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li>• Verify the course selection.</li>
                  <li>• Make the instructions clear.</li>
                  <li>• Check the due date and maximum score.</li>
                  <li>• Confirm the publishing status.</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FORM ACTIONS */}

        <div className="flex flex-col-reverse justify-between gap-3 border-t pt-5 sm:flex-row sm:items-center">
          <Button
            type="button"
            variant="outline"
            disabled={saving}
            onClick={() =>
              navigate(
                isEditing && id
                  ? `/admin/assignments/${id}`
                  : "/admin/assignments",
              )
            }
            className="rounded-xl"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={saving || (!isEditing && courses.length === 0)}
            className="rounded-xl"
          >
            {saving ? (
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}

            {saving
              ? "Saving..."
              : isEditing
                ? "Save Changes"
                : "Create Assignment"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AssignmentFormPage;