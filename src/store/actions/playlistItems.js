import { GET_PLAYLIST_ITEMS } from "../actionTypes";
import { fetchURL, createURLstr, fetcher } from "../../util/helpers";
import { handleMessage } from "./playlists";

const halfURL = fetchURL("playlistItems");

export const handlePlaylistItems = (id, items) => ({
	type: GET_PLAYLIST_ITEMS,
	items,
	id,
});

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
