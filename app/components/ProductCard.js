"use client";

import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart, cart, updateQuantity } = useCart();
  const existing = cart.find((item) => item.id === product.id);

  return (
    <div className="bg-white text-neutral-800 rounded-2xl shadow-md overflow-hidden border-almond hover:shadow-xl transition-shadow">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-56 object-cover"
      />

      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-softblack">{product.name}</h3>
        <p className="text-softblack text-sm leading-relaxed">{product.description}</p>

        {product.disponibleHoy ? (
          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
            Disponible hoy
          </span>
        ) : (
          <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
            Entrega después de 24 hrs.
          </span>
        )}

        <div className="flex items-center justify-between mt-2">
          <span className="text-brand-brown font-bold text-xl">
            ${product.price}
          </span>

          {existing ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(product.id, existing.qty - 1)}
                className="w-8 h-8 grid place-content-center rounded-full bg-almond text-brown"
              >
                –
              </button>
              <span className="w-6 text-center">{existing.qty}</span>
              <button
                onClick={() => updateQuantity(product.id, existing.qty + 1)}
                className="w-8 h-8 grid place-content-center rounded-full bg-brown text-white"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={() => addToCart(product)}
              className="px-4 py-2 rounded-xl bg-brown text-white hover:bg-brown/90 transition-all"
            >
              Agregar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
