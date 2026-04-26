"use client";
import { useState } from 'react';

interface Photo {
  url: string;
  texto: string;
}

interface ActivityCarouselProps {
  fotos: Photo[];
}

export default function ActivityCarousel({ fotos }: ActivityCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === fotos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? fotos.length - 1 : prevIndex - 1
    );
  };

  if (fotos.length === 0) return null;

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {fotos.map((foto, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <img
                src={foto.url}
                alt={foto.texto}
                className="w-full h-64 object-cover"
              />
              <p className="text-center mt-2 text-gray-700">{foto.texto}</p>
            </div>
          ))}
        </div>
      </div>
      {fotos.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
          >
            ‹
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
          >
            ›
          </button>
          <div className="flex justify-center mt-4">
            {fotos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full mx-1 ${
                  index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}