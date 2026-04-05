import ProductCard from "../ProductCard";
export default function MenuPage() {
  const productos_guarnicion=[
{nombre:"Arroz blanco",desc:"",precio:"$600"},
{nombre:"Arroz frito",desc:"",precio:"$3000/3600"},
{nombre:"Congris",desc:"Frijol negro",precio:"$800"},
{nombre:"Arroz con Maíz",desc:"",precio:"$1000"},
{nombre:"Arroz con Vegetales",desc:"",precio:"$1900"},
{nombre:"Arroz con Camarón",desc:"",precio:"$2900"},
{nombre:"Arroz con cerdo",desc:"",precio:"$1500"},
]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Guarniciones</h1>

      {/* Productos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productos_guarnicion.map((p, i) => (
         <ProductCard name={p.nombre} description={p.desc} price={p.precio} />
        ))}
      </div>
    </div>
  )
}