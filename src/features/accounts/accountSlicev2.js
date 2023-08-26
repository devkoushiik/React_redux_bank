import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare(amount, purpose) {
        return {
          payload: { amount, purpose },
        };
      },
      reducer(state, action) {
        // if (state.loan > 0) return;
        state.loan = action.payload;
        state.loanPurpose = action.payload.loanPurpose;
        state.balance = state.balance + action.payload.amount;
      },
    },
    payLoan(state, action) {
      state.balance = state.balance - action.payload;
      state.loan = state.loan - action.payload;
      state.loanPurpose = state.loan === 0 || "";
    },
    convertingCurrency(state) {
      state.isLoading = true;
    },
  },
});

export const deposit = (amount, currency) => {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  return async (dispatch) => {
    dispatch({ type: "account/convertingCurrency" });
    // api call
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    const converted = data.rates.USD;
    dispatch({ type: "account/deposit", payload: converted });
  };
};

console.log(accountSlice);

export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

export default accountSlice.reducer;
