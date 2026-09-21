import { useState } from "react";
import Sidebar from "@/components/student/Sidebar";
import Topbar from "@/components/student/Topbar";

const StudentLayout = ({ children }: any) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">

      {/* DESKTOP SIDEBAR */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* MOBILE SIDEBAR OVERLAY */}
      {open && (
        <div className="fixed inset-0 z-50 flex lg:hidden">

          {/* sidebar panel */}
          <div className="w-72 bg-background shadow-xl z-50">
            <Sidebar mobile closeMenu={() => setOpen(false)} />
          </div>

          {/* overlay */}
          <div
            className="flex-1 bg-black/40"
            onClick={() => setOpen(false)}
          />
        </div>
      )}

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* FIXED TOPBAR */}
        <div className="sticky top-0 z-40 bg-background">
          <Topbar openMenu={() => setOpen(true)} />
        </div>

        {/* SCROLLABLE CONTENT */}
        <main className="flex-1 overflow-y-auto p-6 bg-muted/10 min-w-0">
          {children}
        </main>

      </div>
    </div>
  );
};

export default StudentLayout;