'use client';

export default function NosotrosPage() {
  return (
    <div className="min-h-screen bg-[#F4ECE1]">
      {/* Hero Section con imagen de fondo sutil */}
      <div 
        className="relative h-[40vh] md:h-[50vh] bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url("https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974")'
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

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        
        {/* Historia Principal */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12 transform hover:scale-[1.01] transition-all">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">🍽️</span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#3D2B1F]">
              Don Santiago "El Escapado"
            </h2>
          </div>
          
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
            <p className="text-lg first-letter:text-5xl first-letter:font-bold first-letter:text-[#D4A373] first-letter:mr-2 first-letter:float-left">
              Nació en el corazón del nieto de Don Santiago, este elegante Señor, la más fiel muestra del campesino cubano, 
              vivió en Manzanillo y allí todos los recuerdan como el patriarca de una familia humilde, pero trabajadora.
            </p>
            
            <p className="text-lg">
              En la actualidad Holguín es el Hogar de esta familia y <span className="font-semibold text-[#8B5A2B]">Julio</span>, 
              el heredero del alias <span className="italic font-semibold">"Escapao"</span> nos brinda la posibilidad de llegar 
              a este lugar de la geografía oriental y disfrutar de la Cuba que añoramos.
            </p>
            
            <p className="text-lg">
              La del <span className="font-semibold">lechón asado</span>, la <span className="font-semibold">yuca con mojo</span>, 
              el <span className="font-semibold">tamal oriental</span>, el <span className="font-semibold">coctel tradicional</span> 
              y hasta su exposición de <span className="font-semibold">autos clásicos americanos</span> que tanto le apasionan y que 
              sin duda alguna, estos autos son sello de identidad en las calles y avenidas de cualquier ciudad de esta isla.
            </p>
          </div>
        </div>

        {/* Tarjetas de valores */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-gradient-to-br from-[#3D2B1F] to-[#2A1A0E] rounded-2xl p-8 text-center transform hover:scale-105 transition-all shadow-lg">
            <div className="text-5xl mb-4">⭐</div>
            <h3 className="text-2xl font-bold text-[#FFF8DC] mb-2">Nuestra palabra favorita</h3>
            <p className="text-3xl font-black text-[#D4A373] italic">Familia</p>
          </div>
          
          <div className="bg-gradient-to-br from-[#8B5A2B] to-[#5C3A1A] rounded-2xl p-8 text-center transform hover:scale-105 transition-all shadow-lg">
            <div className="text-5xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold text-[#FFF8DC] mb-2">Nuestro mayor empeño</h3>
            <p className="text-2xl font-black text-[#F4ECE1]">Calidad en el servicio</p>
          </div>
          
          <div className="bg-gradient-to-br from-[#D4A373] to-[#B8834A] rounded-2xl p-8 text-center transform hover:scale-105 transition-all shadow-lg">
            <div className="text-5xl mb-4">💫</div>
            <h3 className="text-2xl font-bold text-[#3D2B1F] mb-2">Nuestro consejo</h3>
            <p className="text-3xl font-black text-[#3D2B1F] italic">Escápate</p>
          </div>
          
          <div className="bg-gradient-to-br from-[#2A5F5F] to-[#1A3F3F] rounded-2xl p-8 text-center transform hover:scale-105 transition-all shadow-lg">
            <div className="text-5xl mb-4">📜</div>
            <h3 className="text-2xl font-bold text-[#FFF8DC] mb-2">Nuestro Slogan</h3>
            <p className="text-2xl font-black text-[#D4A373] italic">Las cosas son, cuando son</p>
          </div>
        </div>

        {/* Cita destacada */}
        <div className="relative bg-[#3D2B1F]/10 rounded-2xl p-8 md:p-12 mb-12 overflow-hidden">
          <div className="absolute text-8xl opacity-10 -top-4 left-4">“</div>
          <div className="absolute text-8xl opacity-10 -bottom-8 right-4">”</div>
          <p className="text-2xl md:text-3xl font-light italic text-center text-[#3D2B1F] relative z-10">
            "Un pedazo de Cuba donde el tiempo se detiene y los sabores hablan por sí mismos"
          </p>
        </div>

        {/* Autos clásicos - Sección especial */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">🚗</span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#3D2B1F]">
              La Pasión por los Clásicos
            </h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg">
            Los autos clásicos americanos no son solo una exhibición, son parte de nuestra esencia. 
            Representan la historia, la resistencia y el estilo único de Cuba. En <span className="font-semibold">El Escapao</span>, 
            cada rincón cuenta una historia, y estos gigantes de acero son testigos de una tradición que se niega a desaparecer.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {['🚘', '🚙', '🏎️', '🚗'].map((emoji, i) => (
              <div key={i} className="text-center p-4 bg-[#F4ECE1] rounded-xl">
                <div className="text-5xl mb-2">{emoji}</div>
                <p className="text-sm text-gray-600">Clásico {i + 1}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Invitación final */}
        <div className="text-center mt-12">
          <div className="inline-block bg-[#D4A373] text-[#3D2B1F] px-8 py-4 rounded-full font-bold text-xl shadow-lg">
            🍺 ¡Te esperamos para que te Escapés! 🍽️
          </div>
        </div>
      </div>
    </div>
  );
}