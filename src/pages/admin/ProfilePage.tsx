import {
  Activity,
  BadgeCheck,
  CalendarDays,
  Camera,
  CheckCircle2,
  Clock,
  Edit3,
  KeyRound,
  Lock,
  Mail,
  MapPin,
  Phone,
  Save,
  Shield,
  User,
  UserCog,
  X,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

interface AdminProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  location: string;
  bio: string;
  avatar: string;
}

interface SecuritySettings {
  twoFactorEnabled: boolean;
  loginNotifications: boolean;
  emailNotifications: boolean;
}

interface ActivityItem {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  type: "login" | "course" | "user" | "security";
}

const initialProfile: AdminProfile = {
  firstName: "Admin",
  lastName: "User",
  email: "admin@lms.com",
  phone: "+251 911 000 000",
  role: "Super Administrator",
  department: "Administration",
  location: "Addis Ababa, Ethiopia",
  bio: "System administrator responsible for managing the LMS platform, users, courses, instructors, and platform configuration.",
  avatar: "",
};

const initialSecurity: SecuritySettings = {
  twoFactorEnabled: false,
  loginNotifications: true,
  emailNotifications: true,
};

const recentActivity: ActivityItem[] = [
  {
    id: "ACT-001",
    title: "Signed in to the platform",
    description:
      "Successful administrator login from Chrome on Windows.",
    date: "2026-09-17",
    time: "09:42 AM",
    type: "login",
  },
  {
    id: "ACT-002",
    title: "Created a new course",
    description:
      "Created the course Full-Stack Web Development.",
    date: "2026-09-16",
    time: "04:25 PM",
    type: "course",
  },
  {
    id: "ACT-003",
    title: "Added a new instructor",
    description:
      "Instructor account was created and credentials were issued.",
    date: "2026-09-16",
    time: "11:18 AM",
    type: "user",
  },
  {
    id: "ACT-004",
    title: "Updated security settings",
    description:
      "Administrator security preferences were updated.",
    date: "2026-09-15",
    time: "02:36 PM",
    type: "security",
  },
  {
    id: "ACT-005",
    title: "Signed in to the platform",
    description:
      "Successful administrator login from Chrome on Windows.",
    date: "2026-09-15",
    time: "08:51 AM",
    type: "login",
  },
];

const ProfilePage = () => {
  const [profile, setProfile] =
    useState<AdminProfile>(initialProfile);

  const [security, setSecurity] =
    useState<SecuritySettings>(initialSecurity);

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [showPasswordForm, setShowPasswordForm] =
    useState(false);

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const updateProfile = (
    field: keyof AdminProfile,
    value: string
  ) => {
    setProfile((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const updateSecurity = (
    field: keyof SecuritySettings,
    value: boolean
  ) => {
    setSecurity((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSaveProfile = async () => {
    if (!profile.firstName.trim()) {
      toast.error("First name is required.");
      return;
    }

    if (!profile.lastName.trim()) {
      toast.error("Last name is required.");
      return;
    }

    if (!profile.email.trim()) {
      toast.error("Email address is required.");
      return;
    }

    setIsSaving(true);

    try {
      /*
       * Backend API will be connected here later.
       *
       * Example:
       *
       * await adminProfileService.updateProfile(profile);
       */

      await new Promise((resolve) =>
        setTimeout(resolve, 700)
      );

      setIsEditing(false);

      toast.success("Profile updated successfully.");
    } catch (error) {
      console.error("Failed to update profile:", error);

      toast.error("Failed to update profile.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setProfile(initialProfile);
    setIsEditing(false);
  };

  const handleChangePassword = async () => {
    if (!passwordForm.currentPassword) {
      toast.error("Enter your current password.");
      return;
    }

    if (!passwordForm.newPassword) {
      toast.error("Enter a new password.");
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      toast.error(
        "New password must contain at least 8 characters."
      );
      return;
    }

    if (
      passwordForm.newPassword !==
      passwordForm.confirmPassword
    ) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      /*
       * Backend API will be connected here later.
       *
       * Example:
       *
       * await authService.changePassword({
       *   currentPassword: passwordForm.currentPassword,
       *   newPassword: passwordForm.newPassword,
       * });
       */

      await new Promise((resolve) =>
        setTimeout(resolve, 700)
      );

      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setShowPasswordForm(false);

      toast.success("Password changed successfully.");
    } catch (error) {
      console.error("Failed to change password:", error);

      toast.error("Failed to change password.");
    }
  };

  const getActivityIcon = (type: ActivityItem["type"]) => {
    switch (type) {
      case "login":
        return (
          <CheckCircle2 className="h-4 w-4 text-green-600" />
        );

      case "course":
        return (
          <BookOpenIcon className="h-4 w-4 text-primary" />
        );

      case "user":
        return (
          <UserCog className="h-4 w-4 text-blue-600" />
        );

      case "security":
        return (
          <Shield className="h-4 w-4 text-orange-600" />
        );

      default:
        return (
          <Activity className="h-4 w-4 text-muted-foreground" />
        );
    }
  };

  const initials =
    `${profile.firstName.charAt(0)}${profile.lastName.charAt(
      0
    )}`.toUpperCase();

  return (
    <div className="space-y-6">
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4" />

            <span>Administration</span>

            <span>/</span>

            <span>Profile</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            My Profile
          </h1>

          <p className="mt-1 text-muted-foreground">
            Manage your administrator profile and account security.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {!isEditing ? (
            <Button
              onClick={() => setIsEditing(true)}
            >
              <Edit3 className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={handleCancelEdit}
                disabled={isSaving}
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>

              <Button
                onClick={handleSaveProfile}
                disabled={isSaving}
              >
                <Save className="mr-2 h-4 w-4" />

                {isSaving
                  ? "Saving..."
                  : "Save Changes"}
              </Button>
            </>
          )}
        </div>
      </div>

      {/* =====================================================
          PROFILE HERO
      ===================================================== */}

      <Card className="overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-primary/20 via-primary/10 to-background" />

        <CardContent className="relative p-6">
          <div className="-mt-20 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              {/* Avatar */}
              <div className="relative">
                <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-2xl border-4 border-background bg-primary/10 text-3xl font-bold text-primary shadow-sm">
                  {profile.avatar ? (
                    <img
                      src={profile.avatar}
                      alt={`${profile.firstName} ${profile.lastName}`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    initials
                  )}
                </div>

                {isEditing && (
                  <button
                    type="button"
                    className="absolute bottom-1 right-1 flex h-9 w-9 items-center justify-center rounded-full border-2 border-background bg-primary text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
                    onClick={() =>
                      toast.info(
                        "Profile image upload will be connected to the backend later."
                      )
                    }
                  >
                    <Camera className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Profile Identity */}
              <div className="pb-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-2xl font-bold">
                    {profile.firstName} {profile.lastName}
                  </h2>

                  <span className="inline-flex items-center gap-1 rounded-full border border-green-500/20 bg-green-500/10 px-2.5 py-1 text-xs font-medium text-green-600">
                    <BadgeCheck className="h-3.5 w-3.5" />
                    Active
                  </span>
                </div>

                <p className="mt-1 text-muted-foreground">
                  {profile.role}
                </p>

                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Mail className="h-3.5 w-3.5" />
                    {profile.email}
                  </span>

                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {profile.location}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pb-1">
              <div className="rounded-xl bg-muted/50 px-4 py-3 text-center">
                <p className="text-lg font-bold">
                  Admin
                </p>

                <p className="text-xs text-muted-foreground">
                  Account Type
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* =====================================================
          ACCOUNT STATISTICS
      ===================================================== */}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Courses Managed
                </p>

                <p className="mt-1 text-2xl font-bold">
                  24
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <BookOpenIcon className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Users Managed
                </p>

                <p className="mt-1 text-2xl font-bold">
                  1,248
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600">
                <User className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Account Age
                </p>

                <p className="mt-1 text-2xl font-bold">
                  2.4 yrs
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600">
                <CalendarDays className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Last Login
                </p>

                <p className="mt-1 text-2xl font-bold">
                  Today
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-500/10 text-green-600">
                <Clock className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        {/* ===================================================
            LEFT COLUMN
        =================================================== */}

        <div className="space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader className="border-b">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <User className="h-5 w-5" />
                </div>

                <div>
                  <CardTitle>
                    Personal Information
                  </CardTitle>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Your personal and professional information.
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6 p-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    First Name
                  </label>

                  <Input
                    value={profile.firstName}
                    disabled={!isEditing}
                    onChange={(event) =>
                      updateProfile(
                        "firstName",
                        event.target.value
                      )
                    }
                    placeholder="First name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Last Name
                  </label>

                  <Input
                    value={profile.lastName}
                    disabled={!isEditing}
                    onChange={(event) =>
                      updateProfile(
                        "lastName",
                        event.target.value
                      )
                    }
                    placeholder="Last name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    Email Address
                  </label>

                  <Input
                    type="email"
                    value={profile.email}
                    disabled={!isEditing}
                    onChange={(event) =>
                      updateProfile(
                        "email",
                        event.target.value
                      )
                    }
                    placeholder="Email address"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    Phone Number
                  </label>

                  <Input
                    value={profile.phone}
                    disabled={!isEditing}
                    onChange={(event) =>
                      updateProfile(
                        "phone",
                        event.target.value
                      )
                    }
                    placeholder="Phone number"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Role
                  </label>

                  <Input
                    value={profile.role}
                    disabled
                    className="bg-muted/40"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Department
                  </label>

                  <Input
                    value={profile.department}
                    disabled={!isEditing}
                    onChange={(event) =>
                      updateProfile(
                        "department",
                        event.target.value
                      )
                    }
                    placeholder="Department"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="flex items-center gap-2 text-sm font-medium">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    Location
                  </label>

                  <Input
                    value={profile.location}
                    disabled={!isEditing}
                    onChange={(event) =>
                      updateProfile(
                        "location",
                        event.target.value
                      )
                    }
                    placeholder="City, Country"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  About
                </label>

                <Textarea
                  value={profile.bio}
                  disabled={!isEditing}
                  onChange={(event) =>
                    updateProfile(
                      "bio",
                      event.target.value
                    )
                  }
                  placeholder="Tell us about yourself"
                  rows={5}
                />

                <p className="text-xs text-muted-foreground">
                  A short description about your role and
                  responsibilities.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Account Information */}
          <Card>
            <CardHeader className="border-b">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600">
                  <Shield className="h-5 w-5" />
                </div>

                <div>
                  <CardTitle>
                    Account Information
                  </CardTitle>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Important information about your administrator
                    account.
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="divide-y p-0">
              <InfoRow
                icon={User}
                label="Account ID"
                value="ADM-1001"
              />

              <InfoRow
                icon={Shield}
                label="Account Role"
                value="Super Administrator"
              />

              <InfoRow
                icon={CalendarDays}
                label="Created"
                value="January 15, 2024"
              />

              <InfoRow
                icon={Clock}
                label="Last Login"
                value="September 17, 2026 at 09:42 AM"
              />

              <InfoRow
                icon={CheckCircle2}
                label="Account Status"
                value="Active"
                valueClassName="text-green-600"
              />
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader className="border-b">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600">
                  <Activity className="h-5 w-5" />
                </div>

                <div>
                  <CardTitle>
                    Recent Activity
                  </CardTitle>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Your recent administrator activity.
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              <div className="divide-y">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex gap-4 p-5"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
                      {getActivityIcon(activity.type)}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                        <p className="font-medium">
                          {activity.title}
                        </p>

                        <span className="text-xs text-muted-foreground">
                          {activity.date} · {activity.time}
                        </span>
                      </div>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {activity.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ===================================================
            RIGHT COLUMN
        =================================================== */}

        <div className="space-y-6">
          {/* Security */}
          <Card>
            <CardHeader className="border-b">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-600">
                  <Shield className="h-5 w-5" />
                </div>

                <div>
                  <CardTitle>
                    Security
                  </CardTitle>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Protect your administrator account.
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="divide-y p-0">
              <SecurityToggle
                title="Two-Factor Authentication"
                description="Add an extra layer of security."
                checked={
                  security.twoFactorEnabled
                }
                onCheckedChange={(value) =>
                  updateSecurity(
                    "twoFactorEnabled",
                    value
                  )
                }
              />

              <SecurityToggle
                title="Login Notifications"
                description="Receive alerts for new logins."
                checked={
                  security.loginNotifications
                }
                onCheckedChange={(value) =>
                  updateSecurity(
                    "loginNotifications",
                    value
                  )
                }
              />

              <SecurityToggle
                title="Email Notifications"
                description="Receive account-related emails."
                checked={
                  security.emailNotifications
                }
                onCheckedChange={(value) =>
                  updateSecurity(
                    "emailNotifications",
                    value
                  )
                }
              />
            </CardContent>
          </Card>

          {/* Password */}
          <Card>
            <CardHeader className="border-b">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600">
                  <KeyRound className="h-5 w-5" />
                </div>

                <div>
                  <CardTitle>
                    Password
                  </CardTitle>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Manage your account password.
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-5">
              {!showPasswordForm ? (
                <div>
                  <div className="rounded-xl bg-muted/40 p-4">
                    <div className="flex items-start gap-3">
                      <Lock className="mt-0.5 h-5 w-5 text-muted-foreground" />

                      <div>
                        <p className="font-medium">
                          Password protected
                        </p>

                        <p className="mt-1 text-sm text-muted-foreground">
                          Change your password regularly to keep your
                          account secure.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="mt-4 w-full"
                    onClick={() =>
                      setShowPasswordForm(true)
                    }
                  >
                    <KeyRound className="mr-2 h-4 w-4" />
                    Change Password
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Current Password
                    </label>

                    <Input
                      type="password"
                      value={
                        passwordForm.currentPassword
                      }
                      onChange={(event) =>
                        setPasswordForm(
                          (previous) => ({
                            ...previous,
                            currentPassword:
                              event.target.value,
                          })
                        )
                      }
                      placeholder="Enter current password"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      New Password
                    </label>

                    <Input
                      type="password"
                      value={
                        passwordForm.newPassword
                      }
                      onChange={(event) =>
                        setPasswordForm(
                          (previous) => ({
                            ...previous,
                            newPassword:
                              event.target.value,
                          })
                        )
                      }
                      placeholder="Enter new password"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Confirm New Password
                    </label>

                    <Input
                      type="password"
                      value={
                        passwordForm.confirmPassword
                      }
                      onChange={(event) =>
                        setPasswordForm(
                          (previous) => ({
                            ...previous,
                            confirmPassword:
                              event.target.value,
                          })
                        )
                      }
                      placeholder="Confirm new password"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button
                      className="flex-1"
                      onClick={handleChangePassword}
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Update Password
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowPasswordForm(false);

                        setPasswordForm({
                          currentPassword: "",
                          newPassword: "",
                          confirmPassword: "",
                        });
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Role & Permissions */}
          <Card>
            <CardHeader className="border-b">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <UserCog className="h-5 w-5" />
                </div>

                <div>
                  <CardTitle>
                    Role & Permissions
                  </CardTitle>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Your current platform permissions.
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-3 p-5">
              <PermissionItem
                label="Manage Users"
              />

              <PermissionItem
                label="Manage Instructors"
              />

              <PermissionItem
                label="Manage Courses"
              />

              <PermissionItem
                label="Manage Categories"
              />

              <PermissionItem
                label="Manage Reviews"
              />

              <PermissionItem
                label="View Reports"
              />

              <PermissionItem
                label="Manage Platform Settings"
              />
            </CardContent>
          </Card>

          {/* Account Security Status */}
          <Card className="border-green-500/20 bg-green-500/5">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-500/10 text-green-600">
                  <Shield className="h-5 w-5" />
                </div>

                <div>
                  <p className="font-semibold">
                    Account Security
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Your account is currently protected by your
                    password and login notification settings.
                  </p>

                  {!security.twoFactorEnabled && (
                    <button
                      type="button"
                      className="mt-3 text-sm font-medium text-primary hover:underline"
                      onClick={() =>
                        updateSecurity(
                          "twoFactorEnabled",
                          true
                        )
                      }
                    >
                      Enable two-factor authentication
                    </button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* =====================================================
          DEVELOPMENT NOTE
      ===================================================== */}

      <div className="rounded-xl border border-dashed bg-muted/20 p-4">
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">
            Development note:
          </strong>{" "}
          Profile information, password changes, security
          preferences, avatar uploads, activity history, and
          permissions are currently using placeholder data. These
          will be connected to the authentication and administrator
          APIs later.
        </p>
      </div>
    </div>
  );
};

/* ============================================================
   REUSABLE COMPONENTS
============================================================ */

interface InfoRowProps {
  icon: React.ElementType;
  label: string;
  value: string;
  valueClassName?: string;
}

const InfoRow = ({
  icon: Icon,
  label,
  value,
  valueClassName = "",
}: InfoRowProps) => {
  return (
    <div className="flex items-center justify-between gap-4 p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>

        <span className="text-sm text-muted-foreground">
          {label}
        </span>
      </div>

      <span
        className={`text-right text-sm font-medium ${valueClassName}`}
      >
        {value}
      </span>
    </div>
  );
};

interface SecurityToggleProps {
  title: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

const SecurityToggle = ({
  title,
  description,
  checked,
  onCheckedChange,
}: SecurityToggleProps) => {
  return (
    <div className="flex items-center justify-between gap-4 p-5">
      <div className="min-w-0">
        <p className="text-sm font-medium">
          {title}
        </p>

        <p className="mt-1 text-xs text-muted-foreground">
          {description}
        </p>
      </div>

      <Switch
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
    </div>
  );
};

interface PermissionItemProps {
  label: string;
}

const PermissionItem = ({
  label,
}: PermissionItemProps) => {
  return (
    <div className="flex items-center justify-between rounded-lg border bg-muted/20 px-3 py-2.5">
      <span className="text-sm font-medium">
        {label}
      </span>

      <span className="flex items-center gap-1 text-xs font-medium text-green-600">
        <CheckCircle2 className="h-3.5 w-3.5" />
        Allowed
      </span>
    </div>
  );
};

const BookOpenIcon = ({
  className,
}: {
  className?: string;
}) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
};

export default ProfilePage;