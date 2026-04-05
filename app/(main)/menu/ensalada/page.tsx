import ProductCard from "../ProductCard";
export default function MenuPage() {
  
  const productos_ensalada=[
    {nombre:"Mixta",desc:"Vegetales de Estación ",precio:"$900"},
    {nombre:"Pimientos Asados ",desc:"",precio:"$900"},
    {nombre:"Remolacha",desc:"",precio:"$800"},
    {nombre:"Salteados de Vegetales",desc:"",precio:"$1000"},
    {nombre:"Ensalada Escapá",desc:"Pollo/cool/zanahoria/ vinagreta de la casa/queso al gusto",precio:"$3500"},
  ]
    return (
    <div className="container mx-auto px-4 py-8">
      
      <h1 className="text-4xl font-bold text-center mb-8">Ensaladas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productos_ensalada.map((p, i) => (
         <ProductCard name={p.nombre} description={p.desc} price={p.precio} />
        ))}
      </div>
    </div>
  )
}