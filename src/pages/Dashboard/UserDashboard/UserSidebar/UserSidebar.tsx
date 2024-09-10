import logo from "@/assets/logo.png";
import { logout } from "@/redux/features/auth/authSlice";
import { useState } from "react";
import { BiExit } from "react-icons/bi";
import { MdHome, MdSportsHandball } from "react-icons/md";
import { TbBrandBooking } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineMenuUnfold, AiOutlineMenuFold } from "react-icons/ai";

const UserSidebar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const [menuToggle, setMenuToggle] = useState(false);

  return (
    <div>
      <div className="px-8 py-6 font-poppins  rounded-lg">
        <div className="lg:max-w-60 flex items-center  lg:items-start flex-row-reverse lg:flex-row lg:flex-col justify-between lg:space-y-10 lg:fixed">
          <div className=" flex flex-col items-start">
            <Link to="/">
              <div className="flex gap-2 lg:gap-0 lg:flex-col items-center">
                <img className="w-10" src={logo} alt="" />
                <h1 className="font-archivo text-lg ">SFORCE</h1>
              </div>
            </Link>

            <div className="hidden lg:block">
              <ul className="space-y-3 mt-5">
                <li>
                  <Link
                    className="flex items-center gap-2"
                    to="/user-dashboard"
                  >
                    <MdHome className="text-xl" /> Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    className="flex items-center gap-2"
                    to="/user-dashboard/booking-management"
                  >
                    <MdSportsHandball className="text-xl" /> Bookings
                  </Link>
                </li>
                <li>
                  <Link
                    className="flex items-center gap-2 "
                    to="/user-dashboard/transaction-history"
                  >
                    <TbBrandBooking className="text-xl" /> Transaction History
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="hidden lg:block">
            <button
              className="flex items-center bg-primarySite text-white px-4 py-2 rounded-md gap-2"
              onClick={handleLogout}
            >
              Logout <BiExit className="text-lg" />
            </button>
          </div>

          {/* ----------------------- Mobile section ------------------ */}
          <div className="lg:hidden">
            <button
              className=" text-3xl "
              onClick={() => setMenuToggle(!menuToggle)}
            >
              {menuToggle ? (
                <AiOutlineMenuUnfold></AiOutlineMenuUnfold>
              ) : (
                <AiOutlineMenuFold></AiOutlineMenuFold>
              )}
            </button>
            <div
              className="absolute text-white"
              onClick={() => setMenuToggle(!menuToggle)}
            >
              {menuToggle ? (
                <div className="bg-gray-800 p-6">
                  <div className="space-y-4 text-xs list-none">
                    <div className="font-poppins">
                      <ul className="space-y-3">
                        <li>
                          <Link
                            className="flex items-center gap-2"
                            to="/user-dashboard"
                          >
                            <MdHome className="text-xl" /> Dashboard
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="flex items-center gap-2"
                            to="/user-dashboard/booking-management"
                          >
                            <MdSportsHandball className="text-xl" /> Bookings
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="flex items-center gap-2 "
                            to="/user-dashboard/transaction-history"
                          >
                            <TbBrandBooking className="text-xl" /> Transaction
                            History
                          </Link>
                        </li>
                      </ul>
                      <button
                        className="flex items-center bg-primarySite text-white px-4 py-2 rounded-md gap-2 mt-4"
                        onClick={handleLogout}
                      >
                        Logout <BiExit className="text-lg" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSidebar;
