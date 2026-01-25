"use client";

import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";

import { useCart } from "../context/CartContext";
import { useCustomerData } from "../context/CustomerDataContext";

import FormInput from "./FormInput";
import Button from "./Button";
import Notes from "./Notes";
import ShippingRateSelector from "./ShippingRate";

interface OrderFormData {
  firstName: string;
  lastName: string;
  playerName: string;
  playerNumber: string;
  email: string;
  phone: string;
  notes?: string;
  localPickup: boolean; // For tracking local pickup selection
  street1?: string;
  street2?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
}

const OrderForm = () => {
  const [isLocalPickup, setIsLocalPickup] = useState(false); // State for local pickup checkbox
  const [shippingRates, setShippingRates] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);
  const [confirmationNumber, setConfirmationNumber] = useState<string | null>(
    null
  );

  const methods = useForm<OrderFormData>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;
  const { setCustomerData } = useCustomerData();
  const { cart, totalPrice, totalQuantity, currentStoreId } = useCart();

  const searchParams = useSearchParams();
  const router = useRouter();
  const storeName = searchParams?.get("team");

  const onSubmit = async (data: OrderFormData) => {
    try {
      setCustomerData(data);
      //Create order
      const orderRes = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          storeId: currentStoreId,
          customer: data,
          notes: data.notes,
          localPickup: data.localPickup,
          cart,
          totalPrice,
          totalQuantity,
          storeName,
        }),
      });
      if (!orderRes.ok) throw new Error("Order submission failed");
      const orderResult = await orderRes.json();
      console.log("🚀 ~ onSubmit ~ orderResult:", orderResult);
      setOrderId(orderResult.order.id);
      setConfirmationNumber(orderResult.confirmationNumber);

      if (data.localPickup) {
        router.push(
          `/confirmation?confirmationNumber=${orderResult.confirmationNumber}&team=${storeName}`
        );
        return;
      }

      // If not local pickup, fetch shipping rates
      const shippingRes = await fetch("/api/shippo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          storeId: currentStoreId,
          customer: data,
          toAddress: {
            name: `${data.firstName} ${data.lastName}`,
            street1: data.street1,
            street2: data.street2 || "",
            city: data.city,
            state: data.state,
            zip: data.zip,
            country: "US",
          },
          parcel: {
            length: "10",
            width: "7",
            height: "4",
            distanceUnit: "in",
            weight: "2",
            massUnit: "lb",
          },
          notes: data.notes,
          cart,
          totalPrice,
          totalQuantity,
          storeName,
        }),
      });

      if (!shippingRes.ok) throw new Error("Shipping rate fetch failed");
      const shippingResult = await shippingRes.json();
      setShippingRates(shippingResult.rates); // update UI to let user choose a rate
    } catch (error) {
      console.error(error);
    }
  };

  // Form inputs and validation setup
  const firstName = {
    id: "firstName",
    label: "First Name",
    errorText: "First name is required",
    placeholder: "Jane",
    validations: { required: true, maxLength: 50 },
    register: { ...register("firstName", { required: true, maxLength: 50 }) },
    error: errors.firstName,
  };
  const lastName = {
    id: "lastName",
    label: "Last Name",
    errorText: "Last name is required",
    placeholder: "Doe",
    validations: { required: true, maxLength: 50 },
    register: { ...register("lastName", { required: true, maxLength: 50 }) },
    error: errors.lastName,
  };

  const email = {
    id: "email",
    label: "Email",
    errorText: "Email is required",
    placeholder: "jane.doe@example.com",
    validations: { required: true, maxLength: 50 },
    register: {
      ...register("email", {
        required: true,
        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      }),
    },
    error: errors.email,
  };
  const phoneNumber = {
    id: "phoneNumber",
    label: "Phone number",
    errorText: "Phone number is required",
    type: "tel",
    placeholder: "(123) 456-7890",
    validations: { required: true, maxLength: 50 },
    register: {
      ...register("phone", {
        required: true,
        pattern: /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
        minLength: 6,
        maxLength: 12,
      }),
    },
    error: errors.phone,
  };
  const notes = {
    id: "notes",
    label: "Notes (Optional)",
    placeholder: "Any special instructions...",
    register: {
      ...register("notes"),
    },
  };

  const shippingFields = isLocalPickup ? null : (
    <>
      <FormInput
        id='street1'
        label='Street Address'
        placeholder='123 Main St'
        register={register("street1", { required: !isLocalPickup })}
        error={errors.street1}
      />
      <FormInput
        id='street2'
        label='Street Address 2 (Optional)'
        placeholder='Apt 4B'
        register={register("street2")}
      />
      <FormInput
        id='city'
        label='City'
        placeholder='New York'
        register={register("city", { required: !isLocalPickup })}
        error={errors.city}
      />
      <FormInput
        id='state'
        label='State'
        placeholder='NY'
        register={register("state", { required: !isLocalPickup })}
        error={errors.state}
      />
      <FormInput
        id='zip'
        label='Zip Code'
        placeholder='10001'
        register={register("zip", { required: !isLocalPickup })}
        error={errors.zip}
      />
      {/* <FormInput
        id='country'
        label='Country'
        placeholder='US'
        register={register("country", { required: !isLocalPickup })}
        error={errors.country}
      /> */}
    </>
  );

  const handleRateSelect = async (rateId: string) => {
    if (!orderId || !confirmationNumber) {
      console.error("Order ID or confirmation missing");
      return;
    }
    try {
      // 1. Save the rate selection
      await fetch("/api/shippo/save-rate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          rateId,
        }),
      });
      // 2. Purchase the shipping label
      const labelRes = await fetch("/api/shippo/label", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rateId,
          orderId,
        }),
      });

      if (!labelRes.ok) throw new Error("Label generation failed");
      const labelResult = await labelRes.json();
      console.log("🚀 ~ handleRateSelect ~ labelResult:", labelResult);

      router.push(
        `/confirmation?confirmationNumber=${confirmationNumber}&team=${storeName}`
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='lg:flex lg:justify-center'>
      <FormProvider {...methods}>
        {shippingRates.length === 0 ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='space-y-4 lg:w-full lg:max-w-2xl p-8 lg:rounded-lg lg:shadow-md'
          >
            <FormInput {...firstName} />
            <FormInput {...lastName} />
            <FormInput {...email} />
            <FormInput {...phoneNumber} />
            <Notes {...notes} />

            {/* Local Pickup Checkbox */}
            <div className='flex items-center'>
              <input
                type='checkbox'
                id='localPickup'
                {...register("localPickup")}
                checked={isLocalPickup}
                onChange={() => setIsLocalPickup(!isLocalPickup)}
              />
              <label htmlFor='localPickup' className='ml-2'>
                Local Pickup
              </label>
            </div>

            {/* Conditionally rendered shipping fields */}
            {shippingFields}

            <Button
              type='submit'
              text={"Submit Order"}
              isDisabled={cart.length === 0}
            />
          </form>
        ) : (
          <ShippingRateSelector
            rates={shippingRates}
            isLoading={isLoading}
            onRateSelect={async (rateId) => {
              setIsLoading(true);
              await handleRateSelect(rateId);
              setIsLoading(false);
            }}
          />
        )}
      </FormProvider>
    </div>
  );
};

export default OrderForm;
