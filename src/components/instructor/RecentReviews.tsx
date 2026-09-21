import { Star, UserCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type Review = {
  id: string | number;
  student: string;
  rating: number;
  comment: string;
  course: string;
  date?: string;
  avatar?: string;
};

type Props = {
  reviews: Review[];
  onViewAll?: () => void;
};

const RecentReviews = ({
  reviews,
  onViewAll,
}: Props) => {
  return (
    <div className="rounded-2xl border bg-background shadow-sm">
      {/* HEADER */}
      <div className="flex items-center justify-between border-b p-5">
        <div>
          <h2 className="text-lg font-bold">
            Recent Reviews
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            See what students are saying about your courses.
          </p>
        </div>

        {onViewAll && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onViewAll}
            className="text-primary"
          >
            View All
          </Button>
        )}
      </div>

      {/* REVIEWS */}
      <div className="divide-y">
        {reviews.length === 0 ? (
          <div className="p-8 text-center text-sm text-muted-foreground">
            No reviews yet.
          </div>
        ) : (
          reviews.map((review) => (
            <div
              key={review.id}
              className="p-5 transition-colors hover:bg-muted/20"
            >
              <div className="flex gap-4">
                {/* AVATAR */}
                <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full bg-primary/10">
                  {review.avatar ? (
                    <img
                      src={review.avatar}
                      alt={review.student}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-primary">
                      <UserCircle2 className="h-7 w-7" />
                    </div>
                  )}
                </div>

                {/* CONTENT */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="font-semibold">
                        {review.student}
                      </h3>

                      <p className="text-xs text-muted-foreground">
                        {review.course}
                      </p>
                    </div>

                    {review.date && (
                      <span className="text-xs text-muted-foreground">
                        {review.date}
                      </span>
                    )}
                  </div>

                  {/* RATING */}
                  <div className="mt-2 flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground/30"
                        }`}
                      />
                    ))}

                    <span className="ml-1 text-sm font-semibold">
                      {review.rating.toFixed(1)}
                    </span>
                  </div>

                  {/* COMMENT */}
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {review.comment}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentReviews;