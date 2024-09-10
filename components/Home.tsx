"use client";

import React from "react";
import { useCart } from "../context/CartContext";
import { useStoreConfig } from "../context/StoreConfigContext";
import { useRouter } from "next/navigation";
//components
import { ShoppingCartIcon } from "@heroicons/react/20/solid";
import ItemCard from "./ItemCard";

export default function Home() {
  const { totalQuantity } = useCart();
  const {
    storeConfig: { name, branding, items },
  } = useStoreConfig();

  const router = useRouter();

  const handleViewCart = () => {
    router.push("/cart");
  };

  return (
    <div className='p-8' style={{ backgroundColor: branding.primaryColor }}>
      {/* <img
        src={storeConfig.branding.logo}
        alt={`${storeConfig.name} logo`}
        className='mb-8'
      /> */}
      <div className='flex px-4 justify-between items-center mb-8'>
        <h1
          className='text-3xl font-bold'
          style={{ color: branding.secondaryColor }}
        >
          {name}
        </h1>
        <div className='flex items-center gap-2' onClick={handleViewCart}>
          <ShoppingCartIcon className={"size-7"} />
          <span className='text-lg'>({totalQuantity.toString()})</span>
        </div>
      </div>
      <div className='lg:w-3/4 w-full grid lg:grid-cols-3 grid-cols-2 gap-4 content-start'>
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
