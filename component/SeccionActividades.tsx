// Este archivo NO tiene 'use client' - es Server Component
import type { ActividadProps } from './types';

// Datos por defecto (pueden venir de una API o base de datos)
const actividadesDefault: ActividadProps['actividades'] = [
  { 
    titulo: "🍕 Noche de Pizza", 
    fecha: "20 Enero", 
    desc: "50% off en todas las pizzas",
    icono: "🍕"
  },
  { 
    titulo: "🍷 Cata de Vinos", 
    fecha: "25 Enero", 
    desc: "Degustación exclusiva con sommelier",
    icono: "🍷"
  },
  { 
    titulo: "🎉 Happy Hour", 
    fecha: "21 Enero", 
    desc: "2x1 en bebidas de 6pm a 8pm",
    icono: "🎉"
  }
];

interface SeccionActividadesProps {
  actividades?: ActividadProps['actividades'];
}

export default function SeccionActividades({ 
  actividades = actividadesDefault 
}: SeccionActividadesProps) {
  return (
    <div className="bg-[#F4ECE1] bg-[url('/images/tela.jpg')] py-24 border-y-2 border-[#3D2B1F]/10">
      {/* Separador decorativo con gafas */}
      <SeparadorDecorativo />

      <div className="container mx-auto px-4">
        <h2 className="flex items-center justify-center gap-2 md:gap-4 text-4xl md:text-6xl font-black text-center mb-10 md:mb-16 font-['Pacifico'] text-[#2C1E16]">
          <IconoCalendario />
          <span className="leading-tight">Próximas Actividades</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {actividades.map((act, i) => (
            <TarjetaActividad key={i} actividad={act} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Subcomponentes (también Server Components)
function SeparadorDecorativo() {
  return (
    <div className="relative flex items-center justify-center w-full my-16 overflow-hidden">
      <div className="flex-1 flex items-center justify-end">
        <div className="h-7 w-full bg-[#3a2310] bg-[url('/images/wood_pattern.png')] border-b-4 border-[#3D2B1F] shadow-[5px_10px_20px_rgba(0,0,0,0.5)] rounded-r-sm relative">
          <div className="absolute right-6 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#1A120B] opacity-60"></div>
        </div>
        <div className="h-[2px] w-12 md:w-32 bg-gradient-to-l from-[#3D2B1F] to-transparent ml-2"></div>
      </div>
      
      <div className="flex-shrink-0 mx-6 md:mx-10 text-[#3D2B1F] drop-shadow-xl transform hover:rotate-12 transition-transform">
        <IconoGafas />
      </div>

      <div className="flex-1 flex items-center justify-start">
        <div className="h-[2px] w-12 md:w-32 bg-gradient-to-r from-[#3D2B1F] to-transparent mr-2"></div>
        <div className="h-7 w-full bg-[#3a2310] bg-[url('/images/wood_pattern.png')] border-b-4 border-[#3D2B1F] shadow-[-5px_10px_20px_rgba(0,0,0,0.5)] rounded-l-sm relative">
          <div className="absolute left-6 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#1A120B] opacity-60"></div>
        </div>
      </div>
    </div>
  );
}

function TarjetaActividad({ actividad, index }: { actividad: ActividadProps['actividades'][0]; index: number }) {
  return (
    <div className="bg-[#F9F3EB] p-10 shadow-[10px_10px_0px_0px_rgba(26,18,11,1)] border border-[#D4B996] relative transform transition hover:translate-x-1 hover:translate-y-1">
      <div className="absolute -top-5 -left-5 text-5xl rotate-[-15deg]">📌</div>
      <h3 className="text-2xl font-black mb-4 border-b-2 border-[#3D2B1F]/10 pb-2 text-[#2C1E16]">
        {actividad.titulo}
      </h3>
      <p className="text-[#A0522D] font-black text-xl mb-3">{actividad.fecha}</p>
      <p className="text-[#5D4037] text-lg leading-relaxed italic font-medium">{actividad.desc}</p>
    </div>
  );
}

// Iconos como componentes separados para mejor organización
function IconoCalendario() {
  return (
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
  );
}

function IconoGafas() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-12 h-12 md:w-16 md:h-16">
      <path d="M9 11c1.5 0 2 1 3 1s1.5-1 3-1" />
      <path d="M4 11h3c1 0 2 1 2 3v1c0 2-1 3-2.5 3S4 17 4 15.5V11Z" />
      <path d="M15 11h3v4.5c0 1.5-1 2.5-2.5 2.5S13 17 13 15v-1c0-2 1-3 2-3Z" />
      <path d="M4 11h-1a1 1 0 0 1-1-1" />
      <path d="M18 11h1a1 1 0 0 0 1-1" />
    </svg>
  );
}