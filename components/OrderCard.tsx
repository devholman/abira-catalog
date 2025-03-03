// components/OrderCard.tsx
import { useState } from "react";
import { getS3ImageUrl } from "@/utils/images";
import Image from "next/image";

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
  order: {
    id: number;
    storeId: number;
    firstName: string;
    lastName: string;
    totalItems: number;
    totalPrice: number;
    createdAt: string;
    paymentStatus: string;
    updatedAt: string;
    items: OrderItem[];
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

const OrderCard = ({ order, handleDeleteOrder }: OrderProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className='border p-4 mt-2 bg-gray-100'>
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
            Total Order Price: $
            {calculatePriceWithTax(parseInt(order.totalPrice.toFixed(2)))}
          </p>
          <p>Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
          <p className='mt-2'>
            Payment Status: {mapPaymentStatus(order.paymentStatus)}
          </p>
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
                <th className='px-4 py-2'>Item Price</th>
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
                  <td className='border px-4 py-2'>{item.orderPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={() => handleDeleteOrder(order.id, order.storeId)}
            className='bg-red-500 text-white p-2 rounded'
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
};

export default OrderCard;
