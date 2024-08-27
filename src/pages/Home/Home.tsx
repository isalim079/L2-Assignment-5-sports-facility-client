import FeaturedFacilities from "./FeaturedFacilities/FeaturedFacilities";
import HowItWorks from "./HowItWorks/HowItWorks";
import TopBanner from "./TopBanner/TopBanner";

const Home = () => {
    return (
        <div>
           <TopBanner />
           <FeaturedFacilities />
           <HowItWorks />
        </div>
    );
};

export default Home;