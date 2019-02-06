import { SET_CURRENT_USER } from "../actionTypes";
import { getPlaylists, handlePlaylists } from "./playlists";

export const setCurrentUser = user => ({
	type: SET_CURRENT_USER,
	user,
});

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
				tokenType: tokenDetails.token_type,
			};
			localStorage.setItem("user", JSON.stringify(userData));
			dispatch(setCurrentUser(userData));
			// grab the user's playlists (thunk)
			dispatch(getPlaylists(userData.tokenAccess));
		} catch (err) {
			console.log(err);
			alert(err);
		}
	};
}

export function unAuthUser(cb) {
	return async dispatch => {
		try {
			localStorage.clear();
			await cb();
			dispatch(setCurrentUser({}));
			dispatch(handlePlaylists([]));
		} catch (err) {
			console.log(err);
			alert(err);
		}
	};
}
