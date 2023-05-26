import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

export interface CartAction {
    product: string,
    name: string,
    price: number,
    image: string,
    stock: number,
    seller: string,
}


const initialState: any = {
    cartItems: []
}

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        initCart: () => {},
        initCartSuccess: (state,action) => {
            state.cartItems = action.payload
        },
        addItemToCart: (state, action: PayloadAction<CartAction>) => { },
        addItemToCartSuccess: (state, action) => {
            let cart = [...action.payload]
            state.cartItems = cart;
        },
        deleteItemFromCart: (state, action: PayloadAction<string>) => {
        },
        deleteItemFromCartSuccess: (state, action) => {
            let cart = [...action.payload]
            state.cartItems = cart;
        },
        clearCart: (state) => {
            state.cartItems = [];
        },
    },

});

export const cartAction = cartSlice.actions;

export const cartList = (state: RootState) => state.cart

const cartReducer = cartSlice.reducer;

export default cartReducer;
