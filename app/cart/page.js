"use client";
import { useCart } from "@/context/CartContext";

export default function Cart() {
  const { cart } = useCart();
  const shipping = 25;

  const total = cart.reduce((acc, p) => acc + p.price * p.qty, 0) + shipping;

  const sendToWhatsApp = () => {
    const message = cart
      .map((p) => `• ${p.name} x${p.qty} = $${p.price * p.qty}`)
      .join("\n");

    const text = `Hola! Quiero hacer un pedido:\n\n${message}\n\nEnvío: $${shipping}\nTotal: $${total}`;
    const url = `https://wa.me/529921234567?text=${encodeURIComponent(text)}`;

    window.open(url);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Tu carrito</h2>

      {cart.map((p) => (
        <div key={p.id} className="border-b py-2 flex justify-between">
          <span>{p.name} x{p.qty}</span>
          <span>${p.price * p.qty}</span>
        </div>
      ))}

      <div className="mt-4">
        <p>Envío: ${shipping}</p>
        <p className="font-bold text-lg">Total: ${total}</p>
      </div>

      <button
        onClick={sendToWhatsApp}
        className="mt-4 bg-green-600 text-white py-3 w-full rounded-xl"
      >
        Enviar pedido por WhatsApp
      </button>
    </div>
  );
}
