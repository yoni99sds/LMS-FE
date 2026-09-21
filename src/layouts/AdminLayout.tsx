import { Outlet } from "react-router-dom";
import { useState } from "react";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";

const AdminLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-muted/20">
      {/* =========================================
          DESKTOP SIDEBAR
      ========================================= */}

      <div className="hidden lg:block">
        <AdminSidebar />
      </div>

      {/* =========================================
          MOBILE SIDEBAR
      ========================================= */}

      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          {/* BACKDROP */}

          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeMenu}
          />

          {/* SIDEBAR */}

          <div
            className="
              relative
              z-[70]
              h-full
              w-72
              max-w-[85vw]
              bg-background
              shadow-2xl
            "
          >
            <AdminSidebar
              mobile
              closeMenu={closeMenu}
            />
          </div>
        </div>
      )}

      {/* =========================================
          MAIN CONTENT
      ========================================= */}

      <div className="relative min-h-screen lg:ml-72">
        {/* TOPBAR */}

        <AdminTopbar openMenu={openMenu} />

        {/* PAGE CONTENT */}

        <main
          className="
            relative
            z-0
            min-h-screen
            pt-20
            px-4
            pb-8
            sm:px-6
            lg:px-8
          "
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;