// layout.tsx (Server Component - 100% Estático)
import Link from 'next/link'

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const links = [
    { href: "/menu/entrada", label: "Entrada" },
    { href: "/menu/principal", label: "Principal" },
    { href: "/menu/viandas", label: "Viandas" },
    { href: "/menu/ensalada", label: "Ensaladas" },
    { href: "/menu/parrillada", label: "Parrillada" },
    { href: "/menu/variedades", label: "Variedades" },
    { href: "/menu/guarnicion", label: "Guarnición" },
    { href: "/menu/postre", label: "Postre" },
    { href: "/menu/bebida", label: "Bebida" },
    { href: "/menu/vip", label: "VIP" },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Sub-Navegación Superior de Categorías */}
      <nav className="sticky top-[64px] z-40 w-full bg-[#4E342E] bg-[url('/images/wood_pattern.png')] border-b-2 border-[#3D2B1F] shadow-md">
        <div className="container mx-auto">
          {/* Añadimos scrollbar-hide (clase personalizada que definiremos abajo) */}
          <ul className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto scrollbar-hide py-2 px-4">
            {links.map((link) => (
              <li key={link.href} className="shrink-0">
                <Link
                  href={link.href}
                  className="block px-4 py-2 text-sm md:text-base font-bold uppercase tracking-widest text-[#EBDCCB] hover:text-white hover:bg-white/10 rounded-sm transition-all border border-transparent active:border-white/20"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Contenido de la categoría seleccionada */}
      <main className="flex-1 p-6 bg-[#F4ECE1] bg-[url('/images/papel.png')] bg-repeat bg-fixed">
        <div className="container mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}