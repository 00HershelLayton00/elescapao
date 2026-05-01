//deepseek
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: { unoptimized: true },
};

module.exports = nextConfig;


// //standalone
// /** @type{import('next').NextConfig} */

// const nextConfig = {
//   output: 'standalone',
//   // Si usas imágenes (next/image), Tailwind se encarga del CSS, 
//   // pero las imágenes necesitan este ajuste si no hay servidor de optimización:
//   images: {
//     unoptimized: true,
//   },
// };

// module.exports = nextConfig;




// // next.config.js
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   output: 'export',  // Esto habilita la exportación estática
//   images: {
//     unoptimized: true, // Necesario para imágenes estáticas
//   },
//   // Opcional: Si tienes rutas dinámicas
//   trailingSlash: true, // Mejora compatibilidad con servidores estáticos
// }

// module.exports = nextConfig

