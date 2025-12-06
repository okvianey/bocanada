//products
export const products = [
  {
    id: 1,
    name: "Crokie lotus",
    price: 280,
    image: "/products/crokie-lotus.jpg",
    category: "crookies",
    description: "Suave, cremoso y con un toque de limón.",
    disponibleHoy: true
  },
  {
    id: 2,
    name: "Galletas Choco Chips (6 pz)",
    price: 90,
    image: "/products/maxi-chispas.jpg",
    category: "galletas",
    description: "Crujientes por fuera, suaves por dentro.",
    disponibleHoy: false
  },
  {
    id: 3,
    name: "Galletas Edam",
    price: 320,
    image: "/products/galletas-edam.jpg",
    category: "cheesecakes",
    description: "Decorado con frutos rojos frescos.",
    disponibleHoy: false
  },
  {
    id: 4,
    name: "Crokie smores",
    price: 110,
    image: "/products/crokie-smores.jpg",
    category: "postres",
    description: "Chocolate intenso y textura perfecta.",
    disponibleHoy: false
  }
];

// shippongZones
export const shippingZones = {
  coatza: [
    { name: "Centro", price: 20 },
    { name: "Puerto México", price: 25 },
    { name: "Benito Juárez", price: 25 },
    { name: "Coatriz", price: 30 },
    { name: "Petroquímica", price: 35 },
    { name: "Fovissste", price: 30 },
    { name: "Olmeca", price: 40 },
    { name: "Trópico de la Rivera", price: 45 }
  ],

  fuera: {
    basePrice: 85,
    extraPerKm: 4
  }
};


//menu.js
"use client";

import { useState } from "react";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const categories = [
  { id: "all", name: "Todos" },
  { id: "cheesecakes", name: "Cheesecakes" },
  { id: "galletas", name: "Galletas" },
  { id: "postres", name: "Postres" },
];

export default function MenuPage() {
  const [active, setActive] = useState("all");

  const filtered =
    active === "all"
      ? products
      : products.filter((p) => p.category === active);

  return (
    <div className="px-6 pt-10 pb-20 max-w-6xl mx-auto">
      <h1 className="font-[var(--font-title)] text-4xl font-bold mb-6 text-center">
        Menú Bocanada
      </h1>

      {/* Tabs de categorías */}
      <div className="flex justify-center gap-4 mb-10">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActive(cat.id)}
            className={`px-4 py-2 rounded-full font-medium transition-all ${
              active === cat.id
                ? "bg-rose-600 text-white shadow"
                : "bg-white border border-rose-200 text-rose-600 hover:bg-rose-50"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Grid de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

//ProductCard.js
"use client";

import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart, cart, updateQuantity } = useCart();
  const existing = cart.find((item) => item.id === product.id);

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-56 object-cover"
      />

      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-600 text-sm">{product.description}</p>

        <div className="flex items-center justify-between mt-3">
          <span className="font-semibold text-lg text-rose-600">
            ${product.price}
          </span>

          {existing ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(product.id, existing.qty - 1)}
                className="bg-rose-200 text-rose-700 w-8 h-8 rounded-full"
              >
                –
              </button>
              <span className="w-6 text-center">{existing.qty}</span>
              <button
                onClick={() => updateQuantity(product.id, existing.qty + 1)}
                className="bg-rose-600 text-white w-8 h-8 rounded-full"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={() => addToCart(product)}
              className="bg-rose-600 text-white px-4 py-2 rounded-xl hover:bg-rose-700 transition-all"
            >
              Agregar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

//CartDrawer.js
"use client";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { shippingZones } from "@/data/shippingZones";


export default function CartDrawer() {
  const { cart, total, updateQuantity, isOpen, toggleCart, removeItem } = useCart();

  const [shipping, setShipping] = useState(0);
  const [zoneType, setZoneType] = useState("coatza"); // coatza | fuera
  const [ km, setKm ] = useState(0); // para cálculos fuera
  
  const calculateShipping = () => {
    if (zoneType === "coatza") return shipping;

    // Fuera de Coatzacoalcos
    return shippingZones.fuera.basePrice + km * shippingZones.fuera.extraPerKm;
  };

  

  const sendToWhatsApp = () => {
    const message = cart
      .map((p) => `• ${p.name} x${p.qty} = $${p.price * p.qty}`)
      .join("\n");

    const text = `Hola! Quiero hacer un pedido:\n\n${message}\n\n+\n\nEnvío: $${shipping}\n\n=\n\nTotal: $${total  + calculateShipping()}`;
    const url = `https://wa.me/529212028916?text=${encodeURIComponent(text)}`;

    window.open(url);
  };


  return (
    <div>
      {/* Fondo oscuro */}
      {isOpen && (
        <div
          onClick={toggleCart}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 w-80 h-full bg-white text-gray-700 z-50 shadow-lg p-5 transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <h2 className="text-2xl font-bold mb-4">Tu pedido</h2>

        {cart.length === 0 ? (
          <p className="text-gray-500">Tu carrito está vacío.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    ${item.price} c/u
                  </p>
                    {!item.disponibleHoy && (
                      <p className="text-xs text-yellow-600">
                        Requiere 24 horas de anticipación
                      </p>
                    )}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-xs text-red-500 underline"
                  >
                    Quitar
                  </button>

                </div>

                {/* Controles */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.qty - 1)}
                    className="bg-rose-200 text-rose-700 w-7 h-7 rounded-full"
                  >
                    –
                  </button>
                  <span>{item.qty}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.qty + 1)}
                    className="bg-rose-600 text-white w-7 h-7 rounded-full"
                  >
                    +
                  </button>
                </div>
              </div>

  

            ))}
              
              
          </div>
        )}

        
        {/* Calcuclo de envío */}
        <div className="mt-5 border-t pt-4">
          <h3 className="font-semibold mb-2">Calcular envío</h3>

          {/* Selección entre coatza / fuera */}
          <select
            className="w-full border rounded p-2 mb-3"
            value={zoneType}
            onChange={(e) => setZoneType(e.target.value)}
          >
            <option value="coatza">Dentro de Coatzacoalcos</option>
            <option value="fuera">Fuera de Coatzacoalcos</option>
          </select>

          {zoneType === "coatza" && (
            <select
              className="w-full border rounded p-2"
              onChange={(e) => setShipping(Number(e.target.value))}
            >
              <option value="0">Selecciona tu colonia</option>
              {shippingZones.coatza.map((z) => (
                <option key={z.name} value={z.price}>
                  {z.name} — ${z.price}
                </option>
              ))}
            </select>
          )}

          {zoneType === "fuera" && (
            <div className="mt-3">
              <label className="text-sm">Distancia en km desde Coatzacoalcos:</label>
              <input
                type="number"
                className="w-full border rounded p-2 mt-1"
                value={km}
                onChange={(e) => setKm(Number(e.target.value))}
                placeholder="Ej. 15"
              />
            </div>
          )}

          {/* Costo de envío mostrado */}
          <p className="mt-2 text-right text-gray-700">
            Envío: <span className="font-bold">${calculateShipping()}</span>
          </p>
        </div>


        {/* Total */}
        <div className="absolute bottom-0 left-0 w-full p-5 border-t">
          <p className="flex justify-between font-semibold text-lg">
            Total:
            <span>${total + calculateShipping()}</span>
          </p>

          <button
            className="w-full bg-rose-600 text-white py-3 rounded-xl mt-4"
            onClick={sendToWhatsApp}
          >
            Enviar pedido a WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}

//CartsContext
"use client";
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [ cart, setCart ] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleCart = () => setIsOpen(!isOpen);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQuantity = (id, qty) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const removeItem = (id) => {
  setCart((prev) => prev.filter((item) => item.id !== id));
};


  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <CartContext.Provider value={{ cart, total, addToCart, updateQuantity, isOpen, toggleCart, removeItem }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);

//Page
"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { cart } = useCart();
  const count = cart.reduce((a, p) => a + p.qty, 0);

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white text-gray-600 shadow-sm sticky top-0 z-50">
      <Link href="/" className="text-xl font-bold tracking-wide">
        Bocanada
      </Link>

      <nav className="flex items-center gap-6">
        <Link href="/menu" className="hover:underline">
          Menú
        </Link>

      </nav>
    </header>
  );
}


import Link from "next/link";
import Image from "next/image";
import heroImg from "@/public/img/hero.jpg"

export default function Hero() {
  return (
    <section className="px-6 pt-12 pb-20 text-center">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-[var(--font-title)] text-4xl font-bold mb-4">
          Un dulce antojo hecho con amor
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Cheesecakes, galletas y postres hechos en nuestra dark kitchen,
          con ingredientes de calidad y sabor inolvidable.
        </p>

        <Link
          href="/menu"
          className="bg-rose-600 text-white px-6 py-3 rounded-xl text-lg shadow hover:bg-rose-700"
        >
          Ver Menú
        </Link>
      </div>

      <Image
        src={heroImg}
        alt="Postres Bocanada"
        className="w-full max-w-3xl mx-auto mt-10 rounded-2xl shadow-lg"
      />
    </section>
  );
}

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-600 mt-20 py-10 border-t">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-6">
        
        <div>
          <h3 className="font-semibold text-lg mb-2">Bocanada</h3>
          <p className="text-sm text-gray-600">
            Postres hechos con amor desde Coatzacoalcos.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Navegación</h3>
          <ul className="space-y-1 text-sm">
            <li><Link href="/">Inicio</Link></li>
            <li><Link href="/menu">Menú</Link></li>
            <li><Link href="/cart">Carrito</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Contacto</h3>
          <p className="text-sm">Dark Kitchen Coatzacoalcos</p>
          <a
            href="https://wa.me/529921234567"
            className="text-sm text-green-600 underline"
          >
            WhatsApp
          </a>
        </div>
      </div>

      <p className="text-center text-xs text-gray-500 mt-6">
        Hecho con café y código por <a href="" target="_blank">@okvianey</a>
      </p>
    </footer>
  );
}



//CSS
@import "tailwindcss";

:root {
  --background: #ffffff;
  --foreground: #171717;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: Arial, Helvetica, sans-serif;
}
