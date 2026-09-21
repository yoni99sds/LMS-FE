import { motion } from 'framer-motion';
import { Target, Users, Rocket, Globe } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="flex flex-col">
      <section className="bg-primary/5 py-20">
        <div className="container text-center space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight"
          >
            We&apos;re on a Mission to <span className="text-primary">Unlock Human Potential</span>
          </motion.h1>
          <motion.p 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            EduMaster is a global learning platform that provides anyone, anywhere, with access to online courses and degrees from world-class universities and companies.
          </motion.p>
        </div>
      </section>

      <section className="container py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { icon: Target, title: "Our Mission", desc: "To provide universal access to the world's best education." },
          { icon: Users, title: "Global Community", desc: "Joining millions of learners from 190+ countries." },
          { icon: Rocket, title: "Career Growth", desc: "Helping professionals advance their careers with verified skills." },
          { icon: Globe, title: "Universal Access", desc: "Learning anytime, anywhere, on any device." }
        ].map((item, idx) => (
          <div key={idx} className="bg-background border rounded-2xl p-6 text-center space-y-4 hover:shadow-md transition-shadow">
            <div className="mx-auto w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
              <item.icon className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default AboutPage;
