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
        className={`fixed top-0 right-0 w-80 h-full bg-white text-softblack z-50 shadow-lg p-5 transition-transform ${
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
                  <p className="text-sm text-softblack">
                    ${item.price} c/u
                  </p>
                    {!item.disponibleHoy && (
                      <p className="text-xs text-yellow-600">
                        Requiere 24 horas de anticipación
                      </p>
                    )}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-xs text-yellow underline"
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
