import {
  CHANGE_TAB,
  CLIENT_LOADED,
  PLAYLIST_LOADER,
  PLAYLIST_MESSAGE
} from "../actionTypes";

export const handleClient = () => ({
  type: CLIENT_LOADED
});

export const handleTabChange = value => ({
  type: CHANGE_TAB,
  value
});

export const handlePlaylistLoad = isLoading => ({
  type: PLAYLIST_LOADER,
  isLoading
});

export const handlePlaylistMsg = (isError = null, message = null) => ({
  type: PLAYLIST_MESSAGE,
  isLoading: false,
  isError,
  message
});
