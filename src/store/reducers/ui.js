import {
	CHANGE_TAB,
	CLIENT_LOADED,
	SET_QUOTA,
	TOGGLE_AUTO_DELETE,
	PLAYLISTS_LOADER,
	PLAYLISTS_UPDATE_BADGE,
	PLAYLISTS_UPDATE_BADGE_PLUS,
	PLAYLISTS_UPDATE_BADGE_MINUS
} from "../actionTypes";

const init = () => {
	// retrieve past user autoDelete preference
	let autoDelete = localStorage.autoDelete;
	autoDelete = autoDelete ? !!JSON.parse(autoDelete) : true;

	// check if the quota was full before
	let quotaInfo = localStorage.quotaInfo;
	let { isQuotaFull, refreshDate } = quotaInfo
		? JSON.parse(quotaInfo)
		: { isQuotaFull: false, refreshDate: "" };

	// check if the quota was refreshed
	if (isQuotaFull) {
		const currentDate = new Date();
		isQuotaFull = currentDate < new Date(refreshDate);
		// if the refreshDate has passed remove the variable from localStorage
		if (!isQuotaFull) {
			localStorage.removeItem("quotaInfo");
		}
	}

	// return the initialState
	return {
		isQuotaFull,
		autoDelete,
		isClientLoaded: false,
		arePlLoading: false,
		tabValue: 0,
		updateAvailCount: 0
	};
};

const initialState = init();

export default (state = initialState, action) => {
	const { type, value, arePlLoading, isQuotaFull } = action;
	const { updateAvailCount, autoDelete } = state;
	switch (type) {
		case CLIENT_LOADED:
			return { ...state, isClientLoaded: true };
		case CHANGE_TAB:
			return { ...state, tabValue: value };
		case SET_QUOTA:
			return { ...state, isQuotaFull };
		case TOGGLE_AUTO_DELETE:
			return { ...state, autoDelete: !autoDelete };
		case PLAYLISTS_LOADER:
			return { ...state, arePlLoading };
		case PLAYLISTS_UPDATE_BADGE:
			return { ...state, updateAvailCount: value };
		case PLAYLISTS_UPDATE_BADGE_PLUS:
			return { ...state, updateAvailCount: updateAvailCount + 1 };
		case PLAYLISTS_UPDATE_BADGE_MINUS:
			return { ...state, updateAvailCount: updateAvailCount - 1 };
		default:
			return state;
	}
};
