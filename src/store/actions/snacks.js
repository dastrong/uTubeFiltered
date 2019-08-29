import { SNACK_WRITE, SNACK_CLEAR } from "../actionTypes";

export const closeSnackBar = { type: SNACK_CLEAR };

export const showSnackBar = (status, message) => ({
  type: SNACK_WRITE,
  status,
  message
});
