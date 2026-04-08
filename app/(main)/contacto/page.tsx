'use client';

// === ICONOS SVG PERSONALIZADOS ===
const IconMapa = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 inline-block mb-1 text-[#4E342E]">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
  </svg>
);

const IconPin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#3d2b1f]">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);

const IconTelefono = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#3d2b1f]">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.27-2.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const IconReloj = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-[#3d2b1f]">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);

const IconGoogleMaps = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-2">
    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" /><line x1="9" y1="3" x2="9" y2="18" /><line x1="15" y1="6" x2="15" y2="21" />
  </svg>
);

export default function ContactoPage() {
  const lat = "20.8741297";
  const lng = "-76.3153237";
  const direccionCompleta = "Paladar Don Santiago El Escapao, Holguín, Cuba";
  const linkMapas = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  const embedMapa = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3658.0741297!2d-76.3153237!3d20.8741297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x21f703b89d144908!2sPaladar%20Don%20Santiago%20%22El%20Escapao%22!5e0!3m2!1ses!2s!4v1743712345678!5m2!1ses!2s`;

  return (
    <div className="min-h-screen bg-[#F4ECE1] bg-[url('/images/papel.png')] bg-repeat py-12 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Cabecera */}
        <div className="flex items-center justify-center gap-6 mb-12">
          <div className="hidden sm:block h-[2px] flex-1 bg-gradient-to-l from-[#4E342E]/60 to-transparent"></div>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[#4E342E] uppercase tracking-widest px-4 flex items-center justify-center gap-4 text-red-900">
              <IconMapa />
              Contacto
              <IconMapa />
            </h1>
            <p className="text-[#4E342E]/70 italic mt-2 font-medium">Estamos en el corazón de Holguín</p>
          </div>
          <div className="hidden sm:block h-[2px] flex-1 bg-gradient-to-r from-[#4E342E]/60 to-transparent"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Card de Información (Altura ajustada: 420px) */}
          <div 
            className="relative rounded-[26px] p-8 shadow-xl flex flex-col justify-between h-[420px]"
            style={{
              backgroundColor: '#FFFFFF',
              backgroundImage: "url('/images/tela.jpg')",
              backgroundRepeat: 'repeat',
              backgroundSize: 'auto',
              border: '2px solid #D1C4B9',
              outline: '4px solid rgba(78, 52, 46, 0.05)',
              outlineOffset: '-1px'
            }}
          >
            <div>
              <h2 className="text-2xl font-bold text-[#3d2b1f] mb-6 border-b border-[#3d2b1f]/10 pb-3 uppercase tracking-widest">
                Información
              </h2>

              <div className="space-y-6">
                {/* Dirección */}
                <div className="flex gap-4 items-center">
                  <div className="flex-shrink-0 bg-[#F4ECE1] p-2.5 rounded-full shadow-sm border border-[#D1C4B9]/30">
                    <IconPin />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-bold text-[#3d2b1f] text-base uppercase tracking-wider leading-tight">Dirección</h3>
                    <p className="text-[#4E342E]/80 italic text-sm leading-tight">{direccionCompleta}</p>
                  </div>
                </div>

                {/* Teléfono */}
                <div className="flex gap-4 items-center">
                  <div className="flex-shrink-0 bg-[#F4ECE1] p-2.5 rounded-full shadow-sm border border-[#D1C4B9]/30">
                    <IconTelefono />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-bold text-[#3d2b1f] text-base uppercase tracking-wider leading-tight">Teléfono</h3>
                    <p className="text-[#4E342E]/80 italic text-sm leading-tight">+53 51591471</p>
                  </div>
                </div>

                {/* Horario */}
                <div className="flex gap-4 items-center">
                  <div className="flex-shrink-0 bg-[#F4ECE1] p-2.5 rounded-full shadow-sm border border-[#D1C4B9]/30">
                    <IconReloj />
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-bold text-[#3d2b1f] text-base uppercase tracking-wider leading-tight">Horario</h3>
                    <p className="text-[#4E342E]/80 italic text-sm leading-tight">10:00 AM – 12:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <a
                href={linkMapas}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full bg-[#3d2b1f] text-[#f2e2ce] font-bold py-3.5 rounded-xl hover:bg-[#4E342E] transition-all uppercase tracking-tighter shadow-md active:scale-95"
              >
                <IconGoogleMaps />
                Abrir en Google Maps
              </a>
            </div>
          </div>

          {/* Mapa (Altura ajustada: 420px) */}
          <div className="rounded-[26px] overflow-hidden border-4 border-[#4E342E]/10 shadow-xl bg-white h-[420px]">
            <iframe
              src={embedMapa}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa de El Escapao"
              className="grayscale-[10%] contrast-[1.05]"
            ></iframe>
          </div>
        </div>

        <div className="mt-12 text-center">
           <p className="text-[#4E342E]/40 italic text-base tracking-[0.2em] uppercase">
              Las Cosas Son Cuando SON!!
           </p>
        </div>
      </div>
    </div>
  );
}