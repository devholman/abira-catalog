import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";

//components
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import ItemModal from "./Modal";

//helpers
import { getS3ImageUrl } from "../utils/images";

//types
import { StoreItem } from "../_types";

interface ItemCardProps {
  item: StoreItem;
}

export default function ItemCard({ item }: ItemCardProps) {
  const { cart, addToCart } = useCart();
  const [selected, setSelected] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [orderItemNotes, setOrderItemNotes] = useState<string>("");
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  const [isAddNumberToBack, setIsAddNumberToBack] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");
  const imageUrl = getS3ImageUrl(item.image); // Assuming `item.imageKey` stores the S3 key of the image
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setSelected(cart?.some((cartItem) => cartItem.id === item.id));
  }, [cart, item.id]);

  const handleSize = (size: string) => {
    setSelectedSize(size);
  };

  const handleQuantity = (num: number) => {
    setSelectedQuantity(num);
  };
  const handleColor = (color: string) => {
    setSelectedColor(color);
  };
  const handleNotes = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setOrderItemNotes(value);
  };
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleAddtoCart = () => {
    if (!selectedSize) {
      setError("Select a size to continue");
      return;
    }
    if (!selectedColor) {
      setError("Select a color to continue");
      return;
    }

    setSelected(!selected);
    item.orders = [
      ...item.orders,
      {
        id: uuidv4(),
        quantity: selectedQuantity || 1,
        size: selectedSize || "S",
        color: selectedColor || "black",
        isAddBack: isAddNumberToBack,
        notes: orderItemNotes,
      },
    ];

    addToCart(item);
    if (selected) {
      setSelectedQuantity(1);
      setSelectedSize("");
      setSelectedColor("");
      setIsAddNumberToBack(false);
    }
    toggleModal();
  };

  return (
    <div className='rounded-sm p-4 border border-gray-200'>
      <Image
        src={imageUrl}
        alt={item.title}
        width={500}
        height={500}
        onClick={toggleModal}
        priority
        quality={75} // Adjust quality for optimization
        unoptimized
      />
      <ItemModal
        item={item}
        isOpen={isOpen}
        imageUrl={imageUrl}
        toggleModal={toggleModal}
        handleSize={handleSize}
        handleColor={handleColor}
        handleQuantity={handleQuantity}
        handleAddtoCart={handleAddtoCart}
        handleNotes={handleNotes}
        setIsAddNumberToBack={setIsAddNumberToBack}
        isAddNumberToBack={isAddNumberToBack}
        selectedSize={selectedSize}
        selectedColor={selectedColor}
        errorMsg={error}
        close={() => {
          setIsOpen(false);
        }}
      />
      <div className='flex justify-between items-end' onClick={toggleModal}>
        <div className='flex flex-col py-1 gap-1'>
          <h2 className='text-xs font-medium mt-2'>
            {item.title.toUpperCase()}
          </h2>
          <p className='text-gray-600 font-normal text-sm'>
            ${item.price.toFixed(2)}
          </p>
        </div>
        <PlusCircleIcon className='size-7 self-end font-light text-gray-600' />
      </div>
    </div>
  );
}
