import { StoreItem } from "@/_types";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import SelectionTiles from "./SelectionTiles";
import QuantitySelector from "./QuantitySelector";
import Accordion from "./Accordion";
import Button from "./Button";
import ImageCarousel from "./ImageCarousel";

//helpers
import { getS3ImageUrl } from "../utils/images";

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
  const [mainImage, setMainImage] = useState(imageUrl); // Set main image
  const [images] = useState(
    item.images?.map((image) => getS3ImageUrl(image)) || [imageUrl]
  ); // Assume `item.images` holds additional images

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
      {isOpen && (
        <div className='fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50'>
          <div
            className='w-full max-w-lg px-4 py-3 bg-white rounded-t-lg h-[calc(100%-40px)] lg:m-auto'
            style={{ maxHeight: "calc(100% - env(safe-area-inset-top))" }}
          >
            <div className='flex justify-between relative'>
              <h2 className='text-xl font-bold text-black mb-2'>
                {item.title}
              </h2>
              <button
                className='text-right text-black absolute top-4 right-4'
                onClick={toggleModal}
              >
                &#x2715;
              </button>
            </div>
            <div
              className='py-3 overflow-y-auto overflow-x-hidden'
              style={{
                maxHeight: "calc(100% - 80px - env(safe-area-inset-bottom))", // Account for the padding and the safe area on mobile
              }}
            >
              <p className='text-lg text-black mb-4'>${item.price}</p>

              {/* Main Image Display */}
              <div className='flex justify-center relative w-full h-52 mb-4'>
                <Image
                  src={mainImage}
                  alt={item.title}
                  width={500}
                  height={500}
                  className='w-full h-full object-cover max-w-fit rounded-lg'
                  priority
                  quality={75}
                  unoptimized
                />
              </div>
              <ImageCarousel
                images={images}
                mainImage={mainImage}
                setMainImage={setMainImage}
              />

              {/* Size, Color, Quantity Selectors */}
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
              <Accordion
                title={"Description"}
                content={"100% airlume ringspun cotton"}
              />

              {/* Add to Cart Button */}
              <Button
                handleClick={handleAddtoCart}
                text={"Add To Cart"}
                classNames='mb-2'
              />
              {errorMsg && (
                <p className='text-red-500 text-xs mt-1'>{errorMsg}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
