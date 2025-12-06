"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-cream/90 backdrop-blur-sm border-b border-taupe/40 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <Link href="/">
        <h1 className="font-title text-3xl text-softblack tracking-tight">
          Bocanada
        </h1>
      </Link>

      <div className="flex gap-8 text-softblack font-medium">
        <Link href="/menu" className="hover:text-terracota transition">
          Menú
        </Link>
        <Link href="/nosotros" className="hover:text-terracota transition">
          Nosotros
        </Link>
        <Link href="/contacto" className="hover:text-terracota transition">
          Contacto
        </Link>
      </div>
    </nav>
  );
}
