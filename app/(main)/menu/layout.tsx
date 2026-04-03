import Link from 'next/link'

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <nav className="bg-gradient-to-r from-blue-600 to-yellow-600 : bg-blue-700 transition text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          📋
          <div className="flex gap-4">
            <Link href="/menu/entrada">Entrada</Link>
            <Link href="/menu/principal">Principal</Link>
            <Link href="/menu/postre">Postre</Link>
            <Link href="/menu/bebida">Bebida</Link>
            <Link href="/menu/vip">VIP</Link>
          </div>
        </div>
      </nav>
      {children}
    </>
  )
}
