'use client';

import Image from 'next/image';

export default function NosotrosPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section: Se mantiene igual según tu solicitud */}
      <div
        className="relative h-[40vh] md:h-[50vh] bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url("/images/entrada.jpeg")'
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-5xl md:text-7xl font-black text-[#FFF8DC] italic mb-4 tracking-tighter">
            ¿Qué somos?
          </h1>
          <div className="w-24 h-1 bg-[#D4A373] mb-6"></div>
          <p className="text-xl md:text-2xl text-[#FFF8DC] max-w-2xl font-light">
            Tradición, familia y sabor cubano
          </p>
        </div>
      </div>

      {/* Sección Inferior con fondo.jpeg */}
      <div
        className="relative bg-top bg-no-repeat py-16"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url("/images/fondo.jpeg")',
          backgroundSize: '100% 100%', // Esto estira la foto para que cubra EXACTAMENTE todo el alto y ancho del div
          backgroundAttachment: 'scroll' // Esto hace que la foto se mueva junto con el contenido al desplazar
        }}
      >
        <div className="container mx-auto px-4 max-w-4xl relative z-10">

          {/* Historia Principal - Se usa blanco con opacidad para legibilidad */}
          {/* Contenedor principal: ¡IMPORTANTE! Quitamos overflow-hidden */}
          <div
            className="relative rounded-2xl shadow-2xl p-8 md:p-12 mb-12 transform hover:scale-[1.01] transition-all"
            style={{
              backgroundImage: "url('/images/tela.webp')",
              backgroundRepeat: 'no-repeat',
              backgroundSize: '100% 100%',
              backgroundColor: 'transparent',
            }}
          >
            {/* Capa de fondo crema: Solo en el centro */}
            <div
              className="absolute inset-x-20 inset-y-10 bg-[#F9F5F0] blur-2xl"
              style={{ zIndex: 0, opacity: 0.9 }}
            />

            {/* --- CUBIERTOS GRANDES QUE SOBRESALEN --- */}
            {/* Cubiertos Izquierda (Tenedores): Sobresalen por la izquierda */}
            <div className="absolute -left-16 top-1/2 -translate-y-1/2 z-10 hidden md:block" style={{ height: '80%' }}>
              <Image
                src="/images/cubiertosl.webp"
                alt="Cubiertos izquierda"
                width={120} // Ancho proporcional
                height={500} // Altura grande para asegurar calidad
                className="object-contain h-full w-auto" // h-full força el 80% del contenedor, w-auto mantiene proporción
              />
            </div>

            {/* Cubiertos Derecha (Cuchillo y Cuchara): Sobresalen por la derecha */}
            <div className="absolute -right-16 top-1/2 -translate-y-1/2 z-10 hidden md:block" style={{ height: '80%' }}>
              <Image
                src="/images/cubiertosr.webp"
                alt="Cubiertos derecha"
                width={150} // Un poco más ancho para la cuchara
                height={600}
                className="object-contain h-full w-auto"
              />
            </div>
            {/* ----------------- */}

            {/* Contenido Central: Aumentamos el padding lateral (md:px-32) para dejar espacio a los cubiertos grandes */}
            <div className="relative md:px-32" style={{ zIndex: 20 }}>

              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl">🍽️</span>
                <h2 className="text-3xl md:text-4xl font-bold text-[#3D2B1F]">
                  Don Santiago "El Escapado"
                </h2>
              </div>

              <div className="prose prose-lg max-w-none text-gray-900 leading-relaxed space-y-4">
                <p className="text-lg first-letter:text-5xl first-letter:font-bold first-letter:text-[#8B5A2B] first-letter:mr-2 first-letter:float-left">
                  Nació en el corazón del nieto de Don Santiago, este elegante Señor, la más fiel muestra del campesino cubano,
                  vivió en Manzanillo y allí todos los recuerdan como el patriarca de una familia humilde, pero trabajadora.
                </p>

                <p className="text-lg">
                  En la actualidad Holguín es el Hogar de esta familia y <span className="font-bold text-[#8B5A2B]">Julio</span>,
                  el heredero (alias) <span className="italic font-bold text-[#3D2B1F]">"el Escapao"</span> nos brinda la posibilidad de llegar
                  a este lugar de la geografía oriental y disfrutar de la Cuba que añoramos.
                </p>

                <p className="text-lg font-medium text-gray-800">
                  La del <span className="font-bold text-[#8B5A2B]">lechón asado</span>, la <span className="font-bold text-[#8B5A2B]">yuca con mojo</span>, el <span className="font-bold text-[#8B5A2B]">tamal oriental</span>, el <span className="font-bold text-[#8B5A2B]">coctel tradicional</span> y hasta su exposición de <span className="font-bold text-[#8B5A2B]">autos clásicos americanos</span> que tanto le apasionan y que sin duda alguna, estos autos son sello de identidad en las calles y avenidas de cualquier ciudad de esta isla.
                </p>
              </div>
            </div>
          </div>

          {/* Tarjetas de valores */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Bloque Madera */}
            <div
              className="relative rounded-2xl p-8 text-center shadow-2xl overflow-hidden flex flex-col items-center justify-center min-h-[220px]"
              style={{
                backgroundImage: "url('/images/madera.webp')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                border: '1px solid rgba(0,0,0,0.2)'
              }}
            >
              <div className="absolute inset-0 bg-black/10 pointer-events-none"></div>

              <div className="relative z-10 flex flex-col items-center">
                <div className="mb-3">
                  <svg
                    width="40" // Reducido de 50
                    height="40"
                    viewBox="0 0 24 24"
                    fill="#D4AF37"
                    className="drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                  </svg>
                </div>

                {/* Reducido a text-lg */}
                <h3 className="text-lg font-bold text-[#E0C068] mb-1 uppercase tracking-[0.2em] drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
                  Nuestra palabra favorita
                </h3>

                {/* Reducido a text-3xl */}
                <p className="text-3xl font-black text-[#E0C068] italic serif drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                  Familia
                </p>
              </div>
            </div>

            {/* Bloque Cuero */}
            <div
              className="relative bg-[#8B5A2B] rounded-3xl p-8 text-center shadow-2xl overflow-hidden border-2 border-dashed border-[#FFF8DC]/20"
              style={{
                backgroundImage: "url('/images/textura_cuero.webp')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-4 border-2 border-dashed border-[#5D3A1F] rounded-2xl pointer-events-none"></div>

              <div className="relative z-10 flex flex-col items-center">
                <div className="mb-4">
                  <svg
                    width="50" // Reducido de 60
                    height="50"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="drop-shadow-[0_1px_1px_rgba(255,255,255,0.15)]"
                  >
                    <circle cx="12" cy="12" r="10" stroke="#FFF8DC" strokeWidth="1.5" />
                    <circle cx="12" cy="12" r="7" stroke="#FFF8DC" strokeWidth="1.5" />
                    <circle cx="12" cy="12" r="4" stroke="#FFF8DC" strokeWidth="1.5" />
                    <path d="M12 12L19 19M19 5L12 12L5 19M5 5L12 12" stroke="#FFF8DC" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>

                {/* Reducido a text-lg */}
                <h3 className="text-lg font-semibold text-[#FFF8DC] mb-2 uppercase tracking-[0.2em] drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                  Nuestro mayor empeño
                </h3>

                {/* Reducido a text-3xl */}
                <p className="text-3xl font-extrabold text-[#F4ECE1] serif drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                  Calidad en el servicio
                </p>
              </div>
            </div>

            <div
              className="relative rounded-lg p-8 text-center shadow-xl flex flex-col items-center justify-center min-h-[220px]"
              style={{
                backgroundImage: "url('/images/papel.png')", // Textura de papel antiguo
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
              }}
            >
              <div className="relative z-10 flex flex-col items-center">
                <div className="mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="50"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-80 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M13 7a9.3 9.3 0 0 0 1.516 -.546c.911 -.438 1.494 -1.015 1.937 -1.932c.207 -.428 .382 -.928 .547 -1.522c.165 .595 .34 1.095 .547 1.521c.443 .918 1.026 1.495 1.937 1.933c.426 .205 .925 .38 1.516 .546a9.3 9.3 0 0 0 -1.516 .547c-.911 .438 -1.494 1.015 -1.937 1.932a9 9 0 0 0 -.547 1.521c-.165 -.594 -.34 -1.095 -.547 -1.521c-.443 -.918 -1.026 -1.494 -1.937 -1.932a9 9 0 0 0 -1.516 -.547" />
                    <path d="M3 14a21 21 0 0 0 1.652 -.532c2.542 -.953 3.853 -2.238 4.816 -4.806a20 20 0 0 0 .532 -1.662a20 20 0 0 0 .532 1.662c.963 2.567 2.275 3.853 4.816 4.806q .75 .28 1.652 .532a21 21 0 0 0 -1.652 .532c-2.542 .953 -3.854 2.238 -4.816 4.806a20 20 0 0 0 -.532 1.662a20 20 0 0 0 -.532 -1.662c-.963 -2.568 -2.275 -3.853 -4.816 -4.806a21 21 0 0 0 -1.652 -.532" />
                  </svg>
                </div>

                <h3 className="text-lg font-bold text-[#3D2B1F] mb-1 uppercase tracking-widest opacity-90">
                  Nuestro consejo
                </h3>

                <p className="text-3xl font-black text-[#3D2B1F] italic serif tracking-tight">
                  Escápate
                </p>
              </div>
            </div>

            {/* Bloque Slogan / Escritorio */}
            <div
              className="relative rounded-2xl p-8 text-center shadow-2xl overflow-hidden flex flex-col items-center justify-center min-h-[220px] border border-white/5"
              style={{
                backgroundColor: '#1A3C34', // Verde oscuro de oficina
                backgroundImage: "url('/images/textura_escritorio.webp')",
                backgroundSize: 'cover',
              }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent"></div>

              <div className="relative z-10 flex flex-col items-center">
                {/* Icono de Chispas SVG */}
                <div className="mb-4 text-[#D4A373]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="50"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#D4A373"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="opacity-90 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M8 16l2 -6l6 -2l-2 6l-6 2" />
                    <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                    <path d="M12 3l0 2" />
                    <path d="M12 19l0 2" />
                    <path d="M3 12l2 0" />
                    <path d="M19 12l2 0" />
                  </svg>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-widest">
                  Nuestro Slogan
                </h3>

                <p className="text-2xl font-medium text-[#D4A373] italic serif opacity-90">
                  "Las cosas son, cuando son"
                </p>
              </div>
            </div>

          </div>

          {/* Cita destacada con efecto cristal */}
          <div className="flex justify-center items-center my-16 px-4">
            <div
              className="relative w-full max-w-3xl text-center rounded-lg"
              style={{
                backgroundImage: "url('/images/placa.webp')", // 👈 tu PNG aquí
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              {/* Overlay suave para mejorar contraste */}
              <div className="absolute inset-0 bg-black/10 rounded-lg"></div>

              {/* Contenido */}
              <div className="relative px-8 py-10 md:px-14 md:py-12">

                {/* Comillas superiores */}
                <span className="absolute top-4 left-6 text-4xl md:text-5xl text-black/60 font-serif">
                  “
                </span>

                {/* Texto */}
                <p className="text-lg md:text-2xl font-serif italic text-stone-900 leading-relaxed tracking-wide drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)]">
                  Un pedazo de Cuba donde el tiempo se detiene y los sabores hablan por sí mismos
                </p>

                {/* Comillas inferiores */}
                <span className="absolute bottom-4 right-6 text-4xl md:text-5xl text-black/60 font-serif">
                  ”
                </span>
              </div>
            </div>
          </div>

          {/* Autos clásicos - Sección especial */}
          <div className="bg-white/95 backdrop-blur-sm bg-[url('/images/tela.jpg')] rounded-2xl shadow-2xl p-8 md:p-12 border border-[#3D2B1F]/10">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl">🚗</span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#3D2B1F] uppercase">
                La Pasión por los Clásicos
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg mb-8">
              Los autos clásicos americanos son sello de identidad en las calles de esta isla y una pasión que Julio mantiene viva en cada rincón de <span className="font-bold">El Escapao</span>.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="text-center group cursor-pointer">
                  <div className="relative aspect-square overflow-hidden rounded-xl border-2 border-[#D4A373]/30 shadow-inner bg-[#F4ECE1]">
                    <Image
                      src={`/images/carrito${i}.jpeg`}
                      alt={`Clásico ${i}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <p className="mt-2 text-xs font-bold text-[#3D2B1F] uppercase tracking-tighter">Clásico {i}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Invitación final */}
          <div className="text-center mt-12">
            <div className="inline-block bg-[#D4A373] bg-[url('/images/madera.webp')] bg-[length:110%_100%] bg-no-repeat text-[#BD9E7D] px-10 py-4 rounded-full font-black text-xl shadow-2xl  hover:bg-[#c59462] transition-colors">
              🍺 Escápate con Nosotros 🍽️
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}