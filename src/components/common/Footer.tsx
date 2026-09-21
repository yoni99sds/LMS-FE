import { Link } from 'react-router-dom';
import { GraduationCap, Globe, Share2, ExternalLink, Link as LinkIcon, Users } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="bg-primary p-1.5 rounded-lg">
                <GraduationCap className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">EduMaster</span>
            </Link>
            <p className="max-w-xs text-sm text-muted-foreground mb-6">
              Empowering learners worldwide with premium educational content and expert instructors. Start your learning journey today.
            </p>
            <div className="flex space-x-4">
              <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Globe className="h-5 w-5" />
              </Link>
              <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Share2 className="h-5 w-5" />
              </Link>
              <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
                <ExternalLink className="h-5 w-5" />
              </Link>
              <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
                <LinkIcon className="h-5 w-5" />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/courses" className="text-muted-foreground hover:text-primary">Browse Courses</Link></li>
              <li><Link to="/pricing" className="text-muted-foreground hover:text-primary">Pricing Plans</Link></li>
              <li><Link to="#" className="text-muted-foreground hover:text-primary">For Business</Link></li>
              <li><Link to="#" className="text-muted-foreground hover:text-primary">Certificates</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-4">Community</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/blog" className="text-muted-foreground hover:text-primary">Learning Blog</Link></li>
              <li><Link to="/faq" className="text-muted-foreground hover:text-primary">Help Center</Link></li>
              <li><Link to="#" className="text-muted-foreground hover:text-primary">Partners</Link></li>
              <li><Link to="#" className="text-muted-foreground hover:text-primary">Affiliates</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-muted-foreground hover:text-primary">About Us</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-primary">Contact Us</Link></li>
              <li><Link to="#" className="text-muted-foreground hover:text-primary">Careers</Link></li>
              <li><Link to="#" className="text-muted-foreground hover:text-primary">Terms & Privacy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} EduMaster LMS. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="#" className="text-xs text-muted-foreground hover:text-primary underline underline-offset-4">Privacy Policy</Link>
            <Link to="#" className="text-xs text-muted-foreground hover:text-primary underline underline-offset-4">Terms of Service</Link>
            <Link to="#" className="text-xs text-muted-foreground hover:text-primary underline underline-offset-4">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
