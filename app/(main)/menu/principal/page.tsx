import ProductCard from "../ProductCard";
export default function MenuPage() {
  const productos = [
    { nombre: "Risotto de Hongos", desc: "Arroz arbóreo, hongos", precio: "$18.99" },
    { nombre: "Pizza Margarita", desc: "Salsa de tomate, mozzarella, albahaca", precio: "$14.99" },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Principal</h1>

      {/* Productos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {productos.map((p, i) => (
          <ProductCard name={p.nombre} description={p.desc} price={p.precio} />
        ))}
      </div>
    </div>
  )
}