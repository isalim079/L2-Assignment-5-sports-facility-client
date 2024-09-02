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
import { ScrollArea } from "@radix-ui/react-scroll-area";
import Loading from "@/components/Loading/Loading";
import { Link } from "react-router-dom";

const Bookings = () => {
  const token = useSelector(useCurrentToken);
  // console.log(token);

  const { data: allBookings, isLoading, error } = useGetAllBookingsQuery(`Bearer ${token}`);

  // console.log(error);

  return (
    <div>
      <div className="font-poppins">
        <div className="flex items-center justify-center gap-3  mb-5">
          <img className="w-8" src={bookings} alt="" />
          <h1 className=" font-bold text-xl text-primarySite">All Bookings</h1>
        </div>
        <Table>
          <ScrollArea className="h-[520px]">
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
                <Loading />
              ) : (
                allBookings?.data?.map((item: TBooking, index: number) => (
                  <TableRow key={item?._id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
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
          </ScrollArea>
        </Table>
        <div className=" flex justify-end p-10">
          <Link to="/admin-dashboard/all-bookings">
            <button className="border border-primaryBlack px-4 py-2 rounded-md hover:bg-primaryBlack hover:text-white transition-all ease-in-out duration-200">
              View All Bookings
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Bookings;
