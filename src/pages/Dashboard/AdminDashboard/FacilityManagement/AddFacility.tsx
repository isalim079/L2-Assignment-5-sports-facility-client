/* eslint-disable @typescript-eslint/no-unused-vars */
import { Separator } from "@/components/ui/separator";
import { useCurrentToken } from "@/redux/features/auth/authSlice";
import { useAddFacilityMutation } from "@/redux/features/facility/facilityManagement.api";
import { FieldValues, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import axiosPublic from "@/components/axiosPublic";
import { PiUploadThin } from "react-icons/pi";
import { toast } from "sonner";
import { MdOutlineAddTask } from "react-icons/md";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddFacility = () => {
  const { register, handleSubmit, reset } = useForm();

  const token = useSelector(useCurrentToken);

  const [addFacilityData] = useAddFacilityMutation();

  // console.log(facilityDetails?.data?.image);

  const onSubmit = async (data: FieldValues) => {
    let imageUrl = "";

    const toastId = toast.loading("Creating Facility...");

    try {
      const imageFile = { image: data.image[0] };
      const res = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      if (res.data.success) {
        imageUrl = res.data.data.display_url;
      }
    } catch (error) {
      console.log("Image upload failed");
    }

    const facilityData = {
      name: data.name,
      description: data.description,
      pricePerHour: Number(data.pricePerHour),
      image: imageUrl,
      location: data.location,
    };

    const res = await addFacilityData({
      token: `Bearer ${token}`,
      data: facilityData,
    }).unwrap();
    if (res.success === true) {
      toast.success("Facility created successfully", {
        id: toastId,
        duration: 2000,
      });
      reset();
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center gap-3 mt-16 mb-5">
        <MdOutlineAddTask className="text-3xl text-primarySite" />
        <h1 className=" font-bold text-3xl text-primarySite">Add Facility</h1>
      </div>
      <Separator className="mb-10 max-w-96 mx-auto" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-[720px] shadow-md p-10 rounded-md bg-white/60 mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="md:col-span-2">
            <label htmlFor="name" className="block mb-1">
              Facility Name *
            </label>
            <input
              type="text"
              id="name"
              placeholder="Facility Name"
              className="py-2 px-3 rounded-md w-full text-secondarySite bg-primaryBlack border"
              {...register("name", { required: true })}
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="description" className="block mb-1">
              Description *
            </label>
            <textarea
              id="description"
              placeholder="Facility description..."
              className="py-2 px-3 rounded-md text-secondarySite bg-primaryBlack border w-full min-h-32"
              {...register("description", { required: true })}
            />
          </div>
          <div>
            <label htmlFor="pricePerHour" className="block mb-1">
              Price <span className="text-xs">/hr</span> *
            </label>
            <input
              type="number"
              id="pricePerHour"
              placeholder="Enter your price"
              className="py-2 px-3 rounded-md text-secondarySite bg-primaryBlack border"
              {...register("pricePerHour", { required: true })}
            />
          </div>
          <div>
            <label htmlFor="facilityType" className="block mb-1">
              Facility Type *
            </label>
            <select
              id="facilityType"
              className="w-full text-secondarySite bg-primaryBlack py-2 px-3 rounded-md"
              {...register("facilityType", { required: true })}
            >
              <option value="normalFacility">Normal Facility</option>
              <option value="topFacility">Top Facility</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label htmlFor="location" className="block mb-1">
              Location *
            </label>
            <input
              type="text"
              id="address"
              placeholder="Location"
              className="py-2 px-3 rounded-md text-secondarySite bg-primaryBlack border w-full"
              {...register("location", { required: true })}
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="image" className="block mb-1">
              Image *
            </label>

            <div className="border-2 border-primaryBlack border-dashed relative ">
              <input
                type="file"
                id="image"
                className="w-full min-h-[120px] opacity-0 cursor-pointer"
                {...register("image")}
              />
              <p className="absolute inset-0 flex flex-col justify-center items-center font-bold z-[-1]">
                <PiUploadThin className="text-3xl" />
                Upload Image
              </p>
            </div>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="bg-primaryBlack w-full py-2 rounded-md text-white"
            >
              Create Facility
            </button>
            <p className="text-sm mt-2 text-red-600">
              All fields are required *
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddFacility;
