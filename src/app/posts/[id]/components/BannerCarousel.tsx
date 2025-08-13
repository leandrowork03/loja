// src/components/BannerCarousel.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Banner {
  id: string;
  imgSrc: string;
  altText: string;
  link?: string;
}

interface BannerCarouselProps {
  banners: Banner[];
}

export const BannerCarousel = ({ banners }: BannerCarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollWidth = carouselRef.current.scrollWidth;
      const clientWidth = carouselRef.current.clientWidth;
      
      let newIndex = direction === 'left' ? currentIndex - 1 : currentIndex + 1;
      
      if (newIndex < 0) {
        newIndex = banners.length - 1;
      } else if (newIndex >= banners.length) {
        newIndex = 0;
      }

      setCurrentIndex(newIndex);
      const scrollAmount = newIndex * clientWidth;
      carouselRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      scroll('right');
    }, 5000); // Rola automaticamente a cada 5 segundos
    return () => clearInterval(interval);
  }, [currentIndex, banners.length]);


  return (
    <div className="relative w-full max-w-7xl mx-auto my-8">
      <div
        ref={carouselRef}
        className="flex overflow-x-hidden gap-0 scroll-smooth rounded-lg shadow-lg"
      >
        {banners.map((banner) => (
          <div key={banner.id} className="min-w-full flex-shrink-0">
            <Image
              src={banner.imgSrc}
              alt={banner.altText}
              width={1600}
              height={400}
              className="object-cover w-full h-auto"
            />
          </div>
        ))}
      </div>
      <button
        onClick={() => scroll('left')}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10 hover:bg-gray-200 transition-colors"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={() => scroll('right')}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10 hover:bg-gray-200 transition-colors"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};