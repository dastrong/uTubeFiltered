import { combineReducers } from "redux";
import currentUser from "./currentUser";
import playlists from "./playlists";
import ui from "./ui";

const rootReducer = combineReducers({
  currentUser,
  playlists,
  ui
});

export default rootReducer;
