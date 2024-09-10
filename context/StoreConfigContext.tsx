// context/StoreConfigContext.tsx
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { StoreConfig } from "../_types";

type StoreConfigContextType = {
  storeConfig: StoreConfig;
  setStoreConfig: (config: StoreConfig) => void;
};

const StoreConfigContext = createContext<StoreConfigContextType | undefined>(
  undefined
);

export const StoreConfigProvider = ({
  storeConfig,
  children,
}: {
  storeConfig: StoreConfig;
  children: ReactNode;
}) => {
  const [currentConfig, setCurrentConfig] = useState<StoreConfig>(storeConfig);

  useEffect(() => {
    if (storeConfig) {
      setCurrentConfig(storeConfig);
    }
  }, [storeConfig]);

  return (
    <StoreConfigContext.Provider
      value={{ storeConfig: currentConfig, setStoreConfig: setCurrentConfig }}
    >
      {children}
    </StoreConfigContext.Provider>
  );
};

export const useStoreConfig = () => {
  const context = useContext(StoreConfigContext);
  if (!context) {
    throw new Error("useStoreConfig must be used within a StoreConfigProvider");
  }
  return context;
};
