import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";

import { cartReducer } from "./slices/cartSlice";
import { orderReducer } from "./slices/orderSlice";
import { productReducer } from "./slices/productSlice";

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, cartReducer);

export const store = configureStore({
  reducer: {
    cart: persistedReducer,
    products: productReducer,
    orders: orderReducer,
  },
});

export const newStore = persistStore(store);