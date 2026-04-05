// layout.tsx (Sin 'use client')
import Link from 'next/link'

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const links = [
    { href: "/menu/entrada", label: "Entrada" },
    { href: "/menu/principal", label: "Principal" },
    { href: "/menu/postre", label: "Postre" },
    { href: "/menu/bebida", label: "Bebida" },
    { href: "/menu/vip", label: "VIP" },
  ]

  return (
    <div className="relative flex h-screen w-full overflow-hidden">
      {/* EL TRUCO: Checkbox oculto que controla el estado del menú */}
      <input type="checkbox" id="menu-drawer" className="peer hidden" />

      <main className="flex-1 p-6 overflow-auto">
        {children}
      </main>

      {/* BOTÓN PARA ABRIR (Label vinculado al checkbox) */}
      {/* Solo se ve cuando el checkbox NO está marcado (peer-checked:hidden) */}
      <label 
        htmlFor="menu-drawer"
        className="fixed right-0 top-0 bottom-0 z-50 w-8 bg-[#3D2B1F] text-white hover:bg-[#5D4037] transition-all flex items-center justify-center shadow-lg cursor-pointer peer-checked:hidden"
      >
        <span className="rotate-180">▶️</span>
      </label>

      {/* OVERLAY (Fondo oscuro) */}
      {/* Se muestra solo cuando el checkbox está marcado */}
      <label
        htmlFor="menu-drawer"
        className="fixed inset-0 bg-black/50 z-30 opacity-0 pointer-events-none transition-opacity peer-checked:opacity-100 peer-checked:pointer-events-auto md:hidden"
      />

      {/* BARRA LATERAL (Aside) */}
      {/* Cambia su posición según el estado del 'peer' (el checkbox) */}
      <aside
        className="fixed right-0 top-0 bottom-0 w-64 bg-gradient-to-b from-[#3D2B1F] to-[#1A120B] text-white flex flex-col shadow-2xl z-40 translate-x-full transition-transform duration-300 ease-in-out peer-checked:translate-x-0"
      >
        {/* BOTÓN PARA CERRAR (Otro label que desmarca el checkbox) */}
        <div className="p-4 border-b border-white/10 flex justify-end">
          <label
            htmlFor="menu-drawer"
            className="text-white hover:bg-white/10 p-2 rounded-full transition text-xl cursor-pointer"
          >
            ✕
          </label>
        </div>

        <nav className="flex flex-col p-6 gap-4 flex-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-lg font-medium hover:text-yellow-500 transition-colors border-b border-white/5 pb-2"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>
    </div>
  )
}