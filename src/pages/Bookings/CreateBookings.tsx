/* eslint-disable @typescript-eslint/no-unused-vars */
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { useGetAllFacilitiesQuery } from "@/redux/features/facility/facilityManagement.api";
import { TFacility } from "../Home/FeaturedFacilities/FeaturedFacilities";
import { useCheckAvailabilityQuery, useCreateBookingMutation } from "@/redux/features/bookings/bookingManagement.api";
import { toast } from "sonner";
import moment from "moment";
import { FieldValues, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setBookings } from "@/redux/features/bookings/bookingSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser, useCurrentToken } from "@/redux/features/auth/authSlice";

const CreateBookings = () => {
  const token = useSelector(useCurrentToken)
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit, reset } = useForm();
  const [date, setDate] = useState<Date>();
  const [selectedFacility, setSelectedFacility] = useState("");
  const { data: allFacility } = useGetAllFacilitiesQuery(undefined);
  const [addBookingsData] = useCreateBookingMutation()

  const { data: availabilityData, refetch: checkAvailability } =
    useCheckAvailabilityQuery({
      date: moment(date).format("YYYY-MM-DD"),
      facilityId: selectedFacility,
    });

  const handleCheckAvailability = () => {
    if (selectedFacility && date) {
      checkAvailability();
    } else {
      toast.error("Please select a facility and a date.");
    }
  };

  const onSubmit = async (data: FieldValues) => {
    const facilityData = allFacility?.data?.filter((item: any) => item?._id === selectedFacility)
    // console.log(facilityData[0]);

    const createBookingsData = {
      user: user?.user.id,
      facility: selectedFacility,
        payableAmount: facilityData[0]?.pricePerHour,
      date: moment(date).format("YYYY-MM-DD"),
      startTime: data.startTime,
      endTime: data.endTime,
      isBooked: 'unconfirmed'
    };
    
    const res = await addBookingsData({data: createBookingsData, token: `Bearer ${token}`}).unwrap();

    // console.log(res);
    
   await dispatch(setBookings({bookingData: res?.data}))

   if (res.success === true) {
    toast.success("Payment processing...!");

    setTimeout(() => {
      navigate(`/checkout`);
    }, 2000);
  } else {
    toast.error("Something went wrong");
  }


  };

  return (
    <div className="font-poppins">
      <div className="flex items-center justify-center gap-3  mb-10 mt-32">
        <h1 className=" font-bold text-3xl text-primarySite">
          Book your desire facility...!
        </h1>
      </div>
      <div className="max-w-screen-xl mx-auto">
        <div className="flex justify-center gap-32 items-center h-screen">
          <div className="space-y-5 w-full">
            <div>
              <select
                onChange={(e) => setSelectedFacility(e.target.value)}
                className="p-2 border rounded-md shadow-sm w-full"
              >
                <option value="" disabled className="">
                  Select Facility
                </option>
                {allFacility?.data?.map((item: TFacility) => (
                  <option key={item?._id} value={item?._id} className="">
                    {item?.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="shadow-sm">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <button
                onClick={handleCheckAvailability}
                className="bg-primaryBlack px-4 py-2 rounded-md shadow-sm text-secondarySite w-full"
              >
                Check Availability
              </button>
            </div>
          </div>
          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className="mb-5">
                <h3 className="mb-1 text-lg font-bold">Available Slots</h3>
                {availabilityData?.data?.map((item: any, index: number) => (
                  <div key={index} className="">
                    <p className="px-3 py-2 rounded-md bg-primaryBlack text-secondarySite mb-3 text-center">
                      {item?.startTime} - {item?.endTime}
                    </p>
                  </div>
                ))}
                {allFacility?.data?.map((item: TFacility, index: number) =>
                  item?._id === selectedFacility ? (
                    <div
                      key={index}
                      className="my-7 p-3 shadow-md rounded-md space-y-2"
                    >
                      <img
                        className="w-28 rounded-lg"
                        src={item?.image}
                        alt=""
                      />
                      <p>
                        <span className="font-semibold mr-2">Facility:</span>{" "}
                        {item?.name}
                      </p>
                      <p>
                        <span className="font-semibold mr-2">Description:</span>{" "}
                        {item?.description}
                      </p>
                      <p>
                        <span className="font-semibold mr-2">
                          Price{" "}
                          <span className="text-xs font-normal">(/hr)</span>:
                        </span>{" "}
                        ${item?.pricePerHour}
                      </p>
                      <p>
                        <span className="font-semibold mr-2">
                          Facility Type:
                        </span>{" "}
                        {item?.facilityType === "topFacility" ? (
                          <span>Top Facility</span>
                        ) : (
                          <span>Normal Facility</span>
                        )}
                      </p>
                      <p>
                        <span className="font-semibold mr-2">Location:</span>{" "}
                        {item?.description}
                      </p>
                    </div>
                  ) : (
                    ""
                  )
                )}
              </div>
              <div className="flex flex-col mb-5">
                <label htmlFor="startTime">Start Time *</label>
                <input
                  type="time"
                  id="startTime"
                  className="border px-2 mt-1 shadow-sm py-1 rounded-md"
                  {...register("startTime", { required: true })}
                />
                <label htmlFor="startTime" className="mt-2">
                  End Time *
                </label>
                <input
                  {...register("endTime", { required: true })}
                  type="time"
                  name="endTime"
                  id="endTime"
                  className="border px-2 mt-1 shadow-sm py-1 rounded-md"
                />
              </div>
              <div>
              
                  <button type="submit" className="bg-primaryBlack w-full text-secondarySite py-2 rounded-md shadow-sm">
                    Proceed to Pay
                  </button>
              
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBookings;
