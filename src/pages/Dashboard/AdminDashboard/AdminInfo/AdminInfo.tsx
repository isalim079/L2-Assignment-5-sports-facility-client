import admin from "@/assets/admin.png";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { MdEmail, MdLocationCity, MdPhone } from "react-icons/md";
import { useSelector } from "react-redux";

const AdminInfo = () => {
  const user = useSelector(selectCurrentUser);

  const userInfo = user?.userInfo;


  return (
    <div>
      <div className="font-poppins">
        <div className="flex items-center gap-7">
          <img className="w-32" src={admin} alt="" />
          <div className="space-y-1">
            <p className="bg-primaryBlack text-white font-light text-xs max-w-20 text-center py-1 rounded-md mb-2">
              {userInfo?.role === "admin" && "Admin"}
            </p>
            <h1 className="text-2xl font-bold">{userInfo?.name}</h1>
            <p className="flex items-center gap-2"><MdEmail className="" /> {userInfo?.email}</p>
            <p className="flex items-center gap-2"><MdPhone className="" /> {userInfo?.phone}</p>
            <p className="flex items-center gap-2"><MdLocationCity className="" /> {userInfo?.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminInfo;
