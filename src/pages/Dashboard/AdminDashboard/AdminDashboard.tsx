import { Separator } from "@/components/ui/separator";
import Sidebar from "../Sidebar/Sidebar";
import AdminInfo from "./AdminInfo/AdminInfo";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12">
      <div className="lg:col-span-2 bg-secondarySite/20">
        <Sidebar />
      </div>
      <div className="lg:col-span-10 shadow-lg rounded-md lg:p-10 bg-bg4 bg-cover">
        <AdminInfo />
        <Separator className="my-5" />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
