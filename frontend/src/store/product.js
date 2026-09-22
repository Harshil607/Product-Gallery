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
  updateProducts: async (updateProduct) => {
    const res = await fetch(`/api/products/${updateProduct._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateProduct),
    });
    if (!res.ok) {
      return {
        success: false,
        message: "Failed to update product",
      };
    }
    const data = await res.json();
    set((state) => ({
      products: state.products.map((product) =>
        product._id === updateProduct._id ? data.data : product,
      ),
    }));
    return { success: true, message: "Product Updates Succesfully" };
  },
  deleteProducts: async (deleteProduct) => {
    const res = await fetch(`/api/products/${deleteProduct._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deleteProduct),
    });
    if (!res.ok) {
      return {
        success: false,
        message: "Failed to delete product",
      };
    }
    set((state) => ({
      products: state.products.filter((product) => {
        return product._id !== deleteProduct._id;
      }),
    }));
    return { success: true, message: "Product deleted Succesfully" };
  },
}));
