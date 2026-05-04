'use client';

import { useEffect, useState } from 'react';

interface FileItem {
  name: string;
  type: 'file' | 'folder';
  fileType?: string;
  path: string;
  size?: number;
  children?: FileItem[];
}

export default function MultimediaPage() {
  const [data, setData] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [localMode, setLocalMode] = useState(false);
  const [downloading, setDownloading] = useState<string | null>(null);
  const [downloadPercent, setDownloadPercent] = useState<number>(0);
  const [queueMessage, setQueueMessage] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [downloadSpeed, setDownloadSpeed] = useState<string>('');

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    fetch('/api/multimedia')
      .then(res => res.json())
      .then(result => {
        if (result.success && result.data) {
          setLocalMode(true);
          setData(result.data);
        } else if (result.error === 'feature_not_available') {
          setLocalMode(false);
        } else {
          setLocalMode(false);
          setError(result.message || 'Error al cargar archivos');
        }
      })
      .catch(() => setError('Error de conexión'))
      .finally(() => setLoading(false));
  }, []);

  const formatFileSize = (bytes: number): string => {
    if (!bytes) return '0 B';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  };

  const handleDownload = async (filePath: string, fileName: string, fileSize: number) => {
  if (downloading) {
    setQueueMessage('⚠️ Ya hay una descarga en curso. Espera a que termine.');
    return;
  }
  
  setDownloading(fileName);
  setDownloadPercent(0);
  setDownloadSpeed('');
  setQueueMessage(null);
  
  try {
    const startTime = Date.now();
    const response = await fetch(`/api/multimedia/download?path=${encodeURIComponent(filePath)}`);
    
    if (response.headers.get('content-type')?.includes('application/json')) {
      const error = await response.json();
      setQueueMessage(error.message || 'Error al descargar');
      setDownloading(null);
      return;
    }
    
    // Obtener el tipo MIME real que envió el servidor
    const mimeType = response.headers.get('content-type') || 'video/mp4';
    
    // Leer con progreso real
    const contentLength = response.headers.get('content-length');
    const total = contentLength ? parseInt(contentLength) : fileSize;
    
    const reader = response.body?.getReader();
    if (!reader) throw new Error('No se puede leer la respuesta');
    
    const chunks: Uint8Array[] = [];
    let receivedLength = 0;
    
    while (true) {
      const { done, value } = await reader.read();
      
      if (done) break;
      
      chunks.push(value);
      receivedLength += value.length;
      
      // Calcular progreso
      const percent = Math.round((receivedLength / total) * 100);
      setDownloadPercent(percent);
      
      // Calcular velocidad
      const elapsed = (Date.now() - startTime) / 1000;
      if (elapsed > 0) {
        const speed = receivedLength / elapsed;
        setDownloadSpeed(formatFileSize(speed) + '/s');
      }
    }
    
    // Crear blob CON el tipo MIME correcto
    const blob = new Blob(chunks as unknown as BlobPart[], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName; // Mantiene nombre y extensión original
    document.body.appendChild(a);
    a.click();
    
    // Pequeño delay para asegurar que se inició la descarga
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 100);
    
    setDownloadPercent(100);
    setQueueMessage(`✅ ¡${fileName} descargado!`);
    setTimeout(() => setQueueMessage(null), 4000);
    
  } catch (err) {
    console.error('Error descargando:', err);
    setQueueMessage('❌ Error durante la descarga. Intenta de nuevo.');
  }
  
  setTimeout(() => {
    setDownloading(null);
    setDownloadPercent(0);
    setDownloadSpeed('');
  }, 2000);
};

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px] ">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <div className="text-gray-500">Cargando archivos...</div>
        </div>
      </div>
    );
  }

  if (!localMode) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 ">
        <div className="bg-[url('/images/papel.png')] bg-repeat py-16  ">
          <h1 className="text-2xl font-bold text-yellow-800 mb-2">🍿 Cine en Don Santiago El Escapao</h1>
          <p className="text-yellow-700">
            {error || 'Esta sección solo está disponible en nuestra red local. Ven a visitarnos.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-6 px-3 md:py-8 md:px-4">
      {/* Mensajes */}
      {queueMessage && (
        <div className={`mb-4 p-3 rounded-lg text-sm font-medium ${
          queueMessage.includes('✅') ? 'bg-green-50 text-green-800 border border-green-200' : 
          queueMessage.includes('❌') || queueMessage.includes('⚠️') ? 'bg-red-50 text-red-800 border border-red-200' : 
          'bg-blue-50 text-blue-800 border border-blue-200'
        }`}>
          {queueMessage}
        </div>
      )}

      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">🎬 Nuestro Cine</h1>
      <p className="text-gray-500 text-sm mb-4">
        {data.length} película{data.length !== 1 ? 's' : ''} disponible{data.length !== 1 ? 's' : ''}
      </p>
      
      {/* Barra de progreso global de descarga */}
{downloading && (
  <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 shadow-sm">
    <div className="flex items-center justify-between mb-2">
      <span className="text-sm font-medium text-blue-800 truncate flex-1 mr-3">
        ⬇️ {downloadPercent < 100 ? 'Descargando:' : 'Completado:'} {downloading}
      </span>
      <span className={`text-sm font-bold whitespace-nowrap ${
        downloadPercent >= 100 ? 'text-green-600' : 'text-blue-600'
      }`}>
        {downloadPercent}%
      </span>
    </div>
    
    {/* Barra de progreso real */}
    <div className="w-full bg-gray-200 rounded-full h-3 mb-2 overflow-hidden">
      <div 
        className={`h-3 rounded-full transition-all duration-300 ease-out ${
          downloadPercent >= 100 ? 'bg-green-500' : 'bg-blue-500'
        }`}
        style={{ width: `${downloadPercent}%` }}
      ></div>
    </div>
    
    <div className="flex items-center justify-between text-xs">
      <span className={downloadPercent >= 100 ? 'text-green-600' : 'text-blue-600'}>
        {downloadPercent < 100 ? (
          <span className="flex items-center gap-1">
            <span className="animate-pulse">●</span> Recibiendo datos...
          </span>
        ) : (
          <span className="flex items-center gap-1">
            ✅ Guardando archivo...
          </span>
        )}
      </span>
      {downloadSpeed && downloadPercent < 100 && (
        <span className="text-blue-500 font-medium">{downloadSpeed}</span>
      )}
    </div>
    
    {downloadPercent > 0 && downloadPercent < 100 && (
      <p className="text-xs text-gray-400 mt-2 text-center">
        No cierres esta página hasta que termine
      </p>
    )}
  </div>
)}

      {/* Lista de archivos */}
      <div className="bg-[url('/images/papel.png')] bg-repeat py-3 ">
        {data.map((item) => (
          <div key={item.path} className="flex items-center justify-between py-3 px-4 hover:bg-gray-50 gap-3">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <span className="text-xl flex-shrink-0">🎬</span>
              <div className="min-w-0">
                <p className="text-gray-900 truncate text-sm md:text-base" title={item.name}>
                  {item.name}
                </p>
                {item.size && (
                  <p className="text-gray-700 text-xs">{formatFileSize(item.size)}</p>
                )}
              </div>
            </div>
            
            <button
              onClick={() => handleDownload(item.path, item.name, item.size || 0)}
              disabled={downloading !== null}
              className={`flex-shrink-0 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                downloading === item.name
                  ? 'bg-blue-100 text-blue-600 border border-blue-300'
                  : downloading
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700'
              }`}
            >
              {downloading === item.name ? (
                <span className="flex items-center gap-1">
                  <span className="inline-block w-3 h-3 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></span>
                  {downloadPercent}%
                </span>
              ) : downloading ? (
                '⏳ Espera'
              ) : (
                '⬇️ Descargar'
              )}
            </button>
          </div>
        ))}
      </div>
      
      {/* Ayuda para móviles */}
      {isMobile && (
        <p className="text-xs text-gray-400 mt-3 text-center">
          Al finalizar la descarga, el archivo se guardará automáticamente
        </p>
      )}
    </div>
  );
}