import { StoreItem } from "@/_types";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import SelectionTiles from "./SelectionTiles";
import QuantitySelector from "./QuantitySelector";
import Accordion from "./Accordion";
import Button from "./Button";
import ImageCarousel from "./ImageCarousel";
import { UseFormRegister, FieldErrors, UseFormSetValue } from "react-hook-form";

//helpers
import { getS3ImageUrl } from "../utils/images";
import PlayerSelectDropdown from "./PlayerSelectDropdown";
import { useStoreConfig } from "@/context/StoreConfigContext";
import { DRIFIT } from "@/app/catalog/catalogConfigs";

interface ItemModalProps {
  item: StoreItem;
  isOpen: boolean;
  isAddNumberToBack: boolean;
  selectedSize: string;
  selectedColor: string;
  selectedMaterial: string;
  selectedPlayerName: string;
  selectedPlayerNumber: number;
  selectedQuantity: number;
  totalPrice: number;
  setTotalPrice: (price: number) => void;
  setValue: UseFormSetValue<{
    selectedSize: string;
    selectedColor: string;
    selectedMaterial: string;
    selectedQuantity: number;
    orderItemNotes: string;
    isAddNumberToBack: boolean;
    selectedPlayerName: string;
    selectedPlayerNumber: number;
  }>;
  toggleModal: () => void;
  handleAddtoCart: (data: any) => void;
  register: UseFormRegister<{
    selectedSize: string;
    selectedColor: string;
    selectedQuantity: number;
    orderItemNotes: string;
    isAddNumberToBack: boolean;
    selectedPlayerName: string;
    selectedPlayerNumber: number;
    selectedMaterial: string;
  }>;
  errors: FieldErrors;
  close: () => void;
}

export default function ItemModal({
  item,
  isOpen,
  selectedSize,
  selectedColor,
  selectedPlayerName,
  selectedPlayerNumber,
  selectedMaterial,
  isAddNumberToBack,
  selectedQuantity,
  totalPrice,
  errors,
  setTotalPrice,
  setValue,
  toggleModal,
  handleAddtoCart,
  register,
  close,
}: ItemModalProps) {
  const [mainImage, setMainImage] = useState(getS3ImageUrl(item.image) || "");
  const [images] = useState(
    item.images?.map((imageObj) => getS3ImageUrl(imageObj.imageUrl)) || [
      mainImage,
    ]
  );

  const {
    storeConfig: { players },
  } = useStoreConfig();

  useEffect(() => {
    if (isOpen) {
      // Prevent scrolling on the body
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    }
    return (): void => {
      // Restore scrolling on the body
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    calculateTotalPrice();
  }, [selectedSize, isAddNumberToBack, selectedMaterial, selectedQuantity]);

  const calculateTotalPrice = () => {
    let price = item.price;

    // Add $2 for sizes 2XL-4XL
    if (
      selectedSize === "XXL" ||
      selectedSize === "XXXL" ||
      selectedSize === "XXXXL"
    ) {
      price += 2;
    }
    if (selectedMaterial === DRIFIT) {
      price += 5;
    }

    // Add $2 if the number is added to the back
    if (isAddNumberToBack) {
      price += 2;
    }

    setTotalPrice(price * selectedQuantity);
  };
  return (
    <div>
      {isOpen && (
        <div
          className='fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50'
          onClick={close}
        >
          <div
            className='w-full max-w-lg px-4 pb-3 bg-white rounded-t-lg h-[calc(100%-40px)] lg:m-auto overflow-y-auto overflow-x-hidden'
            style={{ maxHeight: "calc(100% - env(safe-area-inset-top))" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className='flex justify-between sticky gap-4 top-0 bg-white pt-5 z-10'>
              <h2 className='text-xl font-bold text-black mb-2'>
                {item.title}
              </h2>
              <button
                className='text-right text-black self-start'
                onClick={toggleModal}
              >
                &#x2715;
              </button>
            </div>
            <div className='py-3'>
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

              <form onSubmit={handleAddtoCart}>
                {/* Size, Color, Quantity Selectors */}
                <SelectionTiles
                  list={item.sizes}
                  register={register}
                  fieldName='selectedSize'
                  value={selectedSize}
                  labelName={"Size"}
                  isRequired={true}
                  errors={errors.selectedSize}
                />
                <p className='text-xs text-gray-800'>
                  * Additional $2 for sizes 2XL-4XL
                </p>
                <SelectionTiles
                  list={item.colors}
                  register={register}
                  fieldName='selectedColor' // This will be the form field name
                  value={selectedColor} // Use the value from the form's state
                  labelName='Color'
                  isRequired={true}
                  errors={errors.selectedColor}
                />
                <SelectionTiles
                  list={item.material}
                  register={register}
                  fieldName='selectedMaterial' // This will be the form field name
                  value={selectedMaterial} // Use the value from the form's state
                  labelName='Material'
                  isRequired={true}
                  errors={errors.selectedMaterial}
                />
                <QuantitySelector
                  name='selectedQuantity'
                  minQuantity={1}
                  maxQuantity={10}
                  register={register}
                  labelName='Quantity'
                />

                {/* Add Number to Back Checkbox */}
                <div className='flex py-4 mt-4 gap-4'>
                  <Image
                    src={getS3ImageUrl(item.backImage || "")}
                    alt='shirt back'
                    width={60}
                    height={50}
                    className='object-contain max-w-fit'
                    priority
                    quality={75}
                    unoptimized
                  />
                  <div className='flex gap-1 items-center ps-4 border border-gray-200 rounded'>
                    <input
                      type='checkbox'
                      {...register("isAddNumberToBack")}
                      id='addNumberToBack'
                      className='size-6 border-solid border-2 rounded-md bg-white/10 p-1 ring-1 ring-white/15 ring-inset'
                    />
                    <label
                      htmlFor='addNumberToBack'
                      className='w-full py-4 ms-2 text-sm font-medium text-gray-950'
                    >
                      Add last name and number to back (addtl. $2 per shirt):
                    </label>
                  </div>
                </div>
                {isAddNumberToBack && (
                  <PlayerSelectDropdown
                    players={players}
                    selectedPlayerName={selectedPlayerName}
                    selectedPlayerNumber={selectedPlayerNumber}
                    setValue={setValue}
                    errors={errors.selectedPlayerName}
                    register={register}
                  />
                )}

                {item.isCustomizable && (
                  <div className='relative w-full my-4'>
                    <label
                      htmlFor='orderItemNotes'
                      className='py-2 text-gray-800 block text-sm strong'
                    >
                      Notes
                    </label>
                    <textarea
                      placeholder={"Enter Customization notes"}
                      {...register("orderItemNotes")}
                      className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm'
                    />
                  </div>
                )}
                {/* <Accordion
                  title={"Description"}
                  content={"100% airlume ringspun cotton"}
                /> */}

                <Button
                  type='submit'
                  text={`Add To Cart - $${totalPrice}`}
                  classNames='mb-2'
                />
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
