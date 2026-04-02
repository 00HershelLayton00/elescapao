export default function MenuPage() {
  const productos = [
    { nombre: "Ensalada César", desc: "Pollo, lechuga, parmesano", precio: "$12.99", categoria: "Entrada" },
    { nombre: "Risotto de Hongos", desc: "Arroz arbóreo, hongos", precio: "$18.99", categoria: "Principal" },
    { nombre: "Brownie con Helado", desc: "Chocolate caliente con helado", precio: "$7.99", categoria: "Postre" },
    { nombre: "Limonada Natural", desc: "Fresca con hierbabuena", precio: "$4.99", categoria: "Bebida" },
    { nombre: "Pizza Margarita", desc: "Salsa de tomate, mozzarella, albahaca", precio: "$14.99", categoria: "Principal" },
    { nombre: "Tiramisú", desc: "Postre italiano con café", precio: "$6.99", categoria: "Postre" }
  ]

  const categorias = ["Todos", "Entrada", "Principal", "Postre", "Bebida"]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">📋 Nuestro Menú</h1>
      
      {/* Categorías */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categorias.map((cat, i) => (
          <button key={i} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-orange-600 hover:text-white transition">
            {cat}
          </button>
        ))}
      </div>

      {/* Productos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productos.map((p, i) => (
          <div key={i} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold">{p.nombre}</h3>
            <p className="text-gray-600 text-sm mt-1">{p.desc}</p>
            <p className="text-orange-600 text-sm mt-1">{p.categoria}</p>
            <p className="text-2xl font-bold text-orange-600 mt-3">{p.precio}</p>
            <button className="mt-3 w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition">
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
