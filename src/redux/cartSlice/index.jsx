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
            const existingItem = state.items.find(item => item.id === newItem.id && item.uniqueId === newItem.uniqueId);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...newItem, quantity: 1 });
            }
            state.totalPrice += newItem.price;
        },
        removeSingleItem: (state, action) => {
            const { id, uniqueId } = action.payload;
            const itemIndex = state.items.findIndex(item => item.id === id && item.uniqueId === uniqueId);
            if (itemIndex !== -1) {
                const itemToRemove = state.items[itemIndex];
                state.totalPrice -= itemToRemove.price * itemToRemove.quantity;
                state.items.splice(itemIndex, 1);
            }
        },
        clearCart: (state) => {
            state.items = [];
            state.totalPrice = 0;
        },
        updateItemQuantity: (state, action) => {
            const { id, uniqueId, newQuantity } = action.payload;
            const item = state.items.find(item => item.id === id && item.uniqueId === uniqueId);
            if (item) {
                state.totalPrice += (newQuantity - item.quantity) * item.price;
                item.quantity = newQuantity;
            }
        }
    }
});

export const { addToCart, removeSingleItem, clearCart, updateItemQuantity } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;

export const selectCartTotalPrice = (state) => state.cart.totalPrice;

export default cartSlice.reducer;
