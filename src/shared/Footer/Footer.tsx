import logo from "@/assets/logo.png";
import { Separator } from "@/components/ui/separator";
import { BsTwitterX, BsYoutube } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-secondarySite">
      <div className="max-w-screen-xl mx-auto py-24 font-poppins">
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
              <div>Home</div>
              <Separator
                orientation="vertical"
                className=" bg-primaryBlack/40"
              />
              <div>About Us</div>
              <Separator
                orientation="vertical"
                className=" bg-primaryBlack/40"
              />
              <div>Contact Us</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
