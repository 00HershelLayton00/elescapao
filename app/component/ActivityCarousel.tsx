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

  // En la foto se ven 4 imágenes a la vez
  const imagesToShow = 4;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1 >= fotos.length / imagesToShow ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? Math.ceil(fotos.length / imagesToShow) - 1 : prev - 1));
  };

  if (fotos.length === 0) return null;

  return (
    <div className="relative group">
      {/* Botón Izquierdo */}
      <button
        onClick={prevSlide}
        className="absolute -left-6 md:-left-12 top-1/3 z-10 bg-[#4a3728] text-white w-10 h-10 rounded-full flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity"
      >
        <span className="mb-1">‹</span>
      </button>

      <div className="overflow-hidden">
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 0}%)` }} // Ajustar si quieres scroll real
        >
          {fotos.map((foto, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-full aspect-[4/3] overflow-hidden rounded-xl mb-3 shadow-lg">
                <img
                  src={foto.url}
                  alt={foto.texto}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <p className="text-sm text-[#5d4a3a] font-medium text-center italic">
                {foto.texto}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Botón Derecho */}
      <button
        onClick={nextSlide}
        className="absolute -right-6 md:-right-12 top-1/3 z-10 bg-[#4a3728] text-white w-10 h-10 rounded-full flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity"
      >
        <span className="mb-1">›</span>
      </button>

      {/* Indicadores (Dots) */}
      <div className="flex justify-center mt-8 gap-2">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={`w-2.5 h-2.5 rounded-full border border-gray-400 ${
              i === currentIndex ? 'bg-[#4a3728]' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}