"use client";
// context/CartContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

import { Item } from "../_types";

import { toFixedNumber } from "../utils/numUtils";
import { StoreConfig } from "@/app/catalog/catalogConfigs";

interface CartContextType {
  cart: Item[];
  totalQuantity: Number;
  totalPrice: Number;
  storeId: Number;
  storeDetails: StoreConfig;
  addToCart: (item: Item) => void;
  removeFromCart: (id: number) => void;
  removeOrderItem: (id: number, orderId: string) => void;
  setStoreId: (id: number) => void;
  setStoreDetails: (x: StoreConfig) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Item[]>([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [storeId, setStoreId] = useState<number>(0);
  const [storeDetails, setStoreDetails] = useState<StoreConfig>({});

  useEffect(() => {
    calculateQuantity(cart);
    calculateTotalPrice(cart);
  }, [cart]);

  const calculateQuantity = (cart: Item[]) => {
    let totalQuantity = 0;
    cart?.map((item: Item) => {
      const quant = item.orders.reduce((sum, order) => sum + order.quantity, 0);

      totalQuantity += quant;
    });
    setTotalQuantity(totalQuantity);
  };

  const calculateTotalPrice = (cart: Item[]) => {
    let totalPrice = 0;
    cart?.map((item: Item) => {
      const price = item.orders.reduce(
        (sum, order) => sum + item.price * order.quantity,
        0
      );
      totalPrice += price;
    });
    setTotalPrice(toFixedNumber(totalPrice, 2, 10));
  };

  const addToCart = (item: Item) => {
    setCart((prevCart) => {
      const itemIndex = prevCart?.findIndex(
        (cartItem) => cartItem.id === item.id
      );
      if (itemIndex !== -1) {
        // If the item already exists, update it
        const updatedCart = prevCart?.map((cartItem, index) =>
          index === itemIndex ? { ...cartItem, ...item } : cartItem
        );
        console.log("updated cart: ", updatedCart);
        return updatedCart;
      } else {
        // If the item does not exist, add it to the cart
        console.log("new cart item: ", [...prevCart, item]);
        return [...prevCart, item];
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart?.filter((item) => item.id !== id));
  };

  const removeOrderItem = (id: number, orderId: string) => {
    setCart((prevCart) => {
      // Find the object by the provided objectId
      const targetObject = prevCart?.find((item) => item.id === id);

      // If the object is found
      if (targetObject) {
        // Filter out the order with the matching orderId
        targetObject.orders = targetObject.orders.filter(
          (order) => order.id !== orderId
        );
        if (!targetObject.orders.length) {
          return [...prevCart?.filter((item) => item.id !== id)];
        }
      } else {
        console.log(`Object with id ${id} not found.`);
      }
      console.log(prevCart);
      return [...prevCart];
    });
  };

  // const updateCartItem = (id: number, details: Partial<Item>) => {
  //   setCart((prevCart) =>
  //     prevCart.map((item: { id: number }) =>
  //       item.id === id ? { ...item, ...details } : item
  //     )
  //   );
  // };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        totalQuantity,
        totalPrice,
        storeId,
        storeDetails,
        addToCart,
        removeFromCart,
        removeOrderItem,
        clearCart,
        setStoreId,
        setStoreDetails,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
