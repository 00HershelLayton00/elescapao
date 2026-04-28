import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { downloadQueue } from '@/lib/downloadQueue';

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

export async function GET(req: NextRequest) {
  const isProduction = process.env.NODE_ENV === 'production';
  
  if (isProduction && process.env.DISABLE_DOWNLOADS_IN_PROD === 'true') {
    return NextResponse.json(
      { 
        success: false,
        friendlyMessage: '📡 Las descargas solo están disponibles en nuestra red local, ven a Don Santiago El Escapao.'
      },
      { status: 403 }
    );
  }

  const filePath = req.nextUrl.searchParams.get('path');
  if (!filePath) {
    return NextResponse.json(
      { 
        success: false,
        friendlyMessage: '❓ No se especificó qué archivo descargar. Por favor, intentá nuevamente desde el listado.'
      },
      { status: 400 }
    );
  }

  const basePath = getMultimediaPath();
  if (!basePath || !fs.existsSync(basePath)) {
    return NextResponse.json(
      { 
        success: false,
        friendlyMessage: '📁 La carpeta de archivos no está disponible en este momento. Contacte al administrador.'
      },
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
        { 
          success: false,
          friendlyMessage: '🔒 Acceso denegado. No se puede acceder a esta ubicación.'
        },
        { status: 403 }
      );
    }
  } catch {
    return NextResponse.json(
      { 
        success: false,
        friendlyMessage: '📄 El archivo no existe o ha sido movido. Verifica en el listado actualizado.'
      },
      { status: 404 }
    );
  }

  if (!fs.existsSync(fullPath)) {
    return NextResponse.json(
      { 
        success: false,
        friendlyMessage: '📄 El archivo que buscas ya no está disponible. Actualiza la página para ver el listado actual.'
      },
      { status: 404 }
    );
  }

  try {
    const fileBuffer = await downloadQueue.enqueue(fullPath);
    
    const fileName = path.basename(fullPath);
    const ext = path.extname(fileName).toLowerCase();
    let mimeType = 'application/octet-stream';
    
    if (['.jpg', '.jpeg'].includes(ext)) mimeType = 'image/jpeg';
    else if (ext === '.png') mimeType = 'image/png';
    else if (ext === '.gif') mimeType = 'image/gif';
    else if (ext === '.webp') mimeType = 'image/webp';
    else if (ext === '.mp4') mimeType = 'video/mp4';
    else if (ext === '.pdf') mimeType = 'application/pdf';
    
    // 👈 Solución: Convertir Buffer a Uint8Array o usar Response en lugar de NextResponse
    return new NextResponse(new Uint8Array(fileBuffer), {
      headers: {
        'Content-Disposition': `attachment; filename="${encodeURIComponent(fileName)}"`,
        'Content-Type': mimeType,
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : '';
    
    if (errorMessage.includes('saturado')) {
      return NextResponse.json(
        { 
          success: false,
          friendlyMessage: '🕐 El servidor está con mucha actividad. Por favor, espera unos segundos y vuelve a intentarlo.',
          queueFull: true
        },
        { status: 503 }
      );
    }
    
    if (errorMessage.includes('Tiempo de espera')) {
      return NextResponse.json(
        { 
          success: false,
          friendlyMessage: '⏳ La descarga demoró más de lo esperado. Hay muchas personas descargando al mismo tiempo. Intenta nuevamente en unos momentos.',
          timeout: true
        },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false,
        friendlyMessage: '⚠️ Ocurrió un problema al procesar la descarga. Reintenta o contacta al administrador si el problema persiste.'
      },
      { status: 500 }
    );
  }
}