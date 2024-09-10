import img1 from "@/assets/aboutUs.png";
import { milestones, teamMembers } from "./AboutUsData";
import { Separator } from "@/components/ui/separator";
import journey from "@/assets/journey.png";

const About = () => {
  return (
    <div>
      <div className="max-w-screen-xl mx-auto mt-28 font-poppins">
        {/* ------------------ our mission -------------------- */}
        <div className="flex flex-col-reverse  lg:flex-row lg:justify-between  items-center px-2 lg:px-2">
          <div className="">
            <h1 className="lg:text-5xl text-2xl font-bold uppercase mb-2">
              Our Mission
            </h1>
            <p className="lg:max-w-[80%] text-justify">
              {" "}
              We aim to make sports facility booking easy, fast, and accessible
              to everyone. Our platform is designed to empower athletes, teams,
              and individuals by providing them with the best facilities to
              enhance their performance and enjoyment of sports.
            </p>
          </div>
          <div className=" w-[85%]">
            <img className="" src={img1} alt="" />
          </div>
        </div>

        {/* ----------------- Our team members */}
        <div>
          <h1 className="text-center text-lg lg:text-3xl uppercase mt-20 font-bold text-primarySite">
            Our team members
          </h1>
          <Separator className="mb-16 mt-5" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16 px-2 lg:px-0">
          {teamMembers.map((item, index) => (
            <div key={index}>
              <img
                className="w-16 h-16 object-cover rounded-full"
                src={item?.image}
                alt=""
              />
              <div className="flex items-center justify-between mt-1">
                <h1 className="font-semibold text-lg">{item?.name}</h1>
                <h1 className="underline font-semibold">{item?.role}</h1>
              </div>
              <Separator className="my-3" />
              <h1>{item?.bio}</h1>
            </div>
          ))}
        </div>

        {/* -------------- History and Milestone */}
        <div className="my-20">
          <h2 className="text-3xl font-bold text-center text-primarySite">
            Our Journey
          </h2>
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
            {milestones.map((item, index) => (
              <div className="shadow-md p-5 rounded-md space-y-2" key={index}>
                <img className="w-14" src={journey} alt="" />
                <p>{item?.year}</p>
                <p>{item?.event}</p>
              </div>
            ))}
          </div>
        </div>

        {/* --------------- contact information --------------------- */}
        <div className="my-10 px-2 lg:px-0">
          <h2 className="text-3xl font-bold text-primarySite">Contact Us</h2>
          <p className="mt-4">
            We'd love to hear from you! Reach out to us at:
          </p>
          <div className="mt-6 space-y-2">
            <p>
              <strong>Address:</strong> 123 Sports Facility Lane, City, Country
            </p>
            <p>
              <strong>Phone:</strong> +123-456-7890
            </p>
            <p>
              <strong>Email:</strong> contact@sportsfacility.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
