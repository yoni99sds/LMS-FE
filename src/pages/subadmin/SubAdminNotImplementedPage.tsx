
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, Construction } from "lucide-react";
import { Button } from "@/components/ui/button";

const pageNames: Record<string, string> = {
  students: "Students",
  instructors: "Instructors",
  courses: "Courses",
  categories: "Categories",
  orders: "Orders",
  payments: "Payments",
  reviews: "Reviews",
  assignments: "Assignments",
  reports: "Reports",
  analytics: "Analytics",
  profile: "Profile",
};

const SubAdminNotImplementedPage = () => {
  const location = useLocation();
  const section = location.pathname.split("/").filter(Boolean).pop() || "";
  const title =
    pageNames[section] ||
    section.charAt(0).toUpperCase() + section.slice(1);

  return (
    <section className="mx-auto max-w-3xl rounded-2xl border bg-card p-6 sm:p-8">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Construction size={24} />
      </div>

      <p className="text-sm font-medium text-muted-foreground">
        Sub Admin Portal
      </p>

      <h1 className="mt-2 text-2xl font-bold">{title}</h1>

      <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
        This section is ready to be connected to its page components,
        permission checks, and backend API. No sample records are being
        displayed.
      </p>

      <Button asChild className="mt-6">
        <Link to="/sub-admin/dashboard">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
      </Button>
    </section>
  );
};

export default SubAdminNotImplementedPage;
