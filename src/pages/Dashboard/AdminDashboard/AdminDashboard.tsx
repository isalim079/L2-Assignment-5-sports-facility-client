import { Separator } from "@/components/ui/separator";
import Sidebar from "../Sidebar/Sidebar";
import AdminInfo from "./AdminInfo/AdminInfo";
import FacilityManagement from "./FacilityManagement/FacilityManagement";

const AdminDashboard = () => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-2 bg-secondarySite/20">
        <Sidebar />
      </div>
      <div className="col-span-10 shadow-lg rounded-md p-10">
        <AdminInfo />
        <Separator className="my-5" />
        <div className="grid grid-cols-2 gap-5 mt-12">
          <div>
            <FacilityManagement />
          </div>
          <div>

          </div>
        </div>
      </div>
      
    </div>
  );
};

export default AdminDashboard;
