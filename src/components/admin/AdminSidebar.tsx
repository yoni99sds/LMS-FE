import {
  LayoutDashboard,
  Users,
  UserCog,
  BookOpen,
  FolderTree,
  ShoppingCart,
  CreditCard,
  Star,
  ClipboardList,
  FileBarChart,
  BarChart3,
  User,
  Settings,
  LogOut,
  GraduationCap,
  X,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { logout } from "@/features/auth/authSlice";

type Props = {
  mobile?: boolean;
  closeMenu?: () => void;
};

const AdminSidebar = ({ mobile = false, closeMenu }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);

  const firstName = user?.firstName || "Admin";
  const lastName = user?.lastName || "";

  const initials =
    `${firstName.charAt(0)}${lastName.charAt(0)}`
      .toUpperCase()
      .trim() || "A";

  const navigationItems = [
    {
      label: "Dashboard",
      path: "/admin/",
      icon: LayoutDashboard,
    },
    {
      label: "Users",
      path: "/admin/users",
      icon: Users,
    },
    {
      label: "Instructors",
      path: "/admin/instructors",
      icon: UserCog,
    },
    {
      label: "Courses",
      path: "/admin/courses",
      icon: BookOpen,
    },
    {
      label: "Categories",
      path: "/admin/categories",
      icon: FolderTree,
    },
    {
      label: "Orders",
      path: "/admin/orders",
      icon: ShoppingCart,
    },
    {
      label: "Payments",
      path: "/admin/payments",
      icon: CreditCard,
    },
    {
      label: "Reviews",
      path: "/admin/reviews",
      icon: Star,
    },
    {
      label: "Assignments",
      path: "/admin/assignments",
      icon: ClipboardList,
    },
    {
      label: "Reports",
      path: "/admin/reports",
      icon: FileBarChart,
    },
    {
      label: "Analytics",
      path: "/admin/analytics",
      icon: BarChart3,
    },
  ];

  const accountItems = [
    {
      label: "Profile",
      path: "/admin/profile",
      icon: User,
    },
    {
      label: "Settings",
      path: "/admin/settings",
      icon: Settings,
    },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);

    if (mobile && closeMenu) {
      closeMenu();
    }
  };

  const handleLogout = () => {
    dispatch(logout());

    if (mobile && closeMenu) {
      closeMenu();
    }

    navigate("/");
  };

  const renderNavItem = (
    item: {
      label: string;
      path: string;
      icon: React.ElementType;
    },
    index?: number
  ) => {
    const Icon = item.icon;

    return (
      <NavLink
        key={`${item.path}-${index ?? item.label}`}
        to={item.path}
        onClick={() => {
          if (mobile && closeMenu) {
            closeMenu();
          }
        }}
        className={({ isActive }) =>
          `
          group flex items-center gap-3 rounded-xl px-3 py-2.5
          text-sm font-medium transition-all duration-200
          ${
            isActive
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          }
          `
        }
      >
        {({ isActive }) => (
          <>
            <Icon
              size={19}
              strokeWidth={isActive ? 2.4 : 2}
              className="shrink-0"
            />

            <span className="truncate">{item.label}</span>
          </>
        )}
      </NavLink>
    );
  };

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-50
        flex w-72 flex-col
        border-r bg-background
        ${mobile ? "h-full" : ""}
      `}
    >
      {/* =========================
          HEADER / LOGO
      ========================== */}
      <div className="flex h-16 shrink-0 items-center justify-between border-b px-5">
        <button
          type="button"
          onClick={() => handleNavigation("/admin/dashboard")}
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <GraduationCap size={22} strokeWidth={2.5} />
          </div>

          <div className="text-left">
            <h1 className="text-base font-bold leading-tight">
              EduMaster
            </h1>

            <p className="text-[11px] font-medium text-muted-foreground">
              Administration
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
          ADMIN PROFILE
      ========================== */}
      <div className="border-b px-4 py-4">
        <button
          type="button"
          onClick={() => handleNavigation("/admin/profile")}
          className="
            flex w-full items-center gap-3 rounded-xl
            p-2 text-left
            transition hover:bg-muted
          "
        >
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary text-sm font-bold text-primary-foreground">
            {user?.profilePicture ? (
              <img
                src={user.profilePicture}
                alt={`${firstName} ${lastName}`}
                className="h-full w-full object-cover"
              />
            ) : (
              initials
            )}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">
              {firstName} {lastName}
            </p>

            <p className="truncate text-xs text-muted-foreground">
              Administrator
            </p>
          </div>
        </button>
      </div>

      {/* =========================
          NAVIGATION
      ========================== */}
      <div className="flex-1 overflow-y-auto px-4 py-5">
        <div className="mb-3 px-2">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Management
          </p>
        </div>

        <nav className="space-y-1">
          {navigationItems.map((item, index) =>
            renderNavItem(item, index)
          )}
        </nav>

        {/* Account */}
        <div className="mb-3 mt-7 px-2">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Account
          </p>
        </div>

        <nav className="space-y-1">
          {accountItems.map((item, index) =>
            renderNavItem(item, index)
          )}
        </nav>
      </div>

      {/* =========================
          LOGOUT
      ========================== */}
      <div className="shrink-0 border-t p-4">
        <button
          type="button"
          onClick={handleLogout}
          className="
            flex w-full items-center gap-3
            rounded-xl px-3 py-2.5
            text-sm font-medium
            text-red-500
            transition
            hover:bg-red-500/10
          "
        >
          <LogOut size={19} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;