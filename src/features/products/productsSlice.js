// features/products/productsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProducts } from '../../api/productsAPI';

const initialState = {
  products: [],
  status: 'idle',
  error: null,
  filteredProducts: [],
};

export const fetchAllProducts = createAsyncThunk(
  'products/fetchAll',
  async () => {
    const response = await fetchProducts();
    return response.products;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    filterProducts: (state, action) => {
      const { category, minPrice, maxPrice } = action.payload;
      state.filteredProducts = state.products.filter((product) => {
        const matchesCategory = category ? product.category === category : true;
        const matchesMinPrice = minPrice ? product.price >= minPrice : true;
        const matchesMaxPrice = maxPrice ? product.price <= maxPrice : true;
        return matchesCategory && matchesMinPrice && matchesMaxPrice;
      });
    },
    searchProducts: (state, action) => {
      const searchTerm = action.payload.toLowerCase();
      state.filteredProducts = state.products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm)
      );
    },
    sortProducts: (state, action) => {
      const sortBy = action.payload;
      const productsToSort = [...state.filteredProducts.length ? state.filteredProducts : state.products];
      
      switch (sortBy) {
        case 'price-low':
          productsToSort.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          productsToSort.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          productsToSort.sort((a, b) => b.rating - a.rating);
          break;
        default:
          break;
      }
      
      state.filteredProducts = productsToSort;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
        state.filteredProducts = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { filterProducts, searchProducts, sortProducts } = productsSlice.actions;
export default productsSlice.reducer;

export const selectAllProducts = (state) => state.products.products;
export const selectFilteredProducts = (state) => state.products.filteredProducts;
export const selectProductsStatus = (state) => state.products.status;