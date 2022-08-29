import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalQuantity: 0,
  total: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingProduct = state.items.find(item => item.id === newItem.id);
      state.totalQuantity++;
      if (!existingProduct) {
        state.items = [...state.items, action.payload];
        state.total = state.total + newItem.price;
      } else {
        existingProduct.quantity++;
        existingProduct.totalPrice = existingProduct.totalPrice + newItem.price;
        state.total = state.total + newItem.price;
      }
    },

    removeFromCart: (state, action) => {
      const product = state.items.find(item => item.id === action.payload.id);
      const productIndex = state.items.findIndex(
        item => item.id === action.payload.id
      );
      let newCart = [...state.items];
      if (productIndex >= 0) {
        newCart.splice(productIndex, 1);
        state.totalQuantity = state.totalQuantity - product.quantity;
        state.total = state.total - product.totalPrice;
        state.items;
      } else {
        console.warn('No product find');
      }
      if (state.totalQuantity === 0) {
        state.total = 0;
      }
      state.items = newCart;
    },

    decreaseQuantity(state, action) {
      const id = action.payload.id;
      const existingItem = state.items.find(item => item.id === id);
      state.totalQuantity--;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter(item => item.id !== id);
        state.total = state.total - existingItem.totalPrice;
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
        state.total = state.total - existingItem.price;
      }
      if (state.totalQuantity === 0) {
        state.total = 0;
      }
    },
  },
});

export const { addToCart, removeFromCart, decreaseQuantity } =
  cartSlice.actions;

export const selectItems = state => state.cart.items;
export const selectQuantity = state => state.cart.totalQuantity;
export const selectTotalPrice = state => state.cart.total;

export default cartSlice.reducer;
