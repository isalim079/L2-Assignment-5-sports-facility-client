import error from "@/assets/error.png";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className=" h-screen flex flex-col justify-center items-center">
      <img className="w-60" src={error} alt="" />
      <Link to={"/"}>
        {" "}
        <button className="bg-gray-600 px-4 py-2 rounded-md shadow-md text-white mt-5">
          Home
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
