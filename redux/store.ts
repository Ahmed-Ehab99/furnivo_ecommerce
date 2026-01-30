import { configureStore } from "@reduxjs/toolkit";
import { cartApi } from "./features/cart/cartApi";
import { checkoutApi } from "./features/checkout/checkoutApi";
import checkoutReducer from "./features/checkout/checkoutSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [cartApi.reducerPath]: cartApi.reducer,
      [checkoutApi.reducerPath]: checkoutApi.reducer,
      checkout: checkoutReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(cartApi.middleware)
        .concat(checkoutApi.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
