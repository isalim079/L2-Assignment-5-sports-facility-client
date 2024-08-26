import bg from "../../assets/register.jpg";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/authSlice";
import { verifyToken } from "@/utiles/verifyToken";

const Login = () => {

    const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
        email: "srs@mail.com",
        password: "programming-hero"
    }
  });

  const [login] = useLoginMutation()


  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const userInfo = {
        email: data.email,
        password: data.password
    }
   const res = await login(userInfo).unwrap()

   const user = verifyToken(res.token)

   dispatch(setUser({user: user, token: res.token}))
  };

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
                  Login to <span className="font-archivo">SFORCE</span>
                </h1>
              </div>

              {/* ------------- Input container --------------- */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                <div>
                  <label htmlFor="name" className="block mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    className="py-2 px-3 rounded-md text-primaryBlack"
                    {...register("email", { required: true })}
                  />
                  {errors.email && (
                    <span className="text-xs mt-1 block">
                      * This field is required
                    </span>
                  )}
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
                    {...register("password", { required: true })}
                  />
                  {errors.password && (
                    <span className="text-xs mt-1 block">
                      * This field is required
                    </span>
                  )}
                </div>

                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="bg-primarySite w-full py-2 rounded-md text-white"
                  >
                    Login
                  </button>
                  <p className="text-sm mt-3">
                    Don't have an account?{" "}
                    <span className="ml-2 font-bold underline cursor-pointer">
                      <Link to="/register">Register</Link>
                    </span>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
