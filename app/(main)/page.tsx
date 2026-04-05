import { Pacifico } from 'next/font/google'

const pacifico = Pacifico({
  subsets: ['latin'],
  weight: ['400'] 
})

export default function Home() {
  const actividades = [
    { titulo: "🍕 Noche de Pizza", fecha: "20 Enero", desc: "50% off en todas las pizzas" },
    { titulo: "🍷 Cata de Vinos", fecha: "25 Enero", desc: "Degustación exclusiva" },
    { titulo: "🎉 Happy Hour", fecha: "21 Enero", desc: "2x1 en bebidas" }
  ]

  return (
    <main>
      {/* Hero Section */}
      <div className="relative flex flex-col justify-between pt-10 pb-20 overflow-hidden bg-[#F4ECE1] bg-[url('/images/papel.jpg')] bg-cover bg-center bg-blend-multiply ">
        
        {/* Plumas Decorativas (PNGs) */}
        <img 
          src="/images/pluma-rustica.png" 
          className="absolute top-0 left-[10%] w-[30rem] opacity-[0.03] rotate-45 pointer-events-none" 
          alt=""
        />
        <img 
          src="/images/pluma-rustica.png" 
          className="absolute bottom-0 right-[5%] w-[25rem] opacity-[0.03] -rotate-12 scale-x-[-1] pointer-events-none" 
          alt=""
        />

        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className={`text-4xl md:text-7xl font-bold mb-6 drop-shadow-sm ${pacifico.className} text-[#3D2B1F] tracking-tight`}>
            Bienvenido al escapao
          </h1>
          <p className="text-2xl mt-8 md:text-3xl mb-12 font-light text-[#3D2B1F] italic">
            "Donde las cosas son cuando SON!!"
          </p>
        </div>

        {/* Sección Galería: Nuestro Espacio */}
        <div className="relative py-10 mx-6 md:mx-20 px-6 md:px-20 overflow-hidden bg-[#F4ECE1] bg-[url('/images/papel_arrugado.png')] bg-cover bg-center bg-blend-multiply shadow-inner rounded-xl">
          
          <div className="flex flex-row items-center justify-center gap-6 mb-12 w-full">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#3D2B1F"
              strokeWidth="2.5"
              className="w-10 h-10 md:w-12 md:h-12 drop-shadow-sm shrink-0"
            >
              <rect x="3" y="6" width="18" height="13" rx="2" />
              <circle cx="12" cy="12.5" r="3" />
              <path d="M7 6V4h4v2" />
              <circle cx="18" cy="9" r="0.5" fill="#3D2B1F" />
            </svg>

            <h2 className={`${pacifico.className} text-3xl md:text-5xl font-black text-[#3D2B1F] tracking-tighter`}>
              Nuestro Espacio
            </h2>
          </div>

          {/* GRID DE FOTOS (Polaroids) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[1, 2, 3].map((id) => (
              <div 
                key={id} 
                className="bg-[#1A120B] p-4 pb-12 shadow-[0_30px_60px_rgba(0,0,0,0.5)] rounded-sm transform transition duration-500 hover:scale-105 hover:rotate-0 rotate-1 odd:-rotate-2 even:rotate-2"
              >
                <div className="relative h-72 w-full overflow-hidden border border-white/5">
                  <img 
                    src={`/images/restaurante${id}.jpg`} 
                    alt={`Vista de El Escapao ${id}`}
                    className="w-full h-full object-cover grayscale-[20%] sepia-[10%] hover:grayscale-0 transition-all duration-700"
                  />
                  {/* Reflejo sutil sobre la foto */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none"></div>
                </div>
                <div className="mt-4 text-center">
                  <span className={`${pacifico.className} text-[#EBDCCB] opacity-60 text-lg`}>
                    Momento #{id}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Actividades */}
      <div className="bg-[#F4ECE1] bg-[url('/images/tela.jpg')] py-24 border-y-2 border-[#3D2B1F]/10">
        
        {/* Separador de madera con Gafas */}
        <div className="relative flex items-center justify-center w-full my-16 overflow-hidden">
          <div className="flex-1 flex items-center justify-end">
            <div className="h-7 w-full bg-[#3a2310] bg-[url('/images/wood_pattern.png')] border-b-4 border-[#3D2B1F] shadow-[5px_10px_20px_rgba(0,0,0,0.5)] rounded-r-sm relative">
              <div className="absolute right-6 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#1A120B] opacity-60"></div>
            </div>
            <div className="h-[2px] w-12 md:w-32 bg-gradient-to-l from-[#3D2B1F] to-transparent ml-2"></div>
          </div>
          
          <div className="flex-shrink-0 mx-6 md:mx-10 text-[#3D2B1F] drop-shadow-xl transform hover:rotate-12 transition-transform">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-12 h-12 md:w-16 md:h-16">
              <path d="M9 11c1.5 0 2 1 3 1s1.5-1 3-1" />
              <path d="M4 11h3c1 0 2 1 2 3v1c0 2-1 3-2.5 3S4 17 4 15.5V11Z" />
              <path d="M15 11h3v4.5c0 1.5-1 2.5-2.5 2.5S13 17 13 15v-1c0-2 1-3 2-3Z" />
              <path d="M4 11h-1a1 1 0 0 1-1-1" /><path d="M18 11h1a1 1 0 0 0 1-1" />
            </svg>
          </div>

          <div className="flex-1 flex items-center justify-start">
            <div className="h-[2px] w-12 md:w-32 bg-gradient-to-r from-[#3D2B1F] to-transparent mr-2"></div>
            <div className="h-7 w-full bg-[#3a2310] bg-[url('/images/wood_pattern.png')] border-b-4 border-[#3D2B1F] shadow-[-5px_10px_20px_rgba(0,0,0,0.5)] rounded-l-sm relative">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#1A120B] opacity-60"></div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4">
          <h2 className={`text-4xl md:text-6xl font-black text-center mb-20 ${pacifico.className} text-[#2C1E16]`}>
            📅 Próximas Actividades
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
      </div>
    </main>
  )
}