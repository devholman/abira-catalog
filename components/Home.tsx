"use client";

import React, { useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";
//components
import { ShoppingCartIcon } from "@heroicons/react/20/solid";
import { StoreConfig } from "../app/catalog/catalogConfigs";
import ItemCard from "./ItemCard";

interface HomeProps {
  storeConfig: StoreConfig;
}

export default function Home({ storeConfig }: HomeProps) {
  const { totalQuantity, addToCart, setStoreId, setStoreDetails } = useCart();

  const router = useRouter();

  useEffect(() => {
    setStoreId(storeConfig.id);
    setStoreDetails(storeConfig);
  });

  const handleViewCart = () => {
    router.push("/cart");
  };

  return (
    <div
      className='p-8'
      style={{ backgroundColor: storeConfig.branding.primaryColor }}
    >
      {/* <img
        src={storeConfig.branding.logo}
        alt={`${storeConfig.name} logo`}
        className='mb-8'
      /> */}
      <div className='flex px-4 justify-between items-center mb-8'>
        <h1
          className='text-3xl font-bold'
          style={{ color: storeConfig.branding.secondaryColor }}
        >
          {storeConfig.name}
        </h1>
        <div className='flex items-center gap-2'>
          <ShoppingCartIcon className={"size-7"} onClick={handleViewCart} />
          <span className='text-lg'>({totalQuantity})</span>
        </div>
      </div>
      <div className='lg:w-3/4 w-full grid lg:grid-cols-3 grid-cols-2 gap-4 content-start'>
        {storeConfig.items.map((item) => (
          <ItemCard key={item.id} item={item} addToCart={addToCart} />
        ))}
      </div>
      {/* <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
        {storeConfig.items.map((item) => (
          <ItemCard key={item.id} item={item} addToCart={addToCart} />
        ))}
      </div> */}
      {/* <button
        className='mt-8 px-4 py-2 bg-blue-500 text-white rounded'
        onClick={handleViewCart}
      >
        View Cart
      </button> */}
    </div>
  );
}
