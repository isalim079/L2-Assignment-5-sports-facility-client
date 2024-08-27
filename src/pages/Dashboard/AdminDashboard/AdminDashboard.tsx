import Sidebar from "../Sidebar/Sidebar";
import AdminInfo from "./AdminInfo/AdminInfo";

const AdminDashboard = () => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-1">
        <Sidebar />
      </div>
      <div className="col-span-8 shadow-lg rounded-md">
        <AdminInfo />
      </div>
      <div className="col-span-3">

      </div>
    </div>
  );
};

export default AdminDashboard;
