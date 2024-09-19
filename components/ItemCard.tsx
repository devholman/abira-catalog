import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import { useForm } from "react-hook-form";

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
  const [selectedCartItem, setSelectedCartItem] = useState<StoreItem>();
  const imageUrl = getS3ImageUrl(item.image); // Assuming `item.imageKey` stores the S3 key of the image
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      selectedSize: "",
      orderItemNotes: "",
      selectedQuantity: 1,
      selectedColor: "",
      isAddNumberToBack: false,
    },
  });

  const selectedSize = watch("selectedSize");
  const selectedColor = watch("selectedColor");
  const selectedQuantity = watch("selectedQuantity");
  const orderItemNotes = watch("orderItemNotes");
  const isAddNumberToBack = watch("isAddNumberToBack");

  useEffect(() => {
    setSelected(cart?.some((cartItem) => cartItem.id === item.id));
    setSelectedCartItem(cart?.find((cartItem) => cartItem.id === item.id));
  }, [item.id]);

  const handleAddtoCart = () => {
    setSelected(!selected);

    item.orders = [
      ...(selectedCartItem?.orders ?? item.orders),
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
      reset(); // Reset form fields after adding to cart
    }
    toggleModal();
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
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
        toggleModal={toggleModal}
        handleAddtoCart={handleSubmit(handleAddtoCart)}
        errors={errors}
        close={() => {
          setIsOpen(false);
        }}
        register={register}
        selectedSize={selectedSize}
        selectedColor={selectedColor}
        isAddNumberToBack={isAddNumberToBack}
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
