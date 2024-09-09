"use client";
import ItemCard from "../components/ItemCard";
import items from "../data/items.json";
import { Item } from "@/_types";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";

export default function Home() {
  const { cart, addToCart, removeFromCart } = useCart();

  const router = useRouter();

  const handleToggle = (item: Item, selected: boolean) => {
    if (selected) {
      addToCart(item);
    } else {
      removeFromCart(item.id);
    }
  };

  const handleViewCart = () => {
    router.push("/cart");
  };

  return (
    <div className='p-8'>
      <h1 className='text-3xl font-bold mb-8'>Apparel Store</h1>
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} onToggle={handleToggle} />
        ))}
      </div>
      <button
        className="mt-8 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={handleViewCart}
      >
        View Cart ({cart.length})
      </button> */}
    </div>
  );
}
