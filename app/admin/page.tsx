"use client";
import React, { useState } from "react";
import { Input } from "@headlessui/react";

const AdminDashboard = () => {
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [storeId, setStoreId] = useState("");
  const [filterCriteria, setFilterCriteria] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    orderId: "",
    email: "",
  });
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
  const [itemId, setItemId] = useState("");

  const handleFilterOrders = async () => {
    const response = await fetch("/api/orders/filterByCustomer", {
      method: "POST",
      body: JSON.stringify(filterCriteria),
    });
    const data = await response.json();
    console.log("🚀 ~ handleFilterOrders ~ data:", data);
    setOrders(data);
  };

  const handleListCustomers = async () => {
    const response = await fetch("/api/customers/byStore", {
      method: "POST",
      body: JSON.stringify({ storeId }),
    });
    const data = await response.json();
    setCustomers(data);
  };

  const handleFilterByItemDateRange = async () => {
    const response = await fetch("/api/orders/filterByItemDateRange", {
      method: "POST",
      body: JSON.stringify({
        itemId,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        storeId,
      }),
    });
    const data = await response.json();
    setOrders(data);
  };

  return (
    <div className='p-8'>
      <h1 className='text-2xl font-bold mb-4'>Admin Dashboard</h1>

      <div className='mb-4'>
        <h2 className='text-xl font-semibold'>Filter Orders by Customer</h2>
        <Input
          type='text'
          placeholder='First Name'
          value={filterCriteria.firstName}
          onChange={(e) =>
            setFilterCriteria({ ...filterCriteria, firstName: e.target.value })
          }
          className='mt-1 block w-full font-large text-black border-gray-300 rounded-md shadow-sm'
        />

        <input
          type='text'
          placeholder='Last Name'
          value={filterCriteria.lastName}
          onChange={(e) =>
            setFilterCriteria({ ...filterCriteria, lastName: e.target.value })
          }
          className='border p-2 mb-2'
        />
        <input
          type='text'
          placeholder='Phone Number'
          value={filterCriteria.phoneNumber}
          onChange={(e) =>
            setFilterCriteria({
              ...filterCriteria,
              phoneNumber: e.target.value,
            })
          }
          className='border p-2 mb-2'
        />
        <input
          type='text'
          placeholder='Order ID'
          value={filterCriteria.orderId}
          onChange={(e) =>
            setFilterCriteria({ ...filterCriteria, orderId: e.target.value })
          }
          className='border p-2 mb-2'
        />
        <input
          type='text'
          placeholder='Email'
          value={filterCriteria.email}
          onChange={(e) =>
            setFilterCriteria({ ...filterCriteria, email: e.target.value })
          }
          className='border p-2 mb-2'
        />
        <button
          onClick={handleFilterOrders}
          className='bg-blue-500 text-white p-2 rounded'
        >
          Filter Orders
        </button>
      </div>

      <div className='mb-4'>
        <h2 className='text-xl font-semibold'>List Customers by Store ID</h2>
        <input
          type='number'
          placeholder='Store ID'
          value={storeId}
          onChange={(e) => setStoreId(e.target.value)}
          className='border p-2 mb-2'
        />
        <button
          onClick={handleListCustomers}
          className='bg-blue-500 text-white p-2 rounded'
        >
          List Customers
        </button>
      </div>

      <div className='mb-4'>
        <h2 className='text-xl font-semibold'>
          Filter Orders by Item and Date Range
        </h2>
        <input
          type='text'
          placeholder='Item ID'
          value={itemId}
          onChange={(e) => setItemId(e.target.value)}
          className='border p-2 mb-2'
        />
        <input
          type='date'
          placeholder='Start Date'
          value={dateRange.startDate}
          onChange={(e) =>
            setDateRange({ ...dateRange, startDate: e.target.value })
          }
          className='border p-2 mb-2'
        />
        <input
          type='date'
          placeholder='End Date'
          value={dateRange.endDate}
          onChange={(e) =>
            setDateRange({ ...dateRange, endDate: e.target.value })
          }
          className='border p-2 mb-2'
        />
        <button
          onClick={handleFilterByItemDateRange}
          className='bg-blue-500 text-white p-2 rounded'
        >
          Filter by Date
        </button>
      </div>

      <div className='mt-8'>
        <h2 className='text-xl font-semibold'>Orders</h2>
        <pre>{JSON.stringify(orders, null, 2)}</pre>
      </div>

      <div className='mt-8'>
        <h2 className='text-xl font-semibold'>Customers</h2>
        <pre>{JSON.stringify(customers, null, 2)}</pre>
      </div>
    </div>
  );
};

export default AdminDashboard;
