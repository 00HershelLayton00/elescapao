"use client";

import Link from "next/link";
import { useState } from "react";
import LogoEscapao from "../component/logotext";
import PlatoIcon from "../component/tenedorycuchillo";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const navLinks = [
    //{ name: "Menú", href: "/menu" },
    { name: "Juego", href: "/juego" },
    { name: "Ofertas", href: "/ofertas" },
    { name: "Escapados", href: "/escapados" },
    { name: "Nosotros", href: "/nosotros" },
    { name: "Contacto", href: "/contacto" },
  ];

  return (
    <div className="min-h-screen bg-[#F4ECE1] text-[#3D2B1F] font-serif">
      {/* NAV */}
      <nav className="bg-[#3a2310] z-50 bg-[url('/images/wood_pattern.png')] border-b-4 border-[#3D2B1F] p-4 shadow-xl sticky top-0">
        <div className="container mx-auto">

          {/* Desktop Menu */}
          <div className="hidden md:flex justify-between items-center">
            <Link
              href="/"
              className="text-2xl md:text-3xl font-black text-[#FFF8DC] italic tracking-tighter hover:text-white transition shrink-0 flex"
            >
              <PlatoIcon color="#FFF8DC" className="h-12 w-auto" />
              <LogoEscapao color="#FFF8DC" className="h-8 md:h-12 w-auto" />
            </Link>

            <div className="flex gap-8 text-[#FFF8DC] font-bold uppercase text-xl tracking-wider">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="group relative py-1 overflow-hidden"
                >
                  <span className="group-hover:text-white transition-colors duration-300">
                    {link.name}
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FFF8DC] -translate-x-[105%] group-hover:translate-x-0 transition-transform duration-300 ease-out shadow-[0_0_5px_rgba(255,248,220,0.5)]" />
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex justify-between items-center">
            <Link
              href="/"
              className="text-xl font-black text-[#FFF8DC] italic tracking-tighter hover:text-white transition shrink-0 flex"
            >
              <PlatoIcon color="#FFF8DC" className="h-8 w-auto" />
              <LogoEscapao color="#FFF8DC" className="h-8 w-auto" />
            </Link>

            {/* Botón hamburguesa */}
            <button
              onClick={() => setMenuAbierto((prev) => !prev)}
              className="text-[#FFF8DC] p-2 z-[60] relative"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {menuAbierto ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* 🔥 MENÚ MÓVIL */}
      {menuAbierto && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-40 bg-black/30"
            onClick={() => setMenuAbierto(false)}
          />

          {/* Menú */}
          <div className="fixed top-[73px] right-4 z-50">
            <div className="w-max max-w-[calc(100vw-2rem)] bg-[#3a2310] bg-[url('/images/wood_pattern.png')] border border-[#3D2B1F] shadow-2xl rounded-md overflow-hidden">
              
              <div className="flex flex-col">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMenuAbierto(false)}
                    className="whitespace-nowrap text-[#FFF8DC] text-lg font-bold uppercase tracking-wider py-4 px-6 border-b border-[#FFF8DC]/20 hover:bg-black/20 transition"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

            </div>
          </div>
        </>
      )}

      <main>{children}</main>

      {/* FOOTER */}
      <footer className="bg-[#1A120B] bg-[url('/images/wood_pattern.png')] text-[#FFF8DC] py-6 border-t-4 border-[#3D2B1F]">
        <div className="container mx-auto px-4 flex justify-between items-center">

          {/* Redes */}
          <div className="flex items-center gap-5">
            <a
              href="https://www.facebook.com/LaVozEscapa"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform active:scale-90"
            >
              <svg className="w-8 h-8 fill-[#FFF8DC]" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>

            <a
              href="https://wa.me/+5351591471?text=Las+cosas+son+cuando+son"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:scale-110 transition-transform active:scale-90"
              aria-label="WhatsApp del restaurante"
            >
              <svg className="w-8 h-8 fill-[#FFF8DC]" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.67-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.408 0 12.046c0 2.121.54 4.191 1.577 6.005L0 24l6.117-1.605a11.845 11.845 0 005.933 1.598h.005c6.637 0 12.045-5.408 12.049-12.046.002-3.218-1.248-6.242-3.517-8.511z" />
              </svg>
            </a>
          </div>

          <span className="text-xl md:text-2xl font-black italic tracking-tighter uppercase opacity-90">
            El Escapao
          </span>
        </div>
      </footer>
    </div>
  );
}