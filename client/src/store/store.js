import { configureStore } from '@reduxjs/toolkit'
import searchProductReducer from './slices/searchProduct.slice.js'
import authReducer from './slices/auth.slice.js'
import cartReducer from './slices/cart.slice.js'


const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchProductReducer,
    cart: cartReducer
  }
})


export default store