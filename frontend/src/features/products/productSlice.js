
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productService from './productService';

const initialState = {
  products: [],  // List of products
  product: {},   // Single product details
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

// Async thunk to create a product
export const createProduct = createAsyncThunk('products/create', async (productData, thunkAPI) => {

  try {
    const token = thunkAPI.getState().auth.user.token;
    console.log(token)
    return await productService.createProducts(productData, token);
  } catch (error) {
    const message = (error.response?.data?.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});



// Async thunk to get all products
export const getProducts = createAsyncThunk('products/getAll', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await productService.getProducts(token);
  } catch (error) {
    const message = (error.response?.data?.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Async thunk to get a single product
export const getProduct = createAsyncThunk('products/get', async (productId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await productService.getProduct(productId, token);
  } catch (error) {
    const message = (error.response?.data?.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Async thunk to update a product
export const updateProduct = createAsyncThunk('products/update', async ({ productId, productData }, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await productService.updateProduct(productId, productData, token);
  } catch (error) {
    const message = (error.response?.data?.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Async thunk to delete a product
export const deleteProduct = createAsyncThunk('products/delete', async (productId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await productService.deleteProduct(productId, token);
  } catch (error) {
    const message = (error.response?.data?.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false; // Reset success state on pending
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products.push(action.payload); // Add the new product to the list
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false; // Reset success state on error
      })
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false; // Reset success state on pending
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.isSuccess = true;
        state.products = action.payload; // This should be an array
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false; // Reset success state on error
      })
      .addCase(getProduct.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false; // Reset success state on pending
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.product = action.payload; // Single product details
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false; // Reset success state on error
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false; // Reset success state on pending
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.product = action.payload; // Updated product details
        state.products = state.products.map((product) =>
          product._id === action.payload._id ? action.payload : product
        );
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false; // Reset success state on error
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false; // Reset success state on pending
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // Ensure the deleted product is removed from the list
        state.products = state.products.filter((product) => product._id !== action.payload._id);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false; // Reset success state on error
      });
  },
});
export const { reset } = productSlice.actions;
export default productSlice.reducer;