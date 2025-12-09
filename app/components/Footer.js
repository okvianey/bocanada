import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-sand border-t border-taupe/40 py-10">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-6">
        
        <div>
          <h3 className="font-semibold text-lg text-softblack mb-2">Bocanada</h3>
          <p className="text-sm text-softblack/70">
            Postres hechos con amor desde Coatzacoalcos.
          </p>
        </div>

        {/* <div>
          <h3 className="font-semibold mb-2">Navegación</h3>
          <ul className="space-y-1 text-sm">
            <li><Link href="/">Inicio</Link></li>
            <li><Link href="/menu">Menú</Link></li>
            <li><Link href="/cart">Carrito</Link></li>
          </ul>
        </div> */}

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

      <p className="text-center text-xs text-softblack/60  mt-6">
        Hecho con café y código por <a href="" target="_blank">@okvianey</a>
      </p>
    </footer>
  );
}
