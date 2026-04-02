import Link from 'next/link'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <nav className="bg-orange-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">🍽️ Mi Restaurante</Link>
          <div className="flex gap-4">
            <Link href="/menu">Menú</Link>
            <Link href="/combos">Combos</Link>
            <Link href="/contacto">Contacto</Link>
          </div>
        </div>
      </nav>
      {children}
    </>
  )
}
