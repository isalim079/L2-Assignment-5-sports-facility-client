import App from "@/App";
import AdminProtectedRoute from "@/components/layout/AdminProtectedRoute";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import NotFound from "@/components/NotFound/NotFound";
import Checkout from "@/pages/Bookings/Checkout";
import CreateBookings from "@/pages/Bookings/CreateBookings";
import AddAdmin from "@/pages/Dashboard/AdminDashboard/AddAdmin/AddAdmin";
import AdminDashboard from "@/pages/Dashboard/AdminDashboard/AdminDashboard";
import FacilityBookings from "@/pages/Dashboard/AdminDashboard/FacilityBookings/FacilityBookings";
import AddFacility from "@/pages/Dashboard/AdminDashboard/FacilityManagement/AddFacility";
import FacilityManagement from "@/pages/Dashboard/AdminDashboard/FacilityManagement/FacilityManagement";
import UpdateFacility from "@/pages/Dashboard/AdminDashboard/FacilityManagement/UpdateFacility";
import ManageBookings from "@/pages/Dashboard/AdminDashboard/ManageBookings/ManageBookings";
import UserManagement from "@/pages/Dashboard/AdminDashboard/UserManagement/UserMangement";
import TransactionHistory from "@/pages/Dashboard/UserDashboard/TransactionHistory/TransactionHistory";
import UserBookings from "@/pages/Dashboard/UserDashboard/UserBookings/UserBookings";
import UserDashboard from "@/pages/Dashboard/UserDashboard/UserDashboard";
import Facility from "@/pages/Faciltity/Facility";
import Home from "@/pages/Home/Home";
import Login from "@/pages/Login/Login";
import Register from "@/pages/Register/Register";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
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
        path: "/create-bookings",
        element: <CreateBookings />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/facility",
        element: <Facility />,
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
      {
        path: "/user-dashboard",
        element: (
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "",
            element: <UserBookings />,
          },
          {
            path: "booking-management",
            element: <UserBookings />,
          },
          {
            path: "transaction-history",
            element: <TransactionHistory />,
          },
        ]
      },
    ],
  },
]);

export default router;
