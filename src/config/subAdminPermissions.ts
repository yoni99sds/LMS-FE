
export const SUBADMIN_PERMISSIONS = {
  DASHBOARD_VIEW: "dashboard:view",

  STUDENTS_VIEW: "students:view",
  STUDENTS_CREATE: "students:create",
  STUDENTS_UPDATE: "students:update",
  STUDENTS_STATUS_UPDATE: "students:status:update",

  INSTRUCTORS_VIEW: "instructors:view",
  INSTRUCTORS_CREATE: "instructors:create",
  INSTRUCTORS_UPDATE: "instructors:update",
  INSTRUCTORS_STATUS_UPDATE: "instructors:status:update",

  COURSES_VIEW: "courses:view",
  COURSES_UPDATE: "courses:update",
  COURSES_REVIEW: "courses:review",

  CATEGORIES_VIEW: "categories:view",

  ASSIGNMENTS_VIEW: "assignments:view",
  ASSIGNMENTS_MANAGE: "assignments:manage",

  REVIEWS_VIEW: "reviews:view",
  REVIEWS_MODERATE: "reviews:moderate",

  REPORTS_VIEW: "reports:view",
  REPORTS_EXPORT: "reports:export",

  ANALYTICS_VIEW: "analytics:view",

  ORDERS_VIEW: "orders:view",
  PAYMENTS_VIEW: "payments:view",

  PROFILE_VIEW: "profile:view",
} as const;

export type SubAdminPermission =
  (typeof SUBADMIN_PERMISSIONS)[keyof typeof SUBADMIN_PERMISSIONS];

export const hasPermission = (
  userPermissions: string[] | undefined,
  requiredPermission: string,
): boolean => {
  return Array.isArray(userPermissions) &&
    userPermissions.includes(requiredPermission);
};

export const hasAnyPermission = (
  userPermissions: string[] | undefined,
  requiredPermissions: string[],
): boolean => {
  return requiredPermissions.some((permission) =>
    hasPermission(userPermissions, permission),
  );
};
