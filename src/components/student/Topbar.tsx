import {
  Menu,
  Search,
  ShoppingCart,
  Bell,
  User,
  BookOpen,
  ShoppingBag,
  Settings,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { logout } from "@/features/auth/authSlice";

type Props = {
  openMenu: () => void;
};

const Topbar = ({ openMenu }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);

  const [profileOpen, setProfileOpen] = useState(false);

  const firstName = user?.firstName || "Student";
  const lastName = user?.lastName || "";
  const fullName = `${firstName} ${lastName}`.trim();

  const initials =
    `${firstName.charAt(0)}${lastName.charAt(0)}`
      .toUpperCase()
      .trim() || "S";

  const handleNavigation = (path: string) => {
    setProfileOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    setProfileOpen(false);
    dispatch(logout());
    navigate("/");
  };

  return (
    <header
      className="
        fixed top-0 right-0 left-0 lg:left-72 z-40 h-16
        border-b border-border
        bg-background/70 backdrop-blur-xl
        supports-[backdrop-filter]:bg-background/60
      "
    >
      <div className="flex h-full items-center justify-between px-4 sm:px-6">
        {/* LEFT SIDE */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu */}
          <button
            type="button"
            onClick={openMenu}
            className="
              flex h-10 w-10 items-center justify-center
              rounded-xl text-muted-foreground
              transition hover:bg-muted hover:text-foreground
              lg:hidden
            "
            aria-label="Open student menu"
          >
            <Menu size={23} />
          </button>

          {/* Mobile Branding */}
          <div className="lg:hidden">
            <p className="text-sm font-bold leading-tight">EduMaster</p>
            <p className="text-[10px] text-muted-foreground">
              Student Portal
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Search */}
          <div
            className="
              hidden md:flex h-10 w-64 lg:w-72
              items-center gap-2 rounded-xl
              border border-border bg-background/50 px-3
              transition
              focus-within:border-primary
              focus-within:ring-2
              focus-within:ring-primary/10
            "
          >
            <Search
              size={17}
              className="shrink-0 text-muted-foreground"
            />

            <input
              type="text"
              placeholder="Search courses..."
              className="
                w-full bg-transparent
                text-sm outline-none
                placeholder:text-muted-foreground
              "
            />
          </div>

          {/* Shopping Cart */}
          <button
            type="button"
            onClick={() => navigate("/dashboard/orders")}
            className="
              relative flex h-10 w-10
              items-center justify-center
              rounded-xl text-muted-foreground
              transition hover:bg-muted
              hover:text-foreground
            "
            aria-label="Shopping cart"
          >
            <ShoppingCart size={19} />

            <span
              className="
                absolute right-1.5 top-1.5
                h-2 w-2 rounded-full
                bg-red-500
              "
            />
          </button>

          {/* Notifications */}
          <button
            type="button"
            className="
              relative flex h-10 w-10
              items-center justify-center
              rounded-xl text-muted-foreground
              transition hover:bg-muted
              hover:text-foreground
            "
            aria-label="Notifications"
          >
            <Bell size={19} />

            <span
              className="
                absolute right-1.5 top-1.5
                h-2 w-2 rounded-full
                bg-primary
              "
            />
          </button>

          {/* PROFILE DROPDOWN */}
          <div className="relative ml-1">
            {/* Profile Picture */}
            <button
              type="button"
              onClick={() => setProfileOpen((current) => !current)}
              className="
                flex h-10 w-10 shrink-0
                items-center justify-center
                overflow-hidden rounded-full
                border-2 border-primary
                bg-primary
                text-sm font-bold
                text-primary-foreground
                transition hover:opacity-90
              "
              aria-label={`Open profile menu for ${fullName}`}
              aria-expanded={profileOpen}
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
            </button>

            {/* Dropdown */}
            {profileOpen && (
              <div
                className="
                  absolute right-0 top-12 z-50
                  w-64 overflow-hidden
                  rounded-2xl border border-border
                  bg-background
                  shadow-xl
                  animate-in fade-in-0 zoom-in-95
                  duration-150
                "
              >
                {/* User Info */}
                <div className="border-b border-border px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="
                        flex h-11 w-11 shrink-0
                        items-center justify-center
                        overflow-hidden rounded-full
                        bg-primary
                        text-sm font-bold
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
                        initials
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">
                        {fullName}
                      </p>

                      <p className="truncate text-xs text-muted-foreground">
                        {user?.email || "Student"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="p-2">
                  {/* Profile */}
                  <button
                    type="button"
                    onClick={() => handleNavigation("/dashboard/profile")}
                    className="
                      flex w-full items-center gap-3
                      rounded-xl px-3 py-2.5
                      text-sm font-medium
                      text-foreground
                      transition hover:bg-muted
                    "
                  >
                    <User
                      size={18}
                      className="text-muted-foreground"
                    />
                    <span>My Profile</span>
                  </button>

                  {/* My Courses */}
                  <button
                    type="button"
                    onClick={() =>
                      handleNavigation("/dashboard/courses")
                    }
                    className="
                      flex w-full items-center gap-3
                      rounded-xl px-3 py-2.5
                      text-sm font-medium
                      text-foreground
                      transition hover:bg-muted
                    "
                  >
                    <BookOpen
                      size={18}
                      className="text-muted-foreground"
                    />
                    <span>My Courses</span>
                  </button>

                  {/* Orders */}
                  <button
                    type="button"
                    onClick={() =>
                      handleNavigation("/dashboard/orders")
                    }
                    className="
                      flex w-full items-center gap-3
                      rounded-xl px-3 py-2.5
                      text-sm font-medium
                      text-foreground
                      transition hover:bg-muted
                    "
                  >
                    <ShoppingBag
                      size={18}
                      className="text-muted-foreground"
                    />
                    <span>My Orders</span>
                  </button>

                  {/* Settings */}
                  <button
                    type="button"
                    onClick={() =>
                      handleNavigation("/dashboard/settings")
                    }
                    className="
                      flex w-full items-center gap-3
                      rounded-xl px-3 py-2.5
                      text-sm font-medium
                      text-foreground
                      transition hover:bg-muted
                    "
                  >
                    <Settings
                      size={18}
                      className="text-muted-foreground"
                    />
                    <span>Settings</span>
                  </button>
                </div>

                {/* Logout */}
                <div className="border-t border-border p-2">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="
                      flex w-full items-center gap-3
                      rounded-xl px-3 py-2.5
                      text-sm font-medium
                      text-red-500
                      transition hover:bg-red-500/10
                    "
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;

