import API from "./auth.api";

export interface PlatformOverviewReport {
  users: {
    total: number;
    breakdown: {
      Admin: number;
      SubAdmin?: number;
      Instructor: number;
      Student: number;
    };
  };
  courses: {
    total: number;
    breakdown: {
      Draft: number;
      Published: number;
      Archived: number;
    };
  };
  enrollments: {
    total: number;
    completed: number;
    completionRatePercent: number;
  };
}

interface PlatformOverviewResponse {
  status: string;
  data: {
    report: PlatformOverviewReport;
  };
}

export async function getAdminDashboardOverview(): Promise<PlatformOverviewReport> {
  const response = await API.get<PlatformOverviewResponse>(
    "/reports/overview"
  );

  return response.data.data.report;
}
