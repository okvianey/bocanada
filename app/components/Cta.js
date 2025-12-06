import Link from "next/link";
import Image from "next/image";

export default function Cta() {
  return (
     <section className="bg-roseclay/20 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="font-title text-4xl text-softblack mb-4">
            Endulza tu día
          </h2>
          <p className="text-softblack/70 max-w-lg mx-auto">
            Haz tu pedido para entrega o recógelo en nuestra cocina. ¡Queremos
            ser tu momento bonito del día!
          </p>

          <Link
            href="/menu"
            className="inline-block mt-8 bg-terracota text-white px-10 py-4 rounded-xl hover:bg-roseclay transition font-medium"
          >
            Hacer pedido
          </Link>
        </div>
      </section>
  );
}
