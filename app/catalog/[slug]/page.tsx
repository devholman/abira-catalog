"use client";
// pages/[store].tsx
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
//components
import Home from "../../../components/Home";
import { Input } from "@headlessui/react";
import { useStoreConfig } from "../../../context/StoreConfigContext";

export default function StorePage() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [inputPasscode, setInputPasscode] = useState("");
  const [isClient, setIsClient] = useState(false);

  // const storeConfig = stores[store as string];
  const {
    storeConfig: { name, passcode },
  } = useStoreConfig();

  useEffect(() => {
    const isAuthed = Cookies.get("isAuthenticated");
    setIsClient(true);
    if (isAuthed) {
      setIsAuthorized(true);
    }
  });

  const handleInputPasscode = (
    e: React.KeyboardEvent<HTMLInputElement> &
      React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    setInputPasscode(e.target.value);
    if (e.key === "Enter") {
      console.log("hit enterrrrr");
      handlePasscodeSubmit();
    }
  };

  const handlePasscodeSubmit = () => {
    if (inputPasscode === passcode) {
      Cookies.set("isAuthenticated", "true");

      setIsAuthorized(true);
    } else {
      alert("Incorrect passcode");
    }
  };

  if (!isAuthorized && isClient) {
    return (
      <section className='p-8'>
        <h1 className='text-3xl font-bold mb-8'>Enter Passcode for {name}</h1>
        <Input
          type='password'
          value={inputPasscode}
          onChange={handleInputPasscode}
          className='border rounded px-4 py-2 text-black font-large'
        />
        <button
          onClick={handlePasscodeSubmit}
          className='ml-4 px-4 py-2 bg-blue-500 text-white rounded'
        >
          Enter
        </button>
      </section>
    );
  }

  return <Home />;
}
