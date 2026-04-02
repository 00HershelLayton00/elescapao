export default function CombosPage() {
  const combos = [
    { 
      nombre: "🍕 Combo Familiar", 
      items: "2 pizzas grandes + 2 bebidas 2L + postre familiar", 
      precio: "$35.99",
      ahorro: "Ahorras $8.00"
    },
    { 
      nombre: "💑 Combo Romántico", 
      items: "1 entrada compartida + 2 platos principales + 1 botella de vino", 
      precio: "$42.99",
      ahorro: "Ahorras $12.00"
    },
    { 
      nombre: "👔 Combo Ejecutivo", 
      items: "Plato principal + bebida + postre del día", 
      precio: "$15.99",
      ahorro: "Ahorras $5.00"
    },
    { 
      nombre: "🍔 Combo Hamburguesa", 
      items: "Hamburguesa + papas + refresco", 
      precio: "$12.99",
      ahorro: "Ahorras $4.00"
    },
    { 
      nombre: "🎉 Combo Fiesta", 
      items: "3 entradas + 3 platos + 3 postres + 3 bebidas", 
      precio: "$59.99",
      ahorro: "Ahorras $15.00"
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-4">🎁 Ofertas y Combos</h1>
      <p className="text-center text-gray-600 mb-8">Los mejores precios en paquetes especiales</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {combos.map((combo, i) => (
          <div key={i} className="border-2 border-orange-200 rounded-lg p-6 bg-gradient-to-r from-orange-50 to-red-50 hover:shadow-xl transition">
            <h3 className="text-2xl font-bold text-orange-600">{combo.nombre}</h3>
            <p className="my-3 text-gray-700">{combo.items}</p>
            <p className="text-green-600 text-sm font-semibold">{combo.ahorro}</p>
            <p className="text-3xl font-bold mt-3 text-orange-600">{combo.precio}</p>
            <button className="mt-4 w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition">
              Ordenar ahora
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
