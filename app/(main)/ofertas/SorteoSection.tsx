'use client';

import React, { useState, useRef } from 'react';

const precio = 15, numero_zelle = "+1 (786) 468-3518";

// Iconos específicos del sorteo
const IconRuleta = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2 L12 12 L22 12" />
    <path d="M12 2 L12 12 L2 12" />
    <path d="M12 22 L12 12 L22 12" />
    <path d="M12 22 L12 12 L2 12" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

interface Participante {
  nombre: string;
  tickets: number;
  fecha: string;
}

interface SorteoSectionProps {
  participantesIniciales?: Participante[];
}

export default function SorteoSection({ participantesIniciales = [] }: SorteoSectionProps) {
  // Datos estáticos - TÚ ACTUALIZAS ESTO MANUALMENTE
  const [participantes, setParticipantes] = useState<Participante[]>([
    //falsos
    { nombre: "Maria Gonzalez", tickets: 1, fecha: "2026-04-22" },
    { nombre: "Carlos Perez", tickets: 3, fecha: "2026-04-25" },
    { nombre: "Ana Rodriguez", tickets: 2, fecha: "2026-04-26" },
    { nombre: "Maria Gonzalez", tickets: 2, fecha: "2026-04-26" },
    //reales
    ...participantesIniciales
  ]);

  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    tickets: 1
  });
  const [enviando, setEnviando] = useState(false);
  const [mensajeEnviado, setMensajeEnviado] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const swipeContainerRef = useRef<HTMLDivElement>(null);

  const totalTickets = participantes.reduce((sum, p) => sum + p.tickets, 0);

  // Verificar si el toque fue en un input o elemento interactivo
  const isInteractiveElement = (target: EventTarget | null): boolean => {
    if (!target) return true;
    const element = target as HTMLElement;
    const interactiveTags = ['INPUT', 'TEXTAREA', 'BUTTON', 'SELECT'];
    const isInteractive = interactiveTags.includes(element.tagName);
    const hasInteractiveParent = !!element.closest('input, textarea, button, select, a');
    return isInteractive || hasInteractiveParent;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isInteractiveElement(e.target)) return;
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart === 0) return;
    if (isInteractiveElement(e.target)) return;
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart === 0 || touchEnd === 0) {
      setTouchStart(0);
      setTouchEnd(0);
      return;
    }

    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && activeTab === 0) {
        setActiveTab(1);
      } else if (diff < 0 && activeTab === 1) {
        setActiveTab(0);
      }
    }
    setTouchStart(0);
    setTouchEnd(0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);

    try {
      const telefono = "+5351591471";
      const total = formData.tickets * precio;

      const mensaje = `🎰 SORTEO ESCAPAO 🎰

Nombre: ${formData.nombre}
Correo: ${formData.correo}
Telefono: ${formData.telefono}
Tickets: ${formData.tickets} ($${total} USD)

Ya realice la transferencia por Zelle.
Quedo atento a la confirmacion.`;

      const urlWhatsApp = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
      window.open(urlWhatsApp, '_blank');

      setMensajeEnviado(true);
      setTimeout(() => setMensajeEnviado(false), 5000);

      setFormData({ nombre: '', correo: '', telefono: '', tickets: 1 });
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="relative group overflow-hidden rounded-[26px] flex flex-col p-4 md:p-8 transition-all duration-300"
      style={{
        backgroundColor: '#3d2b1f',
        backgroundImage: "url('/images/purty_wood.jpeg')",
        border: '2px solid #2a1b12',
        outline: '4px solid rgba(139, 109, 77, 0.6)',
        outlineOffset: '-1px',
        boxShadow: '0 0 30px rgba(0, 0, 0, 0.5)'
      }}>

      <div className="relative z-10">
        {/* Cabecera del sorteo */}
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <IconRuleta />
            <h2 className="text-2xl md:text-3xl font-bold text-[#f2e2ce]">Gran Sorteo Día de las Madres</h2>
          </div>
          <div className="flex items-center gap-3">
            <IconRuleta />
            <div>
              <h4 className="text-2xl md:text-1xl text-[#f2e2ce]">Compra tu ticket ya y celebra a tu mamá a lo grande, porque siempre es mejor MÁS CERCA DE TI. Participa comprando un ticket por solo {precio} USD desde cualquier parte del mundo.</h4>
              <h4 className="text-2xl md:text-1xl text-[#f2e2ce]">Métodos de pago: Zelle a {numero_zelle}</h4>
              <h4 className="text-2xl md:text-1xl text-[#f2e2ce]">Contactar soporte a +5351591471</h4>
            </div>
          </div>
          <div className="bg-black/30 p-3 rounded-xl items-center flex items-center gap-3">
            <p className="text-[#f2e2ce] text-xs uppercase tracking-wide">Tickets Confirmados Hasta Ahora</p>
            <p className="text-2xl md:text-3xl font-bold text-[#86efac] text-center">{totalTickets}</p>
          </div>
        </div>

        <p className="text-[#c5a88a] mb-6 text-center md:text-left">
          Cada ticket cuesta <span className="text-[#86efac] font-bold">${precio} USD</span>
        </p>

        {/* Pestañas (Tabs) */}
        <div className="flex mb-6 border-b border-[#4a3628]">
          <button
            onClick={() => setActiveTab(0)}
            className={`flex-1 py-3 text-center font-bold transition-all duration-300 ${activeTab === 0
                ? 'text-[#86efac] border-b-2 border-[#86efac]'
                : 'text-[#c5a88a] hover:text-[#f2e2ce]'
              }`}
          >
            📝 Adquirir tickets
          </button>
          <button
            onClick={() => setActiveTab(1)}
            className={`flex-1 py-3 text-center font-bold transition-all duration-300 ${activeTab === 1
                ? 'text-[#86efac] border-b-2 border-[#86efac]'
                : 'text-[#c5a88a] hover:text-[#f2e2ce]'
              }`}
          >
            👥 Participantes ({participantes.length})
          </button>
        </div>

        {/* Contenedor con swipe */}
        <div
          ref={swipeContainerRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="overflow-hidden"
        >
          <div
            className="flex transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${activeTab * 100}%)` }}
          >
            {/* Panel 1: Formulario */}
            <div className="w-full flex-shrink-0 px-1">
              <div className="bg-black/30 p-5 md:p-6 rounded-xl">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[#c5a88a] mb-2 font-medium text-sm">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg bg-[#F4ECE1] text-[#4E342E] border-2 border-[#2a1b12] focus:outline-none focus:border-[#86efac]"
                      placeholder="Ej: Juan Perez"
                      disabled={enviando}
                    />
                  </div>

                  <div>
                    <label className="block text-[#c5a88a] mb-2 font-medium text-sm">
                      Correo electrónico *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.correo}
                      onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg bg-[#F4ECE1] text-[#4E342E] border-2 border-[#2a1b12] focus:outline-none focus:border-[#86efac]"
                      placeholder="ejemplo@correo.com"
                      disabled={enviando}
                    />
                  </div>

                  <div>
                    <label className="block text-[#c5a88a] mb-2 font-medium text-sm">
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.telefono}
                      onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg bg-[#F4ECE1] text-[#4E342E] border-2 border-[#2a1b12] focus:outline-none focus:border-[#86efac]"
                      placeholder="+53 5XXXXXXX"
                      disabled={enviando}
                    />
                  </div>

                  <div>
                    <label className="block text-[#c5a88a] mb-2 font-medium text-sm">
                      Cantidad de tickets *
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      max="100"
                      value={formData.tickets}
                      onChange={(e) => setFormData({ ...formData, tickets: parseInt(e.target.value) || 1 })}
                      className="w-full px-4 py-2 rounded-lg bg-[#F4ECE1] text-[#4E342E] border-2 border-[#2a1b12] focus:outline-none focus:border-[#86efac]"
                      disabled={enviando}
                    />
                    <p className="text-[#c5a88a] text-sm mt-1">
                      Total: <span className="text-[#86efac] font-bold">${formData.tickets * precio} USD</span>
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={enviando}
                    className="w-full bg-[#86efac] hover:bg-[#6ee7b0] text-[#2a1b12] font-bold py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {enviando ? 'Preparando...' : '📲 Continuar por WhatsApp'}
                  </button>

                  {mensajeEnviado && (
                    <div className="p-3 bg-green-900/50 border border-green-500 rounded-lg">
                      <p className="text-green-200 text-center text-sm">
                        ✓ Mensaje preparado. Transfiere por Zelle y espera confirmación.
                      </p>
                    </div>
                  )}
                </form>

                <div className="mt-6 p-3 bg-[#2a1b12]/50 rounded-lg">
                  <p className="text-[#c5a88a] text-xs">
                    <span className="font-bold text-[#f2e2ce]2">📌 Importante:</span> Después de transferir, debes recibir confirmación en menos de 24 horas.
                  </p>
                </div>
              </div>
            </div>

            {/* Panel 2: Tabla de participantes */}
            <div className="w-full flex-shrink-0 px-1">
              <div className="bg-black/30 p-5 md:p-6 rounded-xl">
                {participantes.length === 0 ? (
                  <div className="text-center py-8 text-[#c5a88a]">
                    <p>✨ Sé el primero en participar ✨</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto max-h-96 overflow-y-auto">
                    <table className="w-full text-left">
                      <thead className="sticky top-0 bg-[#2a1b12]">
                        <tr>
                          <th className="px-3 py-2 text-[#f2e2ce] text-sm">Participante</th>
                          <th className="px-3 py-2 text-[#f2e2ce] text-center text-sm">Tickets</th>
                          <th className="px-3 py-2 text-[#f2e2ce] text-right text-sm">Fecha</th>
                        </tr>
                      </thead>
                      <tbody>
                        {participantes.map((p, idx) => (
                          <tr key={idx} className="border-t border-[#4a3628]">
                            <td className="px-3 py-3 text-[#f2e2ce] text-sm">{p.nombre}</td>
                            <td className="px-3 py-3 text-[#86efac] text-center font-bold">{p.tickets}</td>
                            <td className="px-3 py-3 text-[#c5a88a] text-right text-xs">
                              {new Date(p.fecha).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                <div className="mt-4 pt-4 border-t border-[#4a3628]">
                  <p className="text-[#c5a88a] text-sm text-center">
                    Total tickets: <span className="font-bold text-[#86efac]">{totalTickets}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Indicadores */}
        <div className="flex justify-center gap-2 mt-4">
          <button
            onClick={() => setActiveTab(0)}
            className={`w-2 h-2 rounded-full transition-all ${activeTab === 0 ? 'w-6 bg-[#86efac]' : 'bg-[#4a3628]'
              }`}
          />
          <button
            onClick={() => setActiveTab(1)}
            className={`w-2 h-2 rounded-full transition-all ${activeTab === 1 ? 'w-6 bg-[#86efac]' : 'bg-[#4a3628]'
              }`}
          />
        </div>
        <p className="text-center text-[#4a3628] text-xs mt-2">
          Toca los puntos o desliza ← → para cambiar
        </p>

        {/* Premio*/}
        <div className="bg-gradient-to-r from-gray-400/20 to-gray-600/20 p-3 rounded-lg text-center">
          <p className="text-[#f2e2ce] text-xs md:text-sm font-bold">Premio Grande</p>
          <p className="text-[#86efac] text-sm md:text-base text-4xl">Lechón asado entero, arroz vianda y ensalada</p>
        </div>
      </div>

      <div className="absolute inset-x-0 top-0 h-[2px] bg-white/10 rounded-t-[26px] pointer-events-none"></div>
    </div>
  );
}