import { Separator } from "@/components/ui/separator";
import { useGetAllFacilitiesQuery } from "@/redux/features/facility/facilityManagement.api";
import { Link, useParams } from "react-router-dom";

const FacilityDetails = () => {

    const {id} = useParams()
   
    const {data: allFacility} = useGetAllFacilitiesQuery(undefined)

    const filteredData = allFacility?.data?.find((item: any) => item?._id === id)
    console.log(filteredData);


    return (
        <div className="mt-36">
           <div
       
              className="rounded-lg"
            >
              <img
                className="w-1/3 mx-auto"
                src={filteredData?.image}
                alt=""
              />
              <div className="p-4 max-w-screen-lg mx-auto">
                <h1 className="font-bold animate__animated animate__slideInDown">
                  {filteredData?.name}
                </h1>
                <Separator className="my-2 bg-primaryBlack" />
                <div className="space-y-2 mt-5">
                  <p><span className="font-semibold">Price:</span> ${filteredData?.pricePerHour}</p>
                  <p><span className="font-semibold">Location:</span> {filteredData?.location}</p>
                  <p><span className="font-semibold">Description:</span> {filteredData?.description}</p>
                  <Link to={`/create-bookings`} >
                    {" "}
                    <button className="bg-primarySite w-full py-2 shadow-sm mt-5">
                      Book Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
        </div>
    );
};

export default FacilityDetails;