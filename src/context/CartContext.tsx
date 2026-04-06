"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";

// 1. Ampliamos la interfaz para soportar la información de las variantes y un ID único
interface CartItem {
  cartItemId: string; // ID único generado (ej: "DQ-001-Azul-Talle-42")
  id: string; // ID real del producto
  title: string;
  price: string;
  category: string;
  quantity: number;
  variantInfo?: string; // Ej: "Azul Marino - Talle L"
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity" | "cartItemId">) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQuantity: number) => void;
  clearCart: () => void;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  // Usamos una referencia para saber si ya cargamos los datos y no pisar el localStorage por accidente
  const hasLoaded = useRef(false);

  // 2. Efecto para CARGAR: Lo hacemos asíncrono para evitar el error del linter
  useEffect(() => {
    const savedCart = localStorage.getItem("ts-cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        // El setTimeout(..., 0) pasa la actualización al final de la cola de tareas.
        // Esto soluciona el warning de "Calling setState synchronously within an effect"
        setTimeout(() => {
          setCart(parsedCart);
          hasLoaded.current = true;
        }, 0);
        return;
      } catch (e) {
        console.error("Error parsing cart", e);
      }
    }
    hasLoaded.current = true;
  }, []);

  // 3. Efecto para GUARDAR: Solo guarda si ya pasó la carga inicial
  useEffect(() => {
    if (!hasLoaded.current) return;
    localStorage.setItem("ts-cart", JSON.stringify(cart));
  }, [cart]);

  // AGREGAR AL CARRITO (Soportando variantes)
  const addToCart = (product: Omit<CartItem, "quantity" | "cartItemId">) => {
    setCart((prev) => {
      // Generamos un ID único concatenando el ID del producto y sus variantes
      const uniqueCartItemId = product.variantInfo
        ? `${product.id}-${product.variantInfo.replace(/\s+/g, "-")}`
        : product.id;

      const existingItem = prev.find(
        (item) => item.cartItemId === uniqueCartItemId,
      );

      if (existingItem) {
        // Si ya existe la misma prenda con EXACTAMENTE el mismo talle/color, sumamos cantidad
        return prev.map((item) =>
          item.cartItemId === uniqueCartItemId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      // Si no existe, lo agregamos como ítem nuevo
      return [
        ...prev,
        { ...product, cartItemId: uniqueCartItemId, quantity: 1 },
      ];
    });
  };

  // ELIMINAR DEL CARRITO (Usamos el cartItemId único)
  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  // ACTUALIZAR CANTIDAD (Usamos el cartItemId único)
  const updateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCart((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId
          ? { ...item, quantity: newQuantity }
          : item,
      ),
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("ts-cart");
  };

  const totalPrice = cart.reduce((acc, item) => {
    const priceNum = parseFloat(item.price.replace(/[^0-9.-]+/g, "")) || 0;
    return acc + priceNum * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
