"use client";
import React from "react";

import { StoreItem } from "../_types";
import Image from "next/image";
import { getS3ImageUrl } from "@/utils/images";
import Button from "./Button";

interface ShoppingCartProps {
  cartItems: StoreItem[];
  total: Number;
  totalQuantity: Number;
  onConfirm: () => void;
  removeOrderItem: (id: number, orderId: string) => void;
}

export default function ShoppingCart({
  cartItems,
  total,
  totalQuantity,
  onConfirm,
  removeOrderItem,
}: ShoppingCartProps) {
  const getLastName = (name: string) => {
    return name.split(" ")[1];
  };
  return (
    <div className='lg:flex lg:justify-center'>
      <div className='p-8 bg-slate-50 lg:w-full lg:max-w-2xl lg:rounded-lg lg:shadow-md'>
        <h1 className='text-xl mb-6 text-black'>
          {totalQuantity.toString()} Items
        </h1>
        {cartItems.length === 0 ? (
          <p className='text-black'>Your cart is empty.</p>
        ) : (
          <>
            <ul className='border-b-2'>
              {cartItems?.map((item, index) => {
                const imageUrl = getS3ImageUrl(item.image); // Assuming `item.imageKey` stores the S3 key of the image

                return (
                  <li key={index} className='flex w-full mb-4 bg-slate-100 p-4'>
                    <Image
                      src={imageUrl}
                      alt={item.title}
                      width={200}
                      height={200}
                      priority
                      quality={75}
                      unoptimized
                      className='w-24 h-24 object-cover rounded'
                    />
                    <div className='flex flex-col pl-4 gap-2 w-4/5'>
                      <div className='flex flex-row justify-between'>
                        <h2 className='text-sm font-semibold text-black'>
                          {item.title.toUpperCase()}
                        </h2>
                        <p className='flex justify-end text-black'>
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                      {item?.orders?.map(
                        (
                          {
                            quantity,
                            size,
                            color,
                            id,
                            isAddBack,
                            playerName,
                            playerNumber,
                          },
                          index
                        ) => {
                          return (
                            <span key={index}>
                              <div className='flex flex-row justify-between bg-slate-200 p-2'>
                                <div className='flex flex-col gap-1'>
                                  <p className='text-xs leading-4 text-black'>
                                    Size: {size}
                                  </p>
                                  <p className='text-xs leading-4 text-black'>
                                    Color: {color}
                                  </p>
                                  <p className='text-xs leading-4 text-black'>
                                    Quantity: {quantity}
                                  </p>
                                  {isAddBack && (
                                    <p className='text-xs leading-4 text-black'>
                                      With back option
                                    </p>
                                  )}
                                  {playerNumber !== 0 && (
                                    <p className='ml-3 text-xs leading-4 text-black'>
                                      Player:{" "}
                                      {`${getLastName(
                                        playerName
                                      )} - ${playerNumber}`}
                                    </p>
                                  )}
                                </div>
                                <div className='flex flex-col justify-between'>
                                  <button
                                    onClick={() => removeOrderItem(item.id, id)}
                                    className='flex flex-col items-end text-black'
                                  >
                                    X
                                  </button>
                                </div>
                              </div>
                            </span>
                          );
                        }
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </>
        )}

        <p className='text-lg font-bold mt-4 text-black flex justify-between'>
          <span>Total</span> <span>${total?.toFixed(2)}</span>
        </p>
        <Button
          handleClick={onConfirm}
          text={"Confirm Order"}
          isDisabled={!cartItems.length}
        />
      </div>
    </div>
  );
}
