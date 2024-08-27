import { Separator } from "@/components/ui/separator";
import { MdSwipeRightAlt } from "react-icons/md";

const HowItWorks = () => {
  return (
    <div className="">
      <div className="max-w-screen-xl mx-auto font-poppins my-24">
        <h1 className="text-center text-3xl uppercase font-bold text-primarySite">
          How It Works...??
        </h1>
        <p className="text-center mt-1 lg:w-[50%] mx-auto">
          Follow these simple steps to book your sports facility and get ready
          for an unforgettable experience!
        </p>
        <Separator className="my-12" />
        <div className=" grid grid-cols-5 gap-7">
          {/* ----------------- Step 1 -------------------- */}
          <div className="mt-[160px] animate__animated animate__fadeInDownBig ">
            <div className="flex justify-end text-6xl text-primarySite">
              <MdSwipeRightAlt />
              <p className="text-lg font-black">1</p>
            </div>
            <div className="border-t-8 border-l-8 border-primarySite pt-4 pl-4 text-justify">
              <h1>
                Step 1:{" "}
                <span className="font-bold ml-2">Find Your Facility</span>
              </h1>
              <Separator className="my-2" />
              <p>
                Easily find the perfect sports facility by entering your
                preferred sport or location. Browse through a wide selection of
                top-rated facilities that meet your needs.
              </p>
            </div>
          </div>

          {/* ----------------- Step 2 -------------------- */}
          <div className="mt-[120px] animate__animated animate__fadeInDownBig delay-200">
            {" "}
            <div className="flex justify-end text-6xl text-primaryBlack">
              <MdSwipeRightAlt />
              <p className="text-lg font-black">2</p>
            </div>
            <div className="border-t-8 border-l-8 border-primaryBlack pt-4 pl-4 text-justify">
              <h1>
                Step 2:{" "}
                <span className="font-bold ml-2">Select a Facility</span>
              </h1>
              <Separator className="my-2" />
              <p>
                Choose a facility that suits your preferences. Check out the
                facility details, including images, pricing, and availability,
                before making a decision.
              </p>
            </div>
          </div>

          {/* ----------------- Step 3 -------------------- */}
          <div className="mt-[80px] animate__animated animate__fadeInDownBig delay-300">
            <div className="flex justify-end text-6xl text-primarySite">
              <MdSwipeRightAlt />
              <p className="text-lg font-black">3</p>
            </div>
            <div className="border-t-8 border-l-8 border-primarySite pt-4 pl-4 text-justify">
              <h1>
                Step 3:{" "}
                <span className="font-bold ml-2">Choose Date & Time</span>
              </h1>
              <Separator className="my-2" />
              <p>
                Pick your preferred date and time slot from the facility's
                available schedule. Ensure that the timing fits your activity
                plans.
              </p>
            </div>
          </div>

          {/* ----------------- Step 4 -------------------- */}
          <div className="mt-[40px] animate__animated animate__fadeInDownBig delay-500">
            <div className="flex justify-end text-6xl text-primaryBlack">
              <MdSwipeRightAlt />
              <p className="text-lg font-black">4</p>
            </div>
            <div className="border-t-8 border-l-8 border-primaryBlack pt-4 pl-4 text-justify">
              <h1>
                Step 4: <span className="font-bold ml-2">Confirm Booking</span>
              </h1>
              <Separator className="my-2" />
              <p>
                Review your selections and confirm your booking. You'll receive
                a confirmation message with all the necessary details for your
                visit.
              </p>
            </div>
          </div>

          {/* ----------------- Step 5 -------------------- */}
          <div className="animate__animated animate__fadeInDownBig delay-700">
            <div className="flex justify-end text-6xl text-primarySite">
              <MdSwipeRightAlt />
              <p className="text-lg font-black">5</p>
            </div>
            <div className="border-t-8 border-l-8 border-primarySite pt-4 pl-4 text-justify">
              <h1>
                Step 5:{" "}
                <span className="font-bold ml-2">Enjoy Your Activity</span>
              </h1>
              <Separator className="my-2" />
              <p>
                Arrive at the facility at the scheduled time and enjoy your
                sports experience. All you need to focus on is having a great
                time!
              </p>
            </div>
          </div>
        </div>
        <Separator className="my-12" />
      </div>
    </div>
  );
};

export default HowItWorks;
