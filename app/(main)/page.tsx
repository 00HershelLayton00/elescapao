export default function Home() {
  const actividades = [
    { titulo: "🍕 Noche de Pizza", fecha: "20 Enero", desc: "50% off en todas las pizzas" },
    { titulo: "🍷 Cata de Vinos", fecha: "25 Enero", desc: "Degustación exclusiva" },
    { titulo: "🎉 Happy Hour", fecha: "21 Enero", desc: "2x1 en bebidas" }
  ]

  return (
    <main>
      {/* Hero Section: Textura de papel y plumas gigantes sutiles */}
      <div className="relative py-28 overflow-hidden bg-[#F4ECE1] bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] border-b border-[#D4B996]/30">
        
        {/* Plumas decorativas integradas (Look de la foto) */}
        <div className="absolute top-0 left-1/4 opacity-[0.04] text-[20rem] rotate-45 select-none">🪶</div>
        <div className="absolute bottom-0 right-1/4 opacity-[0.04] text-[20rem] -rotate-12 select-none">🪶</div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-7xl md:text-8xl font-black mb-6 drop-shadow-sm italic text-[#3D2B1F] tracking-tight">
            Bienvenido al escapao
          </h1>
          <p className="text-3xl md:text-4xl mb-12 font-light italic text-[#5D4037] opacity-90">
            "Donde las cosas son cuando SON!!"
          </p>
        </div>
      </div>

      {/* Galería: Marcos de madera gruesos */}
      <div className="container mx-auto px-4 py-20">
        <h2 className="text-5xl font-black text-center mb-16 uppercase tracking-tighter text-[#3D2B1F]">
          📸 Nuestro Espacio
        </h2>
        
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

      {/* Actividades: Estilo Pergamino Rugoso */}
      <div className="bg-[#EBDCCB] bg-[url('https://www.transparenttextures.com/patterns/rough-paper.png')] py-24 border-y-2 border-[#D4B996]">
        <div className="container mx-auto px-4">
          <h2 className="text-6xl font-black text-center mb-20 italic text-[#2C1E16]">
            📅 Próximas Actividades
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {actividades.map((act, i) => (
              <div key={i} 
                className="bg-[#F9F3EB] p-12 shadow-[12px_12px_0px_0px_rgba(26,18,11,1)] 
                           border border-[#D4B996] relative transform transition hover:translate-x-1 hover:translate-y-1">
                <div className="absolute -top-5 -left-5 text-5xl rotate-[-15deg]">📌</div>
                <h3 className="text-3xl font-black mb-4 border-b-4 border-[#3D2B1F]/10 pb-2 text-[#2C1E16]">
                  {act.titulo}
                </h3>
                <p className="text-[#A0522D] font-black text-2xl mb-4">{act.fecha}</p>
                <p className="text-[#5D4037] text-xl leading-relaxed italic font-medium">{act.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}