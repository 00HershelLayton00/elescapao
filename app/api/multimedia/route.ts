import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

function getMultimediaPath(): string | null {
  const envPath = process.env.MULTIMEDIA_PATH;
  if (envPath && fs.existsSync(envPath)) {
    return envPath;
  }
  return null;
}

function readDirectory(dirPath: string, relativePath: string = '') {
  const items: any[] = [];
  
  try {
    const entries = fs.readdirSync(dirPath);

    for (const entry of entries) {
      if (entry.startsWith('.')) continue;

      const fullPath = path.join(dirPath, entry);
      const relPath = relativePath ? path.join(relativePath, entry) : entry;

      try {
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
          if (['.jpg','.jpeg','.png','.gif','.webp','.bmp'].includes(ext)) fileType = 'image';
          else if (['.mp4','.webm','.mov','.avi','.mkv'].includes(ext)) fileType = 'video';
          else if (['.mp3','.wav','.ogg','.flac'].includes(ext)) fileType = 'audio';

          items.push({
            name: entry,
            type: 'file',
            fileType,
            path: relPath,
            size: stat.size,
          });
        }
      } catch (err) {
        continue;
      }
    }
  } catch (error) {
    console.error('Error leyendo directorio:', error);
  }

  return items.sort((a, b) => {
    if (a.type === 'folder' && b.type !== 'folder') return -1;
    if (a.type !== 'folder' && b.type === 'folder') return 1;
    return a.name.localeCompare(b.name);
  });
}

export async function GET() {
  if (process.env.DISABLE_MULTIMEDIA === 'true') {
    return NextResponse.json(
      { error: 'feature_not_available', message: 'Solo disponible en red local' },
      { status: 403 }
    );
  }

  const basePath = getMultimediaPath();

  if (!basePath) {
    return NextResponse.json(
      { error: 'not_found', message: 'Carpeta multimedia no encontrada. Configure MULTIMEDIA_PATH' },
      { status: 404 }
    );
  }

  try {
    const data = readDirectory(basePath);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { error: 'read_error', message: 'Error al leer la carpeta multimedia' },
      { status: 500 }
    );
  }
}