"use client";
import React from "react";

import ShoppingCart from "../../components/ShoppingCart";
import { useRouter } from "next/navigation";
import { useCart } from "../../context/CartContext";

export default function Cart() {
  const { cart, removeOrderItem, totalPrice, totalQuantity } = useCart();
  const router = useRouter();

  const handleConfirm = async () => {
    router.push("/contactForm");
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
