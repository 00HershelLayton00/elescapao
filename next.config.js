/** @type{import('next').NextConfig} */

const nextConfig = {
  output: 'standalone',
  // Si usas imágenes (next/image), Tailwind se encarga del CSS, 
  // pero las imágenes necesitan este ajuste si no hay servidor de optimización:
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
