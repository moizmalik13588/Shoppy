import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalPrice: 0
    },
    reducers: {
        addToCart: (state, action) => {
            const newItem = action.payload;
            state.items.push(newItem);
            state.totalPrice += newItem.price;
        },
        removeSingleItem: (state, action) => {
            const { id, uniqueId } = action.payload;
            const itemIndex = state.items.findIndex(item => item.id === id && item.uniqueId === uniqueId);
            if (itemIndex !== -1) {
                const itemToRemove = state.items[itemIndex];
                state.items.splice(itemIndex, 1);
                state.totalPrice -= itemToRemove.price;
            }
        },
        clearCart: (state) => {
            state.items = [];
            state.totalPrice = 0;
        }
    }
});

export const { addToCart, removeSingleItem, clearCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;

export const selectCartTotalPrice = (state) => state.cart.totalPrice;

export default cartSlice.reducer;
