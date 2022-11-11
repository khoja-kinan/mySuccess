import { Navigate, Routes, Route } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
//
import Login from "./pages/Login";
import DashboardApp from "./pages/DashboardApp";
import User from "./pages/User";
import NotFound from "./pages/Page404";
import RequireAuth from "./components/RequireAuth";
import Unauthorized from "./pages/Unauthorized";
import Libraries from "./pages/Libraries";
import Admins from "./pages/Admins";
import UserChargeRecord from "./pages/UserChargeRecord";
import UserPurchaseRecord from "./pages/UserPurchaseRecord";
import LibraryChargeRecord from "./pages/LibraryChargeRecord";
import ChargeUserBalance from "./pages/ChargeUserBalance";
import LibraryPurchaseRecord from "./pages/LibraryPurchaseRecord";
import Courses from "./pages/Courses";
import CourseVideos from "./pages/CourseVideos";
import OldCourseVideos from "./pages/OldCourseVideos";
import UnitVideos from "./pages/UnitVideos";
import CourseMaterials from "./pages/CourseMaterials";
import UnitMaterials from "./pages/UnitMaterials";
import OldCourseMaterials from "./pages/OldCourseMaterials";
import Questions from "./pages/Questions";
import CourseQuestions from "./pages/CourseQuestions";
import CourseFolders from "./pages/CourseFolders";
import OldUnitVideos from "./pages/OldUnitVideos";
import SupportVideos from "./pages/SupportVideos";
import About from "./pages/About";
import Teachers from "./pages/Teachers";
import TermsOfService from "./pages/TermsOfService";

// ----------------------------------------------------------------------

export default function Router() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="login" element={<Login />} />
      <Route path="/" element={<LogoOnlyLayout />}>
        <Route path="404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" />} />
        <Route path="unauthorized" element={<Unauthorized />} />
      </Route>

      {/* Protected Routes */}

      <Route
        element={
          <RequireAuth
            allowedRoles={[
              "all-questions-list",
              "library-show",
              "charge-list",
              "library-charge-list",
            ]}
          />
        }
      >
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route element={<RequireAuth allowedRoles={["role-list"]} />}>
            <Route path="app" element={<DashboardApp />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={["user-list"]} />}>
            <Route path="user" element={<User />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={["library-show"]} />}>
            <Route path="libraries" element={<Libraries />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={["role-list"]} />}>
            <Route path="admins" element={<Admins />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={["role-list"]} />}>
            <Route path="teachers" element={<Teachers />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={["user-charge-list"]} />}>
            <Route
              path="user-charge-record/:user_id"
              element={<UserChargeRecord />}
            />
          </Route>
          <Route element={<RequireAuth allowedRoles={["user-payment-list"]} />}>
            <Route
              path="user-purchase-record/:user_id"
              element={<UserPurchaseRecord />}
            />
          </Route>
          <Route
            element={<RequireAuth allowedRoles={["library-charge-list"]} />}
          >
            <Route
              path="library-charge-record/:user_id"
              element={<LibraryChargeRecord />}
            />
          </Route>
          <Route
            element={<RequireAuth allowedRoles={["library-charge-list"]} />}
          >
            <Route
              path="library-purchase-record/:user_id"
              element={<LibraryPurchaseRecord />}
            />
          </Route>
          <Route element={<RequireAuth allowedRoles={["charge-user"]} />}>
            <Route path="charge-user-balance" element={<ChargeUserBalance />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={["courses-list"]} />}>
            <Route path="courses" element={<Courses />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={["courses-list"]} />}>
            <Route
              path="courses/:courseId/video-units"
              element={<CourseVideos />}
            />
          </Route>
          <Route element={<RequireAuth allowedRoles={["courses-list"]} />}>
            <Route path="unit/:unitId/videos" element={<UnitVideos />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={["courses-list"]} />}>
            <Route
              path="courses/:courseId/folders"
              element={<CourseFolders />}
            />
          </Route>
          <Route element={<RequireAuth allowedRoles={["courses-list"]} />}>
            <Route
              path="folder/:folderId/material-units"
              element={<CourseMaterials />}
            />
          </Route>
          <Route element={<RequireAuth allowedRoles={["courses-list"]} />}>
            <Route path="unit/:unitId/materials" element={<UnitMaterials />} />
          </Route>
          {/* old courses */}
          <Route element={<RequireAuth allowedRoles={["courses-list"]} />}>
            <Route
              path="old-courses/:courseId/video-units"
              element={<OldCourseVideos />}
            />
          </Route>
          <Route element={<RequireAuth allowedRoles={["courses-list"]} />}>
            <Route
              path="old-courses/unit/:unitId/videos"
              element={<OldUnitVideos />}
            />
          </Route>
          <Route element={<RequireAuth allowedRoles={["courses-list"]} />}>
            <Route
              path="old-courses/:courseId/material-units"
              element={<OldCourseMaterials />}
            />
          </Route>
          <Route
            element={<RequireAuth allowedRoles={["all-questions-list"]} />}
          >
            <Route path="questions" element={<Questions />} />
          </Route>
          <Route
            element={<RequireAuth allowedRoles={["all-questions-list"]} />}
          >
            <Route
              path="questions/course/:courseId"
              element={<CourseQuestions />}
            />
          </Route>
          <Route element={<RequireAuth allowedRoles={["support-create"]} />}>
            <Route path="support" element={<SupportVideos />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={["about-add"]} />}>
            <Route path="about" element={<About />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={["about-add"]} />}>
            <Route path="terms-of-service" element={<TermsOfService />} />
          </Route>
        </Route>
      </Route>

      {/* Catch All */}
      <Route path="*" element={<Navigate to="/404" />} replace />
    </Routes>
  );
}
