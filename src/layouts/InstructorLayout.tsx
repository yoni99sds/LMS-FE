import { Outlet } from "react-router-dom";
import { useState } from "react";

import InstructorSidebar from "@/components/instructor/InstructorSidebar";
import InstructorTopbar from "@/components/instructor/InstructorTopbar";

const InstructorLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-muted/20">

      {/* =====================================================
          DESKTOP SIDEBAR
          Visible only on large screens
      ====================================================== */}
      <div className="hidden lg:block">
        <InstructorSidebar />
      </div>


      {/* =====================================================
          MOBILE SIDEBAR OVERLAY
          Visible only on mobile/tablet
      ====================================================== */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">

          {/* BACKDROP */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeMenu}
          />

          {/* MOBILE SIDEBAR */}
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
            <InstructorSidebar
              mobile
              closeMenu={closeMenu}
            />
          </div>

        </div>
      )}


      {/* =====================================================
          MAIN CONTENT AREA
      ====================================================== */}
      <div className="relative min-h-screen lg:ml-72">

        {/* =================================================
            TOPBAR
        ================================================== */}
        <InstructorTopbar
          openMenu={openMenu}
        />


        {/* =================================================
            PAGE CONTENT
        ================================================== */}
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

export default InstructorLayout;