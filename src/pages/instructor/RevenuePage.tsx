import { useState } from "react";
import {
  DollarSign,
  TrendingUp,
  Clock,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Calendar,
} from "lucide-react";

import InstructorLayout from "@/layouts/InstructorLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const transactions = [
  {
    id: "TXN-1001",
    student: "John Smith",
    course: "React Mastery",
    date: "2026-08-25",
    amount: "$89.99",
    status: "Completed",
  },
  {
    id: "TXN-1002",
    student: "Emily Johnson",
    course: "Node.js Backend Development",
    date: "2026-08-24",
    amount: "$59.99",
    status: "Completed",
  },
  {
    id: "TXN-1003",
    student: "Michael Brown",
    course: "UI/UX Design Fundamentals",
    date: "2026-08-23",
    amount: "$39.99",
    status: "Completed",
  },
  {
    id: "TXN-1004",
    student: "Sarah Wilson",
    course: "React Mastery",
    date: "2026-08-22",
    amount: "$89.99",
    status: "Pending",
  },
  {
    id: "TXN-1005",
    student: "David Miller",
    course: "JavaScript Advanced",
    date: "2026-08-21",
    amount: "$74.99",
    status: "Completed",
  },
];

const monthlyRevenue = [
  { month: "Mar", value: 3200 },
  { month: "Apr", value: 4100 },
  { month: "May", value: 3800 },
  { month: "Jun", value: 5200 },
  { month: "Jul", value: 6100 },
  { month: "Aug", value: 7450 },
];

const RevenuePage = () => {
  const [period, setPeriod] = useState("This Month");

  const totalRevenue = "$42,850";
  const monthlyRevenueValue = "$7,450";
  const pendingRevenue = "$1,240";
  const availableBalance = "$6,210";

  return (
  
      <div className="space-y-8">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black tracking-tight">
              Revenue
            </h1>

            <p className="text-muted-foreground mt-2">
              Track your earnings, transactions, and financial performance.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              {period}
            </Button>

            <Button className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* REVENUE CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

          {/* TOTAL REVENUE */}
          <RevenueCard
            title="Total Revenue"
            value={totalRevenue}
            description="All-time earnings"
            icon={<DollarSign className="h-6 w-6" />}
            trend="+18.2%"
            trendUp
          />

          {/* THIS MONTH */}
          <RevenueCard
            title="This Month"
            value={monthlyRevenueValue}
            description="August 2026"
            icon={<TrendingUp className="h-6 w-6" />}
            trend="+12.5%"
            trendUp
          />

          {/* PENDING */}
          <RevenueCard
            title="Pending"
            value={pendingRevenue}
            description="Awaiting payment"
            icon={<Clock className="h-6 w-6" />}
            trend="4 payments"
          />

          {/* AVAILABLE */}
          <RevenueCard
            title="Available Balance"
            value={availableBalance}
            description="Ready for withdrawal"
            icon={<Wallet className="h-6 w-6" />}
            trend="Withdraw"
          />
        </div>

        {/* REVENUE OVERVIEW */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* CHART */}
          <div className="xl:col-span-2 border rounded-2xl bg-background p-6 shadow-sm">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div>
                <h2 className="text-xl font-bold">
                  Revenue Overview
                </h2>

                <p className="text-sm text-muted-foreground mt-1">
                  Your revenue performance over the last 6 months.
                </p>
              </div>

              <div className="text-right">
                <p className="text-2xl font-black">
                  $29,850
                </p>

                <div className="flex items-center justify-end gap-1 text-sm text-green-600">
                  <ArrowUpRight className="h-4 w-4" />
                  16.4%
                </div>
              </div>
            </div>

            {/* SIMPLE BAR CHART */}
            <div className="h-64 flex items-end justify-between gap-4 px-2">

              {monthlyRevenue.map((item) => {
                const maxValue = 8000;
                const height = (item.value / maxValue) * 100;

                return (
                  <div
                    key={item.month}
                    className="flex-1 flex flex-col items-center justify-end gap-3 h-full"
                  >
                    <div className="w-full flex items-end justify-center h-full">
                      <div
                        className="w-full max-w-[55px] bg-primary/80 hover:bg-primary rounded-t-xl transition-all cursor-pointer"
                        style={{
                          height: `${height}%`,
                        }}
                        title={`$${item.value}`}
                      />
                    </div>

                    <span className="text-xs text-muted-foreground">
                      {item.month}
                    </span>
                  </div>
                );
              })}

            </div>
          </div>

          {/* REVENUE BREAKDOWN */}
          <div className="border rounded-2xl bg-background p-6 shadow-sm">

            <h2 className="text-xl font-bold">
              Revenue Breakdown
            </h2>

            <p className="text-sm text-muted-foreground mt-1">
              Earnings by course.
            </p>

            <div className="mt-8 space-y-6">

              <RevenueBreakdown
                course="React Mastery"
                amount="$3,240"
                percentage={43}
              />

              <RevenueBreakdown
                course="Node.js Backend"
                amount="$1,890"
                percentage={25}
              />

              <RevenueBreakdown
                course="UI/UX Fundamentals"
                amount="$1,420"
                percentage={19}
              />

              <RevenueBreakdown
                course="JavaScript Advanced"
                amount="$900"
                percentage={13}
              />

            </div>
          </div>
        </div>

        {/* TRANSACTIONS */}
        <div className="border rounded-2xl overflow-hidden bg-background shadow-sm">

          {/* TABLE HEADER */}
          <div className="p-6 border-b flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            <div>
              <h2 className="text-xl font-bold">
                Recent Transactions
              </h2>

              <p className="text-sm text-muted-foreground mt-1">
                Your latest course payments.
              </p>
            </div>

            <Button variant="outline" size="sm">
              View All
            </Button>

          </div>

          {/* DESKTOP TABLE */}
          <div className="hidden md:block">

            <div className="grid grid-cols-6 gap-4 p-4 text-sm font-semibold border-b bg-muted/30">

              <span>Transaction</span>
              <span>Student</span>
              <span>Course</span>
              <span>Date</span>
              <span>Amount</span>
              <span>Status</span>

            </div>

            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="grid grid-cols-6 gap-4 items-center p-4 text-sm border-b last:border-b-0 hover:bg-muted/30 transition"
              >

                <span className="font-medium">
                  {transaction.id}
                </span>

                <span>
                  {transaction.student}
                </span>

                <span className="truncate">
                  {transaction.course}
                </span>

                <span className="text-muted-foreground">
                  {transaction.date}
                </span>

                <span className="font-bold">
                  {transaction.amount}
                </span>

                <span>
                  <Badge
                    className={
                      transaction.status === "Completed"
                        ? "bg-green-500/10 text-green-600 hover:bg-green-500/10"
                        : "bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/10"
                    }
                  >
                    {transaction.status}
                  </Badge>
                </span>

              </div>
            ))}

          </div>

          {/* MOBILE TRANSACTIONS */}
          <div className="md:hidden divide-y">

            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="p-5 space-y-4"
              >

                <div className="flex items-center justify-between">

                  <div>
                    <p className="font-semibold">
                      {transaction.course}
                    </p>

                    <p className="text-xs text-muted-foreground mt-1">
                      {transaction.id}
                    </p>
                  </div>

                  <Badge
                    className={
                      transaction.status === "Completed"
                        ? "bg-green-500/10 text-green-600 hover:bg-green-500/10"
                        : "bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/10"
                    }
                  >
                    {transaction.status}
                  </Badge>

                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">

                  <div>
                    <p className="text-muted-foreground">
                      Student
                    </p>

                    <p className="font-medium">
                      {transaction.student}
                    </p>
                  </div>

                  <div>
                    <p className="text-muted-foreground">
                      Amount
                    </p>

                    <p className="font-bold">
                      {transaction.amount}
                    </p>
                  </div>

                  <div>
                    <p className="text-muted-foreground">
                      Date
                    </p>

                    <p>
                      {transaction.date}
                    </p>
                  </div>

                </div>

              </div>
            ))}

          </div>

        </div>

      </div>
    
  );
};

/* =========================================================
   REVENUE CARD
========================================================= */

type RevenueCardProps = {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend: string;
  trendUp?: boolean;
};

const RevenueCard = ({
  title,
  value,
  description,
  icon,
  trend,
  trendUp,
}: RevenueCardProps) => {
  return (
    <div className="border rounded-2xl bg-background p-6 shadow-sm hover:shadow-md transition">

      <div className="flex items-start justify-between">

        <div className="p-3 rounded-xl bg-primary/10 text-primary">
          {icon}
        </div>

        {trendUp && (
          <div className="flex items-center gap-1 text-sm font-semibold text-green-600">
            <ArrowUpRight className="h-4 w-4" />
            {trend}
          </div>
        )}

      </div>

      <div className="mt-6">

        <p className="text-sm text-muted-foreground">
          {title}
        </p>

        <h3 className="text-3xl font-black mt-1">
          {value}
        </h3>

        <p className="text-xs text-muted-foreground mt-2">
          {description}
        </p>

        {!trendUp && trend === "Withdraw" && (
          <Button
            variant="outline"
            size="sm"
            className="mt-4 rounded-full"
          >
            Withdraw Funds
          </Button>
        )}

      </div>

    </div>
  );
};

/* =========================================================
   REVENUE BREAKDOWN
========================================================= */

type RevenueBreakdownProps = {
  course: string;
  amount: string;
  percentage: number;
};

const RevenueBreakdown = ({
  course,
  amount,
  percentage,
}: RevenueBreakdownProps) => {
  return (
    <div>

      <div className="flex items-center justify-between mb-2">

        <span className="text-sm font-medium truncate">
          {course}
        </span>

        <span className="text-sm font-bold ml-3">
          {amount}
        </span>

      </div>

      <div className="h-2 bg-muted rounded-full overflow-hidden">

        <div
          className="h-full bg-primary rounded-full transition-all"
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

      <p className="text-xs text-muted-foreground mt-1">
        {percentage}% of total revenue
      </p>

    </div>
  );
};

export default RevenuePage;