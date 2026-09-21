import { BookOpen } from "lucide-react";

type Props = {
  title: string;
  progress: number;
};

const CourseProgressCard = ({ title, progress }: Props) => {
  return (
    <div className="bg-background rounded-3xl border p-6 shadow-sm hover:shadow-lg transition">

      <div className="flex items-center gap-4">

        <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
          <BookOpen size={24} />
        </div>

        <div className="flex-1">
          <h3 className="font-bold text-lg">
            {title}
          </h3>

          <p className="text-sm text-muted-foreground">
            Course Progress
          </p>
        </div>

        <span className="font-bold text-primary">
          {progress}%
        </span>
      </div>

      <div className="mt-5 h-3 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-primary"
          style={{ width: `${progress}%` }}
        />
      </div>

    </div>
  );
};

export default CourseProgressCard;