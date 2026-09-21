import { BookOpen } from "lucide-react";

type Props = {
  title: string;
  description: string;
};

const EmptyState = ({
  title,
  description,
}: Props) => {
  return (
    <div className="bg-background border rounded-3xl p-12 text-center">

      <div className="w-20 h-20 rounded-full bg-primary/10 mx-auto flex items-center justify-center text-primary">
        <BookOpen size={35} />
      </div>

      <h2 className="text-2xl font-bold mt-6">
        {title}
      </h2>

      <p className="text-muted-foreground mt-2">
        {description}
      </p>

    </div>
  );
};

export default EmptyState;