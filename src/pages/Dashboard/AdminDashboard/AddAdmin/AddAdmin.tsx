import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import admin1 from "@/assets/admin1.png";
import { Separator } from "@/components/ui/separator";

const AddAdmin = () => {
  const { register, handleSubmit, reset } = useForm();

  const [addAdmin] = useRegisterMutation();
  // console.log(error);

  const onSubmit = async (data: FieldValues) => {
    // console.log(data);

    const userInfo = {
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      role: data.role,
      address: data.address,
    };

    const res = await addAdmin(userInfo).unwrap();
    if (res.success === true) {
      toast.success("Admin has successfully created");
      reset();
    } else {
      toast.error("Something went wrong");
    }

    // console.log(res.success);
  };

  return (
    <div>
      <div>
        <div className="flex items-center justify-center gap-3 mt-16 mb-5">
          <img className="w-12" src={admin1} alt="" />
          <h1 className=" font-bold text-3xl text-primarySite">Add admin</h1>
        </div>
        <Separator className="mb-10 max-w-96 mx-auto" />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-[520px] shadow-md p-2 lg:p-10 rounded-md bg-white/60 mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:col-span-2">
              <label htmlFor="name" className="block mb-1">
                Name *
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                className="py-2 px-3 rounded-md w-full text-secondarySite bg-primaryBlack border"
                {...register("name", { required: true })}
              />
            </div>
            <div>
              <label htmlFor="name" className="block mb-1">
                Email *
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="py-2 px-3 rounded-md text-secondarySite bg-primaryBlack border"
                {...register("email", { required: true })}
              />
            </div>
            <div>
              <label htmlFor="name" className="block mb-1">
                Password *
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="py-2 px-3 rounded-md text-secondarySite bg-primaryBlack border"
                {...register("password", { required: true })}
              />
            </div>
            <div>
              <label htmlFor="name" className="block mb-1">
                Phone *
              </label>
              <input
                type="text"
                id="phone"
                placeholder="Enter your phone number"
                className="py-2 px-3 rounded-md text-secondarySite bg-primaryBlack border"
                {...register("phone", { required: true })}
              />
            </div>
            <div>
              <label htmlFor="role" className="block mb-1">
                Role *
              </label>
              <select
                defaultValue={"admin"}
                id="role"
                className="w-full text-secondarySite bg-primaryBlack py-2 px-3 rounded-md"
                {...register("role", { required: true })}
              >
                <option value="admin">admin</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="address" className="block mb-1">
                Address *
              </label>
              <input
                type="text"
                id="address"
                placeholder="Enter your phone address"
                className="py-2 px-3 rounded-md text-secondarySite bg-primaryBlack border w-full"
                {...register("address", { required: true })}
              />
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="bg-primaryBlack w-full py-2 rounded-md text-white"
              >
                Add Admin
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAdmin;
