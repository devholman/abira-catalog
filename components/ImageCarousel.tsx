import React from "react";
import Image from "next/image";
import SwipeIcon from "@/images/SwipeIcon";

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
  return (
    <div className='relative w-full h-24'>
      {images.length > 3 && (
        <div className='w-8 absolute right-6 mt-2 z-10'>
          <SwipeIcon />
        </div>
      )}
      <div className='relative flex w-auto h-24 overflow-x-auto snap-x gap-2 snap-mandatory scroll-smooth scrollbar-hide overscroll-none touch-pan-x'>
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
    </div>
  );
};

export default ImageCarousel;
