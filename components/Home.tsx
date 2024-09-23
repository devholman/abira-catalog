"use client";

import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useStoreConfig } from "../context/StoreConfigContext";
import { useRouter } from "next/navigation";
//components
import ItemCard from "./ItemCard";
import CartIcon from "@/images/CartIcon";
import FilterDropdown from "./FilterDropdown";
import { Categories } from "@/_types";

export default function Home() {
  const {
    storeConfig: { name, branding, items },
  } = useStoreConfig();
  const { totalQuantity } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<
    "TSHIRTS" | "HOODIES" | "ALL"
  >("ALL");
  const categories: Categories[] = [
    Categories.ALL,
    Categories.TSHIRTS,
    Categories.HOODIES,
  ];
  const [filteredItems, setFilteredItems] = useState(items);

  const router = useRouter();

  useEffect(() => {
    setFilteredItems(
      items.filter((item) =>
        selectedCategory === "ALL" ? true : item.category === selectedCategory
      )
    );
  }, [selectedCategory]);

  const handleViewCart = () => {
    router.push("/cart");
  };

  //TODO:: not currently used
  const sortedItems = filteredItems.sort((a, b) => a.price - b.price);

  return (
    <div className='p-5' style={{ backgroundColor: branding.primaryColor }}>
      <div className='flex px-4 justify-between items-center mb-8'>
        <h1
          className='text-3xl font-bold'
          style={{ color: branding.secondaryColor }}
        >
          {name}
        </h1>
        <div className='flex items-center gap-2' onClick={handleViewCart}>
          <CartIcon className={"size-7"} />
          <span className='text-lg'>({totalQuantity.toString()})</span>
        </div>
      </div>
      <FilterDropdown
        categories={categories}
        setSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
      />

      <div className='lg:w-3/4 w-full grid lg:grid-cols-3 grid-cols-2 gap-4 mt-8 content-start'>
        {filteredItems.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
