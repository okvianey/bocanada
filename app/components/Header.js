"use client";

import { usePathname } from 'next/navigation';
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png"

export default function Header() {
  const pathname = usePathname();
  const isMenu = pathname === '/menu';

  return (
    <header className="bg-cream/90 backdrop-blur-sm border-b border-taupe/40 px-6 py-4 flex flex-col items-center sticky top-0 z-50">
      <Link href="/" className="text-2xl text-softblack tracking-tight">
        {/* Bocanada */}
        <Image src={logo} width={80} alt="bocanada" />
      </Link>

      <nav className="flex items-center mt-2">
        
        {
          !isMenu &&
          <Link href="/menu" className={`hover:underline hover:text-terracota transition`}> Menú</Link>
        }

      </nav>
    </header>
  );
}
