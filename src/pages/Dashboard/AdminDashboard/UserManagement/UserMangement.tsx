import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllUsersQuery } from "@/redux/features/users/userManagement.api";
import { useSelector } from "react-redux";
import { useCurrentToken } from "@/redux/features/auth/authSlice";
import { TUser } from "@/types/types";
import Loading from "@/components/Loading/Loading";
import { User2Icon } from "lucide-react";
import PaginationComponent from "@/components/pagination/pagination";
import { useState } from "react";
import ItemsPerPage from "@/components/pagination/ItemsPerPage";

const UserManagement = () => {
  const token = useSelector(useCurrentToken);
  const { data: allUsers, isLoading } = useGetAllUsersQuery(`Bearer ${token}`);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const totalItems = allUsers?.data?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const currentBookings = allUsers?.data?.slice(
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
          <User2Icon />
          <h1 className=" font-bold text-xl text-primarySite">
            Manage All Users
            <span className="text-sm font-normal text-primaryBlack block">
              (Total: {allUsers?.data?.length})
            </span>
          </h1>
        </div>
        <ItemsPerPage handleItemsPerPage={handleItemsPerPage}/>
        {isLoading ? (
          <TableRow>
            <TableCell colSpan={6}>
              <Loading />
            </TableCell>
          </TableRow>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="">#</TableHead>
                <TableHead className="w-[100px]">Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Number</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentBookings?.map((item: TUser, index: number) => (
                <TableRow key={item?._id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.phone}</TableCell>
                  <TableCell className="font-semibold">
                    {item.role === "admin" ? <p>Admin</p> : <p>User</p>}
                  </TableCell>
                  <TableCell>{item.address}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
      <div className="my-5">
          <PaginationComponent
            totalPages={totalPages}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
          />
        </div>
    </div>
  );
};

export default UserManagement;
