"use client";
import { useEffect, useState } from "react";
import FulfillmentTable from "./FulfillmentTable";
import Button from "../../../components/Button";
import { stores } from "../../catalog/catalogConfigs";

type Item = {
  color: string;
  material: string;
  size: string;
  category: string;
  quantity: number;
};

type CatalogConfig = {
  [storeName: string]: {
    storeId: number;
  };
};

const FulfillmentDashboard = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [storeId, setStoreId] = useState<number | null>(null);

  const [items, setItems] = useState<Item[]>([]);

  const handleStoreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedStoreId = parseInt(e.target.value, 10);
    setStoreId(selectedStoreId);
  };

  const fetchFulfillmentData = async () => {
    const response = await fetch("/api/admin/fulfillment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        startDate,
        endDate,
        storeId,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log("🚀 ~ fetchFulfillmentData ~ data:", data);
      const formattedData = Object.entries(data).map(([key, obj]) => {
        const [color, material, size, category] = key
          .split(" ")
          .filter((word) => word !== "Sleeve");
        const { quantity, itemNames } = obj;

        return { color, material, size, category, quantity, itemNames };
      });
      setItems(formattedData);
    } else {
      console.error("Failed to fetch fulfillment data");
    }
  };

  return (
    <div>
      <h1>Fulfillment Dashboard</h1>
      <div className='mb-8'>
        <input
          type='date'
          value={startDate}
          className='mx-2 p-2 border border-slate-500'
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type='date'
          className='mx-2 p-2 border border-slate-500'
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <select
          id='store-select'
          className='w-40 mx-2 p-2 border border-gray-500'
          onChange={handleStoreChange}
          defaultValue='' // Empty default value
        >
          <option value='' disabled>
            Select a store
          </option>
          {Object.keys(stores).map((storeName) => (
            <option key={stores[storeName].id} value={stores[storeName].id}>
              {storeName}
            </option>
          ))}
        </select>
        <Button
          classNames='w-40'
          text={"Get Fulfillment Data"}
          type={"button"}
          handleClick={fetchFulfillmentData}
        ></Button>
      </div>

      <FulfillmentTable items={items} />
    </div>
  );
};

export default FulfillmentDashboard;
