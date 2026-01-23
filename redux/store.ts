import { configureStore } from "@reduxjs/toolkit";
import { cartApi } from "./cartApi";

export const makeStore = () => {
  return configureStore({
    reducer: {
      // 1. Add the API reducer
      // The key [cartApi.reducerPath] is dynamic, ensuring no name clashes
      [cartApi.reducerPath]: cartApi.reducer,
    },
    // 2. Add the API middleware
    // This enables caching, invalidation, polling, and other features of RTK Query
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(cartApi.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
