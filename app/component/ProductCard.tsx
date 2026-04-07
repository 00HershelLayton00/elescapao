import React from 'react';

interface ProductCardProps {
  name: string;
  description: string;
  price: number | string;
  icon?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, description, price, icon = '🌿' }) => {
  return (
    <div className="relative group w-full h-full overflow-hidden rounded-[22px] flex bg-[#442E20] bg-[url('/images/purty_wood.jpeg')] bg-repeat  shadow-black shadow-md border-4 border-[#BDA67C]">
      
      {/* === ESTILO 3: DOBLE BORDE (MARCO INTERNO) === */}
      {/* Este div crea la línea fina decorativa que enmarca el contenido */}
      <div className="absolute inset-1 border border-[#f2e2ce]/20 rounded-[18px] pointer-events-none z-20"></div>

      {/* Cuerpo de la Tarjeta */}
      <div className="relative z-10 p-7 flex-1 flex flex-col justify-between transition-all duration-300 group-hover:bg-black/10">
        
        {/* Contenido Superior */}
        <div className="flex justify-between items-start mb-4">
          <div className="max-w-[80%]">
            <h3 className="text-2xl font-bold text-[#f2e2ce] drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] tracking-tight leading-tight">
              {name}
            </h3>
            <p className="text-[#c5a88a] text-sm mt-2 font-medium italic opacity-90 line-clamp-3">
              {description}
            </p>
          </div>

          <div className="text-2xl opacity-20 grayscale group-hover:opacity-50 group-hover:grayscale-0 transition-all duration-500 shrink-0">
            {icon}
          </div>
        </div>

        {/* Precio Inferior */}
        <div className="mt-auto pt-4 flex items-baseline gap-1">
          <span className="text-3xl font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
             {typeof price === 'number' ? price.toLocaleString('es-ES') : price}
          </span>
        </div>
      </div>

      {/* Brillo sutil en el borde superior externo para realismo 3D */}
      <div className="absolute inset-x-0 top-0 h-px bg-white/10 rounded-t-[22px] z-30 pointer-events-none"></div>
    </div>
  );
};

export default ProductCard;