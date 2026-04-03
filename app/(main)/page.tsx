export default function Home() {
  const actividades = [
    { titulo: "🍕 Noche de Pizza", fecha: "20 Enero", desc: "50% off en todas las pizzas" },
    { titulo: "🍷 Cata de Vinos", fecha: "25 Enero", desc: "Degustación exclusiva" },
    { titulo: "🎉 Happy Hour", fecha: "21 Enero", desc: "2x1 en bebidas" }
  ]

  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-600 to-yellow-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Bienvenido al escapao</h1>
          <p className="text-xl mb-8">Donde las cosas son cuando SON!!</p>
        </div>
      </div>

      {/* Galería de fotos */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">📸 Nuestro Espacio</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-200 h-48 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Foto del restaurante 1</span>
          </div>
          <div className="bg-gray-200 h-48 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Foto del restaurante 2</span>
          </div>
          <div className="bg-gray-200 h-48 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Foto del restaurante 3</span>
          </div>
        </div>
      </div>

      {/* Próximas actividades */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">📅 Próximas Actividades</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {actividades.map((act, i) => (
              <div key={i} className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-bold">{act.titulo}</h3>
                <p className="text-orange-600 font-semibold mt-2">{act.fecha}</p>
                <p className="text-gray-600 mt-2">{act.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
