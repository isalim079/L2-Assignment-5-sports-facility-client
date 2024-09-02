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
import { Link } from "react-router-dom";
import { useState } from "react";
import PaginationComponent from "@/components/pagination/pagination";

const Facility = () => {
  const { data: allFacilities, isLoading } =
    useGetAllFacilitiesQuery(undefined);
  // console.log(allFacilities);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalItems = allFacilities?.data?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const currentFacilities = allFacilities?.data?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  // console.log(currentFacilities);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
            </TableRow>
          </TableHeader>
          <TableBody className="">
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6}>
                  <Loading />
                </TableCell>
              </TableRow>
            ) : (
              currentFacilities?.map((item: TFacility, index: number) => (
                <TableRow key={item?._id}>
                  <TableCell className="font-medium">{((currentPage - 1) * itemsPerPage) + index + 1}</TableCell>
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
        </Table>

        <div className="flex items-center flex-row-reverse justify-between mt-5">
          <PaginationComponent
            totalPages={totalPages}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
          />

          <div className=" flex justify-end">
            <Link to="/admin-dashboard/facility-management">
              {" "}
              <button className="border border-primaryBlack px-4 py-2 rounded-md hover:bg-primaryBlack hover:text-white transition-all ease-in-out duration-200">
                Manage All Facility
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Facility;
