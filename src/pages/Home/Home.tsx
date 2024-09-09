import CustomerTestimonials from "./CustomerTestimonials(victorySpeaks)/CustomerTestimonials";
import FeaturedFacilities from "./FeaturedFacilities/FeaturedFacilities";
import HowItWorks from "./HowItWorks/HowItWorks";
import TopBanner from "./TopBanner/TopBanner";
import UpcomingEvents from "./UpcomingEvents/UpcomingEvents";
import ScrollToTop from "react-scroll-to-top";

const Home = () => {
  return (
    <div>
      <TopBanner />
      <FeaturedFacilities />
      <HowItWorks />
      <CustomerTestimonials />
      <UpcomingEvents />
      <ScrollToTop className="pl-[14px] pr-[40px]" smooth />
    </div>
  );
};

export default Home;
