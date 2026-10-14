
import { useState } from "react";
import {
  Search,
  Filter,
  SlidersHorizontal,
  Grid,
  List,
  ChevronDown,
  Star,
  ShoppingCart,
  BookOpen,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

// ============================================================
// TYPES
// ============================================================

interface Course {
  id: number;
  title: string;
  instructor: string;
  category: string;
  rating: number;
  reviews: number;
  price: string;
  image: string;
  level: string;
  duration: string;
}

interface CartItem {
  courseId: string;
  title: string;
  price: number;
  image: string;
  instructor: string;
  quantity?: number;
}

type SortOption =
  | "relevance"
  | "newest"
  | "rating"
  | "price-low"
  | "price-high";

const CART_STORAGE_KEY = "edumaster_cart";
const CART_UPDATED_EVENT = "edumaster-cart-updated";

// ============================================================
// COURSES PAGE
// ============================================================

const CoursesPage = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>("relevance");

  // ============================================================
  // CATEGORIES
  // ============================================================

  const categories = [
    "Web Development",
    "Mobile Development",
    "Data Science",
    "UI/UX Design",
    "Business",
    "Marketing",
    "Photography",
    "Music",
  ];

  // ============================================================
  // MOCK COURSES
  // Replace these with courses returned by your backend API.
  // ============================================================

  const courses: Course[] = [
    {
      id: 1,
      title: "Professional React Development",
      instructor: "Alex Johnson",
      category: "Web Development",
      rating: 4.8,
      reviews: 1240,
      price: "$89.99",
      image:
        "https://storage.googleapis.com/dala-prod-public-storage/generated-images/678ea2b5-4cb5-4e95-8f1f-9d90d381aff8/react-course-thumbnail-5f467410-1781888612690.webp",
      level: "Advanced",
      duration: "45h 30m",
    },
    {
      id: 2,
      title: "Data Science with Python",
      instructor: "Sarah Miller",
      category: "Data Science",
      rating: 4.9,
      reviews: 850,
      price: "$99.99",
      image:
        "https://storage.googleapis.com/dala-prod-public-storage/generated-images/678ea2b5-4cb5-4e95-8f1f-9d90d381aff8/data-science-course-thumbnail-b8a3f22c-1781888613832.webp",
      level: "Intermediate",
      duration: "38h 15m",
    },
    {
      id: 3,
      title: "UI/UX Design Masterclass",
      instructor: "David Chen",
      category: "UI/UX Design",
      rating: 4.7,
      reviews: 620,
      price: "$79.99",
      image:
        "https://storage.googleapis.com/dala-prod-public-storage/generated-images/678ea2b5-4cb5-4e95-8f1f-9d90d381aff8/ui-ux-design-course-thumbnail-6f2b3030-1781888612958.webp",
      level: "Beginner",
      duration: "25h 00m",
    },
    {
      id: 4,
      title: "Advanced Machine Learning",
      instructor: "Dr. Michael Smith",
      category: "Data Science",
      rating: 4.6,
      reviews: 420,
      price: "$129.99",
      image:
        "https://storage.googleapis.com/dala-prod-public-storage/generated-images/678ea2b5-4cb5-4e95-8f1f-9d90d381aff8/data-science-course-thumbnail-b8a3f22c-1781888613832.webp",
      level: "Advanced",
      duration: "52h 20m",
    },
    {
      id: 5,
      title: "Flutter Mobile App Development",
      instructor: "Elena Rodriguez",
      category: "Mobile Development",
      rating: 4.8,
      reviews: 310,
      price: "$84.99",
      image:
        "https://storage.googleapis.com/dala-prod-public-storage/generated-images/678ea2b5-4cb5-4e95-8f1f-9d90d381aff8/react-course-thumbnail-5f467410-1781888612690.webp",
      level: "Intermediate",
      duration: "32h 45m",
    },
    {
      id: 6,
      title: "Business Strategy 101",
      instructor: "Robert Wilson",
      category: "Business",
      rating: 4.5,
      reviews: 150,
      price: "$69.99",
      image:
        "https://storage.googleapis.com/dala-prod-public-storage/generated-images/678ea2b5-4cb5-4e95-8f1f-9d90d381aff8/ui-ux-design-course-thumbnail-6f2b3030-1781888612958.webp",
      level: "Beginner",
      duration: "15h 10m",
    },
  ];

  // ============================================================
  // ADD COURSE TO SHARED CART
  // ============================================================

  const handleAddToCart = (course: Course) => {
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);

      let cart: CartItem[] = [];

      if (storedCart) {
        const parsed: unknown = JSON.parse(storedCart);

        if (Array.isArray(parsed)) {
          cart = parsed.filter(
            (item): item is CartItem =>
              item !== null &&
              typeof item === "object" &&
              typeof item.courseId === "string" &&
              typeof item.title === "string" &&
              typeof item.price === "number" &&
              Number.isFinite(item.price)
          );
        }
      }

      // Use the course ID to prevent duplicate cart entries.
      const courseId = String(course.id);

      const alreadyInCart = cart.some(
        (item) => item.courseId === courseId
      );

      if (alreadyInCart) {
        toast.info("This course is already in your cart.");
        return;
      }

      // Convert "$89.99" into the numeric value 89.99.
      const numericPrice = Number(
        course.price.replace(/[^0-9.]/g, "")
      );

      if (!Number.isFinite(numericPrice)) {
        toast.error("Could not read the course price.");
        return;
      }

      const newCartItem: CartItem = {
        courseId,
        title: course.title,
        price: numericPrice,
        image: course.image,
        instructor: course.instructor,
        quantity: 1,
      };

      const updatedCart = [...cart, newCartItem];

      // Persist the shared cart.
      localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(updatedCart)
      );

      // Notify the homepage Navbar and student Topbar immediately.
      window.dispatchEvent(
        new CustomEvent(CART_UPDATED_EVENT, {
          detail: updatedCart,
        })
      );

      toast.success(`${course.title} added to your cart.`);
    } catch (error) {
      console.error("Failed to add course to cart:", error);
      toast.error("Could not add this course. Please try again.");
    }
  };

  // ============================================================
  // FILTER HELPERS
  // ============================================================

  const toggleCategory = (category: string, checked: boolean) => {
    setSelectedCategories((previous) =>
      checked
        ? [...previous, category]
        : previous.filter((item) => item !== category)
    );
  };

  const toggleRating = (rating: number, checked: boolean) => {
    setSelectedRatings((previous) =>
      checked
        ? [...previous, rating]
        : previous.filter((item) => item !== rating)
    );
  };

  const toggleLevel = (level: string, checked: boolean) => {
    setSelectedLevels((previous) =>
      checked
        ? [...previous, level]
        : previous.filter((item) => item !== level)
    );
  };

  const togglePrice = (price: string, checked: boolean) => {
    setSelectedPrices((previous) =>
      checked
        ? [...previous, price]
        : previous.filter((item) => item !== price)
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setSelectedRatings([]);
    setSelectedLevels([]);
    setSelectedPrices([]);
    setSortOption("relevance");
  };

  // ============================================================
  // FILTER AND SORT COURSES
  // ============================================================

  const filteredCourses = courses
    .filter((course) => {
      const query = searchQuery.toLowerCase().trim();

      const matchesSearch =
        course.title.toLowerCase().includes(query) ||
        course.instructor.toLowerCase().includes(query) ||
        course.category.toLowerCase().includes(query);

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(course.category);

      const matchesRating =
        selectedRatings.length === 0 ||
        selectedRatings.some((rating) => course.rating >= rating);

      const matchesLevel =
        selectedLevels.length === 0 ||
        selectedLevels.includes(course.level);

      const numericPrice = Number(
        course.price.replace(/[^0-9.]/g, "")
      );

      const matchesPrice =
        selectedPrices.length === 0 ||
        (selectedPrices.includes("Free") && numericPrice === 0) ||
        (selectedPrices.includes("Paid") && numericPrice > 0);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesRating &&
        matchesLevel &&
        matchesPrice
      );
    })
    .sort((a, b) => {
      const priceA = Number(a.price.replace(/[^0-9.]/g, ""));
      const priceB = Number(b.price.replace(/[^0-9.]/g, ""));

      switch (sortOption) {
        case "rating":
          return b.rating - a.rating;
        case "price-low":
          return priceA - priceB;
        case "price-high":
          return priceB - priceA;
        case "newest":
          return b.id - a.id;
        default:
          return 0;
      }
    });

  // ============================================================
  // PAGE UI
  // ============================================================

  return (
    <div className="container px-4 py-20 md:py-20">
      <div className="flex flex-col gap-8">
        {/* HEADER */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold tracking-tight">
            Browse Courses
          </h1>

          <p className="text-muted-foreground">
            Choose from {courses.length} online video courses with new
            additions published every month.
          </p>
        </div>

        {/* TOOLBAR */}
        <div className="flex flex-col items-center justify-between gap-4 rounded-xl border bg-muted/30 p-4 md:flex-row">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              placeholder="Search courses, instructors..."
              className="bg-background pl-10"
              value={searchQuery}
              onChange={(event) =>
                setSearchQuery(event.target.value)
              }
            />
          </div>

          <div className="flex w-full items-center gap-3 md:w-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <SlidersHorizontal className="h-4 w-4" />

                  {sortOption === "relevance" && "Sort By: Relevance"}
                  {sortOption === "newest" && "Newest First"}
                  {sortOption === "rating" && "Highest Rated"}
                  {sortOption === "price-low" && "Price: Low to High"}
                  {sortOption === "price-high" && "Price: High to Low"}

                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => setSortOption("relevance")}
                >
                  Relevance
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => setSortOption("newest")}
                >
                  Newest First
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => setSortOption("rating")}
                >
                  Highest Rated
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => setSortOption("price-low")}
                >
                  Price: Low to High
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => setSortOption("price-high")}
                >
                  Price: High to Low
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Separator
              orientation="vertical"
              className="hidden h-8 md:block"
            />

            <div className="flex rounded-lg border bg-background p-1">
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="icon"
                className="h-8 w-8 rounded-md"
                onClick={() => setViewMode("grid")}
                aria-label="Grid view"
              >
                <Grid className="h-4 w-4" />
              </Button>

              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="icon"
                className="h-8 w-8 rounded-md"
                onClick={() => setViewMode("list")}
                aria-label="List view"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* SIDEBAR FILTERS */}
          <aside className="hidden flex-col gap-8 lg:flex">
            <div className="flex flex-col gap-4">
              <h3 className="flex items-center gap-2 font-bold">
                <Filter className="h-4 w-4" />
                Filters
              </h3>

              <Separator />
            </div>

            <div className="space-y-6">
              {/* CATEGORIES */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold">Categories</h4>

                <div className="space-y-2">
                  {categories.map((category) => (
                    <div
                      key={category}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={(checked) =>
                          toggleCategory(category, checked === true)
                        }
                      />

                      <Label
                        htmlFor={`category-${category}`}
                        className="cursor-pointer text-sm font-medium leading-none"
                      >
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* RATINGS */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold">Ratings</h4>

                <div className="space-y-2">
                  {[4, 3, 2, 1].map((rating) => (
                    <div
                      key={rating}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`rating-${rating}`}
                        checked={selectedRatings.includes(rating)}
                        onCheckedChange={(checked) =>
                          toggleRating(rating, checked === true)
                        }
                      />

                      <Label
                        htmlFor={`rating-${rating}`}
                        className="flex cursor-pointer items-center gap-1 text-sm font-medium leading-none"
                      >
                        <span className="flex text-yellow-500">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <Star
                              key={index}
                              className={`h-3 w-3 ${
                                index < rating
                                  ? "fill-current"
                                  : "text-muted"
                              }`}
                            />
                          ))}
                        </span>

                        <span>{rating}.0 & Up</span>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* LEVEL */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold">Level</h4>

                <div className="space-y-2">
                  {["Beginner", "Intermediate", "Advanced"].map(
                    (level) => (
                      <div
                        key={level}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`level-${level}`}
                          checked={selectedLevels.includes(level)}
                          onCheckedChange={(checked) =>
                            toggleLevel(level, checked === true)
                          }
                        />

                        <Label
                          htmlFor={`level-${level}`}
                          className="cursor-pointer text-sm font-medium leading-none"
                        >
                          {level}
                        </Label>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* PRICE */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold">Price</h4>

                <div className="space-y-2">
                  {["Free", "Paid"].map((price) => (
                    <div
                      key={price}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`price-${price}`}
                        checked={selectedPrices.includes(price)}
                        onCheckedChange={(checked) =>
                          togglePrice(price, checked === true)
                        }
                      />

                      <Label
                        htmlFor={`price-${price}`}
                        className="cursor-pointer text-sm font-medium leading-none"
                      >
                        {price}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full"
              onClick={clearFilters}
            >
              Clear All Filters
            </Button>
          </aside>

          {/* COURSE GRID / LIST */}
          <div className="lg:col-span-3">
            <p className="mb-4 text-sm text-muted-foreground">
              Showing {filteredCourses.length} of {courses.length} courses
            </p>

            <AnimatePresence mode="wait">
              {viewMode === "grid" ? (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
                >
                  {filteredCourses.map((course) => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-6"
                >
                  {filteredCourses.map((course) => (
                    <CourseListItem
                      key={course.id}
                      course={course}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* NO RESULTS */}
            {filteredCourses.length === 0 && (
              <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
                <div className="rounded-full bg-muted p-6">
                  <Search className="h-10 w-10 text-muted-foreground" />
                </div>

                <h3 className="text-xl font-bold">No courses found</h3>

                <p className="text-muted-foreground">
                  Try adjusting your search or filters to find what
                  you're looking for.
                </p>

                <Button onClick={clearFilters}>
                  Clear Search and Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// COURSE GRID CARD
// ============================================================

const CourseCard = ({
  course,
  onAddToCart,
}: {
  course: Course;
  onAddToCart: (course: Course) => void;
}) => (
  <motion.div
    layout
    whileHover={{ y: -5 }}
    className="group overflow-hidden rounded-xl border bg-background shadow-sm transition-all hover:shadow-md"
  >
    <div className="relative aspect-video overflow-hidden">
      <img
        src={course.image}
        alt={course.title}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      <div className="absolute bottom-2 left-2">
        <Badge className="border-none bg-background/90 text-foreground shadow-sm backdrop-blur-sm">
          {course.level}
        </Badge>
      </div>
    </div>

    <div className="flex flex-col gap-2 p-4">
      <div className="text-xs font-semibold text-primary">
        {course.category}
      </div>

      <h3 className="line-clamp-2 h-12 text-base font-bold transition-colors group-hover:text-primary">
        {course.title}
      </h3>

      <p className="text-xs font-medium text-muted-foreground">
        By {course.instructor}
      </p>

      <div className="flex items-center gap-2 text-xs">
        <div className="flex items-center text-yellow-500">
          <Star className="h-3.5 w-3.5 fill-current" />
          <span className="ml-1 font-bold">{course.rating}</span>
        </div>

        <span className="text-muted-foreground">
          ({course.reviews})
        </span>

        <span className="text-muted-foreground">•</span>

        <span className="text-muted-foreground">
          {course.duration}
        </span>
      </div>

      <div className="mt-2 flex items-center justify-between gap-2">
        <span className="text-lg font-bold text-foreground">
          {course.price}
        </span>

        <Button
          size="sm"
          className="h-9 rounded-lg"
          onClick={() => onAddToCart(course)}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </div>
    </div>
  </motion.div>
);

// ============================================================
// COURSE LIST ITEM
// ============================================================

const CourseListItem = ({
  course,
  onAddToCart,
}: {
  course: Course;
  onAddToCart: (course: Course) => void;
}) => (
  <motion.div
    layout
    className="group flex flex-col overflow-hidden rounded-xl border bg-background shadow-sm transition-all hover:shadow-md md:flex-row"
  >
    <div className="relative aspect-video w-full overflow-hidden md:w-64 md:aspect-auto">
      <img
        src={course.image}
        alt={course.title}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>

    <div className="flex flex-1 flex-col justify-between p-5">
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-3">
          <Badge
            variant="outline"
            className="border-primary/20 bg-primary/5 text-primary"
          >
            {course.category}
          </Badge>

          <span className="text-lg font-bold text-foreground">
            {course.price}
          </span>
        </div>

        <h3 className="text-xl font-bold transition-colors group-hover:text-primary">
          {course.title}
        </h3>

        <p className="text-sm text-muted-foreground">
          By{" "}
          <span className="font-semibold text-foreground">
            {course.instructor}
          </span>
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
          <div className="flex items-center text-yellow-500">
            <Star className="h-4 w-4 fill-current" />
            <span className="ml-1 font-bold">{course.rating}</span>
            <span className="ml-1 font-normal text-muted-foreground">
              ({course.reviews} reviews)
            </span>
          </div>

          <span className="text-muted-foreground">•</span>

          <span className="text-muted-foreground">
            {course.duration}
          </span>

          <span className="text-muted-foreground">•</span>

          <span className="text-muted-foreground">
            {course.level}
          </span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <Button
          className="rounded-lg px-6"
          onClick={() => onAddToCart(course)}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>

        <Button
          variant="outline"
          className="rounded-lg"
          onClick={() =>
            toast.info("Wishlist functionality is not connected yet.")
          }
        >
          Add to Wishlist
        </Button>
      </div>
    </div>
  </motion.div>
);

export default CoursesPage;