import axiosPublic from "@/components/axiosPublic";
import { Separator } from "@/components/ui/separator";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useUpdateIsBookedMutation } from "@/redux/features/bookings/bookingManagement.api";
import { bookingsData } from "@/redux/features/bookings/bookingSlice";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CheckOutForm = () => {
  const user = useSelector(selectCurrentUser);
  const [updateBooking] = useUpdateIsBookedMutation();
  const bookingsInfo = useSelector(bookingsData);
  const [error, setError] = useState<string | undefined>("");
  const [clientSecret, setClientSecret] = useState("");
  const [tnxId, setTnxId] = useState("");
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  // console.log(bookingsInfo);

  useEffect(() => {
    axiosPublic
      .post("/create-payment-intent", { amount: bookingsInfo?.payableAmount })
      .then((res) => {
        //   console.log(res.data);
        setClientSecret(res.data.clientSecret);
      });
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("Payment error", error);
      setError(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setError("");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.userInfo?.email || "anonymous",
            name: user?.userInfo?.name || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("confirm error");
    } else {
      // console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        setTnxId(paymentIntent?.id);

        const res = await updateBooking({
          id: bookingsInfo?._id,
          data: { isBooked: "confirmed", tnxId: paymentIntent?.id },
        }).unwrap();

        if (res.success === true) {
          toast.success("Payment successful. Booking confirmed!");

          setTimeout(() => {
            navigate(`/${user?.userInfo?.role}-dashboard`);
          }, 2000);
        } else {
          toast.error("Something went wrong");
        }
      }
    }
  };

  return (
    <div className="">
      <div className="max-w-screen-xl mx-auto">
        <div className=" h-screen flex flex-col justify-center items-center">
          <div className="mb-4">
            <p>
              Total:{" "}
              <span className="font-bold ml-4">
                ${bookingsInfo?.payableAmount}
              </span>
            </p>
            <Separator className="mt-1" />
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-[620px] mx-auto shadow-md p-4 rounded-md flex justify-between flex-col"
          >
            <CardElement
              className="mb-5"
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
            <button
              className={`bg-primaryBlack text-white px-4 py-2 rounded-md mt-10 ${
                !stripe || !clientSecret ? "bg-gray-400" : ""
              }`}
              type="submit"
              disabled={!stripe || !clientSecret}
            >
              Pay
            </button>
            <p className="text-red-600 mt-2">{error}</p>
            {tnxId && (
              <p className="mt-2">
                <span className="underline mr-2">Transaction Id:</span>{" "}
                <span className="text-green-600 font-bold">{tnxId}</span>
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckOutForm;
