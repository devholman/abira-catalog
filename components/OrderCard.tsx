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
    items: OrderItem[];
  };
}

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
          <p>Total Price: ${order.totalPrice.toFixed(2)}</p>
          <p>Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
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
