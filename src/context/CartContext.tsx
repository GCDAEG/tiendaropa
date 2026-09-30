"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { LINDE_PRODUCTS } from "@/lib/mockData";

export interface SelectionItem {
  cartItemId: string;
  id: string;
  title: string;
  price: number;
  category: string;
  quantity: number;
  size?: string;
  color?: string;
}

interface SelectionContextType {
  cart: SelectionItem[];
  addToCart: (item: Omit<SelectionItem, "quantity" | "cartItemId">) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQuantity: number) => void;
  clearCart: () => void;
  totalPrice: number;
  hydrated: boolean;
}

const KEY = "linde-selection-v1";
const SelectionContext = createContext<SelectionContextType | undefined>(undefined);

function restoreSelection(raw: string | null): SelectionItem[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.flatMap((candidate): SelectionItem[] => {
      if (!candidate || typeof candidate !== "object") return [];
      const item = candidate as Partial<SelectionItem>;
      const product = LINDE_PRODUCTS.find((entry) => entry.id === item.id);
      if (!product || !Number.isInteger(item.quantity) || Number(item.quantity) < 1) return [];
      const size = typeof item.size === "string" && product.variantes.talles.includes(item.size) ? item.size : undefined;
      const color = typeof item.color === "string" && product.variantes.colores.includes(item.color) ? item.color : undefined;
      if ((item.size && !size) || (item.color && !color)) return [];
      const cartItemId = [product.id, size ?? "", color ?? ""].join("|");
      return [{ cartItemId, id: product.id, title: product.nombre, price: product.precio, category: product.categoria, quantity: Number(item.quantity), ...(size ? { size } : {}), ...(color ? { color } : {}) }];
    });
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<SelectionItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => {
      setCart(restoreSelection(localStorage.getItem(KEY)));
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(KEY, JSON.stringify(cart));
  }, [cart, hydrated]);

  const addToCart = useCallback((item: Omit<SelectionItem, "quantity" | "cartItemId">) => {
    const cartItemId = [item.id, item.size ?? "", item.color ?? ""].join("|");
    setCart((current) => {
      const existing = current.find((entry) => entry.cartItemId === cartItemId);
      return existing
        ? current.map((entry) => entry.cartItemId === cartItemId ? { ...entry, quantity: entry.quantity + 1 } : entry)
        : [...current, { ...item, cartItemId, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((cartItemId: string) => setCart((current) => current.filter((entry) => entry.cartItemId !== cartItemId)), []);
  const updateQuantity = useCallback((cartItemId: string, newQuantity: number) => {
    if (!Number.isInteger(newQuantity) || newQuantity < 1) return;
    setCart((current) => current.map((entry) => entry.cartItemId === cartItemId ? { ...entry, quantity: newQuantity } : entry));
  }, []);
  const clearCart = useCallback(() => setCart([]), []);
  const totalPrice = useMemo(() => cart.reduce((total, item) => total + item.price * item.quantity, 0), [cart]);

  return <SelectionContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, totalPrice, hydrated }}>{children}</SelectionContext.Provider>;
}

export function useCart() {
  const context = useContext(SelectionContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
