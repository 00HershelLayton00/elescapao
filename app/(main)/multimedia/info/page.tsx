export default function ColaInfoPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold mb-4">🔄 ¿Cómo funciona la descarga de archivos?</h1>
        
        <div className="space-y-4 text-gray-700">
          <p>
            Para garantizar que todos puedan acceder a los archivos sin que el servidor se sobrecargue, 
            implementamos un <strong>sistema de cola inteligente</strong>.
          </p>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h2 className="font-bold text-blue-800 mb-2">📋 ¿Qué significa esto para vos?</h2>
            <ul className="list-disc list-inside space-y-1 text-blue-700">
              <li>Podés hacer clic en "Descargar" como siempre</li>
              <li>Si hay mucha gente descargando, tu descarga espera su turno</li>
              <li>El sistema te avisará con un mensaje amigable si está ocupado</li>
              <li>Solo tenés que esperar unos segundos y reintentar</li>
            </ul>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h2 className="font-bold text-green-800 mb-2">💡 Consejos</h2>
            <ul className="list-disc list-inside space-y-1 text-green-700">
              <li>Si ves el mensaje "servidor ocupado", esperá 10-15 segundos</li>
              <li>Los archivos muy grandes pueden tardar más en procesarse</li>
              <li>Evitá descargar el mismo archivo muchas veces seguidas</li>
            </ul>
          </div>
          
          <p className="text-sm text-gray-500 mt-6">
            Este sistema nos permite ofrecer un servicio más estable para todos.
          </p>
        </div>
      </div>
    </div>
  );
}