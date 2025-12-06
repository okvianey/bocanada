"use client";
import { useCart } from "@/context/CartContext";

export default function CartButton() {
  const { cart, toggleCart } = useCart();

  const count = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <button
      onClick={toggleCart}
      className="fixed bottom-6 right-6 bg-yellow text-white rounded-full shadow-xl w-14 h-14 flex items-center justify-center text-xl"
    >
      🛒
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-white text-rose-600 text-sm font-bold w-6 h-6 rounded-full flex items-center justify-center">
          {count}
        </span>
      )}
    </button>
  );
}
