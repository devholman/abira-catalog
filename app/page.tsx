"use client";
import ItemCard from "../components/ItemCard";
import items from "../data/items.json";
import { Item, StoreItem } from "@/_types";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";

export default function Home() {
  const { cart, addToCart, removeFromCart } = useCart();

  const router = useRouter();

  const handleToggle = (item: StoreItem, selected: boolean) => {
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
      <h1 className='text-2xl font-bold mb-8'>Abira Sports Team Catalogs</h1>
      <p>Use the link provided to you to access your store</p>
      <p>Additionally, you can reach out to us at</p>
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
