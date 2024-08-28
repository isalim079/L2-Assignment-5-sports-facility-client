import { Separator } from "@/components/ui/separator";
import upcoming from "@/assets/upcoming.png";

const upcomingEventsData = [
  {
    eventName: "Summer Football Championship",
    date: "2024-09-15",
    time: "10:00 AM - 2:00 PM",
    location: "Greenfield Sports Arena",
    description:
      "Join us for an exciting football championship featuring the best teams in the city. Don't miss the action!",
    image: "https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg",
    availableSpots: 30,
  },
  {
    eventName: "Tennis Pro Tournament",
    date: "2024-09-20",
    time: "8:00 AM - 12:00 PM",
    location: "Riverside Tennis Club",
    description:
      "Watch the top tennis players compete for the championship title. Reserve your spot to witness the game!",
    image: "https://images.pexels.com/photos/2426845/pexels-photo-2426845.jpeg",
    availableSpots: 20,
  },
  {
    eventName: "Basketball 3-on-3 Showdown",
    date: "2024-09-25",
    time: "5:00 PM - 9:00 PM",
    location: "Downtown Basketball Court",
    description:
      "Show off your basketball skills in this thrilling 3-on-3 tournament. Open for all skill levels.",
    image: "https://images.pexels.com/photos/359067/pexels-photo-359067.jpeg",
    availableSpots: 15,
  },
  {
    eventName: "Citywide Marathon",
    date: "2024-10-01",
    time: "6:00 AM - 12:00 PM",
    location: "City Central Park",
    description:
      "Run through the heart of the city in our annual marathon. All levels are welcome. Register early to secure your spot.",
    image: "https://images.pexels.com/photos/1153899/pexels-photo-1153899.jpeg",
    availableSpots: 50,
  },
  {
    eventName: "Badminton Doubles Championship",
    date: "2024-10-05",
    time: "9:00 AM - 3:00 PM",
    location: "Skyview Badminton Arena",
    description:
      "Compete in this doubles badminton tournament for a chance to win exciting prizes. Bring your A-game!",
    image: "https://images.pexels.com/photos/3423615/pexels-photo-3423615.jpeg",
    availableSpots: 25,
  },
];

const UpcomingEvents = () => {
  return (
    <div>
      <div className="max-w-screen-xl mx-auto font-poppins my-24">
        <h1 className="text-center text-3xl uppercase font-bold text-primarySite">
          Upcoming Sports Events
        </h1>
        <p className="text-center mt-1 lg:w-[50%] mx-auto">
          Discover What's Coming Next at Our Sports Facilities!
        </p>
        <Separator className="my-12" />
        <div className="grid grid-cols-2 gap-10">
          {upcomingEventsData?.map((item) => (
            <div key={item?.eventName}>
              <div className="shadow-md p-4 ">
                <div className="flex items-center justify-between">
                  <img
                    className="w-12 mb-1 animate__animated animate__fadeInUp"
                    src={upcoming}
                    alt=""
                  />
                  <h1 className="font-bold text-lg mb-1">{item?.eventName}</h1>
                </div>
                <Separator className="my-4" />
                <p className="mb-1">{item?.description}</p>

                <p>{item?.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvents;
