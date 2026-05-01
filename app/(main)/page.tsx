"use client"; // Asegúrate de que Home sea un Client Component si manejas este estado aquí
import { useState, useEffect } from 'react';

import Gallery from '@/app/component/Gallery';
import WelcomeScreen from '../component/Welcome';



export default function Home() {

  const [showContent, setShowContent] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisitedEscapao");
    if (!hasVisited) {
      setIsNewUser(true);
    } else {
      setShowContent(true);
    }
  }, []);

  const handleWelcomeFinished = () => {
    setIsNewUser(false);
    setShowContent(true);
  };

  // Si aún no hemos verificado localStorage, no renderizamos nada para evitar el parpadeo
  if (!showContent && !isNewUser) return <div className="bg-[#F4ECE1] min-h-screen" />;

  const actividades = [
    { titulo: "🤡Shows de Payasos", fecha: "Todos los Días", desc: "Con divertidas ocurrencias y juegos para el disfrute en familia" },
    { titulo: "🎤Karaoke Escapao", fecha: "Todos los Jueves", desc: "Ponemos la música y usted se convierte en el mejor de los cantantes" },
    { titulo: "Encuentro Cubano", fecha: "Todos los Viernes", desc: "Un momento para encontrarnos con nuestras raíces" },
    { titulo: "👪Para Pasarlo en Familia", fecha: "Sábados y Domingos", desc: "Entre payasos y risas los adultos se hacen niños y los niños hacen grande a la familia" },
    { titulo: "💃🏻Show de Cabaret Tradicional", fecha: "Todos los Sábados", desc: "Artistas, bailarines y humoristas; nacionales e internacionales siempre alegrando nuestras noches de armonía" },
    { titulo: "✨Noche  Bajo las Estrellas", fecha: "Todos los Domingos", desc: "Una noche donde la estrella siempre serás tú, escápate!" },


  ]

  return (
    <>
      {isNewUser && <WelcomeScreen onFinished={handleWelcomeFinished} />}
      <main className={isNewUser ? "hidden" : "block"}>
        {/* Hero Section */}
        <div
          className="relative flex flex-col items-center pb-20 overflow-hidden bg-[#F4ECE1] bg-[url('/images/bg.webp')] bg-no-repeat bg-cover bg-blend-multiply"
          style={{
            WebkitMaskImage: 'linear-gradient(to bottom, black 90%, transparent 100%)',
            maskImage: 'linear-gradient(to bottom, black 90%, transparent 100%)'
          }}
        >

          {/* --- Vehículos Decorativos (Fondo) --- */}
          <img
            src="/images/carro_azul.webp"
            alt="Chevrolet clásico azul"
            className="hidden md:block absolute top-0 -left-60 w-96 md:w-[550px] object-contain opacity-90 sepia-[.35] contrast-120 brightness-95 saturate-75 -rotate-2 pointer-events-none z-0"
          />
          <img
            src="/images/carro_gris.webp"
            alt="Chevrolet clásico gris"
            className="hidden md:block absolute top-32 -left-40 w-96 md:w-[550px] object-contain opacity-90 sepia-[.35] contrast-120 brightness-95 saturate-75 scale-x-[-1] -rotate-2 pointer-events-none z-0"
          />
          <img
            src="/images/carro_rojo.webp"
            alt="Chevrolet clásico rojo"
            className="hidden md:block absolute top-0 -right-60 w-96 md:w-[550px] object-contain opacity-90 sepia-[.35] contrast-120 brightness-95 saturate-75 rotate-2 scale-x-[-1] pointer-events-none z-0"
          />
          <img
            src="/images/carro_verde.webp"
            alt="Chevrolet clásico verde"
            className="hidden md:block absolute top-32 -right-40 w-96 md:w-[550px] object-contain opacity-90 sepia-[.35] contrast-120 brightness-95 saturate-75 rotate-2 scale-x-[-1] pointer-events-none z-0"
          />

          {/* --- Contenido Principal --- */}
          <div className="container mx-auto px-4 flex flex-col items-center text-center relative z-10">

            {/* Contenedor del Título con Esquinas de Rosas */}
            <div className="relative inline-flex flex-col items-center justify-center px-16 py-14 md:px-24 md:py-20  rounded-tl-3xl rounded-tr-3xl">
              {/* o si quieres que termine completamente transparente: to-transparent */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100%] h-[100%] bg-[#EAD9BD] bg-opacity-40 rounded-full -z-10"></div>
              {/* Rosa: Esquina Superior Derecha (Rotada 180° para que encaje) */}
              <img
                src="/images/rose_frame.webp"
                alt="Rosas decorativas"

                className="absolute top-0 left-0 w-32 md:w-48 object-contain pointer-events-none rotate-180 drop-shadow-sm sepia-[.60] contrast-125 brightness-90 saturate-50"
              />

              <h1 className={`text-5xl md:text-7xl font-bold text-[#3D2B1F] tracking-tight drop-shadow-sm`}>
                Don Santiago el Escapao
              </h1>

              {/* Rosa: Esquina Inferior Izquierda (Posición original) */}
              <img
                src="/images/rose_frame.webp"
                alt="Rosas decorativas"
                className="absolute bottom-0 right-0 w-32 md:w-48 object-contain pointer-events-none drop-shadow-sm sepia-[.60] contrast-125 brightness-90 saturate-50"
              />
              <p className="text-xl md:text-2xl mt-6 max-w-3xl font-light text-[#3D2B1F] italic font-serif">
                "Donde las cosas son cuando SON!!"
              </p>
              <div className="bg-[url('/images/banner.png')] bg-cover bg-center bg-no-repeat py-2 flex items-center justify-center px-10 md:px-20 mt-5">
                <span className={`text-xl md:text-2xl text-[#6B4423] tracking-wide text-center`}>
                  ¡Feliz Día de las Madres!
                </span>
              </div>
            </div>

          </div>

          {/* --- Sección Galería --- */}
          <div className="relative z-10 w-full mt-4">
            <Gallery />
          </div>
          <img
            src="/images/rose_right.webp"
            alt="Chevrolet clásico rojo"
            className="absolute -bottom-10 -left-20 w-72 md:w-[300px] object-contain opacity-90 sepia-[.60] contrast-125 brightness-90 saturate-50 rotate-2  pointer-events-none z-0"
          /> <img
            src="/images/rose_left.webp"
            alt="Chevrolet clásico rojo"
            className="absolute -bottom-0 -right-20 w-72 md:w-[300px] object-contain opacity-90 sepia-[.60] contrast-125 brightness-90 saturate-50 rotate-2 pointer-events-none scale-x-[-1] z-0"
          />
        </div>

        <section className="relative py-12 px-4 bg-[#F4ECE1] overflow-hidden">
          <div className="max-w-7xl mx-auto flex items-center justify-center">
            {/* Imagen Izquierda */}
            <img
              src="/images/madre1.webp"
              alt="Madre e hija"
              className="hidden md:block w-80 h-auto rounded-lg shadow-lg object-cover aspect-[3/4]"
            />

            {/* CONTENEDOR DEL MARCO (Tarjeta central) */}
            <div
              className="flex-1 text-center flex flex-col items-center justify-center px-10 py-16 md:px-16 md:py-20 lg:px-32 lg:py-24"
              style={{
                backgroundImage: "url('/images/frame.webp')",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "100% 100%" // Obliga a la foto a cubrir el div completo
              }}
            >
              {/* Título (Letras más pequeñas: text-xs/text-sm) */}
              <h3 className="text-[#3D2B1F] text-xs md:text-sm font-medium tracking-[0.25em] uppercase mb-5 font-serif opacity-80 p-4">
                Actividad Especial (Día de las Madres - 9 Mayo)
              </h3>

              <div className="space-y-5 mb-8 max-w-3xl">
                {/* Frase principal (Letras más pequeñas: text-2xl/text-4xl) */}
                <p className="text-[#3D2B1F] text-2xl md:text-4xl leading-tight italic font-serif">
                  "El único día del año donde respiramos amor del bueno. Ven y festeja el Día de las Madres."
                </p>
                {/* Descripción (Letras más pequeñas: text-base/text-xl) */}
                <p className="text-[#3D2B1F]/70 text-base md:text-xl font-light">
                  Ven y comparte con nosotros la experiencia de sentirte cerca de tus seres más queridos.
                </p>
              </div>

              {/* Botón de WhatsApp (Letras más pequeñas: text-base/text-lg, padding ajustado) */}
              <div className="flex justify-center">
                <a
                  href="https://wa.me/5354797723?text=Hola!+Me+gustaría+reservar+para+el+día+de+las+madres+en+Don+Santiago+El+Escapao"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-2.5 px-10 py-3.5 bg-[#3D2B1F] text-[#F4ECE1] rounded-full transition-all duration-300 hover:bg-[#5D4037] hover:scale-105 shadow-xl"
                >
                  <span className="text-base md:text-lg font-bold tracking-widest uppercase">
                    Reserva por WhatsApp
                  </span>
                  <div className="absolute inset-0 rounded-full border-2 border-[#C5A880]/30 scale-110 group-hover:scale-100 transition-transform duration-500"></div>
                </a>
              </div>

              {/* Número de WhatsApp (Letras más pequeñas: text-base/text-xl) */}
              <p className="text-[#3D2B1F]/70 text-base md:text-xl font-light mt-3 mb-5">
                WhatsApp : +53 5 4797723
              </p>
            </div>

            {/* Imagen Derecha */}
            <img
              src="/images/madre2.webp"
              alt="Madre e hijo"
              className="hidden md:block w-80 h-auto rounded-lg shadow-lg object-cover aspect-[3/4]"
            />
          </div>
        </section>




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
            <h2 className={`flex items-center justify-center gap-2 md:gap-4 text-4xl md:text-6xl font-black text-center mb-10 md:mb-16 text-[#2C1E16]`}>
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

            <div className="grid grid-cols-1 md:px-10 md:grid-cols-3 gap-10">
              {actividades.map((act, i) => (
                <div
                  key={i}
                  className="bg-[url('/images/frame_actividades.webp')] bg-[length:100%_100%] bg-center bg-no-repeat p-10 pb-44"
                >
                  <h3 className="text-2xl font-black mb-4 text-[#2C1E16]">
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
    </>
  )
}