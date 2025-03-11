import {
  FaDollarSign,
  FaFileInvoice,
  FaClock,
  FaCheckCircle,
  FaCalendarAlt,
  FaUser,
} from "react-icons/fa";
import { Line } from "react-chartjs-2";
import CountUp from "react-countup";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
import { useGetAllBookingsQuery } from "@/redux/features/bookings/bookingManagement.api";
import { TBooking, TUser } from "@/types/types";
import { useGetAllUsersQuery } from "@/redux/features/users/userManagement.api";
import moment from "moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const AdminDashboardHome = () => {
  const token = useSelector(useCurrentToken);
  const { data: allBookings } = useGetAllBookingsQuery(`Bearer ${token}`);
  const { data: allUsers } = useGetAllUsersQuery(`Bearer ${token}`);

  // Filter bookings
  const confirmedBookings = allBookings?.data.filter(
    (item: TBooking) => item?.isBooked === "confirmed",
  );
  const unconfirmedBookings = allBookings?.data.filter(
    (item: TBooking) => item?.isBooked === "unconfirmed",
  );

  // Calculate total paid amount
  const totalPaidAmount = allBookings?.data
    ?.reduce(
      (acc: number, item: TBooking) => acc + (item.payableAmount || 0),
      0,
    )
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
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Monthly earned Amount",
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
        text: "Monthly Earned Amount",
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

  // Slider settings for Latest Confirmed Bookings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // get latest confirmed bookings (sorted by date)
  const latestConfirmedBookings = confirmedBookings
    ?.sort(
      (a: TBooking, b: TBooking) =>
        new Date(b.date).getTime() - new Date(a.date).getTime(),
    )
    .slice(0, 6);

  // Get latest created accounts (sorted by creation date)
  const latestCreatedAccounts = allUsers?.data?.slice(0, 6);

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
            <h2 className="text-gray-500 text-sm font-semibold">
              Total Earned
            </h2>
            <p className="text-2xl font-bold">
              $ <CountUp end={totalPaidAmount} enableScrollSpy={true} />
            </p>
          </div>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 transition-transform duration-300"
        >
          <FaFileInvoice className="text-3xl text-green-500" />
          <div>
            <h2 className="text-gray-500 text-sm font-semibold">
              Total Booking
            </h2>
            <p className="text-2xl font-bold">
              <CountUp
                end={allBookings?.data?.length}
                enableScrollSpy={true}
              />{" "}
            </p>
          </div>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 transition-transform duration-300"
        >
          <FaClock className="text-3xl text-orange-500" />
          <div>
            <h2 className="text-gray-500 text-sm font-semibold">
              Unconfirmed Booking
            </h2>
            <p className="text-2xl font-bold">
              {" "}
              <CountUp end={unconfirmedBookings?.length} enableScrollSpy />
            </p>
          </div>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 transition-transform duration-300"
        >
          <FaCheckCircle className="text-3xl text-pink-500" />
          <div>
            <h2 className="text-gray-500 text-sm font-semibold">
              Confirmed Booking
            </h2>
            <p className="text-2xl font-bold">
              <CountUp end={confirmedBookings?.length} enableScrollSpy />
            </p>
          </div>
        </motion.div>
      </div>

      {/* Chart Section */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white p-6 rounded-lg shadow-md mb-6 transition-transform duration-300"
      >
        <h2 className="text-gray-500 text-sm font-semibold mb-4">
          Monthly earned Amount
        </h2>
        <Line data={chartData} options={chartOptions} />
      </motion.div>

      {/* Latest Confirmed Bookings Slider */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 rounded-lg shadow-md mb-6"
      >
        <h2 className="text-gray-500 text-sm font-semibold mb-4">
          Latest Confirmed Bookings
        </h2>
        <Slider {...sliderSettings}>
          {latestConfirmedBookings?.map((booking: TBooking, index: number) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="p-4 bg-blue-50 rounded-lg shadow-sm mx-2"
            >
              <div className="flex items-center space-x-4">
                <FaCalendarAlt className="text-2xl text-blue-600" />
                <div>
                  <p className="text-lg font-bold text-blue-800">
                    {booking.facility?.name || "Unknown Facility"}
                  </p>
                  <p className="text-sm text-gray-600">
                    {moment(booking.date).format("MMM Do, YYYY")}
                  </p>
                  <p className="text-sm text-gray-600">
                    ${booking.payableAmount}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </Slider>
      </motion.div>

      {/* Latest Created Accounts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-gray-500 text-sm font-semibold mb-4">Latest Created Accounts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {latestCreatedAccounts?.map((user: TUser, index: number) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="p-4 bg-purple-50 rounded-lg shadow-sm"
            >
              <div className="flex items-center space-x-4">
                <FaUser className="text-2xl text-purple-600" />
                <div>
                  <p className="text-lg font-bold text-purple-800">
                    {user.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {/* Display a placeholder or no date */}
                    Account Created
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboardHome;
