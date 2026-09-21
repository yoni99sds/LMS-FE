import { motion } from 'framer-motion';
import { ArrowRight, Play, Star, Users, Award, BookOpen, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const stats = [
    { icon: Users, label: 'Students', value: '50K+' },
    { icon: BookOpen, label: 'Courses', value: '1.2K+' },
    { icon: Award, label: 'Certificates', value: '25K+' },
    { icon: Star, label: 'Rating', value: '4.9/5' },
  ];

  const featuredCourses = [
    {
      id: 1,
      title: 'Professional React Development',
      instructor: 'Alex Johnson',
      rating: 4.8,
      reviews: 1240,
      price: '$89.99',
      oldPrice: '$129.99',
      image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/678ea2b5-4cb5-4e95-8f1f-9d90d381aff8/react-course-thumbnail-5f467410-1781888612690.webp',
      badge: 'Best Seller',
    },
    {
      id: 2,
      title: 'Data Science with Python',
      instructor: 'Sarah Miller',
      rating: 4.9,
      reviews: 850,
      price: '$99.99',
      oldPrice: '$149.99',
      image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/678ea2b5-4cb5-4e95-8f1f-9d90d381aff8/data-science-course-thumbnail-b8a3f22c-1781888613832.webp',
      badge: 'Trending',
    },
    {
      id: 3,
      title: 'UI/UX Design Masterclass',
      instructor: 'David Chen',
      rating: 4.7,
      reviews: 620,
      price: '$79.99',
      oldPrice: '$119.99',
      image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/678ea2b5-4cb5-4e95-8f1f-9d90d381aff8/ui-ux-design-course-thumbnail-6f2b3030-1781888612958.webp',
      badge: 'New',
    },
  ];

  return (
    <div className="flex flex-col gap-16 px-2 md:gap-24 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary/5 pt-16 md:pt-24 lg:pt-32 pb-16 md:pb-24">
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="flex flex-col gap-6"
            >
              <motion.div variants={itemVariants}>
                <Badge variant="outline" className="px-3 py-1 text-primary border-primary/20 bg-primary/10">
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Most Trusted LMS Platform
                </Badge>
              </motion.div>
              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight"
              >
                Master New Skills with <span className="text-primary">EduMaster</span> LMS
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="text-lg text-muted-foreground max-w-lg"
              >
                Access world-class education from anywhere. Learn from industry experts and get certified to advance your career.
              </motion.p>
              <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-2">
                <Button size="lg" className="h-12 px-8 rounded-full shadow-lg shadow-primary/20">
                  Start Learning Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="h-12 px-8 rounded-full group">
                  <Play className="mr-2 h-5 w-5 fill-current group-hover:text-primary transition-colors" />
                  Watch Demo
                </Button>
              </motion.div>
              <motion.div variants={itemVariants} className="flex items-center gap-4 pt-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-10 w-10 rounded-full border-2 border-background bg-muted overflow-hidden">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} alt="User" />
                    </div>
                  ))}
                  <div className="h-10 w-10 rounded-full border-2 border-background bg-primary flex items-center justify-center text-[10px] text-primary-foreground font-bold">
                    +10k
                  </div>
                </div>
                <div className="text-sm">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />)}
                    <span className="ml-2 font-bold">4.9/5</span>
                  </div>
                  <p className="text-muted-foreground text-xs">from over 50,000 students</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative hidden lg:block"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-background aspect-[4/3]">
                <img
                  src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/678ea2b5-4cb5-4e95-8f1f-9d90d381aff8/lms-hero-background-5952bacb-1781888612745.webp"
                  alt="LMS Interface"
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent pointer-events-none" />
              </div>
              
              {/* Floating UI Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 bg-background p-4 rounded-xl shadow-xl border hidden xl:block"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Course Completed</p>
                    <p className="text-xs text-muted-foreground">Certified in AI Mastery</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-10 -left-10 bg-background p-5 rounded-xl shadow-xl border hidden xl:block"
              >
                <p className="text-xs font-medium text-muted-foreground mb-2">Student Progress</p>
                <div className="w-40 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="w-3/4 h-full bg-primary" />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-[10px] font-bold">75% Complete</span>
                  <span className="text-[10px] text-muted-foreground">12/16 Lessons</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        {/* Background shapes */}
        <div className="absolute top-0 right-0 -z-0 opacity-10">
           <svg width="600" height="600" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="400" cy="200" r="200" fill="currentColor" className="text-primary" />
              <circle cx="100" cy="500" r="100" fill="currentColor" className="text-accent" />
           </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-background border rounded-3xl p-8 shadow-sm">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-2">
              <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                <stat.icon className="h-6 w-6" />
              </div>
              <p className="text-3xl font-bold tracking-tight">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="container">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-4">Featured Courses</h2>
            <p className="text-muted-foreground max-w-2xl">
              Explore our hand-picked selection of top-rated courses taught by industry professionals.
            </p>
          </div>
          <Button variant="ghost" asChild>
            <Link to="/courses" className="text-primary font-bold">
              View All Courses
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCourses.map((course) => (
            <motion.div
              key={course.id}
              whileHover={{ y: -5 }}
              className="group bg-background border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-background/90 text-foreground backdrop-blur-sm border-none shadow-sm">
                    {course.badge}
                  </Badge>
                </div>
              </div>
              <div className="p-5 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full">Development</span>
                  <span>•</span>
                  <span>12 Weeks</span>
                </div>
                <h3 className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors h-14">
                  {course.title}
                </h3>
                <p className="text-sm text-muted-foreground">By <span className="font-semibold text-foreground">{course.instructor}</span></p>
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex items-center text-yellow-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="ml-1 font-bold">{course.rating}</span>
                  </div>
                  <span className="text-muted-foreground">({course.reviews} reviews)</span>
                </div>
                <div className="mt-2 pt-4 border-t flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-primary">{course.price}</span>
                    <span className="text-sm text-muted-foreground line-through">{course.oldPrice}</span>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-full">Enroll Now</Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mb-12">
        <div className="relative bg-primary rounded-[2rem] overflow-hidden p-8 md:p-16 text-primary-foreground text-center flex flex-col items-center gap-8">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight max-w-3xl leading-tight">
            Ready to Transform Your Future through Learning?
          </h2>
          <p className="text-primary-foreground/80 max-w-xl text-lg">
            Join thousands of students and start your learning journey today. Get unlimited access to all courses with our premium plan.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="secondary" className="h-12 px-8 rounded-full font-bold">
              Join for Free
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 rounded-full border-primary-foreground/20 hover:bg-primary-foreground/10 hover:text-primary-foreground font-bold">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
