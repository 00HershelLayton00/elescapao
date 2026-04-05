import ProductCard from "../ProductCard";
export default function MenuPage() {
  const productos_puerco = [
    {nombre:"Bistec Encebollado",desc:"",precio:"$3800"},
    {nombre:"Bistec Natural",desc:"",precio:"$3000"},
    {nombre:"Oreja de Elefante",desc:"1lb de carne de cerdo empanizado y gratinado con queso",precio:"$4800"},
    {nombre:"Cerdo campesino",desc:"1lb de carne de cerdo empanizado y relleno con pollo, vegetales y gratinado con queso",precio:"$4900"},
    {nombre:"Costilla Escapá",desc:"4lb de costilla asada y terminada al carbón/casabe/guarnición de presentación",precio:"$9000",},
    {nombre:"Lonjas de cerdo criolla",desc:"",precio:"$3800"},
    {nombre:"Lonjas de cerdo ahumado",desc:"",precio:"$3900"},
    {nombre:"Fajitas de Cerdo Natural con Vegetales",desc:"",precio:"$3000"},
    {nombre:"Fajitas de Cerdo Natural",desc:"",precio:"$3000"},
    {nombre:"Pernil de cerdo asado",desc:"Preguntar al mesero",precio:""},
    {nombre:"Fricasé de cerdo",desc:"",precio:"$3800"},
    {nombre:"Cerdo asado entero",desc:"Bajo pedido",precio:"$"},
    {nombre:"Chuleta Criolla/2lb al carbón",desc:"Cebolla/gratinada con queso/vegetales salteados",precio:"$4000",},
    {nombre:"Masas de Cerdo Frita",desc:"Doradas/secas",precio:"$3000"},
    {nombre:"Escapá",desc:"Con cebolla",precio:"$3600",},
    {nombre:"Braba",desc:"Salsa roja/vegetales/picante",precio:"$3800",},
  ]

  const Productos_cordero=[
    {nombre:"Cordero al Corte en su salsa",desc:"Sellado al carbón y cocinado en cerveza más agregados secretos",precio:"$4800",},
    {nombre:"Pierna de Cordero al carbón",desc:"Salsa roja/vegetales/picante",precio:"$8000",},
    {nombre:"Costilla de Obejo al carbón",desc:"Salsa roja/vegetales/picante",precio:"",},
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      
      <h1 className="text-4xl font-bold text-center mb-8">Plato Fuerte de Cerdo</h1>
      {/* productos_puerco*/}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productos_puerco.map((p, i) => (
          <ProductCard name={p.nombre} description={p.desc} price={p.precio} />
        ))}
      </div>

      <h1 className="text-4xl font-bold text-center mb-8">Plato Fuerte de Cordero</h1>
      {/* productos_puerco*/}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Productos_cordero.map((p, i) => (
          <ProductCard name={p.nombre} description={p.desc} price={p.precio} />
        ))}
      </div>
    </div>
  )
}