import {
	GET_PLAYLISTS,
	CREATE_PLAYLIST,
	DELETE_PLAYLIST,
	UPDATE_PLAYLIST,
	GET_PLAYLIST_ITEMS,
	FETCHING_PLAYLIST_ITEMS,
	DELETE_PLAYLIST_ITEM,
} from "../actionTypes";

export default (state = [], action) => {
	const {
		type,
		playlists,
		newPlaylist,
		tags,
		id,
		items,
		vidId,
		playlistId,
	} = action;
	switch (type) {
		case GET_PLAYLISTS:
			return playlists;
		case CREATE_PLAYLIST:
			return [...state, newPlaylist];
		case DELETE_PLAYLIST:
			return state.filter(playlist => playlist.id !== id);
		case UPDATE_PLAYLIST:
			return state.map(playlist =>
				playlist.id === id
					? {
							...playlist,
							items: playlist.items.map(item => ({ ...item })),
							tags,
					  }
					: playlist
			);
		case GET_PLAYLIST_ITEMS:
			return state.map(playlist =>
				playlist.id === id
					? { ...playlist, fetchingItems: false, items }
					: playlist
			);
		case DELETE_PLAYLIST_ITEM:
			return state.map(playlist =>
				playlist.id === playlistId
					? {
							...playlist,
							tags: { ...playlist.tags, channels: [...playlist.tags.channels] },
							items: playlist.items.filter(item => item.videoId !== vidId),
					  }
					: playlist
			);
		case FETCHING_PLAYLIST_ITEMS:
			return state.map(playlist =>
				playlist.id === id ? { ...playlist, fetchingItems: true } : playlist
			);
		default:
			return state;
	}
};
