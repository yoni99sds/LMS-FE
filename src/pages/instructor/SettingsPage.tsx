import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Shield,
  Bell,
  BookOpen,
  Save,
  LogOut,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { logout } from "@/features/auth/authSlice";

const SettingsPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);

  // =========================
  // ACCOUNT INFORMATION
  // =========================

  const [firstName, setFirstName] = useState(
    user?.firstName || ""
  );

  const [lastName, setLastName] = useState(
    user?.lastName || ""
  );

  const [email, setEmail] = useState(
    user?.email || ""
  );

  // =========================
  // NOTIFICATIONS
  // =========================

  const [emailNotifications, setEmailNotifications] =
    useState(true);

  const [studentNotifications, setStudentNotifications] =
    useState(true);

  const [courseNotifications, setCourseNotifications] =
    useState(true);

  const [marketingNotifications, setMarketingNotifications] =
    useState(false);

  // =========================
  // PROFILE VISIBILITY
  // =========================

  const [publicProfile, setPublicProfile] =
    useState(true);

  const [showEmail, setShowEmail] =
    useState(false);

  // =========================
  // SAVE STATE
  // =========================

  const [isSaving, setIsSaving] =
    useState(false);

  // =========================
  // INITIALS
  // =========================

  const initials =
    `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`
      .toUpperCase();

  // =========================
  // SAVE PROFILE
  // =========================

  const handleSaveProfile = async () => {
    setIsSaving(true);

    /*
      TODO:
      Connect this to your backend API later.

      Example:

      await dispatch(
        updateProfile({
          firstName,
          lastName,
          email,
        })
      );
    */

    setTimeout(() => {
      setIsSaving(false);
    }, 800);
  };

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">

      {/* PAGE HEADER */}

      <div>
        <h1 className="text-3xl sm:text-4xl font-black">
          Settings
        </h1>

        <p className="mt-2 text-muted-foreground">
          Manage your instructor account, notifications,
          security, and profile preferences.
        </p>
      </div>

      {/* ACCOUNT INFORMATION */}

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <User size={20} />
            </div>

            <div>
              <CardTitle>
                Account Information
              </CardTitle>

              <CardDescription>
                Update your personal account information.
              </CardDescription>
            </div>

          </div>
        </CardHeader>

        <CardContent className="space-y-6">

          {/* PROFILE PREVIEW */}

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">

            <div className="h-20 w-20 rounded-full overflow-hidden bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">

              {user?.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt={`${firstName} ${lastName}`}
                  className="h-full w-full object-cover"
                />
              ) : (
                initials || <User size={30} />
              )}

            </div>

            <div className="text-center sm:text-left">

              <h3 className="font-bold text-lg">
                {firstName} {lastName}
              </h3>

              <p className="text-sm text-muted-foreground">
                Instructor
              </p>

              <p className="text-sm text-muted-foreground mt-1">
                {email}
              </p>

            </div>

          </div>

          <Separator />

          {/* NAME */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div className="space-y-2">

              <label
                htmlFor="firstName"
                className="text-sm font-medium"
              >
                First Name
              </label>

              <Input
                id="firstName"
                value={firstName}
                onChange={(event) =>
                  setFirstName(event.target.value)
                }
                placeholder="First name"
              />

            </div>

            <div className="space-y-2">

              <label
                htmlFor="lastName"
                className="text-sm font-medium"
              >
                Last Name
              </label>

              <Input
                id="lastName"
                value={lastName}
                onChange={(event) =>
                  setLastName(event.target.value)
                }
                placeholder="Last name"
              />

            </div>

          </div>

          {/* EMAIL */}

          <div className="space-y-2">

            <label
              htmlFor="email"
              className="text-sm font-medium"
            >
              Email Address
            </label>

            <div className="relative">

              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />

              <Input
                id="email"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                className="pl-10"
                placeholder="Email address"
              />

            </div>

          </div>

          {/* SAVE */}

          <div className="flex justify-end">

            <Button
              onClick={handleSaveProfile}
              disabled={isSaving}
              className="gap-2"
            >
              <Save size={17} />

              {isSaving
                ? "Saving..."
                : "Save Changes"}
            </Button>

          </div>

        </CardContent>
      </Card>

      {/* PASSWORD & SECURITY */}

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Shield size={20} />
            </div>

            <div>
              <CardTitle>
                Password & Security
              </CardTitle>

              <CardDescription>
                Keep your instructor account secure.
              </CardDescription>
            </div>

          </div>
        </CardHeader>

        <CardContent className="space-y-6">

          {/* CHANGE PASSWORD */}

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            <div className="flex items-start gap-3">

              <Lock
                size={20}
                className="mt-1 text-muted-foreground"
              />

              <div>

                <h3 className="font-semibold">
                  Change Password
                </h3>

                <p className="text-sm text-muted-foreground mt-1">
                  Update your password to keep your account
                  secure.
                </p>

              </div>

            </div>

            <Button
              variant="outline"
              onClick={() =>
                navigate("/forgot-password")
              }
            >
              Change Password
            </Button>

          </div>

          <Separator />

          {/* TWO FACTOR AUTHENTICATION */}

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            <div className="flex items-start gap-3">

              <Shield
                size={20}
                className="mt-1 text-primary"
              />

              <div>

                <h3 className="font-semibold">
                  Two-Factor Authentication
                </h3>

                <p className="text-sm text-muted-foreground mt-1">
                  Add an extra layer of security to your
                  instructor account.
                </p>

              </div>

            </div>

            <Button variant="outline">
              Configure
            </Button>

          </div>

        </CardContent>
      </Card>

      {/* NOTIFICATIONS */}

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Bell size={20} />
            </div>

            <div>
              <CardTitle>
                Notifications
              </CardTitle>

              <CardDescription>
                Choose which notifications you receive.
              </CardDescription>
            </div>

          </div>
        </CardHeader>

        <CardContent className="space-y-6">

          {/* EMAIL NOTIFICATIONS */}

          <div className="flex items-center justify-between gap-4">

            <div>

              <h3 className="font-semibold">
                Email Notifications
              </h3>

              <p className="text-sm text-muted-foreground mt-1">
                Receive important account notifications by
                email.
              </p>

            </div>

            <Switch
              checked={emailNotifications}
              onCheckedChange={
                setEmailNotifications
              }
            />

          </div>

          <Separator />

          {/* STUDENT ACTIVITY */}

          <div className="flex items-center justify-between gap-4">

            <div>

              <h3 className="font-semibold">
                Student Activity
              </h3>

              <p className="text-sm text-muted-foreground mt-1">
                Get notified when students interact with
                your courses.
              </p>

            </div>

            <Switch
              checked={studentNotifications}
              onCheckedChange={
                setStudentNotifications
              }
            />

          </div>

          <Separator />

          {/* COURSE NOTIFICATIONS */}

          <div className="flex items-center justify-between gap-4">

            <div>

              <h3 className="font-semibold">
                Course Notifications
              </h3>

              <p className="text-sm text-muted-foreground mt-1">
                Receive updates about your courses and
                course activity.
              </p>

            </div>

            <Switch
              checked={courseNotifications}
              onCheckedChange={
                setCourseNotifications
              }
            />

          </div>

          <Separator />

          {/* MARKETING */}

          <div className="flex items-center justify-between gap-4">

            <div>

              <h3 className="font-semibold">
                Marketing Emails
              </h3>

              <p className="text-sm text-muted-foreground mt-1">
                Receive platform news, promotions, and
                instructor tips.
              </p>

            </div>

            <Switch
              checked={marketingNotifications}
              onCheckedChange={
                setMarketingNotifications
              }
            />

          </div>

        </CardContent>
      </Card>

      {/* INSTRUCTOR PROFILE */}

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <BookOpen size={20} />
            </div>

            <div>
              <CardTitle>
                Instructor Profile
              </CardTitle>

              <CardDescription>
                Control how students see your instructor
                profile.
              </CardDescription>
            </div>

          </div>
        </CardHeader>

        <CardContent className="space-y-6">

          {/* PUBLIC PROFILE */}

          <div className="flex items-center justify-between gap-4">

            <div>

              <h3 className="font-semibold">
                Public Instructor Profile
              </h3>

              <p className="text-sm text-muted-foreground mt-1">
                Allow students to view your instructor
                profile.
              </p>

            </div>

            <Switch
              checked={publicProfile}
              onCheckedChange={setPublicProfile}
            />

          </div>

          <Separator />

          {/* SHOW EMAIL */}

          <div className="flex items-center justify-between gap-4">

            <div>

              <h3 className="font-semibold">
                Show Email Address
              </h3>

              <p className="text-sm text-muted-foreground mt-1">
                Allow students to see your email address
                on your public profile.
              </p>

            </div>

            <Switch
              checked={showEmail}
              onCheckedChange={setShowEmail}
            />

          </div>

        </CardContent>
      </Card>

      {/* ACCOUNT ACTIONS */}

      <Card className="border-red-500/30">

        <CardHeader>

          <CardTitle className="text-red-500">
            Account Actions
          </CardTitle>

          <CardDescription>
            Manage your current instructor session.
          </CardDescription>

        </CardHeader>

        <CardContent>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            <div>

              <h3 className="font-semibold">
                Sign Out
              </h3>

              <p className="text-sm text-muted-foreground mt-1">
                Sign out of your instructor account on this
                device.
              </p>

            </div>

            <Button
              variant="destructive"
              onClick={handleLogout}
              className="gap-2"
            >
              <LogOut size={17} />
              Logout
            </Button>

          </div>

        </CardContent>

      </Card>

    </div>
  );
};

export default SettingsPage;