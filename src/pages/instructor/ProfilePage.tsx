import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Edit3,
  Camera,
  BookOpen,
  Users,
  Star,
  DollarSign,
} from "lucide-react";

import InstructorLayout from "@/layouts/InstructorLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAppSelector } from "@/hooks/redux";

const ProfilePage = () => {
  const { user } = useAppSelector((state) => state.auth);

  const [isEditing, setIsEditing] = useState(false);

  /*
   * Use Redux user information when available.
   * Fallback values keep the page looking good while
   * the backend/profile API is not yet connected.
   */
  const firstName = user?.firstName || "Alex";
  const lastName = user?.lastName || "Johnson";
  const fullName = `${firstName} ${lastName}`;

  const email = user?.email || "alex.johnson@example.com";

  const profilePicture =
    user?.profilePicture && user.profilePicture.trim() !== ""
      ? user.profilePicture
      : "";

  const initials =
    `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

  return (
    
      <div className="space-y-8">

        {/* ===================================================== */}
        {/* HEADER */}
        {/* ===================================================== */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black tracking-tight">
              My Profile
            </h1>

            <p className="text-muted-foreground mt-2">
              Manage your instructor profile and personal information.
            </p>
          </div>

          <Button
            onClick={() => setIsEditing(!isEditing)}
            className="rounded-xl"
          >
            <Edit3 className="mr-2 h-4 w-4" />

            {isEditing ? "Cancel Editing" : "Edit Profile"}
          </Button>
        </div>

        {/* ===================================================== */}
        {/* PROFILE HERO */}
        {/* ===================================================== */}

        <div className="relative overflow-hidden rounded-3xl border bg-background shadow-sm">

          {/* COVER */}
          <div className="h-40 md:h-52 bg-primary/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/5 to-transparent" />

            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-primary/10" />

            <div className="absolute -bottom-24 left-1/3 w-72 h-72 rounded-full bg-primary/5" />
          </div>

          {/* PROFILE INFORMATION */}
          <div className="px-6 md:px-8 pb-8">

            <div className="flex flex-col md:flex-row md:items-end gap-5 -mt-16 relative">

              {/* PROFILE IMAGE */}
              <div className="relative">

                <div className="w-32 h-32 rounded-full border-4 border-background bg-primary text-primary-foreground flex items-center justify-center overflow-hidden shadow-lg">

                  {profilePicture ? (
                    <img
                      src={profilePicture}
                      alt={fullName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-4xl font-black">
                      {initials}
                    </span>
                  )}

                </div>

                {isEditing && (
                  <button
                    type="button"
                    className="absolute bottom-1 right-1 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:bg-primary/90 transition"
                  >
                    <Camera className="h-5 w-5" />
                  </button>
                )}

              </div>

              {/* NAME */}
              <div className="flex-1 pb-1">

                <div className="flex flex-wrap items-center gap-3">

                  <h2 className="text-2xl md:text-3xl font-black">
                    {fullName}
                  </h2>

                  <Badge className="rounded-full">
                    Instructor
                  </Badge>

                </div>

                <p className="text-muted-foreground mt-1">
                  Full Stack Developer & Technology Instructor
                </p>

              </div>

            </div>
          </div>
        </div>

        {/* ===================================================== */}
        {/* STATISTICS */}
        {/* ===================================================== */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

          <StatCard
            icon={<BookOpen className="h-5 w-5" />}
            label="Courses"
            value="12"
          />

          <StatCard
            icon={<Users className="h-5 w-5" />}
            label="Students"
            value="2,840"
          />

          <StatCard
            icon={<Star className="h-5 w-5" />}
            label="Average Rating"
            value="4.9"
          />

          <StatCard
            icon={<DollarSign className="h-5 w-5" />}
            label="Total Revenue"
            value="$24.8K"
          />

        </div>

        {/* ===================================================== */}
        {/* MAIN CONTENT */}
        {/* ===================================================== */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* =================================================== */}
          {/* PERSONAL INFORMATION */}
          {/* =================================================== */}

          <div className="lg:col-span-2">

            <div className="border rounded-3xl bg-background shadow-sm overflow-hidden">

              <div className="p-6 border-b">

                <h2 className="text-xl font-bold">
                  Personal Information
                </h2>

                <p className="text-sm text-muted-foreground mt-1">
                  Your basic personal and contact information.
                </p>

              </div>

              <div className="p-6">

                {isEditing ? (
                  <EditProfileForm
                    firstName={firstName}
                    lastName={lastName}
                    email={email}
                  />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <InfoItem
                      icon={<User className="h-5 w-5" />}
                      label="Full Name"
                      value={fullName}
                    />

                    <InfoItem
                      icon={<Mail className="h-5 w-5" />}
                      label="Email Address"
                      value={email}
                    />

                    <InfoItem
                      icon={<Phone className="h-5 w-5" />}
                      label="Phone"
                      value="+251 91 234 5678"
                    />

                    <InfoItem
                      icon={<MapPin className="h-5 w-5" />}
                      label="Location"
                      value="Addis Ababa, Ethiopia"
                    />

                    <InfoItem
                      icon={<Globe className="h-5 w-5" />}
                      label="Website"
                      value="www.alexjohnson.dev"
                    />

                  </div>
                )}

              </div>

            </div>

          </div>

          {/* =================================================== */}
          {/* EXPERTISE */}
          {/* =================================================== */}

          <div>

            <div className="border rounded-3xl bg-background shadow-sm p-6">

              <h2 className="text-xl font-bold">
                Expertise
              </h2>

              <p className="text-sm text-muted-foreground mt-1 mb-5">
                Areas you teach and specialize in.
              </p>

              <div className="flex flex-wrap gap-2">

                <Badge variant="secondary" className="px-3 py-1.5 rounded-full">
                  React.js
                </Badge>

                <Badge variant="secondary" className="px-3 py-1.5 rounded-full">
                  Node.js
                </Badge>

                <Badge variant="secondary" className="px-3 py-1.5 rounded-full">
                  JavaScript
                </Badge>

                <Badge variant="secondary" className="px-3 py-1.5 rounded-full">
                  TypeScript
                </Badge>

                <Badge variant="secondary" className="px-3 py-1.5 rounded-full">
                  MongoDB
                </Badge>

                <Badge variant="secondary" className="px-3 py-1.5 rounded-full">
                  UI/UX
                </Badge>

              </div>

            </div>

            {/* SOCIAL LINKS */}

            <div className="border rounded-3xl bg-background shadow-sm p-6 mt-6">

              <h2 className="text-xl font-bold">
                Social Profiles
              </h2>

              <p className="text-sm text-muted-foreground mt-1 mb-5">
                Connect your professional social accounts.
              </p>

              <div className="space-y-3">

              <SocialLink
  icon={<Globe className="h-5 w-5" />}
  name="LinkedIn"
  value="linkedin.com/in/alexjohnson"
/>

<SocialLink
  icon={<User className="h-5 w-5" />}
  name="Twitter"
  value="@alexjohnson"
/>

              </div>

            </div>

          </div>

        </div>

        {/* ===================================================== */}
        {/* BIO */}
        {/* ===================================================== */}

        <div className="border rounded-3xl bg-background shadow-sm">

          <div className="p-6 border-b">

            <h2 className="text-xl font-bold">
              About Me
            </h2>

            <p className="text-sm text-muted-foreground mt-1">
              Your instructor biography.
            </p>

          </div>

          <div className="p-6">

            <p className="text-muted-foreground leading-7 max-w-4xl">
              I'm a passionate software engineer and instructor focused on
              helping students build practical skills in modern web
              development. I specialize in React, Node.js, JavaScript,
              TypeScript, and full-stack application development.
            </p>

          </div>

        </div>

      </div>
    
  );
};

/* ============================================================= */
/* STAT CARD */
/* ============================================================= */

type StatCardProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

const StatCard = ({
  icon,
  label,
  value,
}: StatCardProps) => {
  return (
    <div className="border rounded-2xl bg-background p-5 shadow-sm">

      <div className="flex items-center justify-between">

        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
          {icon}
        </div>

      </div>

      <p className="text-2xl font-black mt-4">
        {value}
      </p>

      <p className="text-sm text-muted-foreground mt-1">
        {label}
      </p>

    </div>
  );
};

/* ============================================================= */
/* INFO ITEM */
/* ============================================================= */

type InfoItemProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

const InfoItem = ({
  icon,
  label,
  value,
}: InfoItemProps) => {
  return (
    <div className="flex items-start gap-4">

      <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0 text-muted-foreground">
        {icon}
      </div>

      <div className="min-w-0">

        <p className="text-xs text-muted-foreground font-medium">
          {label}
        </p>

        <p className="font-semibold mt-1 break-words">
          {value}
        </p>

      </div>

    </div>
  );
};

/* ============================================================= */
/* SOCIAL LINK */
/* ============================================================= */

type SocialLinkProps = {
  icon: React.ReactNode;
  name: string;
  value: string;
};

const SocialLink = ({
  icon,
  name,
  value,
}: SocialLinkProps) => {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition">

      <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
        {icon}
      </div>

      <div className="min-w-0">

        <p className="text-sm font-semibold">
          {name}
        </p>

        <p className="text-xs text-muted-foreground truncate">
          {value}
        </p>

      </div>

    </div>
  );
};

/* ============================================================= */
/* EDIT PROFILE FORM */
/* ============================================================= */

type EditProfileFormProps = {
  firstName: string;
  lastName: string;
  email: string;
};

const EditProfileForm = ({
  firstName,
  lastName,
  email,
}: EditProfileFormProps) => {
  return (
    <div className="space-y-6">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        <div className="space-y-2">
          <label className="text-sm font-medium">
            First Name
          </label>

          <input
            defaultValue={firstName}
            className="w-full h-11 rounded-xl border bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Last Name
          </label>

          <input
            defaultValue={lastName}
            className="w-full h-11 rounded-xl border bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

      </div>

      <div className="space-y-2">

        <label className="text-sm font-medium">
          Email Address
        </label>

        <input
          type="email"
          defaultValue={email}
          className="w-full h-11 rounded-xl border bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-primary/30"
        />

      </div>

      <div className="space-y-2">

        <label className="text-sm font-medium">
          Phone
        </label>

        <input
          defaultValue="+251 91 234 5678"
          className="w-full h-11 rounded-xl border bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-primary/30"
        />

      </div>

      <div className="space-y-2">

        <label className="text-sm font-medium">
          Location
        </label>

        <input
          defaultValue="Addis Ababa, Ethiopia"
          className="w-full h-11 rounded-xl border bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-primary/30"
        />

      </div>

      <div className="space-y-2">

        <label className="text-sm font-medium">
          Website
        </label>

        <input
          defaultValue="www.alexjohnson.dev"
          className="w-full h-11 rounded-xl border bg-background px-4 text-sm outline-none focus:ring-2 focus:ring-primary/30"
        />

      </div>

      <div className="flex justify-end">

        <Button className="rounded-xl">
          Save Changes
        </Button>

      </div>

    </div>
  );
};

export default ProfilePage;