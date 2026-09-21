import { Mail, Phone, MapPin, MessageSquare, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const ContactPage = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon.");
  };

  return (
    <div className="container py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">Get in Touch</h1>
            <p className="text-muted-foreground text-lg">
              Have questions about our platform or courses? Our team is here to help you.
            </p>
          </div>

          <div className="space-y-6">
            {[
              { icon: MessageSquare, title: "Chat with us", desc: "Our live chat is available 24/7", link: "Start a chat" },
              { icon: Mail, title: "Email us", desc: "support@edumaster.com", link: "Send an email" },
              { icon: Phone, title: "Call us", desc: "+1 (555) 000-0000", link: "Give us a call" },
              { icon: MapPin, title: "Visit us", desc: "123 Education Plaza, San Francisco, CA", link: "Get directions" }
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="h-10 w-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                  <button className="text-xs text-primary font-bold mt-1 hover:underline">{item.link}</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-background border rounded-3xl p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="John" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Doe" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="john@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="How can we help?" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Tell us more about your inquiry..." className="min-h-[150px]" required />
            </div>
            <Button type="submit" className="w-full h-12 rounded-xl text-lg font-bold gap-2">
              <Send className="h-5 w-5" />
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
