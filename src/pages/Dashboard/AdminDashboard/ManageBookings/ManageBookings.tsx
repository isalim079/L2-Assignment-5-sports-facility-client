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
import { useState } from "react";
import PaginationComponent from "@/components/pagination/pagination";
import Loading from "@/components/Loading/Loading";
import ItemsPerPage from "@/components/pagination/ItemsPerPage";

const ManageBookings = () => {
  const token = useSelector(useCurrentToken);

  const { data: allBookings, isLoading } = useGetAllBookingsQuery(
    `Bearer ${token}`
  );
  // console.log(allBookings);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const totalItems = allBookings?.data?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const currentBookings = allBookings?.data?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  // console.log(currentFacilities);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPage = (data: string) => {
    setItemsPerPage(Number(data));
  };

  return (
    <div>
      <div className="font-poppins px-2 lg:px-2">
        <div className="flex items-center justify-center gap-3  mb-5">
          <img className="w-8" src={bookings} alt="" />
          <h1 className=" font-bold text-xl text-primarySite">
            All Bookings{" "}
            <span className="text-sm font-normal text-primaryBlack block">
              (Total: {allBookings?.data?.length})
            </span>
          </h1>
        </div>
        <ItemsPerPage handleItemsPerPage={handleItemsPerPage} />
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
              currentBookings?.map((item: TBooking, index: number) => (
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

export default ManageBookings;
