/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useDeleteFacilityMutation,
  useGetAllFacilitiesQuery,
} from "@/redux/features/facility/facilityManagement.api";
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
import PaginationComponent from "@/components/pagination/pagination";
import { useState } from "react";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { useCurrentToken } from "@/redux/features/auth/authSlice";

const FacilityManagement = () => {
  const token = useSelector(useCurrentToken);

  const {
    data: allFacilities,
    isLoading,
    refetch,
  } = useGetAllFacilitiesQuery(undefined);
  // console.log(allFacilities);

  const [deleteFacility] = useDeleteFacilityMutation();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

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

  const handleDelete = (item: any) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteFacility({ id: item?._id, token: `Bearer ${token}` });

        Swal.fire({
          title: "Deleted!",
          text: "Facility has been deleted successfully",
          icon: "success",
        }).then(() => {
          refetch();
        });
      }
    });
  };

  return (
    <div>
      <div className="font-poppins">
        <div className="flex items-center justify-center gap-3  mb-5">
          <img className="w-8" src={facility1} alt="" />
          <h1 className=" font-bold text-xl text-primarySite">
            Manage Facility{" "}
            <span className="text-sm font-normal text-primaryBlack block">
              (Total: {allFacilities?.data?.length})
            </span>
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
              currentFacilities?.map((item: TFacility, index: number) => (
                <TableRow key={item?._id}>
                  <TableCell className="font-medium">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </TableCell>
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
                      <Link
                        to={`/admin-dashboard/update-facility/${item?._id}`}
                      >
                        <button className="shadow-md px-4 py-2 rounded-md bg-primarySite text-white hover:shadow-sm flex items-center gap-2">
                          <BiEdit className="text-xl" /> Update
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(item)}
                        className="shadow-md px-4 py-2 rounded-md bg-red-600 text-white hover:shadow-sm flex items-center gap-2"
                      >
                        <BiTrash className="text-xl" /> Delete
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <div className="my-5">
          <PaginationComponent
            totalPages={totalPages}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default FacilityManagement;
