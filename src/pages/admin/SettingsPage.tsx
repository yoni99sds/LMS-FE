import {
  Bell,
  BookOpen,
  Check,
  Globe,
  Info,
  Languages,
  Lock,
  Mail,
  Save,
  Settings,
  Shield,
  UserPlus,
  Clock,
  FileText,
  Users,
  GraduationCap,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

type SettingsSection =
  | "general"
  | "courses"
  | "notifications"
  | "security";

interface LMSSettings {
  general: {
    platformName: string;
    description: string;
    adminEmail: string;
    timezone: string;
    language: string;
  };

  courses: {
    allowStudentEnrollment: boolean;
    requireCourseApproval: boolean;
    allowInstructorCreation: boolean;
    allowStudentReviews: boolean;
    allowCourseComments: boolean;
    autoPublishCourses: boolean;
  };

  notifications: {
    emailNotifications: boolean;
    newUserNotification: boolean;
    newCourseNotification: boolean;
    newReviewNotification: boolean;
    enrollmentNotification: boolean;
    systemNotification: boolean;
  };

  security: {
    requireTwoFactor: boolean;
    sessionTimeout: string;
    passwordExpiry: string;
    allowMultipleSessions: boolean;
    loginNotification: boolean;
  };
}

const initialSettings: LMSSettings = {
  general: {
    platformName: "LMS Platform",
    description:
      "A modern learning management system for managing courses, instructors, and students.",
    adminEmail: "admin@lms.com",
    timezone: "Africa/Addis_Ababa",
    language: "English",
  },

  courses: {
    allowStudentEnrollment: true,
    requireCourseApproval: true,
    allowInstructorCreation: true,
    allowStudentReviews: true,
    allowCourseComments: true,
    autoPublishCourses: false,
  },

  notifications: {
    emailNotifications: true,
    newUserNotification: true,
    newCourseNotification: true,
    newReviewNotification: true,
    enrollmentNotification: true,
    systemNotification: true,
  },

  security: {
    requireTwoFactor: false,
    sessionTimeout: "60",
    passwordExpiry: "90",
    allowMultipleSessions: true,
    loginNotification: true,
  },
};

const sections: {
  id: SettingsSection;
  label: string;
  description: string;
  icon: React.ElementType;
}[] = [
  {
    id: "general",
    label: "General",
    description: "Platform information and localization",
    icon: Settings,
  },
  {
    id: "courses",
    label: "Courses",
    description: "Course and enrollment settings",
    icon: BookOpen,
  },
  {
    id: "notifications",
    label: "Notifications",
    description: "Email and system notifications",
    icon: Bell,
  },
  {
    id: "security",
    label: "Security",
    description: "Authentication and security controls",
    icon: Shield,
  },
];

const SettingsPage = () => {
  const [activeSection, setActiveSection] =
    useState<SettingsSection>("general");

  const [settings, setSettings] =
    useState<LMSSettings>(initialSettings);

  const [isSaving, setIsSaving] = useState(false);

  const updateGeneral = (
    field: keyof LMSSettings["general"],
    value: string
  ) => {
    setSettings((previous) => ({
      ...previous,
      general: {
        ...previous.general,
        [field]: value,
      },
    }));
  };

  const updateCourses = (
    field: keyof LMSSettings["courses"],
    value: boolean
  ) => {
    setSettings((previous) => ({
      ...previous,
      courses: {
        ...previous.courses,
        [field]: value,
      },
    }));
  };

  const updateNotifications = (
    field: keyof LMSSettings["notifications"],
    value: boolean
  ) => {
    setSettings((previous) => ({
      ...previous,
      notifications: {
        ...previous.notifications,
        [field]: value,
      },
    }));
  };

  const updateSecurity = (
    field: keyof LMSSettings["security"],
    value: string | boolean
  ) => {
    setSettings((previous) => ({
      ...previous,
      security: {
        ...previous.security,
        [field]: value,
      },
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);

    try {
      /*
       * Backend API will be connected here later.
       *
       * Example:
       *
       * await settingsService.updateSettings(settings);
       */

      await new Promise((resolve) =>
        setTimeout(resolve, 700)
      );

      toast.success("Settings saved successfully.");
    } catch (error) {
      console.error("Failed to save settings:", error);
      toast.error("Failed to save settings.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setSettings(initialSettings);
    toast.success("Settings restored to defaults.");
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4" />
            <span>Administration</span>
            <span>/</span>
            <span>Settings</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Settings
          </h1>

          <p className="mt-1 text-muted-foreground">
            Manage your LMS platform configuration and system preferences.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={handleReset}
            disabled={isSaving}
          >
            Reset
          </Button>

          <Button
            onClick={handleSave}
            disabled={isSaving}
          >
            <Save className="mr-2 h-4 w-4" />

            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      {/* Information Banner */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Info className="h-5 w-5" />
            </div>

            <div>
              <p className="font-semibold">
                Platform Configuration
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                Changes made here affect the LMS platform globally.
                Review your settings carefully before saving them.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Settings Layout */}
      <div className="grid gap-6 lg:grid-cols-[250px_1fr]">
        {/* Settings Navigation */}
        <Card className="h-fit">
          <CardHeader className="border-b">
            <CardTitle className="text-base">
              Settings
            </CardTitle>
          </CardHeader>

          <CardContent className="p-2">
            <div className="space-y-1">
              {sections.map((section) => {
                const Icon = section.icon;

                const isActive =
                  activeSection === section.id;

                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() =>
                      setActiveSection(section.id)
                    }
                    className={`w-full rounded-xl p-3 text-left transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Icon className="mt-0.5 h-5 w-5 shrink-0" />

                      <div className="min-w-0">
                        <p className="font-medium">
                          {section.label}
                        </p>

                        <p
                          className={`mt-0.5 text-xs ${
                            isActive
                              ? "text-primary-foreground/75"
                              : "text-muted-foreground"
                          }`}
                        >
                          {section.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Settings Content */}
        <div className="min-w-0">
          {/* GENERAL */}
          {activeSection === "general" && (
            <div className="space-y-6">
              <Card>
                <CardHeader className="border-b">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Settings className="h-5 w-5" />
                    </div>

                    <div>
                      <CardTitle>
                        General Settings
                      </CardTitle>

                      <p className="mt-1 text-sm text-muted-foreground">
                        Configure the basic information of your LMS.
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6 p-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Platform Name
                      </label>

                      <Input
                        value={
                          settings.general.platformName
                        }
                        onChange={(event) =>
                          updateGeneral(
                            "platformName",
                            event.target.value
                          )
                        }
                        placeholder="Enter platform name"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Administrator Email
                      </label>

                      <Input
                        type="email"
                        value={
                          settings.general.adminEmail
                        }
                        onChange={(event) =>
                          updateGeneral(
                            "adminEmail",
                            event.target.value
                          )
                        }
                        placeholder="admin@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Platform Description
                    </label>

                    <Textarea
                      value={
                        settings.general.description
                      }
                      onChange={(event) =>
                        updateGeneral(
                          "description",
                          event.target.value
                        )
                      }
                      placeholder="Describe your LMS platform"
                      rows={4}
                    />

                    <p className="text-xs text-muted-foreground">
                      This description can be displayed on public
                      platform pages.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="border-b">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600">
                      <Globe className="h-5 w-5" />
                    </div>

                    <div>
                      <CardTitle>
                        Localization
                      </CardTitle>

                      <p className="mt-1 text-sm text-muted-foreground">
                        Configure language and timezone preferences.
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="grid gap-6 p-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Timezone
                    </label>

                    <Select
                      value={settings.general.timezone}
                      onValueChange={(value) =>
                        updateGeneral(
                          "timezone",
                          value
                        )
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="Africa/Addis_Ababa">
                          Africa/Addis Ababa
                        </SelectItem>

                        <SelectItem value="UTC">
                          UTC
                        </SelectItem>

                        <SelectItem value="America/New_York">
                          America/New York
                        </SelectItem>

                        <SelectItem value="Europe/London">
                          Europe/London
                        </SelectItem>

                        <SelectItem value="Asia/Dubai">
                          Asia/Dubai
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Default Language
                    </label>

                    <Select
                      value={settings.general.language}
                      onValueChange={(value) =>
                        updateGeneral(
                          "language",
                          value
                        )
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="English">
                          English
                        </SelectItem>

                        <SelectItem value="Amharic">
                          Amharic
                        </SelectItem>

                        <SelectItem value="Arabic">
                          Arabic
                        </SelectItem>

                        <SelectItem value="French">
                          French
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* COURSES */}
          {activeSection === "courses" && (
            <div className="space-y-6">
              <Card>
                <CardHeader className="border-b">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <BookOpen className="h-5 w-5" />
                    </div>

                    <div>
                      <CardTitle>
                        Course Settings
                      </CardTitle>

                      <p className="mt-1 text-sm text-muted-foreground">
                        Configure how courses are created, published,
                        and managed.
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="divide-y p-0">
                  <ToggleSetting
                    icon={Users}
                    title="Allow Student Enrollment"
                    description="Allow students to enroll in available courses."
                    checked={
                      settings.courses
                        .allowStudentEnrollment
                    }
                    onCheckedChange={(value) =>
                      updateCourses(
                        "allowStudentEnrollment",
                        value
                      )
                    }
                  />

                  <ToggleSetting
                    icon={Shield}
                    title="Require Course Approval"
                    description="Courses must be approved by an administrator before publication."
                    checked={
                      settings.courses
                        .requireCourseApproval
                    }
                    onCheckedChange={(value) =>
                      updateCourses(
                        "requireCourseApproval",
                        value
                      )
                    }
                  />

                  <ToggleSetting
                    icon={UserPlus}
                    title="Allow Instructor Creation"
                    description="Allow administrators to create and manage instructor accounts."
                    checked={
                      settings.courses
                        .allowInstructorCreation
                    }
                    onCheckedChange={(value) =>
                      updateCourses(
                        "allowInstructorCreation",
                        value
                      )
                    }
                  />

                  <ToggleSetting
                    icon={StarIcon}
                    title="Allow Student Reviews"
                    description="Allow students to rate and review courses they have taken."
                    checked={
                      settings.courses
                        .allowStudentReviews
                    }
                    onCheckedChange={(value) =>
                      updateCourses(
                        "allowStudentReviews",
                        value
                      )
                    }
                  />

                  <ToggleSetting
                    icon={MessageIcon}
                    title="Allow Course Comments"
                    description="Allow students to post comments and discussions inside courses."
                    checked={
                      settings.courses
                        .allowCourseComments
                    }
                    onCheckedChange={(value) =>
                      updateCourses(
                        "allowCourseComments",
                        value
                      )
                    }
                  />

                  <ToggleSetting
                    icon={Check}
                    title="Auto Publish Courses"
                    description="Automatically publish newly created courses without administrator approval."
                    checked={
                      settings.courses
                        .autoPublishCourses
                    }
                    onCheckedChange={(value) =>
                      updateCourses(
                        "autoPublishCourses",
                        value
                      )
                    }
                  />
                </CardContent>
              </Card>

              <Card className="border-yellow-500/20 bg-yellow-500/5">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-600">
                      <Info className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="font-semibold">
                        Course Approval
                      </p>

                      <p className="mt-1 text-sm text-muted-foreground">
                        When course approval is enabled, newly
                        created courses will remain pending until an
                        administrator reviews them.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* NOTIFICATIONS */}
          {activeSection === "notifications" && (
            <div className="space-y-6">
              <Card>
                <CardHeader className="border-b">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600">
                      <Bell className="h-5 w-5" />
                    </div>

                    <div>
                      <CardTitle>
                        Notification Settings
                      </CardTitle>

                      <p className="mt-1 text-sm text-muted-foreground">
                        Control which events generate notifications.
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="divide-y p-0">
                  <ToggleSetting
                    icon={Mail}
                    title="Email Notifications"
                    description="Enable system-wide email notifications."
                    checked={
                      settings.notifications
                        .emailNotifications
                    }
                    onCheckedChange={(value) =>
                      updateNotifications(
                        "emailNotifications",
                        value
                      )
                    }
                  />

                  <ToggleSetting
                    icon={UserPlus}
                    title="New User Notification"
                    description="Notify administrators when a new user registers."
                    checked={
                      settings.notifications
                        .newUserNotification
                    }
                    onCheckedChange={(value) =>
                      updateNotifications(
                        "newUserNotification",
                        value
                      )
                    }
                  />

                  <ToggleSetting
                    icon={BookOpen}
                    title="New Course Notification"
                    description="Notify administrators when an instructor creates a new course."
                    checked={
                      settings.notifications
                        .newCourseNotification
                    }
                    onCheckedChange={(value) =>
                      updateNotifications(
                        "newCourseNotification",
                        value
                      )
                    }
                  />

                  <ToggleSetting
                    icon={MessageIcon}
                    title="New Review Notification"
                    description="Notify administrators when a student submits a course review."
                    checked={
                      settings.notifications
                        .newReviewNotification
                    }
                    onCheckedChange={(value) =>
                      updateNotifications(
                        "newReviewNotification",
                        value
                      )
                    }
                  />

                  <ToggleSetting
                    icon={GraduationCap}
                    title="Enrollment Notification"
                    description="Notify instructors when students enroll in their courses."
                    checked={
                      settings.notifications
                        .enrollmentNotification
                    }
                    onCheckedChange={(value) =>
                      updateNotifications(
                        "enrollmentNotification",
                        value
                      )
                    }
                  />

                  <ToggleSetting
                    icon={Info}
                    title="System Notifications"
                    description="Receive important system and platform notifications."
                    checked={
                      settings.notifications
                        .systemNotification
                    }
                    onCheckedChange={(value) =>
                      updateNotifications(
                        "systemNotification",
                        value
                      )
                    }
                  />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Mail className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="font-semibold">
                        Email Configuration
                      </p>

                      <p className="mt-1 text-sm text-muted-foreground">
                        Email delivery configuration will be connected
                        to the backend SMTP service later.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* SECURITY */}
          {activeSection === "security" && (
            <div className="space-y-6">
              <Card>
                <CardHeader className="border-b">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-600">
                      <Shield className="h-5 w-5" />
                    </div>

                    <div>
                      <CardTitle>
                        Security Settings
                      </CardTitle>

                      <p className="mt-1 text-sm text-muted-foreground">
                        Configure authentication and account security.
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="divide-y p-0">
                  <ToggleSetting
                    icon={Shield}
                    title="Require Two-Factor Authentication"
                    description="Require administrators and instructors to use two-factor authentication."
                    checked={
                      settings.security
                        .requireTwoFactor
                    }
                    onCheckedChange={(value) =>
                      updateSecurity(
                        "requireTwoFactor",
                        value
                      )
                    }
                  />

                  <ToggleSetting
                    icon={Users}
                    title="Allow Multiple Sessions"
                    description="Allow users to remain logged in on multiple devices."
                    checked={
                      settings.security
                        .allowMultipleSessions
                    }
                    onCheckedChange={(value) =>
                      updateSecurity(
                        "allowMultipleSessions",
                        value
                      )
                    }
                  />

                  <ToggleSetting
                    icon={Mail}
                    title="Login Notifications"
                    description="Send users an email notification when a new login is detected."
                    checked={
                      settings.security
                        .loginNotification
                    }
                    onCheckedChange={(value) =>
                      updateSecurity(
                        "loginNotification",
                        value
                      )
                    }
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="border-b">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600">
                      <Lock className="h-5 w-5" />
                    </div>

                    <div>
                      <CardTitle>
                        Session & Password Policies
                      </CardTitle>

                      <p className="mt-1 text-sm text-muted-foreground">
                        Configure account session and password policies.
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="grid gap-6 p-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      Session Timeout
                    </label>

                    <Select
                      value={
                        settings.security
                          .sessionTimeout
                      }
                      onValueChange={(value) =>
                        updateSecurity(
                          "sessionTimeout",
                          value
                        )
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="15">
                          15 minutes
                        </SelectItem>

                        <SelectItem value="30">
                          30 minutes
                        </SelectItem>

                        <SelectItem value="60">
                          1 hour
                        </SelectItem>

                        <SelectItem value="120">
                          2 hours
                        </SelectItem>

                        <SelectItem value="240">
                          4 hours
                        </SelectItem>

                        <SelectItem value="480">
                          8 hours
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium">
                      <Lock className="h-4 w-4 text-muted-foreground" />
                      Password Expiry
                    </label>

                    <Select
                      value={
                        settings.security
                          .passwordExpiry
                      }
                      onValueChange={(value) =>
                        updateSecurity(
                          "passwordExpiry",
                          value
                        )
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="30">
                          30 days
                        </SelectItem>

                        <SelectItem value="60">
                          60 days
                        </SelectItem>

                        <SelectItem value="90">
                          90 days
                        </SelectItem>

                        <SelectItem value="180">
                          180 days
                        </SelectItem>

                        <SelectItem value="never">
                          Never
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-red-500/20 bg-red-500/5">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-600">
                      <Shield className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="font-semibold">
                        Security Recommendation
                      </p>

                      <p className="mt-1 text-sm text-muted-foreground">
                        Enable two-factor authentication for
                        administrator accounts to provide an additional
                        layer of protection.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Save Bar */}
      <Card className="sticky bottom-4 z-10 shadow-lg">
        <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-medium">
              Settings
            </p>

            <p className="text-sm text-muted-foreground">
              Save your changes when you are finished.
            </p>
          </div>

          <Button
            onClick={handleSave}
            disabled={isSaving}
          >
            <Save className="mr-2 h-4 w-4" />

            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </CardContent>
      </Card>

      {/* Development Note */}
      <div className="rounded-xl border border-dashed bg-muted/20 p-4">
        <p className="text-sm text-muted-foreground">
          <strong className="text-foreground">
            Development note:
          </strong>{" "}
          Settings are currently stored in local component state.
          The save operation is a placeholder and will be connected
          to the backend settings API later.
        </p>
      </div>
    </div>
  );
};

/* ============================================================
   REUSABLE COMPONENTS
============================================================ */

interface ToggleSettingProps {
  icon: React.ElementType;
  title: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

const ToggleSetting = ({
  icon: Icon,
  title,
  description,
  checked,
  onCheckedChange,
}: ToggleSettingProps) => {
  return (
    <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted">
          <Icon className="h-5 w-5 text-muted-foreground" />
        </div>

        <div>
          <p className="font-medium">
            {title}
          </p>

          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            {description}
          </p>
        </div>
      </div>

      <Switch
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
    </div>
  );
};

/*
 * Small icon wrappers.
 * These keep the settings configuration readable.
 */

const StarIcon = ({
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
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
};

const MessageIcon = ({
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
      <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
    </svg>
  );
};

export default SettingsPage;