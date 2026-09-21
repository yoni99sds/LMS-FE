import InstructorLayout from "@/layouts/InstructorLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Star,
  MessageSquare,
  ThumbsUp,
  MoreVertical,
  TrendingUp,
} from "lucide-react";

const reviews = [
  {
    id: 1,
    student: "John Smith",
    initials: "JS",
    course: "Professional React Development",
    rating: 5,
    date: "2 days ago",
    comment:
      "Excellent course! The explanations are very clear and the practical projects helped me understand React much better.",
    helpful: 24,
  },
  {
    id: 2,
    student: "Emily Davis",
    initials: "ED",
    course: "Professional React Development",
    rating: 5,
    date: "5 days ago",
    comment:
      "One of the best React courses I've taken. I especially liked the real-world examples and the project-based approach.",
    helpful: 18,
  },
  {
    id: 3,
    student: "Michael Brown",
    initials: "MB",
    course: "Node.js Backend Development",
    rating: 4,
    date: "1 week ago",
    comment:
      "Very useful course with good explanations. I would have liked a few more advanced backend examples.",
    helpful: 12,
  },
  {
    id: 4,
    student: "Sophia Wilson",
    initials: "SW",
    course: "UI/UX Design Masterclass",
    rating: 5,
    date: "1 week ago",
    comment:
      "The instructor explains design concepts in a very practical way. The assignments were also really helpful.",
    helpful: 15,
  },
  {
    id: 5,
    student: "David Miller",
    initials: "DM",
    course: "Professional React Development",
    rating: 4,
    date: "2 weeks ago",
    comment:
      "Great content and well structured. Some sections could move a little faster, but overall a very good course.",
    helpful: 9,
  },
  {
    id: 6,
    student: "Jessica Taylor",
    initials: "JT",
    course: "Node.js Backend Development",
    rating: 5,
    date: "3 weeks ago",
    comment:
      "Really enjoyed this course. I was able to build my first complete backend application after following the lessons.",
    helpful: 21,
  },
];

const ratingDistribution = [
  { stars: 5, percentage: 72, count: 216 },
  { stars: 4, percentage: 18, count: 54 },
  { stars: 3, percentage: 6, count: 18 },
  { stars: 2, percentage: 3, count: 9 },
  { stars: 1, percentage: 1, count: 3 },
];

const ReviewsPage = () => {
  return (

      <div className="space-y-8">
        {/* HEADER */}
        <div>
          <h1 className="text-4xl font-black tracking-tight">
            Reviews
          </h1>

          <p className="text-muted-foreground mt-2">
            See what your students are saying about your courses.
          </p>
        </div>

        {/* OVERVIEW */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* OVERALL RATING */}
          <div className="border rounded-3xl bg-background p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-xl bg-primary/10 text-primary">
                <Star className="h-5 w-5 fill-current" />
              </div>

              <h2 className="font-bold text-lg">
                Overall Rating
              </h2>
            </div>

            <div className="flex items-center gap-4">
              <div>
                <p className="text-5xl font-black">
                  4.8
                </p>

                <div className="flex items-center mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
              </div>

              <div className="text-sm text-muted-foreground">
                <p>Based on</p>
                <p className="font-bold text-foreground">
                  300 reviews
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-5 text-sm text-green-600">
              <TrendingUp className="h-4 w-4" />
              <span className="font-medium">
                0.3 higher than last month
              </span>
            </div>
          </div>

          {/* RATING BREAKDOWN */}
          <div className="lg:col-span-2 border rounded-3xl bg-background p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-lg">
                Rating Breakdown
              </h2>

              <Badge variant="secondary">
                300 Reviews
              </Badge>
            </div>

            <div className="space-y-3">
              {ratingDistribution.map((item) => (
                <div
                  key={item.stars}
                  className="flex items-center gap-3"
                >
                  <div className="flex items-center gap-1 w-16">
                    <span className="text-sm font-medium">
                      {item.stars}
                    </span>

                    <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                  </div>

                  <div className="flex-1 h-2.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{
                        width: `${item.percentage}%`,
                      }}
                    />
                  </div>

                  <span className="text-sm text-muted-foreground w-12 text-right">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* COURSE FILTER / SUMMARY */}
        <div className="border rounded-3xl bg-background p-5 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold">
                Student Reviews
              </h2>

              <p className="text-sm text-muted-foreground mt-1">
                Recent feedback from students enrolled in your courses.
              </p>
            </div>

            <Button variant="outline" className="rounded-xl">
              All Courses
            </Button>
          </div>
        </div>

        {/* REVIEWS */}
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="border rounded-3xl bg-background p-6 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex flex-col gap-5">
                {/* TOP */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    {/* STUDENT AVATAR */}
                    <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                      {review.initials}
                    </div>

                    {/* STUDENT INFO */}
                    <div>
                      <h3 className="font-bold">
                        {review.student}
                      </h3>

                      <p className="text-sm text-muted-foreground">
                        {review.course}
                      </p>
                    </div>
                  </div>

                  {/* MENU */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                  >
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </div>

                {/* RATING */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted"
                        }`}
                      />
                    ))}
                  </div>

                  <span className="text-sm font-semibold">
                    {review.rating}.0
                  </span>

                  <span className="text-sm text-muted-foreground">
                    •
                  </span>

                  <span className="text-sm text-muted-foreground">
                    {review.date}
                  </span>
                </div>

                {/* COMMENT */}
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-4xl">
                  {review.comment}
                </p>

                {/* FOOTER */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <ThumbsUp className="h-4 w-4" />

                    <span>
                      {review.helpful} students found this helpful
                    </span>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-xl"
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Reply
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* LOAD MORE */}
        <div className="flex justify-center pt-2">
          <Button
            variant="outline"
            className="rounded-full px-8"
          >
            Load More Reviews
          </Button>
        </div>
      </div>
    
  );
};

export default ReviewsPage;