'use client';
import { useState, useEffect } from 'react';
import { Pacifico } from 'next/font/google';

const pacifico = Pacifico({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});

// Estructura simplificada: solo URL y el texto que se mostrará
const FOTOS_GALERIA = [
  { id: 1, url: "bienvenido.webp", texto: "Bienvenido" },
  { id: 5, url: "familia.webp", texto: "Familia" },
  { id: 4, url: "variedades.webp", texto: "Variedades" },
  { id: 6, url: "folclor.webp", texto: "Folclor" },
  { id: 2, url: "cantantes.webp", texto: "Cantantes" },
  { id: 7, url: "payasos.webp", texto: "Payasos" },
  { id: 3, url: "cubania.webp", texto: "Cubanía" },
  
];

export default function Gallery() {
  const [indice, setIndice] = useState(0);
  const [itemsVisibles, setItemsVisibles] = useState(3);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsVisibles(1);
      else if (window.innerWidth < 1024) setItemsVisibles(2);
      else setItemsVisibles(3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const siguiente = () => {
    if (indice < FOTOS_GALERIA.length - itemsVisibles) setIndice(indice + 1);
    else setIndice(0);
  };

  const anterior = () => {
    if (indice > 0) setIndice(indice - 1);
    else setIndice(FOTOS_GALERIA.length - itemsVisibles);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    if (touchStart - touchEnd > 50) siguiente();
    if (touchStart - touchEnd < -50) anterior();
    setTouchStart(null);
  };

  return (
    <section className="relative pt-10 pb-20 mx-2 md:mx-10 lg:mx-20 overflow-hidden">

      {/* TÍTULO SECCIÓN */}
      <div className="flex items-center justify-center gap-4 mb-12">
        <svg viewBox="0 0 24 24" fill="none" stroke="#3D2B1F" strokeWidth="2" className="w-8 h-8 md:w-12 md:h-12">
          <rect x="3" y="6" width="18" height="13" rx="2" />
          <circle cx="12" cy="12.5" r="3" />
          <path d="M7 6V4h4v2" />
        </svg>
        <h2 className={`${pacifico.className} text-3xl md:text-5xl font-black text-[#3D2B1F]`}>
          Nuestro Espacio
        </h2>
      </div>

      <div className="relative px-4 md:px-16 lg:px-20">
        <button
          onClick={anterior}
          className="hidden md:flex absolute left-2 lg:left-6 top-1/2 -translate-y-1/2 z-20 p-3 bg-[#3D2B1F] hover:bg-[#5D4037] text-[#F4ECE1] rounded-full shadow-xl transition-all active:scale-90"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        <div className="overflow-hidden" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${indice * (100 / itemsVisibles)}%)` }}
          >
            {FOTOS_GALERIA.map((foto) => (
              <div
                key={foto.id}
                className="flex-shrink-0 px-2 md:px-4"
                style={{ width: `${100 / itemsVisibles}%` }}
              >
                <div className="bg-[#1A120B] p-4 pb-10 shadow-2xl rounded-sm transform transition-all duration-500 rotate-1 md:hover:rotate-0 hover:scale-[1.02] group">

                  <div className="relative aspect-square w-full overflow-hidden border border-white/10">
                    <img
                      src={"/images/inicio__nuestro_espacio/" + foto.url}
                      alt={foto.texto}
                      className="w-full h-full object-cover pointer-events-none transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="mt-5 text-center">
                    <span className={`${pacifico.className} text-[#EBDCCB]/70 text-sm md:text-xl block leading-tight`}>
                      {foto.texto}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

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
      <div className="flex justify-center gap-3 mt-10">
        {Array.from({ length: FOTOS_GALERIA.length - (itemsVisibles - 1) }).map((_, i) => (
          <button
            key={i}
            onClick={() => setIndice(i)}
            className={`h-2.5 w-2.5 rounded-full transition-colors duration-300 ${indice === i ? 'bg-[#3D2B1F]' : 'bg-[#3D2B1F]/20'}`}
          />
        ))}
      </div>
    </section>
  );
}