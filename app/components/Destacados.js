import Link from "next/link";
import Image from "next/image";

export default function Destacados() {
  return (
     <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="font-title text-3xl text-softblack text-center mb-12">
          Favoritos de la casa
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              name: "Cheesecake de Guayaba",
              price: "$120",
              img: "/products/caja-galletas.jpg",
            },
            {
              name: "Roles de Canela",
              price: "$25 c/u",
              img: "/products/cheescake.jpg",
            },
            {
              name: "Galletas de Chocolate",
              price: "$15 c/u",
              img: "/products/crokie-chip.jpg",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-cream rounded-2xl shadow-sm p-4 hover:shadow-md transition"
            >
              <div className="relative w-full h-56 mb-3">
                <Image
                  src={item.img}
                  alt={item.name}
                  fill
                  className="object-cover rounded-xl"
                />
              </div>

              <h3 className="font-title text-xl text-softblack">{item.name}</h3>
              <p className="text-softblack/60 mt-1 text-sm">
                Artesanales y hechos con amor ♥
              </p>
              <p className="font-semibold text-softblack mt-2">{item.price}</p>

              <button className="bg-terracota text-white w-full mt-3 py-2 rounded-lg hover:bg-roseclay transition">
                Agregar al carrito
              </button>
            </div>
          ))}
        </div>
      </section>
  );
}
