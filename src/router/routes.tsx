import App from "@/App";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import AdminDashboard from "@/pages/Dashboard/AdminDashboard/AdminDashboard";
import FacilityBookings from "@/pages/Dashboard/AdminDashboard/FacilityBookings/FacilityBookings";
import FacilityManagement from "@/pages/Dashboard/AdminDashboard/FacilityManagement/FacilityManagement";
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
            <AdminDashboard />
          </ProtectedRoute>
        ),
        children: [
          {
            path: 'usersManagement',
            element: <UserManagement />
          },
          {
            path: '',
            element: <FacilityBookings />
          },
          {
            path: 'facility-management',
            element: <FacilityManagement />
          },
          {
            path: 'all-bookings',
            element: <ManageBookings />
          },
        ]
      },
    ],
  },
]);

export default router;
