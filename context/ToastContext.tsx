"use client";
import React, { createContext, useContext, useState } from "react";

type Toast = {
  id: number;
  message: string;
  type: "success" | "error";
};

const ToastContext = createContext<{
  showToast: (message: string, type: "success" | "error") => void;
  toasts: Toast[];
}>({
  showToast: () => {},
  toasts: [],
});

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: "success" | "error") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  return (
    <ToastContext.Provider value={{ showToast, toasts }}>
      {children}
      <div className='fixed top-4 right-4 z-50 space-y-2'>
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`p-3 rounded shadow text-white ${
              toast.type === "success" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
