// app/layout.client.tsx
"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { StoreConfigProvider } from "../context/StoreConfigContext";
import { CartProvider } from "../context/CartContext";
import { stores } from "../app/catalog/catalogConfigs"; // Your static config
import { StoreConfig } from "@/_types";

export default function ClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [storeConfig, setStoreConfig] = useState<StoreConfig | null>(null);

  useEffect(() => {
    // Retrieve storeConfig from localStorage if available
    const storedConfig = localStorage.getItem("storeConfig");
    if (storedConfig) {
      setStoreConfig(JSON.parse(storedConfig));
    } else {
      // If not in localStorage, determine based on pathname
      const storeId =
        pathname?.split("/").filter((path) => path !== "")[1] || "";
      const matchingConfig = stores[storeId];
      if (matchingConfig) {
        setStoreConfig(matchingConfig);
        localStorage.setItem("storeConfig", JSON.stringify(matchingConfig));
      } else {
        // Handle missing store config, maybe redirect or show an error
        console.error("Store config not found");
      }
    }
  }, [pathname]);

  if (!storeConfig) {
    return <div>Loading...</div>;
  }

  return (
    <StoreConfigProvider storeConfig={storeConfig}>
      <CartProvider>{children}</CartProvider>
    </StoreConfigProvider>
  );
}
