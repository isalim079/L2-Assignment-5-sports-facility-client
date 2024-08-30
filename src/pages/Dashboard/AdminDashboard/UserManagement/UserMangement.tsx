import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import facility1 from "@/assets/facility1.png";
import { useGetAllUsersQuery } from "@/redux/features/users/userManagement.api";
import { useSelector } from "react-redux";
import { useCurrentToken } from "@/redux/features/auth/authSlice";
import { TUser } from "@/types/types";
import Loading from "@/components/Loading/Loading";

const UserManagement = () => {
  const token = useSelector(useCurrentToken);
  const { data: allUsers, isLoading } = useGetAllUsersQuery(token);
  console.log(allUsers);
  console.log(isLoading);

  return (
    <div>
      <div className="font-poppins">
        <div className="flex items-center justify-center gap-3  mb-5">
          <img className="w-8" src={facility1} alt="" />
          <h1 className=" font-bold text-xl text-primarySite">
            Manage All Users
          </h1>
        </div>
        {
          isLoading ? <Loading /> : <Table>
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
            {
              allUsers?.data?.map((item: TUser, index: number) => (
                <TableRow key={item?._id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.phone}</TableCell>
                  <TableCell>{item.role}</TableCell>
                  <TableCell>{item.address}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
        }
      </div>
    </div>
  );
};

export default UserManagement;
