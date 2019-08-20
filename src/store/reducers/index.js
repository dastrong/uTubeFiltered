import { combineReducers } from "redux";
import currentUser from "./currentUser";
import ids from "./ids";
import playlists from "./playlists";
import snacks from "./snacks";
import ui from "./ui";
import { LOGOUT_USER } from "../actionTypes";

const appReducer = combineReducers({
  currentUser,
  ids,
  playlists,
  snacks,
  ui
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT_USER) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
