// layout.tsx (Server Component)
import Link from 'next/link'

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const links = [
    { href: "/menu/entradas", label: "Entradas" }, // cambió de entrada -> entradas
    { href: "/menu/principales", label: "Principal" },
    { href: "/menu/viandas", label: "Viandas" },
    { href: "/menu/ensaladas", label: "Ensaladas" },
    { href: "/menu/parrillada", label: "Parrillada" },
    { href: "/menu/variedades", label: "Variedades" },
    { href: "/menu/guarniciones", label: "Guarnición" },
    { href: "/menu/postres", label: "Postre" },
    { href: "/menu/bebidas", label: "Bebida" },
    { href: "/menu/vip", label: "VIP" },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Sub-Navegación Superior */}
      <nav className="sticky z-30 top-[64px] w-full bg-[#4E342E] bg-[url('/images/wood_pattern.png')] border-b-2 border-[#3D2B1F] shadow-md">
        <div className="max-w-[1400px] mx-auto px-0 md:px-4">
          {/* Móvil: overflow-x-auto (permite scroll) + justify-start
              PC (lg): lg:overflow-x-hidden (quita scroll) + lg:justify-center
          */}
          <ul className="flex flex-nowrap items-center justify-start lg:justify-center gap-0.5 md:gap-1 py-3 overflow-x-auto lg:overflow-x-hidden no-scrollbar px-4 lg:px-0">
            {links.map((link) => (
              <li key={link.href} className="shrink-0 lg:shrink">
                <Link
                  href={link.href}
                  /* Reducimos el padding lateral (px-2) y el tracking 
                     para que en pantallas grandes quepan todos sin apretarse.
                  */
                  className="block whitespace-nowrap px-2 md:px-3 py-2 text-sm md:text-base font-bold uppercase tracking-tighter text-[#EBDCCB] hover:text-white hover:bg-white/10 rounded-sm transition-all border border-transparent active:scale-95"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Contenido con papel.png */}
      <main className="flex-1 p-4 md:p-8 bg-[#F4ECE1] bg-[url('/images/papel.png')] bg-repeat bg-fixed bg-blend-multiply">
        <div className="container mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}