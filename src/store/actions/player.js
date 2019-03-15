import {
  SET_PLAYLIST_ID,
  SET_VIDEO_ID,
  TOGGLE_AUTO_DELETE
} from "../actionTypes";

export const setPlaylistId = playlistId => ({
  type: SET_PLAYLIST_ID,
  playlistId
});

export const setVideoId = currentVideoId => ({
  type: SET_VIDEO_ID,
  currentVideoId
});

export const toggleAutoDelete = () => ({
  type: TOGGLE_AUTO_DELETE
});
