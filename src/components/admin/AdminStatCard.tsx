import {
  ArrowDownRight,
  ArrowUpRight,
  Minus,
  type LucideIcon,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

type TrendDirection = "up" | "down" | "neutral";

interface AdminStatCardProps {
  title: string;
  value: string | number;
  description?: string;
  trend?: string;
  trendDirection?: TrendDirection;
  icon: LucideIcon;
  iconClassName?: string;
}

const AdminStatCard = ({
  title,
  value,
  description,
  trend,
  trendDirection = "neutral",
  icon: Icon,
  iconClassName = "bg-primary/10 text-primary",
}: AdminStatCardProps) => {
  const getTrendClasses = (
    direction: TrendDirection
  ) => {
    if (direction === "up") {
      return "text-green-600";
    }

    if (direction === "down") {
      return "text-red-500";
    }

    return "text-muted-foreground";
  };

  return (
    <Card className="rounded-xl">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-sm font-medium text-muted-foreground">
              {title}
            </p>

            <p className="mt-2 truncate text-2xl font-bold tracking-tight">
              {value}
            </p>

            {(trend || description) && (
              <div className="mt-2 flex flex-wrap items-center gap-2">
                {trend && (
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-medium ${getTrendClasses(
                      trendDirection
                    )}`}
                  >
                    {trendDirection === "up" && (
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    )}

                    {trendDirection === "down" && (
                      <ArrowDownRight className="h-3.5 w-3.5" />
                    )}

                    {trendDirection === "neutral" && (
                      <Minus className="h-3.5 w-3.5" />
                    )}

                    {trend}
                  </span>
                )}

                {description && (
                  <span className="text-xs text-muted-foreground">
                    {description}
                  </span>
                )}
              </div>
            )}
          </div>

          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconClassName}`}
          >
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminStatCard;