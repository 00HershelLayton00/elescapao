import Image from "next/image"
export default function MenuPage() {

  const categorias = ["Todos", "Entrada", "Principal", "Postre", "Bebida", "VIP"]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">📋 Nuestro Menú</h1>
      <Image
        src="/images/prueba.png"
        alt="Descripción de la foto"
        width={500}
        height={300}
        className="rounded-lg"
      />
    </div>
  )
}
