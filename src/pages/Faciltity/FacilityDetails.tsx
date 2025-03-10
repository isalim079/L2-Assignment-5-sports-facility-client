/* eslint-disable @typescript-eslint/no-explicit-any */
import { Separator } from "@/components/ui/separator";
import { useGetAllFacilitiesQuery } from "@/redux/features/facility/facilityManagement.api";
import { Link, useParams } from "react-router-dom";

const FacilityDetails = () => {
  const { id } = useParams();

  const { data: allFacility } = useGetAllFacilitiesQuery(undefined);

  const filteredData = allFacility?.data?.find((item: any) => item?._id === id);

  return (
    <div className="mt-36">
    <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
      {/* Facility Image and Basic Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="rounded-lg overflow-hidden shadow-lg">
          <img
            className="w-full h-full object-cover"
            src={filteredData?.image}
            alt={filteredData?.name}
            crossOrigin="anonymous"
          />
        </div>
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-primarySite">
            {filteredData?.name}
          </h1>
          <Separator className="bg-primaryBlack" />
          <p className="text-lg text-gray-700">{filteredData?.description}</p>
          <div className="space-y-4">
            <p className="text-xl">
              <span className="font-semibold">Price:</span> $
              {filteredData?.pricePerHour} <span className="text-sm">/ hour</span>
            </p>
            <p className="text-xl">
              <span className="font-semibold">Location:</span>{" "}
              {filteredData?.location}
            </p>
            <p className="text-xl">
              <span className="font-semibold">Facility Type:</span>{" "}
              {filteredData?.facilityType === "topFacility"
                ? "Premium"
                : "Standard"}
            </p>
            <p className="text-xl">
              <span className="font-semibold">Availability:</span>{" "}
              {filteredData?.isDeleted ? "Unavailable" : "Available"}
            </p>
          </div>
          <Link to={`/create-bookings`}>
            <button className="bg-primarySite text-white font-semibold w-full py-3 rounded-lg shadow-md hover:bg-primarySite/90 transition duration-300 mt-10">
              Book Now
            </button>
          </Link>
        </div>
      </div>

      {/* Additional Details Section */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold text-primarySite mb-6">
          Additional Details
        </h2>
        <Separator className="bg-primaryBlack mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-secondarySite p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold">Facility Features</h3>
            <ul className="mt-4 space-y-2">
                {filteredData?.features?.map((item: string, index: number) => <li key={index}>• {item}</li>)}
          
            </ul>
          </div>
          <div className="bg-secondarySite p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold">Operating Hours</h3>
            <p className="mt-4">Monday - Sunday: 6:00 AM - 10:00 PM</p>
          </div>
          <div className="bg-secondarySite p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold">Contact Information</h3>
            <p className="mt-4">Email: info@sportsfacility.com</p>
            <p>Phone: +1 (123) 456-7890</p>
          </div>
        </div>
      </div>

      {/* Gallery Section (if applicable) */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold text-primarySite mb-6">Gallery</h2>
        <Separator className="bg-primaryBlack mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData?.gallery?.map((item: string, index: number) =>  <div key={index} className="rounded-lg overflow-hidden shadow-lg">
            <img
              className="w-full h-48 object-cover"
              src={item}
              alt="Facility Image 1"
            />
          </div>)}
        
        </div>
      </div>
    </div>
  </div>
  );
};

export default FacilityDetails;
