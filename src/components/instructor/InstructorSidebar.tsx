import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  PlusCircle,
  Users,
  DollarSign,
  Star,
  BarChart3,
  ClipboardList,
  Settings,
  LogOut,
  User,
  X,
} from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { logout } from "@/features/auth/authSlice";

type Props = {
  mobile?: boolean;
  closeMenu?: () => void;
};

type NavItemProps = {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
};

const InstructorSidebar = ({
  mobile = false,
  closeMenu,
}: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);

  // =====================================================
  // NAVIGATION
  // =====================================================

  const go = (path: string) => {
    navigate(path);
    closeMenu?.();
  };

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {
    dispatch(logout());
    closeMenu?.();
    navigate("/");
  };

  // =====================================================
  // ACTIVE ROUTE
  // =====================================================

  const isActive = (path: string) => {
    // Dashboard should ONLY be active on:
    // /instructor/dashboard

    if (path === "/instructor/dashboard") {
      return location.pathname === "/instructor/dashboard";
    }

    // Other sections remain active for nested routes.

    return (
      location.pathname === path ||
      location.pathname.startsWith(`${path}/`)
    );
  };

  // =====================================================
  // USER INFORMATION
  // =====================================================

  const firstName = user?.firstName || "Instructor";
  const lastName = user?.lastName || "";

  const fullName = `${firstName} ${lastName}`.trim();

  const initials =
    `${firstName.charAt(0)}${lastName.charAt(0)}`
      .toUpperCase()
      .trim() || "I";

  // =====================================================
  // COMPONENT
  // =====================================================

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-50
        flex w-72 flex-col
        border-r bg-background
        overflow-hidden
        ${mobile ? "h-full w-full" : ""}
      `}
    >
      {/* =========================
          HEADER / LOGO
      ========================== */}

      <div className="flex h-16 shrink-0 items-center justify-between border-b px-5">
        <button
          type="button"
          onClick={() => go("/")}
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <BookOpen size={22} strokeWidth={2.5} />
          </div>

          <div className="text-left">
            <h1 className="text-base font-bold leading-tight">
              EduMaster
            </h1>

            <p className="text-[11px] font-medium text-muted-foreground">
              Instructor Portal
            </p>
          </div>
        </button>

        {/* Mobile close button */}

        {mobile && closeMenu && (
          <button
            type="button"
            onClick={closeMenu}
            className="
              rounded-lg p-2
              text-muted-foreground
              transition
              hover:bg-muted
              hover:text-foreground
            "
            aria-label="Close menu"
          >
            <X size={21} />
          </button>
        )}
      </div>

      {/* =========================
          NAVIGATION
      ========================== */}

      <div className="flex-1 overflow-y-auto px-4 py-5">
        {/* Main */}

        <div className="mb-3 px-2">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Management
          </p>
        </div>

        <nav className="space-y-1">
          {/* Dashboard */}

          <NavItem
            icon={<LayoutDashboard size={19} strokeWidth={2} />}
            label="Dashboard"
            active={isActive("/instructor/dashboard")}
            onClick={() => go("/instructor/dashboard")}
          />

          {/* My Courses */}

          <NavItem
            icon={<BookOpen size={19} strokeWidth={2} />}
            label="My Courses"
            active={isActive("/instructor/courses")}
            onClick={() => go("/instructor/courses")}
          />

          {/* Create Course */}

          <NavItem
            icon={<PlusCircle size={19} strokeWidth={2} />}
            label="Create Course"
            active={
              location.pathname ===
              "/instructor/courses/create"
            }
            onClick={() =>
              go("/instructor/courses/create")
            }
          />

          {/* Students */}

          <NavItem
            icon={<Users size={19} strokeWidth={2} />}
            label="Students"
            active={isActive("/instructor/students")}
            onClick={() => go("/instructor/students")}
          />

          {/* Assignments */}

          <NavItem
            icon={<ClipboardList size={19} strokeWidth={2} />}
            label="Assignments"
            active={isActive("/instructor/assignments")}
            onClick={() =>
              go("/instructor/assignments")
            }
          />

          {/* Reviews */}

          <NavItem
            icon={<Star size={19} strokeWidth={2} />}
            label="Reviews"
            active={isActive("/instructor/reviews")}
            onClick={() => go("/instructor/reviews")}
          />
        </nav>

        {/* =========================
            INSIGHTS
        ========================== */}

        <div className="mb-3 mt-7 px-2">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Insights
          </p>
        </div>

        <nav className="space-y-1">
          {/* Analytics */}

          <NavItem
            icon={<BarChart3 size={19} strokeWidth={2} />}
            label="Analytics"
            active={isActive("/instructor/analytics")}
            onClick={() =>
              go("/instructor/analytics")
            }
          />

          {/* Revenue */}

          <NavItem
            icon={<DollarSign size={19} strokeWidth={2} />}
            label="Revenue"
            active={isActive("/instructor/revenue")}
            onClick={() =>
              go("/instructor/revenue")
            }
          />
        </nav>

        {/* =========================
            ACCOUNT
        ========================== */}

        <div className="mb-3 mt-7 px-2">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Account
          </p>
        </div>

        <nav className="space-y-1">
          {/* Profile */}

          <NavItem
            icon={<User size={19} strokeWidth={2} />}
            label="Profile"
            active={isActive("/instructor/profile")}
            onClick={() =>
              go("/instructor/profile")
            }
          />

          {/* Settings */}

          <NavItem
            icon={<Settings size={19} strokeWidth={2} />}
            label="Settings"
            active={isActive("/instructor/settings")}
            onClick={() =>
              go("/instructor/settings")
            }
          />
        </nav>
      </div>

      {/* =========================
          INSTRUCTOR PROFILE
      ========================== */}

      <div className="shrink-0 border-t p-4">
        <div className="rounded-xl border bg-muted/30 p-3">
          {/* User information */}

          <button
            type="button"
            onClick={() => go("/instructor/profile")}
            className="
              flex w-full items-center gap-3
              rounded-lg p-2
              text-left
              transition
              hover:bg-muted
            "
          >
            {/* Avatar */}

            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary text-sm font-bold text-primary-foreground">
              {user?.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt={fullName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span>{initials}</span>
              )}
            </div>

            {/* Name */}

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">
                {fullName}
              </p>

              <p className="truncate text-xs text-muted-foreground">
                Instructor
              </p>
            </div>
          </button>

          {/* Logout */}

          <button
            type="button"
            onClick={handleLogout}
            className="
              mt-2
              flex w-full items-center gap-3
              rounded-lg px-2 py-2
              text-sm font-medium
              text-red-500
              transition
              hover:bg-red-500/10
            "
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

// =========================================================
// NAV ITEM
// =========================================================

const NavItem = ({
  icon,
  label,
  active,
  onClick,
}: NavItemProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        group
        flex w-full items-center gap-3
        rounded-xl px-3 py-2.5
        text-left text-sm font-medium
        transition-all duration-200

        ${
          active
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        }
      `}
    >
      <span className="shrink-0">
        {icon}
      </span>

      <span className="truncate">
        {label}
      </span>
    </button>
  );
};

export default InstructorSidebar;