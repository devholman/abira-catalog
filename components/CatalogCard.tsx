// components/CatalogCard.tsx
import React from "react";

export default function CatalogCard({
  catalog,
  fetchOrders,
}: {
  catalog: any;
  fetchOrders: (id: number) => void;
}) {
  return (
    <div
      className='border p-4 shadow-md rounded-md cursor-pointer hover:bg-gray-100'
      onClick={() => fetchOrders(catalog.id)}
    >
      <h2 className='text-xl font-semibold'>{catalog.name}</h2>
      <p className='text-gray-500'>{catalog.totalOrders} orders</p>
    </div>
  );
}
