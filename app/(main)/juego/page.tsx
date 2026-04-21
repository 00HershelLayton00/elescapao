'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface Obstaculo {
  x: number;
  tipo: 'cactus' | 'piedra' | 'pozo';
  ancho: number;
  alto: number;
  pasado: boolean;
}

interface RecordMundial {
  nombre: string;
  puntuacion: number;
  telefono: string;
}

const URL_SCRIPT = 'https://script.google.com/macros/s/AKfycbwJJ8OEkQAUXrqDHZ7h88wE9smWyAKN4ttMlu_LH2lv5DyMRu_zqazSe6dAP1t6DGD4xw/exec';

// ========== NUEVO: Configuración de horarios ==========
const HORARIOS_PERMITIDOS = [
  { inicio: 15, fin: 17 },  // 15:00 a 17:00
  { inicio: 20, fin: 21 },  // 20:00 a 22:00
  { inicio: 22, fin: 23 },
];

function puedeIniciarPartida(): boolean {
  const ahora = new Date();
  const horaActual = ahora.getHours();
  
  return HORARIOS_PERMITIDOS.some(horario => 
    horaActual >= horario.inicio && horaActual < horario.fin
  );
}

function obtenerTextoHorarios(): string {
  return HORARIOS_PERMITIDOS
    .map(h => `${h.inicio}:00 a ${h.fin}:00`)
    .join(' o ');
}
// ========== FIN NUEVO ==========

export default function RunnerEscapa() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [puntos, setPuntos] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [jugando, setJugando] = useState(false);
  const [recordLocal, setRecordLocal] = useState(0);
  const [recordMundial, setRecordMundial] = useState<RecordMundial>({ nombre: 'Nadie', puntuacion: 0, telefono: '' });
  const [nombreJugador, setNombreJugador] = useState('');
  const [telefonoJugador, setTelefonoJugador] = useState('');
  const [mostrarInput, setMostrarInput] = useState(false);
  
  // ========== NUEVO: Estado para control horario ==========
  const [horarioPermitido, setHorarioPermitido] = useState(true);
  // ========== FIN NUEVO ==========

  // Refs del juego
  const gameRef = useRef({
    jugando: false,
    gameOver: false,
    puntos: 0,
    velocidad: 5,
    ultimoFrame: 0,
    intervaloMovimiento: 30,
  });

  const autoRef = useRef({
    y: 0,
    velocidadY: 0,
    enSuelo: true,
    x: 80,
    ancho: 35,
    alto: 35,
  });

  const obstaculosRef = useRef<Obstaculo[]>([]);
  const animFrameRef = useRef<number | null>(null);
  
  const gravedad = 0.8;
  const fuerzaSalto = -11;
  const sueloY = 220;
  const autoYBase = sueloY - 40;

  // ========== NUEVO: Verificar horario periódicamente ==========
  useEffect(() => {
    const verificarHorario = () => {
      setHorarioPermitido(puedeIniciarPartida());
    };
    
    verificarHorario();
    const intervalo = setInterval(verificarHorario, 60000); // cada minuto
    
    return () => clearInterval(intervalo);
  }, []);
  // ========== FIN NUEVO ==========

  // Cargar récord local y mundial
  useEffect(() => {
    const saved = localStorage.getItem('recordRunnerEscapa');
    if (saved) setRecordLocal(parseInt(saved));
    
    const cargarRecordMundial = async () => {
      try {
        const res = await fetch(`${URL_SCRIPT}?accion=leer`);
        const data = await res.json();
        if (data.success) {
          setRecordMundial({
            nombre: data.nombre,
            puntuacion: data.puntuacion,
            telefono: data.telefono || ''
          });
        }
      } catch (error) {
        console.log('Error al cargar récord mundial:', error);
      }
    };
    cargarRecordMundial();
  }, []);

  // Generar nuevo obstáculo con distancia variable
  const generarObstaculo = useCallback(() => {
    const tipos = ['cactus', 'piedra', 'pozo'] as const;
    const tipo = tipos[Math.floor(Math.random() * tipos.length)];
    
    let ancho = 25, alto = 35;
    if (tipo === 'piedra') { ancho = 30; alto = 20; }
    if (tipo === 'pozo') { ancho = 40; alto = 15; }
    
    const ultimoX = obstaculosRef.current.length > 0 
      ? Math.max(...obstaculosRef.current.map(o => o.x))
      : 800;
    
    const distanciaMinima = Math.max(300, 600 - gameRef.current.puntos / 2);
    const distancia = distanciaMinima + Math.random() * 200;
    
    obstaculosRef.current.push({
      x: ultimoX + distancia,
      tipo,
      ancho,
      alto,
      pasado: false,
    });
  }, []);

  // Dibujar todo
  const dibujar = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#F4ECE1';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Líneas de fondo
    ctx.strokeStyle = '#D4A373';
    ctx.lineWidth = 2;
    for (let i = 0; i < 10; i++) {
      const x = (Date.now() * 0.3 + i * 80) % 800;
      ctx.beginPath();
      ctx.moveTo(x, sueloY - 10);
      ctx.lineTo(x + 40, sueloY - 10);
      ctx.stroke();
    }

    // Suelo
    ctx.fillStyle = '#8B5A2B';
    ctx.fillRect(0, sueloY, canvas.width, 5);
    ctx.fillStyle = '#5C3A1A';
    ctx.fillRect(0, sueloY + 5, canvas.width, 3);

    // Obstáculos
    obstaculosRef.current.forEach(obs => {
      const yBase = sueloY - obs.alto;
      
      if (obs.tipo === 'cactus') {
        ctx.fillStyle = '#2D5A27';
        ctx.fillRect(obs.x, yBase, obs.ancho, obs.alto);
        ctx.fillStyle = '#1A3A15';
        ctx.fillRect(obs.x + 5, yBase - 8, 8, 8);
        ctx.fillRect(obs.x + 12, yBase - 5, 6, 5);
      } else if (obs.tipo === 'piedra') {
        ctx.fillStyle = '#6B6B6B';
        ctx.beginPath();
        ctx.ellipse(obs.x + obs.ancho/2, yBase + obs.alto/2, obs.ancho/2, obs.alto/2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#4A4A4A';
        ctx.beginPath();
        ctx.ellipse(obs.x + obs.ancho/3, yBase + obs.alto/3, 5, 5, 0, 0, Math.PI * 2);
        ctx.fill();
      } else if (obs.tipo === 'pozo') {
        ctx.fillStyle = '#3D2B1F';
        ctx.fillRect(obs.x, yBase, obs.ancho, obs.alto);
        ctx.fillStyle = '#1A120B';
        ctx.fillRect(obs.x + 5, yBase + 3, obs.ancho - 10, obs.alto - 6);
      }
    });

    // Auto antiguo
    ctx.font = '42px "Segoe UI Emoji"';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🚗', autoRef.current.x + autoRef.current.ancho/2, autoRef.current.y + autoRef.current.alto/2);
    
    // Polvo
    if (autoRef.current.enSuelo && gameRef.current.jugando) {
      ctx.fillStyle = 'rgba(0,0,0,0.1)';
      ctx.beginPath();
      ctx.ellipse(autoRef.current.x - 10, autoRef.current.y + autoRef.current.alto - 5, 5, 3, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // Puntuación
    ctx.font = 'bold 24px monospace';
    ctx.fillStyle = '#3D2B1F';
    ctx.textAlign = 'right';
    ctx.fillText(`${Math.floor(gameRef.current.puntos)}`, canvas.width - 20, 40);
    
    ctx.font = '12px monospace';
    ctx.fillStyle = '#8B5A2B';
    ctx.fillText(`Velocidad: ${gameRef.current.velocidad.toFixed(1)}`, canvas.width - 20, 70);
    ctx.fillText(`Nivel: ${Math.floor(gameRef.current.velocidad / 2)}`, canvas.width - 20, 90);

    if (!jugando && !gameOver) {
      ctx.font = '20px monospace';
      ctx.fillStyle = '#8B5A2B';
      ctx.textAlign = 'center';
      
      // ========== NUEVO: Mensaje personalizado si no hay horario ==========
      if (!horarioPermitido) {
        ctx.fillText(`⏰ Fuera de horario. Juego disponible: ${obtenerTextoHorarios()}`, canvas.width/2, canvas.height/2 - 20);
        ctx.font = '16px monospace';
        ctx.fillText('Presiona ESPACIO o TOCA cuando estés en horario', canvas.width/2, canvas.height/2 + 20);
      } else {
        ctx.fillText('Presiona ESPACIO o TOCA para saltar', canvas.width/2, canvas.height/2);
        ctx.font = '16px monospace';
        ctx.fillText('🚗 Esquiva cactus, piedras y pozos 🚧', canvas.width/2, canvas.height/2 + 40);
      }
      // ========== FIN NUEVO ==========
    }

    if (gameOver) {
      ctx.font = 'bold 28px monospace';
      ctx.fillStyle = '#8B0000';
      ctx.textAlign = 'center';
      ctx.fillText('💀 GAME OVER 💀', canvas.width/2, canvas.height/2 - 40);
      ctx.font = '18px monospace';
      ctx.fillStyle = '#3D2B1F';
      ctx.fillText(`Puntos: ${Math.floor(gameRef.current.puntos)}`, canvas.width/2, canvas.height/2);
    }
  }, [jugando, gameOver, horarioPermitido]);

  // Actualizar lógica
  const actualizar = useCallback(() => {
    if (!gameRef.current.jugando || gameRef.current.gameOver) return;

    // Física del auto
    autoRef.current.velocidadY += gravedad;
    autoRef.current.y += autoRef.current.velocidadY;

    if (autoRef.current.y >= autoYBase) {
      autoRef.current.y = autoYBase;
      autoRef.current.velocidadY = 0;
      autoRef.current.enSuelo = true;
    }

    if (autoRef.current.y < 0) {
      autoRef.current.y = 0;
      if (autoRef.current.velocidadY < 0) autoRef.current.velocidadY = 0;
    }

    // Mover obstáculos
    obstaculosRef.current.forEach(obs => {
      obs.x -= gameRef.current.velocidad;
    });
    
    obstaculosRef.current = obstaculosRef.current.filter(obs => obs.x + obs.ancho > 0);
    
    // Generar nuevos obstáculos
    if (obstaculosRef.current.length < 3 && 
        (obstaculosRef.current.length === 0 || 
         obstaculosRef.current[obstaculosRef.current.length - 1].x < 700)) {
      generarObstaculo();
    }
    
    // Puntuación y dificultad
    obstaculosRef.current.forEach(obs => {
      if (!obs.pasado && obs.x + obs.ancho < autoRef.current.x) {
        obs.pasado = true;
        let puntosGanados = 10;
        if (obs.tipo === 'piedra') puntosGanados = 15;
        if (obs.tipo === 'pozo') puntosGanados = 20;
        
        gameRef.current.puntos += puntosGanados;
        setPuntos(Math.floor(gameRef.current.puntos));
        gameRef.current.velocidad = Math.min(20, 5 + Math.floor(gameRef.current.puntos / 80));
      }
    });

    // Colisiones
    const autoRect = {
      x: autoRef.current.x,
      y: autoRef.current.y,
      w: autoRef.current.ancho,
      h: autoRef.current.alto
    };
    
    for (const obs of obstaculosRef.current) {
      const obsRect = {
        x: obs.x,
        y: sueloY - obs.alto,
        w: obs.ancho,
        h: obs.alto
      };
      
      if (autoRect.x < obsRect.x + obsRect.w &&
          autoRect.x + autoRect.w > obsRect.x &&
          autoRect.y < obsRect.y + obsRect.h &&
          autoRect.y + autoRect.h > obsRect.y) {
        
        gameRef.current.gameOver = true;
        setGameOver(true);
        setJugando(false);
        
        const puntajeFinal = Math.floor(gameRef.current.puntos);
        if (puntajeFinal > recordLocal) {
          setRecordLocal(puntajeFinal);
          localStorage.setItem('recordRunnerEscapa', puntajeFinal.toString());
          setMostrarInput(true);
        }
        return;
      }
    }

    dibujar();
  }, [generarObstaculo, dibujar, recordLocal]);

  // Bucle de animación
  const animacion = useCallback((timestamp: number) => {
    if (!gameRef.current.jugando || gameRef.current.gameOver) {
      animFrameRef.current = requestAnimationFrame(animacion);
      return;
    }

    if (gameRef.current.ultimoFrame === 0) {
      gameRef.current.ultimoFrame = timestamp;
      animFrameRef.current = requestAnimationFrame(animacion);
      return;
    }

    const delta = Math.min(50, timestamp - gameRef.current.ultimoFrame);
    if (delta >= gameRef.current.intervaloMovimiento) {
      actualizar();
      gameRef.current.ultimoFrame = timestamp;
    }

    animFrameRef.current = requestAnimationFrame(animacion);
  }, [actualizar]);

  // ========== NUEVO: Iniciar juego con verificación de horario ==========
  const iniciarJuego = useCallback(() => {
    if (!puedeIniciarPartida()) {
      alert(`⏰ Solo puedes empezar partidas en horarios: ${obtenerTextoHorarios()}`);
      return;
    }
    
    autoRef.current = {
      y: autoYBase,
      velocidadY: 0,
      enSuelo: true,
      x: 80,
      ancho: 35,
      alto: 35,
    };
    
    obstaculosRef.current = [];
    gameRef.current = {
      jugando: true,
      gameOver: false,
      puntos: 0,
      velocidad: 5,
      ultimoFrame: 0,
      intervaloMovimiento: 30,
    };
    
    setPuntos(0);
    setGameOver(false);
    setJugando(true);
    setMostrarInput(false);
    
    generarObstaculo();
    setTimeout(() => generarObstaculo(), 500);
    
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    animFrameRef.current = requestAnimationFrame(animacion);
    dibujar();
  }, [animacion, dibujar, generarObstaculo]);
  // ========== FIN NUEVO ==========

  // Saltar
  const saltar = useCallback(() => {
    if (!gameRef.current.jugando || gameRef.current.gameOver) return;
    if (autoRef.current.enSuelo) {
      autoRef.current.velocidadY = fuerzaSalto;
      autoRef.current.enSuelo = false;
    }
  }, []);

  // Guardar récord mundial
  const guardarRecordMundial = async () => {
    if (!nombreJugador.trim()) return;
    
    try {
      const res = await fetch(`${URL_SCRIPT}?accion=escribir&nombre=${encodeURIComponent(nombreJugador)}&puntuacion=${recordLocal}&telefono=${encodeURIComponent(telefonoJugador)}`);
      const data = await res.json();
      
      if (data.success) {
        alert(`🏆 ¡${data.mensaje}! Te contactaremos al ${telefonoJugador}`);
        setRecordMundial({
          nombre: nombreJugador,
          puntuacion: recordLocal,
          telefono: telefonoJugador
        });
      } else {
        alert(`❌ ${data.mensaje}`);
      }
    } catch (error) {
      alert('Error de conexión. El récord se guardó localmente.');
    }
    
    setMostrarInput(false);
  };

  // Eventos de teclado y táctil
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        if (!jugando && !gameOver) {
          iniciarJuego();
        } else {
          saltar();
        }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [jugando, gameOver, iniciarJuego, saltar]);

  useEffect(() => {
    const handleTap = (e: TouchEvent) => {
      e.preventDefault();
      if (!jugando && !gameOver) {
        iniciarJuego();
      } else {
        saltar();
      }
    };
    window.addEventListener('touchstart', handleTap);
    return () => window.removeEventListener('touchstart', handleTap);
  }, [jugando, gameOver, iniciarJuego, saltar]);

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-4xl w-full">
        <h1 className="text-4xl font-bold text-center text-[#3D2B1F] mb-2">
          🚗 Runner Escapá
        </h1>
        <p className="text-center text-gray-600 mb-4">
          🚗 Salta con ESPACIO o TOCANDO | 🎋 Más puntos = más velocidad
        </p>

        {/* ========== NUEVO: Indicador de horario ========== */}
        {!horarioPermitido && (
          <div className="text-center mb-4 p-2 bg-red-100 text-red-700 rounded-lg">
            ⏰ Fuera de horario. Juego disponible: {obtenerTextoHorarios()}
          </div>
        )}
        {horarioPermitido && (
          <div className="text-center mb-4 p-2 bg-green-100 text-green-700 rounded-lg">
            ✅ Horario habilitado. ¡Puedes jugar!
          </div>
        )}
        {/* ========== FIN NUEVO ========== */}

        <div className="flex flex-wrap justify-between gap-4 mb-4">
          <div className="bg-amber-100 rounded-lg px-6 py-3 flex-1 text-center min-w-[100px]">
            <span className="text-gray-600 text-sm">PUNTOS</span>
            <span className="text-3xl font-bold text-green-700 ml-2">{Math.floor(puntos)}</span>
          </div>
          
          <div className="bg-amber-100 rounded-lg px-6 py-3 flex-1 text-center min-w-[100px]">
            <span className="text-gray-600 text-sm">🏆 RÉCORD LOCAL</span>
            <span className="text-3xl font-bold text-yellow-700 ml-2">{recordLocal}</span>
          </div>
          
          <div className="bg-amber-100 rounded-lg px-6 py-3 flex-1 text-center min-w-[140px]">
            <span className="text-gray-600 text-sm">🌍 RÉCORD MUNDIAL</span>
            <span className="text-xl font-bold text-purple-700 block">
              {recordMundial.nombre}: {recordMundial.puntuacion}
            </span>
            {recordMundial.telefono && (
              <span className="text-xs text-gray-500 block">📞 {recordMundial.telefono}</span>
            )}
          </div>
        </div>

        <canvas
          ref={canvasRef}
          width={800}
          height={300}
          className="border-4 border-[#8B5A2B] rounded-xl mx-auto shadow-lg bg-[#F4ECE1] w-full"
          style={{ height: 'auto', aspectRatio: '800/300' }}
        />

        {!jugando && !gameOver && (
          <div className="text-center mt-6">
            <button
              onClick={iniciarJuego}
              className={`font-bold py-3 px-8 rounded-lg text-xl transition ${
                horarioPermitido 
                  ? 'bg-green-700 hover:bg-green-800 text-white' 
                  : 'bg-gray-400 cursor-not-allowed text-gray-200'
              }`}
              disabled={!horarioPermitido}
            >
              ▶ COMENZAR AVENTURA
            </button>
          </div>
        )}

        {gameOver && (
          <div className="text-center mt-6">
            <button
              onClick={iniciarJuego}
              className={`font-bold py-3 px-8 rounded-lg text-xl transition ${
                horarioPermitido 
                  ? 'bg-green-700 hover:bg-green-800 text-white' 
                  : 'bg-gray-400 cursor-not-allowed text-gray-200'
              }`}
              disabled={!horarioPermitido}
            >
              🔄 REINICIAR VIAJE
            </button>
          </div>
        )}

        {mostrarInput && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4">
              <h3 className="text-2xl font-bold text-yellow-600 mb-2">🏆 ¡NUEVO RÉCORD LOCAL!</h3>
              <p className="text-gray-700 mb-4">Puntuación: {recordLocal}</p>
              <input
                type="text"
                placeholder="Tu nombre"
                value={nombreJugador}
                onChange={(e) => setNombreJugador(e.target.value)}
                className="w-full px-3 py-2 bg-gray-100 text-gray-800 rounded mb-4 border border-gray-300"
                maxLength={20}
                autoFocus
              />
              <input
                type="tel"
                placeholder="Tu número de teléfono (ej: +5351234567)"
                value={telefonoJugador}
                onChange={(e) => setTelefonoJugador(e.target.value)}
                className="w-full px-3 py-2 bg-gray-100 text-gray-800 rounded mb-4 border border-gray-300"
                maxLength={20}
              />
              <button onClick={guardarRecordMundial} className="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded font-bold">
                Guardar Récord
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}