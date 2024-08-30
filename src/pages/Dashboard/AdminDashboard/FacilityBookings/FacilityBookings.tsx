import Bookings from "./Bookings";
import Facility from "./Facility";

const FacilityBookings = () => {
    return (
        <div className="grid grid-cols-5 gap-16 mt-12">
          <div className="col-span-2">
            <Facility />
          </div>
          <div className="col-span-3 shadow-md rounded-md">
            <Bookings />
          </div>
        </div>
    );
};

export default FacilityBookings;