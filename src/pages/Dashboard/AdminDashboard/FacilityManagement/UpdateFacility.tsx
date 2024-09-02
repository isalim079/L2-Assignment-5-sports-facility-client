
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Separator } from "@/components/ui/separator";
import { useCurrentToken } from "@/redux/features/auth/authSlice";
import {
  useGetSingleFacilityQuery,
  useUpdateSingleFacilityMutation,
} from "@/redux/features/facility/facilityManagement.api";
import { FieldValues, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axiosPublic from "@/components/axiosPublic";
import { PiUploadThin } from "react-icons/pi";
import { toast } from "sonner";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateFacility = () => {
  const { register, handleSubmit, reset } = useForm();

  const token = useSelector(useCurrentToken);

  const { id } = useParams();

  const { data: facilityDetails, isLoading } = useGetSingleFacilityQuery({
    id: id,
    token: `Bearer ${token}`,
  });

  const [updateSingleFacility] = useUpdateSingleFacilityMutation();

  // console.log(facilityDetails?.data?.image);

  const onSubmit = async (data: FieldValues) => {
    let imageUrl = facilityDetails?.data?.image;

    const toastId = toast.loading("Updating Facility...");

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

    const updateFacilityData = {
      name: data.name ? data.name : facilityDetails?.data?.name,
      description: data.description
        ? data.description
        : facilityDetails?.data?.description,
      pricePerHour: data.pricePerHour
        ? data.pricePerHour
        : Number(facilityDetails?.data?.pricePerHour),
      image: imageUrl,
      location: data.location ? data.location : facilityDetails?.data?.location,
    };

    const res = await updateSingleFacility({
      id: id,
      token: `Bearer ${token}`,
      data: updateFacilityData,
    }).unwrap();
    if (res.success === true) {
      toast.success("Facility updated successfully", {
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
        <h1 className=" font-bold text-3xl text-primarySite">
          Update Facility
        </h1>
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
              defaultValue={facilityDetails?.data?.name}
              type="text"
              id="name"
              placeholder="Facility Name"
              className="py-2 px-3 rounded-md w-full text-secondarySite bg-primaryBlack border"
              {...register("name")}
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="description" className="block mb-1">
              Description *
            </label>
            <textarea
              defaultValue={facilityDetails?.data?.description}
              id="description"
              placeholder="Facility description..."
              className="py-2 px-3 rounded-md text-secondarySite bg-primaryBlack border w-full min-h-32"
              {...register("description")}
            />
          </div>
          <div>
            <label htmlFor="pricePerHour" className="block mb-1">
              Price <span className="text-xs">/hr</span> *
            </label>
            <input
              defaultValue={facilityDetails?.data?.pricePerHour}
              type="number"
              id="pricePerHour"
              placeholder="Enter your price"
              className="py-2 px-3 rounded-md text-secondarySite bg-primaryBlack border"
              {...register("pricePerHour")}
            />
          </div>
          <div>
            <label htmlFor="facilityType" className="block mb-1">
              Facility Type *
            </label>
            <select
              defaultValue={facilityDetails?.data?.facilityType}
              id="facilityType"
              className="w-full text-secondarySite bg-primaryBlack py-2 px-3 rounded-md"
              {...register("facilityType")}
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
              defaultValue={facilityDetails?.data?.location}
              type="text"
              id="address"
              placeholder="Location"
              className="py-2 px-3 rounded-md text-secondarySite bg-primaryBlack border w-full"
              {...register("location")}
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
              Update Facility
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateFacility;
