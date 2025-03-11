import { FaDollarSign, FaFileInvoice, FaClock, FaCheckCircle } from "react-icons/fa";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useCurrentToken } from "@/redux/features/auth/authSlice";
import { useGetUserBookingsQuery } from "@/redux/features/bookings/bookingManagement.api";
import { TBooking } from "@/types/types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const UserDashboardHome = () => {
  const token = useSelector(useCurrentToken);
  const { data: allBookings } = useGetUserBookingsQuery(`Bearer ${token}`);

  // Filter bookings
  const confirmedBookings = allBookings?.data.filter(
    (item: TBooking) => item?.isBooked === "confirmed"
  );
  const unconfirmedBookings = allBookings?.data.filter(
    (item: TBooking) => item?.isBooked === "unconfirmed"
  );

  // Calculate total paid amount
  const filteredData = allBookings?.data.filter((item: TBooking) => item?.tnxId);
  const totalPaidAmount = filteredData
    ?.reduce((acc: number, item: TBooking) => acc + (item.payableAmount || 0), 0)
    ?.toFixed(2);

  // Prepare chart data for monthly booking spent amount
  const monthlySpentData = Array(12).fill(0); // Initialize an array for 12 months
  allBookings?.data.forEach((booking: TBooking) => {
    if (booking.date) {
      const month = new Date(booking.date).getMonth(); // Get the month (0-11)
      monthlySpentData[month] += booking.payableAmount || 0;
    }
  });

  const chartData = {
    labels: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ],
    datasets: [
      {
        label: "Monthly Booking Spent Amount",
        data: monthlySpentData,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Monthly Booking Spent Amount",
      },
    },
    hover: {
      mode: "nearest" as const,
      intersect: true,
    },
    animation: {
      duration: 1000,
      easing: "easeInOutQuart" as const,
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Top Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 transition-transform duration-300"
        >
          <FaDollarSign className="text-3xl text-blue-500" />
          <div>
            <h2 className="text-gray-500 text-sm font-semibold">Total Invested</h2>
            <p className="text-2xl font-bold">$ {totalPaidAmount}</p>
          </div>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 transition-transform duration-300"
        >
          <FaFileInvoice className="text-3xl text-green-500" />
          <div>
            <h2 className="text-gray-500 text-sm font-semibold">Total Booking</h2>
            <p className="text-2xl font-bold">{allBookings?.data?.length}</p>
          </div>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 transition-transform duration-300"
        >
          <FaClock className="text-3xl text-orange-500" />
          <div>
            <h2 className="text-gray-500 text-sm font-semibold">Unconfirmed Booking</h2>
            <p className="text-2xl font-bold">{unconfirmedBookings?.length}</p>
          </div>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 transition-transform duration-300"
        >
          <FaCheckCircle className="text-3xl text-pink-500" />
          <div>
            <h2 className="text-gray-500 text-sm font-semibold">Confirmed Booking</h2>
            <p className="text-2xl font-bold">{confirmedBookings?.length}</p>
          </div>
        </motion.div>
      </div>

      {/* Chart Section */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white p-6 rounded-lg shadow-md mb-6 transition-transform duration-300"
      >
        <h2 className="text-gray-500 text-sm font-semibold mb-4">Monthly Booking Spent Amount</h2>
        <Line data={chartData} options={chartOptions} />
      </motion.div>
    </div>
  );
};

export default UserDashboardHome;