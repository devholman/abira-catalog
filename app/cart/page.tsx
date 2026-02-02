"use client";
import React from "react";

import ShoppingCart from "../../components/ShoppingCart";
import { useRouter, useSearchParams } from "next/navigation";
import { useCart } from "../../context/CartContext";

export const dynamic = "force-dynamic";

export default function Cart() {
  const { cart, removeOrderItem, totalPrice, totalQuantity } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();

  const storeId = searchParams?.get("team");
  const handleConfirm = async () => {
    router.push(`/contactForm?team=${storeId}`);
  };

  return (
    <ShoppingCart
      cartItems={cart}
      total={totalPrice}
      totalQuantity={totalQuantity}
      onConfirm={handleConfirm}
      removeOrderItem={removeOrderItem}
    />
  );
}
