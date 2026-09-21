import { useState } from 'react';
import { Search, Filter, SlidersHorizontal, Grid, List, ChevronDown, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { motion, AnimatePresence } from 'framer-motion';

const CoursesPage = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  
  const categories = [
    'Web Development', 'Mobile Development', 'Data Science', 
    'UI/UX Design', 'Business', 'Marketing', 'Photography', 'Music'
  ];

  const courses = [
    {
      id: 1,
      title: 'Professional React Development',
      instructor: 'Alex Johnson',
      category: 'Web Development',
      rating: 4.8,
      reviews: 1240,
      price: '$89.99',
      image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/678ea2b5-4cb5-4e95-8f1f-9d90d381aff8/react-course-thumbnail-5f467410-1781888612690.webp',
      level: 'Advanced',
      duration: '45h 30m',
    },
    {
      id: 2,
      title: 'Data Science with Python',
      instructor: 'Sarah Miller',
      category: 'Data Science',
      rating: 4.9,
      reviews: 850,
      price: '$99.99',
      image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/678ea2b5-4cb5-4e95-8f1f-9d90d381aff8/data-science-course-thumbnail-b8a3f22c-1781888613832.webp',
      level: 'Intermediate',
      duration: '38h 15m',
    },
    {
      id: 3,
      title: 'UI/UX Design Masterclass',
      instructor: 'David Chen',
      category: 'UI/UX Design',
      rating: 4.7,
      reviews: 620,
      price: '$79.99',
      image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/678ea2b5-4cb5-4e95-8f1f-9d90d381aff8/ui-ux-design-course-thumbnail-6f2b3030-1781888612958.webp',
      level: 'Beginner',
      duration: '25h 00m',
    },
    // Add more mock courses to show pagination/scroll
    {
      id: 4,
      title: 'Advanced Machine Learning',
      instructor: 'Dr. Michael Smith',
      category: 'Data Science',
      rating: 4.6,
      reviews: 420,
      price: '$129.99',
      image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/678ea2b5-4cb5-4e95-8f1f-9d90d381aff8/data-science-course-thumbnail-b8a3f22c-1781888613832.webp',
      level: 'Advanced',
      duration: '52h 20m',
    },
    {
      id: 5,
      title: 'Flutter Mobile App Development',
      instructor: 'Elena Rodriguez',
      category: 'Mobile Development',
      rating: 4.8,
      reviews: 310,
      price: '$84.99',
      image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/678ea2b5-4cb5-4e95-8f1f-9d90d381aff8/react-course-thumbnail-5f467410-1781888612690.webp',
      level: 'Intermediate',
      duration: '32h 45m',
    },
    {
      id: 6,
      title: 'Business Strategy 101',
      instructor: 'Robert Wilson',
      category: 'Business',
      rating: 4.5,
      reviews: 150,
      price: '$69.99',
      image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/678ea2b5-4cb5-4e95-8f1f-9d90d381aff8/ui-ux-design-course-thumbnail-6f2b3030-1781888612958.webp',
      level: 'Beginner',
      duration: '15h 10m',
    },
  ];

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container py-20 px-4 md:py-20">
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Browse Courses</h1>
          <p className="text-muted-foreground">
            Choose from {courses.length} online video courses with new additions published every month.
          </p>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-muted/30 p-4 rounded-xl border">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses, instructors..."
              className="pl-10 bg-background"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  Sort By: Relevance
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Newest First</DropdownMenuItem>
                <DropdownMenuItem>Highest Rated</DropdownMenuItem>
                <DropdownMenuItem>Price: Low to High</DropdownMenuItem>
                <DropdownMenuItem>Price: High to Low</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Separator orientation="vertical" className="h-8 hidden md:block" />

            <div className="flex border rounded-lg bg-background p-1">
              <Button
                variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                size="icon"
                className="h-8 w-8 rounded-md"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                size="icon"
                className="h-8 w-8 rounded-md"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <aside className="hidden lg:flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h3 className="font-bold flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </h3>
              <Separator />
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <h4 className="text-sm font-semibold">Categories</h4>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <div key={cat} className="flex items-center space-x-2">
                      <Checkbox id={cat} />
                      <Label htmlFor={cat} className="text-sm font-medium leading-none cursor-pointer">
                        {cat}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-semibold">Ratings</h4>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center space-x-2">
                      <Checkbox id={`rating-${rating}`} />
                      <Label htmlFor={`rating-${rating}`} className="flex items-center gap-1 text-sm font-medium leading-none cursor-pointer">
                        <div className="flex text-yellow-500">
                          {Array.from({ length: rating }).map((_, i) => (
                            <Star key={i} className="h-3 w-3 fill-current" />
                          ))}
                          {Array.from({ length: 5 - rating }).map((_, i) => (
                            <Star key={i} className="h-3 w-3 text-muted" />
                          ))}
                        </div>
                        <span>{rating}.0 & Up</span>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-semibold">Level</h4>
                <div className="space-y-2">
                  {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                    <div key={level} className="flex items-center space-x-2">
                      <Checkbox id={level} />
                      <Label htmlFor={level} className="text-sm font-medium leading-none cursor-pointer">
                        {level}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-semibold">Price</h4>
                <div className="space-y-2">
                  {['Free', 'Paid'].map((price) => (
                    <div key={price} className="flex items-center space-x-2">
                      <Checkbox id={price} />
                      <Label htmlFor={price} className="text-sm font-medium leading-none cursor-pointer">
                        {price}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <Button variant="outline" className="w-full">Clear All Filters</Button>
          </aside>

          {/* Course Grid/List */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="popLayout">
              {viewMode === 'grid' ? (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                >
                  {filteredCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
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
                    <CourseListItem key={course.id} course={course} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
            
            {filteredCourses.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
                <div className="bg-muted p-6 rounded-full">
                  <Search className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold">No courses found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filters to find what you're looking for.</p>
                <Button onClick={() => setSearchQuery('')}>Clear Search</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const CourseCard = ({ course }: { course: any }) => (
  <motion.div
    layout
    whileHover={{ y: -5 }}
    className="group bg-background border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all"
  >
    <div className="relative aspect-video overflow-hidden">
      <img
        src={course.image}
        alt={course.title}
        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute bottom-2 left-2">
        <Badge className="bg-background/90 text-foreground backdrop-blur-sm border-none shadow-sm">
          {course.level}
        </Badge>
      </div>
    </div>
    <div className="p-4 flex flex-col gap-2">
      <div className="text-xs font-semibold text-primary">{course.category}</div>
      <h3 className="text-base font-bold line-clamp-2 h-12 group-hover:text-primary transition-colors">
        {course.title}
      </h3>
      <p className="text-xs text-muted-foreground font-medium">By {course.instructor}</p>
      <div className="flex items-center gap-2 text-xs">
        <div className="flex items-center text-yellow-500">
          <Star className="h-3.5 w-3.5 fill-current" />
          <span className="ml-1 font-bold">{course.rating}</span>
        </div>
        <span className="text-muted-foreground">({course.reviews})</span>
        <span className="text-muted-foreground">•</span>
        <span className="text-muted-foreground">{course.duration}</span>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-lg font-bold text-foreground">{course.price}</span>
        <Button size="sm" variant="outline" className="h-8 rounded-lg">Details</Button>
      </div>
    </div>
  </motion.div>
);

const CourseListItem = ({ course }: { course: any }) => (
  <motion.div
    layout
    className="group flex flex-col md:flex-row bg-background border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all"
  >
    <div className="relative w-full md:w-64 aspect-video md:aspect-auto overflow-hidden">
      <img
        src={course.image}
        alt={course.title}
        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
      />
    </div>
    <div className="flex-1 p-5 flex flex-col justify-between">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5">
            {course.category}
          </Badge>
          <span className="text-lg font-bold text-foreground">{course.price}</span>
        </div>
        <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
          {course.title}
        </h3>
        <p className="text-sm text-muted-foreground">By <span className="font-semibold text-foreground">{course.instructor}</span></p>
        <div className="flex items-center gap-4 text-sm mt-2">
          <div className="flex items-center text-yellow-500">
            <Star className="h-4 w-4 fill-current" />
            <span className="ml-1 font-bold">{course.rating}</span>
            <span className="text-muted-foreground ml-1 font-normal">({course.reviews} reviews)</span>
          </div>
          <span className="text-muted-foreground">•</span>
          <span className="text-muted-foreground">{course.duration}</span>
          <span className="text-muted-foreground">•</span>
          <span className="text-muted-foreground">{course.level}</span>
        </div>
      </div>
      <div className="flex gap-3 mt-4">
        <Button className="rounded-lg px-8">Enroll Now</Button>
        <Button variant="outline" className="rounded-lg">Add to Wishlist</Button>
      </div>
    </div>
  </motion.div>
);

export default CoursesPage;
