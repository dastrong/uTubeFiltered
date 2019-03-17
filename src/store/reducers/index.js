import { combineReducers } from "redux";
import currentUser from "./currentUser";
import playlists from "./playlists";
import ui from "./ui";
import player from "./player";
import { LOGOUT_USER } from "../actionTypes";

const appReducer = combineReducers({
	currentUser,
	playlists,
	ui,
	player,
});

const rootReducer = (state, action) => {
	if (action.type === LOGOUT_USER) {
		state = undefined;
	}
	return appReducer(state, action);
};

export default rootReducer;
