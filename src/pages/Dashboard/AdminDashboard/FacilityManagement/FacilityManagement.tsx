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
import { Skeleton } from "@/components/ui/skeleton";
import facility1 from '@/assets/facility1.png'

const FacilityManagement = () => {
  const { data: allFacilities } = useGetAllFacilitiesQuery(undefined);
  // console.log(allFacilities);

  return (
    <div>
      <div className="font-poppins">
        <div className="flex items-center justify-center gap-3  mb-5">
            <img className="w-8" src={facility1} alt="" />
        <h1 className=" font-bold text-xl text-primarySite">Manage Facility</h1>
        </div>
        <Table>
       
          <TableHeader>
            <TableRow>
              <TableHead className="">#</TableHead>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Facility Type</TableHead>
              <TableHead>Location</TableHead>
              <TableHead className="text-right">Price <span className="block text-xs">(/hr)</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
           {allFacilities === "undefined" ? <Skeleton /> : 
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
           }
          </TableBody>
         
        </Table>
      </div>
    </div>
  );
};

export default FacilityManagement;
