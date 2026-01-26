// components/OrderCard.tsx
import { useState } from "react";
import { getS3ImageUrl } from "@/utils/images";
import Image from "next/image";
import { useToast } from "@/context/ToastContext";

interface OrderItem {
  id: number;
  title: string;
  size: string;
  quantity: number;
  isAddBack: boolean;
  playerName?: string;
  playerNumber?: string;
  material: string;
  color: string;
  notes: string;
  productImage: string;
}

interface OrderProps {
  handleDeleteOrder: (orderId: number, storeId: number) => void;
  handleBuyLabel: (orderId: number) => void;
  handleRemoveOrderFromUI: (orderId: number) => void;
  order: {
    id: number;
    storeId: number;
    firstName: string;
    lastName: string;
    totalItems: number;
    totalPrice: number;
    createdAt: string;
    paymentStatus: string;
    status: string;
    isPickup: boolean;
    updatedAt: string;
    items: OrderItem[];
    shippingPrice?: number;
    shippingLabelUrl?: string;
    shippingLabels?: {
      id: string;
      trackingNumber: string;
      refundStatus: string;
      refunded: boolean;
    }[];
  };
}
const mapPaymentStatus = (status: string) => {
  switch (status) {
    case "COMPLETED":
      return <span className='bg-green-500 text-white p-2 rounded'>Paid</span>;
    case "PENDING":
      return (
        <span className='bg-yellow-500 text-white p-2 rounded'>Pending</span>
      );
    case "FAILED":
      return <span className='bg-red-500 text-white p-2 rounded'>Failed</span>;
    default:
      return status;
  }
};

const calculatePriceWithTax = (price: number): number => {
  const taxRate = 0.0825;
  const tax = price * taxRate;
  return parseFloat((price + tax).toFixed(2));
};
const calculateTax = (price: number): number => {
  const taxRate = 0.0825;
  const tax = price * taxRate;
  return parseFloat(tax.toFixed(2));
};

const OrderCard = ({
  order,
  handleDeleteOrder,
  handleBuyLabel,
  handleRemoveOrderFromUI,
}: OrderProps) => {
  console.log("🚀 ~ OrderCard ~ order:", order);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showShippingDetails, setShowShippingDetails] = useState(false);
  const [loadingAction, setLoadingAction] = useState<
    null | "cancel" | "finalDelete"
  >(null);
  const { showToast } = useToast();

  const handleCancelOrder = async () => {
    setLoadingAction("cancel");
    try {
      const res = await fetch(`/api/orders/${order.id}/cancel-request`, {
        method: "POST",
      });
      if (res.ok) {
        console.log("Order marked as CANCEL_REQUESTED");
        showToast("Order marked as CANCEL_REQUESTED", "success");
        // Optionally: refresh or update order state in parent
      } else {
        const errorData = await res.json();
        console.error("Cancel failed:", errorData.message);
        showToast(`Cancel failed: ${errorData.message}`, "error");
      }
    } catch (err) {
      console.error("Cancel error:", err);
      showToast(
        "An error occurred while attempting to cancel the order.",
        "error"
      );
    } finally {
      setLoadingAction(null);
    }
  };

  const handleFinalDelete = async () => {
    setLoadingAction("finalDelete");
    try {
      const res = await fetch(`/api/orders/${order.id}/final-delete`, {
        method: "DELETE",
      });
      if (res.ok) {
        console.log("Order fully deleted");
        showToast("Order fully deleted", "success");
        handleRemoveOrderFromUI(order.id);
      } else {
        const errorData = await res.json();
        console.error("Final delete failed:", errorData.message);
        showToast(`Final delete failed: ${errorData.message}`, "error");
      }
    } catch (err) {
      console.error("Final delete error:", err);
      showToast("An error occurred while attempting final delete.", "error");
    } finally {
      setLoadingAction(null);
    }
  };

  return (
    <div className='border p-4 mt-2 bg-gray-100 rounded-md'>
      <div
        className='flex justify-between items-center cursor-pointer'
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div>
          <h4 className='text-md font-semibold'>
            {order.firstName} {order.lastName}
          </h4>
          <p>Total Items: {order.totalItems}</p>
          <p>
            Subtotal: ${order.totalPrice.toFixed(2)} | Tax: $
            {calculateTax(order.totalPrice).toFixed(2)} | Total: $
            {calculatePriceWithTax(order.totalPrice).toFixed(2)}
          </p>
          <p>Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
          <p className='mt-2'>
            Payment Status: {mapPaymentStatus(order.paymentStatus)}
          </p>
          <p className='mt-2'>
            Shipping: {order.isPickup ? "Local Pickup" : "Ship"}
            {!order.isPickup && (
              <button
                onClick={() => setShowShippingDetails(!showShippingDetails)}
                className='ml-2 px-2 py-1 text-xs rounded border border-green-500 text-green-700 bg-white hover:bg-green-50 focus:outline-none'
                style={{ verticalAlign: "middle" }}
                aria-label={
                  showShippingDetails
                    ? "Hide Shipping Details"
                    : "View Shipping Details"
                }
              >
                {showShippingDetails ? "Hide" : "View"}
              </button>
            )}
          </p>

          {/* Shipping Details Section */}
          {!order.isPickup && showShippingDetails && (
            <div className='mt-2 border border-green-200 bg-green-50 rounded p-3 text-sm'>
              <div className='mb-2'>
                {order.shippingPrice && (
                  <div className='flex items-center mb-1'>
                    <span className='font-medium w-32'>Shipping Price:</span>
                    <span>${order.shippingPrice.toFixed(2)}</span>
                  </div>
                )}
                {order.shippingLabelUrl && (
                  <div className='flex items-center mb-1'>
                    <span className='font-medium w-32'>Shipping Label:</span>
                    <a
                      href={order.shippingLabelUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-blue-600 underline ml-1'
                    >
                      View Label
                    </a>
                  </div>
                )}
              </div>
              {order.shippingLabels?.length > 0 && (
                <div className='mb-2'>
                  <div className='font-semibold mb-1'>Shipping Labels:</div>
                  <ul className='pl-4'>
                    {order.shippingLabels.map((label) => (
                      <li key={label.id} className='mb-2'>
                        <div className='flex items-center'>
                          <span className='font-medium w-32'>Tracking #:</span>
                          {label.trackingNumber ? (
                            <a
                              href={`https://www.shippo.com/tracking/?id=${label.trackingNumber}`}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='text-blue-600 underline ml-1'
                            >
                              {label.trackingNumber}
                            </a>
                          ) : (
                            <span className='ml-1'>N/A</span>
                          )}
                        </div>
                        <div className='flex items-center mt-1'>
                          <span className='font-medium w-32'>
                            Refund Status:
                          </span>
                          <span
                            className={`ml-1 px-2 py-1 rounded text-white text-xs
                              ${
                                label.refundStatus === "SUCCESS"
                                  ? "bg-green-600"
                                  : label.refundStatus === "PENDING" ||
                                    label.refundStatus === "QUEUED"
                                  ? "bg-yellow-500"
                                  : label.refundStatus === "FAILED"
                                  ? "bg-red-600"
                                  : "bg-gray-400"
                              }
                            `}
                          >
                            {label.refundStatus}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
        <button
          className='text-sm text-blue-500'
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Collapse" : "Expand"}
        </button>
      </div>

      {/* Expanded View */}
      {isExpanded && (
        <>
          <table className='min-w-full mt-4 bg-white shadow-sm mb-2'>
            <thead>
              <tr>
                <th className='px-4 py-2'>Color</th>
                <th className='px-4 py-2'>Name</th>
                <th className='px-4 py-2'>Size</th>
                <th className='px-4 py-2'>Material</th>
                <th className='px-4 py-2'>Color</th>
                <th className='px-4 py-2'>Quantity</th>
                <th className='px-4 py-2'>Add Back</th>
                <th className='px-4 py-2'>Notes</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item) => (
                <tr key={item.id}>
                  <td className='border px-4 py-2'>
                    <Image
                      src={getS3ImageUrl(item.productImage)}
                      alt={item.title}
                      width={100}
                      height={100}
                      priority
                      quality={75} // Adjust quality for optimization
                      unoptimized
                    />
                  </td>
                  <td className='border px-4 py-2'>{item.title}</td>
                  <td className='border px-4 py-2'>{item.size}</td>
                  <td className='border px-4 py-2'>{item.material}</td>
                  <td className='border px-4 py-2'>{item.color}</td>
                  <td className='border px-4 py-2'>{item.quantity}</td>
                  <td className='border px-4 py-2'>
                    {item.isAddBack
                      ? `${item.playerName} - ${item.playerNumber}`
                      : "No"}
                  </td>
                  <td className='border px-4 py-2'>{item.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {!order.isPickup && !order.shippingLabelUrl && (
            <button
              onClick={() => handleBuyLabel(order.id)}
              className='bg-blue-500 text-white p-2 rounded mr-2'
            >
              Buy Shipping Label
            </button>
          )}
          <div className='flex gap-4 mt-4 flex-wrap'>
            <button
              onClick={() => handleDeleteOrder(order.id, order.storeId)}
              className='bg-red-500 text-white p-2 rounded'
              disabled={loadingAction !== null}
            >
              Delete (Legacy)
            </button>
            {order.status !== "CANCEL_REQUESTED" && (
              <button
                onClick={handleCancelOrder}
                className='bg-yellow-500 text-white p-2 rounded'
                disabled={loadingAction !== null}
              >
                {loadingAction === "cancel" ? "Cancelling..." : "Cancel Order"}
              </button>
            )}
            {order.status === "CANCEL_REQUESTED" && (
              <button
                onClick={handleFinalDelete}
                className={`p-2 rounded text-white ${
                  loadingAction !== null ||
                  !order.shippingLabels?.every((label) => label.refunded)
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-purple-600 hover:bg-purple-700"
                }`}
                disabled={
                  loadingAction !== null ||
                  !order.shippingLabels?.every((label) => label.refunded)
                }
              >
                {loadingAction === "finalDelete"
                  ? "Deleting..."
                  : "Final Delete"}
              </button>
            )}
            {/* ...existing code... */}
          </div>
        </>
      )}
    </div>
  );
};

export default OrderCard;
