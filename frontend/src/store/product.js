import { data } from "react-router-dom";
import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "Please fill in all fields." };
    }
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    const data = await res.json();
    set((state) => ({ products: [...state.products, data.data] }));
    return { success: true, message: "Product created successfully" };
  },
  getProducts: async () => {
    const res = await fetch("/api/products");
    if (!res.ok) {
      return { success: false, message: "Failed to fetch products" };
    }
    const data = await res.json();
    set({
      products: data.data,
    });
    return { success: true, message: "Received Products" };
  },
}));
