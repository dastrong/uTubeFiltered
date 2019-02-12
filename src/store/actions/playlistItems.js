import { GET_PLAYLIST_ITEMS, UPDATE_PLAYLIST_ITEMS } from "../actionTypes";
import { fetchURL, createURLstr, fetcher } from "../../util/helpers";
import { handleMessage } from "./playlists";

const halfURL = fetchURL("playlistItems");
const halfSearchURL = fetchURL("search");

export const handlePlaylistItems = (id, items) => ({
	type: GET_PLAYLIST_ITEMS,
	items,
	id,
});

export const handleUpdate = (id, items) => ({
	type: UPDATE_PLAYLIST_ITEMS,
	items,
	id,
});

// THUNKS
export function getPlaylistItems(token, playlistId) {
	return async dispatch => {
		try {
			const fullURL = createURLstr(halfURL, { playlistId, part: "snippet" });
			const resp = await fetcher("GET", fullURL, token);
			const playlistItems = await resp.json();
			if (!resp.ok) throw playlistItems;
			dispatch(handlePlaylistItems(playlistId, playlistItems.items));
		} catch (err) {
			dispatch(handleMessage(true, err.error.message || err));
			console.log(err);
		}
	};
}

export function updatePlaylistItems(token, params) {
	return async dispatch => {
		try {
			const fullURL = createURLstr(halfSearchURL, {
				...params,
				part: "snippet",
			});
			const resp = await fetcher("GET", fullURL, token);
			console.log(resp);
			const results = await resp.json();
			console.log(results);
			if (!resp.ok) throw results;
			// dispatch(handleUpdate(playlistId, playlistItems.items));
		} catch (err) {
			dispatch(handleMessage(true, err.error.message || err));
			console.log(err);
		}
	};
}
