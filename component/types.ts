export interface Foto {
  id: number;
  url: string;
  titulo?: string;
}

export interface Actividad {
  titulo: string;
  fecha: string;
  desc: string;
  icono?: string;
}

export interface CarruselProps {
  fotos: Foto[] | number[];
  itemsVisiblesPorDefecto?: number;
  baseUrl?: string;
}

export interface ActividadProps {
  actividades: Actividad[];
}