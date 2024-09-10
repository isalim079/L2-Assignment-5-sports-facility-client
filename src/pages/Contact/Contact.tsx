import contact from "@/assets/contact.png";

const Contact = () => {
  return (
    <div>
      <div className="flex flex-col mt-28 items-center px-2 lg:px-0">
        <img className="w-96" src={contact} alt="" />
        <h1 className="text-lg lg:text-4xl text-gray-500 my-3">Thank you for contacting with us!</h1>
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
  );
};

export default Contact;
