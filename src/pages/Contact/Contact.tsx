import contact from "@/assets/contact.png";

const Contact = () => {
  return (
    <div className=" max-w-screen-xl mx-auto">
      <div className="lg:flex justify-around items-center  lg:h-screen">
        <div className="max-w-md mt-10 p-6 bg-white rounded-lg shadow-md  w-full">
          <h2 className="text-2xl font-bold text-center mb-6 text-primarySite">
            Contact Us
          </h2>
          <form action="#" className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-primarySite focus:ring-primarySite sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-primarySite focus:ring-primarySite sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-primarySite focus:ring-primarySite sm:text-sm"
              ></textarea>
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-primarySite text-white py-2 px-4 rounded-md shadow-sm hover:bg-primaryHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primarySite"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>

        <div className="flex flex-col mt-10 lg:mt-0 items-center px-2 lg:px-0 ">
          <img className="w-96" src={contact} alt="" />
          <h1 className="text-lg lg:text-4xl text-gray-500 my-3">
            Thank you for contacting with us!
          </h1>
          <div>
            <p className="mb-2">
              <strong>Address:</strong> 123 Sports Facility Lane, City, Country
            </p>
            <p className="mb-2">
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

export default Contact;
