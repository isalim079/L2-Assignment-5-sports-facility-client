import bg from "../../assets/register.jpg";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div>
      <div>
        <div className="relative font-poppins">
          <img className="w-full object-cover h-[100vh]" src={bg} alt="" />
          <div className="absolute inset-0 bg-primaryBlack/70"></div>
          <div className="absolute text-white inset-0 flex flex-col justify-center items-center">
            <div className="bg-white/30 p-10 rounded-lg shadow-md">
              <div className="flex flex-col justify-center items-center mb-10">
                <img
                  className="w-14 animate__animated animate__bounceInDown"
                  src={logo}
                  alt=""
                />
                <h1 className="text-xl font-semibold">
                  Register to <span className="font-archivo">SFORCE</span>
                </h1>
              </div>

              {/* ------------- Input container --------------- */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:col-span-2">
                  <label htmlFor="name" className="block mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter your name"
                    className="py-2 px-3 rounded-md w-full text-primaryBlack"
                  />
                </div>
                <div>
                  <label htmlFor="name" className="block mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    className="py-2 px-3 rounded-md text-primaryBlack"
                  />
                </div>
                <div>
                  <label htmlFor="name" className="block mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    className="py-2 px-3 rounded-md text-primaryBlack"
                  />
                </div>
                <div>
                  <label htmlFor="name" className="block mb-1">
                    Phone
                  </label>
                  <input
                    type="text"
                    id="phone"
                    placeholder="Enter your phone number"
                    className="py-2 px-3 rounded-md text-primaryBlack"
                  />
                </div>
                <div>
                  <label htmlFor="name" className="block mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    placeholder="Enter your phone address"
                    className="py-2 px-3 rounded-md text-primaryBlack"
                  />
                </div>
                <div className="md:col-span-2">
                  <button className="bg-primarySite w-full py-2 rounded-md text-white">
                    Register
                  </button>
                  <p className="text-sm mt-3">
                    Already have an account?{" "}
                    <span className="ml-2 font-bold underline cursor-pointer">
                      <Link to="/login">Login</Link>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
