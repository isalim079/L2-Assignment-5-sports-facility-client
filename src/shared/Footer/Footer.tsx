import logo from "@/assets/logo.png";
import { Separator } from "@/components/ui/separator";
import { BsTwitterX, BsYoutube } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="">
      <div className="max-w-screen-xl mx-auto py-10 lg:py-24 font-poppins px-2 lg:px-0">
        <div>
          <div className="flex flex-col justify-center items-center space-y-4">
            {/* ---------------------------------------------------------------- */}
            <img className="w-20" src={logo} alt="" />
            <h1 className="text-xl">
              Stay Connected with{" "}
              <span className="font-archivo text-primaryBlack">SFORCE</span>
            </h1>
            <p className="lg:w-[60%] text-center">
              Get updates on the latest offers, facility openings, and sports
              events. Join our community and never miss out on the action.
            </p>

            <div className="flex items-center justify-center gap-4 text-2xl">
                <FaFacebook className="text-blue-600" />
                <BsTwitterX className="text-primaryBlack" />
                <BsYoutube className="text-red-600" />
            </div>

            {/* --------------------------------------------------------------------- */}
            <Separator className=" bg-primaryBlack/20" />
            <div className="flex h-5 items-center space-x-4 text-sm">
              <div><Link to='/'>Home</Link></div>
              <Separator
                orientation="vertical"
                className=" bg-primaryBlack/40"
              />
              <div><Link to='/aboutUs'>About Us</Link></div>
              <Separator
                orientation="vertical"
                className=" bg-primaryBlack/40"
              />
              <div><Link to='/contactUs'>Contact Us</Link></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
