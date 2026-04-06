// app/menu/[category]/page.tsx
import { MENU_DATA } from "../../menu"; // Ajusta la ruta a tu archivo
import ProductCard from "../../../component/ProductCard";
import { notFound } from "next/navigation";

export default function CategoryPage({ params }: { params: { category: string } }) {
  // Buscamos la categoría en el array que creamos antes
  // El id debe coincidir con el nombre en la URL (ej: "bebidas", "entradas")
  const categoryData = MENU_DATA.find(item => item.id === params.category);

  if (!categoryData) {
    notFound(); // Si la categoría no existe en el array, muestra un 404
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12 text-[#3D2B1F] uppercase tracking-widest">
        {categoryData.titulo}
      </h1>

      {categoryData.subcategorias.map((sub, idx) => (
        <div key={idx} className="mb-16">
          {/* Título de la subcategoría (ej: "Sopas y Potajes") */}
          <h2 className="text-2xl font-semibold mb-6 border-b-2 border-[#4E342E]/20 pb-2 text-[#4E342E]">
            {sub.nombre}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sub.productos.map((p, i) => (
              <ProductCard 
                key={i}
                name={p.nombre} 
                description={p.desc} 
                price={p.precio} 
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}