'use client';

import { useState, useEffect, useCallback } from 'react';

interface Item {
  id: number;
  x: number;
  y: number;
  tipo: 'cerveza' | 'plato';
}

export default function CerveceroEscapa() {
  const [items, setItems] = useState<Item[]>([]);
  const [puntos, setPuntos] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [jugando, setJugando] = useState(false);
  const [recordLocal, setRecordLocal] = useState(0);
  const [nombreJugador, setNombreJugador] = useState('');
  const [mostrarInput, setMostrarInput] = useState(false);

  // Cargar récord
  useEffect(() => {
    const saved = localStorage.getItem('recordCervecero');
    if (saved) setRecordLocal(parseInt(saved));
  }, []);

  // Generar nuevo item
  const generarItem = useCallback(() => {
    if (!jugando || gameOver) return;
    
    const nuevoItem: Item = {
      id: Date.now() + Math.random(),
      x: Math.random() * 80 + 10, // 10% a 90% del ancho
      y: -20, // Empieza arriba
      tipo: Math.random() > 0.7 ? 'cerveza' : 'plato' // 30% cerveza, 70% plato
    };
    
    setItems(prev => [...prev, nuevoItem]);
  }, [jugando, gameOver]);

  // Mover items (caída)
  useEffect(() => {
    if (!jugando || gameOver) return;
    
    const intervalo = setInterval(() => {
      setItems(prev => 
        prev
          .map(item => ({ ...item, y: item.y + 5 }))
          .filter(item => {
            if (item.y > 100) {
              // Si toca el fondo, game over
              setGameOver(true);
              setJugando(false);
              
              // Guardar récord local
              if (puntos > recordLocal) {
                setRecordLocal(puntos);
                localStorage.setItem('recordCervecero', puntos.toString());
                setMostrarInput(true);
              }
              return false;
            }
            return true;
          })
      );
    }, 100);
    
    return () => clearInterval(intervalo);
  }, [jugando, gameOver, puntos, recordLocal]);

  // Generar items periódicamente
  useEffect(() => {
    if (!jugando || gameOver) return;
    
    const generador = setInterval(() => {
      generarItem();
    }, 800);
    
    return () => clearInterval(generador);
  }, [jugando, gameOver, generarItem]);

  // Hacer clic en un item
  const atraparItem = (item: Item) => {
    if (!jugando || gameOver) return;
    
    const puntosGanados = item.tipo === 'cerveza' ? 3 : 1;
    const nuevaPuntuacion = puntos + puntosGanados;
    setPuntos(nuevaPuntuacion);
    
    // Remover el item
    setItems(prev => prev.filter(i => i.id !== item.id));
    
    // Efecto de vibración en móvil (opcional)
    if (navigator.vibrate) navigator.vibrate(50);
  };

  // Iniciar juego
  const iniciarJuego = () => {
    setItems([]);
    setPuntos(0);
    setGameOver(false);
    setJugando(true);
    setMostrarInput(false);
    
    // Generar primeros items
    setTimeout(() => {
      generarItem();
      generarItem();
    }, 100);
  };

  // Guardar récord mundial (conectará con Google Sheets después)
  const guardarRecordMundial = () => {
    if (!nombreJugador.trim()) return;
    // TODO: Conexión con Google Sheets
    // fetch('TU_URL_SCRIPT?accion=escribir&nombre=' + encodeURIComponent(nombreJugador) + '&puntuacion=' + puntos)
    alert(`🏆 Récord guardado: ${nombreJugador} con ${puntos} puntos`);
    setMostrarInput(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-center text-yellow-500 mb-2">
          🍺 Cervecero Escapao
        </h1>
        <p className="text-center text-gray-400 mb-4">
          Haz clic en 🍺 (+3pts) y 🍽️ (+1pts) antes de que caigan
        </p>

        <div className="flex justify-between gap-4 mb-4">
          <div className="bg-gray-900 rounded-lg px-6 py-3 flex-1 text-center">
            <span className="text-gray-400 text-sm">PUNTOS</span>
            <span className="text-3xl font-bold text-green-500 ml-2">{puntos}</span>
          </div>
          <div className="bg-gray-900 rounded-lg px-6 py-3 flex-1 text-center">
            <span className="text-gray-400 text-sm">🏆 RÉCORD</span>
            <span className="text-3xl font-bold text-yellow-500 ml-2">{recordLocal}</span>
          </div>
        </div>

        {/* Área de juego */}
        <div 
          className="relative bg-gray-900 rounded-lg border-2 border-gray-700 overflow-hidden"
          style={{ height: '500px', cursor: jugando && !gameOver ? 'pointer' : 'default' }}
        >
          {items.map(item => (
            <button
              key={item.id}
              onClick={() => atraparItem(item)}
              className="absolute text-4xl transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-110 active:scale-95"
              style={{ left: `${item.x}%`, top: `${item.y}%` }}
            >
              {item.tipo === 'cerveza' ? '🍺' : '🍽️'}
            </button>
          ))}
          
          {!jugando && !gameOver && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70">
              <button
                onClick={iniciarJuego}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg text-xl transition"
              >
                ▶ COMENZAR
              </button>
              <p className="text-gray-300 mt-4 text-center">
                Haz clic/toca las 🍺 y 🍽️ antes de que caigan
              </p>
            </div>
          )}
          
          {gameOver && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80">
              <div className="bg-red-900/80 rounded-lg p-6 text-center mb-4">
                <p className="text-red-400 text-3xl font-bold mb-2">💀 GAME OVER 💀</p>
                <p className="text-gray-200 text-xl">Puntos: {puntos}</p>
              </div>
              <button
                onClick={iniciarJuego}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg text-xl transition"
              >
                🔄 JUGAR DE NUEVO
              </button>
            </div>
          )}
        </div>

        {mostrarInput && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-xl p-6 max-w-sm w-full mx-4">
              <h3 className="text-2xl font-bold text-yellow-500 mb-2">🏆 ¡NUEVO RÉCORD!</h3>
              <p className="text-gray-300 mb-4">Puntuación: {puntos}</p>
              <input
                type="text"
                placeholder="Tu nombre"
                value={nombreJugador}
                onChange={(e) => setNombreJugador(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded mb-4"
                maxLength={20}
                autoFocus
              />
              <button onClick={guardarRecordMundial} className="w-full bg-green-600 hover:bg-green-700 py-2 rounded font-bold">
                Guardar Récord
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}