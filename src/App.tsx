import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Providers } from "./providers";
import { Toaster } from "./components/ui/sonner";

// =========================
// LAYOUTS
// =========================
import PublicLayout from "./layouts/PublicLayout";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import InstructorLayout from "./layouts/InstructorLayout";

// =========================
// PUBLIC PAGES
// =========================
import HomePage from "./pages/public/HomePage";
import CoursesPage from "./pages/public/CoursesPage";
import CourseDetailsPage from "./pages/public/CourseDetailsPage";
import AboutPage from "./pages/public/AboutPage";
import PricingPage from "./pages/public/PricingPage";
import BlogPage from "./pages/public/BlogPage";
import ContactPage from "./pages/public/ContactPage";
import FAQPage from "./pages/public/FAQPage";

// =========================
// AUTH PAGES
// =========================
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import OTPVerificationPage from "./pages/auth/OTPVerificationPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import OAuthCallback from "./pages/auth/OAuthCallback";

// =========================
// AUTH GUARDS
// =========================
import ProtectedRoute from "./auth/ProtectedRoute";
import RoleRoute from "./auth/RoleRoute";

// =========================
// STUDENT PAGES
// =========================
import StudentDashboard from "./pages/student/Dashboard";
import MyCourses from "./pages/student/MyCoursesPage";
import Progress from "./pages/student/ProgressPage";
import Certificates from "./pages/student/CertificatesPage";
import StudentSettings from "./pages/student/SettingsPage";
import StudentProfilePage from "./pages/student/ProfilePage";
import OrderHistoryPage from "./pages/student/OrderHistoryPage";

// =========================
// ADMIN PAGES
// =========================
import DashboardPage from "@/pages/admin/DashboardPage";
import UsersPage from "@/pages/admin/UsersPage";
import UserDetailsPage from "@/pages/admin/UserDetailsPage";
import InstructorsPage from "@/pages/admin/InstructorsPage";
import InstructorDetailsPage from "@/pages/admin/InstructorDetailsPage";
import ACoursesPage from "@/pages/admin/CoursesPage";
import ACourseDetailsPage from "@/pages/admin/CourseDetailsPage";
import CategoriesPage from "@/pages/admin/CategoriesPage";
import OrdersPage from "@/pages/admin/OrdersPage";
import PaymentsPage from "@/pages/admin/PaymentsPage";
import AReviewsPage from "@/pages/admin/ReviewsPage";
import AAssignmentsPage from "@/pages/admin/AssignmentsPage";
import ReportsPage from "@/pages/admin/ReportsPage";
import AAnalyticsPage from "@/pages/admin/AnalyticsPage";
import ProfilePage from "@/pages/admin/ProfilePage";
import SettingsPage from "@/pages/admin/SettingsPage";
import AdminLayout from "@/layouts/AdminLayout";
// =========================
// INSTRUCTOR PAGES
// =========================
import InstructorDashboard from "./pages/instructor/DashboardPage";
import InstructorCoursesPage from "./pages/instructor/CoursesPage";
import CreateCoursePage from "./pages/instructor/CreateCoursePage";
import EditCoursePage from "./pages/instructor/EditCoursePage";
import InstructorStudentsPage from "./pages/instructor/StudentsPage";
import InstructorStudentProfilePage from "./pages/instructor/StudentProfilePage";
import RevenuePage from "./pages/instructor/RevenuePage";
import ReviewsPage from "./pages/instructor/ReviewsPage";
import AnalyticsPage from "./pages/instructor/AnalyticsPage";
import AssignmentsPage from "./pages/instructor/AssignmentsPage";
import InstructorProfilePage from "./pages/instructor/ProfilePage";
import InstructorSettingsPage from "./pages/instructor/SettingsPage";


function App() {
  return (
    <Providers>
      <BrowserRouter>
        <Routes>

          {/* =====================================================
              PUBLIC ROUTES
          ====================================================== */}
          <Route element={<PublicLayout />}>

            <Route
              path="/"
              element={<HomePage />}
            />

            <Route
              path="/courses"
              element={<CoursesPage />}
            />

            <Route
              path="/courses/:id"
              element={<CourseDetailsPage />}
            />

            <Route
              path="/about"
              element={<AboutPage />}
            />

            <Route
              path="/pricing"
              element={<PricingPage />}
            />

            <Route
              path="/blog"
              element={<BlogPage />}
            />

            <Route
              path="/contact"
              element={<ContactPage />}
            />

            <Route
              path="/faq"
              element={<FAQPage />}
            />

          </Route>


          {/* =====================================================
              AUTH ROUTES
          ====================================================== */}
          <Route element={<AuthLayout />}>

            <Route
              path="/login"
              element={<LoginPage />}
            />

            <Route
              path="/register"
              element={<RegisterPage />}
            />

            <Route
              path="/verify-otp"
              element={<OTPVerificationPage />}
            />

            <Route
              path="/forgot-password"
              element={<ForgotPasswordPage />}
            />

            <Route
              path="/oauth-callback"
              element={<OAuthCallback />}
            />

          </Route>


          {/* =====================================================
              STUDENT DASHBOARD
          ====================================================== */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <RoleRoute allowedRoles={["Student"]}>
                  <DashboardLayout />
                </RoleRoute>
              </ProtectedRoute>
            }
          >

            {/* /dashboard → /dashboard/student */}
            <Route
              index
              element={
                <Navigate
                  to="student"
                  replace
                />
              }
            />

            {/* ================= STUDENT DASHBOARD ================= */}

            <Route
              path="student"
              element={<StudentDashboard />}
            />

            {/* ================= MY COURSES ================= */}

            <Route
              path="courses"
              element={<MyCourses />}
            />

            {/* ================= PROFILE ================= */}

            <Route
              path="profile"
              element={<StudentProfilePage />}
            />

            {/* ================= ORDER HISTORY ================= */}

            <Route
              path="orders"
              element={<OrderHistoryPage />}
            />

            {/* ================= PROGRESS ================= */}

            <Route
              path="progress"
              element={<Progress />}
            />

            {/* ================= CERTIFICATES ================= */}

            <Route
              path="certificates"
              element={<Certificates />}
            />

            {/* ================= SETTINGS ================= */}

            <Route
              path="settings"
              element={<StudentSettings />}
            />

          </Route>


          {/* =====================================================
              ADMIN ROUTES
          ====================================================== */}
         <Route path="/admin" element={<AdminLayout />}>
  <Route index element={<DashboardPage />} />

  <Route path="users" element={<UsersPage />} />
  <Route path="users/:id" element={<UserDetailsPage />} />

  <Route path="instructors" element={<InstructorsPage />} />
  <Route
    path="instructors/:id"
    element={<InstructorDetailsPage />}
  />

  <Route path="courses" element={<ACoursesPage />} />
  <Route path="courses/:id" element={<ACourseDetailsPage />} />

  <Route path="categories" element={<CategoriesPage />} />

  <Route path="orders" element={<OrdersPage />} />
  <Route path="payments" element={<PaymentsPage />} />

  <Route path="reviews" element={<AReviewsPage />} />
  <Route path="assignments" element={<AAssignmentsPage />} />

  <Route path="reports" element={<ReportsPage />} />
  <Route path="analytics" element={<AAnalyticsPage />} />

  <Route path="profile" element={<ProfilePage />} />
  <Route path="settings" element={<SettingsPage />} />
</Route>


          {/* =====================================================
              INSTRUCTOR ROUTES
          ====================================================== */}
          <Route
            path="/instructor"
            element={
              <ProtectedRoute>
                <RoleRoute allowedRoles={["Instructor"]}>
                  <InstructorLayout />
                </RoleRoute>
              </ProtectedRoute>
            }
          >

            {/* /instructor → /instructor/dashboard */}
            <Route
              index
              element={
                <Navigate
                  to="dashboard"
                  replace
                />
              }
            />


            {/* =========================
                DASHBOARD
            ========================== */}

            <Route
              path="dashboard"
              element={<InstructorDashboard />}
            />


            {/* =========================
                COURSES
            ========================== */}

            <Route
              path="courses"
              element={<InstructorCoursesPage />}
            />


            {/* =========================
                CREATE COURSE
            ========================== */}

            <Route
              path="courses/create"
              element={<CreateCoursePage />}
            />


            {/* =========================
                EDIT COURSE
            ========================== */}

            <Route
              path="courses/:id/edit"
              element={<EditCoursePage />}
            />


            {/* =========================
                STUDENTS
            ========================== */}

            <Route
              path="students"
              element={<InstructorStudentsPage />}
            />


            {/* =========================
                STUDENT PROFILE
            ========================== */}

            <Route
              path="students/:id"
              element={<InstructorStudentProfilePage />}
            />


            {/* =========================
                REVENUE
            ========================== */}

            <Route
              path="revenue"
              element={<RevenuePage />}
            />


            {/* =========================
                REVIEWS
            ========================== */}

            <Route
              path="reviews"
              element={<ReviewsPage />}
            />


            {/* =========================
                ANALYTICS
            ========================== */}

            <Route
              path="analytics"
              element={<AnalyticsPage />}
            />


            {/* =========================
                ASSIGNMENTS
            ========================== */}

            <Route
              path="assignments"
              element={<AssignmentsPage />}
            />


            {/* =========================
                PROFILE
            ========================== */}

            <Route
              path="profile"
              element={<InstructorProfilePage />}
            />


            {/* =========================
                SETTINGS
            ========================== */}

            <Route
              path="settings"
              element={<InstructorSettingsPage />}
            />

          </Route>


          {/* =====================================================
              FALLBACK
          ====================================================== */}
          <Route
            path="*"
            element={
              <Navigate
                to="/"
                replace
              />
            }
          />

        </Routes>

        {/* TOASTER */}
        <Toaster />

      </BrowserRouter>
    </Providers>
  );
}

export default App;