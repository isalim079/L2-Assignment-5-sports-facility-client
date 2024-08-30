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
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Link } from "react-router-dom";

const Facility = () => {
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
          <ScrollArea className="h-[520px]">
            <TableHeader>
              <TableRow>
                <TableHead className="">#</TableHead>
                <TableHead className="w-[100px]">Name</TableHead>
                <TableHead>Facility Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-right">
                  Price <span className="block text-xs">(/hr)</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="">
              {isLoading ? (
                <Loading />
              ) : (
                allFacilities?.data?.map((item: TFacility, index: number) => (
                  <TableRow key={item?._id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.facilityType}</TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell className="text-right font-semibold">
                      ${item.pricePerHour}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </ScrollArea>
        </Table>
        <div className=" flex justify-end p-10">
          <Link to="/admin-dashboard/facility-management">
            {" "}
            <button className="border border-primaryBlack px-4 py-2 rounded-md hover:bg-primaryBlack hover:text-white transition-all ease-in-out duration-200">
              Manage All Facility
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Facility;
