'use client';
import { Special_Elite } from 'next/font/google'
import Image from 'next/image';
const specialElite = Special_Elite({
  subsets: ['latin'],
  weight: ['400'], // Esta fuente solo suele tener peso 400 (normal)
  variable: '--font-special-elite', // Opcional: para usarla como variable CSS
})
export default function NosotrosPage() {
  return (
    <div className="min-h-screen overflow-hidden">
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
            className={`relative rounded-lg shadow-2xl p-8 md:p-14 mb-12 transform hover:scale-[1.005] transition-all font-serif ${specialElite.className}`}
            style={{
              backgroundImage: "url('/images/papel_arrugado.webp')",
              backgroundRepeat: 'no-repeat',
              // Cambiamos 'cover' por '100% 100%' para forzar el ajuste total
              backgroundSize: '100% 100%',
              backgroundPosition: 'center',
              border: '1px solid rgba(0,0,0,0.1)',
            }}
          >
            {/* --- SELLO POSTAL VERDE (Esquina superior derecha) --- */}
            <div className="absolute right-6 top-0 md:top-6 z-0">
              <Image
                src="/images/sello.webp" // Asegúrate de tener esta imagen (verde de 5c)
                alt="Sello postal Cuba 5c"
                width={150} // Ancho proporcional
                height={150}
                className="object-contain opacity-90 rotate-[-3deg]" // Rotación sutil
              />
            </div>

            {/* --- MATASELLOS DE GOMA (Esquina inferior derecha) --- */}
            {/* z-0 para que la llave pase por encima */}
            <div className="absolute right-10 bottom-10 z-0">
              <Image
                src="/images/matasellos_escapao_azul.webp" // Asegúrate de tener esta imagen (circular azul)
                alt="Matasellos El Escapao"
                width={220} // Un poco más grande para la cuchara
                height={220}
                className="object-contain opacity-70 rotate-[-5deg]" // Transparencia y rotación
              />
            </div>

            {/* --- LLAVE INGLESA RUSTICA (Sobresaliendo a la derecha) --- */}
            {/* Posicionamiento absoluto, z-20 para estar por encima de todo */}
            <div className="absolute -right-60 top-1/2 -translate-y-1/2 z-20 hidden md:block">
              <Image
                src="/images/llave_inglesa.webp" // Ruta a tu imagen de llave inglesa rústica con fondo transparente
                alt="Llave inglesa rústica"
                width={500} // Ajusta el ancho según sea necesario
                height={300} // Ajusta la altura para que la imagen sea nítida
                className="object-contain opacity-95 rotate-[-15deg]" // Rotación y ligera transparencia
              />
            </div>

            {/* --- CONTENIDO CENTRAL: Aumentamos el padding para la postal --- */}
            {/* md:pr-24 para dejar espacio a la llave inglesa */}
            <div className="relative z-10 md:px-10 md:pr-24" style={{ color: '#2A2A2A' }}>

              {/* Encabezado */}
              <div className="flex flex-col gap-1 mb-8">
                <p className="text-xl text-[#3D2B1F]">El Restaurante/Bar</p>
                <h2 className="text-4xl md:text-5xl font-extrabold text-[#8A1A12] leading-tight">
                  "Don Santiago El Escapao".
                </h2>
              </div>

              {/* Historia - Texto en máquina de escribir */}
              <div className="prose prose-lg max-w-none text-gray-900 leading-relaxed space-y-5 text-justify">
                <p className="text-xl">
                  nació en el corazón del nieto de Don Santiago, este elegante Señor,
                  la más fiel muestra del campesino cubano, vivió en Manzanillo y allí
                  todos los recuerdan como el patriarca de una familia humilde, pero trabajadora.
                </p>

                <p className="text-xl">
                  En la actualidad, Holguín es el Hogar de esta familia y <span className="font-bold text-[#8A1A12]">Julio</span>,
                  el heredero (alias) <span className="italic font-bold text-[#8A1A12]">"el Escapao"</span> nos brinda la posibilidad de llegar
                  a este lugar de la geografía oriental y disfrutar de la Cuba que añoramos,
                </p>

                <p className="text-xl">
                  la del <span className="font-bold">lechón asado</span>, la <span className="font-bold">yuca con mojo</span>, el <span className="font-bold">tamal oriental</span>, el <span className="font-bold">coctel tradicional</span> y hasta su exposición de <span className="font-bold">autos clásicos americanos</span> que tanto le apasionan y que sin duda alguna, estos autos son sello de identidad en las calles y avenidas de cualquier ciudad de esta isla.
                </p>
              </div>

              {/* --- FRASES FINALES --- */}
              <div className="mt-12 space-y-4 pt-6 border-t border-gray-300/30 text-lg">
                <p>
                  Nuestra palabra favorita: <span className="font-black text-[#8A1A12] text-xl uppercase tracking-wider">FAMILIA</span>
                </p>
                <p>
                  Nuestro mayor empeño: <span className="font-black text-[#8A1A12] text-xl uppercase tracking-wider">CALIDAD EN EL SERVICIO</span>
                </p>
                <p>
                  Nuestro consejo: <span className="font-black text-[#8A1A12] text-xl uppercase tracking-wider">ESCÁPATE</span>
                </p>
                <p>
                  Nuestro Slogan por siempre:
                </p>
              </div>

              {/* --- ESLOGAN FINAL ROJO --- */}
              <div className="mt-8 text-center md:text-left">
                <p className="text-4xl font-black text-[#8A1A12] italic serif leading-tight">
                  LAS COSAS SON, CUANDO SON!
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
                  <p className="mt-2 text-xs font-bold text-[#3D2B1F] uppercase tracking-tighter"></p>
                </div>
              ))}
            </div>
          </div>

          {/* Invitación final */}
          <div className="text-center mt-12">
            <div className="inline-block bg-[#D4A373] bg-[url('/images/madera.webp')] bg-[length:110%_100%] bg-no-repeat text-[#BD9E7D] px-10 py-4 rounded-full font-black text-xl shadow-2xl  hover:bg-[#c59462] transition-colors">
              🍺 ¡Te esperamos para que te Escapés! 🍽️
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}