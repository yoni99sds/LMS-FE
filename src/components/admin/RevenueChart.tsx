import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  CalendarDays,
} from "lucide-react";

import { useMemo } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RevenueData {
  month: string;
  revenue: number;
  orders: number;
}

interface RevenueChartProps {
  title?: string;
  description?: string;
}

const revenueData: RevenueData[] = [
  {
    month: "Jan",
    revenue: 42000,
    orders: 38,
  },
  {
    month: "Feb",
    revenue: 51000,
    orders: 46,
  },
  {
    month: "Mar",
    revenue: 47000,
    orders: 42,
  },
  {
    month: "Apr",
    revenue: 63000,
    orders: 57,
  },
  {
    month: "May",
    revenue: 59000,
    orders: 53,
  },
  {
    month: "Jun",
    revenue: 72000,
    orders: 65,
  },
  {
    month: "Jul",
    revenue: 68000,
    orders: 61,
  },
  {
    month: "Aug",
    revenue: 81000,
    orders: 74,
  },
  {
    month: "Sep",
    revenue: 88000,
    orders: 82,
  },
  {
    month: "Oct",
    revenue: 94000,
    orders: 87,
  },
  {
    month: "Nov",
    revenue: 102000,
    orders: 94,
  },
  {
    month: "Dec",
    revenue: 114000,
    orders: 105,
  },
];

const RevenueChart = ({
  title = "Revenue Overview",
  description = "Monthly revenue generated from course sales.",
}: RevenueChartProps) => {
  /*
   * ============================================
   * STATE
   * ============================================
   */

  const currentYear = new Date().getFullYear();

  /*
   * ============================================
   * DATA
   * ============================================
   */

  const chartData = useMemo(
    () => revenueData,
    []
  );

  /*
   * ============================================
   * STATISTICS
   * ============================================
   */

  const totalRevenue = chartData.reduce(
    (sum, item) =>
      sum + item.revenue,
    0
  );

  const totalOrders = chartData.reduce(
    (sum, item) =>
      sum + item.orders,
    0
  );

  const averageRevenue =
    chartData.length > 0
      ? Math.round(
          totalRevenue /
            chartData.length
        )
      : 0;

  const maxRevenue = Math.max(
    ...chartData.map(
      (item) => item.revenue
    ),
    1
  );

  const firstMonthRevenue =
    chartData[0]?.revenue ?? 0;

  const lastMonthRevenue =
    chartData[
      chartData.length - 1
    ]?.revenue ?? 0;

  const revenueGrowth =
    firstMonthRevenue > 0
      ? Math.round(
          ((lastMonthRevenue -
            firstMonthRevenue) /
            firstMonthRevenue) *
            100
        )
      : 0;

  /*
   * ============================================
   * HELPERS
   * ============================================
   */

  const formatRevenue = (
    value: number
  ) => {
    if (value >= 1_000_000) {
      return `${(
        value / 1_000_000
      ).toFixed(1)}M`;
    }

    if (value >= 1_000) {
      return `${Math.round(
        value / 1_000
      )}K`;
    }

    return value.toString();
  };

  return (
    <Card className="rounded-xl">
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <BarChart3 className="h-4 w-4" />
              </div>

              <CardTitle className="text-base">
                {title}
              </CardTitle>
            </div>

            <p className="mt-2 text-sm text-muted-foreground">
              {description}
            </p>
          </div>

          <Select defaultValue="12">
            <SelectTrigger className="w-[150px] rounded-xl">
              <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />

              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="3">
                Last 3 Months
              </SelectItem>

              <SelectItem value="6">
                Last 6 Months
              </SelectItem>

              <SelectItem value="12">
                Last 12 Months
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        {/* =================================== */}
        {/* SUMMARY */}
        {/* =================================== */}

        <div className="grid gap-4 border-b pb-6 sm:grid-cols-3">
          <div>
            <p className="text-sm text-muted-foreground">
              Total Revenue
            </p>

            <p className="mt-1 text-2xl font-bold">
              {totalRevenue.toLocaleString()} ETB
            </p>

            <div className="mt-2 flex items-center gap-1 text-xs text-green-600">
              {revenueGrowth >= 0 ? (
                <ArrowUpRight className="h-3.5 w-3.5" />
              ) : (
                <ArrowDownRight className="h-3.5 w-3.5" />
              )}

              {Math.abs(revenueGrowth)}%
              growth
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Total Orders
            </p>

            <p className="mt-1 text-2xl font-bold">
              {totalOrders.toLocaleString()}
            </p>

            <p className="mt-2 text-xs text-muted-foreground">
              Course purchases
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Average Monthly Revenue
            </p>

            <p className="mt-1 text-2xl font-bold">
              {averageRevenue.toLocaleString()}{" "}
              ETB
            </p>

            <p className="mt-2 text-xs text-muted-foreground">
              {currentYear} average
            </p>
          </div>
        </div>

        {/* =================================== */}
        {/* CHART */}
        {/* =================================== */}

        <div className="mt-8">
          <div className="flex h-[280px] gap-4">
            {/* Y AXIS */}

            <div className="flex w-12 flex-col justify-between pb-7 text-right text-xs text-muted-foreground">
              <span>
                {formatRevenue(
                  maxRevenue
                )}
              </span>

              <span>
                {formatRevenue(
                  maxRevenue * 0.75
                )}
              </span>

              <span>
                {formatRevenue(
                  maxRevenue * 0.5
                )}
              </span>

              <span>
                {formatRevenue(
                  maxRevenue * 0.25
                )}
              </span>

              <span>0</span>
            </div>

            {/* CHART */}

            <div className="relative flex flex-1 items-end gap-2 border-b border-l pb-7 pl-3">
              {/* GRID */}

              <div className="pointer-events-none absolute inset-0 flex flex-col justify-between pb-7 pl-3">
                <div className="border-t border-dashed" />
                <div className="border-t border-dashed" />
                <div className="border-t border-dashed" />
                <div className="border-t border-dashed" />
                <div className="border-t" />
              </div>

              {chartData.map(
                (item) => {
                  const height =
                    (item.revenue /
                      maxRevenue) *
                    215;

                  return (
                    <div
                      key={item.month}
                      className="relative z-10 flex min-w-[28px] flex-1 flex-col items-center justify-end gap-2"
                    >
                      <div
                        className="w-full max-w-[42px] rounded-t-lg bg-primary transition-opacity hover:opacity-80"
                        style={{
                          height: `${height}px`,
                        }}
                        title={`${item.revenue.toLocaleString()} ETB`}
                      />

                      <span className="absolute -bottom-6 text-[10px] text-muted-foreground sm:text-xs">
                        {item.month}
                      </span>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>

        {/* =================================== */}
        {/* FOOTER */}
        {/* =================================== */}

        <div className="mt-8 flex flex-col gap-3 rounded-xl border bg-muted/20 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium">
              Revenue performance
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Revenue increased from{" "}
              {firstMonthRevenue.toLocaleString()}{" "}
              ETB to{" "}
              {lastMonthRevenue.toLocaleString()}{" "}
              ETB during the displayed period.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm font-semibold text-green-600">
            <ArrowUpRight className="h-4 w-4" />

            {revenueGrowth}%
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;