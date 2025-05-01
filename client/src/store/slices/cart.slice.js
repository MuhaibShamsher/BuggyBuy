import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../../utilis/cart.utilis.js';

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [], shippingAddress: {}, paymentMethod: 'Cash on Delivery' };

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const newItem = action.payload;
            const existItem = state.cartItems.find(item => item._id === newItem._id);

            if (!existItem) {
                state.cartItems.push(newItem);
            }

            return updateCart(state);
        },

        removeFromCart: (state, action) => {
            const id = action.payload;
            state.cartItems = state.cartItems.filter(item => item._id !== id);

            return updateCart(state);
        },

        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
            return updateCart(state);
        },

        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
            return updateCart(state);
        },

        clearCartItems: (state, action) => {
            state.cartItems = [];
            return updateCart(state);
        }
    }
});

export const {
    addToCart,
    removeFromCart,
    saveShippingAddress,
    savePaymentMethod,
    clearCartItems
} = cartSlice.actions;

export default cartSlice.reducer;