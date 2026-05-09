'use client';
import { useState, useEffect } from 'react';

// Define el tipo para cada foto
type Foto = {
  id: string | number;
  url: string;
  texto: string;
};

// Props del componente
type CarruselProps = {
  Fotos_Mostrar: Foto[];
  Titulo: string;
};

export default function Carrusel({ Fotos_Mostrar, Titulo }: CarruselProps) {
  const [indice, setIndice] = useState<number>(0);
  const [itemsVisibles, setItemsVisibles] = useState<number>(3);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  // Ajusta items visibles según ventana
  useEffect(() => {
    const actualizarVisibles = (): void => {
      if (window.innerWidth < 640) setItemsVisibles(1);
      else if (window.innerWidth < 1024) setItemsVisibles(2);
      else setItemsVisibles(3);
    };
    actualizarVisibles();
    window.addEventListener('resize', actualizarVisibles);
    return () => window.removeEventListener('resize', actualizarVisibles);
  }, []);

  const siguiente = (): void => {
    if (indice < Fotos_Mostrar.length - itemsVisibles) {
      setIndice(indice + 1);
    } else {
      setIndice(0);
    }
  };

  const anterior = (): void => {
    if (indice > 0) {
      setIndice(indice - 1);
    } else {
      setIndice(Fotos_Mostrar.length - itemsVisibles);
    }
  };

  const handleTouchStart = (e: React.TouchEvent): void => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent): void => {
    if (touchStart === null) return;
    const delta = e.changedTouches[0].clientX - touchStart;
    if (delta > 50) anterior();
    if (delta < -50) siguiente();
    setTouchStart(null);
  };

  return (
    <section className="relative pt-10 pb-20 mx-2 md:mx-10 lg:mx-20 overflow-hidden">
      
      {/* TÍTULO */}
      <div className="flex items-center justify-center gap-6">
            <div className="hidden sm:block h-[2px] flex-1 bg-gradient-to-l from-[#3D2B1F]/60 to-transparent"></div>
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold tracking-widest px-4 flex items-center justify-center text-[#3D2B1F] font-serif">
                {Titulo}
              </h1>
            </div>
            <div className="hidden sm:block h-[2px] flex-1 bg-gradient-to-r from-[#3D2B1F]/60 to-transparent"></div>
          </div>
      <div className="relative px-4 md:px-16 lg:px-20">
        
        {/* BOTÓN ANTERIOR */}
        <button
          onClick={anterior}
          className="hidden md:flex absolute left-2 lg:left-6 top-1/2 -translate-y-1/2 z-20 p-3 bg-[#3D2B1F] hover:bg-[#5D4037] text-[#F4ECE1] rounded-full shadow-xl transition-all active:scale-90"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* CARRUSEL */}
        <div 
          className="overflow-hidden" 
          onTouchStart={handleTouchStart} 
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${indice * (100 / itemsVisibles)}%)` }}
          >
            {Fotos_Mostrar.map((foto, index) => (
              <div
                key={foto.id ?? index}  // Usa index si id es undefined
                className="flex-shrink-0 px-2 md:px-4"
                style={{ width: `${100 / itemsVisibles}%` }}
              >
                {/* MARCO DE LA FOTO (el original) */}
                <div className="bg-[#1A120B] p-4 pb-5 shadow-2xl rounded-sm transform transition-all duration-500 rotate-1 md:hover:rotate-0 hover:scale-[1.02] group">
                  <div className="relative aspect-square w-full overflow-hidden border border-white/10">
                    <img
                      src={foto.url.startsWith('/') ? foto.url : `/images/inicio__nuestro_espacio/${foto.url}`}
                      alt={foto.texto}
                      className="w-full h-full object-cover pointer-events-none transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="mt-5 text-center">
                    <span className="text-[#EBDCCB]/70 text-sm md:text-xl block leading-tight">
                      {foto.texto}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BOTÓN SIGUIENTE */}
        <button
          onClick={siguiente}
          className="hidden md:flex absolute right-2 lg:right-6 top-1/2 -translate-y-1/2 z-20 p-3 bg-[#3D2B1F] hover:bg-[#5D4037] text-[#F4ECE1] rounded-full shadow-xl transition-all active:scale-90"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>

      {/* PUNTOS INDICADORES */}
      {Fotos_Mostrar.length > itemsVisibles && (
        <div className="flex justify-center gap-3 mt-10">
          {Array.from({ length: Fotos_Mostrar.length - (itemsVisibles - 1) }).map((_, i) => (
            <button
              key={i}
              onClick={() => setIndice(i)}
              className={`h-2.5 w-2.5 rounded-full transition-colors duration-300 ${
                indice === i ? 'bg-[#3D2B1F]' : 'bg-[#3D2B1F]/20'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}