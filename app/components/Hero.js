import Link from "next/link";
import Image from "next/image";
import heroImg from "@/public/img/hero.jpg"

export default function Hero() {
  return (
    <section className="px-6 pt-12 pb-20 text-center">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-title text-5xl text-softblack font-bold mb-4 leading-tight">
          Un dulce antojo hecho con amor
        </h1>
        <p className="text-softblack/70 text-lg max-w-2xl mx-auto mb-6">
          Repostería artesanal hecha con ingredientes frescos, cuidado y un toque de hogar.
        </p>

        <Link
          href="/menu"
          className="px-10 py-3 inline-block mt-8 bg-terracota text-white  rounded-xl hover:bg-roseclay hover:text-softblack/70 transition font-medium"
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
