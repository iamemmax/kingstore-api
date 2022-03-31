import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import verifyReducer from "../features/auth/verifySlice";
import productReducer from "../features/Product/productSlice";
import fetchProductSlice from "../features/Product/fetchproductSlice";
import cartSlice from "../features/cart/cartSlice";
import singleProduct from "../features/Product/singleProductSlice";
// import {persistStore, persistReducer} from "redux-persist"
import storage from "redux-persist/lib/storage";
import {
  // persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const allReducer = combineReducers({
  auth: authReducer,
  verify: verifyReducer,
  newProduct: productReducer,
  products: fetchProductSlice,
  cart: cartSlice,
  single: singleProduct,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["verify, newProduct, products"],
  whitelist: ["cart", "auth"],
};
const persistedReducer = persistReducer(persistConfig, allReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// export default () => {

//   let persistor = persistStore(store);
//   return { store, persistor };
// };

// const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)))
//  export const Persistor = persistStore(store)

export default store;
