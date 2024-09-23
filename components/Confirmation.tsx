import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";
const Confirmation = ({
  confirmationNumber,
}: {
  confirmationNumber: string;
}) => {
  const [paymentLink, setPaymentLink] = useState<string | null>(null);
  const { totalPrice } = useCart();
  // useEffect(() => {
  //   console.log("run useeffect confirmation");
  //   // Fetch payment link from the server
  //   const fetchPaymentLink = async () => {
  //     try {
  //       console.log("fetingch payment link ...");
  //       const res = await fetch("/api/square/create-payment-link", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           amount: 1000, // For $10.00 payment
  //           orderId: "YOUR_ORDER_ID", // Unique order identifier
  //         }),
  //       });

  //       const data = await res.json();
  //       if (data.success) {
  //         setPaymentLink(data.url);
  //       } else {
  //         console.error("Error creating payment link:", data.error);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching payment link:", error);
  //     }
  //   };
  //   fetchPaymentLink();
  // }, []);
  return (
    <div className='min-h-screen bg-gray-100 flex flex-col items-center p-6'>
      {/* Title Section */}
      <div className='bg-white w-full max-w-2xl p-8 rounded-lg shadow-md'>
        <h1 className='text-3xl font-bold text-center text-gray-800 mb-4'>
          Order Confirmed!
        </h1>
        <p className='text-center text-lg text-gray-600'>
          Thank you for your order! Your order confirmation number is:
        </p>
        <p className='text-center text-2xl font-semibold text-gray-800 my-4'>
          #{confirmationNumber || "N/A"}
        </p>

        {/* Steps for Payment */}
        <div className='mt-6'>
          <h2 className='text-xl font-semibold text-gray-800 mb-2'>
            How to Pay:
          </h2>
          <ol className='list-decimal list-inside text-gray-700 space-y-2'>
            <li>Open the Venmo app on your phone or use the web app.</li>
            <li>
              Send the total amount of your order to our Venmo account:{" "}
              <strong>@Ariel-Rodrigues</strong>
              <h6 className='text-xl mt-2 font-bold text-center text-gray-800 mb-4'>
                Total: ${totalPrice.toString()}
              </h6>
            </li>
            <li>
              In the note section, make sure to include your{" "}
              <strong>Order Number</strong> and <strong>Your Name</strong>.
            </li>
            <li>Once payment is received, your order will be fullfilled.</li>
          </ol>
        </div>

        {/* Venmo Button */}
        <div className='mt-6 flex justify-center'>
          <a
            href='https://venmo.com/'
            target='_blank'
            rel='noopener noreferrer'
            className='bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-md shadow-md inline-flex items-center'
          >
            Pay with Venmo
          </a>
        </div>
        {/* 
        <div className='mt-6 flex justify-center'>
          {paymentLink ? (
            <a href={paymentLink} target='_blank' rel='noopener noreferrer'>
              Complete your payment
            </a>
          ) : (
            <p>Loading payment link...</p>
          )}
        </div> */}

        {/* Contact Section */}
        <div className='mt-8'>
          <h2 className='text-lg font-semibold text-gray-800 mb-2'>
            Need Help?
          </h2>
          <p className='text-gray-700'>
            If you have any questions or need to contact us regarding your
            order, please email us at:{" "}
            <a
              href='mailto:abirasportsapparel@gmail.com'
              className='text-blue-600 underline'
            >
              abirasportsapparel@gmail.com
            </a>
            . Be sure to include your order confirmation number for faster
            assistance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
