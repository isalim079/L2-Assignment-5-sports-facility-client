import { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
            <Link to='/'>
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
                <li>Facility</li>
                <li>Booking</li>
              </ul>
            </div>

            {/* -------------------- Right Section ------------------------ */}
            <div className="font-poppins flex items-center gap-4">
              <Link to="/admin-dashboard">
                <button className="bg-primarySite px-4 py-2 rounded-md text-white">
                  Dashboard
                </button>
              </Link>
              <Link to="/register">
                <button className="bg-primarySite px-4 py-2 rounded-md text-white">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
