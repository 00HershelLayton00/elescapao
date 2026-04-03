
export default function MenuPage() {
  const productos = [
    { nombre: "Brownie con Helado", desc: "Chocolate caliente con helado", precio: "$7.99" },
    { nombre: "Tiramisú", desc: "Postre italiano con café", precio: "$6.99" }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Postres</h1>

      {/* Productos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productos.map((p, i) => (
          <div key={i} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold">{p.nombre}</h3>
            <p className="text-gray-600 text-sm mt-1">{p.desc}</p>
            <p className="text-2xl font-bold text-orange-600 mt-3">{p.precio}</p>
            <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}