import { Separator } from "@/components/ui/separator";
import { useGetAllFacilitiesQuery } from "@/redux/features/facility/facilityManagement.api";
import { Link } from "react-router-dom";

export type TFacility = {
  _id: string;
  name: string;
  description: string;
  pricePerHour: number;
  image: string;
  facilityType: "topFacility" | "normalFacility";
  location: string;
  isDeleted: boolean;
};

const FeaturedFacilities = () => {
  const { data: allFacilities } = useGetAllFacilitiesQuery(undefined);

  return (
    <div>
      <div className="max-w-screen-xl mx-auto font-poppins my-10 lg:my-24 px-2 lg:px-0">
        <h1 className="text-center text-3xl uppercase font-bold text-primarySite">
          Explore Our Top Facilities
        </h1>
        <p className="text-center mt-1 lg:w-[50%] mx-auto">
          Discover a variety of premier sports venues, each designed to provide
          the best experience for your athletic needs.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-12">
          {allFacilities?.data?.slice(0,4).map(
            (topFacility: TFacility) =>
              topFacility?.facilityType === "topFacility" && (
                <div
                  key={topFacility?._id}
                  className="rounded-lg bg-secondarySite shadow-md flex flex-col justify-between"
                >
                 <div>
                 <img
                    className="min-h-52 object-cover"
                    src={topFacility?.image}
                    alt=""
                  />
                  <div className="p-4">
                    <h1 className="font-bold animate__animated animate__slideInDown">
                      {topFacility?.name}
                    </h1>
                    <Separator className="my-2 bg-primaryBlack" />
                    <p>{topFacility?.description}</p>
                  </div>
                 </div>
                  <div className="flex justify-center ">
                    <Link to={`/facility-details/${topFacility?._id}`} className="w-full"><button className="bg-primaryBlack text-white font-semibold w-full py-2">Details</button></Link>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedFacilities;
