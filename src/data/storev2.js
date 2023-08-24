import { combineReducers, createStore } from "redux";
import AccountReducer from "../features/accounts/accountSlice";
import UserReducer from "../features/customers/customerSlice";

const rootReducer = combineReducers({
  account: AccountReducer,
  customer: UserReducer,
});

export const store = createStore(rootReducer);
