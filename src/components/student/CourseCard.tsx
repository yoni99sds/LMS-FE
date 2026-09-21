import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  title: string;
  image?: string;
  rating?: number;
  reviews?: number;
  price?: string;
  oldPrice?: string;
  instructor?: string;
  progress?: number;
};

const CourseCard = ({
  title,
  image = "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
  rating = 4.5,
  reviews = 120,
  price = "$49.99",
  oldPrice,
  instructor = "Instructor Name",
  progress,
}: Props) => {
  return (
    <div className="group bg-background border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">

      {/* IMAGE (HOME STYLE) */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          loading="lazy"
        />
      </div>

      {/* CONTENT */}
      <div className="p-5 flex flex-col gap-3">

        {/* TITLE */}
        <h3 className="text-lg font-bold line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

        {/* INSTRUCTOR */}
        <p className="text-sm text-muted-foreground">
          By <span className="font-semibold text-foreground">{instructor}</span>
        </p>

        {/* RATING (BELOW INSTRUCTOR) */}
        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center text-yellow-500">
            <Star className="h-4 w-4 fill-current" />
            <span className="ml-1 font-bold">{rating}</span>
          </div>
          <span className="text-muted-foreground">({reviews})</span>
        </div>

        {/* PROGRESS (DASHBOARD ONLY → IMPROVED BUTTON) */}
        {typeof progress === "number" && (
          <div className="mt-2 flex items-center justify-between">
            <div className="w-full mr-3">
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                <span>{progress}% complete</span>
              </div>
            </div>

            {/* ✅ BUTTON instead of text */}
            <Button size="sm" className="rounded-full px-4">
              Continue
            </Button>
          </div>
        )}

        {/* PRICE (BOTTOM LIKE HOME PAGE) */}
        <div className="mt-3 pt-4 border-t flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-primary">
              {price}
            </span>

            {oldPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {oldPrice}
              </span>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default CourseCard;