import ProductCard from "../ProductCard";
export default function MenuPage() {
  
    const productos_viandas_fritas=[
{nombre:"Patacon",desc:"",precio:"$900"},
{nombre:"Chifles",desc:"",precio:"$900"},
{nombre:"Boniato",desc:"",precio:"$900"},
{nombre:"Maduro",desc:"",precio:"$900"},
]

const productos_vianda_hervida=[
{nombre:"Boniato",desc:"",precio:"$700"},
{nombre:"Fufu de plátano",desc:"",precio:"$900"},
{nombre:"Yuca con mojo",desc:"",precio:"$800"},
{nombre:"Calabaza",desc:"",precio:"$700"},
{nombre:"Plátano troceado",desc:"",precio:"$800"},
{nombre:"Matajíbaro",desc:"Plátano verde frito y mojado con chicharrón y agua al gusto",precio:"$1100"},
]

  return (
    <div className="container mx-auto px-4 py-8">
      
      <h1 className="text-4xl font-bold text-center mb-8">Viandas Fritas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productos_viandas_fritas.map((p, i) => (
         <ProductCard name={p.nombre} description={p.desc} price={p.precio} />
        ))}
      </div>

      <h1 className="text-4xl font-bold text-center mb-8">Viandas Hervidas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productos_vianda_hervida.map((p, i) => (
         <ProductCard name={p.nombre} description={p.desc} price={p.precio} />
        ))}
      </div>

    </div>
  )
}