import {
  Search,
  MoreHorizontal,
  Eye,
  Trash2,
  CheckCircle2,
  XCircle,
  Star,
  MessageSquare,
  Users,
  BookOpen,
  Clock,
  ChevronLeft,
  ChevronRight,
  Flag,
  ShieldCheck,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ReviewStatus = "Published" | "Pending" | "Hidden" | "Reported";

interface Review {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  courseId: string;
  courseTitle: string;
  instructorName: string;
  rating: number;
  title: string;
  comment: string;
  status: ReviewStatus;
  createdAt: string;
  helpfulCount: number;
  reportCount: number;
}

const mockReviews: Review[] = [
  {
    id: "REV-1001",
    studentId: "USR-1001",
    studentName: "Michael Johnson",
    studentEmail: "michael@example.com",
    courseId: "CRS-1001",
    courseTitle: "Full-Stack Web Development",
    instructorName: "John Instructor",
    rating: 5,
    title: "Excellent course",
    comment:
      "The course is very well organized and the instructor explains difficult concepts clearly. I especially enjoyed the practical projects.",
    status: "Published",
    createdAt: "2026-09-15",
    helpfulCount: 24,
    reportCount: 0,
  },
  {
    id: "REV-1002",
    studentId: "USR-1002",
    studentName: "Sarah Williams",
    studentEmail: "sarah@example.com",
    courseId: "CRS-1002",
    courseTitle: "React & TypeScript Masterclass",
    instructorName: "John Instructor",
    rating: 5,
    title: "Very helpful",
    comment:
      "A great explanation of React and TypeScript. The examples made it much easier to understand how everything works together.",
    status: "Published",
    createdAt: "2026-09-14",
    helpfulCount: 18,
    reportCount: 0,
  },
  {
    id: "REV-1003",
    studentId: "USR-1003",
    studentName: "David Brown",
    studentEmail: "david@example.com",
    courseId: "CRS-1003",
    courseTitle: "Node.js API Development",
    instructorName: "Robert Smith",
    rating: 4,
    title: "Good content",
    comment:
      "The course covers the main concepts well. I would have liked to see a few more advanced API examples.",
    status: "Published",
    createdAt: "2026-09-13",
    helpfulCount: 12,
    reportCount: 0,
  },
  {
    id: "REV-1004",
    studentId: "USR-1004",
    studentName: "Emily Davis",
    studentEmail: "emily@example.com",
    courseId: "CRS-1004",
    courseTitle: "UI/UX Design Fundamentals",
    instructorName: "Anna Wilson",
    rating: 4,
    title: "Great introduction",
    comment:
      "The design principles are explained in a simple way and the assignments are useful for beginners.",
    status: "Pending",
    createdAt: "2026-09-12",
    helpfulCount: 0,
    reportCount: 0,
  },
  {
    id: "REV-1005",
    studentId: "USR-1005",
    studentName: "James Miller",
    studentEmail: "james@example.com",
    courseId: "CRS-1005",
    courseTitle: "MongoDB & Database Design",
    instructorName: "Robert Smith",
    rating: 3,
    title: "Needs more examples",
    comment:
      "The theoretical part is good, but I think the course would benefit from more real-world database examples.",
    status: "Pending",
    createdAt: "2026-09-11",
    helpfulCount: 0,
    reportCount: 0,
  },
  {
    id: "REV-1006",
    studentId: "USR-1006",
    studentName: "Olivia Anderson",
    studentEmail: "olivia@example.com",
    courseId: "CRS-1006",
    courseTitle: "Advanced JavaScript",
    instructorName: "Michael Carter",
    rating: 2,
    title: "Not what I expected",
    comment:
      "Some of the topics were too brief and I expected more advanced exercises based on the course description.",
    status: "Reported",
    createdAt: "2026-09-10",
    helpfulCount: 3,
    reportCount: 2,
  },
  {
    id: "REV-1007",
    studentId: "USR-1007",
    studentName: "Daniel Thomas",
    studentEmail: "daniel@example.com",
    courseId: "CRS-1007",
    courseTitle: "Python for Beginners",
    instructorName: "Lisa Anderson",
    rating: 5,
    title: "Perfect for beginners",
    comment:
      "I had never programmed before and this course helped me understand the basics step by step.",
    status: "Published",
    createdAt: "2026-09-09",
    helpfulCount: 31,
    reportCount: 0,
  },
  {
    id: "REV-1008",
    studentId: "USR-1008",
    studentName: "Sophia Martinez",
    studentEmail: "sophia@example.com",
    courseId: "CRS-1008",
    courseTitle: "Figma UI Design",
    instructorName: "Anna Wilson",
    rating: 5,
    title: "Amazing design course",
    comment:
      "The lessons are practical and the Figma exercises are especially useful. I learned a lot from this course.",
    status: "Published",
    createdAt: "2026-09-08",
    helpfulCount: 27,
    reportCount: 0,
  },
  {
    id: "REV-1009",
    studentId: "USR-1009",
    studentName: "William Garcia",
    studentEmail: "william@example.com",
    courseId: "CRS-1009",
    courseTitle: "Git & GitHub for Developers",
    instructorName: "John Instructor",
    rating: 4,
    title: "Useful course",
    comment:
      "A straightforward explanation of Git workflows. The practical exercises were useful.",
    status: "Published",
    createdAt: "2026-09-07",
    helpfulCount: 15,
    reportCount: 0,
  },
  {
    id: "REV-1010",
    studentId: "USR-1010",
    studentName: "Emma Wilson",
    studentEmail: "emma@example.com",
    courseId: "CRS-1010",
    courseTitle: "REST API Development",
    instructorName: "Robert Smith",
    rating: 1,
    title: "Poor experience",
    comment:
      "I had several problems following the examples and some of the instructions were unclear.",
    status: "Hidden",
    createdAt: "2026-09-06",
    helpfulCount: 1,
    reportCount: 3,
  },
  {
    id: "REV-1011",
    studentId: "USR-1011",
    studentName: "Benjamin Taylor",
    studentEmail: "benjamin@example.com",
    courseId: "CRS-1001",
    courseTitle: "Full-Stack Web Development",
    instructorName: "John Instructor",
    rating: 5,
    title: "Worth every minute",
    comment:
      "One of the most practical courses I have taken. The projects make the learning experience much better.",
    status: "Published",
    createdAt: "2026-09-05",
    helpfulCount: 22,
    reportCount: 0,
  },
  {
    id: "REV-1012",
    studentId: "USR-1012",
    studentName: "Charlotte Moore",
    studentEmail: "charlotte@example.com",
    courseId: "CRS-1002",
    courseTitle: "React & TypeScript Masterclass",
    instructorName: "John Instructor",
    rating: 4,
    title: "Good course",
    comment:
      "The material is clear and the projects helped me improve my React skills.",
    status: "Pending",
    createdAt: "2026-09-04",
    helpfulCount: 0,
    reportCount: 0,
  },
];

const ReviewsPage = () => {
  const navigate = useNavigate();

  const [reviews] = useState<Review[]>(mockReviews);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [ratingFilter, setRatingFilter] = useState<string>("all");
  const [page, setPage] = useState(1);

  const itemsPerPage = 8;

  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      const searchTerm = search.toLowerCase().trim();

      const matchesSearch =
        !searchTerm ||
        review.studentName.toLowerCase().includes(searchTerm) ||
        review.studentEmail.toLowerCase().includes(searchTerm) ||
        review.courseTitle.toLowerCase().includes(searchTerm) ||
        review.instructorName.toLowerCase().includes(searchTerm) ||
        review.title.toLowerCase().includes(searchTerm) ||
        review.comment.toLowerCase().includes(searchTerm);

      const matchesStatus =
        statusFilter === "all" || review.status === statusFilter;

      const matchesRating =
        ratingFilter === "all" ||
        review.rating === Number(ratingFilter);

      return matchesSearch && matchesStatus && matchesRating;
    });
  }, [reviews, search, statusFilter, ratingFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredReviews.length / itemsPerPage)
  );

  const currentPage = Math.min(page, totalPages);

  const paginatedReviews = filteredReviews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalReviews = reviews.length;

  const publishedReviews = reviews.filter(
    (review) => review.status === "Published"
  ).length;

  const pendingReviews = reviews.filter(
    (review) => review.status === "Pending"
  ).length;

  const reportedReviews = reviews.filter(
    (review) => review.status === "Reported"
  ).length;

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) /
        reviews.length
      : 0;

  const handleStatusChange = (
    reviewId: string,
    newStatus: ReviewStatus
  ) => {
    console.log(`Review ${reviewId} changed to ${newStatus}`);
  };

  const handleDelete = (reviewId: string) => {
    console.log(`Delete review ${reviewId}`);
  };

  const handleView = (reviewId: string) => {
    console.log(`View review ${reviewId}`);
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setRatingFilter("all");
    setPage(1);
  };

  const getStatusClasses = (status: ReviewStatus) => {
    switch (status) {
      case "Published":
        return "bg-green-500/10 text-green-600 border-green-500/20";
      case "Pending":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
      case "Hidden":
        return "bg-gray-500/10 text-gray-600 border-gray-500/20";
      case "Reported":
        return "bg-red-500/10 text-red-600 border-red-500/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-3.5 w-3.5 ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-muted-foreground/30"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <ShieldCheck className="h-4 w-4" />
            <span>Administration</span>
            <span>/</span>
            <span>Reviews</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Reviews
          </h1>

          <p className="text-muted-foreground mt-1">
            Manage course reviews, ratings, and reported feedback.
          </p>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Total Reviews
                </p>
                <p className="text-2xl font-bold mt-1">{totalReviews}</p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <MessageSquare className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Published
                </p>
                <p className="text-2xl font-bold mt-1">
                  {publishedReviews}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-500/10 text-green-600">
                <CheckCircle2 className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Pending Review
                </p>
                <p className="text-2xl font-bold mt-1">
                  {pendingReviews}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-600">
                <Clock className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Average Rating
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-2xl font-bold">
                    {averageRating.toFixed(1)}
                  </p>

                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                </div>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-600">
                <Star className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reported Reviews Alert */}
      {reportedReviews > 0 && (
        <Card className="border-red-500/20 bg-red-500/5">
          <CardContent className="p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-600">
                  <Flag className="h-5 w-5" />
                </div>

                <div>
                  <p className="font-semibold">
                    {reportedReviews} reported review
                    {reportedReviews !== 1 ? "s" : ""} need attention
                  </p>

                  <p className="text-sm text-muted-foreground mt-0.5">
                    Review the reported feedback and take appropriate
                    moderation action.
                  </p>
                </div>
              </div>

              <Button
                variant="outline"
                className="border-red-500/30 text-red-600 hover:bg-red-500/10"
                onClick={() => {
                  setStatusFilter("Reported");
                  setPage(1);
                }}
              >
                View Reports
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
                placeholder="Search student, course, instructor, or review..."
                className="pl-9"
              />
            </div>

            <Select
              value={statusFilter}
              onValueChange={(value) => {
                setStatusFilter(value);
                setPage(1);
              }}
            >
              <SelectTrigger className="w-full lg:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Published">Published</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Hidden">Hidden</SelectItem>
                <SelectItem value="Reported">Reported</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={ratingFilter}
              onValueChange={(value) => {
                setRatingFilter(value);
                setPage(1);
              }}
            >
              <SelectTrigger className="w-full lg:w-[160px]">
                <SelectValue placeholder="Rating" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                <SelectItem value="5">5 Stars</SelectItem>
                <SelectItem value="4">4 Stars</SelectItem>
                <SelectItem value="3">3 Stars</SelectItem>
                <SelectItem value="2">2 Stars</SelectItem>
                <SelectItem value="1">1 Star</SelectItem>
              </SelectContent>
            </Select>

            {(search ||
              statusFilter !== "all" ||
              ratingFilter !== "all") && (
              <Button
                variant="outline"
                onClick={clearFilters}
                className="shrink-0"
              >
                Clear Filters
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Reviews Table */}
      <Card className="overflow-hidden">
        <CardHeader className="border-b">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Course Reviews</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {filteredReviews.length} review
                {filteredReviews.length !== 1 ? "s" : ""} found
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>Student feedback</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {paginatedReviews.length === 0 ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
                <MessageSquare className="h-6 w-6 text-muted-foreground" />
              </div>

              <h3 className="mt-4 text-lg font-semibold">
                No reviews found
              </h3>

              <p className="mt-1 max-w-md text-sm text-muted-foreground">
                Try changing your search terms or filters to find the
                reviews you are looking for.
              </p>

              <Button
                variant="outline"
                className="mt-4"
                onClick={clearFilters}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden overflow-x-auto lg:block">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/30">
                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Student
                      </th>

                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Course
                      </th>

                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Rating
                      </th>

                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Review
                      </th>

                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Status
                      </th>

                      <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Date
                      </th>

                      <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y">
                    {paginatedReviews.map((review) => (
                      <tr
                        key={review.id}
                        className="transition-colors hover:bg-muted/20"
                      >
                        {/* Student */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                              {review.studentName
                                .split(" ")
                                .map((name) => name.charAt(0))
                                .join("")
                                .slice(0, 2)
                                .toUpperCase()}
                            </div>

                            <div className="min-w-0">
                              <button
                                type="button"
                                className="font-medium hover:text-primary transition-colors text-left"
                                onClick={() =>
                                  navigate(
                                    `/admin/users/${review.studentId}`
                                  )
                                }
                              >
                                {review.studentName}
                              </button>

                              <p className="text-xs text-muted-foreground truncate max-w-[180px]">
                                {review.studentEmail}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Course */}
                        <td className="px-6 py-4">
                          <div className="flex items-start gap-2 max-w-[220px]">
                            <BookOpen className="h-4 w-4 shrink-0 mt-0.5 text-muted-foreground" />

                            <div>
                              <button
                                type="button"
                                className="text-sm font-medium hover:text-primary transition-colors text-left"
                                onClick={() =>
                                  navigate(
                                    `/admin/courses/${review.courseId}`
                                  )
                                }
                              >
                                {review.courseTitle}
                              </button>

                              <p className="text-xs text-muted-foreground mt-0.5">
                                {review.instructorName}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Rating */}
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            {renderStars(review.rating)}

                            <p className="text-xs font-medium">
                              {review.rating}.0 / 5.0
                            </p>
                          </div>
                        </td>

                        {/* Review */}
                        <td className="px-6 py-4">
                          <div className="max-w-[280px]">
                            <p className="font-medium text-sm truncate">
                              {review.title}
                            </p>

                            <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                              {review.comment}
                            </p>

                            <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                              <span>
                                Helpful: {review.helpfulCount}
                              </span>

                              {review.reportCount > 0 && (
                                <span className="text-red-600">
                                  Reports: {review.reportCount}
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${getStatusClasses(
                              review.status
                            )}`}
                          >
                            {review.status}
                          </span>
                        </td>

                        {/* Date */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                          {review.createdAt}
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => handleView(review.id)}
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                View Review
                              </DropdownMenuItem>

                              <DropdownMenuItem
                                onClick={() =>
                                  navigate(
                                    `/admin/users/${review.studentId}`
                                  )
                                }
                              >
                                <Users className="mr-2 h-4 w-4" />
                                View Student
                              </DropdownMenuItem>

                              <DropdownMenuItem
                                onClick={() =>
                                  navigate(
                                    `/admin/courses/${review.courseId}`
                                  )
                                }
                              >
                                <BookOpen className="mr-2 h-4 w-4" />
                                View Course
                              </DropdownMenuItem>

                              <DropdownMenuSeparator />

                              {review.status !== "Published" && (
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleStatusChange(
                                      review.id,
                                      "Published"
                                    )
                                  }
                                >
                                  <CheckCircle2 className="mr-2 h-4 w-4 text-green-600" />
                                  Publish
                                </DropdownMenuItem>
                              )}

                              {review.status !== "Hidden" && (
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleStatusChange(
                                      review.id,
                                      "Hidden"
                                    )
                                  }
                                >
                                  <XCircle className="mr-2 h-4 w-4" />
                                  Hide Review
                                </DropdownMenuItem>
                              )}

                              {review.status === "Reported" && (
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleStatusChange(
                                      review.id,
                                      "Published"
                                    )
                                  }
                                >
                                  <ShieldCheck className="mr-2 h-4 w-4 text-primary" />
                                  Resolve Report
                                </DropdownMenuItem>
                              )}

                              <DropdownMenuSeparator />

                              <DropdownMenuItem
                                onClick={() => handleDelete(review.id)}
                                className="text-red-600 focus:text-red-600"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Review
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile / Tablet Cards */}
              <div className="divide-y lg:hidden">
                {paginatedReviews.map((review) => (
                  <div key={review.id} className="p-4 sm:p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                          {review.studentName
                            .split(" ")
                            .map((name) => name.charAt(0))
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
                        </div>

                        <div className="min-w-0">
                          <button
                            type="button"
                            className="font-semibold text-sm hover:text-primary transition-colors"
                            onClick={() =>
                              navigate(
                                `/admin/users/${review.studentId}`
                              )
                            }
                          >
                            {review.studentName}
                          </button>

                          <p className="text-xs text-muted-foreground truncate">
                            {review.studentEmail}
                          </p>
                        </div>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 shrink-0"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleView(review.id)}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Review
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            onClick={() =>
                              navigate(
                                `/admin/users/${review.studentId}`
                              )
                            }
                          >
                            <Users className="mr-2 h-4 w-4" />
                            View Student
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            onClick={() =>
                              navigate(
                                `/admin/courses/${review.courseId}`
                              )
                            }
                          >
                            <BookOpen className="mr-2 h-4 w-4" />
                            View Course
                          </DropdownMenuItem>

                          <DropdownMenuSeparator />

                          {review.status !== "Published" && (
                            <DropdownMenuItem
                              onClick={() =>
                                handleStatusChange(
                                  review.id,
                                  "Published"
                                )
                              }
                            >
                              <CheckCircle2 className="mr-2 h-4 w-4 text-green-600" />
                              Publish
                            </DropdownMenuItem>
                          )}

                          {review.status !== "Hidden" && (
                            <DropdownMenuItem
                              onClick={() =>
                                handleStatusChange(
                                  review.id,
                                  "Hidden"
                                )
                              }
                            >
                              <XCircle className="mr-2 h-4 w-4" />
                              Hide Review
                            </DropdownMenuItem>
                          )}

                          <DropdownMenuSeparator />

                          <DropdownMenuItem
                            onClick={() => handleDelete(review.id)}
                            className="text-red-600 focus:text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Review
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="mt-4">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="font-medium text-sm">
                            {review.title}
                          </p>

                          <div className="mt-1">
                            {renderStars(review.rating)}
                          </div>
                        </div>

                        <span
                          className={`inline-flex shrink-0 items-center rounded-full border px-2.5 py-1 text-xs font-medium ${getStatusClasses(
                            review.status
                          )}`}
                        >
                          {review.status}
                        </span>
                      </div>

                      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                        {review.comment}
                      </p>

                      <div className="mt-4 rounded-xl bg-muted/40 p-3">
                        <div className="flex items-start gap-2">
                          <BookOpen className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />

                          <div className="min-w-0">
                            <button
                              type="button"
                              className="text-sm font-medium hover:text-primary transition-colors text-left"
                              onClick={() =>
                                navigate(
                                  `/admin/courses/${review.courseId}`
                                )
                              }
                            >
                              {review.courseTitle}
                            </button>

                            <p className="text-xs text-muted-foreground mt-0.5">
                              {review.instructorName}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-3">
                          <span>
                            Rating:{" "}
                            <strong className="text-foreground">
                              {review.rating}/5
                            </strong>
                          </span>

                          <span>
                            Helpful:{" "}
                            <strong className="text-foreground">
                              {review.helpfulCount}
                            </strong>
                          </span>

                          {review.reportCount > 0 && (
                            <span className="text-red-600">
                              Reports: {review.reportCount}
                            </span>
                          )}
                        </div>

                        <span>{review.createdAt}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex flex-col gap-3 border-t px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing{" "}
                  <span className="font-medium text-foreground">
                    {filteredReviews.length === 0
                      ? 0
                      : (currentPage - 1) * itemsPerPage + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-medium text-foreground">
                    {Math.min(
                      currentPage * itemsPerPage,
                      filteredReviews.length
                    )}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium text-foreground">
                    {filteredReviews.length}
                  </span>{" "}
                  reviews
                </p>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() =>
                      setPage((previous) => Math.max(1, previous - 1))
                    }
                  >
                    <ChevronLeft className="mr-1 h-4 w-4" />
                    Previous
                  </Button>

                  <div className="flex items-center gap-1">
                    {Array.from(
                      { length: totalPages },
                      (_, index) => index + 1
                    )
                      .slice(
                        Math.max(0, currentPage - 2),
                        Math.min(totalPages, currentPage + 1)
                      )
                      .map((pageNumber) => (
                        <Button
                          key={pageNumber}
                          variant={
                            currentPage === pageNumber
                              ? "default"
                              : "outline"
                          }
                          size="sm"
                          className="h-9 w-9 p-0"
                          onClick={() => setPage(pageNumber)}
                        >
                          {pageNumber}
                        </Button>
                      ))}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() =>
                      setPage((previous) =>
                        Math.min(totalPages, previous + 1)
                      )
                    }
                  >
                    Next
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Bottom Information */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Star className="h-5 w-5" />
              </div>

              <div>
                <p className="font-semibold">Rating Management</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Monitor ratings and identify courses that may need
                  additional attention.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-600">
                <Clock className="h-5 w-5" />
              </div>

              <div>
                <p className="font-semibold">Moderation Queue</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Pending reviews can be checked before being published
                  to students.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-600">
                <Flag className="h-5 w-5" />
              </div>

              <div>
                <p className="font-semibold">Reported Content</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Review reported feedback and resolve moderation issues
                  when necessary.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Placeholder Notice */}
      <div className="rounded-xl border border-dashed bg-muted/20 p-4">
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">Development note:</strong>{" "}
          Review data on this page is currently placeholder data. The
          publish, hide, delete, and report actions currently log to the
          console and will be connected to the backend review API later.
        </p>
      </div>
    </div>
  );
};

export default ReviewsPage;