"use client";
import { useState } from "react";

// Definimos la interfaz para las props
interface WelcomeScreenProps {
  onFinished: () => void;
}

export default function WelcomeScreen({ onFinished }: WelcomeScreenProps) {
  const [isFading, setIsFading] = useState(false);

  const handleEnter = () => {
    // 1. Guardamos en el storage
    localStorage.setItem("hasVisitedEscapao", "true");
    
    // 2. Iniciamos la animación
    setIsFading(true);

    // 3. Avisamos al padre tras la animación
    setTimeout(() => {
      onFinished();
    }, 500); 
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-6 text-center transition-opacity duration-500 ease-in-out ${
        isFading ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* IMAGEN DE FONDO */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ 
          backgroundImage: "url('/images/cubaconectada.webp')", 
        }}
      />
      
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* CONTENIDO */}
      <div className="relative z-20 max-w-4xl flex flex-col items-center">
        <h2 className="text-5xl md:text-7xl font-serif italic text-[#FFF8DC] mb-12 drop-shadow-lg">
          "Somos cercanía"
        </h2>

        <p className="text-xl md:text-3xl font-light text-[#FFF8DC]/90 leading-relaxed max-w-2xl mb-16 drop-shadow-md">
          "Conectados con cualquier parte del mundo, te damos la bienvenida desde donde te encuentres"
        </p>
        
        <button
          onClick={handleEnter}
          className="group relative inline-flex items-center gap-3 px-16 py-5 bg-[#FFF8DC] text-[#3D2B1F] rounded-full transition-all duration-300 hover:bg-[#D4A373] hover:scale-105 shadow-2xl"
        >
          <span className="text-xl font-bold tracking-widest uppercase">
            Entrar a El Escapao
          </span>
          <div className="absolute inset-0 rounded-full border-2 border-[#3D2B1F]/30 scale-110 group-hover:scale-100 transition-transform duration-500"></div>
        </button>
      </div>
    </div>
  );
}