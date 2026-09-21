import {
  BookOpen,
  Clock3,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {
  title: string;
  description?: string;
  image?: string;
  progress?: number;
  updatedAt?: string;
  lessons?: number;
  onContinue?: () => void;
  onDelete?: () => void;
};

const DraftCourseCard = ({
  title,
  description,
  image,
  progress = 0,
  updatedAt = "Recently",
  lessons = 0,
  onContinue,
  onDelete,
}: Props) => {
  const safeProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className="group overflow-hidden rounded-2xl border bg-background shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      {/* IMAGE */}
      <div className="relative aspect-video overflow-hidden bg-muted">
        {image ? (
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <BookOpen className="h-12 w-12 text-muted-foreground/40" />
          </div>
        )}

        {/* DRAFT BADGE */}
        <div className="absolute left-3 top-3">
          <span className="rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-foreground shadow-sm backdrop-blur">
            Draft
          </span>
        </div>

        {/* MENU */}
        <div className="absolute right-3 top-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                className="h-9 w-9 rounded-full bg-background/90 shadow-sm backdrop-blur hover:bg-background"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onContinue}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit Course
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={onDelete}
                className="text-red-500 focus:text-red-500"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Draft
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5">
        <h3 className="line-clamp-2 text-lg font-bold">
          {title}
        </h3>

        {description && (
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {description}
          </p>
        )}

        {/* PROGRESS */}
        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="font-medium text-muted-foreground">
              Completion
            </span>

            <span className="font-bold">
              {safeProgress}%
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${safeProgress}%` }}
            />
          </div>
        </div>

        {/* META */}
        <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5" />
            {lessons} lessons
          </div>

          <div className="flex items-center gap-1.5">
            <Clock3 className="h-3.5 w-3.5" />
            Updated {updatedAt}
          </div>
        </div>

        {/* ACTION */}
        <Button
          onClick={onContinue}
          className="mt-5 w-full rounded-xl"
        >
          Continue Editing
        </Button>
      </div>
    </div>
  );
};

export default DraftCourseCard;