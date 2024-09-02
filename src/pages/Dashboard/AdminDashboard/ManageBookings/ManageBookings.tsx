import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import bookings from "@/assets/bookings.png";
import { useGetAllBookingsQuery } from "@/redux/features/bookings/bookingManagement.api";
import { useSelector } from "react-redux";
import { useCurrentToken } from "@/redux/features/auth/authSlice";
import { TBooking } from "@/types/types";

const ManageBookings = () => {
  const token = useSelector(useCurrentToken);

  const { data: allBookings } = useGetAllBookingsQuery(`Bearer ${token}`);

  // console.log(allBookings);

  return (
    <div>
      <div className="font-poppins">
        <div className="flex items-center justify-center gap-3  mb-5">
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
            {allBookings === "undefined" ? (
              <Skeleton />
            ) : (
              allBookings?.data?.map((item: TBooking, index: number) => (
                <TableRow key={item?._id}>
                  <TableCell className="font-medium">
                    {index + 1}
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
      </div>
    </div>
  );
};

export default ManageBookings;
