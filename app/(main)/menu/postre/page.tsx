import ProductCard from "../ProductCard";
export default function MenuPage() {
  const productos_postres=[
    {nombre:"Flan de leche",desc:"",precio:"$750"},
    {nombre:"Tres leches",desc:"",precio:"$1000"},
    {nombre:"Postre de la casa",desc:"",precio:""},
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Postres</h1>

      {/* Productos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productos_postres.map((p, i) => (
         <ProductCard name={p.nombre} description={p.desc} price={p.precio} />
        ))}
      </div>
    </div>
  )
}