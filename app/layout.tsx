// app/layout.tsx (Server-Side for Metadata)
import React, { ReactNode } from "react";
import ClientLayout from "./layout.client";
import { Inter } from "next/font/google";
import "./globals.css"; // Import Tailwind CSS

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Abira Sports Catalog",
  description: "sports team catalog",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
