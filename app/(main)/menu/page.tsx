// app/menu/page.tsx
import { redirect } from 'next/navigation';

export default function MenuPage() {
  // Redirige automáticamente a la sub-ruta de entradas
  redirect('/menu/entradas');
}