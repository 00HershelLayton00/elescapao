import React from 'react';

interface ProductCardProps {
    name: string;
    description: string;
    price: number | string;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, description, price }) => {
    return (
        <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold">{name}</h3>
            <p className="text-gray-600 text-sm mt-1">{description}</p>
            <p className="text-2xl font-bold text-orange-600 mt-3">
                {typeof price === 'number' ? `$${price.toLocaleString('es-ES')}` : price}
            </p>
            {/* <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                Agregar al carrito
            </button> */}
        </div>
    );
};

export default ProductCard;