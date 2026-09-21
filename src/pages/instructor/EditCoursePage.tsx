import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InstructorLayout from "@/layouts/InstructorLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Save,
  Image as ImageIcon,
  Upload,
  Plus,
  Trash2,
  GripVertical,
} from "lucide-react";

type Lesson = {
  id: number;
  title: string;
  duration: string;
};

const EditCoursePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  /*
   * Temporary course data.
   *
   * Later this should come from your backend using the course ID:
   * GET /api/courses/:id
   */
  const [courseTitle, setCourseTitle] = useState(
    "Professional React Development"
  );

  const [description, setDescription] = useState(
    "Master React from beginner to advanced level and build modern production-ready applications."
  );

  const [category, setCategory] = useState("Development");

  const [price, setPrice] = useState("89.99");

  const [oldPrice, setOldPrice] = useState("129.99");

  const [level, setLevel] = useState("Intermediate");

  const [duration, setDuration] = useState("12 Weeks");

  const [thumbnail, setThumbnail] = useState(
    "https://storage.googleapis.com/dala-prod-public-storage/generated-images/678ea2b5-4cb5-4e95-8f1f-9d90d381aff8/react-course-thumbnail-5f467410-1781888612690.webp"
  );

  const [lessons, setLessons] = useState<Lesson[]>([
    {
      id: 1,
      title: "Introduction to React",
      duration: "15 min",
    },
    {
      id: 2,
      title: "React Components",
      duration: "25 min",
    },
    {
      id: 3,
      title: "Props and State",
      duration: "30 min",
    },
    {
      id: 4,
      title: "React Hooks",
      duration: "35 min",
    },
  ]);

  const handleAddLesson = () => {
    const newLesson: Lesson = {
      id: Date.now(),
      title: `New Lesson ${lessons.length + 1}`,
      duration: "10 min",
    };

    setLessons([...lessons, newLesson]);
  };

  const handleRemoveLesson = (lessonId: number) => {
    setLessons(lessons.filter((lesson) => lesson.id !== lessonId));
  };

  const handleLessonChange = (
    lessonId: number,
    field: keyof Lesson,
    value: string
  ) => {
    setLessons(
      lessons.map((lesson) =>
        lesson.id === lessonId
          ? {
              ...lesson,
              [field]: value,
            }
          : lesson
      )
    );
  };

  const handleSave = () => {
    /*
     * Later connect this to your backend:
     *
     * PUT /api/courses/:id
     *
     * Example payload:
     *
     * {
     *   title: courseTitle,
     *   description,
     *   category,
     *   price,
     *   oldPrice,
     *   level,
     *   duration,
     *   thumbnail,
     *   lessons
     * }
     */

    console.log("Updating course:", {
      id,
      courseTitle,
      description,
      category,
      price,
      oldPrice,
      level,
      duration,
      thumbnail,
      lessons,
    });

    navigate("/instructor/courses");
  };

  return (
    <InstructorLayout>
      <div className="space-y-8 pb-10">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              className="rounded-xl"
              onClick={() => navigate("/instructor/courses")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>

            <div>
              <h1 className="text-3xl md:text-4xl font-black">
                Edit Course
              </h1>

              <p className="text-muted-foreground mt-1">
                Update your course information and content.
              </p>
            </div>
          </div>

          <Button
            onClick={handleSave}
            className="rounded-xl px-6"
          >
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>

        {/* COURSE INFORMATION */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

          {/* LEFT */}
          <div className="xl:col-span-2 space-y-8">

            {/* BASIC INFORMATION */}
            <div className="border rounded-2xl bg-background p-6 space-y-6">

              <div>
                <h2 className="text-xl font-bold">
                  Course Information
                </h2>

                <p className="text-sm text-muted-foreground mt-1">
                  Update the basic information about your course.
                </p>
              </div>

              {/* TITLE */}
              <div className="space-y-2">
                <label className="text-sm font-semibold">
                  Course Title
                </label>

                <Input
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                  placeholder="Enter course title"
                  className="h-12 rounded-xl"
                />
              </div>

              {/* DESCRIPTION */}
              <div className="space-y-2">
                <label className="text-sm font-semibold">
                  Description
                </label>

                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your course..."
                  className="min-h-[160px] rounded-xl resize-none"
                />
              </div>

              {/* CATEGORY + LEVEL */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div className="space-y-2">
                  <label className="text-sm font-semibold">
                    Category
                  </label>

                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full h-12 rounded-xl border bg-background px-4 text-sm"
                  >
                    <option>Development</option>
                    <option>Design</option>
                    <option>Business</option>
                    <option>Marketing</option>
                    <option>Data Science</option>
                    <option>Photography</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold">
                    Level
                  </label>

                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="w-full h-12 rounded-xl border bg-background px-4 text-sm"
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                    <option>All Levels</option>
                  </select>
                </div>

              </div>

              {/* DURATION */}
              <div className="space-y-2">
                <label className="text-sm font-semibold">
                  Duration
                </label>

                <Input
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="e.g. 12 Weeks"
                  className="h-12 rounded-xl"
                />
              </div>

            </div>

            {/* PRICING */}
            <div className="border rounded-2xl bg-background p-6 space-y-6">

              <div>
                <h2 className="text-xl font-bold">
                  Pricing
                </h2>

                <p className="text-sm text-muted-foreground mt-1">
                  Set the price and optional original price.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div className="space-y-2">
                  <label className="text-sm font-semibold">
                    Current Price
                  </label>

                  <Input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="89.99"
                    className="h-12 rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold">
                    Original Price
                  </label>

                  <Input
                    type="number"
                    value={oldPrice}
                    onChange={(e) => setOldPrice(e.target.value)}
                    placeholder="129.99"
                    className="h-12 rounded-xl"
                  />
                </div>

              </div>

              <div className="flex items-center gap-3">
                <Badge className="bg-primary/10 text-primary hover:bg-primary/10">
                  Current Price
                </Badge>

                <span className="text-2xl font-black text-primary">
                  ${price}
                </span>

                {oldPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    ${oldPrice}
                  </span>
                )}
              </div>

            </div>

            {/* LESSONS */}
            <div className="border rounded-2xl bg-background p-6 space-y-6">

              <div className="flex items-center justify-between gap-4">

                <div>
                  <h2 className="text-xl font-bold">
                    Course Content
                  </h2>

                  <p className="text-sm text-muted-foreground mt-1">
                    Manage your lessons and course structure.
                  </p>
                </div>

                <Button
                  variant="outline"
                  className="rounded-xl"
                  onClick={handleAddLesson}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Lesson
                </Button>

              </div>

              <div className="space-y-3">

                {lessons.map((lesson, index) => (
                  <div
                    key={lesson.id}
                    className="flex items-center gap-3 border rounded-xl p-3 hover:bg-muted/30 transition"
                  >

                    <GripVertical className="h-5 w-5 text-muted-foreground shrink-0" />

                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm font-bold shrink-0">
                      {index + 1}
                    </div>

                    <Input
                      value={lesson.title}
                      onChange={(e) =>
                        handleLessonChange(
                          lesson.id,
                          "title",
                          e.target.value
                        )
                      }
                      className="flex-1 rounded-lg"
                    />

                    <Input
                      value={lesson.duration}
                      onChange={(e) =>
                        handleLessonChange(
                          lesson.id,
                          "duration",
                          e.target.value
                        )
                      }
                      className="w-24 rounded-lg"
                    />

                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      onClick={() =>
                        handleRemoveLesson(lesson.id)
                      }
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>

                  </div>
                ))}

                {lessons.length === 0 && (
                  <div className="border border-dashed rounded-xl p-10 text-center">
                    <BookOpenIcon />

                    <p className="font-semibold mt-3">
                      No lessons yet
                    </p>

                    <p className="text-sm text-muted-foreground mt-1">
                      Add your first lesson to this course.
                    </p>

                    <Button
                      variant="outline"
                      className="mt-4 rounded-xl"
                      onClick={handleAddLesson}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Lesson
                    </Button>
                  </div>
                )}

              </div>

            </div>

          </div>

          {/* RIGHT */}
          <div className="space-y-8">

            {/* THUMBNAIL */}
            <div className="border rounded-2xl bg-background p-6 space-y-5">

              <div>
                <h2 className="text-xl font-bold">
                  Course Thumbnail
                </h2>

                <p className="text-sm text-muted-foreground mt-1">
                  Update the image shown on your course card.
                </p>
              </div>

              <div className="relative aspect-video rounded-xl overflow-hidden border bg-muted">

                <img
                  src={thumbnail}
                  alt={courseTitle}
                  className="w-full h-full object-cover"
                />

              </div>

              <Input
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                placeholder="Image URL"
                className="rounded-xl"
              />

              <Button
                variant="outline"
                className="w-full rounded-xl"
              >
                <Upload className="mr-2 h-4 w-4" />
                Change Thumbnail
              </Button>

            </div>

            {/* PREVIEW */}
            <div className="border rounded-2xl bg-background p-6 space-y-5">

              <div>
                <h2 className="text-xl font-bold">
                  Course Preview
                </h2>

                <p className="text-sm text-muted-foreground mt-1">
                  Preview how your course appears to students.
                </p>
              </div>

              <div className="border rounded-xl overflow-hidden shadow-sm">

                <div className="aspect-video overflow-hidden">
                  <img
                    src={thumbnail}
                    alt={courseTitle}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-4 space-y-3">

                  <Badge className="bg-primary/10 text-primary hover:bg-primary/10">
                    {category}
                  </Badge>

                  <h3 className="font-bold text-lg line-clamp-2">
                    {courseTitle}
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    {level} • {duration}
                  </p>

                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-black text-primary">
                      ${price}
                    </span>

                    {oldPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ${oldPrice}
                      </span>
                    )}
                  </div>

                </div>

              </div>

            </div>

            {/* SAVE */}
            <Button
              onClick={handleSave}
              className="w-full h-12 rounded-xl text-base font-bold"
            >
              <Save className="mr-2 h-5 w-5" />
              Save Changes
            </Button>

          </div>

        </div>

      </div>
    </InstructorLayout>
  );
};

/*
 * Small empty-state icon component.
 * Kept here so we don't need another import.
 */
const BookOpenIcon = () => (
  <div className="mx-auto w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
    <ImageIcon className="h-6 w-6" />
  </div>
);

export default EditCoursePage;