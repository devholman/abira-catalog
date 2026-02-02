"use client";
import { useState } from "react";
import FulfillmentTable, { Item } from "./FulfillmentTable";
import Button from "../../../components/Button";
import { stores } from "../../catalog/catalogConfigs";
import Accordion from "@/components/Accordion";
import LogoCountTable from "./LogoCountTable";

export const dynamic = "force-dynamic";

type LogoCount = {
  [key: string]: number;
};
type FulfillmentObj = {
  color: string;
  material: string;
  size: string;
  category: string;
  quantity: number;
  itemNames: string[];
};

const exclusionWords = ["Sleeve", "(+", "$5)"];

const FulfillmentDashboard = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [storeId, setStoreId] = useState<number | null>(null);

  const [items, setItems] = useState<Item[]>([]);
  const [logoCount, setLogoCount] = useState<LogoCount>({});

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
      const {
        fulfillmentCount,
        logoCount,
      }: {
        fulfillmentCount: { [key: string]: FulfillmentObj };
        logoCount: LogoCount;
      } = data;

      const formattedData = Object.entries(fulfillmentCount).map(
        ([key, obj]) => {
          console.log(key);
          const [color, material, size, category] = key
            .split(",")
            .filter((word: string) => !exclusionWords.includes(word));
          const { quantity, itemNames } = obj;

          return { color, material, size, category, quantity, itemNames };
        },
      );
      setItems(formattedData);
      setLogoCount(logoCount);
    } else {
      console.error("Failed to fetch fulfillment data");
    }
  };

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Fulfillment Dashboard</h1>
      <div className='flex mb-8'>
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
        <span className='flex w-40'>
          <Button
            text={"Get Fulfillment Data"}
            type='button'
            handleClick={fetchFulfillmentData}
          ></Button>
        </span>
      </div>
      <Accordion
        title='What to Order'
        content={<FulfillmentTable items={items} />}
      />
      <Accordion
        title='Logo count'
        content={<LogoCountTable logoCount={logoCount} />}
      />
    </div>
  );
};

export default FulfillmentDashboard;
