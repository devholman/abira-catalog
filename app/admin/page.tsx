"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@headlessui/react";
import CatalogCard from "../../components/CatalogCard";
import { stores } from "../catalog/catalogConfigs";
import OrderCard from "@/components/OrderCard";
import Accordion from "@/components/Accordion";
import Link from "next/link";

const AdminDashboard = () => {
  const [customers, setCustomers] = useState([]);
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
  const [catalogData, setCatalogData] = useState([]);
  const [orders, setOrders] = useState<any[]>([]);

  // Fetch catalog and order data on page load
  useEffect(() => {
    const fetchCatalogOrders = async () => {
      const response = await fetch("/api/orders/catalogOrders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ catalogConfig: stores, dateRange }),
      });

      const data = await response.json();
      setCatalogData(data);
    };
    fetchCatalogOrders();
  }, []);

  const handleFilterOrders = async () => {
    const response = await fetch("/api/orders/filterByCustomer", {
      method: "POST",
      body: JSON.stringify(filterCriteria),
    });
    const data = await response.json();
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
  const fetchOrders = async (catalogId: number) => {
    try {
      const response = await fetch(`/api/orders/catalogOrders/${catalogId}`); // API to fetch orders for the catalog
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleDeleteOrder = async (orderId: number, storeId: number) => {
    try {
      const response = await fetch(
        `/api/orders/${orderId}?storeId=${storeId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        // Remove the deleted order from the state
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order.id !== orderId)
        );
        console.log("Order deleted successfully");
      } else {
        const errorData = await response.json();
        console.error("Failed to delete order:", errorData.message);
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const handleBuyLabel = async (orderId: number) => {
    try {
      const response = await fetch("/api/shippo/buy-rate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Label purchased successfully:", data);
        // Refresh the orders to show the updated shipping label
        await handleFilterOrders();
      } else {
        const errorData = await response.json();
        console.error("Failed to buy label:", errorData.message);
        alert(`Failed to buy label: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error buying label:", error);
      alert("Error buying label");
    }
  };

  return (
    <div className='p-8'>
      <h1 className='text-2xl font-bold mb-4'>Admin Dashboard</h1>
      <div className='mb-4'>
        <h2 className='text-xl font-semibold'>Filter Orders by Customer</h2>
        <input
          type='text'
          placeholder='First Name'
          value={filterCriteria.firstName}
          onChange={(e) =>
            setFilterCriteria({ ...filterCriteria, firstName: e.target.value })
          }
          className='border p-2 mb-2'
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
      <div className='mb-4'>
        <Link
          className='bg-blue-500 text-white p-2 rounded'
          href='/admin/fulfillment'
        >
          Fulfillment
        </Link>
      </div>
      <h2 className='text-xl font-semibold mb-8'>Stores</h2>
      <div className='container mx-auto p-4 '>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {catalogData.map((catalog: any) => (
            <CatalogCard
              key={catalog.id}
              catalog={catalog}
              fetchOrders={fetchOrders}
            />
          ))}
        </div>
      </div>
      <Accordion
        title={"Orders"}
        content={orders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            handleDeleteOrder={handleDeleteOrder}
            handleBuyLabel={handleBuyLabel}
            handleRemoveOrderFromUI={(id) =>
              setOrders((prev) => prev.filter((o) => o.id !== id))
            }
          />
        ))}
      />
    </div>
  );
};

export default AdminDashboard;
