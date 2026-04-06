'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import type { CarruselProps } from './types';

interface TouchStartState {
  x: number;
  y: number;
  timestamp: number;
}

export default function CarruselCliente({ 
  fotos, 
  itemsVisiblesPorDefecto = 3,
  baseUrl = '/images/restaurante'
}: CarruselProps) {
  const [indice, setIndice] = useState<number>(0);
  const [itemsVisibles, setItemsVisibles] = useState<number>(itemsVisiblesPorDefecto);
  const [touchStart, setTouchStart] = useState<TouchStartState | null>(null);
  const [estaAnimando, setEstaAnimando] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Normalizar fotos (acepta tanto array de números como de objetos)
  const fotosNormalizadas = fotos.map((foto, index) => {
    if (typeof foto === 'number') {
      return { id: foto, url: `${baseUrl}${foto}.jpg`, titulo: `Momento #${index + 1}` };
    }
    return foto;
  });

  // Ajustar cantidad de fotos visibles según el ancho de pantalla
  useEffect(() => {
    const handleResize = (): void => {
      const ancho = window.innerWidth;
      if (ancho < 640) setItemsVisibles(1);
      else if (ancho < 1024) setItemsVisibles(2);
      else setItemsVisibles(itemsVisiblesPorDefecto);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, [itemsVisiblesPorDefecto]);

  // Resetear índice cuando cambia itemsVisibles
  useEffect(() => {
    setIndice(0);
  }, [itemsVisibles]);

  const siguiente = useCallback((): void => {
    if (estaAnimando) return;
    
    setEstaAnimando(true);
    if (indice < fotosNormalizadas.length - itemsVisibles) {
      setIndice(prev => prev + 1);
    } else {
      setIndice(0);
    }
    
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setEstaAnimando(false), 500);
  }, [indice, itemsVisibles, fotosNormalizadas.length, estaAnimando]);

  const anterior = useCallback((): void => {
    if (estaAnimando) return;
    
    setEstaAnimando(true);
    if (indice > 0) {
      setIndice(prev => prev - 1);
    } else {
      setIndice(fotosNormalizadas.length - itemsVisibles);
    }
    
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setEstaAnimando(false), 500);
  }, [indice, itemsVisibles, fotosNormalizadas.length, estaAnimando]);

  // Lógica para deslizar con el dedo (Mobile Swipe)
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>): void => {
    const touch = e.targetTouches[0];
    setTouchStart({
      x: touch.clientX,
      y: touch.clientY,
      timestamp: Date.now()
    });
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>): void => {
    if (!touchStart || estaAnimando) return;
    
    const touchEnd = e.changedTouches[0];
    const deltaX = touchStart.x - touchEnd.clientX;
    const deltaY = touchStart.y - touchEnd.clientY;
    const deltaTime = Date.now() - touchStart.timestamp;
    
    // Detectar swipe horizontal (ignorar si es más vertical que horizontal)
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50 && deltaTime < 300) {
      if (deltaX > 0) {
        siguiente();
      } else if (deltaX < 0) {
        anterior();
      }
    }
    
    setTouchStart(null);
  };

  // Limpiar timeout al desmontar
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const maxIndice = fotosNormalizadas.length - itemsVisibles;
  const translateX = -indice * (100 / itemsVisibles);

  return (
    <div className="relative pt-10 pb-20 mx-2 md:mx-10 lg:mx-20 overflow-hidden bg-[#F4ECE1] bg-[url('/images/papel_arrugado.png')] bg-repeat rounded-xl shadow-sm">
      
      {/* Título */}
      <div className="flex items-center justify-center gap-4 mb-12">
        <svg viewBox="0 0 24 24" fill="none" stroke="#3D2B1F" strokeWidth="2" className="w-8 h-8 md:w-12 md:h-12">
          <rect x="3" y="6" width="18" height="13" rx="2" />
          <circle cx="12" cy="12.5" r="3" />
          <path d="M7 6V4h4v2" />
        </svg>
        <h2 className="text-3xl md:text-5xl font-black text-[#3D2B1F] font-['Pacifico']">
          Nuestro Espacio
        </h2>
      </div>

      {/* Contenedor con flechas */}
      <div className="relative px-4 md:px-16 lg:px-20">
        {/* Botón Anterior */}
        <button
          onClick={anterior}
          disabled={estaAnimando}
          aria-label="Anterior"
          className="hidden md:flex absolute left-2 lg:left-6 top-1/2 -translate-y-1/2 z-20 p-3 bg-[#3D2B1F] hover:bg-[#5D4037] text-[#F4ECE1] rounded-full shadow-xl transition-all active:scale-90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* Ventana de visualización */}
        <div
          className="overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(${translateX}%)` }}
          >
            {fotosNormalizadas.map((foto, i) => (
              <div
                key={foto.id}
                className="flex-shrink-0 px-2 md:px-4"
                style={{ width: `${100 / itemsVisibles}%` }}
              >
                <div className="bg-[#1A120B] p-4 pb-10 shadow-2xl rounded-sm transform transition-all duration-500 rotate-1 md:hover:rotate-0 hover:scale-[1.02]">
                  <div className="relative aspect-[4/5] md:h-72 w-full overflow-hidden border border-white/10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={foto.url}
                      alt={foto.titulo || `Vista del restaurante ${foto.id}`}
                      className="w-full h-full object-cover pointer-events-none"
                      loading="lazy"
                    />
                  </div>
                  <div className="mt-4 text-center">
                    <span className="text-[#EBDCCB]/70 text-lg md:text-xl font-['Pacifico']">
                      {foto.titulo || `Momento #${i + 1}`}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Botón Siguiente */}
        <button
          onClick={siguiente}
          disabled={estaAnimando}
          aria-label="Siguiente"
          className="hidden md:flex absolute right-2 lg:right-6 top-1/2 -translate-y-1/2 z-20 p-3 bg-[#3D2B1F] hover:bg-[#5D4037] text-[#F4ECE1] rounded-full shadow-xl transition-all active:scale-90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>

      {/* Puntos indicadores */}
      {maxIndice > 0 && (
        <div className="flex justify-center gap-3 mt-10">
          {Array.from({ length: maxIndice + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => !estaAnimando && setIndice(i)}
              disabled={estaAnimando}
              className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                indice === i 
                  ? 'bg-[#3D2B1F] scale-125' 
                  : 'bg-[#3D2B1F]/20 hover:bg-[#3D2B1F]/40'
              }`}
              aria-label={`Ir a la imagen ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}