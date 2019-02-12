import {
	LOADING_PLAYLISTS,
	PLAYLISTS_MESSAGE,
	GET_PLAYLISTS,
	CREATE_PLAYLIST,
	DELETE_PLAYLIST,
} from "../actionTypes";
import { fetchURL, createURLstr, fetcher } from "../../util/helpers";
import { getPlaylistItems, updatePlaylistItems } from "./playlistItems";

const halfURL = fetchURL("playlists");

export const loadingPlaylists = () => ({
	type: LOADING_PLAYLISTS,
});

export const handleMessage = (isError = null, message = null) => ({
	type: PLAYLISTS_MESSAGE,
	isError,
	message,
});

export const handlePlaylists = playlists => ({
	type: GET_PLAYLISTS,
	playlists,
});

export const handleCreate = newPlaylist => ({
	type: CREATE_PLAYLIST,
	newPlaylist,
});

export const handleDelete = id => ({
	type: DELETE_PLAYLIST,
	id,
});

// THUNKS
export function getPlaylists(token) {
	return async dispatch => {
		try {
			const fullURL = createURLstr(halfURL);
			const resp = await fetcher("GET", fullURL, token);
			const playlists = await resp.json();
			if (!resp.ok) throw playlists;
			dispatch(handlePlaylists(playlists.items));
			playlists.items.map(item => dispatch(getPlaylistItems(token, item.id)));
		} catch (err) {
			dispatch(handleMessage(true, err.error.message || err));
			console.log(err);
		}
	};
}

export function createPlaylist(token, snippet) {
	return async dispatch => {
		try {
			const fullURL = createURLstr(halfURL);
			const body = JSON.stringify({ snippet });
			const resp = await fetcher("POST", fullURL, token, body);
			const playlist = await resp.json();
			if (!resp.ok) throw playlist;
			dispatch(handleCreate(playlist));
			console.log(playlist);
			const tags = playlist.snippet.tags;
			const channels = tags[0].startsWith("channel:")
				? tags[0].slice(8).split("&")
				: console.log("Incorrect Channel Format");
			const q = tags[1].startsWith("query:")
				? tags[1].slice(6)
				: console.log("Incorrect Query Format");
			const lastDate = tags[2].startsWith("lastUpdate:")
				? Number(tags[2].slice(11))
				: console.log("Incorrect Date Format");
			console.log(tags, channels, q, lastDate);

			channels.map(channel =>
				dispatch(
					updatePlaylistItems(token, {
						channelId: channel,
						q,
						// publishedAfter
						publishedBefore: new Date(lastDate).toISOString(),
						maxResults: 50,
						type: "video",
					})
				)
			);
			dispatch(handleMessage(false, "Do you want to make another playlist?"));
		} catch (err) {
			dispatch(handleMessage(true, err.error.message || err));
			console.log(err);
		}
	};
}

export function deletePlaylist(token, id) {
	return async dispatch => {
		try {
			const fullURL = createURLstr(halfURL, { id });
			const resp = await fetcher("DELETE", fullURL, token);
			const playlist = await resp.json();
			if (!resp.ok) throw playlist;
			dispatch(handleDelete(id));
		} catch (err) {
			dispatch(handleMessage(true, err.error.message || err));
			console.log(err);
		}
	};
}
