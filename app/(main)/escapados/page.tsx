"use client";
import Gallery from '@/app/component/Gallery';
import ActivityCarousel from '../../component/ActivityCarousel';
import Caurosel from '../../component/ActivityCarousel';

const Fot1 = [
  { id: 1, url: "bienvenido.webp", texto: "Bienvenido" },
  { id: 5, url: "familia.webp", texto: "Familia" },
];
const Fot2 = [
  { id: 4, url: "variedades.webp", texto: "Variedades" },
  { id: 6, url: "folclor.webp", texto: "Folclor" },
  { id: 2, url: "cantantes.webp", texto: "Cantantes" },
  { id: 7, url: "payasos.webp", texto: "Payasos" },
  { id: 3, url: "cubania.webp", texto: "Cubanía" },
];

interface Escapado {
  urlfoto: string;
  urlfacebook: string;
  texto: string;
}

interface Actividad {
  titulo: string;
  descripcion: string;
  fotos: { url: string; texto: string }[];
}

const escapadosData: Escapado[] = [
  {
    urlfoto: '1.webp',
    urlfacebook: 'https://www.facebook.com/100089616950247/posts/942631898734033/?app=fbl',
    texto: ''
  },
  {
    urlfoto: '2.webp',
    urlfacebook: 'https://www.facebook.com/100089616950247/posts/946664714997418/?app=fbl',
    texto: ''
  },
  {
    urlfoto: '3.webp',
    urlfacebook: 'https://www.facebook.com/100089616950247/posts/931858016478088/?app=fbl',
    texto: ''
  },
  {
    urlfoto: '4.webp',
    urlfacebook: 'https://www.facebook.com/100089616950247/posts/925922990404924/?app=fbl',
    texto: ''
  },
  {
    urlfoto: '5.webp',
    urlfacebook: 'https://www.facebook.com/100089616950247/posts/925491937114696/?app=fbl',
    texto: ''
  }
];


export default function EscapadosPage() {
  return (
    /* Contenedor principal: min-h-screen y flex-col para controlar el alto total */
    <div className="min-h-screen flex flex-col ">
      {/* Primera sección: Fondo de papel, contenido centrado */}
      <section className="bg-[url('/images/papel.png')] bg-repeat py-16 ">
        <div className="container mx-auto px-4 max-w-6xl bg-[url('/images/bg.webp')] bg-no-repeat bg-cover bg-blend-multiply">

          {/* Título adaptado al nuevo diseño */}
          <div className="flex items-center justify-center gap-6">
            <div className="hidden sm:block h-[2px] flex-1 bg-gradient-to-l from-[#3D2B1F]/60 to-transparent"></div>
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold tracking-widest px-4 flex items-center justify-center text-[#3D2B1F] font-serif">
                NUESTROS ESCAPADOS
              </h1>
            </div>
            <div className="hidden sm:block h-[2px] flex-1 bg-gradient-to-r from-[#3D2B1F]/60 to-transparent"></div>
          </div>
          <div className="flex items-center justify-center gap-6 mb-16">
            <p className="text-[#3D2B1F]/80 italic mt-3 font-medium text-lg">
              Momentos inolvidables junto a nosotros
            </p>
          </div>
          {/* Grid de Tarjetas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {escapadosData.map((escapado, index) => (
              <div
                key={index}
                className="bg-[#0] p-3 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex flex-col border border-white/60"
              >
                {/* Contenedor de la imagen con bordes redondeados */}
                <div className="rounded-xl overflow-hidden mb-5 shadow-sm">
                  <img
                    src={"images/escapados/" + escapado.urlfoto}
                    alt={escapado.texto || "Foto de nuestros clientes"}
                    className="w-full aspect-square object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Contenido inferior (Texto y Botón) */}
                <div className="px-2 pb-3 flex flex-col flex-grow justify-between">
                  {escapado.texto && (
                    <p className="text-gray-700 mb-5 text-center">{escapado.texto}</p>
                  )}

                  <div className="flex justify-center mt-auto">
                    {/* El contenedor externo crea el efecto de "marco" o borde profundo */}
                    <div className="w-[90%] p-[3px] bg-[#5d3a1a]/20 rounded-full flex justify-center shadow-inner">
                      <a
                        href={escapado.urlfacebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full bg-gradient-to-b from-[#946743] to-[#7c5332] text-white px-5 py-2.5 rounded-full hover:from-[#7c5332] hover:to-[#634125] transition-all shadow-[0_4px_8px_rgba(0,0,0,0.2)] font-medium text-[15px] border border-[#a17654]"
                      >
                        {/* Icono de Facebook (SVG) */}
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                        Ver en Facebook
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    {/* Aquí debajo iría tu segunda sección de actividades... */}
    <div className="bg-[url('/images/papel.png')] bg-repeat py-16">
      <div className="container mx-auto px-4 max-w-6xl bg-[url('/images/bg.webp')] bg-no-repeat bg-cover bg-blend-multiply">
        <Caurosel Fotos_Mostrar={Fot1} Titulo={"1"}></Caurosel>
        <Caurosel Fotos_Mostrar={Fot2} Titulo={"2"}></Caurosel>
      </div>
    </div>
  </div>
  );
}

