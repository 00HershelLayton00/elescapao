import ProductCard from "../ProductCard";
export default function MenuPage() {
  const productos_entrantes = [
    {nombre:"Croquetas de pescado",desc:"",precio: "$3000",},
    {nombre:"Croquetas de Camarón",desc:"",precio: "$3000",},
    {nombre:"Croqueta de Ahumada",desc:"",precio: "$3000",},
    {nombre:"Croqueta de Queso",desc:"",precio: "$3000",},
    {nombre:"Brochetas de Cerdo",desc:"",precio: "$3800",},
    {nombre:"Brochetas de Pollo",desc:"",precio: "$3800",},
    {nombre:"Brochetas de vegetales",desc:"",precio: "$3800",},
    {nombre:"Albóndigas de Cerdo",desc:"100% Carne",precio: "$3000",},
    {nombre:"Tira cervecera",desc:"Chorizo de cerdo hecho en casa",precio: "$3000",},
    {nombre:"Ají Relleno",desc:"Pimiento relleno con carne de cerdo y gratinado con queso",precio: "$3000",},
    {nombre:"Picada Escapa",desc:"Bolita de queso, brocheta, masa frita, chorizo, Croquetas, pizza napolitana",precio: "",}
  ]
  const productos_aperitivos=[    
    {nombre:"Sopa del día de Res",desc:"",precio: "900",},
    {nombre:"Sopa del día de Pollo",desc:"",precio: "900",},
    {nombre:"Sopa del día de vegetales",desc:"",precio: "1000",},
    {nombre:"Aguado de Pollo",desc:"Sopa de arroz",precio: "1000",},
    {nombre:"Caldo Gallego",desc:"Garvanzo y Chorizo",precio: "",},
    {nombre:"Potaje de frijol negro/rojo",desc:"",precio: "1000",},
    {nombre:"Ajiaco",desc:"",precio: "1000",},
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Entrantes</h1>

      {/* Productos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productos_entrantes.map((p, i) => (
          <ProductCard name={p.nombre} description={p.desc} price={p.precio} />
        ))}
      </div>

      <h1 className="text-4xl font-bold text-center mb-8">Aperitivos</h1>

      {/* Productos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productos_aperitivos.map((p, i) => (
          <ProductCard name={p.nombre} description={p.desc} price={p.precio} />
        ))}
      </div>
    </div>
  )
}