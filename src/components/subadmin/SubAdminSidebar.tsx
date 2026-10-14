
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
  LogOut,
  GraduationCap,
  X,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { logout } from "@/features/auth/authSlice";
import {
  SUBADMIN_PERMISSIONS,
  hasPermission,
} from "@/config/subAdminPermissions";

type Props = {
  mobile?: boolean;
  closeMenu?: () => void;
};

type NavigationItem = {
  label: string;
  path: string;
  icon: typeof LayoutDashboard;
  permission?: string;
};

const navigationItems: NavigationItem[] = [
  {
    label: "Dashboard",
    path: "/sub-admin/dashboard",
    icon: LayoutDashboard,
    permission: SUBADMIN_PERMISSIONS.DASHBOARD_VIEW,
  },
  {
    label: "Students",
    path: "/sub-admin/students",
    icon: Users,
    permission: SUBADMIN_PERMISSIONS.STUDENTS_VIEW,
  },
  {
    label: "Instructors",
    path: "/sub-admin/instructors",
    icon: UserCog,
    permission: SUBADMIN_PERMISSIONS.INSTRUCTORS_VIEW,
  },
  {
    label: "Courses",
    path: "/sub-admin/courses",
    icon: BookOpen,
    permission: SUBADMIN_PERMISSIONS.COURSES_VIEW,
  },
  {
    label: "Categories",
    path: "/sub-admin/categories",
    icon: FolderTree,
    permission: SUBADMIN_PERMISSIONS.CATEGORIES_VIEW,
  },
  {
    label: "Orders",
    path: "/sub-admin/orders",
    icon: ShoppingCart,
    permission: SUBADMIN_PERMISSIONS.ORDERS_VIEW,
  },
  {
    label: "Payments",
    path: "/sub-admin/payments",
    icon: CreditCard,
    permission: SUBADMIN_PERMISSIONS.PAYMENTS_VIEW,
  },
  {
    label: "Reviews",
    path: "/sub-admin/reviews",
    icon: Star,
    permission: SUBADMIN_PERMISSIONS.REVIEWS_VIEW,
  },
  {
    label: "Assignments",
    path: "/sub-admin/assignments",
    icon: ClipboardList,
    permission: SUBADMIN_PERMISSIONS.ASSIGNMENTS_VIEW,
  },
  {
    label: "Reports",
    path: "/sub-admin/reports",
    icon: FileBarChart,
    permission: SUBADMIN_PERMISSIONS.REPORTS_VIEW,
  },
  {
    label: "Analytics",
    path: "/sub-admin/analytics",
    icon: BarChart3,
    permission: SUBADMIN_PERMISSIONS.ANALYTICS_VIEW,
  },
];

const SubAdminSidebar = ({
  mobile = false,
  closeMenu,
}: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const firstName = user?.firstName || user?.name?.split(" ")[0] || "Sub Admin";
  const lastName =
    user?.lastName ||
    user?.name?.split(" ").slice(1).join(" ") ||
    "";

  const initials =
    `${firstName.charAt(0)}${lastName.charAt(0)}`
      .toUpperCase()
      .trim() || "S";

  const permissions = user?.permissions;

  const visibleItems = navigationItems.filter((item) =>
    item.permission
      ? hasPermission(permissions, item.permission)
      : true,
  );

  const accountItems: NavigationItem[] = [
    {
      label: "Profile",
      path: "/sub-admin/profile",
      icon: User,
      permission: SUBADMIN_PERMISSIONS.PROFILE_VIEW,
    },
  ];

  const handleLogout = () => {
    dispatch(logout());

    if (mobile) {
      closeMenu?.();
    }

    navigate("/", { replace: true });
  };

  const renderNavItem = (item: NavigationItem) => {
    const Icon = item.icon;

    return (
      <NavLink
        key={item.path}
        to={item.path}
        end={item.path === "/sub-admin/dashboard"}
        onClick={() => {
          if (mobile) closeMenu?.();
        }}
        className={({ isActive }) =>
          `group flex items-center gap-3 rounded-xl px-3 py-2.5
          text-sm font-medium transition-all duration-200
          ${
            isActive
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          }`
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
      className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col
      border-r bg-background ${
        mobile ? "h-full shadow-xl" : ""
      }`}
    >
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center justify-between border-b px-5">
        <button
          type="button"
          onClick={() => {
            navigate("/sub-admin/dashboard");
            if (mobile) closeMenu?.();
          }}
          className="flex min-w-0 items-center gap-3"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <GraduationCap size={22} strokeWidth={2.5} />
          </div>

          <div className="min-w-0 text-left">
            <h1 className="text-base font-bold leading-tight">
              EduMaster
            </h1>
            <p className="text-[11px] font-medium text-muted-foreground">
              Sub Admin Portal
            </p>
          </div>
        </button>

        {mobile && closeMenu && (
          <button
            type="button"
            onClick={closeMenu}
            className="rounded-lg p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground"
            aria-label="Close menu"
          >
            <X size={21} />
          </button>
        )}
      </div>

      {/* Profile */}
      <div className="border-b px-4 py-4">
        <button
          type="button"
          onClick={() => {
            navigate("/sub-admin/profile");
            if (mobile) closeMenu?.();
          }}
          className="flex w-full items-center gap-3 rounded-xl p-2 text-left transition hover:bg-muted"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary text-sm font-bold text-primary-foreground">
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
              Sub Administrator
            </p>
          </div>
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-4 py-5">
        <div className="mb-3 px-2">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Management
          </p>
        </div>

        <nav className="space-y-1">
          {visibleItems.map(renderNavItem)}
        </nav>

        {accountItems.some((item) =>
          hasPermission(permissions, item.permission || ""),
        ) && (
          <>
            <div className="mb-3 mt-7 px-2">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Account
              </p>
            </div>

            <nav className="space-y-1">
              {accountItems
                .filter((item) =>
                  hasPermission(permissions, item.permission || ""),
                )
                .map(renderNavItem)}
            </nav>
          </>
        )}
      </div>

      {/* Logout */}
      <div className="shrink-0 border-t p-4">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-500 transition hover:bg-red-500/10"
        >
          <LogOut size={19} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default SubAdminSidebar;
