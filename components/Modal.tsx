import { StoreItem } from "@/_types";
import React, { useEffect } from "react";
import Image from "next/image";
import SelectionTiles from "./SelectionTiles";
import QuantitySelector from "./QuantitySelector";
import Accordion from "./Accordion";
import Button from "./Button";

interface ItemModalProps {
  item: StoreItem;
  isOpen: boolean;
  toggleModal: () => void;
  handleSize: (size: string) => void;
  handleColor: (color: string) => void;
  handleQuantity: (num: number) => void;
  handleAddtoCart: () => void;
  selectedSize: string;
  selectedColor: string;
  imageUrl: string;
  errorMsg: string;
}

export default function ItemModal({
  item,
  isOpen,
  selectedSize,
  selectedColor,
  imageUrl,
  errorMsg,
  toggleModal,
  handleSize,
  handleColor,
  handleQuantity,
  handleAddtoCart,
}: ItemModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
      // @ts-ignore
      document.body.scroll = "no";
    }
    return (): void => {
      document.documentElement.style.overflow = "scroll";
      // @ts-ignore
      document.body.scroll = "no";
    };
  }, [isOpen]);

  return (
    <div>
      {/* Modal */}
      {isOpen && (
        <div className='fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50'>
          <div className='w-full max-w-lg p-4 bg-white rounded-t-lg lg:m-auto'>
            <div className='flex justify-between'>
              {/* Title and Price */}
              <h2 className='text-xl font-bold text-black mb-2'>
                {item.title}
              </h2>
              {/* Close Button */}
              <button className='text-right text-black' onClick={toggleModal}>
                &#x2715; {/* Close Icon */}
              </button>
            </div>
            <p className='text-lg text-black mb-4'>${item.price}</p>

            {/* Image Carousel */}
            <div className='relative w-full h-64 mb-4'>
              <Image
                src={imageUrl}
                alt={item.title}
                width={200}
                height={200}
                onClick={toggleModal}
                priority
                quality={75} // Adjust quality for optimization
                unoptimized
              />
              {/* You can add buttons or auto-carousel functionality here */}
              <Accordion
                title={"Description"}
                content={"100% airlume ringspun cotton"}
              />
            </div>
            <SelectionTiles
              handleClick={handleSize}
              list={item.sizes}
              value={selectedSize}
              labelName={"Size"}
            />
            <SelectionTiles
              handleClick={handleColor}
              list={item.colors}
              value={selectedColor}
              labelName={"Color"}
            />
            <QuantitySelector
              initialQuantity={1}
              minQuantity={1}
              maxQuantity={10}
              onChange={handleQuantity}
              labelName={"Quantity"}
            />

            {/* Close Button at Bottom */}
            <Button handleClick={handleAddtoCart} text={"Add To Cart"}></Button>
            {errorMsg && (
              <p className='text-red-500 text-xs mt-1'>{errorMsg}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
