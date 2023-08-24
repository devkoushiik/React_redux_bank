const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

export default function AccountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      //   if (state.loan > 0) return state;
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

export const deposit = (amount) => {
  return { type: "account/deposit", payload: amount };
};
export const withdraw = (amount) => {
  return { type: "account/withdraw", payload: amount };
};
export const requestLoan = (amount, purpose) => {
  return {
    type: "account/requestLoan",
    payload: { amount, loanPurpose: purpose },
  };
};
export const payLoan = (amount) => {
  return { type: "account/payLoan", payload: amount };
};
