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
          setError(result.message);
        }
      })
      .catch(() => {
        setLocalMode(false);
        setError('Error de conexión');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-gray-500">Cargando archivos...</div>
      </div>
    );
  }

  // Modo producción / sin carpeta local
  if (!localMode) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4">
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">📡</span>
            <h1 className="text-2xl font-bold text-yellow-800">
              Contenido solo disponible en red local
            </h1>
          </div>
          <p className="text-yellow-700 leading-relaxed">
            Esta funcionalidad solo está habilitada dentro de nuestras oficinas.
            Conéctate a la red local para acceder a documentos, videos y fotos.
          </p>
        </div>
      </div>
    );
  }

  // Modo local: mostrar archivos
  if (error) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4">
        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
          <p className="text-red-700">Error: {error}</p>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 text-center">
        <p className="text-gray-500">No hay archivos en la carpeta multimedia</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">📂 Multimedia Local</h1>
        <p className="text-gray-500">Archivos disponibles en la red local</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <FileTree items={data} />
      </div>
    </div>
  );
}

function FileTree({ items, basePath = '' }: { items: FileItem[]; basePath?: string }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item.path}>
          {item.type === 'folder' ? (
            <details className="group">
              <summary className="cursor-pointer font-medium text-blue-600 hover:text-blue-800 py-1 rounded">
                📁 {item.name}
              </summary>
              <div className="ml-6 mt-2 pl-3 border-l-2 border-gray-200">
                {item.children && <FileTree items={item.children} basePath={item.path} />}
              </div>
            </details>
          ) : (
            <div className="flex items-center gap-2 py-1.5 px-2 hover:bg-gray-50 rounded">
              <span className="text-xl">
                {item.fileType === 'image' && '🖼️'}
                {item.fileType === 'video' && '🎬'}
                {(!item.fileType || item.fileType === 'document') && '📄'}
              </span>
              <a
                href={`/api/multimedia/download?path=${encodeURIComponent(item.path)}`}
                className="text-blue-600 hover:text-blue-800 hover:underline flex-1"
                download
              >
                {item.name}
              </a>
              {item.size && (
                <span className="text-gray-400 text-xs">
                  {(item.size / 1024).toFixed(1)} KB
                </span>
              )}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}