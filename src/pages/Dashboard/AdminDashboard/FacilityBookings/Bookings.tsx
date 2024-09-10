/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import bookings from "@/assets/bookings.png";
import { useGetAllBookingsQuery } from "@/redux/features/bookings/bookingManagement.api";
import { useSelector } from "react-redux";
import { useCurrentToken } from "@/redux/features/auth/authSlice";
import { TBooking } from "@/types/types";
import Loading from "@/components/Loading/Loading";
import { Link } from "react-router-dom";
import { useState } from "react";
import PaginationComponent from "@/components/pagination/pagination";

const Bookings = () => {
  const token = useSelector(useCurrentToken);
  // console.log(token);

  const {
    data: allBookings,
    isLoading,
    error,
  } = useGetAllBookingsQuery(`Bearer ${token}`);
  // console.log(error);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalItems = allBookings?.data?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const currentFacilities = allBookings?.data?.slice(
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
        <div className="flex items-center justify-center lg:gap-3  mb-5">
          <img className="w-8" src={bookings} alt="" />
          <h1 className=" font-bold text-xl text-primarySite">All Bookings</h1>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="">#</TableHead>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Facility</TableHead>
              <TableHead className="text-right">Is Booked</TableHead>
              <TableHead className="text-right">Payable Amount</TableHead>
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
              allBookings?.data?.map((item: TBooking, index: number) => (
                <TableRow key={item?._id}>
                  <TableCell className="font-medium">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </TableCell>
                  <TableCell className="font-medium">
                    {item.user.name}
                  </TableCell>
                  <TableCell>{item.user.email}</TableCell>
                  <TableCell>{item.facility.name}</TableCell>
                  <TableCell
                    className={`text-right font-semibold ${
                      item.isBooked === "confirmed"
                        ? "text-green-600"
                        : item.isBooked === "unconfirmed"
                        ? "text-yellow-500"
                        : "text-red-600"
                    }`}
                  >
                    {item.isBooked}
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    ${item.payableAmount}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <div className="lg:flex items-center flex-row-reverse justify-between mt-5 px-20 pb-5">
          <PaginationComponent
            totalPages={totalPages}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
          />
          <div className=" flex justify-end">
            <Link to="/admin-dashboard/all-bookings">
              <button className="border text-xs lg:text-base mt-2 lg:mt-0 border-primaryBlack px-4 py-2 rounded-md hover:bg-primaryBlack hover:text-white transition-all ease-in-out duration-200">
                View All Bookings
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
