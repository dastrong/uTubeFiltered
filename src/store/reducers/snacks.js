import { SNACK_WRITE, SNACK_CLEAR } from "../actionTypes";

// status === success || error || info
const initialState = { status: "success", message: "" };

export default (state = initialState, action) => {
  const { type, status, message } = action;
  if (type === SNACK_WRITE) return { status, message };
  if (type === SNACK_CLEAR) return { ...state, message: "" };
  return state;
};
