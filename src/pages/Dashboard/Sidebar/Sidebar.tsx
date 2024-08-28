import logo from "@/assets/logo.png";
import { logout } from "@/redux/features/auth/authSlice";
import { BiExit } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { MdSportsHandball } from "react-icons/md";
import { TbBrandBooking } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <div className="px-8 py-6 font-poppins  rounded-lg">
        <div className="max-w-32 flex items-start flex-col justify-between space-y-10 fixed">
          <div className=" flex flex-col items-start">
            <Link to="/">
              <div className="flex flex-col items-center">
                <img className="w-10" src={logo} alt="" />
                <h1 className="font-archivo text-lg ">SFORCE</h1>
              </div>
            </Link>
            <div>
              <ul className="space-y-3 mt-5">
                <li className="flex items-center gap-2">
                  <MdSportsHandball className="text-xl" /> Facility
                </li>
                <li className="flex items-center gap-2">
                  <TbBrandBooking className="text-xl" /> Bookings
                </li>
                <li className="flex items-center gap-2">
                  <FaUsers className="text-xl" /> Users
                </li>
              </ul>
            </div>
          </div>
          <div>
            <button
              className="flex items-center bg-primarySite text-white px-4 py-2 rounded-md gap-2"
              onClick={handleLogout}
            >
              Logout <BiExit className="text-lg" />
            </button>
          </div>
        </div>
      
      </div>
    </div>
  );
};

export default Sidebar;
