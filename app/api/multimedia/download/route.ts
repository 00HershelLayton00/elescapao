import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { downloadQueue } from '@/lib/downloadQueue'; // Si no existe, lo creamos

export const dynamic = 'force-dynamic';

function getMultimediaPath(): string | null {
  const envPath = process.env.MULTIMEDIA_PATH;
  if (envPath && fs.existsSync(envPath)) {
    return envPath;
  }
  return null;
}

export async function GET(req: NextRequest) {
  if (process.env.DISABLE_DOWNLOADS === 'true') {
    return NextResponse.json(
      { success: false, friendlyMessage: 'Descargas solo en red local' },
      { status: 403 }
    );
  }

  const filePath = req.nextUrl.searchParams.get('path');
  if (!filePath) {
    return NextResponse.json(
      { success: false, friendlyMessage: 'Falta parámetro path' },
      { status: 400 }
    );
  }

  const basePath = getMultimediaPath();
  if (!basePath) {
    return NextResponse.json(
      { success: false, friendlyMessage: 'Carpeta multimedia no configurada' },
      { status: 404 }
    );
  }

  const decodedPath = decodeURIComponent(filePath);
  const fullPath = path.join(basePath, decodedPath);

  // Seguridad: verificar que está dentro del directorio base
  try {
    const resolvedPath = fs.realpathSync(fullPath);
    const resolvedBase = fs.realpathSync(basePath);
    if (!resolvedPath.startsWith(resolvedBase)) {
      return NextResponse.json(
        { success: false, friendlyMessage: 'Acceso denegado' },
        { status: 403 }
      );
    }
  } catch {
    return NextResponse.json(
      { success: false, friendlyMessage: 'Archivo no encontrado' },
      { status: 404 }
    );
  }

  if (!fs.existsSync(fullPath)) {
    return NextResponse.json(
      { success: false, friendlyMessage: 'Archivo no disponible' },
      { status: 404 }
    );
  }

  try {
    let fileBuffer: Buffer;
    if (downloadQueue) {
      fileBuffer = await downloadQueue.enqueue(fullPath);
    } else {
      fileBuffer = fs.readFileSync(fullPath);
    }

    const fileName = path.basename(fullPath);
    const ext = path.extname(fileName).toLowerCase();
    const mimeTypes: Record<string, string> = {
      '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
      '.png': 'image/png', '.gif': 'image/gif',
      '.webp': 'image/webp', '.mp4': 'video/mp4',
      '.webm': 'video/webm', '.mov': 'video/quicktime',
      '.avi': 'video/x-msvideo', '.mkv': 'video/x-matroska',
      '.mp3': 'audio/mpeg', '.wav': 'audio/wav',
      '.pdf': 'application/pdf', '.zip': 'application/zip',
    };

    return new NextResponse(new Uint8Array(fileBuffer), {
      headers: {
        'Content-Disposition': `attachment; filename="${encodeURIComponent(fileName)}"`,
        'Content-Type': mimeTypes[ext] || 'application/octet-stream',
        'Content-Length': fileBuffer.length.toString(),
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, friendlyMessage: 'Error al procesar descarga' },
      { status: 500 }
    );
  }
}