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
      <div className="relative flex flex-col justify-between pt-5 overflow-hidden bg-[#F4ECE1] bg-[url('/images/papel.jpg')] bg-cover bg-center bg-blend-multiply ">
        <div className="absolute top-0 left-1/4 opacity-[0.04] text-[20rem] rotate-45 select-none">🪶</div>
        <div className="absolute bottom-0 right-1/4 opacity-[0.04] text-[20rem] -rotate-12 select-none">🪶</div>

        <div className="container mx-auto px-4 text-center relative z-10">
          {/* TAMAÑO REDUCIDO: de text-7xl/8xl a text-6xl/7xl */}
          <h1 className={`text-4xl md:text-6xl font-bold mb-6 drop-shadow-sm ${pacifico.className} text-[#3D2B1F] tracking-tight`}>
            Bienvenido al escapao
          </h1>
          {/* TAMAÑO REDUCIDO: de text-3xl/4xl a text-2xl/3xl */}
          <p className="text-2xl mt-12 md:text-2xl mb-12 font-light text-[#3D2B1F]">
            Donde las cosas son cuando SON!!
          </p>
        </div>

        {/* Sección Galería */}
        <div className="relative py-10 mx-10 md:mx-20 px-10 md:px-20 overflow-hidden bg-[#F4ECE1] bg-[url('/images/papel_arrugado.png')] bg-cover bg-center bg-blend-multiply ">
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

            {/* TAMAÑO REDUCIDO: de text-5xl/7xl a text-4xl/6xl */}
            <h2 className={`${pacifico.className} text-2xl md:text-4xl font-black text-[#3D2B1F] tracking-tighter`}>
              Nuestro Espacio
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[1, 2, 3].map((id) => (
              <div key={id} className="bg-[#1A120B] p-5 shadow-[0_40px_70px_rgba(0,0,0,0.6)] rounded-sm transform transition hover:-rotate-2">
                <div className="bg-[#EBDCCB] h-64 flex items-center justify-center border-2 border-dashed border-[#3D2B1F]/20">
                  <span className="text-[#3D2B1F] font-black uppercase text-sm opacity-40">Imagen Restaurante</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Actividades */}
      <div className="bg-[#F4ECE1] bg-[url('/images/tela.jpg')] py-24 border-y-2">
        {/* Separador de madera */}
        <div className="relative flex items-center justify-center w-full my-12 overflow-hidden">
          <div className="flex-1 flex items-center justify-end">
            <div className="h-6 w-full bg-[#3a2310] bg-[url('/images/wood_pattern.png')] border-b-4 border-[#3D2B1F] shadow-[5px_10px_20px_rgba(0,0,0,0.5)] rounded-r-sm relative">
              <div className="absolute right-6 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#1A120B] opacity-60"></div>
            </div>
            <div className="h-[2px] w-12 md:w-24 bg-gradient-to-l from-[#3D2B1F] to-transparent ml-2"></div>
          </div>
          <div className="flex-shrink-0 mx-4 md:mx-8 text-[#3D2B1F] drop-shadow-md">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-10 h-10 md:w-14 md:h-14">
              <path d="M9 11c1.5 0 2 1 3 1s1.5-1 3-1" />
              <path d="M4 11h3c1 0 2 1 2 3v1c0 2-1 3-2.5 3S4 17 4 15.5V11Z" />
              <path d="M15 11h3v4.5c0 1.5-1 2.5-2.5 2.5S13 17 13 15v-1c0-2 1-3 2-3Z" />
              <path d="M4 11h-1a1 1 0 0 1-1-1" /><path d="M18 11h1a1 1 0 0 0 1-1" />
            </svg>
          </div>
          <div className="flex-1 flex items-center justify-start">
            <div className="h-[2px] w-12 md:w-24 bg-gradient-to-r from-[#3D2B1F] to-transparent mr-2"></div>
            <div className="h-6 w-full bg-[#3a2310] bg-[url('/images/wood_pattern.png')] border-b-4 border-[#3D2B1F] shadow-[-5px_10px_20px_rgba(0,0,0,0.5)] rounded-l-sm relative">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#1A120B] opacity-60"></div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4">
          {/* TAMAÑO REDUCIDO: de text-6xl a text-5xl */}
          <h2 className={`text-4xl md:text-5xl font-black text-center mb-16 ${pacifico.className} text-[#2C1E16]`}>
            📅 Próximas Actividades
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {actividades.map((act, i) => (
              <div key={i} className="bg-[#F9F3EB] p-8 shadow-[8px_8px_0px_0px_rgba(26,18,11,1)] border border-[#D4B996] relative transform transition hover:translate-x-1 hover:translate-y-1">
                <div className="absolute -top-4 -left-4 text-4xl rotate-[-15deg]">📌</div>
                {/* TAMAÑO REDUCIDO: de text-3xl a text-2xl */}
                <h3 className="text-2xl font-black mb-3 border-b-2 border-[#3D2B1F]/10 pb-2 text-[#2C1E16]">
                  {act.titulo}
                </h3>
                <p className="text-[#A0522D] font-black text-xl mb-2">{act.fecha}</p>
                <p className="text-[#5D4037] text-lg leading-relaxed italic font-medium">{act.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}