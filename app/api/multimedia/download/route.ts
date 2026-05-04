import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { downloadQueue } from '@/lib/downloadQueue';

export const dynamic = 'force-dynamic';

function getMultimediaPath(): string | null {
  const envPath = process.env.MULTIMEDIA_PATH;
  if (envPath && fs.existsSync(envPath)) {
    return envPath;
  }
  return null;
}

export async function GET(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
             req.headers.get('x-real-ip') || 
             '127.0.0.1';

  if (process.env.DISABLE_DOWNLOADS === 'true') {
    return NextResponse.json(
      { error: true, message: 'Descargas solo disponibles en red local' },
      { status: 403 }
    );
  }

  const filePath = req.nextUrl.searchParams.get('path');
  if (!filePath) {
    return NextResponse.json(
      { error: true, message: 'Falta parámetro path' },
      { status: 400 }
    );
  }

  const basePath = getMultimediaPath();
  if (!basePath) {
    return NextResponse.json(
      { error: true, message: 'Esta sección solo está disponible en nuestra red local. Ven a visitarnos.' },
      { status: 404 }
    );
  }

  const decodedPath = decodeURIComponent(filePath);
  const fullPath = path.join(basePath, decodedPath);

  try {
    const resolvedPath = fs.realpathSync(fullPath);
    const resolvedBase = fs.realpathSync(basePath);
    if (!resolvedPath.startsWith(resolvedBase)) {
      return NextResponse.json(
        { error: true, message: 'Acceso denegado' },
        { status: 403 }
      );
    }
  } catch {
    return NextResponse.json(
      { error: true, message: 'Archivo no encontrado' },
      { status: 404 }
    );
  }

  if (!fs.existsSync(fullPath)) {
    return NextResponse.json(
      { error: true, message: 'Archivo no disponible' },
      { status: 404 }
    );
  }

  let fileSize: number;
  try {
    const stats = fs.statSync(fullPath);
    fileSize = stats.size;
    if (fileSize > 2147483648) {
      return NextResponse.json(
        { error: true, message: 'Archivo demasiado grande (>2GB)' },
        { status: 413 }
      );
    }
  } catch {
    return NextResponse.json(
      { error: true, message: 'Error al verificar archivo' },
      { status: 500 }
    );
  }

  try {
    const fileBuffer = await downloadQueue.enqueue(fullPath, ip);
    
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

    // Convertir Buffer a Uint8Array (compatible con NextResponse)
    return new NextResponse(new Uint8Array(fileBuffer), {
      headers: {
        'Content-Disposition': `attachment; filename="${encodeURIComponent(fileName)}"`,
        'Content-Type': mimeTypes[ext] || 'application/octet-stream',
        'Content-Length': fileSize.toString(),
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });

  } catch (error) {
    const msg = error instanceof Error ? error.message : '';
    
    if (msg.includes('Ya tienes una descarga activa')) {
      return NextResponse.json(
        { error: true, message: msg },
        { status: 429 }
      );
    }
    
    if (msg.includes('Mucha gente')) {
      return NextResponse.json(
        { error: true, message: msg },
        { status: 503 }
      );
    }

    if (msg.includes('Tiempo de espera')) {
      return NextResponse.json(
        { error: true, message: msg },
        { status: 503 }
      );
    }

    console.error('Error en descarga:', error);
    return NextResponse.json(
      { error: true, message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}