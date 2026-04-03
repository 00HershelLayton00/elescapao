
export default function MenuPageVIP() {
  const productos = [
    { nombre: "Ensalada César", desc: "Pollo, lechuga, parmesano", precio: "$12.99" },
    { nombre: "Risotto de Hongos", desc: "Arroz arbóreo, hongos", precio: "$18.99" },
    { nombre: "Brownie con Helado", desc: "Chocolate caliente con helado", precio: "$7.99" },
    { nombre: "Limonada Natural", desc: "Fresca con hierbabuena", precio: "$4.99" },
    { nombre: "Pizza Margarita", desc: "Salsa de tomate, mozzarella, albahaca", precio: "$14.99" },
    { nombre: "Tiramisú", desc: "Postre italiano con café", precio: "$6.99" }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-5xl font-bold text-center mb-8 text-yellow-600">VIP</h1>

      {/* Productos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productos.map((p, i) => (
          <div key={i} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-yellow-600">{p.nombre}</h3>
            <p className="text-red-500 text-sm mt-1">{p.desc}</p>
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