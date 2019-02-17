import {
	LOADING_PLAYLISTS,
	PLAYLISTS_MESSAGE,
	GET_PLAYLISTS,
	CREATE_PLAYLIST,
	DELETE_PLAYLIST,
	GET_PLAYLIST,
} from "../actionTypes";
import { fetchURL, createURLstr, fetcher } from "../../util/helpers";
import { getPlaylistItems, updatePlaylistItems } from "./playlistItems";
import { stripPlaylist } from "../../util/strippers";

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

export const handlePlaylist = updatedPlaylist => ({
	type: GET_PLAYLIST,
	updatedPlaylist,
});

// THUNKS
export function getPlaylists(token) {
	return async dispatch => {
		try {
			const fullURL = createURLstr(halfURL);
			const resp = await fetcher("GET", fullURL, token);
			const playlists = await resp.json();
			if (!resp.ok) throw playlists.error.message;
			const allPlaylists = playlists.items.map(item => stripPlaylist(item));
			dispatch(handlePlaylists(allPlaylists));
			allPlaylists.map(playlist =>
				dispatch(getPlaylistItems(token, playlist.id))
			);
		} catch (err) {
			console.log(err);
			dispatch(handleMessage(true, err));
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
			if (!resp.ok) throw playlist.error.message;
			const newPlaylist = stripPlaylist(playlist);
			dispatch(handleCreate(newPlaylist));
			dispatch(updatePlaylistItems(token, newPlaylist.id, newPlaylist.tags));
			dispatch(handleMessage(false, "Do you want to make another playlist?"));
		} catch (err) {
			console.log(err);
			dispatch(handleMessage(true, err));
		}
	};
}

export function deletePlaylist(token, id) {
	return async dispatch => {
		try {
			const fullURL = createURLstr(halfURL, { id });
			const resp = await fetcher("DELETE", fullURL, token);
			if (!resp.ok) throw Error("Something went wrong");
			dispatch(handleDelete(id));
		} catch (err) {
			console.log(err);
			dispatch(handleMessage(true, err));
		}
	};
}

export function getPlaylist(token, id) {
	return async dispatch => {
		try {
			const fullURL = createURLstr(halfURL, { id, part: "snippet" });
			const resp = await fetcher("GET", fullURL, token);
			const playlist = await resp.json();
			if (!resp.ok) throw playlist.error.message;
			const updatedPlaylist = stripPlaylist(playlist.items[0]);
			dispatch(handlePlaylist(updatedPlaylist));
			dispatch(getPlaylistItems(token, updatedPlaylist.id));
		} catch (err) {
			console.log(err);
			dispatch(handleMessage(true, err));
		}
	};
}
