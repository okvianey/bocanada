'use client'
import Image from "next/image";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";


export default function Destacados({ product }) {
  const { addToCart, cart, updateQuantity } = useCart();
  const isFavorito = products.filter((p) => p.favorito);
  const existing = cart.find((item) => item.id === isFavorito.id);
    
  
  return (
     <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="font-title text-3xl text-softblack text-center mb-12">
          Favoritos de la casa
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
        {
          isFavorito.map((product, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-sm p-4 hover:shadow-md transition"
            >
              <div className="relative w-full h-56 mb-3">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover rounded-xl"
                />
              </div>

              <h3 className="font-title text-xl text-softblack">{product.name}</h3>
              <p className="text-softblack/60 mt-1 text-sm">
                {product.description}
              </p>

              <div className="flex items-center justify-between mt-2">
                <span className="text-brand-brown font-bold text-xl">
                  ${product.price}
                </span>

              { existing ? (
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

          ))}
        
        



        </div>
      </section>
  );
}
