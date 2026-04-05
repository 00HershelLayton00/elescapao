import ProductCard from "../ProductCard";
export default function MenuPage() {
  
    const productos_hamburguesas=[
{nombre:"Hamburguesa San Pepper S",desc:"Libra de carne de cerdo/queso/salsas/tomate/lechuga/cebolla",precio:"$3900"},
]

const productos_pizzas=[
{nombre:"Pizza Nappolitana",desc:"",precio:"$2800"},
{nombre:"Pizza Escapá",desc:"Carne de cerdo asado/chorizo/vegetales",precio:"$3800"},
{nombre:"Pizza Nostra",desc:"Carne molida/salsa roja/queso/cebolla",precio:"$3000"},
]

const productos_paellas=[
{nombre:"Paella Campesina ",desc:"Cerdo/pollo",precio:""},
{nombre:"Paella Mar/Tierra",desc:"Cerdo/pollo/camarón",precio:""},
]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Hamburguesa</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productos_hamburguesas.map((p, i) => (
         <ProductCard name={p.nombre} description={p.desc} price={p.precio} />
        ))}
      </div>

        <h1 className="text-4xl font-bold text-center mb-8">Pizza</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productos_pizzas.map((p, i) => (
         <ProductCard name={p.nombre} description={p.desc} price={p.precio} />
        ))}
      </div>

        <h1 className="text-4xl font-bold text-center mb-8">Paella</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productos_paellas.map((p, i) => (
         <ProductCard name={p.nombre} description={p.desc} price={p.precio} />
        ))}
      </div>
    </div>
  )
}