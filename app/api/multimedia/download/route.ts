import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import os from 'os';

function getMultimediaPath(): string | null {
  const platform = os.platform();
  
  if (platform === 'win32') {
    return process.env.MULTIMEDIA_PATH_WINDOWS || 'D:/multimedia';
  } else if (platform === 'linux') {
    // Probar varias rutas comunes en Linux en español
    const homeDir = os.homedir();
    const rutasPosibles = [
      process.env.MULTIMEDIA_PATH_LINUX,
      `${homeDir}/Escritorio/multimedia`,
      `${homeDir}/Desktop/multimedia`,
      '/home/multimedia',
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

export async function GET(req: NextRequest) {
  // 🔴 Forzar modo local para pruebas (cambiar a true cuando subas a Render)
  const isProduction = false;
  
  if (isProduction) {
    return NextResponse.json({ error: 'No disponible en producción' }, { status: 403 });
  }

  const filePath = req.nextUrl.searchParams.get('path');
  if (!filePath) {
    return NextResponse.json({ error: 'Falta parámetro path' }, { status: 400 });
  }

  const basePath = getMultimediaPath();
  if (!basePath) {
    return NextResponse.json({ error: 'Ruta no configurada' }, { status: 500 });
  }

  // Decodificar el path y construir ruta completa
  const decodedPath = decodeURIComponent(filePath);
  const fullPath = path.join(basePath, decodedPath);
  
  // Seguridad: evitar path traversal
  const resolvedPath = fs.realpathSync(fullPath);
  const resolvedBase = fs.realpathSync(basePath);
  if (!resolvedPath.startsWith(resolvedBase)) {
    return NextResponse.json({ error: 'Acceso denegado' }, { status: 403 });
  }

  if (!fs.existsSync(fullPath)) {
    return NextResponse.json({ error: 'Archivo no encontrado' }, { status: 404 });
  }

  const fileBuffer = fs.readFileSync(fullPath);
  const fileName = path.basename(fullPath);
  
  // Detectar MIME type según extensión
  const ext = path.extname(fileName).toLowerCase();
  let mimeType = 'application/octet-stream';
  
  if (['.jpg', '.jpeg'].includes(ext)) mimeType = 'image/jpeg';
  else if (ext === '.png') mimeType = 'image/png';
  else if (ext === '.gif') mimeType = 'image/gif';
  else if (ext === '.webp') mimeType = 'image/webp';
  else if (ext === '.mp4') mimeType = 'video/mp4';
  else if (ext === '.pdf') mimeType = 'application/pdf';
  
  return new NextResponse(fileBuffer, {
    headers: {
      'Content-Disposition': `attachment; filename="${encodeURIComponent(fileName)}"`,
      'Content-Type': mimeType,
    },
  });
}