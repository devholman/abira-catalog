"use client";
// context/CartContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

import { StoreItem } from "../_types";

import { toFixedNumber } from "../utils/numUtils";
import { DRIFIT } from "@/app/catalog/catalogConfigs";
import { DEFAULT_BACKOPTION_PRICE } from "@/app/cart/cartConfig";

interface CartContextType {
  cart: StoreItem[];
  totalQuantity: Number;
  totalPrice: Number;
  currentStoreId: Number;
  addToCart: (item: StoreItem) => void;
  removeFromCart: (id: number) => void;
  calculateTotalPrice: (cart: StoreItem[]) => void;
  removeOrderItem: (id: number, orderId: string) => void;
  setStoreId: (id: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({
  children,
  storeId,
}: {
  children: ReactNode;
  storeId: number;
}) => {
  const [cart, setCart] = useState<StoreItem[]>(() => {
    // Initialize cart from localStorage
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [currentStoreId, setStoreId] = useState<number>(0);

  useEffect(() => {
    if (storeId) {
      setStoreId(storeId);
    }
  }, [storeId]);

  useEffect(() => {
    // Retrieve cart data from localStorage when the component mounts
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Update cart quantity and total price when cart changes
  useEffect(() => {
    calculateQuantity(cart);
    calculateTotalPrice(cart);

    if (cart.length === 0) {
      localStorage.removeItem("cart");
    } else {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const calculateQuantity = (cart: StoreItem[]): void => {
    let _totalQuantity = 0;
    cart?.map((item: StoreItem) => {
      const quant = item.orders.reduce((sum, order) => sum + order.quantity, 0);

      _totalQuantity += quant;
    });
    setTotalQuantity(_totalQuantity);
    localStorage.setItem("totalQuantity", JSON.stringify(_totalQuantity));
  };

  const calculateTotalPrice = (cart: StoreItem[]): void => {
    let totalPrice = 0;
    cart?.map((item: StoreItem) => {
      const price = item.orders.reduce((sum, order) => {
        let base = item.price;
        const backOptionPrice =
          item.backOptionPrice ?? DEFAULT_BACKOPTION_PRICE;
        if (order.isAddBack) {
          base += backOptionPrice;
        }
        if (order.material === DRIFIT) {
          base += 5;
        }
        if (
          order.size === "2XL" ||
          order.size === "3XL" ||
          order.size === "4XL"
        ) {
          base += 3;
        }
        return sum + base * order.quantity;
      }, 0);
      totalPrice += price;
    });
    let formattedPrice = toFixedNumber(totalPrice, 2, 10);
    setTotalPrice(formattedPrice);
    localStorage.setItem("totalPrice", JSON.stringify(formattedPrice));
  };

  const addToCart = (item: StoreItem) => {
    setCart((prevCart) => {
      const itemIndex = prevCart?.findIndex(
        (cartItem) => cartItem.id === item.id
      );

      if (itemIndex !== -1) {
        // If the item already exists, update it
        const updatedCart = prevCart?.map((cartItem, index) =>
          index === itemIndex ? { ...cartItem, ...item } : cartItem
        );
        return updatedCart;
      } else {
        // If the item does not exist, add it to the cart
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
        currentStoreId,
        addToCart,
        calculateTotalPrice,
        removeFromCart,
        removeOrderItem,
        clearCart,
        setStoreId,
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
