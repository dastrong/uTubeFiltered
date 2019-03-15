import { combineReducers } from "redux";
import currentUser from "./currentUser";
import playlists from "./playlists";
import ui from "./ui";
import player from "./player";

const rootReducer = combineReducers({
  currentUser,
  playlists,
  ui,
  player
});

export default rootReducer;
