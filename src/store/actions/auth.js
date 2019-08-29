import { SET_CURRENT_USER, LOGOUT_USER } from "../actionTypes";
import { getPlaylists } from "./playlists";
import { showSnackBar } from "./snacks";

export const setCurrentUser = user => ({
	type: SET_CURRENT_USER,
	user
});

export const logoutUser = () => ({ type: LOGOUT_USER });

export function authUser(cb) {
	return async dispatch => {
		try {
			const user = await cb();
			const [userDetails, tokenDetails] = [user.w3, user.Zi];
			const userData = {
				name: userDetails.ig,
				email: userDetails.U3,
				image: userDetails.Paa,
				tokenAccess: tokenDetails.access_token,
				tokenId: tokenDetails.id_token,
				tokenType: tokenDetails.token_type
			};
			dispatch(setCurrentUser(userData));
			// grab the user's playlists (thunk)
			dispatch(getPlaylists(userData.tokenAccess));
		} catch (err) {
			console.log(err);
			dispatch(showSnackBar("error", "An error occured [Login]"));
		}
	};
}

export function unAuthUser(cb) {
	return async dispatch => {
		try {
			localStorage.clear();
			await cb();
			dispatch(logoutUser());
		} catch (err) {
			console.log(err);
			dispatch(showSnackBar("error", "An error occured [Logout]"));
		}
	};
}
