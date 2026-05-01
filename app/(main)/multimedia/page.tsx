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
  const [queueMessage, setQueueMessage] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Cargar archivos
  useEffect(() => {
    fetch('/api/multimedia')
      .then(res => res.json())
      .then(result => {
        if (result.error === 'feature_not_available') {
          setLocalMode(false);
          setError(null);
        } else if (result.success) {
          setLocalMode(true);
          setData(result.data);
        } else {
          setLocalMode(false);
          setError(result.message || 'No se pudieron cargar los archivos');
        }
      })
      .catch(() => {
        setLocalMode(false);
        setError('Error de conexión con el servidor');
      })
      .finally(() => setLoading(false));
  }, []);

  // Formatear tamaño de archivo
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }
    if (bytes < 1024 * 1024 * 1024) {
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    }
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  };

  // Truncar nombre para móvil
  const truncateName = (name: string, maxLength: number = 25): string => {
    if (!isMobile) return name;
    if (name.length <= maxLength) return name;
    const ext = name.split('.').pop() || '';
    const baseName = name.slice(0, maxLength - ext.length - 3);
    return `${baseName}...${ext}`;
  };

  const handleDownload = async (filePath: string, fileName: string) => {
    setDownloading(fileName);
    setQueueMessage(null);
    
    try {
      const response = await fetch(`/api/multimedia/download?path=${encodeURIComponent(filePath)}`);
      
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const errorData = await response.json();
        const message = errorData.friendlyMessage || 'Error al descargar';
        
        setQueueMessage(message);
        setTimeout(() => setQueueMessage(null), 8000);
        setDownloading(null);
        return;
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
        setDownloading(null);
      }, 100);
      
    } catch (error) {
      setQueueMessage('Problema de conexión. Verifica tu red e intenta nuevamente.');
      setTimeout(() => setQueueMessage(null), 5000);
      setDownloading(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-gray-500">Cargando archivos...</div>
      </div>
    );
  }

  if (!localMode) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4">
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">🍿</span>
            <h1 className="text-2xl font-bold text-yellow-800">
              Contenido disponible en Don Santiago El Escapao
            </h1>
          </div>
          <p className="text-yellow-700 leading-relaxed">
            Esta sección solo está habilitada en nuestro local, acércate a nosotros para acceder al cine cubano tradicional.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4">
        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-6 px-3 md:py-8 md:px-4">
      {queueMessage && (
        <div className="mb-4 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg animate-fade-in">
          <div className="flex items-start gap-3">
            <span className="text-2xl">ℹ️</span>
            <p className="text-blue-800 text-sm leading-relaxed">{queueMessage}</p>
          </div>
        </div>
      )}

      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">Nuestro Cine</h1>
        <p className="text-gray-500 text-sm">
          Archivos disponibles para que descargue en nuestra red
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <FileTree 
          items={data} 
          onDownload={handleDownload} 
          downloading={downloading}
          formatFileSize={formatFileSize}
          truncateName={truncateName}
          isMobile={isMobile}
        />
      </div>
    </div>
  );
}

function FileTree({ 
  items, 
  onDownload, 
  downloading,
  formatFileSize,
  truncateName,
  isMobile
}: { 
  items: FileItem[]; 
  onDownload: (path: string, name: string) => void;
  downloading: string | null;
  formatFileSize: (bytes: number) => string;
  truncateName: (name: string, maxLength?: number) => string;
  isMobile: boolean;
}) {
  return (
    <ul className="divide-y divide-gray-100">
      {items.map((item) => (
        <li key={item.path}>
          {item.type === 'folder' ? (
            <details className="group">
              <summary className="cursor-pointer font-medium text-blue-600 hover:text-blue-800 py-3 px-4 rounded transition-colors">
                📁 {item.name}
              </summary>
              <div className="pl-4 md:pl-6 border-l-2 border-gray-200 ml-2">
                <FileTree 
                  items={item.children || []} 
                  onDownload={onDownload}
                  downloading={downloading}
                  formatFileSize={formatFileSize}
                  truncateName={truncateName}
                  isMobile={isMobile}
                />
              </div>
            </details>
          ) : (
            <div className="flex items-center justify-between py-2 px-3 md:py-3 md:px-4 hover:bg-gray-50 gap-2">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <span className="text-xl flex-shrink-0">
                  {item.fileType === 'image' && '🖼️'}
                  {item.fileType === 'video' && '🎬'}
                  {item.fileType === 'audio' && '🎵'}
                  {(!item.fileType || item.fileType === 'document') && '📄'}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-700 text-sm md:text-base truncate" title={item.name}>
                    {truncateName(item.name)}
                  </p>
                  {item.size && (
                    <span className="text-gray-400 text-xs">
                      {formatFileSize(item.size)}
                    </span>
                  )}
                </div>
              </div>
              
              <button
                onClick={() => onDownload(item.path, item.name)}
                disabled={downloading === item.name}
                className={`flex-shrink-0 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                  downloading === item.name
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 hover:shadow-md'
                }`}
              >
                {downloading === item.name ? (
                  <span className="flex items-center gap-1">
                    <span className="inline-block w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></span>
                    <span className="hidden sm:inline">Descargando...</span>
                  </span>
                ) : (
                  <span>⬇️ {!isMobile && 'Descargar'}</span>
                )}
              </button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}