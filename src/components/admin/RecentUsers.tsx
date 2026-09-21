import {
  ArrowRight,
  UserRound,
  Users,
} from "lucide-react";

import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface RecentUser {
  id: string;
  name: string;
  email: string;
  role: "Student" | "Instructor" | "Admin";
  status: "Active" | "Inactive";
  joinedAt: string;
}

const recentUsersData: RecentUser[] = [
  {
    id: "user-001",
    name: "Abel Tesfaye",
    email: "abel@example.com",
    role: "Student",
    status: "Active",
    joinedAt: "Today",
  },
  {
    id: "user-002",
    name: "Sara Mohammed",
    email: "sara@example.com",
    role: "Student",
    status: "Active",
    joinedAt: "Today",
  },
  {
    id: "user-003",
    name: "Michael Brown",
    email: "michael@example.com",
    role: "Instructor",
    status: "Active",
    joinedAt: "Yesterday",
  },
  {
    id: "user-004",
    name: "Hana Alemu",
    email: "hana@example.com",
    role: "Student",
    status: "Active",
    joinedAt: "Yesterday",
  },
  {
    id: "user-005",
    name: "Daniel Wilson",
    email: "daniel@example.com",
    role: "Instructor",
    status: "Inactive",
    joinedAt: "2 days ago",
  },
];

const RecentUsers = () => {
  const navigate = useNavigate();

  /*
   * ============================================
   * DATA
   * ============================================
   */

  const recentUsers = useMemo(
    () => recentUsersData.slice(0, 5),
    []
  );

  /*
   * ============================================
   * HANDLERS
   * ============================================
   */

  const handleViewUser = (id: string) => {
    navigate(`/admin/users/${id}`);
  };

  const handleViewAll = () => {
    navigate("/admin/users");
  };

  /*
   * ============================================
   * HELPERS
   * ============================================
   */

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const getRoleClasses = (
    role: RecentUser["role"]
  ) => {
    if (role === "Instructor") {
      return "bg-blue-500/10 text-blue-600";
    }

    if (role === "Admin") {
      return "bg-purple-500/10 text-purple-600";
    }

    return "bg-primary/10 text-primary";
  };

  const getStatusClasses = (
    status: RecentUser["status"]
  ) => {
    if (status === "Active") {
      return "bg-green-500/10 text-green-600";
    }

    return "bg-muted text-muted-foreground";
  };

  return (
    <Card className="rounded-xl">
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <div>
          <CardTitle className="text-base">
            Recent Users
          </CardTitle>

          <p className="mt-1 text-sm text-muted-foreground">
            Recently registered users on the platform.
          </p>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleViewAll}
          className="rounded-lg"
        >
          View All

          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="p-0">
        {recentUsers.length > 0 ? (
          <div className="divide-y">
            {recentUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-4 px-6 py-4 transition hover:bg-muted/20"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-semibold text-primary">
                  {getInitials(user.name)}
                </div>

                <div className="min-w-0 flex-1">
                  <button
                    type="button"
                    onClick={() =>
                      handleViewUser(user.id)
                    }
                    className="block max-w-full truncate text-left text-sm font-semibold hover:text-primary"
                  >
                    {user.name}
                  </button>

                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {user.email}
                  </p>
                </div>

                <div className="hidden items-center gap-2 sm:flex">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getRoleClasses(
                      user.role
                    )}`}
                  >
                    {user.role}
                  </span>

                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClasses(
                      user.status
                    )}`}
                  >
                    {user.status}
                  </span>
                </div>

                <div className="hidden text-right md:block">
                  <p className="text-xs text-muted-foreground">
                    {user.joinedAt}
                  </p>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    handleViewUser(user.id)
                  }
                  className="rounded-lg"
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
            <div className="rounded-full bg-muted p-4">
              <Users className="h-6 w-6 text-muted-foreground" />
            </div>

            <h3 className="mt-4 font-semibold">
              No recent users
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              New users will appear here.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentUsers;