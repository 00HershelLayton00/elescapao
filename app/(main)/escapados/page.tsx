"use client";
import ActivityCarousel from '../../component/ActivityCarousel';

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
    urlfoto: '/images/escapado1.jpg',
    urlfacebook: 'https://facebook.com/escapado1',
    texto: 'Juan Pérez, escapado en Madrid'
  },
  {
    urlfoto: '/images/escapado2.jpg',
    urlfacebook: 'https://facebook.com/escapado2',
    texto: 'María García, escapada en Barcelona'
  },
  // Agrega más datos aquí
];

const actividadesData: Actividad[] = [
  {
    titulo: 'Fiesta de Verano',
    descripcion: 'Una celebración inolvidable bajo el sol',
    fotos: [
      { url: '/images/actividad1_1.jpg', texto: 'Baile al atardecer' },
      { url: '/images/actividad1_2.jpg', texto: 'Comida típica' },
      { url: '/images/actividad1_3.jpg', texto: 'Juegos para todos' }
    ]
  },
  {
    titulo: 'Noche Cultural',
    descripcion: 'Descubre la riqueza de nuestras tradiciones',
    fotos: [
      { url: '/images/actividad2_1.jpg', texto: 'Música tradicional' },
      { url: '/images/actividad2_2.jpg', texto: 'Danzas folclóricas' },
      { url: '/images/actividad2_3.jpg', texto: 'Artesanías locales' }
    ]
  },
  // Agrega más actividades aquí
];

export default function EscapadosPage() {
  return (
    <div className="min-h-screen bg-[#F4ECE1] py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Los Escapados
        </h1>

        {/* Primera sección: Fotos con comentarios y botones a Facebook */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-8 text-center text-gray-700">
            Nuestros Escapados
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {escapadosData.map((escapado, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={escapado.urlfoto}
                  alt={escapado.texto}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <p className="text-gray-700 mb-4">{escapado.texto}</p>
                  <a
                    href={escapado.urlfacebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                  >
                    Ver en Facebook
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Segunda sección: Actividades con carruseles */}
        <section>
          <h2 className="text-2xl font-semibold mb-8 text-center text-gray-700">
            Nuestras Actividades
          </h2>
          <div className="space-y-12">
            {actividadesData.map((actividad, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  {actividad.titulo}
                </h3>
                <p className="text-gray-600 mb-6">{actividad.descripcion}</p>
                <ActivityCarousel fotos={actividad.fotos} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}