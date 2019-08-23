import {
	GET_PLAYLISTS,
	CREATE_PLAYLIST,
	DELETE_PLAYLIST,
	UPDATE_PLAYLIST
} from "../actionTypes";
import { fetchURL, apiRequest } from "../../util/helpers";
import { stripPlaylist, stripTags } from "../../util/strippers";
import { handleError } from "../../util/error";
import { getPlaylistItems, updatePlaylistItems } from "./playlistItems";
import { setPlaylistsLoader, setPlUpdBadge } from "./ui";
import { showSnackBar } from "./snacks";
import { playlistDelete, playlistClear } from "./ids";

const halfURL = fetchURL("playlists");

export const handlePlaylists = playlists => ({
	type: GET_PLAYLISTS,
	playlists
});

export const handleCreate = newPlaylist => ({
	type: CREATE_PLAYLIST,
	newPlaylist
});

export const handleDelete = id => ({
	type: DELETE_PLAYLIST,
	id
});

export const handleUpdate = (id, tags) => ({
	type: UPDATE_PLAYLIST,
	id,
	tags
});

// THUNKS
export function getPlaylists(token) {
	return async dispatch => {
		try {
			dispatch(setPlaylistsLoader(true));
			// https://developers.google.com/youtube/v3/docs/playlists/list#parameters
			const params = { mine: true, maxResults: "50", part: "snippet" };
			// returns an items array or throws an error
			const { items } = await apiRequest("GET", halfURL, token, params);
			// strips our playlist results down
			const playlists = items.map(item => stripPlaylist(item));
			// send results to store
			dispatch(handlePlaylists(playlists));
			// get each playlists item
			playlists.map(playlist => dispatch(getPlaylistItems(token, playlist.id)));
			// update the playlist update ui badge
			const dateNow = Date.now();
			const updatesAvailable = playlists.reduce(
				(acc, { tags }) =>
					tags && dateNow > tags.lastUpdate + 86400000 ? acc + 1 : acc,
				0
			);
			dispatch(setPlUpdBadge(updatesAvailable));
			dispatch(setPlaylistsLoader(false));
			dispatch(showSnackBar("success", "Got your playlists."));
		} catch (err) {
			handleError(dispatch, err);
			dispatch(setPlaylistsLoader(false));
			dispatch(showSnackBar("error", "Error getting your playlists."));
		}
	};
}

export function createPlaylist(token, snippet) {
	return async dispatch => {
		try {
			dispatch(setPlaylistsLoader(true));
			// https://developers.google.com/youtube/v3/docs/playlists/insert#parameters
			const params = { part: "snippet" };
			// https://developers.google.com/youtube/v3/docs/playlists/insert#request-body
			const body = JSON.stringify({ snippet });
			const resp = await apiRequest("POST", halfURL, token, params, body);
			const newPlaylist = stripPlaylist(resp);
			const { id, tags } = newPlaylist;
			dispatch(handleCreate(newPlaylist));
			dispatch(setPlaylistsLoader(false));
			dispatch(showSnackBar("success", "Created your playlist."));
			await dispatch(updatePlaylistItems(token, id, tags));
		} catch (err) {
			handleError(dispatch, err);
			dispatch(setPlaylistsLoader(false));
			dispatch(showSnackBar("error", "Error creating playlist."));
		}
	};
}

export function deletePlaylist(token, id) {
	return async dispatch => {
		try {
			dispatch(playlistDelete(id));
			// https://developers.google.com/youtube/v3/docs/playlists/delete#parameters
			await apiRequest("DELETE", halfURL, token, { id });
			dispatch(handleDelete(id));
			dispatch(playlistClear("deleting"));
			dispatch(showSnackBar("success", "Deleted your playlist."));
		} catch (err) {
			handleError(dispatch, err);
			dispatch(playlistClear("deleting"));
			dispatch(showSnackBar("error", "Error deleting your playlist."));
		}
	};
}

export function updatePlaylist(token, id, snippet) {
	return async dispatch => {
		try {
			// https://developers.google.com/youtube/v3/docs/playlists/update#parameters
			const params = { part: "snippet" };
			// https://developers.google.com/youtube/v3/docs/playlists/update#request-body
			const body = JSON.stringify({ id, snippet });
			const resp = await apiRequest("PUT", halfURL, token, params, body);
			const { tags } = resp.snippet;
			const newTags = stripTags(tags);
			dispatch(handleUpdate(id, newTags));
		} catch (err) {
			handleError(dispatch, err);
		}
	};
}
