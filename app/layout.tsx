import type { Metadata } from 'next'
import './globals.css'



export const metadata: Metadata = {
  title: 'Elescapao',
  description: 'Las cosas son cuando Son!!!',
  icons:{
    icon: 'favicon.ico',
    shortcut: 'favicon.ico',
    apple: 'favicon.ico',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
