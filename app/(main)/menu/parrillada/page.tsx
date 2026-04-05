import ProductCard from "../ProductCard";
export default function MenuPage() {
  
    const productos_parrillada=[
        {nombre:"Mixta",desc:"Chuleta/pollo/ahumado/chorizo/brocheta/salteado de vegetales/vianda frita",precio:"$9500"},
        {nombre:"Montada",desc:"Bistec/chorizo/ahumado/huevo/vegetales salteados/viandas frita/salsa roja",precio:""},
        {nombre:"Cordero",desc:"Pierna de cordero al carbón con salsa roja",precio:""},
    ]
  
    return (
    <div className="container mx-auto px-4 py-8">
      
      <h1 className="text-4xl font-bold text-center mb-8">Parrillada</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productos_parrillada.map((p, i) => (
         <ProductCard name={p.nombre} description={p.desc} price={p.precio} />
        ))}
      </div>
    </div>
  )
}