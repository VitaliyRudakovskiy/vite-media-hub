import { configureStore } from "@reduxjs/toolkit";
import cardReducer from "../features/Cards/cardReducers";
import authReducer from "../features/Users/userReducers";

export const store = configureStore({
  reducer: {
    cards: cardReducer,
    users: authReducer,
  },
});
