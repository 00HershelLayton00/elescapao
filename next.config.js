// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Esto habilita la exportación estática
  images: {
    unoptimized: true, // Necesario para imágenes estáticas
  },
  // Opcional: Si tienes rutas dinámicas
  trailingSlash: true, // Mejora compatibilidad con servidores estáticos
}

module.exports = nextConfig