import Bookings from "./Bookings";
import Facility from "./Facility";

const FacilityBookings = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 lg:gap-16 mt-12">
          <div className="lg:col-span-2 mb-10 lg:mb-0">
            <Facility />
          </div>
          <div className="lg:col-span-3 shadow-md rounded-md">
            <Bookings />
          </div>
        </div>
    );
};

export default FacilityBookings;