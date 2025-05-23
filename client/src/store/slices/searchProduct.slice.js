import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    search: ''
};

const searchProductSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        searchProduct: (state, action) => {
            state.search = action.payload;
        },
        
        clearSearch: (state) => {
            state.search = '';
        }
    }
});


export const { searchProduct, clearSearch } = searchProductSlice.actions;
export default searchProductSlice.reducer;