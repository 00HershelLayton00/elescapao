'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

interface Obstaculo {
  x: number;
  tipo: 'cactus' | 'piedra' | 'pozo';
  ancho: number;
  alto: number;
  pasado: boolean;
}

export default function RunnerEscapa() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [puntos, setPuntos] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [jugando, setJugando] = useState(false);
  const [recordLocal, setRecordLocal] = useState(0);
  const [nombreJugador, setNombreJugador] = useState('');
  const [mostrarInput, setMostrarInput] = useState(false);

  // Refs del juego
  const gameRef = useRef({
    jugando: false,
    gameOver: false,
    puntos: 0,
    velocidad: 7,
    ultimoFrame: 0,
    intervaloMovimiento: 30,
    distanciaUltimoObs: 0,
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

  // Cargar récord
  useEffect(() => {
    const saved = localStorage.getItem('recordRunnerEscapa');
    if (saved) setRecordLocal(parseInt(saved));
  }, []);

  // Generar nuevo obstáculo con distancia variable
  const generarObstaculo = useCallback(() => {
    const tipos = ['cactus', 'piedra', 'pozo'] as const;
    const tipo = tipos[Math.floor(Math.random() * tipos.length)];
    
    let ancho = 25, alto = 35;
    if (tipo === 'piedra') { ancho = 30; alto = 20; }
    if (tipo === 'pozo') { ancho = 40; alto = 15; }
    
    // Distancia variable entre 400 y 700 píxeles
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

    // Fondo
    ctx.fillStyle = '#F4ECE1';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Líneas de fondo (movimiento)
    ctx.strokeStyle = '#D4A373';
    ctx.lineWidth = 2;
    for (let i = 0; i < 10; i++) {
      const x = (gameRef.current.ultimoFrame * 0.5 + i * 80) % 800;
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

    // Auto antiguo (en lugar del dinosaurio)
    ctx.font = '42px "Segoe UI Emoji"';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🚗', autoRef.current.x + autoRef.current.ancho/2, autoRef.current.y + autoRef.current.alto/2);
    
    // Efecto de movimiento (polvo)
    if (autoRef.current.enSuelo && gameRef.current.jugando) {
      ctx.fillStyle = 'rgba(0,0,0,0.1)';
      ctx.beginPath();
      ctx.ellipse(autoRef.current.x - 10, autoRef.current.y + autoRef.current.alto - 5, 5, 3, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // Puntuación y velocidad
    ctx.font = 'bold 24px monospace';
    ctx.fillStyle = '#3D2B1F';
    ctx.textAlign = 'right';
    ctx.fillText(`${Math.floor(gameRef.current.puntos)}`, canvas.width - 20, 40);
    
    ctx.font = '12px monospace';
    ctx.fillStyle = '#8B5A2B';
    ctx.fillText(`Velocidad: ${gameRef.current.velocidad.toFixed(1)}`, canvas.width - 20, 70);

    // Nivel de dificultad
    const nivel = Math.floor(gameRef.current.velocidad / 2);
    ctx.fillText(`Nivel: ${nivel}`, canvas.width - 20, 90);

    if (!jugando && !gameOver) {
      ctx.font = '20px monospace';
      ctx.fillStyle = '#8B5A2B';
      ctx.textAlign = 'center';
      ctx.fillText('Presiona ESPACIO o TOCA para saltar', canvas.width/2, canvas.height/2);
      ctx.font = '16px monospace';
      ctx.fillText('🚗 Esquiva cactus, piedras y pozos 🚧', canvas.width/2, canvas.height/2 + 40);
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
  }, [jugando, gameOver]);

  // Actualizar lógica
  const actualizar = useCallback((deltaTime: number) => {
    if (!gameRef.current.jugando || gameRef.current.gameOver) return;

    // 1. Física del auto
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

    // 2. Mover obstáculos
    obstaculosRef.current.forEach(obs => {
      obs.x -= gameRef.current.velocidad;
    });
    
    // 3. Eliminar obstáculos fuera de pantalla
    obstaculosRef.current = obstaculosRef.current.filter(obs => obs.x + obs.ancho > 0);
    
    // 4. Generar nuevos obstáculos (mantener 2-3 en pantalla)
    if (obstaculosRef.current.length < 3 && 
        (obstaculosRef.current.length === 0 || 
         obstaculosRef.current[obstaculosRef.current.length - 1].x < 700)) {
      generarObstaculo();
    }
    
    // 5. Puntuación y dificultad progresiva
    obstaculosRef.current.forEach(obs => {
      if (!obs.pasado && obs.x + obs.ancho < autoRef.current.x) {
        obs.pasado = true;
        // Puntos según tipo de obstáculo
        let puntosGanados = 10;
        if (obs.tipo === 'piedra') puntosGanados = 15;
        if (obs.tipo === 'pozo') puntosGanados = 20;
        
        gameRef.current.puntos += puntosGanados;
        setPuntos(Math.floor(gameRef.current.puntos));
        
        // Aumentar velocidad progresivamente (máx 20)
        gameRef.current.velocidad = Math.min(20, 5 + Math.floor(gameRef.current.puntos / 80));
      }
    });

    // 6. Colisiones
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
      actualizar(delta);
      gameRef.current.ultimoFrame = timestamp;
    }

    animFrameRef.current = requestAnimationFrame(animacion);
  }, [actualizar]);

  // Iniciar juego
  const iniciarJuego = useCallback(() => {
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
      distanciaUltimoObs: 0,
    };
    
    setPuntos(0);
    setGameOver(false);
    setJugando(true);
    setMostrarInput(false);
    
    // Generar primeros obstáculos
    generarObstaculo();
    setTimeout(() => generarObstaculo(), 500);
    
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    animFrameRef.current = requestAnimationFrame(animacion);
    dibujar();
  }, [animacion, dibujar, generarObstaculo]);

  // Saltar
  const saltar = useCallback(() => {
    if (!gameRef.current.jugando || gameRef.current.gameOver) return;
    if (autoRef.current.enSuelo) {
      autoRef.current.velocidadY = fuerzaSalto;
      autoRef.current.enSuelo = false;
    }
  }, []);

  // Eventos
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

  const guardarRecordMundial = () => {
    if (!nombreJugador.trim()) return;
    alert(`🏆 Récord guardado: ${nombreJugador} con ${recordLocal} puntos`);
    setMostrarInput(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-4xl w-full">
        <h1 className="text-4xl font-bold text-center text-[#3D2B1F] mb-2">
          🚗 Runner Escapao
        </h1>
        <p className="text-center text-gray-600 mb-4">
          🚗 Salta obstáculos con ESPACIO o TOCANDO | 🎋 Más puntos = más velocidad
        </p>

        <div className="flex justify-between gap-4 mb-4">
          <div className="bg-amber-100 rounded-lg px-6 py-3 flex-1 text-center">
            <span className="text-gray-600 text-sm">PUNTOS</span>
            <span className="text-3xl font-bold text-green-700 ml-2">{Math.floor(puntos)}</span>
          </div>
          <div className="bg-amber-100 rounded-lg px-6 py-3 flex-1 text-center">
            <span className="text-gray-600 text-sm">🏆 RÉCORD</span>
            <span className="text-3xl font-bold text-yellow-700 ml-2">{recordLocal}</span>
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
              className="bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-8 rounded-lg text-xl transition"
            >
              ▶ COMENZAR AVENTURA
            </button>
          </div>
        )}

        {gameOver && (
          <div className="text-center mt-6">
            <button
              onClick={iniciarJuego}
              className="bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-8 rounded-lg text-xl transition"
            >
              🔄 REINICIAR VIAJE
            </button>
          </div>
        )}

        {mostrarInput && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4">
              <h3 className="text-2xl font-bold text-yellow-600 mb-2">🏆 ¡NUEVO RÉCORD!</h3>
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