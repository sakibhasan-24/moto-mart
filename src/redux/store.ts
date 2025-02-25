import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import authReducer from "./features/auth.slice";
import cartReducer from "./features/product.slice";
import offerReducer from "./offer.slice";
export const store = configureStore({
  reducer: {
    // [baseApi.reducerPath]: baseApi.reducer,
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authReducer,
    items: cartReducer,
    offer: offerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
