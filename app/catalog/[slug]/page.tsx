"use client";
import Cookies from "js-cookie";
// //components
import Home from "../../../components/Home";
import { useStoreConfig } from "../../../context/StoreConfigContext";
import Button from "../../../components/Button";

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  passcode: z
    .string()
    .min(3, "Passcode must be at least 3 characters long")
    .max(12, "Passcode cannot exceed 12 characters"),
});

type FormData = z.infer<typeof schema>;

const PasscodeEntryPage: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { passcode: "" },
  });

  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const {
    storeConfig: { passcode },
  } = useStoreConfig();

  useEffect(() => {
    const isAuthed = Cookies.get("isAuthenticated");

    setIsClient(true);
    if (isAuthed) {
      setIsAuthorized(true);
    }
  });

  const onSubmit = (data: FormData) => {
    if (data.passcode === passcode) {
      Cookies.set("isAuthenticated", "true", { expires: 365 });
      setIsAuthorized(true);
    } else {
      alert("Incorrect passcode");
    }
  };

  if (!isAuthorized && isClient) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-gray-100 mx-2'>
        <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
          <h1 className='text-2xl font-semibold mb-4 text-center text-gray-800'>
            Enter Passcode to Access Your Team Catalog
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <div>
              <label
                htmlFor='passcode'
                className='block text-sm font-medium text-gray-700'
              >
                Passcode
              </label>
              <Controller
                name='passcode'
                control={control}
                render={({ field }) => (
                  <input
                    id='passcode'
                    type='password'
                    placeholder='Enter your passcode'
                    className={`mt-1 p-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                      errors.passcode ? "border-red-500" : ""
                    }`}
                    {...field}
                  />
                )}
              />
              {errors.passcode && (
                <p className='text-red-500 text-xs mt-1'>
                  {errors.passcode.message as string}
                </p>
              )}
            </div>
            <Button text='Enter'></Button>
          </form>
        </div>
      </div>
    );
  }
  return <Home />;
};

export default PasscodeEntryPage;
