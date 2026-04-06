// app/layout.client.tsx
"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { StoreConfigProvider } from "../context/StoreConfigContext";
import { CartProvider } from "../context/CartContext";
import { CustomerDataProvider } from "../context/CustomerDataContext";
import { ToastProvider } from "../context/ToastContext";
import { StoreConfig } from "@/_types";
import Header from "../components/Header";

export function ClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname() || "";
  const searchParams = useSearchParams();
  const [storeConfig, setStoreConfig] = useState<StoreConfig | null>(null);

  // Function to fetch the latest config from the server
  const fetchLatestConfig = async (storeId: string) => {
    try {
      const response = await fetch(`/api/storeConfig?storeId=${storeId}`);
      if (response.ok) {
        const fetchedConfig = await response.json();
        return fetchedConfig;
      } else {
        console.error("Failed to fetch config from server");
        return null;
      }
    } catch (error) {
      console.error("Error fetching store config:", error);
      return null;
    }
  };

  useEffect(() => {
    const updateStoreConfig = async () => {
      const storedConfig = localStorage.getItem("storeConfig");
      const storeName =
        pathname?.split("/").filter((path) => path !== "")[1] ||
        searchParams?.get("team")?.toLocaleLowerCase() ||
        "";

      // Check if there's a storeId available
      if (!storeName) {
        console.error("Store ID not found in pathname");
        return;
      }

      // If there is a config in localStorage
      if (storedConfig) {
        const parsedConfig = JSON.parse(storedConfig);

        // Fetch the latest config from the server
        const latestConfig = await fetchLatestConfig(storeName);

        // Compare the version and store id
        if (
          (latestConfig && latestConfig.version !== parsedConfig.version) ||
          (latestConfig && latestConfig.id !== parsedConfig.id)
        ) {
          setStoreConfig(latestConfig);
          localStorage.setItem("storeConfig", JSON.stringify(latestConfig)); // Update localStorage with the new config
        } else {
          setStoreConfig(parsedConfig); // Use cached config if versions match
        }
      } else {
        // No config in localStorage, fetch it from the server
        const latestConfig = await fetchLatestConfig(storeName);
        if (latestConfig) {
          setStoreConfig(latestConfig);
          localStorage.setItem("storeConfig", JSON.stringify(latestConfig));
        } else {
          console.error("Store config not found");
        }
      }
    };

    updateStoreConfig();
    const intervalId = setInterval(updateStoreConfig, 24 * 60 * 60 * 1000); // Check every 24 hours
    return () => clearInterval(intervalId);
  }, [pathname]);

  if (!storeConfig) {
    return <div>Loading...</div>;
  }

  return (
    <StoreConfigProvider storeConfig={storeConfig}>
      <CustomerDataProvider>
        <CartProvider storeId={storeConfig.id}>{children}</CartProvider>
      </CustomerDataProvider>
    </StoreConfigProvider>
  );
}

export default function LayoutWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname() || ""; // Get the current route

  const isAdminRoute = pathname?.startsWith("/admin"); // Check if it's an admin page

  return (
    <ToastProvider>
      {!isAdminRoute && <Header />} {/* Show Header only for non-admin pages */}
      {!isAdminRoute ? (
        <ClientLayout>{children}</ClientLayout> // Wrap ClientLayout for non-admin pages
      ) : (
        children // Render only children for admin pages
      )}
    </ToastProvider>
  );
}
