
import { useState } from "react";
import { Outlet } from "react-router-dom";

import SubAdminSidebar from "@/components/subadmin/SubAdminSidebar";
import SubAdminTopbar from "@/components/subadmin/SubAdminTopbar";

const SubAdminLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <SubAdminSidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={closeMenu}
            className="absolute inset-0 bg-black/50"
          />

          <div className="absolute inset-y-0 left-0 w-72 max-w-[85vw]">
            <SubAdminSidebar
              mobile
              closeMenu={closeMenu}
            />
          </div>
        </div>
      )}

      <SubAdminTopbar openMenu={() => setMobileMenuOpen(true)} />

      {/* Page content */}
      <main className="min-h-screen min-w-0 pt-16 lg:ml-72">
        <div className="w-full min-w-0 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default SubAdminLayout;
