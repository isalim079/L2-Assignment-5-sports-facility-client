import { IoCheckmarkDone } from "react-icons/io5";
import bg from "../../../assets/bannerBg.jpg";
import "animate.css";
import { Link } from "react-router-dom";

const TopBanner = () => {
  return (
    <div className="font-poppins">
      <div className="">
        <div className="relative">
          <img className="h-96 lg:h-auto object-cover" src={bg} alt="" />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute inset-0 text-white flex flex-col justify-center items-center max-w-screen-xl mx-auto space-y-7">
            <h1 className="font-archivo mt-20 lg:mt-0 text-xl text-center lg:text-4xl uppercase animate__animated animate__lightSpeedInLeft">
              Book Your Sports Experience Today
            </h1>
            <p className="text-center text-sm lg:text-base lg:w-[80%] w-[95%] text-justify">
              Find and reserve the best sports facilities in your area with just
              a few clicks. Enjoy hassle-free booking for all your favorite
              sports activities, anytime, anywhere. Unlock exclusive offers and
              promotions, tailored just for you.
            </p>
            <Link to="/create-bookings">
              {" "}
              <button className="bg-primarySite px-4 py-2 rounded-md text-white flex items-center gap-2 animate__animated animate__flash animate__slow animate__repeat-2">
                Book Now <IoCheckmarkDone className="text-2xl" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
