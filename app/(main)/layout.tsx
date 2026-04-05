// MainLayout.tsx - Server Component version
import Link from 'next/link';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#F4ECE1] text-[#3D2B1F] font-serif">
      <nav className="bg-[#3a2310] bg-[url('/images/wood_pattern.png')] border-b-4 border-[#3D2B1F] p-4 shadow-xl sticky top-0 z-50">
        <div className="container mx-auto">
          
          {/* Desktop Menu */}
          <div className="hidden md:flex justify-between items-center">
            <Link href="/" className="text-2xl md:text-3xl font-black text-[#FFF8DC] italic tracking-tighter hover:text-white transition shrink-0">
              🍽️ ElEscapao
            </Link>
            <div className="flex gap-8 text-[#FFF8DC] font-bold uppercase text-xl tracking-wider">
              <Link href="/menu" className="hover:text-white transition">Menú</Link>
              <Link href="/combos" className="hover:text-white transition">Combos</Link>
              <Link href="/contacto" className="hover:text-white transition">Contacto</Link>
            </div>
          </div>

          {/* Mobile Menu - Ahora con el nombre visible */}
          <div className="md:hidden flex justify-between items-center">
            {/* Logo en móvil */}
            <Link href="/" className="text-xl font-black text-[#FFF8DC] italic tracking-tighter hover:text-white transition shrink-0">
              🍽️ ElEscapao
            </Link>

            <details className="relative">
              <summary className="text-[#FFF8DC] p-2 focus:outline-none list-none cursor-pointer">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </summary>
              <div className="absolute right-0 top-12 w-48 bg-[#3a2310] bg-[url('/images/wood_pattern.png')] border-2 border-[#3D2B1F] shadow-2xl rounded-sm py-4 flex flex-col gap-4 z-[60]">
                <Link href="/menu" className="text-[#FFF8DC] px-6 py-2 font-bold uppercase tracking-widest border-b border-[#FFF8DC]/10 hover:bg-black/20">Menú</Link>
                <Link href="/combos" className="text-[#FFF8DC] px-6 py-2 font-bold uppercase tracking-widest border-b border-[#FFF8DC]/10 hover:bg-black/20">Combos</Link>
                <Link href="/contacto" className="text-[#FFF8DC] px-6 py-2 font-bold uppercase tracking-widest hover:bg-black/20">Contacto</Link>
              </div>
            </details>
          </div>
        </div>
      </nav>

      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-[#1A120B] bg-[url('/images/wood_pattern.png')] text-[#FFF8DC] py-6 border-t-4 border-[#3D2B1F] ">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <a href="https://www.facebook.com/LaVozEscapa" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform active:scale-90" aria-label="Facebook del restaurante">
            <svg className="w-8 h-8 fill-[#FFF8DC]" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>
          <span className="text-xl md:text-2xl font-black italic tracking-tighter uppercase opacity-90">El Escapao</span>
        </div>
      </footer>
    </div>
  );
}