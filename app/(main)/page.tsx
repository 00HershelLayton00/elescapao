import { Pacifico } from 'next/font/google'
import Gallery from '@/app/component/Gallery';

const pacifico = Pacifico({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
})

export default function Home() {

  const actividades = [
    { titulo: "🤡Shows de Payasos", fecha: "Todos los Días", desc: "Con divertidas ocurrencias y juegos para el disfrute en familia" },
    { titulo: "🎤Caraoke Escapao", fecha: "Todos los Jueves", desc: "Ponemos la música y usted se convierte en el mejor de los cantantes" },
    { titulo: "🎭Momento de Show", fecha: "Todos los Viernes", desc: "Shows diversos con artistas invitados" },
    { titulo: "🌞Bonísimos Días", fecha: "Sábados y Domingos", desc: "Shows con payasos en la mañana, para niños y adultos" },
    { titulo: "💃🏻Show de Cabaret", fecha: "Todos los Sábados", desc: "Excelenete música y baile con artistas invitados" },
    { titulo: "✨Noche estrellada", fecha: "Todos los Domingos", desc: "Varios artistas de diferentes manifestaciones son invitados como fuente de esta noche escapa`" },


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
        <Gallery />
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