"use client";

import { useState } from "react";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const categories = [
  { id: "all", name: "Todos" },
  { id: "hoy", name: "Disponible hoy" },
  { id: "cheesecakes", name: "Cheesecakes" },
  { id: "galletas", name: "Galletas" },
  { id: "postres", name: "Postres" },
];

export default function MenuPage() {
  const [active, setActive] = useState("all");

  const filtered =
    active === "all"
      ? products
      : active === "hoy"
      ? products.filter((p) => p.disponibleHoy)
      : products.filter((p) => p.category === active);


  return (
    <div className="px-6 pt-10 pb-20 max-w-6xl mx-auto">
      <h1 className="font-title text-4xl text-softblack font-bold mb-6 text-center">
        Menú Bocanada
      </h1>

      {/* Tabs de categorías */}
      <div className="flex flex-wrap justify-center gap-3 mb-8 pb-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActive(cat.id)}
            className={`px-4 py-2 rounded-full font-medium transition-all ${
              active === cat.id
                ? "bg-yellow/30 text-brown shadow-md"
                : "bg-white border-moka-light text-softblack hover:bg-almond"
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
