import { applyMiddleware, combineReducers, createStore } from "redux";
import AccountReducer from "../features/accounts/accountSlice";
import UserReducer from "../features/customers/customerSlice";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  account: AccountReducer,
  customer: UserReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
