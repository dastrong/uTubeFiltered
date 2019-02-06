import { combineReducers } from "redux";
import currentUser from "./currentUser";
import playlists from "./playlists";

const rootReducer = combineReducers({
	currentUser,
	playlists,
});

export default rootReducer;
