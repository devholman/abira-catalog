import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getS3ImageUrl } from "../utils/images";

export default function Header() {
  const logoUrl = getS3ImageUrl("AbiraLogo.svg");

  return (
    <header className='flex items-center justify-between px-4 py-4 bg-white'>
      {/* Left Section - Empty or add navigation links here */}
      <div className='flex-1'>
        {/* Add navigation items like Home, Shop, Contact if needed */}
      </div>

      {/* Center Section - Logo */}
      <div className='flex-shrink-0'>
        <Link
          href='https://www.abirasports.com'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Image
            src={logoUrl}
            alt={"abira logo"}
            width={100}
            height={100}
            priority
            quality={75} // Adjust quality for optimization
            unoptimized
          />
        </Link>
      </div>

      {/* Right Section - Empty or add more items like a cart or profile icon here */}
      <div className='flex-1 flex justify-end'>
        {/* Add cart, search, or profile icons */}
      </div>
    </header>
  );
}
