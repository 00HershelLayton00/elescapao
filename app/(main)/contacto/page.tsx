// app/(main)/contacto/page.tsx
'use client';

export default function ContactoPage() {
  // Las coordenadas exactas del lugar
  const lat = "20.8741297";
  const lng = "-76.3153237";
  // Dirección formateada para el enlace
  const direccion = "Paladar Don Santiago El Escapao";
  const direccionCompleta = `${direccion}, Holguín, Cuba`;

  // 1. Enlace directo para Google Maps (funciona sin internet)
  const linkMapas = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

  // 2. Código de inserción (embed) del mapa interactivo
  //    (requiere internet para cargar el mapa)
  const embedMapa = `https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7570.25625684416!2d${lng}!3d${lat}!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x21f703b89d144908!2sPaladar%20Don%20Santiago%20%22El%20Escapao%22!5e0!3m2!1ses!2s!4v1743712345678!5m2!1ses!2s`;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold text-center mb-8">📍 Contacto y Dirección</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Columna de información de contacto */}
        <div className="bg-gray-50 rounded-lg p-6 space-y-4 shadow-md">
          <h2 className="text-2xl font-bold mb-4 border-b pb-2">Información</h2>

          <div>
            <h3 className="font-bold text-lg flex items-center gap-2">📍 Dirección</h3>
            <p className="text-gray-600 ml-6">{direccionCompleta}</p>
          </div>

          <div>
            <h3 className="font-bold text-lg flex items-center gap-2">📞 Teléfono</h3>
            <p className="text-gray-600 ml-6">+53 51591471</p>
          </div>

          <div>
            <h3 className="font-bold text-lg flex items-center gap-2">⏰ Horario</h3>
            <p className="text-gray-600 ml-6">Abiertos todos los días : 10:00–24:00</p>
          </div>
        </div>

        {/* Columna del mapa */}
        <div className="bg-white rounded-lg overflow-hidden shadow-xl border">
          {/* Mapa interactivo (requiere internet) */}
          <div className="relative w-full h-80 md:h-96">
            <iframe
              src={embedMapa}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa de Paladar Don Santiago El Escapao"
            ></iframe>
          </div>

          {/* Botón de enlace directo (funciona mejor en celulares) */}
          <div className="p-3 bg-gray-100 text-center">
            <a
              href={linkMapas}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
            >
              <span>🗺️</span> Abrir en Google Maps
            </a>
            <p className="text-xs text-gray-500 mt-2">
              El mapa interactivo puede tardar en cargar con conexión lenta. Usa el botón para abrir la app de mapas.
            </p>
          </div>
        </div>
      </div>

      {/* Sección de redes sociales o mensaje adicional */}
      <div className="mt-12 text-center text-gray-500 text-sm">
        <p>✨ Visítanos y disfruta de la mejor comida ✨</p>
      </div>
    </div>
  );
}