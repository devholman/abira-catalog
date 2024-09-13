import React, { useRef, useEffect, useState, TouchEvent } from "react";
import Image from "next/image";

interface ScrollableImageCarouselProps {
  images: string[];
  mainImage: string;
  setMainImage: (x: string) => void;
}

const ImageCarousel: React.FC<ScrollableImageCarouselProps> = ({
  images,
  mainImage,
  setMainImage,
}) => {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [isTouching, setIsTouching] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);

  // useEffect(() => {
  //   const carousel = carouselRef.current;

  //   const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
  //     setIsTouching(true);
  //     setTouchStartX(event.touches[0].clientX);
  //   };

  //   const handleTouchMove = (event: TouchEvent<HTMLDivElement>) => {
  //     if (!isTouching) return;
  //     const touchX = event.touches[0].clientX;
  //     const diffX = touchX - touchStartX;

  //     // If horizontal scroll is detected, prevent default behavior
  //     if (Math.abs(diffX) > 10) {
  //       event.preventDefault();
  //     }
  //   };

  //   const handleTouchEnd = () => {
  //     setIsTouching(false);
  //   };

  //   if (carousel) {
  //     // Add touch event listeners
  //     carousel.addEventListener("touchstart", handleTouchStart as any);
  //     carousel.addEventListener("touchmove", handleTouchMove as any, {
  //       passive: false,
  //     });
  //     carousel.addEventListener("touchend", handleTouchEnd as any);
  //   }

  //   return () => {
  //     if (carousel) {
  //       // Clean up touch event listeners
  //       carousel.removeEventListener("touchstart", handleTouchStart as any);
  //       carousel.removeEventListener("touchmove", handleTouchMove as any);
  //       carousel.removeEventListener("touchend", handleTouchEnd as any);
  //     }
  //   };
  // }, [isTouching, touchStartX]);

  return (
    <div
      ref={carouselRef}
      className='flex w-auto h-24 overflow-x-auto snap-x gap-2 snap-mandatory scroll-smooth scrollbar-hide overscroll-none touch-pan-x'
      // style={{ touchAction: "pan-y" }}
    >
      {images.map((image, index) => (
        <div key={index} className='flex-shrink-0 w-auto h-24 snap-center'>
          <Image
            src={image}
            alt={`Thumbnail ${index + 1}`}
            width={0}
            height={0}
            sizes='100vw'
            priority
            quality={75}
            className={`border-2 h-24  w-auto p-3 ${
              mainImage === image ? "border-black" : "border-transparent"
            }`}
            onClick={() => setMainImage(image)} // Set selected image as the main image
            unoptimized
          />
        </div>
      ))}
    </div>
  );
};

export default ImageCarousel;
