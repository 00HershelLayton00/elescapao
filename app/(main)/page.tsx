'use client';
import { useState, useEffect } from 'react';
import { Pacifico } from 'next/font/google'

const pacifico = Pacifico({
  subsets: ['latin'],
  weight: ['400']
})

export default function Home() {
  const todasLasFotos = [1, 2, 3, 4, 5, 6, 7, 8];
  const [indice, setIndice] = useState(0);
  const [itemsVisibles, setItemsVisibles] = useState(3);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  // Ajustar cantidad de fotos visibles según el ancho de pantalla
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
    if (indice < todasLasFotos.length - itemsVisibles) setIndice(indice + 1);
    else setIndice(0);
  };

  const anterior = () => {
    if (indice > 0) setIndice(indice - 1);
    else setIndice(todasLasFotos.length - itemsVisibles);
  };

  // Lógica para deslizar con el dedo (Mobile Swipe)
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    if (touchStart - touchEnd > 50) siguiente(); // Swipe izquierda
    if (touchStart - touchEnd < -50) anterior(); // Swipe derecha
    setTouchStart(null);
  };

  const actividades = [
    { titulo: "🍕 Noche de Pizza", fecha: "20 Enero", desc: "50% off en todas las pizzas" },
    { titulo: "🍷 Cata de Vinos", fecha: "25 Enero", desc: "Degustación exclusiva" },
    { titulo: "🎉 Happy Hour", fecha: "21 Enero", desc: "2x1 en bebidas" }
  ]

  return (
    <main>
      {/* Hero Section */}
      <div className="relative flex flex-col justify-between pt-10 overflow-hidden bg-[#F4ECE1] bg-[url('/images/papel.png')] bg-repeat bg-blend-multiply">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className={`text-4xl md:text-7xl font-bold mb-6 drop-shadow-sm ${pacifico.className} text-[#3D2B1F] tracking-tight`}>
            Don Santiago el Escapao
          </h1>
          <p className="text-2xl mt-8 md:text-3xl mb-12 font-light text-[#3D2B1F] italic">
            "Donde las cosas son cuando SON!!"
          </p>
        </div>

        {/* Sección Galería: Nuestro Espacio */}
        <div className="relative pt-10 pb-20 mx-2 md:mx-10 lg:mx-20 overflow-hidden bg-[#F4ECE1] bg-[url('/images/papel_arrugado.png')] bg-repeat rounded-xl shadow-sm">

          {/* TÍTULO */}
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

          {/* CONTENEDOR CON FLECHAS EXTERNAS */}
          <div className="relative px-4 md:px-16 lg:px-20">

            {/* Botón Anterior - Separado fuera de las fotos */}
            <button
              onClick={anterior}
              className="hidden md:flex absolute left-2 lg:left-6 top-1/2 -translate-y-1/2 z-20 p-3 bg-[#3D2B1F] hover:bg-[#5D4037] text-[#F4ECE1] rounded-full shadow-xl transition-all active:scale-90"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            {/* VENTANA DE VISUALIZACIÓN */}
            <div
              className="overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${indice * (100 / itemsVisibles)}%)` }}
              >
                {todasLasFotos.map((fotoId, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 px-2 md:px-4"
                    style={{ width: `${100 / itemsVisibles}%` }}
                  >
                    <div className="bg-[#1A120B] p-4 pb-10 shadow-2xl rounded-sm transform transition-all duration-500 rotate-1 md:hover:rotate-0 hover:scale-[1.02]">
                      <div className="relative aspect-[4/5] md:h-72 w-full overflow-hidden border border-white/10">
                        <img
                          src={`/images/restaurante${fotoId}.jpg`}
                          alt="Vista Restaurante"
                          className="w-full h-full object-cover pointer-events-none"
                        />
                      </div>
                      <div className="mt-4 text-center">
                        <span className={`${pacifico.className} text-[#EBDCCB]/70 text-lg md:text-xl`}>
                          Momento #{i + 1}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Botón Siguiente - Separado fuera de las fotos */}
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
            {Array.from({ length: todasLasFotos.length - (itemsVisibles - 1) }).map((_, i) => (
              <button
                key={i}
                onClick={() => setIndice(i)}
                className={`h-2.5 w-2.5 rounded-full transition-colors duration-300 ${indice === i ? 'bg-[#3D2B1F]' : 'bg-[#3D2B1F]/20'}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Actividades */}
      <div className="bg-[#F4ECE1] bg-[url('/images/tela.jpg')] pt-24 border-y-2 border-[#3D2B1F]/10">
        {/* Separador de madera con Gafas */}
        <div className="relative flex items-center justify-center w-full my-16 overflow-hidden">
          <div className="flex-1 flex items-center justify-end">
            <div className="h-7 w-full bg-[#3a2310] bg-[url('/images/wood_pattern.png')] border-b-4 border-[#3D2B1F] shadow-[5px_10px_20px_rgba(0,0,0,0.5)] rounded-r-sm relative">
              <div className="absolute right-6 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#1A120B] opacity-60"></div>
            </div>
            <div className="h-[2px] w-24 md:w-64 bg-gradient-to-l from-[#3D2B1F] to-transparent ml-2"></div>
          </div>
          <div className="flex-shrink-0 mx-6 md:mx-10 text-[#3D2B1F] drop-shadow-xl transform hover:rotate-12 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-utensils-crossed-icon lucide-utensils-crossed"><path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8" /><path d="M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7" /><path d="m2.1 21.8 6.4-6.3" /><path d="m19 5-7 7" /></svg>
          </div>

          <div className="flex-1 flex items-center justify-start">
            <div className="h-[2px] w-24 md:w-64 bg-gradient-to-r from-[#3D2B1F] to-transparent mr-2"></div>
            <div className="h-7 w-full bg-[#3a2310] bg-[url('/images/wood_pattern.png')] border-b-4 border-[#3D2B1F] shadow-[-5px_10px_20px_rgba(0,0,0,0.5)] rounded-l-sm relative">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#1A120B] opacity-60"></div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <h2 className={`flex items-center justify-center gap-2 md:gap-4 text-4xl md:text-6xl font-black text-center mb-10 md:mb-16 ${pacifico.className} text-[#2C1E16]`}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 md:w-14 md:h-14 shrink-0"
            >
              <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="#4E342E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3 10H21" stroke="#4E342E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8 2V6" stroke="#4E342E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M16 2V6" stroke="#4E342E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="7" y="14" width="2" height="2" rx="1" fill="#4E342E" />
              <rect x="11" y="14" width="2" height="2" rx="1" fill="#4E342E" />
              <rect x="15" y="14" width="2" height="2" rx="1" fill="#4E342E" />
              <rect x="7" y="18" width="2" height="2" rx="1" fill="#4E342E" />
              <rect x="11" y="18" width="2" height="2" rx="1" fill="#4E342E" />
            </svg>

            {/* Usamos leading-tight para que el interlineado no separe mucho el icono si el texto baja de línea */}
            <span className="leading-tight">Próximas Actividades</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {actividades.map((act, i) => (
              <div key={i} className="bg-[#F9F3EB] p-10 shadow-[10px_10px_0px_0px_rgba(26,18,11,1)] border border-[#D4B996] relative transform transition hover:translate-x-1 hover:translate-y-1">
                <div className="absolute -top-5 -left-5 text-5xl rotate-[-15deg]">📌</div>
                <h3 className="text-2xl font-black mb-4 border-b-2 border-[#3D2B1F]/10 pb-2 text-[#2C1E16]">
                  {act.titulo}
                </h3>
                <p className="text-[#A0522D] font-black text-xl mb-3">{act.fecha}</p>
                <p className="text-[#5D4037] text-lg leading-relaxed italic font-medium">{act.desc}</p>
              </div>
            ))}
          </div>
        </div>
        {/*Otro separador*/}
        <div className="relative flex items-center justify-center w-full mt-16 mb-5">
          <div className="flex-1 h-px bg-gradient-to-r from-[#D4B996] via-[#8B6914] to-[#D4B996]"></div>

          <div className="flex-shrink-0 mx-4 md:mx-6 text-[#8B6914] drop-shadow-md transform hover:scale-110 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-utensils-crossed-icon lucide-utensils-crossed"><path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8" /><path d="M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7" /><path d="m2.1 21.8 6.4-6.3" /><path d="m19 5-7 7" /></svg>
          </div>

          <div className="flex-1 h-px bg-gradient-to-l from-[#D4B996] via-[#8B6914] to-[#D4B996]"></div>
        </div>
      </div>
    </main>
  )
}