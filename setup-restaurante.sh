#!/bin/bash

set -e

echo "🚀 Iniciando setup del Restaurante App..."

# 1. CREAR TODAS LAS CARPETAS PRIMERO
echo "📁 Creando estructura de carpetas..."

mkdir -p app/\(auth\)/login
mkdir -p app/\(auth\)/register
mkdir -p app/\(main\)/menu
mkdir -p app/\(main\)/combos
mkdir -p app/\(main\)/carrito
mkdir -p app/\(main\)/perfil
mkdir -p app/\(main\)/contacto
mkdir -p app/api/auth/\[...nextauth\]
mkdir -p app/api/products
mkdir -p app/api/orders
mkdir -p app/api/user
mkdir -p components/ui
mkdir -p lib
mkdir -p prisma

# 2. CREAR ARCHIVOS DE CONFIGURACIÓN

# package.json
cat > package.json << 'EOF'
{
  "name": "restaurante-app",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "14.0.4",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/node": "^20.10.5",
    "@types/react": "^18.2.45",
    "@types/react-dom": "^18.2.18",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.3.3"
  }
}
EOF

# tailwind.config.ts
cat > tailwind.config.ts << 'EOF'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
export default config
EOF

# postcss.config.js
cat > postcss.config.js << 'EOF'
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOF

# tsconfig.json
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
EOF

# app/globals.css
cat > app/globals.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;
EOF

# app/layout.tsx
cat > app/layout.tsx << 'EOF'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mi Restaurante',
  description: 'La mejor comida',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
EOF

# app/(main)/layout.tsx
cat > app/\(main\)/layout.tsx << 'EOF'
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
EOF

# app/(main)/page.tsx
cat > app/\(main\)/page.tsx << 'EOF'
export default function Home() {
  const actividades = [
    { titulo: "🍕 Noche de Pizza", fecha: "20 Enero", desc: "50% off en todas las pizzas" },
    { titulo: "🍷 Cata de Vinos", fecha: "25 Enero", desc: "Degustación exclusiva" },
    { titulo: "🎉 Happy Hour", fecha: "21 Enero", desc: "2x1 en bebidas" }
  ]

  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">¡Bienvenido a Mi Restaurante!</h1>
          <p className="text-xl mb-8">Sabores que enamoran, precios que encantan</p>
        </div>
      </div>

      {/* Galería de fotos */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">📸 Nuestro Espacio</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-200 h-48 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Foto del restaurante 1</span>
          </div>
          <div className="bg-gray-200 h-48 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Foto del restaurante 2</span>
          </div>
          <div className="bg-gray-200 h-48 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Foto del restaurante 3</span>
          </div>
        </div>
      </div>

      {/* Próximas actividades */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">📅 Próximas Actividades</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {actividades.map((act, i) => (
              <div key={i} className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-bold">{act.titulo}</h3>
                <p className="text-orange-600 font-semibold mt-2">{act.fecha}</p>
                <p className="text-gray-600 mt-2">{act.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
EOF

# app/(main)/menu/page.tsx
cat > app/\(main\)/menu/page.tsx << 'EOF'
export default function MenuPage() {
  const productos = [
    { nombre: "Ensalada César", desc: "Pollo, lechuga, parmesano", precio: "$12.99", categoria: "Entrada" },
    { nombre: "Risotto de Hongos", desc: "Arroz arbóreo, hongos", precio: "$18.99", categoria: "Principal" },
    { nombre: "Brownie con Helado", desc: "Chocolate caliente con helado", precio: "$7.99", categoria: "Postre" },
    { nombre: "Limonada Natural", desc: "Fresca con hierbabuena", precio: "$4.99", categoria: "Bebida" },
    { nombre: "Pizza Margarita", desc: "Salsa de tomate, mozzarella, albahaca", precio: "$14.99", categoria: "Principal" },
    { nombre: "Tiramisú", desc: "Postre italiano con café", precio: "$6.99", categoria: "Postre" }
  ]

  const categorias = ["Todos", "Entrada", "Principal", "Postre", "Bebida"]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">📋 Nuestro Menú</h1>
      
      {/* Categorías */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categorias.map((cat, i) => (
          <button key={i} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-orange-600 hover:text-white transition">
            {cat}
          </button>
        ))}
      </div>

      {/* Productos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productos.map((p, i) => (
          <div key={i} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold">{p.nombre}</h3>
            <p className="text-gray-600 text-sm mt-1">{p.desc}</p>
            <p className="text-orange-600 text-sm mt-1">{p.categoria}</p>
            <p className="text-2xl font-bold text-orange-600 mt-3">{p.precio}</p>
            <button className="mt-3 w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition">
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
EOF

# app/(main)/combos/page.tsx
cat > app/\(main\)/combos/page.tsx << 'EOF'
export default function CombosPage() {
  const combos = [
    { 
      nombre: "🍕 Combo Familiar", 
      items: "2 pizzas grandes + 2 bebidas 2L + postre familiar", 
      precio: "$35.99",
      ahorro: "Ahorras $8.00"
    },
    { 
      nombre: "💑 Combo Romántico", 
      items: "1 entrada compartida + 2 platos principales + 1 botella de vino", 
      precio: "$42.99",
      ahorro: "Ahorras $12.00"
    },
    { 
      nombre: "👔 Combo Ejecutivo", 
      items: "Plato principal + bebida + postre del día", 
      precio: "$15.99",
      ahorro: "Ahorras $5.00"
    },
    { 
      nombre: "🍔 Combo Hamburguesa", 
      items: "Hamburguesa + papas + refresco", 
      precio: "$12.99",
      ahorro: "Ahorras $4.00"
    },
    { 
      nombre: "🎉 Combo Fiesta", 
      items: "3 entradas + 3 platos + 3 postres + 3 bebidas", 
      precio: "$59.99",
      ahorro: "Ahorras $15.00"
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-4">🎁 Ofertas y Combos</h1>
      <p className="text-center text-gray-600 mb-8">Los mejores precios en paquetes especiales</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {combos.map((combo, i) => (
          <div key={i} className="border-2 border-orange-200 rounded-lg p-6 bg-gradient-to-r from-orange-50 to-red-50 hover:shadow-xl transition">
            <h3 className="text-2xl font-bold text-orange-600">{combo.nombre}</h3>
            <p className="my-3 text-gray-700">{combo.items}</p>
            <p className="text-green-600 text-sm font-semibold">{combo.ahorro}</p>
            <p className="text-3xl font-bold mt-3 text-orange-600">{combo.precio}</p>
            <button className="mt-4 w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition">
              Ordenar ahora
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
EOF

# app/(main)/contacto/page.tsx
cat > app/\(main\)/contacto/page.tsx << 'EOF'
export default function ContactoPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold text-center mb-8">📍 Contacto y Dirección</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Información de contacto */}
        <div className="bg-gray-50 rounded-lg p-6 space-y-4">
          <h2 className="text-2xl font-bold mb-4">Información</h2>
          
          <div>
            <h3 className="font-bold text-lg flex items-center gap-2">📍 Dirección</h3>
            <p className="text-gray-600 ml-6">Calle Principal #123</p>
            <p className="text-gray-600 ml-6">Centro, Ciudad</p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg flex items-center gap-2">📞 Teléfono</h3>
            <p className="text-gray-600 ml-6">+52 555 123 4567</p>
            <p className="text-gray-600 ml-6">+52 555 765 4321</p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg flex items-center gap-2">⏰ Horario</h3>
            <p className="text-gray-600 ml-6">Lunes a Jueves: 12:00 - 22:00</p>
            <p className="text-gray-600 ml-6">Viernes a Domingo: 12:00 - 00:00</p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg flex items-center gap-2">📧 Email</h3>
            <p className="text-gray-600 ml-6">contacto@mirestaurante.com</p>
            <p className="text-gray-600 ml-6">reservas@mirestaurante.com</p>
          </div>
        </div>

        {/* Mapa placeholder */}
        <div className="bg-gray-200 rounded-lg p-6 flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-gray-500 text-lg">🗺️</p>
            <p className="text-gray-500">Mapa interactivo</p>
            <p className="text-gray-400 text-sm">(Aquí iría Google Maps)</p>
          </div>
        </div>
      </div>

      {/* Redes sociales */}
      <div className="mt-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Síguenos</h2>
        <div className="flex justify-center gap-6">
          <span className="text-3xl">📘</span>
          <span className="text-3xl">📷</span>
          <span className="text-3xl">🐦</span>
        </div>
      </div>
    </div>
  )
}
EOF

# app/(auth)/layout.tsx
cat > app/\(auth\)/layout.tsx << 'EOF'
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      {children}
    </div>
  )
}
EOF

# app/(auth)/login/page.tsx
cat > app/\(auth\)/login/page.tsx << 'EOF'
'use client'

import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Demo: Sistema de autenticación en desarrollo')
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Iniciar Sesión</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <button type="submit" className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700">
            Ingresar
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          ¿No tienes cuenta? <a href="/register" className="text-orange-600">Regístrate</a>
        </p>
      </div>
    </div>
  )
}
EOF

# app/(auth)/register/page.tsx
cat > app/\(auth\)/register/page.tsx << 'EOF'
'use client'

import { useState } from 'react'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Demo: Sistema de registro en desarrollo')
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Crear Cuenta</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nombre completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <button type="submit" className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700">
            Registrarse
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          ¿Ya tienes cuenta? <a href="/login" className="text-orange-600">Inicia sesión</a>
        </p>
      </div>
    </div>
  )
}
EOF

echo ""
echo "✅ ¡PROYECTO CREADO CON ÉXITO!"
echo ""
echo "📋 Para iniciar el proyecto:"
echo "   npm install"
echo "   npm run dev"
echo ""
echo "🌐 Abrir en navegador: http://localhost:3000"
echo ""
echo "📂 Páginas disponibles:"
echo "   - /          (Inicio con actividades y fotos)"
echo "   - /menu      (Menú completo)"
echo "   - /combos    (Ofertas y combos)"
echo "   - /contacto  (Dirección y contactos)"
echo "   - /login     (Iniciar sesión)"
echo "   - /register  (Registro de usuarios)"