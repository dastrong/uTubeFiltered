import {
  GET_PLAYLISTS,
  CREATE_PLAYLIST,
  DELETE_PLAYLIST
} from "../actionTypes";
import { fetchURL, apiRequest } from "../../util/helpers";
import { stripPlaylist } from "../../util/strippers";
import { getPlaylistItems, updatePlaylistItems } from "./playlistItems";
import {
  handlePlaylistLoad,
  handlePlaylistMsg,
  handlePlaylistsUpdateBadge
} from "./ui";

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

// THUNKS
export function getPlaylists(token) {
  return async dispatch => {
    try {
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
        (acc, cVal) =>
          dateNow > cVal.tags.lastDate + 86400000 ? acc + 1 : acc,
        0
      );
      dispatch(handlePlaylistsUpdateBadge(updatesAvailable));
      // flip the ui flag variable
      dispatch(handlePlaylistLoad(false));
    } catch (err) {
      console.log(err);
      dispatch(handlePlaylistMsg(true, err));
    }
  };
}

export function createPlaylist(token, snippet) {
  return async dispatch => {
    try {
      // https://developers.google.com/youtube/v3/docs/playlists/insert#parameters
      const params = { part: "snippet" };
      // https://developers.google.com/youtube/v3/docs/playlists/insert#request-body
      const body = JSON.stringify({ snippet });
      const resp = await apiRequest("POST", halfURL, token, params, body);
      const newPlaylist = stripPlaylist(resp);
      dispatch(handleCreate(newPlaylist));
      dispatch(updatePlaylistItems(token, newPlaylist.id, newPlaylist.tags));
      const successMsg = "Do you want to make another playlist?";
      dispatch(handlePlaylistMsg(false, successMsg));
      dispatch(handlePlaylistLoad(false));
    } catch (err) {
      console.log(err);
      dispatch(handlePlaylistMsg(true, err));
    }
  };
}

export function deletePlaylist(token, id) {
  return async dispatch => {
    try {
      // https://developers.google.com/youtube/v3/docs/playlists/delete#parameters
      await apiRequest("DELETE", halfURL, token, { id });
      dispatch(handleDelete(id));
    } catch (err) {
      console.log(err);
      dispatch(handlePlaylistMsg(true, err));
    }
  };
}
