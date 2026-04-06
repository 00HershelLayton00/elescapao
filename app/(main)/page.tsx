import { Pacifico } from 'next/font/google';
import type { Metadata } from 'next';
import CarruselCliente from '../../component/CarruselCliente';
import SeccionActividades from '../../component/SeccionActividades';

const pacifico = Pacifico({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Don Santiago el Escapao',
  description: 'Donde las cosas son cuando SON!! - Restaurante con encanto',
};

// Datos que pueden venir de una API o CMS
const todasLasFotos = [1, 2, 3, 4, 5, 6, 7, 8];

export default function HomePage() {
  return (
    <main>
      {/* Hero Section - Server Component */}
      <div className="relative flex flex-col justify-between pt-10 overflow-hidden bg-[#F4ECE1] bg-[url('/images/papel.png')] bg-repeat bg-blend-multiply">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 
            className={`text-4xl md:text-7xl font-bold mb-6 drop-shadow-sm text-[#3D2B1F] tracking-tight ${pacifico.className}`}
          >
            Don Santiago el Escapao
          </h1>
          <p className="text-2xl mt-8 md:text-3xl mb-12 font-light text-[#3D2B1F] italic">
            "Donde las cosas son cuando SON!!"
          </p>
        </div>

        {/* Carrusel - Solo este componente necesita 'use client' */}
        <CarruselCliente 
          fotos={todasLasFotos} 
          itemsVisiblesPorDefecto={3}
          baseUrl="/images/restaurante"
        />
      </div>

      {/* Actividades - Server Component estático */}
      <SeccionActividades />
    </main>
  );
}