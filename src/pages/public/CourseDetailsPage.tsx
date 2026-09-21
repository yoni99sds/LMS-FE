import { useParams, Link } from 'react-router-dom';
import { 
  Star, Users, Clock, Globe, ShieldCheck, PlayCircle, 
  ChevronRight, CheckCircle2, Award, Calendar, Share2, Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const CourseDetailsPage = () => {
  const { id } = useParams();

  // Mock course data
  const course = {
    id: 1,
    title: 'Professional React Development',
    subtitle: 'Master React 19, Redux, and Modern Web Development from Scratch',
    instructor: 'Alex Johnson',
    instructorTitle: 'Senior Software Engineer at Google',
    instructorAvatar: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/678ea2b5-4cb5-4e95-8f1f-9d90d381aff8/instructor-avatar-09daa02c-1781888613090.webp',
    rating: 4.8,
    reviews: 1240,
    students: 15420,
    lastUpdated: 'Jan 2024',
    language: 'English',
    price: '$89.99',
    oldPrice: '$129.99',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/678ea2b5-4cb5-4e95-8f1f-9d90d381aff8/react-course-thumbnail-5f467410-1781888612690.webp',
    learnings: [
      'Build powerful, fast, user-friendly and reactive web apps',
      'Provide amazing user experiences by leveraging the power of JavaScript with ease',
      'Learn all about React Hooks and React Components',
      'Understand how to connect to a backend API',
      'Master state management with Redux Toolkit',
      'Deploy your applications to the cloud'
    ],
    curriculum: [
      {
        title: 'Introduction to React',
        lessons: [
          { title: 'What is React?', duration: '10:00', preview: true },
          { title: 'Setting up the Development Environment', duration: '15:20', preview: true },
          { title: 'Your First React App', duration: '12:45', preview: false }
        ]
      },
      {
        title: 'React Fundamentals',
        lessons: [
          { title: 'JSX and Elements', duration: '18:30', preview: false },
          { title: 'Components and Props', duration: '22:15', preview: false },
          { title: 'State and Lifecycle', duration: '25:00', preview: false }
        ]
      },
      {
        title: 'Advanced Hooks',
        lessons: [
          { title: 'useEffect in Depth', duration: '20:10', preview: false },
          { title: 'useMemo and useCallback', duration: '24:45', preview: false },
          { title: 'Custom Hooks', duration: '19:20', preview: false }
        ]
      }
    ]
  };

  return (
    <div className="flex flex-col">
      {/* Course Header */}
      <section className="bg-slate-900 text-slate-50 py-12">
        <div className="container grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2 text-primary-foreground/80 text-sm">
              <Link to="/courses" className="hover:text-primary transition-colors">Courses</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-primary-foreground font-medium">Web Development</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              {course.title}
            </h1>
            <p className="text-lg md:text-xl text-slate-300">
              {course.subtitle}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-1 text-yellow-400">
                <span className="font-bold">{course.rating}</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
              </div>
              <span className="text-slate-400 underline cursor-pointer">({course.reviews} ratings)</span>
              <span className="text-slate-50 font-medium">{course.students.toLocaleString()} students</span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Created by <span className="text-primary underline cursor-pointer">{course.instructor}</span></span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Last updated {course.lastUpdated}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span>{course.language}</span>
              </div>
            </div>
          </div>

          {/* Sticky Purchase Card (Hidden on mobile) */}
          <div className="hidden lg:block relative z-20">
            <div className="sticky top-24 bg-background border rounded-2xl overflow-hidden shadow-2xl text-foreground">
              <div className="relative aspect-video group cursor-pointer">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <PlayCircle className="h-16 w-16 text-white" />
                </div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white font-bold drop-shadow-md">
                  Preview this course
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">{course.price}</span>
                  <span className="text-lg text-muted-foreground line-through">{course.oldPrice}</span>
                  <span className="text-sm text-green-600 font-bold ml-auto">30% OFF</span>
                </div>
                <div className="space-y-3">
                  <Button className="w-full h-12 text-lg font-bold rounded-xl shadow-lg shadow-primary/20">
                    Add to Cart
                  </Button>
                  <Button variant="outline" className="w-full h-12 text-lg font-bold rounded-xl">
                    Buy Now
                  </Button>
                </div>
                <p className="text-center text-xs text-muted-foreground">30-Day Money-Back Guarantee</p>
                <div className="space-y-4">
                  <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">This course includes:</h4>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center gap-3"><PlayCircle className="h-4 w-4 text-primary" /> 45.5 hours on-demand video</li>
                    <li className="flex items-center gap-3"><Award className="h-4 w-4 text-primary" /> Certificate of completion</li>
                    <li className="flex items-center gap-3"><ShieldCheck className="h-4 w-4 text-primary" /> Full lifetime access</li>
                    <li className="flex items-center gap-3"><Globe className="h-4 w-4 text-primary" /> Access on mobile and TV</li>
                  </ul>
                </div>
                <div className="flex items-center justify-center gap-6 pt-4 border-t">
                  <button className="flex flex-col items-center gap-1 text-xs font-bold hover:text-primary transition-colors">
                    <Share2 className="h-4 w-4" /> Share
                  </button>
                  <button className="flex flex-col items-center gap-1 text-xs font-bold hover:text-primary transition-colors">
                    <Heart className="h-4 w-4" /> Wishlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            {/* Mobile Purchase Card */}
            <div className="lg:hidden bg-background border rounded-2xl overflow-hidden shadow-lg p-6 space-y-6 mb-8">
               <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">{course.price}</span>
                  <span className="text-lg text-muted-foreground line-through">{course.oldPrice}</span>
                </div>
                <Button className="w-full h-12 text-lg font-bold rounded-xl">Enroll Now</Button>
            </div>

            {/* What you'll learn */}
            <div className="bg-muted/30 border rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">What you&apos;ll learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.learnings.map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Course content</h2>
              <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                <div className="flex gap-2">
                   <span>{course.curriculum.length} sections</span>
                   <span>•</span>
                   <span>35 lectures</span>
                   <span>•</span>
                   <span>45h 30m total length</span>
                </div>
                <button className="text-primary font-bold hover:underline">Expand all sections</button>
              </div>
              <Accordion type="multiple" defaultValue={['section-0']} className="border rounded-xl">
                {course.curriculum.map((section, idx) => (
                  <AccordionItem key={idx} value={`section-${idx}`} className={idx === course.curriculum.length - 1 ? 'border-none' : ''}>
                    <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 no-underline hover:no-underline">
                      <span className="font-bold text-left">{section.title}</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4">
                      <ul className="space-y-4 pt-2">
                        {section.lessons.map((lesson, lIdx) => (
                          <li key={lIdx} className="flex items-center gap-3">
                            <PlayCircle className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm flex-1">{lesson.title}</span>
                            {lesson.preview && <span className="text-xs font-bold text-primary underline cursor-pointer">Preview</span>}
                            <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Instructor */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Instructor</h2>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center gap-4 text-center">
                   <div className="h-32 w-32 rounded-full overflow-hidden border-2 border-primary/20">
                     <img src={course.instructorAvatar} alt={course.instructor} className="h-full w-full object-cover" />
                   </div>
                   <div className="space-y-2">
                     <div className="flex items-center justify-center gap-2 text-sm font-bold">
                       <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                       <span>4.9 Instructor Rating</span>
                     </div>
                     <div className="flex items-center justify-center gap-2 text-sm font-bold">
                       <Users className="h-4 w-4 text-primary" />
                       <span>50,230 Students</span>
                     </div>
                   </div>
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-primary underline cursor-pointer hover:no-underline">{course.instructor}</h3>
                    <p className="text-muted-foreground">{course.instructorTitle}</p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Alex is a passionate developer and educator with over 10 years of experience in the software industry. He has worked with top technology companies and has a knack for breaking down complex topics into simple, understandable concepts. His courses have helped thousands of students land their dream jobs.
                  </p>
                  <Button variant="outline">View Instructor Profile</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CourseDetailsPage;
