import { SET_CURRENT_USER } from "../actionTypes";

const DEFAULT_STATE = {
	isAuthenticated: false,
	user: {},
};

export default (state = DEFAULT_STATE, { type, user }) => {
	switch (type) {
		case SET_CURRENT_USER:
			return {
				isAuthenticated: !!Object.keys(user).length,
				user,
			};
		default:
			return state;
	}
};
