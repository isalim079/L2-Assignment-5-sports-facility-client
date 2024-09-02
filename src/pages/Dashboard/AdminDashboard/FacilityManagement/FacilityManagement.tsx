import { useGetAllFacilitiesQuery } from "@/redux/features/facility/facilityManagement.api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TFacility } from "@/pages/Home/FeaturedFacilities/FeaturedFacilities";
import facility1 from "@/assets/facility1.png";
import Loading from "@/components/Loading/Loading";
import { BiEdit, BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";

const FacilityManagement = () => {
  const { data: allFacilities, isLoading } =
    useGetAllFacilitiesQuery(undefined);
  // console.log(allFacilities);

  return (
    <div>
      <div className="font-poppins">
        <div className="flex items-center justify-center gap-3  mb-5">
          <img className="w-8" src={facility1} alt="" />
          <h1 className=" font-bold text-xl text-primarySite">
            Manage Facility
          </h1>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="">#</TableHead>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Facility Type</TableHead>
              <TableHead>Location</TableHead>
              <TableHead className="text-right">
                Price <span className="block text-xs">(/hr)</span>
              </TableHead>
              <TableHead className="text-center">
                <Link to="/admin-dashboard/add-facility">
                  {" "}
                  <button className="shadow-md px-4 py-2 rounded-md bg-green-600 text-white hover:shadow-sm">
                    Add Facility
                  </button>
                </Link>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6}>
                  <Loading />
                </TableCell>
              </TableRow>
            ) : (
              allFacilities?.data?.map((item: TFacility, index: number) => (
                <TableRow key={item?._id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>
                    {item.facilityType === "topFacility" ? (
                      <p>Top Facility</p>
                    ) : (
                      <p>Normal Facility</p>
                    )}
                  </TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell className="text-right font-semibold">
                    ${item.pricePerHour}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="space-x-5 flex justify-center">
                      <Link to={`/admin-dashboard/update-facility/${item?._id}`}>
                        <button className="shadow-md px-4 py-2 rounded-md bg-primarySite text-white hover:shadow-sm flex items-center gap-2">
                          <BiEdit className="text-xl" /> Update
                        </button>
                      </Link>
                      <button className="shadow-md px-4 py-2 rounded-md bg-red-600 text-white hover:shadow-sm flex items-center gap-2">
                        <BiTrash className="text-xl" /> Delete
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default FacilityManagement;
