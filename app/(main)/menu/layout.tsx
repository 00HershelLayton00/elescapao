'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faChevronLeft, faTimes } from '@fortawesome/free-solid-svg-icons'

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerTop, setContainerTop] = useState(0)

  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setContainerTop(rect.top)
    }
  }, [])

  return (
    <div ref={containerRef} className="relative flex h-full w-full">
      <main className="flex-1 p-6 overflow-auto">
        {children}
      </main>

      {/* Botón para abrir - cuando el menú está cerrado */}
      {!isOpen && containerTop && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed right-0 z-50 w-8 bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 transition-all duration-300 flex items-center justify-center shadow-lg cursor-pointer text-xl"
          style={{
            top: `${containerTop}px`,
            bottom: 0,
            height: `calc(100vh - ${containerTop}px)`,
            touchAction: 'manipulation'
          }}
        >
          {/* <FontAwesomeIcon icon={faChevronLeft} /> */}
          ◀️
        </button>
      )}

      {/* Overlay (fondo oscuro al abrir el menú en móviles) */}
      {isOpen && containerTop && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300 md:hidden cursor-pointer"
          onClick={() => setIsOpen(false)}
          style={{ touchAction: 'manipulation' }}
        />
      )}

      {/* Barra lateral derecha */}
      <aside
        className={`fixed right-0 w-64 bg-gradient-to-b from-blue-600 to-yellow-600 text-white flex flex-col shadow-lg z-40 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          top: `${containerTop}px`,
          bottom: 0,
          height: `calc(100vh - ${containerTop}px)`
        }}
      >
        <div className="p-4 border-b border-white/20 flex justify-end">
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:bg-blue-700 active:bg-blue-800 p-2 rounded transition text-xl cursor-pointer"
            aria-label="Cerrar menú"
            style={{ touchAction: 'manipulation' }}
            type="button"
          >
            X
            {/* <FontAwesomeIcon icon={faTimes} /> */} 
          </button>
        </div>

        <nav className="flex flex-col p-4 gap-4 flex-1">
          <Link
            href="/menu/entrada"
            className="hover:bg-blue-700 active:bg-blue-800 p-2 rounded transition block"
            onClick={() => setIsOpen(false)}
          >
            Entrada
          </Link>
          <Link
            href="/menu/principal"
            className="hover:bg-blue-700 active:bg-blue-800 p-2 rounded transition block"
            onClick={() => setIsOpen(false)}
          >
            Principal
          </Link>
          <Link
            href="/menu/postre"
            className="hover:bg-blue-700 active:bg-blue-800 p-2 rounded transition block"
            onClick={() => setIsOpen(false)}
          >
            Postre
          </Link>
          <Link
            href="/menu/bebida"
            className="hover:bg-blue-700 active:bg-blue-800 p-2 rounded transition block"
            onClick={() => setIsOpen(false)}
          >
            Bebida
          </Link>
          <Link
            href="/menu/vip"
            className="hover:bg-blue-700 active:bg-blue-800 p-2 rounded transition block"
            onClick={() => setIsOpen(false)}
          >
            VIP
          </Link>
        </nav>
      </aside>
    </div>
  )
}