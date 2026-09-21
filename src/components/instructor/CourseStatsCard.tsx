import {
  ArrowUpRight,
  ArrowDownRight,
  LucideIcon,
} from "lucide-react";

type Props = {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: number;
  trendLabel?: string;
};

const CourseStatsCard = ({
  title,
  value,
  icon: Icon,
  description,
  trend,
  trendLabel = "from last month",
}: Props) => {
  const hasTrend = typeof trend === "number";
  const isPositive = trend !== undefined && trend >= 0;

  return (
    <div className="group bg-background border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex items-start justify-between gap-4">
        {/* ICON */}
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-105">
          <Icon className="h-6 w-6" />
        </div>

        {/* TREND */}
        {hasTrend && (
          <div
            className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
              isPositive
                ? "bg-green-500/10 text-green-600"
                : "bg-red-500/10 text-red-600"
            }`}
          >
            {isPositive ? (
              <ArrowUpRight className="h-3.5 w-3.5" />
            ) : (
              <ArrowDownRight className="h-3.5 w-3.5" />
            )}

            {Math.abs(trend)}%
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="mt-5">
        <p className="text-sm font-medium text-muted-foreground">
          {title}
        </p>

        <h3 className="mt-1 text-3xl font-black tracking-tight">
          {value}
        </h3>

        {description && (
          <p className="mt-2 text-xs text-muted-foreground">
            {description}
          </p>
        )}

        {hasTrend && (
          <p className="mt-2 text-xs text-muted-foreground">
            <span
              className={
                isPositive ? "text-green-600 font-medium" : "text-red-600 font-medium"
              }
            >
              {isPositive ? "+" : ""}
              {trend}%
            </span>{" "}
            {trendLabel}
          </p>
        )}
      </div>
    </div>
  );
};

export default CourseStatsCard;