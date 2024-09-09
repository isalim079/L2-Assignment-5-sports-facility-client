import { Separator } from "@/components/ui/separator";
import { useGetAllFacilitiesQuery } from "@/redux/features/facility/facilityManagement.api";
import { useState } from "react";
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

const Facility = () => {
  const { data: allFacilities } = useGetAllFacilitiesQuery(undefined);

  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const priceRanges = [
    { label: "0 - 15", min: 0, max: 15 },
    { label: "10 - 30", min: 10, max: 30 },
    { label: "20 - 60", min: 20, max: 60 },
  ];

  const filteredFacilities = allFacilities?.data.filter(
    (facility: TFacility) => {
      // Filter by search query (name or location)
      const matchesQuery =
        facility.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        facility.location.toLowerCase().includes(searchQuery.toLowerCase());

      // Filter by selected price range
      const selectedRange = priceRanges.find(
        (range) => range.label === priceRange
      );
      const matchesPrice =
        !selectedRange ||
        (facility.pricePerHour >= selectedRange.min &&
          facility.pricePerHour <= selectedRange.max);

      return matchesQuery && matchesPrice;
    }
  );

  return (
    <div>
      <div className="max-w-screen-xl mx-auto font-poppins mb-20 mt-36">
        <h1 className="text-center text-3xl uppercase font-bold text-primarySite">
          Explore Our Facilities
        </h1>
        <p className="text-center mt-1 lg:w-[50%] mx-auto">
          Discover a variety of premier sports venues, each designed to provide
          the best experience for your athletic needs.
        </p>

        <div className="flex justify-center gap-5 mt-6">
          <input
            type="text"
            placeholder="Search by name or location"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border px-4 py-2 rounded-lg w-1/3"
          />

          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="border px-4 py-2 rounded-lg w-1/3"
          >
            <option value="">Select Price Range</option>
            {priceRanges.map((range) => (
              <option key={range.label} value={range.label}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-4 gap-10 mt-12">
          {filteredFacilities?.map((item: TFacility) => (
            <div
              key={item?._id}
              className="rounded-lg bg-secondarySite shadow-md"
            >
              <img
                className="min-h-52 object-cover"
                src={item?.image}
                alt=""
              />
              <div className="p-4">
                <h1 className="font-bold animate__animated animate__slideInDown">
                  {item?.name}
                </h1>
                <Separator className="my-2 bg-primaryBlack" />
                <div className="space-y-2 mt-5">
                  <p>Price: ${item?.pricePerHour}</p>
                  <p>Location: {item?.location}</p>
                  <Link to={`/facility-details/${item?._id}`}>
                    {" "}
                    <button className="bg-primarySite w-full py-2 shadow-sm mt-2">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Facility;
