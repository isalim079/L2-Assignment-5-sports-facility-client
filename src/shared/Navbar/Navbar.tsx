import { useEffect, useState } from "react";
import logo from "../../assets/logo.png";

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
        className={`absolute z-10 w-full bg-secondarySite/80 ${
          isScrolled ? "sticky top-0 z-10 shadow-md" : ""
        }`}
      >
        <div className="max-w-screen-xl mx-auto py-3">
          <div className="flex justify-between items-center">
            {/* -------------------- Logo ------------------------ */}
            <div className="flex items-center gap-3">
              <img className="w-14" src={logo} alt="" />
              <p className="font-archivo text-3xl text-primaryBlack">SFORCE</p>
            </div>

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
              <button className="bg-primarySite px-4 py-2 rounded-md text-white">
                Dashboard
              </button>
              <button className="bg-primarySite px-4 py-2 rounded-md text-white">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
