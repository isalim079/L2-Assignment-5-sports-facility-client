import { Separator } from "@/components/ui/separator";
import { Rating, Star } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import moment from "moment";
import Marquee from "react-fast-marquee";

const myStyles = {
  itemShapes: Star,
  activeFillColor: "#ffb700",
  inactiveFillColor: "#fbf1a9",
};

const testimonialsData = [
  {
    name: "Sarah Nolan",
    feedback:
      "Booking was a breeze, and the facility was top-notch! Will definitely use this service again.",
    rating: 5,
    date: "2024-07-12",
    image: "https://i.ibb.co/BVwKC53/testimonial1.jpg",
  },
  {
    name: "Makai Lee",
    feedback:
      "Great experience! The sports facility was clean, well-maintained, and everything was organized perfectly.",
    rating: 4,
    date: "2024-06-30",
    image: "https://i.ibb.co/t3JhDRv/testimonial2.jpg",
  },
  {
    name: "Mike Johnson",
    feedback:
      "Loved how easy it was to book! The staff was friendly and the amenities exceeded my expectations.",
    rating: 5,
    date: "2024-08-10",
    image: "https://i.ibb.co/BwvG3s5/testimonial3.jpg",
  },
  {
    name: "Scott Wilson",
    feedback:
      "The booking process was simple, and I enjoyed the seamless experience from start to finish.",
    rating: 4,
    date: "2024-05-25",
    image: "https://i.ibb.co/SPF1TRw/testimonial4.jpg",
  },
  {
    name: "David Kim",
    feedback:
      "Fantastic service! It’s now my go-to platform for finding the best sports facilities in my area.",
    rating: 5,
    date: "2024-08-01",
    image: "https://i.ibb.co/YXwQhFt/testimonial5.jpg",
  },
];

const CustomerTestimonials = () => {
  return (
    <div>
      <div className="max-w-screen-xl mx-auto font-poppins my-24">
        <h1 className="text-center text-3xl uppercase font-bold text-primarySite">
          Victory Speaks
        </h1>
        <p className="text-center mt-1 lg:w-[50%] mx-auto">
          Hear from champions who’ve made winning moves with our facilities.
        </p>
        <Separator className="my-12" />
        <div className="">
          <Marquee className="py-10">
            {testimonialsData?.map((item) => (
              <div key={item?.name}>
                <div className="shadow-md p-4 w-72 ml-10 min-h-[360px]">
                  <img className="w-16 rounded-full" src={item?.image} alt="" />
                  <Separator className="my-5" />
                  <h1 className="font-bold text-lg mb-1">{item?.name}</h1>
                  <p className="mb-1">{item?.feedback}</p>
                  <Rating
                    className="mb-1"
                    value={item?.rating}
                    itemStyles={myStyles}
                    style={{ maxWidth: 120 }}
                    readOnly
                  />
                  <p>{moment(item?.date).format("DD MMMM, YYYY")}</p>
                </div>
              </div>
            ))}
          </Marquee>
        </div>
        <Separator className="my-12" />
      </div>
    </div>
  );
};

export default CustomerTestimonials;
