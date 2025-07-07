import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Product } from "../../types/Product";
import axios from "axios";

const API = "http://localhost:3001/api/products";

type ProductsState = {
  products: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string;
};

const initialState: ProductsState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: "",
};

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const res = await axios.get(API);
  return res.data;
});

export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  async (id: number) => {
    const res = await axios.get(`${API}/${id}`);
    return res.data;
  }
);

export const addProduct = createAsyncThunk(
  "products/add",
  async (payload: Omit<Product, "id">) => {
    const res = await axios.post(API, payload);
    return res.data;
  }
);

export const updateProduct = createAsyncThunk(
  "products/update",
  async (payload: Product) => {
    const res = await axios.patch(`${API}/${payload.id}`, payload);
    return res.data;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (productId: number) => {
    await axios.delete(`${API}/${productId}`);
    return productId;
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.products = state.products.sort((p1, p2) =>
        p1.name.localeCompare(p2.name)
      );
      state.loading = false;
      state.error = "";
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.loading = false;
      state.error = "Error occured while loading products";
    });

    builder.addCase(fetchProductById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      state.selectedProduct = action.payload;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(fetchProductById.rejected, (state) => {
      state.loading = false;
      state.error = "Product not found";
    });

    builder.addCase(addProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.products.push(action.payload);
      state.products = state.products.sort((p1, p2) =>
        p1.name.localeCompare(p2.name)
      );
      state.loading = false;
      state.error = "";
    });
    builder.addCase(addProduct.rejected, (state) => {
      state.loading = false;
      state.error = "Unable to add a product";
    });

    builder.addCase(updateProduct.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateProduct.fulfilled, (state, action) => {
      const index = state.products.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
        state.products = state.products.sort((p1, p2) =>
          p1.name.localeCompare(p2.name)
        );
      }
      if (state.selectedProduct?.id === action.payload.id) {
        state.selectedProduct = action.payload;
      }
      state.loading = false;
      state.error = "";
    });
    builder.addCase(updateProduct.rejected, (state) => {
      state.loading = false;
      state.error = "Unable to update product";
    });

    builder.addCase(deleteProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
      state.loading = false;
      state.error = "";
    });
    builder.addCase(deleteProduct.rejected, (state) => {
      state.loading = false;
      state.error = "Unable to delete a product";
    });
  },
});

export default productsSlice.reducer;
