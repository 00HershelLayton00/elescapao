import React from 'react';

// === DEFINICIÓN DE ICONOS SVG (Limpios y en el color del título) ===

const IconFamilia = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-16 h-16">
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
  </svg>
);

const IconRomantico = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-16 h-16">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  </svg>
);

const IconEjecutivo = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16">
    <path d="M12 12h.01M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2M22 13a18.15 18.15 0 0 1-20 0" />
    <rect width="20" height="14" x="2" y="6" rx="2" />
  </svg>
);

const IconHamburguesa = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16">
    <path d="M12 16H4a2 2 0 1 1 0-4h16a2 2 0 1 1 0 4h-4.25" />
    <path d="M5 12a2 2 0 0 1-2-2 9 7 0 0 1 18 0 2 2 0 0 1-2 2" />
    <path d="M5 16a2 2 0 0 0-2 2 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 2 2 0 0 0-2-2q0 0 0 0" />
    <path d="m6.67 12 6.13 4.6a2 2 0 0 0 2.8-.4l3.15-4.2" />
  </svg>
);

const IconFiesta = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-16 h-16">
    <path d="M5.8 11.3 2 22l10.7-3.79M4 3h.01M22 8h.01M15 2h.01M22 20h.01" />
    <path d="m22 2-2.24.75a2.9 2.9 0 0 0-1.96 3.12c.1.86-.57 1.63-1.45 1.63h-.38c-.86 0-1.6.6-1.76 1.44L14 10" />
    <path d="m22 13-.82-.33c-.86-.34-1.82.2-1.98 1.11c-.11.7-.72 1.22-1.43 1.22H17" />
    <path d="m11 2 .33.82c.34.86-.2 1.82-1.11 1.98C9.52 4.9 9 5.52 9 6.23V7" />
    <path d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z" />
  </svg>
);
const IconRegalo = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 inline-block mb-1">
    <path d="M12 7v14M20 11v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8" />
    <path d="M7.5 7a1 1 0 0 1 0-5A4.8 8 0 0 1 12 7a4.8 8 0 0 1 4.5-5 1 1 0 0 1 0 5" />
    <rect x="3" y="7" width="18" height="4" rx="1" />
  </svg>
);
export default function CombosPage() {
  const combos = [
    { nombre: "Oferta para choferes", items: "Convenios con choferes para transportar clientes a nuestro local y llevar insignias del mismo en su vehículo, los interesados pueden contactarnos para más información", precio: "+53 51591471", ahorro: "Llama ya!", icon: <IconEjecutivo /> },
  ]

  return (
    <div className="min-h-screen bg-[#F4ECE1] bg-[url('/images/papel.png')] bg-repeat py-12 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Cabecera estilo Subcategoría */}
        <div className="flex items-center justify-center gap-6 mb-16">
          <div className="hidden sm:block h-[2px] flex-1 bg-gradient-to-l from-[#4E342E]/60 to-transparent"></div>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[#4E342E] uppercase tracking-widest px-4 flex items-center justify-center gap-4">
              <IconRegalo />
              Ofertas y Combos
            </h1>
            <p className="text-[#4E342E]/70 italic mt-2 font-medium">Los mejores paquetes de El Escapao</p>
          </div>
          <div className="hidden sm:block h-[2px] flex-1 bg-gradient-to-r from-[#4E342E]/60 to-transparent"></div>
        </div>


        {/* Grid de Combos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {combos.map((combo, i) => (
            <div
              key={i}
              className="relative group overflow-hidden rounded-[26px] flex flex-col p-8 transition-all duration-300"
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
                <div className="flex justify-between items-start">
                  <div className="max-w-[75%]">
                    <h3 className="text-3xl font-bold text-[#f2e2ce] drop-shadow-md">
                      {combo.nombre}
                    </h3>
                    <p className="text-[#c5a88a] mt-3 italic font-medium leading-relaxed">
                      {combo.items}
                    </p>
                  </div>

                  {/* === ICONO CON COLOR DEL TEXTO (#f2e2ce) === */}
                  <div className="text-[#f2e2ce] opacity-80 group-hover:opacity-100 transition-all duration-300">
                    {combo.icon}
                  </div>
                </div>

                <div className="mt-8">
                  <p className="text-[#86efac] text-sm font-bold uppercase tracking-widest mb-1 drop-shadow-sm">
                    {combo.ahorro}
                  </p>
                  <p className="text-4xl font-black text-white drop-shadow-lg">
                    {combo.precio}
                  </p>
                </div>
              </div>

              {/* Brillo superior decorativo */}
              <div className="absolute inset-x-0 top-0 h-[2px] bg-white/10 rounded-t-[26px] pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}