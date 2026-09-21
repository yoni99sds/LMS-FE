import {
  MoreVertical,
  UserCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Student = {
  id: string | number;
  name: string;
  email: string;
  avatar?: string;
  courses?: number;
  progress?: number;
  status?: "Active" | "Inactive";
  joinedAt?: string;
};

type Props = {
  students: Student[];
  onViewStudent?: (student: Student) => void;
};

const StudentTable = ({
  students,
  onViewStudent,
}: Props) => {
  return (
    <div className="w-full overflow-hidden rounded-2xl border bg-background shadow-sm">
      {/* DESKTOP TABLE */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/30 text-left">
              <th className="px-5 py-4 text-sm font-semibold">
                Student
              </th>

              <th className="px-5 py-4 text-sm font-semibold">
                Courses
              </th>

              <th className="px-5 py-4 text-sm font-semibold">
                Progress
              </th>

              <th className="px-5 py-4 text-sm font-semibold">
                Status
              </th>

              <th className="px-5 py-4 text-sm font-semibold">
                Joined
              </th>

              <th className="px-5 py-4 text-right text-sm font-semibold">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {students.map((student) => (
              <tr
                key={student.id}
                className="transition-colors hover:bg-muted/20"
              >
                {/* STUDENT */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar student={student} />

                    <div>
                      <p className="font-semibold">
                        {student.name}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {student.email}
                      </p>
                    </div>
                  </div>
                </td>

                {/* COURSES */}
                <td className="px-5 py-4 text-sm">
                  {student.courses ?? 0}
                </td>

                {/* PROGRESS */}
                <td className="px-5 py-4">
                  <div className="w-32">
                    <div className="mb-1 flex justify-between text-xs">
                      <span className="text-muted-foreground">
                        Progress
                      </span>

                      <span className="font-semibold">
                        {student.progress ?? 0}%
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{
                          width: `${Math.min(
                            Math.max(student.progress ?? 0, 0),
                            100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                </td>

                {/* STATUS */}
                <td className="px-5 py-4">
                  <Badge
                    className={
                      student.status === "Inactive"
                        ? "bg-muted text-muted-foreground"
                        : "bg-green-500/10 text-green-600"
                    }
                  >
                    {student.status ?? "Active"}
                  </Badge>
                </td>

                {/* JOINED */}
                <td className="px-5 py-4 text-sm text-muted-foreground">
                  {student.joinedAt ?? "-"}
                </td>

                {/* ACTION */}
                <td className="px-5 py-4 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => onViewStudent?.(student)}
                      >
                        View Profile
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARDS */}
      <div className="divide-y md:hidden">
        {students.map((student) => (
          <div
            key={student.id}
            className="p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <Avatar student={student} />

                <div>
                  <p className="font-semibold">
                    {student.name}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {student.email}
                  </p>
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={() => onViewStudent?.(student)}
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">
                  Courses
                </p>

                <p className="mt-1 font-semibold">
                  {student.courses ?? 0}
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">
                  Status
                </p>

                <Badge
                  className="mt-1 bg-green-500/10 text-green-600"
                >
                  {student.status ?? "Active"}
                </Badge>
              </div>
            </div>

            <div className="mt-4">
              <div className="mb-1 flex justify-between text-xs">
                <span className="text-muted-foreground">
                  Course Progress
                </span>

                <span className="font-semibold">
                  {student.progress ?? 0}%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{
                    width: `${Math.min(
                      Math.max(student.progress ?? 0, 0),
                      100
                    )}%`,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {students.length === 0 && (
        <div className="p-10 text-center text-sm text-muted-foreground">
          No students found.
        </div>
      )}
    </div>
  );
};

const Avatar = ({
  student,
}: {
  student: Student;
}) => {
  if (student.avatar) {
    return (
      <img
        src={student.avatar}
        alt={student.name}
        className="h-11 w-11 rounded-full object-cover"
      />
    );
  }

  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
      <UserCircle2 className="h-7 w-7" />
    </div>
  );
};

export default StudentTable;