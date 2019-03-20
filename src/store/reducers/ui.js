import {
	CHANGE_TAB,
	CLIENT_LOADED,
	PLAYLIST_LOADER,
	PLAYLIST_MESSAGE,
	PLAYLIST_UPDATE_BADGE,
	PLAYLIST_UPDATE_BADGE_PLUS,
	PLAYLIST_UPDATE_BADGE_MINUS,
} from "../actionTypes";

const initialState = {
	isClientLoaded: false,
	tabValue: 0,
	playlists: {
		isLoading: true,
		isError: null,
		message: null,
		updateAvailCount: 0,
	},
};

export default (state = initialState, action) => {
	const { type, value, isLoading, isError, message } = action;
	switch (type) {
		case CHANGE_TAB:
			return {
				...state,
				tabValue: value,
			};
		case CLIENT_LOADED:
			return {
				...state,
				isClientLoaded: true,
			};
		case PLAYLIST_LOADER:
			return {
				...state,
				playlists: { ...state.playlists, isLoading },
			};
		case PLAYLIST_MESSAGE:
			return {
				...state,
				playlists: { ...state.playlists, isError, message },
			};
		case PLAYLIST_UPDATE_BADGE:
			return {
				...state,
				playlists: { ...state.playlists, updateAvailCount: value },
			};
		case PLAYLIST_UPDATE_BADGE_PLUS:
			return {
				...state,
				playlists: {
					...state.playlists,
					updateAvailCount: state.playlists.updateAvailCount + 1,
				},
			};
		case PLAYLIST_UPDATE_BADGE_MINUS:
			return {
				...state,
				playlists: {
					...state.playlists,
					updateAvailCount: state.playlists.updateAvailCount - 1,
				},
			};
		default:
			return state;
	}
};
