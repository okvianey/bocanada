"use client";
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [ cart, setCart ] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleCart = () => setIsOpen(!isOpen);

  const addToCart = (product) => {
    //  if (!product.disponibleHoy) {
    //     alert("Este producto requiere pedido con 24 horas de anticipación.");
    //  }
    
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQuantity = (id, qty) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const removeItem = (id) => {
  setCart((prev) => prev.filter((item) => item.id !== id));
};


  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <CartContext.Provider value={{ cart, total, addToCart, updateQuantity, isOpen, toggleCart, removeItem }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
