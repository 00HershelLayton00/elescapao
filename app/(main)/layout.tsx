import Link from 'next/link'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <nav className="bg-gradient-to-r from-blue-600 to-yellow-600 hover:bg-blue-700 transition text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">🍽️ ElEscapao</Link>
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
