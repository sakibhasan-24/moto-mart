import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: string;
  brand: string;
  name: string;
  price: number;
  quantity: number;
  totalPrice: number;
  image: string;
}

interface CartState {
  cartItems: CartItem[];
  totalAmount: number;
}

const initialState: CartState = {
  cartItems: JSON.parse(localStorage.getItem("items") || "[]"),
  totalAmount: 0,
};

const calculateTotalAmount = (cartItems: CartItem[]) => {
  return cartItems.reduce((total, item) => total + item.totalPrice, 0);
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
      const existingItem = state.cartItems.find((p) => p.id === item.id);

      if (existingItem) {
        existingItem.quantity += item.quantity;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
      } else {
        state.cartItems.push({
          ...item,
          totalPrice: item.quantity * item.price,
        });
      }

      state.totalAmount = calculateTotalAmount(state.cartItems);
      localStorage.setItem("items", JSON.stringify(state.cartItems));
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );

      state.totalAmount = calculateTotalAmount(state.cartItems);
      localStorage.setItem("items", JSON.stringify(state.cartItems));
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.totalAmount = 0;
      localStorage.removeItem("items");
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
