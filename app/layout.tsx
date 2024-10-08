// "use client";
// app/layout.tsx (Server-Side for Metadata)
import React, { ReactNode } from "react";
import LayoutWrapper from "./layout.client";
import { Inter } from "next/font/google";
import "./globals.css"; // Import Tailwind CSS
//helpers
import { getS3ImageUrl } from "../utils/images";

const inter = Inter({ subsets: ["latin"] });
const faviconUrl = getS3ImageUrl("abiraFavicon.ico");

export const metadata = {
  title: "Abira Sports Catalog",
  description: "sports team catalog",
  icons: {
    icon: faviconUrl,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
