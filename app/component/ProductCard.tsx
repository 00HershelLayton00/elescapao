import React from 'react';

interface ProductCardProps {
  name: string;
  description: string;
  price: number | string;
  icon?: string;
  rating?: number | string; // Puede ser 4.5, "★★★★☆", 5, etc.
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  name, 
  description, 
  price, 
  icon = '🌿',
  rating = 0 
}) => {
  
  // Función para renderizar estrellas (si recibes número)
  const renderStars = () => {
    if (typeof rating === 'number') {
      const fullStars = Math.floor(rating);
      const hasHalfStar = rating % 1 >= 0.5;
      const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
      
      return (
        <div className="flex gap-0.5 text-[#FFD700] text-base">
          {'★'.repeat(fullStars)}
          {hasHalfStar && '½'}
          {'☆'.repeat(emptyStars)}
        </div>
      );
    }
    
    // Si ya viene como string (ej: "★★★★☆")
    return <div className="text-[#FFD700] text-base tracking-wide">{rating}</div>;
  };

  return (
    <div className="relative group w-full h-full overflow-hidden rounded-[22px] flex bg-[#442E20] bg-[url('/images/purty_wood.jpeg')] bg-repeat shadow-black shadow-md border-4 border-[#BDA67C]">
      
      {/* Doble borde decorativo */}
      <div className="absolute inset-1 border border-[#f2e2ce]/20 rounded-[18px] pointer-events-none z-20"></div>

      {/* Cuerpo de la Tarjeta */}
      <div className="relative z-10 p-7 flex-1 flex flex-col justify-between transition-all duration-300 group-hover:bg-black/10">
        
        {/* Fila superior: Nombre (izquierda) + Precio (derecha) */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-2xl font-bold text-[#f2e2ce] drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] tracking-tight leading-tight">
            {name}
          </h3>
          
          {/* Precio arriba a la derecha */}
          <div className="flex items-baseline gap-1 bg-black/20 px-3 py-1.5 rounded-full backdrop-blur-sm shrink-0 ml-4">
            <span className="text-[10px] font-bold text-[#f2e2ce]/70 uppercase tracking-wider">$</span>
            <span className="text-xl font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
              {typeof price === 'number' ? price.toLocaleString('es-ES') : price}
            </span>
          </div>
        </div>

        {/* Descripción */}
        <div className="flex-1">
          <p className="text-[#c5a88a] text-sm mt-2 font-medium italic opacity-90 line-clamp-3">
            {description}
          </p>
        </div>

        {/* Fila inferior: Estrellas (izquierda) + Icono (derecha) */}
        <div className="mt-5 flex justify-between items-end">
          {/* Estrellas */}
          <div className="flex flex-col gap-0.5">
            {renderStars()}
            {typeof rating === 'number' && rating > 0 && (
              <span className="text-[10px] text-[#c5a88a]/60 font-mono">
                {rating}/5
              </span>
            )}
          </div>

          {/* Icono abajo a la derecha - con la misma lógica original */}
          <div className="text-2xl opacity-20 grayscale group-hover:opacity-50 group-hover:grayscale-0 transition-all duration-500 shrink-0">
            {icon}
          </div>
        </div>
      </div>

      {/* Brillo superior 3D */}
      <div className="absolute inset-x-0 top-0 h-px bg-white/10 rounded-t-[22px] z-30 pointer-events-none"></div>
    </div>
  );
};

export default ProductCard;
