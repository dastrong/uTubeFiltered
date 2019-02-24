import { CHANGE_TAB, CLIENT_LOADED } from "../actionTypes";

const initialState = {
  isClientLoaded: false,
  tabValue: 0
};

export default (state = initialState, action) => {
  const { type, value } = action;
  switch (type) {
    case CHANGE_TAB:
      return {
        ...state,
        tabValue: value
      };
    case CLIENT_LOADED:
      return {
        ...state,
        isClientLoaded: true
      };
    default:
      return state;
  }
};
