// app/menu/[category]/page.tsx
import { MENU_DATA } from "../../menu"; 
import ProductCard from "../../../component/ProductCard";
import { notFound } from "next/navigation";

export default function CategoryPage({ params }: { params: { category: string } }) {
  const categoryData = MENU_DATA.find(item => item.id === params.category);

  if (!categoryData) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-7xl mx-auto">
        
        {categoryData.subcategorias.map((sub, idx) => (
          <div key={idx} className="mb-24 last:mb-0">
            
            {/* === SUBCATEGORÍA CENTRADA CON LÍNEAS === */}
            <div className="flex items-center justify-center gap-6 mb-12">
              {/* Línea decorativa Izquierda */}
              <div className="hidden sm:block h-[2px] flex-1 bg-gradient-to-l from-[#4E342E]/60 to-transparent"></div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-[#4E342E] text-center uppercase tracking-widest px-4">
                {sub.nombre}
              </h2>
              
              {/* Línea decorativa Derecha */}
              <div className="hidden sm:block h-[2px] flex-1 bg-gradient-to-r from-[#4E342E]/60 to-transparent"></div>
            </div>

            {/* Grid de productos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-stretch">
              {sub.productos.map((p, i) => (
                <div key={i} className="flex">
                  <ProductCard 
                    name={p.nombre} 
                    description={p.desc} 
                    price={p.precio}
                    rating={p.rating} 
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        
      </div>
    </div>
  );
}