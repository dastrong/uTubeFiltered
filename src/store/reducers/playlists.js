import {
  GET_PLAYLISTS,
  CREATE_PLAYLIST,
  DELETE_PLAYLIST,
  GET_PLAYLIST_ITEMS,
  FETCHING_PLAYLIST_ITEMS,
  GET_PLAYLIST
} from "../actionTypes";

export default (state = [], action) => {
  const { type, playlists, newPlaylist, updatedPlaylist, id, items } = action;
  switch (type) {
    case GET_PLAYLISTS:
      return playlists;
    case CREATE_PLAYLIST:
      return [newPlaylist, ...state];
    case DELETE_PLAYLIST:
      return state.filter(playlist => playlist.id !== id);
    case GET_PLAYLIST_ITEMS:
      return state.map(playlist =>
        playlist.id === id
          ? { ...playlist, fetchingItems: false, items }
          : playlist
      );
    case FETCHING_PLAYLIST_ITEMS:
      return state.map(playlist =>
        playlist.id === id ? { ...playlist, fetchingItems: true } : playlist
      );
    case GET_PLAYLIST:
      return state.map(playlist =>
        playlist.id === updatedPlaylist.id
          ? { ...updatedPlaylist, fetchingItems: true }
          : playlist
      );
    default:
      return state;
  }
};
