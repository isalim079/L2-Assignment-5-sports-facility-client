import App from "@/App";
import AdminProtectedRoute from "@/components/layout/AdminProtectedRoute";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import AddAdmin from "@/pages/Dashboard/AdminDashboard/AddAdmin/AddAdmin";
import AdminDashboard from "@/pages/Dashboard/AdminDashboard/AdminDashboard";
import FacilityBookings from "@/pages/Dashboard/AdminDashboard/FacilityBookings/FacilityBookings";
import AddFacility from "@/pages/Dashboard/AdminDashboard/FacilityManagement/AddFacility";
import FacilityManagement from "@/pages/Dashboard/AdminDashboard/FacilityManagement/FacilityManagement";
import UpdateFacility from "@/pages/Dashboard/AdminDashboard/FacilityManagement/UpdateFacility";
import ManageBookings from "@/pages/Dashboard/AdminDashboard/ManageBookings/ManageBookings";
import UserManagement from "@/pages/Dashboard/AdminDashboard/UserManagement/UserMangement";
import Home from "@/pages/Home/Home";
import Login from "@/pages/Login/Login";
import Register from "@/pages/Register/Register";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/admin-dashboard",
        element: (
          <ProtectedRoute>
            <AdminProtectedRoute>
            <AdminDashboard />
            </AdminProtectedRoute>
          </ProtectedRoute>
        ),
        children: [
          {
            path: "usersManagement",
            element: <UserManagement />,
          },
          {
            path: "",
            element: <FacilityBookings />,
          },
          {
            path: "facility-management",
            element: <FacilityManagement />,
          },
          {
            path: "all-bookings",
            element: <ManageBookings />,
          },
          {
            path: "add-admin",
            element: <AddAdmin />,
          },
          {
            path: "add-facility",
            element: <AddFacility />,
          },
          {
            path: "update-facility/:id",
            element: <UpdateFacility />,
          },
        ],
      },
    ],
  },
]);

export default router;
