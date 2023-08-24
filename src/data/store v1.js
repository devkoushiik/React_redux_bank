import { combineReducers, createStore } from "redux";
const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

function AccountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        balance: action.payload.amount + state.balance,
        loan: action.payload.amount,
        loanPurpose: action.payload.loanPurpose,
      };
    case "account/payLoan":
      return {
        ...state,
        balance: state.balance - action.payload,
        loan: state.loan - action.payload,
        loanPurpose: state.loan === 0 || "",
      };
    default:
      return state;
  }
}

const UserReducer = (state = initialStateCustomer, action) => {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  account: AccountReducer,
  customer: UserReducer,
});

const store = createStore(rootReducer);

// store.dispatch({ type: "account/deposit", payload: 500 });
// store.dispatch({ type: "account/withdraw", payload: 200 });

// store.dispatch({
//   type: "account/requestLoan",
//   payload: { amount: 1000, loanPurpose: "Buy a Phone" },
// });
// store.dispatch({ type: "account/payLoan", payload: 300 });
// store.dispatch({ type: "account/payLoan", payload: 700 });

const deposit = (amount) => {
  return { type: "account/deposit", payload: amount };
};
const withdraw = (amount) => {
  return { type: "account/withdraw", payLoan: amount };
};
const requestLoan = (amount, purpose) => {
  return {
    type: "account/requestLoan",
    payload: { amount, loanPurpose: purpose },
  };
};
const payLoan = (amount) => {
  return { type: "account/payLoan", payload: amount };
};

store.dispatch(deposit(1000));
store.dispatch(requestLoan(1000, "Bua a Phone"));
store.dispatch(payLoan(1000));

console.log(store.getState());

function createCustomer(fullName, nationalID) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
}

const updateName = (fullName) => {
  return { type: "account/updateName", payload: fullName };
};

store.dispatch(createCustomer("kouhsik", "123123"));

console.log(store.getState());
