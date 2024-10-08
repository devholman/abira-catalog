"use client";

import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";

import { useCart } from "../context/CartContext";
import { useCustomerData } from "../context/CustomerDataContext";

import FormInput from "./FormInput";
import Button from "./Button";
import Notes from "./Notes";

interface OrderFormData {
  firstName: string;
  lastName: string;
  playerName: string;
  playerNumber: string;
  email: string;
  phone: string;
  notes?: string;
}

const OrderForm = () => {
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
    setCustomerData(data);
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        storeId: currentStoreId,
        customer: data,
        notes: data.notes,
        cart,
        totalPrice,
        totalQuantity,
        storeName,
      }),
    });

    if (!response.ok) {
      throw new Error("Order submission failed");
    }

    const result = await response.json();
    if (result.success) {
      // Redirect to the confirmation page with the confirmation number
      router.push(
        `/confirmation?confirmationNumber=${result.confirmationNumber}&team=${storeName}`
      );
    } else {
      // Handle error case
      console.error("Order submission failed:", result.error);
    }
    // clearCart();

    return result;
  };
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

  return (
    <div className='lg:flex lg:justify-center'>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='space-y-4 lg:w-full lg:max-w-2xl p-8 lg:rounded-lg lg:shadow-md'
        >
          <FormInput {...firstName} />
          <FormInput {...lastName} />
          <FormInput {...email} />
          <FormInput {...phoneNumber} />
          <Notes {...notes} />
          <Button
            type='submit'
            text={"Submit Order"}
            isDisabled={cart.length === 0}
          />
        </form>
      </FormProvider>
    </div>
  );
};
export default OrderForm;
