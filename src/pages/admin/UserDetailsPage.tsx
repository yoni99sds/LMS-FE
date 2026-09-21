import {
  ArrowLeft,
  Mail,
  Shield,
  User,
  CalendarDays,
  Clock,
  CheckCircle2,
  XCircle,
  Edit,
  UserX,
  UserCheck,
  BookOpen,
  ShoppingCart,
  CreditCard,
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const UserDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  /*
   * Temporary user data.
   * This will be replaced with the backend API later.
   */
  const user = {
    id: id || "1",
    firstName: "John",
    lastName: "Instructor",
    email: "instructor@edumaster.com",
    role: "Instructor",
    status: "Active",
    profilePicture: "",
    isEmailVerified: true,
    isMfaActive: false,
    createdAt: "January 15, 2026",
    lastLogin: "September 17, 2026",
  };

  const fullName = `${user.firstName} ${user.lastName}`;

  const initials =
    `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`
      .toUpperCase();

  const handleBack = () => {
    navigate("/admin/users");
  };

  const handleEdit = () => {
    console.log("Edit user:", user.id);
  };

  const handleSuspend = () => {
    console.log("Suspend user:", user.id);
  };

  const handleActivate = () => {
    console.log("Activate user:", user.id);
  };

  return (
    <div className="space-y-6">
      {/* ===================================== */}
      {/* PAGE HEADER */}
      {/* ===================================== */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={handleBack}
            className="rounded-xl"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              User Details
            </h1>

            <p className="text-sm text-muted-foreground">
              View and manage user information
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={handleEdit}
            className="rounded-xl"
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit User
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={
                  user.status === "Active"
                    ? "destructive"
                    : "default"
                }
                className="rounded-xl"
              >
                {user.status === "Active" ? (
                  <>
                    <UserX className="mr-2 h-4 w-4" />
                    Suspend
                  </>
                ) : (
                  <>
                    <UserCheck className="mr-2 h-4 w-4" />
                    Activate
                  </>
                )}
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              {user.status === "Active" ? (
                <DropdownMenuItem
                  onClick={handleSuspend}
                  className="text-red-500 focus:text-red-500"
                >
                  <UserX className="mr-2 h-4 w-4" />
                  Suspend User
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  onClick={handleActivate}
                >
                  <UserCheck className="mr-2 h-4 w-4" />
                  Activate User
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* ===================================== */}
      {/* USER PROFILE CARD */}
      {/* ===================================== */}
      <Card className="overflow-hidden">
        <div className="h-24 bg-primary/10" />

        <CardContent className="-mt-12 px-6 pb-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              {/* Avatar */}
              <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-4 border-background bg-primary text-2xl font-bold text-primary-foreground shadow-lg">
                {user.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt={fullName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  initials
                )}
              </div>

              {/* User info */}
              <div className="pb-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-2xl font-bold">
                    {fullName}
                  </h2>

                  <span
                    className={`
                      rounded-full px-2.5 py-1 text-xs font-semibold
                      ${
                        user.status === "Active"
                          ? "bg-green-500/10 text-green-600"
                          : "bg-red-500/10 text-red-600"
                      }
                    `}
                  >
                    {user.status}
                  </span>
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Mail className="h-4 w-4" />
                    {user.email}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Shield className="h-4 w-4" />
                    {user.role}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ===================================== */}
      {/* MAIN CONTENT */}
      {/* ===================================== */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* ================================= */}
        {/* PERSONAL INFORMATION */}
        {/* ================================= */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Personal Information
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">
                  First Name
                </p>

                <p className="mt-1 font-medium">
                  {user.firstName}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Last Name
                </p>

                <p className="mt-1 font-medium">
                  {user.lastName}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Email Address
                </p>

                <p className="mt-1 break-all font-medium">
                  {user.email}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Role
                </p>

                <p className="mt-1 font-medium">
                  {user.role}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Account Status
                </p>

                <div className="mt-1 flex items-center gap-2">
                  {user.status === "Active" ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}

                  <span className="font-medium">
                    {user.status}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Email Verification
                </p>

                <div className="mt-1 flex items-center gap-2">
                  {user.isEmailVerified ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span className="font-medium">
                        Verified
                      </span>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-4 w-4 text-red-500" />
                      <span className="font-medium">
                        Not Verified
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ================================= */}
        {/* ACCOUNT INFORMATION */}
        {/* ================================= */}
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-muted p-2">
                <CalendarDays className="h-4 w-4" />
              </div>

              <div>
                <p className="text-xs text-muted-foreground">
                  Joined
                </p>

                <p className="text-sm font-medium">
                  {user.createdAt}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-muted p-2">
                <Clock className="h-4 w-4" />
              </div>

              <div>
                <p className="text-xs text-muted-foreground">
                  Last Login
                </p>

                <p className="text-sm font-medium">
                  {user.lastLogin}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-muted p-2">
                <Shield className="h-4 w-4" />
              </div>

              <div>
                <p className="text-xs text-muted-foreground">
                  Two-Factor Authentication
                </p>

                <p className="text-sm font-medium">
                  {user.isMfaActive
                    ? "Enabled"
                    : "Disabled"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ===================================== */}
      {/* USER ACTIVITY */}
      {/* ===================================== */}
      <div>
        <h2 className="mb-4 text-lg font-semibold">
          Activity Overview
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Courses */}
          <Card>
            <CardContent className="flex items-center gap-4 p-5">
              <div className="rounded-xl bg-primary/10 p-3 text-primary">
                <BookOpen className="h-5 w-5" />
              </div>

              <div>
                <p className="text-2xl font-bold">
                  12
                </p>

                <p className="text-sm text-muted-foreground">
                  Courses
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Orders */}
          <Card>
            <CardContent className="flex items-center gap-4 p-5">
              <div className="rounded-xl bg-blue-500/10 p-3 text-blue-600">
                <ShoppingCart className="h-5 w-5" />
              </div>

              <div>
                <p className="text-2xl font-bold">
                  8
                </p>

                <p className="text-sm text-muted-foreground">
                  Orders
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Payments */}
          <Card>
            <CardContent className="flex items-center gap-4 p-5">
              <div className="rounded-xl bg-green-500/10 p-3 text-green-600">
                <CreditCard className="h-5 w-5" />
              </div>

              <div>
                <p className="text-2xl font-bold">
                  $1,240
                </p>

                <p className="text-sm text-muted-foreground">
                  Total Spent
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Reviews */}
          <Card>
            <CardContent className="flex items-center gap-4 p-5">
              <div className="rounded-xl bg-yellow-500/10 p-3 text-yellow-600">
                <StarIcon />
              </div>

              <div>
                <p className="text-2xl font-bold">
                  6
                </p>

                <p className="text-sm text-muted-foreground">
                  Reviews
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ===================================== */}
      {/* USER ID */}
      {/* ===================================== */}
      <Card>
        <CardContent className="flex flex-col gap-2 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium">
              User ID
            </p>

            <p className="mt-1 break-all font-mono text-xs text-muted-foreground">
              {user.id}
            </p>
          </div>

          <span className="text-xs text-muted-foreground">
            This ID will be used by the backend API.
          </span>
        </CardContent>
      </Card>
    </div>
  );
};

/*
 * Small star component kept separate so the main
 * activity cards remain easy to read.
 */
const StarIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
};

export default UserDetailsPage;