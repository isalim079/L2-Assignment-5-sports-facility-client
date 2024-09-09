import { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { BiExit } from "react-icons/bi";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const user = useSelector(selectCurrentUser);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  // console.log(user?.user.role);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <div
        className={`transition-all ease-in-out duration-300 ${
          isScrolled
            ? "fixed top-0 left-0 w-full z-10 shadow-md bg-secondarySite/80"
            : "absolute top-0 left-0 w-full z-10 bg-secondarySite/80"
        }`}
      >
        <div className="max-w-screen-xl mx-auto py-2">
          <div className="flex justify-between items-center">
            {/* -------------------- Logo ------------------------ */}
            <Link to="/">
              <div className="flex items-center gap-3">
                <img className="w-14" src={logo} alt="" />
                <p className="font-archivo text-3xl text-primaryBlack">
                  SFORCE
                </p>
              </div>
            </Link>

            {/* -------------------- Mid Section ------------------------ */}
            <div className="font-poppins">
              <ul className="flex items-center gap-5 ">
                <li>About</li>
                <li>Contact</li>
                <Link to="/facility">
                <li>Facility</li>
                </Link>
                <Link to="/create-bookings">
                  <li>Booking</li>
                </Link>
              </ul>
            </div>

            {/* -------------------- Right Section ------------------------ */}
            <div className="font-poppins flex items-center gap-4">
              {user?.user?.role ? (
                <Link to={`/${user?.user?.role}-dashboard`}>
                  <button className="bg-primarySite px-4 py-2 rounded-md ">
                    Dashboard
                  </button>
                </Link>
              ) : (
                ""
              )}
              {user?.user?.role ? (
                <button
                  className="flex items-center bg-primarySite px-4 py-2 rounded-md gap-2"
                  onClick={handleLogout}
                >
                  Logout <BiExit className="text-lg" />
                </button>
              ) : (
                <Link to="/register">
                  <button className="bg-primarySite px-4 py-2 rounded-md ">
                    Sign Up
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
