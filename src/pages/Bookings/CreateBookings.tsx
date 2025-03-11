import { format } from "date-fns";
import { Calendar as CalendarIcon, ArrowLeft } from "lucide-react";
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
import {
  useCheckAvailabilityQuery,
  useCreateBookingMutation,
} from "@/redux/features/bookings/bookingManagement.api";
import { toast } from "sonner";
import moment from "moment";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setBookings } from "@/redux/features/bookings/bookingSlice";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  logout,
  selectCurrentUser,
  useCurrentToken,
} from "@/redux/features/auth/authSlice";
import { motion, AnimatePresence } from "framer-motion";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

const CreateBookings = () => {
  const token = useSelector(useCurrentToken);
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { handleSubmit } = useForm();
  const [date, setDate] = useState<Date>();
  const [selectedFacility, setSelectedFacility] = useState("");
  const { data: allFacility } = useGetAllFacilitiesQuery(undefined);
  const [addBookingsData] = useCreateBookingMutation();
  const [showAvailability, setShowAvailability] = useState(false);
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("12:00");

  const { data: availabilityData, refetch: checkAvailability } =
    useCheckAvailabilityQuery({
      date: moment(date).format("YYYY-MM-DD"),
      facilityId: selectedFacility,
    });

  const handleCheckAvailability = () => {
    if (selectedFacility && date) {
      checkAvailability();
      setShowAvailability(true); // Show the availability section
    } else {
      toast.error("Please select a facility and a date.");
    }
  };

  const handleBack = () => {
    setShowAvailability(false); // Go back to the facility selection section
  };

  const onSubmit = async () => {
    const facilityData = allFacility?.data?.filter(
      (item: any) => item?._id === selectedFacility
    );

    const createBookingsData = {
      user: user?.user.id,
      facility: selectedFacility,
      payableAmount: facilityData[0]?.pricePerHour,
      date: moment(date).format("YYYY-MM-DD"),
      startTime: startTime,
      endTime: endTime,
      isBooked: "unconfirmed",
    };

    try {
      const res = await addBookingsData({
        data: createBookingsData,
        token: `Bearer ${token}`,
      }).unwrap();

      await dispatch(setBookings({ bookingData: res?.data }));

      if (res.success === true) {
        toast.success("Payment processing...!");

        setTimeout(() => {
          navigate(`/checkout`);
        }, 2000);
      } else {
        toast.error("Something went wrong");
      }
    } catch {
      toast.error("You have unauthorized access. Please login again...");

      setTimeout(() => {
        dispatch(logout());
        navigate("/login");
      }, 2000);
    }
  };

  return (
    <div className="font-poppins min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 p-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center gap-3 mb-10 mt-24 lg:mt-32"
      >
        <h1 className="font-bold text-3xl text-primarySite bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          Book Your Desired Facility...!
        </h1>
      </motion.div>

      <div className="max-w-screen-xl mx-auto">
        {/* Back Button (Visible only when availability section is shown) */}
        <AnimatePresence>
          {showAvailability && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mb-6"
            >
              <button
                onClick={handleBack}
                className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                <span className="font-semibold">Back to Facility Selection</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="lg:flex justify-center gap-8 items-center px-2 lg:px-0">
          {/* Left Section: Facility Selection and Date Picker */}
          <AnimatePresence>
            {!showAvailability && (
              <motion.div
                key="facility-selection"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-lg"
              >
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Select Facility
                    </label>
                    <select
                      onChange={(e) => setSelectedFacility(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="" disabled>
                        Select Facility
                      </option>
                      {allFacility?.data?.map((item: TFacility) => (
                        <option key={item?._id} value={item?._id}>
                          {item?.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Select Date
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal p-3 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50",
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
                      className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-sm hover:bg-blue-700 transition-colors"
                    >
                      Check Availability
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Right Section: Available Slots and Booking Form */}
          <AnimatePresence>
            {showAvailability && (
              <motion.div
                key="availability-section"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
                className="w-full lg:w-2/3 bg-white p-6 rounded-lg shadow-lg mt-6 lg:mt-0"
              >
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-4">
                        Available Slots
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {availabilityData?.data?.map((item: any, index: number) => (
                          <motion.div
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            className="p-4 bg-blue-50 rounded-lg shadow-sm"
                          >
                            <p className="text-center text-blue-800 font-medium">
                              {item?.startTime} - {item?.endTime}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-4">
                        Facility Details
                      </h3>
                      {allFacility?.data?.map((item: TFacility, index: number) =>
                        item?._id === selectedFacility ? (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="lg:p-6 p-3 bg-purple-50 rounded-lg shadow-sm"
                          >
                            <div className="flex flex-col lg:flex-row items-center space-x-4">
                              <img
                                className="w-20 h-20 rounded-lg object-cover"
                                src={item?.image}
                                alt={item?.name}
                              />
                              <div>
                                <p className="text-lg font-bold text-purple-800">
                                  {item?.name}
                                </p>
                                <p className="text-gray-600">
                                  {item?.description?.length > 150 ? (
                                    <span>
                                      {item?.description?.slice(0, 150)}{" "}
                                      <span className="underline text-sm font-bold text-blue-500">
                                        <Link
                                          onClick={() => {
                                            window.scrollTo({
                                              top: 0,
                                              behavior: "smooth",
                                            });
                                          }}
                                          to={`/facility-details/${item?._id}`}
                                        >
                                          read more
                                        </Link>
                                      </span>
                                    </span>
                                  ) : (
                                    item?.description
                                  )}
                                </p>
                              </div>
                            </div>
                            <div className="mt-4 space-y-2">
                              <p className="text-sm text-gray-700">
                                <span className="font-semibold">Price:</span> $
                                {item?.pricePerHour}/hr
                              </p>
                              <p className="text-sm text-gray-700">
                                <span className="font-semibold">Facility Type:</span>{" "}
                                {item?.facilityType === "topFacility"
                                  ? "Top Facility"
                                  : "Normal Facility"}
                              </p>
                            </div>
                          </motion.div>
                        ) : null
                      )}
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-4">
                        Booking Time
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Start Time
                          </label>
                          <TimePicker
                            onChange={(value) => setStartTime(value || "10:00")}
                            value={startTime}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            End Time
                          </label>
                          <TimePicker
                            onChange={(value) => setEndTime(value || "12:00")}
                            value={endTime}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-3 rounded-lg shadow-sm hover:bg-green-700 transition-colors"
                      >
                        Proceed to Pay
                      </button>
                    </div>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default CreateBookings;