import { useRef, useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  Check,
  ChevronDown,
  ChevronUp,
  FileText,
  Image as ImageIcon,
  Languages,
  Layers,
  Minus,
  Plus,
  Save,
  Trash2,
  Upload,
  Video,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import InstructorLayout from "@/layouts/InstructorLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

/* =========================================
   TYPES
========================================= */

type Lesson = {
  id: number;
  title: string;
  type: "Video" | "Article";
};

type Section = {
  id: number;
  title: string;
  lessons: Lesson[];
};

/* =========================================
   COMPONENT
========================================= */

const CreateCoursePage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  /* =========================================
     BASIC COURSE STATE
  ========================================= */

  const [courseTitle, setCourseTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");

  const [category, setCategory] = useState("Development");
  const [level, setLevel] = useState("Beginner");

  const [language, setLanguage] = useState("English");
  const [duration, setDuration] = useState("");

  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");

  const [isFree, setIsFree] = useState(false);

  /* =========================================
     THUMBNAIL
  ========================================= */

  const [thumbnail, setThumbnail] = useState<string | null>(null);

  /* =========================================
     REQUIREMENTS
  ========================================= */

  const [requirements, setRequirements] = useState<string[]>([
    "",
  ]);

  /* =========================================
     LEARNING OBJECTIVES
  ========================================= */

  const [objectives, setObjectives] = useState<string[]>([
    "",
  ]);

  /* =========================================
     CURRICULUM
  ========================================= */

  const [sections, setSections] = useState<Section[]>([
    {
      id: 1,
      title: "Introduction",
      lessons: [
        {
          id: 1,
          title: "Welcome to the Course",
          type: "Video",
        },
      ],
    },
  ]);

  const [expandedSections, setExpandedSections] = useState<number[]>([
    1,
  ]);

  /* =========================================
     THUMBNAIL UPLOAD
  ========================================= */

  const handleThumbnailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setThumbnail(imageUrl);
  };

  /* =========================================
     REQUIREMENTS
  ========================================= */

  const addRequirement = () => {
    setRequirements((prev) => [...prev, ""]);
  };

  const removeRequirement = (index: number) => {
    setRequirements((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const updateRequirement = (
    index: number,
    value: string
  ) => {
    setRequirements((prev) =>
      prev.map((item, i) =>
        i === index ? value : item
      )
    );
  };

  /* =========================================
     OBJECTIVES
  ========================================= */

  const addObjective = () => {
    setObjectives((prev) => [...prev, ""]);
  };

  const removeObjective = (index: number) => {
    setObjectives((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const updateObjective = (
    index: number,
    value: string
  ) => {
    setObjectives((prev) =>
      prev.map((item, i) =>
        i === index ? value : item
      )
    );
  };

  /* =========================================
     SECTIONS
  ========================================= */

  const addSection = () => {
    const newSection: Section = {
      id: Date.now(),
      title: `Section ${sections.length + 1}`,
      lessons: [],
    };

    setSections((prev) => [...prev, newSection]);

    setExpandedSections((prev) => [
      ...prev,
      newSection.id,
    ]);
  };

  const removeSection = (sectionId: number) => {
    setSections((prev) =>
      prev.filter((section) => section.id !== sectionId)
    );

    setExpandedSections((prev) =>
      prev.filter((id) => id !== sectionId)
    );
  };

  const updateSectionTitle = (
    sectionId: number,
    title: string
  ) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? { ...section, title }
          : section
      )
    );
  };

  /* =========================================
     LESSONS
  ========================================= */

  const addLesson = (sectionId: number) => {
    setSections((prev) =>
      prev.map((section) => {
        if (section.id !== sectionId) {
          return section;
        }

        const newLesson: Lesson = {
          id: Date.now(),
          title: `Lesson ${section.lessons.length + 1}`,
          type: "Video",
        };

        return {
          ...section,
          lessons: [...section.lessons, newLesson],
        };
      })
    );
  };

  const removeLesson = (
    sectionId: number,
    lessonId: number
  ) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              lessons: section.lessons.filter(
                (lesson) => lesson.id !== lessonId
              ),
            }
          : section
      )
    );
  };

  const updateLessonTitle = (
    sectionId: number,
    lessonId: number,
    title: string
  ) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              lessons: section.lessons.map((lesson) =>
                lesson.id === lessonId
                  ? { ...lesson, title }
                  : lesson
              ),
            }
          : section
      )
    );
  };

  const toggleSection = (sectionId: number) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  /* =========================================
     SAVE / PUBLISH
  ========================================= */

  const handleSaveDraft = () => {
    console.log("Saving course as draft:", {
      courseTitle,
      shortDescription,
      description,
      category,
      level,
      language,
      duration,
      price: isFree ? "Free" : price,
      oldPrice,
      requirements,
      objectives,
      sections,
    });

    alert("Course saved as draft.");
  };

  const handlePublish = () => {
    if (!courseTitle.trim()) {
      alert("Please enter a course title.");
      return;
    }

    if (!description.trim()) {
      alert("Please enter a course description.");
      return;
    }

    console.log("Publishing course:", {
      courseTitle,
      shortDescription,
      description,
      category,
      level,
      language,
      duration,
      price: isFree ? "Free" : price,
      oldPrice,
      requirements,
      objectives,
      sections,
    });

    alert("Course submitted for publication.");
  };

  /* =========================================
     RETURN
  ========================================= */

  return (
    
      <div className="max-w-6xl mx-auto space-y-8 pb-10">

        {/* =====================================
            HEADER
        ===================================== */}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Button
              variant="outline"
              size="icon"
              className="rounded-xl"
              onClick={() =>
                navigate("/instructor/courses")
              }
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>

            <div>
              <h1 className="text-3xl md:text-4xl font-black">
                Create Course
              </h1>

              <p className="text-muted-foreground mt-1">
                Create and publish a new course for your students.
              </p>
            </div>

          </div>

          <div className="flex gap-2">

            <Button
              variant="outline"
              className="rounded-xl"
              onClick={handleSaveDraft}
            >
              <Save className="mr-2 h-4 w-4" />
              Save Draft
            </Button>

            <Button
              className="rounded-xl"
              onClick={handlePublish}
            >
              <Check className="mr-2 h-4 w-4" />
              Publish Course
            </Button>

          </div>

        </div>

        {/* =====================================
            BASIC INFORMATION
        ===================================== */}

        <section className="border rounded-2xl bg-background p-5 md:p-7 space-y-6">

          <SectionHeader
            icon={<BookOpen className="h-5 w-5" />}
            title="Basic Information"
            description="Provide the basic information about your course."
          />

          {/* TITLE */}

          <div className="space-y-2">
            <label className="text-sm font-semibold">
              Course Title
            </label>

            <Input
              value={courseTitle}
              onChange={(e) =>
                setCourseTitle(e.target.value)
              }
              placeholder="e.g. Professional React Development"
              className="h-12 rounded-xl"
            />
          </div>

          {/* SHORT DESCRIPTION */}

          <div className="space-y-2">
            <label className="text-sm font-semibold">
              Short Description
            </label>

            <Textarea
              value={shortDescription}
              onChange={(e) =>
                setShortDescription(e.target.value)
              }
              placeholder="Write a short description that will appear on course cards..."
              className="min-h-[100px] rounded-xl resize-none"
            />
          </div>

          {/* FULL DESCRIPTION */}

          <div className="space-y-2">
            <label className="text-sm font-semibold">
              Course Description
            </label>

            <Textarea
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              placeholder="Describe what students will learn from this course..."
              className="min-h-[180px] rounded-xl resize-none"
            />
          </div>

          {/* CATEGORY / LEVEL */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div className="space-y-2">
              <label className="text-sm font-semibold">
                Category
              </label>

              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                className="w-full h-12 rounded-xl border bg-background px-4 text-sm"
              >
                <option>Development</option>
                <option>Design</option>
                <option>Business</option>
                <option>Marketing</option>
                <option>Data Science</option>
                <option>Photography</option>
                <option>Finance</option>
                <option>Personal Development</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold">
                Level
              </label>

              <select
                value={level}
                onChange={(e) =>
                  setLevel(e.target.value)
                }
                className="w-full h-12 rounded-xl border bg-background px-4 text-sm"
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
                <option>All Levels</option>
              </select>
            </div>

          </div>

        </section>

        {/* =====================================
            THUMBNAIL
        ===================================== */}

        <section className="border rounded-2xl bg-background p-5 md:p-7 space-y-6">

          <SectionHeader
            icon={<ImageIcon className="h-5 w-5" />}
            title="Course Thumbnail"
            description="Upload an attractive image for your course."
          />

          <div className="flex flex-col lg:flex-row gap-6">

            {/* PREVIEW */}

            <div className="w-full lg:w-80 aspect-video rounded-2xl border overflow-hidden bg-muted/30 flex items-center justify-center">

              {thumbnail ? (
                <div className="relative w-full h-full">

                  <img
                    src={thumbnail}
                    alt="Course thumbnail"
                    className="w-full h-full object-cover"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setThumbnail(null)
                    }
                    className="absolute top-3 right-3 h-9 w-9 rounded-full bg-background/90 flex items-center justify-center shadow"
                  >
                    <X className="h-4 w-4" />
                  </button>

                </div>
              ) : (
                <div className="text-center p-6">

                  <ImageIcon className="mx-auto h-10 w-10 text-muted-foreground" />

                  <p className="mt-3 text-sm font-medium">
                    No thumbnail selected
                  </p>

                  <p className="text-xs text-muted-foreground mt-1">
                    Recommended: 1280 × 720
                  </p>

                </div>
              )}

            </div>

            {/* UPLOAD */}

            <div className="flex flex-col justify-center gap-4">

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleThumbnailChange}
              />

              <Button
                type="button"
                variant="outline"
                className="rounded-xl w-fit"
                onClick={() =>
                  fileInputRef.current?.click()
                }
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload Thumbnail
              </Button>

              <p className="text-sm text-muted-foreground max-w-md">
                Use a high-quality image that clearly represents
                your course. JPG, PNG and WebP are recommended.
              </p>

            </div>

          </div>

        </section>

        {/* =====================================
            COURSE DETAILS
        ===================================== */}

        <section className="border rounded-2xl bg-background p-5 md:p-7 space-y-6">

          <SectionHeader
            icon={<Languages className="h-5 w-5" />}
            title="Course Details"
            description="Set the language, duration and pricing."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            {/* LANGUAGE */}

            <div className="space-y-2">
              <label className="text-sm font-semibold">
                Language
              </label>

              <select
                value={language}
                onChange={(e) =>
                  setLanguage(e.target.value)
                }
                className="w-full h-12 rounded-xl border bg-background px-4 text-sm"
              >
                <option>English</option>
                <option>Amharic</option>
                <option>French</option>
                <option>Arabic</option>
                <option>Spanish</option>
              </select>
            </div>

            {/* DURATION */}

            <div className="space-y-2">
              <label className="text-sm font-semibold">
                Duration
              </label>

              <Input
                value={duration}
                onChange={(e) =>
                  setDuration(e.target.value)
                }
                placeholder="e.g. 12 Weeks"
                className="h-12 rounded-xl"
              />
            </div>

            {/* PRICE */}

            <div className="space-y-2">
              <label className="text-sm font-semibold">
                Price
              </label>

              <Input
                type="number"
                disabled={isFree}
                value={price}
                onChange={(e) =>
                  setPrice(e.target.value)
                }
                placeholder="e.g. 89.99"
                className="h-12 rounded-xl"
              />
            </div>

          </div>

          {/* FREE COURSE */}

          <div className="flex items-center gap-3">

            <button
              type="button"
              onClick={() =>
                setIsFree(!isFree)
              }
              className={`h-5 w-5 rounded-md border flex items-center justify-center transition ${
                isFree
                  ? "bg-primary border-primary text-primary-foreground"
                  : "bg-background"
              }`}
            >
              {isFree && (
                <Check className="h-3.5 w-3.5" />
              )}
            </button>

            <span className="text-sm font-medium">
              This is a free course
            </span>

          </div>

          {/* OLD PRICE */}

          {!isFree && (
            <div className="max-w-md space-y-2">
              <label className="text-sm font-semibold">
                Original Price
              </label>

              <Input
                type="number"
                value={oldPrice}
                onChange={(e) =>
                  setOldPrice(e.target.value)
                }
                placeholder="e.g. 129.99"
                className="h-12 rounded-xl"
              />

              <p className="text-xs text-muted-foreground">
                Optional. Use this to show a discounted price.
              </p>
            </div>
          )}

        </section>

        {/* =====================================
            REQUIREMENTS
        ===================================== */}

        <section className="border rounded-2xl bg-background p-5 md:p-7 space-y-6">

          <SectionHeader
            icon={<FileText className="h-5 w-5" />}
            title="Requirements"
            description="Tell students what they should know before taking this course."
          />

          <div className="space-y-3">

            {requirements.map((requirement, index) => (

              <div
                key={index}
                className="flex gap-2"
              >

                <Input
                  value={requirement}
                  onChange={(e) =>
                    updateRequirement(
                      index,
                      e.target.value
                    )
                  }
                  placeholder={`Requirement ${index + 1}`}
                  className="h-11 rounded-xl"
                />

                {requirements.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="rounded-xl shrink-0 text-red-500"
                    onClick={() =>
                      removeRequirement(index)
                    }
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                )}

              </div>

            ))}

          </div>

          <Button
            type="button"
            variant="outline"
            className="rounded-xl"
            onClick={addRequirement}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Requirement
          </Button>

        </section>

        {/* =====================================
            LEARNING OBJECTIVES
        ===================================== */}

        <section className="border rounded-2xl bg-background p-5 md:p-7 space-y-6">

          <SectionHeader
            icon={<Check className="h-5 w-5" />}
            title="Learning Objectives"
            description="What will students be able to do after completing this course?"
          />

          <div className="space-y-3">

            {objectives.map((objective, index) => (

              <div
                key={index}
                className="flex gap-2"
              >

                <Input
                  value={objective}
                  onChange={(e) =>
                    updateObjective(
                      index,
                      e.target.value
                    )
                  }
                  placeholder={`Learning objective ${index + 1}`}
                  className="h-11 rounded-xl"
                />

                {objectives.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="rounded-xl shrink-0 text-red-500"
                    onClick={() =>
                      removeObjective(index)
                    }
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                )}

              </div>

            ))}

          </div>

          <Button
            type="button"
            variant="outline"
            className="rounded-xl"
            onClick={addObjective}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Objective
          </Button>

        </section>

        {/* =====================================
            CURRICULUM
        ===================================== */}

        <section className="border rounded-2xl bg-background p-5 md:p-7 space-y-6">

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

            <SectionHeader
              icon={<Layers className="h-5 w-5" />}
              title="Course Curriculum"
              description="Organize your course into sections and lessons."
            />

            <Button
              type="button"
              variant="outline"
              className="rounded-xl shrink-0"
              onClick={addSection}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Section
            </Button>

          </div>

          {/* SECTIONS */}

          <div className="space-y-4">

            {sections.map((section, sectionIndex) => {

              const isExpanded =
                expandedSections.includes(section.id);

              return (
                <div
                  key={section.id}
                  className="border rounded-2xl overflow-hidden"
                >

                  {/* SECTION HEADER */}

                  <div className="bg-muted/30 p-4">

                    <div className="flex items-center gap-3">

                      <button
                        type="button"
                        onClick={() =>
                          toggleSection(section.id)
                        }
                        className="h-9 w-9 rounded-lg hover:bg-background flex items-center justify-center shrink-0"
                      >
                        {isExpanded ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </button>

                      <div className="flex-1">

                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary">
                            Section {sectionIndex + 1}
                          </Badge>

                          <span className="text-xs text-muted-foreground">
                            {section.lessons.length}{" "}
                            {section.lessons.length === 1
                              ? "lesson"
                              : "lessons"}
                          </span>
                        </div>

                        <Input
                          value={section.title}
                          onChange={(e) =>
                            updateSectionTitle(
                              section.id,
                              e.target.value
                            )
                          }
                          className="h-10 rounded-lg bg-background"
                        />

                      </div>

                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-600 shrink-0"
                        onClick={() =>
                          removeSection(section.id)
                        }
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>

                    </div>

                  </div>

                  {/* LESSONS */}

                  {isExpanded && (
                    <div className="p-4 space-y-3">

                      {section.lessons.length === 0 && (
                        <div className="border border-dashed rounded-xl p-6 text-center">

                          <BookOpen className="mx-auto h-8 w-8 text-muted-foreground/50" />

                          <p className="mt-2 text-sm text-muted-foreground">
                            No lessons in this section yet.
                          </p>

                        </div>
                      )}

                      {section.lessons.map(
                        (lesson, lessonIndex) => (

                          <div
                            key={lesson.id}
                            className="flex items-center gap-3 border rounded-xl p-3"
                          >

                            <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                              {lesson.type === "Video" ? (
                                <Video className="h-4 w-4" />
                              ) : (
                                <FileText className="h-4 w-4" />
                              )}
                            </div>

                            <div className="flex-1 min-w-0">

                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs text-muted-foreground">
                                  Lesson {lessonIndex + 1}
                                </span>

                                <Badge
                                  variant="outline"
                                  className="text-[10px]"
                                >
                                  {lesson.type}
                                </Badge>
                              </div>

                              <Input
                                value={lesson.title}
                                onChange={(e) =>
                                  updateLessonTitle(
                                    section.id,
                                    lesson.id,
                                    e.target.value
                                  )
                                }
                                className="h-9 rounded-lg"
                              />

                            </div>

                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="text-red-500 shrink-0"
                              onClick={() =>
                                removeLesson(
                                  section.id,
                                  lesson.id
                                )
                              }
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>

                          </div>

                        )
                      )}

                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="rounded-xl"
                        onClick={() =>
                          addLesson(section.id)
                        }
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Lesson
                      </Button>

                    </div>
                  )}

                </div>
              );
            })}

          </div>

        </section>

        {/* =====================================
            BOTTOM ACTIONS
        ===================================== */}

        <div className="border rounded-2xl bg-background p-5 flex flex-col sm:flex-row items-center justify-between gap-4">

          <div>
            <p className="font-semibold">
              Ready to publish?
            </p>

            <p className="text-sm text-muted-foreground">
              You can save this course as a draft and publish it later.
            </p>
          </div>

          <div className="flex gap-3 w-full sm:w-auto">

            <Button
              variant="outline"
              className="rounded-xl flex-1 sm:flex-none"
              onClick={handleSaveDraft}
            >
              <Save className="mr-2 h-4 w-4" />
              Save Draft
            </Button>

            <Button
              className="rounded-xl flex-1 sm:flex-none"
              onClick={handlePublish}
            >
              <Check className="mr-2 h-4 w-4" />
              Publish Course
            </Button>

          </div>

        </div>

      </div>
  
  );
};

/* =========================================
   SECTION HEADER
========================================= */

type SectionHeaderProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const SectionHeader = ({
  icon,
  title,
  description,
}: SectionHeaderProps) => {
  return (
    <div className="flex items-start gap-3">

      <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
        {icon}
      </div>

      <div>
        <h2 className="text-xl font-bold">
          {title}
        </h2>

        <p className="text-sm text-muted-foreground mt-1">
          {description}
        </p>
      </div>

    </div>
  );
};

export default CreateCoursePage;