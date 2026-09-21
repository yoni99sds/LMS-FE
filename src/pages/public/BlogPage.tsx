import { ArrowRight, Clock, User, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BlogPage = () => {
  const posts = [
    {
      title: "How to stay motivated while learning online",
      excerpt: "Online learning can be challenging. Here are our top tips for staying focused and achieving your goals.",
      author: "Emma Watson",
      date: "Oct 24, 2023",
      time: "5 min read",
      category: "Learning Tips",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60"
    },
    {
      title: "The future of AI in modern education",
      excerpt: "Artificial intelligence is transforming how we teach and learn. Explore the latest trends in edtech.",
      author: "James Miller",
      date: "Oct 20, 2023",
      time: "8 min read",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=60"
    },
    {
      title: "Landing your first dev job: A complete guide",
      excerpt: "From building your portfolio to acing the technical interview, we cover everything you need to know.",
      author: "Alex Johnson",
      date: "Oct 15, 2023",
      time: "12 min read",
      category: "Career",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=60"
    }
  ];

  return (
    <div className="container py-20 px-12 space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Learning Hub</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Explore the latest insights, tips, and news from the world of online education.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post, idx) => (
          <article key={idx} className="group flex flex-col border rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all">
            <div className="aspect-[16/9] overflow-hidden">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-6 flex flex-col flex-1 gap-4">
              <span className="text-primary text-xs font-bold uppercase tracking-wider">{post.category}</span>
              <h3 className="text-xl font-bold group-hover:text-primary transition-colors leading-tight">
                {post.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-3">
                {post.excerpt}
              </p>
              <div className="mt-auto pt-4 border-t flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="h-3 w-3" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{post.time}</span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
      
      <div className="flex justify-center">
        <Button variant="outline" size="lg" className="rounded-full">Load More Posts</Button>
      </div>
    </div>
  );
};

export default BlogPage;
