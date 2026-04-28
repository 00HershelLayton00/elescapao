import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import os from 'os';

function getMultimediaPath(): string | null {
  const platform = os.platform();
  
  if (platform === 'win32') {
    return process.env.MULTIMEDIA_PATH_WINDOWS || 'D:/multimedia';
  } else if (platform === 'linux') {
    const homeDir = os.homedir();
    const rutasPosibles = [
      process.env.MULTIMEDIA_PATH_LINUX,
      `${homeDir}/Escritorio/multimedia`,
      `${homeDir}/Desktop/multimedia`,
    ];
    
    for (const ruta of rutasPosibles) {
      if (ruta && fs.existsSync(ruta)) {
        return ruta;
      }
    }
    return null;
  }
  return null;
}

export async function GET() {
  const isProduction = process.env.NODE_ENV === 'production';
  
  if (isProduction) {
    return NextResponse.json(
      { 
        error: 'feature_not_available', 
        message: 'Esta funcionalidad solo está disponible en nuestra red local' 
      },
      { status: 403 }
    );
  }

  const basePath = getMultimediaPath();
  
  if (!basePath || !fs.existsSync(basePath)) {
    return NextResponse.json(
      { 
        error: 'not_found', 
        message: `No se encontró la carpeta multimedia` 
      },
      { status: 404 }
    );
  }

  function readDirectory(dirPath: string, relativePath: string = ''): any[] {
    const items: any[] = [];
    const entries = fs.readdirSync(dirPath);
    
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry);
      const relPath = relativePath ? path.join(relativePath, entry) : entry;
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        items.push({
          name: entry,
          type: 'folder',
          path: relPath,
          children: readDirectory(fullPath, relPath),
        });
      } else {
        const ext = path.extname(entry).toLowerCase();
        let fileType = 'document';
        if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)) fileType = 'image';
        else if (['.mp4', '.webm', '.mov', '.avi'].includes(ext)) fileType = 'video';
        
        items.push({
          name: entry,
          type: 'file',
          fileType,
          path: relPath,
          size: stat.size,
        });
      }
    }
    return items;
  }

  try {
    const structure = readDirectory(basePath);
    return NextResponse.json({ success: true, data: structure });
  } catch (error) {
    return NextResponse.json(
      { error: 'read_error', message: 'Error al leer la carpeta' }, 
      { status: 500 }
    );
  }
}