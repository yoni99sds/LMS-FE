import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  History,
  User,
  BookOpen,
  BarChart3,
  Trophy,
  Settings,
  LogOut,
  X,
  GraduationCap,
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

const Sidebar = ({ mobile = false, closeMenu }: Props) => {
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
    // Dashboard should ONLY be active on the dashboard page.
    if (path === "/dashboard/student") {
      return location.pathname === "/dashboard/student";
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

  const firstName = user?.firstName || "Student";
  const lastName = user?.lastName || "";

  const fullName = `${firstName} ${lastName}`.trim();

  const initials =
    `${firstName.charAt(0)}${lastName.charAt(0)}`
      .toUpperCase()
      .trim() || "S";

  // =====================================================
  // COMPONENT
  // =====================================================

  return (
    <aside
      className={`
        flex
        flex-col
        w-72
        shrink-0
        h-screen
        bg-background
        border-r
        overflow-hidden

        ${
          mobile
            ? "w-full h-full"
            : "hidden lg:flex lg:sticky lg:top-0"
        }
      `}
    >
      {/* =====================================================
          HEADER / LOGO
      ====================================================== */}

      <div className="flex h-16 shrink-0 items-center justify-between border-b px-5">
        <button
          type="button"
          onClick={() => go("/")}
          className="flex items-center gap-3"
        >
          {/* Logo */}

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <GraduationCap size={22} strokeWidth={2.5} />
          </div>

          {/* Brand */}

          <div className="text-left">
            <h1 className="text-base font-bold leading-tight">
              EduMaster
            </h1>

            <p className="text-[11px] font-medium text-muted-foreground">
              Student Portal
            </p>
          </div>
        </button>

        {/* =====================================================
            MOBILE CLOSE BUTTON
        ====================================================== */}

        {mobile && closeMenu && (
          <button
            type="button"
            onClick={closeMenu}
            className="
              rounded-lg
              p-2
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

      {/* =====================================================
          NAVIGATION
      ====================================================== */}

      <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-5">
        {/* =====================================================
            LEARNING SECTION
        ====================================================== */}

        <div className="mb-3 px-2">
          <p
            className="
              text-[10px]
              font-semibold
              uppercase
              tracking-wider
              text-muted-foreground
            "
          >
            Learning
          </p>
        </div>

        <nav className="space-y-1">
          {/* Dashboard */}

          <NavItem
            icon={
              <LayoutDashboard
                size={19}
                strokeWidth={2}
              />
            }
            label="Dashboard"
            active={isActive("/dashboard/student")}
            onClick={() => go("/dashboard/student")}
          />

          {/* My Courses */}

          <NavItem
            icon={
              <BookOpen
                size={19}
                strokeWidth={2}
              />
            }
            label="My Courses"
            active={isActive("/dashboard/courses")}
            onClick={() => go("/dashboard/courses")}
          />

          {/* Order History */}

          <NavItem
            icon={
              <History
                size={19}
                strokeWidth={2}
              />
            }
            label="Order History"
            active={isActive("/dashboard/orders")}
            onClick={() => go("/dashboard/orders")}
          />

          {/* Progress */}

          <NavItem
            icon={
              <BarChart3
                size={19}
                strokeWidth={2}
              />
            }
            label="Progress"
            active={isActive("/dashboard/progress")}
            onClick={() => go("/dashboard/progress")}
          />

          {/* Certificates */}

          <NavItem
            icon={
              <Trophy
                size={19}
                strokeWidth={2}
              />
            }
            label="Certificates"
            active={isActive("/dashboard/certificates")}
            onClick={() => go("/dashboard/certificates")}
          />
        </nav>

        {/* =====================================================
            ACCOUNT SECTION
        ====================================================== */}

        <div className="mb-3 mt-7 px-2">
          <p
            className="
              text-[10px]
              font-semibold
              uppercase
              tracking-wider
              text-muted-foreground
            "
          >
            Account
          </p>
        </div>

        <nav className="space-y-1">
          {/* Profile */}

          <NavItem
            icon={
              <User
                size={19}
                strokeWidth={2}
              />
            }
            label="Profile"
            active={isActive("/dashboard/profile")}
            onClick={() => go("/dashboard/profile")}
          />

          {/* Settings */}

          <NavItem
            icon={
              <Settings
                size={19}
                strokeWidth={2}
              />
            }
            label="Settings"
            active={isActive("/dashboard/settings")}
            onClick={() => go("/dashboard/settings")}
          />
        </nav>
      </div>

      {/* =====================================================
          STUDENT PROFILE
      ====================================================== */}

      <div className="shrink-0 border-t p-4">
        <div className="rounded-xl border bg-muted/30 p-3">
          {/* User information */}

          <button
            type="button"
            onClick={() => go("/dashboard/profile")}
            className="
              flex
              w-full
              items-center
              gap-3
              rounded-lg
              p-2
              text-left
              transition
              hover:bg-muted
            "
          >
            {/* Avatar */}

            <div
              className="
                relative
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                overflow-hidden
                rounded-full
                bg-primary
                text-sm
                font-bold
                text-primary-foreground
              "
            >
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

            {/* User details */}

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">
                {fullName}
              </p>

              <p className="truncate text-xs text-muted-foreground">
                Student
              </p>
            </div>
          </button>

          {/* Logout */}

          <button
            type="button"
            onClick={handleLogout}
            className="
              mt-2
              flex
              w-full
              items-center
              gap-3
              rounded-lg
              px-2
              py-2
              text-sm
              font-medium
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
        flex
        w-full
        items-center
        gap-3
        rounded-xl
        px-3
        py-2.5
        text-left
        text-sm
        font-medium
        transition-all
        duration-200

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

export default Sidebar;