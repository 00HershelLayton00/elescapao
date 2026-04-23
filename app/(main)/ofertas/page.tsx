import React from 'react';
import SorteoSection from './SorteoSection';

// === ICONOS SVG UTILIZADOS ===
const IconRegalo = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 inline-block mb-1">
    <path d="M12 7v14M20 11v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8" />
    <path d="M7.5 7a1 1 0 0 1 0-5A4.8 8 0 0 1 12 7a4.8 8 0 0 1 4.5-5 1 1 0 0 1 0 5" />
    <rect x="3" y="7" width="18" height="4" rx="1" />
  </svg>
);

const IconCorazon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-16 h-16 text-rose-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  </svg>
);

const IconInfantil = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-16 h-16">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
    <path d="M8.25 13.5h7.5" />
  </svg>
);

const IconWhatsApp = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22 1.5 14.948 1.5 6.75V4.5z" clipRule="evenodd" />
  </svg>
);

export default function CombosPage() {
  const numero_oscar = "+5354797723";
  const numero_vivi = "+5351591471";
  const mensajeWhatsApp = "Saludos+me+gustaría+saber+más+sobre+una+oferta+de+menúes+para+mi+familia";
  const whatsappUrl = `https://wa.me/${numero_oscar}?text=${mensajeWhatsApp}`;

  const combos = [
    {
      nombre: "Menúes de Celebración",
      items: "✨ Cumpleaños • Aniversarios • Días Festivos • Bodas • Divorcios ✨",
      descripcion: "Bufé • Fotógrafos • Animadores • Shows artísticos • Decoración",
      detalle: "Costo por número de personas",
      precio: "Consultar",
      ahorro: "Eventos especiales",
      icon: <IconCorazon />
    },
    {
      nombre: "Para Niños",
      items: "🎂 Cumpleaños • Escuela • Solo por agradecer que está con nosotros 🎈",
      descripcion: "Bufé • Fotógrafos • Payasos • Decoraciones",
      detalle: "Costo dependiendo de la cantidad de personas",
      precio: "Consultar",
      ahorro: "Fiestas infantiles",
      icon: <IconInfantil />
    },
    {
      nombre: "Oferta para choferes",
      descripcion: "Convenios con choferes para transportar clientes a nuestro local y llevar insignias del mismo en su vehículo, los interesados pueden contactarnos para más información",
      precio: "+53 51591471",
      ahorro: "Llama ya!",
      icon: null
    },
  ];

  return (
    <div className="min-h-screen bg-[#F4ECE1] bg-[url('/images/papel.png')] bg-repeat py-12 pt-0">
      <div
        className="relative h-[40vh] md:h-[60vh] bg-cover bg-center mb-10 md:bg-fixed"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url("/images/cerdo.webp")',
          backgroundAttachment: 'scroll', // Por defecto en móvil para evitar zoom excesivo
        }}
      >
        {/* Contenedor de contenido con mejor padding */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">

          {/* Título principal */}
          <h1 className="text-2xl md:text-7xl font-black text-[#FFF8DC] italic mb-4 tracking-tighter leading-tight">
            Amor de madre, <br className="md:hidden" /> amor y tradición
          </h1>

          <div className="w-24 md:w-64 h-1 bg-[#D4A373] mb-6"></div>

          {/* Cabecera de Ofertas */}
          <div className="flex items-center justify-center gap-2 md:gap-6 w-full max-w-5xl">
            <div className="hidden sm:block h-[2px] flex-1 bg-gradient-to-l from-[#FFF8DC]/60 to-transparent"></div>

            <div className="text-center">
              <h1 className="text-xl md:text-5xl font-bold text-[#FFF8DC] uppercase tracking-[0.15em] px-2 flex items-center justify-center gap-2 md:gap-4">
                <IconRegalo />
                <span className="leading-none">Ofertas y Combos</span>
              </h1>

              <p className="text-xs md:text-base text-[#FFF8DC]/80 italic mt-3 font-medium tracking-wide">
                Los mejores paquetes de El Escapao
              </p>
            </div>

            <div className="hidden sm:block h-[2px] flex-1 bg-gradient-to-r from-[#FFF8DC]/60 to-transparent"></div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Componente Sorteo importado */}
        <div className="mb-16">
          <SorteoSection />
        </div>

        {/* Grid de Combos - todas las cartas unificadas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {combos.map((combo, i) => (
            <div
              key={i}
              className="relative group overflow-hidden rounded-[26px] flex flex-col p-6 transition-all duration-300 hover:scale-[1.02]"
              style={{
                backgroundColor: '#3d2b1f',
                backgroundImage: "url('/images/purty_wood.jpeg')",
                border: '2px solid #2a1b12',
                outline: '4px solid rgba(139, 109, 77, 0.6)',
                outlineOffset: '-1px',
                boxShadow: '0 0 30px rgba(0, 0, 0, 0.5)'
              }}
            >
              <div className="relative z-10 flex flex-col h-full">
                {/* Icono y título */}
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-[#f2e2ce] drop-shadow-md leading-tight">
                    {combo.nombre}
                  </h3>
                  {combo.icon && (
                    <div className="text-[#f2e2ce] opacity-80 group-hover:opacity-100 transition-all duration-300">
                      {combo.icon}
                    </div>
                  )}
                </div>

                {/* Items principales (con emojis) */}
                <p className="text-[#e6c8a8] font-semibold text-lg mb-3">
                  {combo.items}
                </p>

                {/* Descripción de servicios */}
                {combo.descripcion && (
                  <p className="text-[#c5a88a] font-medium mb-2">
                    {combo.descripcion}
                  </p>
                )}

                {/* Detalle adicional */}
                {combo.detalle && (
                  <p className="text-[#a88868] text-sm italic mb-4">
                    {combo.detalle}
                  </p>
                )}

                {/* Texto general para oferta de choferes */}
                {combo.nombre === "Oferta para choferes" && (
                  <p className="text-[#c5a88a] mt-2 italic font-medium leading-relaxed flex-1">
                    {combo.items}
                  </p>
                )}

                {/* Espaciador flexible */}
                <div className="flex-1"></div>

                {/* Precio y botón */}
                <div className="mt-6">
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div>
                      <p className="text-[#86efac] text-sm font-bold uppercase tracking-widest mb-1 drop-shadow-sm">
                        {combo.ahorro}
                      </p>
                      <p className="text-3xl font-black text-white drop-shadow-lg">
                        {combo.precio}
                      </p>
                    </div>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20b859] text-white font-bold py-2.5 px-5 rounded-full transition-all duration-300 shadow-lg text-sm"
                    >
                      <IconWhatsApp />
                      Contactar
                    </a>
                  </div>
                </div>
              </div>
              <div className="absolute inset-x-0 top-0 h-[2px] bg-white/10 rounded-t-[26px] pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}