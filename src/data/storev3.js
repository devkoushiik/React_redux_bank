import { configureStore } from "@reduxjs/toolkit";
import AccountReducer from "../features/accounts/accountSlice";
import UserReducer from "../features/customers/customerSlice";

const store = configureStore({
  reducer: {
    account: AccountReducer,
    customer: UserReducer,
  },
});

export default store;
