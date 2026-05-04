// app/dk365m0st/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function OfertaDonSantiago() {
  const [showContent, setShowContent] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const router = useRouter();

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
    localStorage.setItem("hasVisitedEscapao", "true");
  };

  if (!showContent && !isNewUser) return <div className="bg-[#F4ECE1] min-h-screen" />;

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
          {/* Vehículos Decorativos (Fondo) */}
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

          {/* Contenido Principal */}
          <div className="container mx-auto px-4 flex flex-col items-center text-center relative z-10">
            {/* Contenedor del Título con Esquinas de Rosas */}
            <div className="relative inline-flex flex-col items-center justify-center px-8 py-10 md:px-20 md:py-14 mt-12 rounded-tl-3xl rounded-tr-3xl">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100%] h-[100%] bg-[#EAD9BD] bg-opacity-40 rounded-full -z-10"></div>
              
              {/* Rosas decorativas (usando emojis porque no tengo tus imágenes) */}
              <div className="absolute top-0 left-0 text-6xl md:text-8xl opacity-60 rotate-12">🌹</div>
              <div className="absolute bottom-0 right-0 text-6xl md:text-8xl opacity-60 -rotate-12">🌹</div>

              <h1 className="text-6xl md:text-8xl font-bold text-[#3D2B1F] tracking-tight drop-shadow-sm">
                Oferta!! 
              </h1>

              <p className="text-xl md:text-2xl mt-6 max-w-3xl text-[#3D2B1F] font-medium">
                Gánate una cena gratis.
              </p>
              
              <div className="mt-8 rounded-xl bg-white bg-opacity-60 p-6 shadow-inner">
                <p className="text-lg md:text-xl text-[#3D2B1F]">
                  📱 Para participar escanea el código QR del payaso, lee su mensaje y haz lo que dice.
                  <br />
                  ¡Será super fácil, verás que sí 😌!
                </p>
              </div>
            </div>

            {/* Botón principal */}
            <button
              onClick={() => router.push('/')}
              className="mt-8 rounded-full bg-yellow-500 px-10 py-4 text-2xl font-bold text-white shadow-lg transition-all hover:bg-red-800 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-300 active:scale-95"
            >
              Ver más
            </button>

            {/* Elementos flotantes decorativos (globos, regalos, comida) */}
            <FloatingDecorations />
          </div>
        </div>
      </main>
    </>
  );
}

// Componente de WelcomeScreen (simplificado - ajústalo según tu original)
function WelcomeScreen({ onFinished }: { onFinished: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onFinished, 3000);
    return () => clearTimeout(timer);
  }, [onFinished]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#F4ECE1]">
      <div className="text-center">
        <h2 className="text-4xl md:text-6xl font-bold text-[#3D2B1F] animate-pulse">
          ¡Bienvenido! 🎈
        </h2>
        <p className="mt-4 text-xl text-[#3D2B1F]">Preparando todo para ti...</p>
      </div>
    </div>
  );
}

// Componente de elementos flotantes
function FloatingDecorations() {
  const items = [
    { emoji: "🎈", left: "5%", top: "10%", delay: "0s", size: "3rem" },
    { emoji: "🎈", left: "90%", top: "20%", delay: "1s", size: "3.5rem" },
    { emoji: "🎁", left: "10%", top: "70%", delay: "0.5s", size: "2.8rem" },
    { emoji: "🎁", left: "85%", top: "75%", delay: "1.5s", size: "3rem" },
    { emoji: "🍔", left: "3%", top: "40%", delay: "0.8s", size: "3.2rem" },
    { emoji: "🍕", left: "92%", top: "50%", delay: "1.2s", size: "3rem" },
    { emoji: "🎊", left: "15%", top: "85%", delay: "0.3s", size: "2.5rem" },
    { emoji: "🎉", left: "80%", top: "15%", delay: "1.8s", size: "3rem" },
    { emoji: "🍦", left: "95%", top: "85%", delay: "0.7s", size: "2.5rem" },
    { emoji: "🌹", left: "2%", top: "55%", delay: "2s", size: "2.2rem", opacity: "0.5" },
    { emoji: "🌹", right: "2%", top: "60%", delay: "2.3s", size: "2.2rem", opacity: "0.5" },
  ];

  return (
    <>
      <style jsx>{`
        @keyframes flotar {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes flotar2 {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(15px) rotate(-8deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        .flotar { animation: flotar 6s ease-in-out infinite; }
        .flotar2 { animation: flotar2 7s ease-in-out infinite; }
      `}</style>
      
      {items.map((item, idx) => (
        <div
          key={idx}
          className={`absolute z-0 pointer-events-none ${idx % 2 === 0 ? 'flotar' : 'flotar2'}`}
          style={{
            left: item.left,
            right: item.right,
            top: item.top,
            fontSize: item.size,
            animationDelay: item.delay,
            opacity: item.opacity || 0.7,
          }}
        >
          {item.emoji}
        </div>
      ))}
    </>
  );
}