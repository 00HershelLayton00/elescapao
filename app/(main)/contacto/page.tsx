export default function ContactoPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold text-center mb-8">📍 Contacto y Dirección</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Información de contacto */}
        <div className="bg-gray-50 rounded-lg p-6 space-y-4">
          <h2 className="text-2xl font-bold mb-4">Información</h2>
          
          <div>
            <h3 className="font-bold text-lg flex items-center gap-2">📍 Dirección</h3>
            <p className="text-gray-600 ml-6">Calle Principal #123</p>
            <p className="text-gray-600 ml-6">Centro, Ciudad</p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg flex items-center gap-2">📞 Teléfono</h3>
            <p className="text-gray-600 ml-6">+52 555 123 4567</p>
            <p className="text-gray-600 ml-6">+52 555 765 4321</p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg flex items-center gap-2">⏰ Horario</h3>
            <p className="text-gray-600 ml-6">Lunes a Jueves: 12:00 - 22:00</p>
            <p className="text-gray-600 ml-6">Viernes a Domingo: 12:00 - 00:00</p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg flex items-center gap-2">📧 Email</h3>
            <p className="text-gray-600 ml-6">contacto@mirestaurante.com</p>
            <p className="text-gray-600 ml-6">reservas@mirestaurante.com</p>
          </div>
        </div>

        {/* Mapa placeholder */}
        <div className="bg-gray-200 rounded-lg p-6 flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-gray-500 text-lg">🗺️</p>
            <p className="text-gray-500">Mapa interactivo</p>
            <p className="text-gray-400 text-sm">(Aquí iría Google Maps)</p>
          </div>
        </div>
      </div>

      {/* Redes sociales */}
      <div className="mt-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Síguenos</h2>
        <div className="flex justify-center gap-6">
          <span className="text-3xl">📘</span>
          <span className="text-3xl">📷</span>
          <span className="text-3xl">🐦</span>
        </div>
      </div>
    </div>
  )
}
