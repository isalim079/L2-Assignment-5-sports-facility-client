import CustomerTestimonials from "./CustomerTestimonials(victorySpeaks)/CustomerTestimonials";
import FeaturedFacilities from "./FeaturedFacilities/FeaturedFacilities";
import HowItWorks from "./HowItWorks/HowItWorks";
import TopBanner from "./TopBanner/TopBanner";
import UpcomingEvents from "./UpcomingEvents/UpcomingEvents";

const Home = () => {
  return (
    <div>
      <TopBanner />
      <FeaturedFacilities />
      <HowItWorks />
      <CustomerTestimonials />
      <UpcomingEvents />
    </div>
  );
};

export default Home;
