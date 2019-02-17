import {
	LOADING_PLAYLISTS,
	PLAYLISTS_MESSAGE,
	GET_PLAYLISTS,
	CREATE_PLAYLIST,
	DELETE_PLAYLIST,
	GET_PLAYLIST_ITEMS,
	FETCHING_PLAYLIST_ITEMS,
	GET_PLAYLIST,
} from "../actionTypes";

const initialState = {
	isLoading: true,
	isError: null,
	message: null,
	playlists: [],
};

export default (state = initialState, action) => {
	const {
		type,
		playlists,
		newPlaylist,
		updatedPlaylist,
		id,
		items,
		message,
		isError,
	} = action;
	switch (type) {
		case LOADING_PLAYLISTS:
			return {
				...state,
				isLoading: true,
			};
		case PLAYLISTS_MESSAGE:
			return {
				...state,
				isLoading: false,
				isError,
				message,
			};
		case GET_PLAYLISTS:
			return {
				...state,
				playlists,
				isLoading: false,
			};
		case CREATE_PLAYLIST:
			return {
				...state,
				playlists: [newPlaylist, ...state.playlists],
				isLoading: false,
			};
		case DELETE_PLAYLIST:
			return {
				...state,
				playlists: state.playlists.filter(playlist => playlist.id !== id),
				isLoading: false,
			};
		case GET_PLAYLIST_ITEMS:
			return {
				...state,
				playlists: state.playlists.map(playlist =>
					playlist.id === id
						? { ...playlist, fetchingItems: false, items }
						: playlist
				),
			};
		case FETCHING_PLAYLIST_ITEMS:
			return {
				...state,
				playlists: state.playlists.map(playlist =>
					playlist.id === id ? { ...playlist, fetchingItems: true } : playlist
				),
			};
		case GET_PLAYLIST:
			return {
				...state,
				playlists: state.playlists.map(playlist =>
					playlist.id === updatedPlaylist.id
						? { ...updatedPlaylist, fetchingItems: true }
						: playlist
				),
			};
		default:
			return state;
	}
};
