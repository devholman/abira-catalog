import React, { createContext, useContext, useState, ReactNode } from "react";

interface CustomerData {
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

interface CustomerDataContextProps {
  customerData: CustomerData | null;
  setCustomerData: (data: CustomerData) => void;
}

const CustomerDataContext = createContext<CustomerDataContextProps | undefined>(
  undefined
);

export const CustomerDataProvider = ({ children }: { children: ReactNode }) => {
  const [customerData, setCustomerData] = useState<CustomerData | null>(null);

  return (
    <CustomerDataContext.Provider value={{ customerData, setCustomerData }}>
      {children}
    </CustomerDataContext.Provider>
  );
};

export const useCustomerData = () => {
  const context = useContext(CustomerDataContext);
  if (!context) {
    throw new Error(
      "useCustomerData must be used within a CustomerDataProvider"
    );
  }
  return context;
};
