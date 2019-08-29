import {
  UI_PLAYLIST_PLAY,
  UI_PLAYLIST_CLEAR,
  UI_PLAYLIST_DELETE,
  UI_PLAYLIST_UPDATE,
  UI_PLAYLIST_ITEM_PLAY,
  UI_PLAYLIST_ITEM_CLEAR,
  UI_PLAYLIST_ITEM_DELETE,
  UI_RESET_ALL_IDS
} from "../actionTypes";

const initialState = {
  // YouTube playlistId's
  playlist: {
    deleting: "",
    updating: "",
    playing: ""
  },
  // YouTube playlistItemId's
  playlistItem: {
    playing: "",
    deleting: ""
  }
};

export default (state = initialState, action) => {
  const { type, id, plItemId, name } = action;
  const { playlist, playlistItem } = state;
  switch (type) {
    case UI_PLAYLIST_PLAY:
      return { ...state, playlist: { ...playlist, playing: id } };
    case UI_PLAYLIST_DELETE:
      return { ...state, playlist: { ...playlist, deleting: id } };
    case UI_PLAYLIST_UPDATE:
      return { ...state, playlist: { ...playlist, updating: id } };
    case UI_PLAYLIST_CLEAR:
      return { ...state, playlist: { ...playlist, [name]: "" } };
    case UI_PLAYLIST_ITEM_PLAY:
      return { ...state, playlistItem: { ...playlistItem, playing: plItemId } };
    case UI_PLAYLIST_ITEM_DELETE:
      return {
        ...state,
        playlistItem: { ...playlistItem, deleting: plItemId }
      };
    case UI_PLAYLIST_ITEM_CLEAR:
      return { ...state, playlistItem: { ...playlistItem, [name]: "" } };
    case UI_RESET_ALL_IDS:
      return initialState;
    default:
      return state;
  }
};
