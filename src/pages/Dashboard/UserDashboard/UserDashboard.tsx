import { Separator } from "@/components/ui/separator";
import { Outlet } from "react-router-dom";
import UserInfo from "./UserInfo/UserInfo";
import UserSidebar from "./UserSidebar/UserSidebar";

const UserDashboard = () => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-2 bg-secondarySite/20">
        <UserSidebar />
      </div>
      <div className="col-span-10 shadow-lg rounded-md p-10 bg-bg4 bg-cover">
        <UserInfo/>
        <Separator className="my-5" />
        <Outlet />
      </div>
    </div>
  );
};

export default UserDashboard;
